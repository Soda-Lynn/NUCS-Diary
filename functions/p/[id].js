
export async function onRequestGet({ params, env }) {
  const postDataRaw = await env.POSTS.get(params.id);
  if(!postDataRaw) return new Response("Post not found", { status: 404 });

  const postData = JSON.parse(postDataRaw);
  const { content, title, ogImage, createdAt } = postData;

  const description = content.replace(/<[^>]*>/g,"").slice(0,120);

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
<meta name="twitter:card" content="summary_large_image">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
body{font-family:"Helvetica Neue",Helvetica,Arial,sans-serif;padding:20px;margin:0;color:#222;background:#fff;line-height:1.6;}
article{max-width:700px;margin:auto;}
h1{font-size:2.2em;margin-bottom:0.5em;}
.post-meta{color:#555;font-size:0.9em;margin-bottom:1.5em;}
.post-content p{margin:1em 0;}
figure{margin:1.5em 0;text-align:center;}
figure img, figure video{max-width:100%;height:auto;}
figcaption{font-size:0.85em;color:#555;margin-top:0.3em;}
.ql-align-center{text-align:center;}
.ql-align-right{text-align:right;}
.ql-align-justify{text-align:justify;}
.ql-size-small{font-size:0.75em;}
.ql-size-large{font-size:1.25em;}
.ql-size-huge{font-size:1.5em;}
</style>
</head>
<body>
<article>
<header>
<h1>${title}</h1>
<p class="post-meta">Published on ${new Date(createdAt).toLocaleDateString()}</p>
</header>
<section class="post-content">
${content}
</section>
</article>
</body>
</html>
`, { headers: { "Content-Type": "text/html" } });
}
