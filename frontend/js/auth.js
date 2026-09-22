// auth.js — funções de sessão do usuário
const API_URL = 'http://localhost:3000';

const Auth = {
  // Retorna o token salvo (ou null)
  getToken() {
    return localStorage.getItem('token');
  },

  // Retorna o usuário logado (ou null)
  getUsuario() {
    const u = localStorage.getItem('usuario');
    return u ? JSON.parse(u) : null;
  },

  // Verifica se está logado
  estaLogado() {
    return !!this.getToken();
  },

  // Salva os dados da sessão
  salvar(token, usuario) {
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  },

  // Limpa a sessão
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
  },

  // Exige login. Se não estiver logado, redireciona.
  exigirLogin() {
    if (!this.estaLogado()) {
      window.location.href = 'login.html';
    }
  },

  // Wrapper para fetch autenticado
  async fetchAuth(url, opcoes = {}) {
    const token = this.getToken();
    const headers = {
      'Content-Type': 'application/json',
      ...(opcoes.headers || {}),
    };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const resp = await fetch(API_URL + url, { ...opcoes, headers });

    // Se o token expirou
    if (resp.status === 401) {
      this.logout();
      throw new Error('Sessão expirada');
    }

    return resp;
  },
};