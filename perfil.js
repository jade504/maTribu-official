
async function loadProfile() {
  const email = localStorage.getItem('matribu_user_email');
  const infoEl = document.getElementById('perfil-info');

  if (!email) {
    infoEl.innerHTML = '<p>Sessão não encontrada. <a href="Entrar.html">Entrar</a></p>';
    return;
  }

  try {
    const response = await fetch(`http://localhost:3000/me?email=${encodeURIComponent(email)}`);
    const data = await response.json();

    if (response.ok) {
      infoEl.innerHTML = `
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Verificado:</strong> ${data.verified ? 'Sim' : 'Não'}</p>
        <p><strong>Membro desde:</strong> ${new Date(data.created_at).toLocaleDateString()}</p>
      `;
    } else {
      infoEl.innerHTML = '<p>Não foi possível carregar o perfil.</p>';
    }
  } catch (err) {
    infoEl.innerHTML = '<p>Erro de ligação ao servidor.</p>';
  }
}

document.getElementById('logout-btn').addEventListener('click', () => {
  localStorage.removeItem('matribu_user_email');
  window.location.href = 'Entrar.html';
});

loadProfile();