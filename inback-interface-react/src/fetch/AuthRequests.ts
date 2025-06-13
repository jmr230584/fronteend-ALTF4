// src/fetch/AuthRequests.ts
import { SERVER_CFG } from '../appConfig';

/* ---------- Tipagens ---------- */
interface LoginData {
  email: string;
  senha: string;
}

interface Usuario {
  id: number;
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

/* ---------- Classe Singleton ---------- */
class AuthRequests {
  private readonly serverUrl = SERVER_CFG.SERVER_URL ?? 'http://localhost:3333';
  private readonly routeLogin = '/login';

  /* === LOGIN ======================================================= */
  async login(credentials: LoginData): Promise<boolean> {
    try {
      const resp = await fetch(`${this.serverUrl}${this.routeLogin}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials)
      });

      /* Se o back já devolveu 4xx/5xx, tento extrair a mensagem para exibir */
      if (!resp.ok) {
        const err = await resp.json().catch(() => ({}));
        throw new Error(err.message ?? 'Falha na comunicação com o servidor');
      }

      const data = (await resp.json()) as LoginResponse;

      if (!data.auth) {
        throw new Error(data.message ?? 'Credenciais inválidas');
      }

      this.persistToken({
        token: data.token,
        usuario: data.usuario,
        nivelAcesso: data.nivel_acesso
      });

      return true;
    } catch (e) {
      console.error('[AuthRequests] login error:', e);
      /* repasso o erro para quem chamou tratar, se preferir */
      throw e;
    }
  }

  /* === TOKEN & LOCAL STORAGE ======================================= */
  private persistToken({
    token,
    usuario,
    nivelAcesso
  }: {
    token: string;
    usuario: Usuario;
    nivelAcesso: string;
  }): void {
    localStorage.setItem('token', token);
    localStorage.setItem('nome', usuario.nome);
    localStorage.setItem('email', usuario.email);
    localStorage.setItem('idUsuario', String(usuario.id));
    localStorage.setItem('nivelAcesso', nivelAcesso);
    localStorage.setItem('isAuth', 'true');
  }

  logout(): void {
    localStorage.clear();
    window.location.href = '/login';
  }

  /* === AUXÍLIOS ==================================================== */
  /** Cabeçalho padrão para requisições protegidas */
  getAuthHeader(): Record<string, string> {
    const token = localStorage.getItem('token');
    return token ? { 'x-access-token': token } : {};
  }

  /** Dados básicos do usuário logado */
  getUsuario(): Usuario | null {
    const id = Number(localStorage.getItem('idUsuario'));
    const nome = localStorage.getItem('nome');
    const email = localStorage.getItem('email');
    if (!id || !nome || !email) return null;
    return { id, nome, email };
  }

  /** Verifica expiração do JWT e faz logout se necessário */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      if (payload.exp && payload.exp > now) return true;
    } catch {
      /* alguma coisa estranha no token */
    }

    this.logout();
    return false;
  }
}

export default new AuthRequests();
