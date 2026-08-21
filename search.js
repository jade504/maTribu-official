
const PAGES = [
  { name: 'Recursos', url: 'recursos.html' },
  { name: 'Mensagens', url: 'mensagens.html' },
  { name: 'Buscar', url: 'buscar.html' },
  { name: 'Comunidades', url: 'comunidades.html' },
  { name: 'Novas Conversas', url: 'novas-conversas.html' },
  { name: 'Eventos', url: 'eventos.html' },
  { name: 'Favoritos', url: 'favoritos.html' },
  { name: 'Perfil', url: 'perfil.html' },
];

const input = document.getElementById('search-input');
if (input) {
  input.addEventListener('input', () => {
    const query = input.value.toLowerCase();
    if (!query) return;
    const match = PAGES.find(p => p.name.toLowerCase().includes(query));
    if (match) {
      input.dataset.matchUrl = match.url;
    } else {
      delete input.dataset.matchUrl;
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && input.dataset.matchUrl) {
      window.location.href = input.dataset.matchUrl;
    }
  });
}