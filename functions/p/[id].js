return new Response(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>AnonPost</title>
  <meta property="og:title" content="AnonPost">
  <meta property="og:description" content="${content.slice(0, 100)}">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
<article>
${content}
</article>
</body>
</html>
`, { headers: { "Content-Type": "text/html" } });
