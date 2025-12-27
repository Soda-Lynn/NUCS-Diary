export async function onRequestGet({ params, env }) {
  const raw = await env.POSTS.get(params.id);
  if (!raw) return new Response("Not found", { status: 404 });

  const post = JSON.parse(raw);
  let { title, content, ogImage } = post;

  if (!ogImage) {
    const m = content.match(/<img[^>]+src="([^">]+)"/i);
    if (m) ogImage = m[1];
  }

  const description = content.replace(/<[^>]+>/g, '').slice(0, 150);

  return new Response(`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${title}</title>

<meta property="og:type" content="article">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
${ogImage ? `<meta property="og:image" content="${ogImage}">` : ``}

<meta name="viewport" content="width=device-width, initial-scale=1">

<style>
body {
  font-family: sans-serif;
  max-width: 600px;
  margin: 40px auto;
  padding: 0 20px;
  line-height: 1.6;
}
img { max-width: 100%; height: auto; }
figure { margin: 20px 0; text-align: center; }
figcaption { font-size: 0.9em; color: #666; }
</style>
</head>

<body>
<article>
<header>
  <h1>${title}</h1>
  <p class="author">NUCS Diary</p>
</header>

<div class="content">
${content}
</div>
</article>
</body>
</html>`, {
    headers: { "Content-Type": "text/html" }
  });
}
