export async function onRequest({ params }) {
  try {
    const post = JSON.parse(
      decodeURIComponent(escape(atob(params.id)))
    );

    return new Response(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${post.title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<meta property="og:type" content="article">
<meta property="og:title" content="${post.title}">
<meta property="og:description" content="Read this post">

<style>
:root { color-scheme: light dark; }
body {
  margin: 0;
  padding: 16px;
  font-family: system-ui, sans-serif;
  background: Canvas;
  color: CanvasText;
}
img, video {
  max-width: 100%;
  border-radius: 8px;
}
figcaption {
  font-size: 0.9em;
  color: GrayText;
  text-align: center;
}
</style>
</head>

<body>
<h1>${post.title}</h1>
${post.content}
</body>
</html>
`, { headers: { "content-type": "text/html" } });

  } catch {
    return new Response("Invalid post", { status: 400 });
  }
}
