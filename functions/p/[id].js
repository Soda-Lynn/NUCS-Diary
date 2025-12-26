export async function onRequestGet({ params, env }) {
  const content = await env.POSTS.get(params.id);
  if (!content) return new Response("Post not found", { status: 404 });

  // Create meta description for Instant View
  const description = content.replace(/<[^>]*>/g, "").slice(0, 100);

  return new Response(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>NUCS Diary Post</title>
  <meta property="og:title" content="NUCS Diary Post">
  <meta property="og:description" content="${description}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    body { font-family: sans-serif; padding: 20px; line-height: 1.5; }
    article { max-width: 700px; margin: auto; }
    h1,h2,h3 { margin: 15px 0 10px; }
    p { margin: 10px 0; }
    strong { font-weight: bold; }
    em { font-style: italic; }
    ul { margin: 10px 0 10px 20px; }
    li { margin: 5px 0; }
  </style>
</head>
<body>
<article>
  <h1>NUCS Diary Post</h1>
  <div class="content">
    ${content}
  </div>
</article>
</body>
</html>
`, { headers: { "Content-Type": "text/html" } });
}
