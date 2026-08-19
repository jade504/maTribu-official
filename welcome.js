const menuButton = document.getElementById('menu-button');
const menuList = document.getElementById('menu-list');

menuButton.addEventListener('click', () => {
  menuList.classList.toggle('hidden');
});

async function loadNews() {
  const listEl = document.getElementById('news-list');

  try {
    const response = await fetch('http://localhost:3000/posts');
    const posts = await response.json();

    if (posts.length === 0) {
      listEl.innerHTML = '<p class="news-empty">Sem notícias por agora.</p>';
      return;
    }

    listEl.innerHTML = '';
    posts.forEach(post => {
      const item = document.createElement('div');
      item.className = 'news-item';
      item.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        ${post.image_url ? `<img src="${post.image_url}" alt="">` : ''}
      `;
      listEl.appendChild(item);
    });
  } catch (err) {
    listEl.innerHTML = '<p class="news-empty">Não foi possível carregar as notícias.</p>';
  }
}

loadNews();