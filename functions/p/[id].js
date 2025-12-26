export async function onRequestGet({ params, env }) {
  const postDataRaw = await env.POSTS.get(params.id);
  if (!postDataRaw) return new Response("Post not found", { status: 404 });

  const postData = JSON.parse(postDataRaw);
  const content = postData.content;
  const title = postData.title;
  let ogImage = postData.ogImage;

  // Auto pick first image if OG not set
  if (!ogImage) {
    const imgMatch = content.match(/<img[^>]+src="([^">]+)"/i);
    if (imgMatch) ogImage = imgMatch[1];
  }

  const description = content.replace(/<[^>]*>/g, "").slice(0, 100);

  return new Response(`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
${ogImage ? `<meta property="og:image" content="${ogImage}">` : ""}
<meta property="og:type" content="article">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
  body { font-family: sans-serif; padding: 20px; line-height: 1.5; /* no forced background */ }
  article { max-width: 700px; margin: auto; }
  h1,h2,h3 { margin: 15px 0 10px; }
  p { margin: 10px 0; }
  strong { font-weight: bold; }
  em { font-style: italic; }
  ul { margin: 10px 0 10px 20px; }
  li { margin: 5px 0; }
  img { max-width: 100%; height: auto; }
</style>
</head>
<body>
<article>
  <h1>${title}</h1>
  <div class="content">
    ${content}
  </div>
</article>
</body>
</html>
  `, { headers: { "Content-Type": "text/html" } });
}
