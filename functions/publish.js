// Helper to generate unique IDs
function generateId() {
  return 'post-' + Date.now();
}

// Save post to localStorage
function savePost(title, content) {
  const id = generateId();
  const post = { id, title, content, date: new Date().toISOString() };
  localStorage.setItem(id, JSON.stringify(post));
  return post;
}

// Display a post in the page
function displayPost(post) {
  const container = document.getElementById('postsContainer');
  const postDiv = document.createElement('div');
  postDiv.className = 'post';
  postDiv.innerHTML = `
    <h3>${post.title}</h3>
    <p>${post.content.replace(/\n/g, '<br>')}</p>
    <small>${new Date(post.date).toLocaleString()}</small>
  `;
  container.prepend(postDiv); // newest post on top
}

// Load all posts on page load
function loadPosts() {
  const container = document.getElementById('postsContainer');
  container.innerHTML = '';
  Object.keys(localStorage)
    .filter(key => key.startsWith('post-'))
    .sort((a, b) => b.localeCompare(a)) // newest first
    .forEach(key => {
      const post = JSON.parse(localStorage.getItem(key));
      displayPost(post);
    });
}

// Publish button click
document.getElementById('publishBtn').addEventListener('click', () => {
  const title = document.getElementById('title').value.trim();
  const content = document.getElementById('content').value.trim();

  if (!title || !content) {
    alert('Please enter both title and content!');
    return;
  }

  const post = savePost(title, content);
  displayPost(post);

  // Clear inputs
  document.getElementById('title').value = '';
  document.getElementById('content').value = '';
});

// Load posts when page opens
window.addEventListener('load', loadPosts);
