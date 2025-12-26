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
    .content p { margin: 10px 0; }
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
