/**
 * Interface para os dados de login
 */
interface LoginData {
    email: string;
    senha: string;
}

/**
 * Interface para os dados do usuário retornados pelo backend
 */
interface Usuario {
    id: number;
    nome: string;
    email: string;
}

/**
 * Interface para os dados de resposta do login
 */
interface LoginResponse {
    auth: boolean;
    token: string;
    usuario: Usuario;
    nivel_acesso: string;
}

/**
 * Classe para lidar com autenticação
 */
class AuthRequests {
    private serverUrl: string;
    private routeLogin: string;

    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.routeLogin = '/login';
    }

    /**
     * Realiza a autenticação no servidor com email e senha
     * @param login - credenciais do usuário
     * @returns true se autenticado, false caso contrário
     */
    async login(login: LoginData): Promise<boolean> {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeLogin}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(login)
            });

            if (!response.ok) {
                console.log('Erro na autenticação');
                throw new Error('Falha no login');
            }

            const data: LoginResponse = await response.json();
            console.log('Resposta do backend:', data);

            if (data.auth) {
                this.persistToken({
                    token: data.token,
                    usuario: data.usuario,
                    nivelAcesso: data.nivel_acesso
                });
                return true;
            }

            return false;
        } catch (error) {
            console.error('Erro:', error);
            throw error;
        }
    }

    /**
     * Armazena o token e dados do usuário no localStorage
     */
    persistToken({
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

    /**
     * Remove dados salvos e redireciona para login
     */
    removeToken(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('nome');
        localStorage.removeItem('email');
        localStorage.removeItem('idUsuario');
        localStorage.removeItem('nivelAcesso');
        localStorage.removeItem('isAuth');
        window.location.href = '/login';
    }

    /**
     * Verifica validade do token
     * @returns true se válido, false se expirado
     */
    checkTokenExpiry(): boolean {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const now = Math.floor(Date.now() / 1000);
            if (payload.exp < now) {
                this.removeToken();
                return false;
            }
            return true;
        } catch (e) {
            this.removeToken();
            return false;
        }
    }
}

export default new AuthRequests();
