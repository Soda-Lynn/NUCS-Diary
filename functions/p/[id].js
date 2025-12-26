// articles.json example
/*
[
  {
    "id": "12345",
    "title": "...",
    "author": "...",
    "date": "...",
    "summary": "...",
    "featureImage": "...",
    "paragraphs": [...],
    "images": [...]
  }
]
*/

import articles from './articles.json';

export function renderArticle(id) {
  const post = articles.find(a => a.id === id);
  if (!post) return;

  // same injection as publish.js
  document.title = post.title;
  document.getElementById('article-title').textContent = post.title;
  document.getElementById('article-author').textContent = post.author;
  document.getElementById('article-date').textContent = new Date(post.date).toLocaleDateString('my-MM');
  document.getElementById('article-date').setAttribute('datetime', post.date);

  const body = document.getElementById('article-body');
  post.paragraphs.forEach(p => {
    const para = document.createElement('p');
    para.textContent = p;
    body.appendChild(para);
  });
  post.images.forEach(img => {
    const figure = document.createElement('figure');
    const image = document.createElement('img');
    image.src = img.src;
    const caption = document.createElement('figcaption');
    caption.textContent = img.caption;
    figure.appendChild(image);
    figure.appendChild(caption);
    body.appendChild(figure);
  });
}
