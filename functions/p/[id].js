export async function onRequest({ params }) {
  try {
    const decoded = JSON.parse(
      decodeURIComponent(escape(atob(params.id)))
    );

    return new Response(`
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>${decoded.title}</title>
<meta name="viewport" content="width=device-width, initial-scale=1">

<meta property="og:type" content="article">
<meta property="og:title" content="${decoded.title}">
<meta property="og:description" content="Read this post">
<meta property="og:image" content="">

<style>
:root { color-scheme: light dark; }
body {
  font-family: system-ui, sans-serif;
  margin: 0;
  padding: 16px;
  background: Canvas;
  color: CanvasText;
}
img, video {
  max-width: 100%;
  border-radius: 8px;
}
</style>
</head>

<body>
<h1>${decoded.title}</h1>
${decoded.content}
</body>
</html>
`, { headers: { "content-type": "text/html" } });

  } catch {
    return new Response("Invalid post", { status: 400 });
  }
}
