// src/fetch/AuthRequests.ts
/* =====================================================================
 * Classe para lidar com autenticação (versão TypeScript)
 * ===================================================================== */

/* ---------- Tipagens auxiliares ---------- */
export interface LoginData {
  email: string;
  senha: string;
}

export interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
}

interface LoginResponse {
  auth: boolean;
  token: string;
  usuario: Usuario;
  nivel_acesso: 'cliente' | 'gerente';
  message?: string;
}

interface PersistData {
  token: string;
  nome: string;
  email: string;
  id_usuario: number;
  nivelAcesso: string;
}

/* ---------- Classe Singleton ---------- */
class AuthRequests {
  private readonly serverUrl: string = 'http://localhost:3333';
  private readonly routeLogin: string = '/login';

  /* === LOGIN ======================================================= */
  async login(credentials: LoginData): Promise<boolean> {
    try {
      const response = await fetch(`${this.serverUrl}${this.routeLogin}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      if (!response.ok) {
        const err = (await response.json().catch(() => ({}))) as {
          message?: string;
        };
        throw new Error(err.message ?? 'Erro ao fazer login');
      }

      const data = (await response.json()) as LoginResponse;

      if (!data.auth) {
        throw new Error(data.message ?? 'Credenciais inválidas');
      }

      this.persistToken({
        token: data.token,
        nome: data.usuario.nome,
        email: data.usuario.email,
        id_usuario: data.usuario.id_usuario,
        nivelAcesso: data.nivel_acesso
      });

      return true;
    } catch (error) {
      console.error('[AuthRequests] login error:', error);
      throw error;
    }
  }

  /* === TOKEN & LOCAL STORAGE ======================================= */
  private persistToken({
    token,
    nome,
    email,
    id_usuario,
    nivelAcesso
  }: PersistData): void {
    localStorage.setItem('token', token);
    localStorage.setItem('nome', nome);
    localStorage.setItem('email', email);
    localStorage.setItem('id_usuario', String(id_usuario));
    localStorage.setItem('nivelAcesso', nivelAcesso);
    localStorage.setItem('isAuth', 'true');
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    localStorage.removeItem('email');
    localStorage.removeItem('id_usuario');
    localStorage.removeItem('nivelAcesso');
    localStorage.removeItem('isAuth');
    window.location.href = '/login';
  }

  /* === UTILITÁRIOS ================================================= */
  /** Verifica se o token JWT é válido; faz logout se expirado. */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1])) as { exp?: number };
      const agora = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp > agora) return true;
    } catch {
      // token malformado
    }

    this.logout();
    return false;
  }

  /** Cabeçalho padrão para requisições protegidas. */
  getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { 'x-access-token': token } : {};
  }

  /** Dados básicos do usuário autenticado ou `null` se não houver. */
  getUsuario(): Usuario | null {
    const id = Number(localStorage.getItem('id_usuario'));
    const nome = localStorage.getItem('nome');
    const email = localStorage.getItem('email');
    if (!id || !nome || !email) return null;
    return { id_usuario: id, nome, email };
  }
}

/* ---------- Exporta instância única ---------- */
export default new AuthRequests();
