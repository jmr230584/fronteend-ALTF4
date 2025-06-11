/**
 * Classe para lidar com autenticação
 */
class AuthRequests {
    constructor() {
        this.serverUrl = 'http://localhost:3333';
        this.routeLogin = '/login';
    }

    /**
     * Realiza a autenticação no servidor com email e senha
     * @param {{ email: string, senha: string }} login - credenciais do usuário
     * @returns true se autenticado, false caso contrário
     */
    async login(login) {
        try {
            const response = await fetch(`${this.serverUrl}${this.routeLogin}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(login)  // <- envia apenas email e senha
            });

            if (!response.ok) {
                console.log('Erro na autenticação');
                throw new Error('Falha no login');
            }

            const data = await response.json();
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
     * @param {{ token: string, usuario: any, nivelAcesso: string }} dados
     */
    persistToken({ token, usuario, nivelAcesso }) {
        localStorage.setItem('token', token);
        localStorage.setItem('nome', usuario.nome);
        localStorage.setItem('email', usuario.email);
        localStorage.setItem('idUsuario', usuario.id);
        localStorage.setItem('nivelAcesso', nivelAcesso);
        localStorage.setItem('isAuth', true);
    }

    /**
     * Remove dados salvos e redireciona para login
     */
    removeToken() {
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
    checkTokenExpiry() {
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
