document.getElementById('postForm').addEventListener('submit', e => {
  e.preventDefault();

  const post = {
    id: Date.now(), // Unique ID
    title: document.getElementById('title').value,
    author: document.getElementById('author').value,
    featureImage: document.getElementById('featureImage').value,
    summary: document.getElementById('summary').value,
    paragraphs: document.getElementById('content').value.split('\n'),
    date: new Date().toISOString()
  };

  // Save post in localStorage (or send to a backend if you have one)
  localStorage.setItem(`post-${post.id}`, JSON.stringify(post));

  // Redirect to the post renderer
  window.location.href = `post.html?id=${post.id}`;
});
