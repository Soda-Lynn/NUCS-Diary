export async function onRequestGet({ params, env }) {
  const raw = await env.POSTS.get(params.id);
  if (!raw) return new Response("Not found", { status: 404 });

  const post = JSON.parse(raw);
  const content = post.content;
  const title = post.title;
  let ogImage = post.ogImage;

  if (!ogImage) {
    const img = content.match(/<img[^>]+src="([^">]+)"/);
    if (img) ogImage = img[1];
  }

  const description = content.replace(/<[^>]*>/g, "").slice(0, 150);

  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${title}</title>

<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
${ogImage ? `<meta property="og:image" content="${ogImage}">` : ""}
<meta property="og:type" content="article">
<meta name="twitter:card" content="summary_large_image">
<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
body {
  font-family: Georgia, serif;
  background: #fff;
  margin: 0;
  padding: 0;
}

article {
  max-width: 700px;
  margin: auto;
  padding: 20px;
  line-height: 1.6;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

img {
  max-width: 100%;
  height: auto;
  display: block;
  margin: 1.2em auto;
}

p {
  margin: 1em 0;
}

a {
  color: #0645ad;
}

ul, ol {
  margin-left: 20px;
}
</style>
</head>

<body>
<article>
<h1>${title}</h1>
${content}
</article>
</body>
</html>`, {
    headers: { "Content-Type": "text/html" }
  });
}
