
import fs from "fs";
import path from "path";

// Example post object
// In reality, you get this from your editor
const post = {
    id: "6539c3", // unique ID
    title: "My First Post",
    description: "Short description for link preview",
    content: `
        <p>Hello world! This is my post content.</p>
        <img src="https://example.com/image.webp" alt="Image">
        <video controls src="https://example.com/video.mp4"></video>
    `,
    featureImage: "https://example.com/image.webp"
};

function generateHTML(post) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${post.title}</title>
    <meta name="description" content="${post.description}">
    <meta property="og:title" content="${post.title}">
    <meta property="og:description" content="${post.description}">
    <meta property="og:image" content="${post.featureImage}">
    <meta property="og:type" content="article">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body { margin: 0; padding: 1em; font-family: Arial, sans-serif; }
        article { max-width: 700px; margin: auto; }
        h1 { font-size: 2em; margin-bottom: 0.5em; }
        p { margin-bottom: 1em; line-height: 1.6; }
        img, video { max-width: 100%; height: auto; display: block; margin: 1em 0; }
        pre { background: #f0f0f0; padding: 1em; overflow-x: auto; }
        blockquote { border-left: 4px solid #ccc; padding-left: 1em; color: #555; margin: 1em 0; }
    </style>
</head>
<body>
    <article>
        <h1>${post.title}</h1>
        ${post.content}
    </article>
</body>
</html>`;
}

// Save static HTML
const outputPath = path.join("./p", `post-${post.id}.html`);
fs.writeFileSync(outputPath, generateHTML(post));
console.log(`Post saved: ${outputPath}`);
