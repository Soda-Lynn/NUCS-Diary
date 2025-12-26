// Get post ID from URL
const params = new URLSearchParams(window.location.search);
const postId = params.get('id');

if (postId) {
  const postData = localStorage.getItem(`post-${postId}`);
  if (postData) {
    const post = JSON.parse(postData);
    const container = document.getElementById('postContainer');

    container.innerHTML = `
      <h1>${post.title}</h1>
      <p><em>by ${post.author} | ${new Date(post.date).toLocaleString()}</em></p>
      ${post.featureImage ? `<img src="${post.featureImage}" alt="Feature Image">` : ''}
      <p>${post.summary}</p>
      ${post.paragraphs.map(p => `<p>${p}</p>`).join('')}
    `;

    document.title = post.title;
  }
}
