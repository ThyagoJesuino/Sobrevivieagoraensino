// portal.js — lógica de conteúdos do portal

const API_PORTAL = 'http://localhost:3000';

// Carrega a lista de conteúdos e renderiza
async function carregarConteudos() {
  const lista = document.getElementById('lista-conteudos');
  if (!lista) return;

  lista.innerHTML = '<p class="carregando">Carregando conteúdos...</p>';

  try {
    const r = await Auth.fetchAuth('/conteudos');
    const dados = await r.json();

    if (!dados.length) {
      lista.innerHTML = '<p class="vazio">Nenhum conteúdo cadastrado ainda.</p>';
      return;
    }

    lista.innerHTML = dados.map(c => `
      <article class="card-conteudo">
        <header>
          <span class="tag">${c.categoria || 'Geral'}</span>
          <span class="autor">por ${c.autor || 'Anônimo'}</span>
        </header>
        <h3>${escaparHTML(c.titulo)}</h3>
        <p>${escaparHTML(c.corpo || '')}</p>
        <time>${new Date(c.criado_em).toLocaleString('pt-BR')}</time>
      </article>
    `).join('');
  } catch (err) {
    lista.innerHTML = '<p class="erro">Erro ao carregar conteúdos.</p>';
    console.error(err);
  }
}

// Enviar novo conteúdo
async function criarConteudo(e) {
  e.preventDefault();
  const titulo = document.getElementById('novo-titulo').value.trim();
  const categoria = document.getElementById('nova-categoria').value.trim();
  const corpo = document.getElementById('novo-corpo').value.trim();

  if (!titulo) return;

  try {
    const r = await Auth.fetchAuth('/conteudos', {
      method: 'POST',
      body: JSON.stringify({ titulo, categoria, corpo }),
    });

    if (!r.ok) {
      alert('Erro ao criar conteúdo');
      return;
    }

    document.getElementById('form-conteudo').reset();
    carregarConteudos();
  } catch (err) {
    alert('Erro de conexão');
  }
}

// Evita XSS básico
function escaparHTML(txt) {
  const div = document.createElement('div');
  div.textContent = txt;
  return div.innerHTML;
}

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
  carregarConteudos();

  const form = document.getElementById('form-conteudo');
  if (form) form.addEventListener('submit', criarConteudo);
});