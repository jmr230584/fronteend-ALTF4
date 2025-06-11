// Importa o tipo JSX do React para definir o tipo de retorno do componente
import { JSX } from 'react';

// Importa os estilos CSS específicos para o formulário de login
import estilo from './LoginForm.module.css';

import AuthRequests from '../../fetch/AuthRequests'; // Importa as requisições de autenticação
import { useState } from 'react'; // Importa o hook useState do React para gerenciar o estado do componente

import backgroundImage from '../../assets/background.webp'; // ajuste o caminho relativo
import { APP_ROUTES } from '../../appConfig';

// Declara o componente funcional LoginForm que retorna um elemento JSX
function LoginForm(): JSX.Element {
    const [username, setUsername] = useState('');
    const [senha, setSenha] = useState('');

/**
     *  Função que faz a requisição de login
     */
const handleSubmit = async (e: React.FormEvent) => {
    // evita o recarregamento da página durante a comunicação cliente-servidor
    e.preventDefault();
    // criando um objeto login com username e senha
    const login = { username: username, senha: senha };
    
    try {
        // faz a requsição de login, se sucesso redireciona a página
        if(await AuthRequests.login(login)) {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Erro ao tentar realizar login:', error);
        alert('Erro ao fazer login, verifique se usuário e/ou senha estão corretos.');
    }
};
    return (
        // Seção principal que contém o formulário de login, com classe de estilo personalizada
        <section
            className={estilo['form-section']}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover' // opcional
            }}
        >

            <div className={estilo['linkparaocadastro']}>
                <a href={APP_ROUTES.ROUTE_CADASTRO}>já tem seu cadastro? se não clique aqui</a>
            </div>

            {/* Início do formulário com classe de estilo personalizada */}
            <form action="" className={estilo['form-login']} onSubmit={handleSubmit}>
                <label>
                    E-mail
                    <input
                        type="email" // Define o tipo do input como e-mail
                        placeholder='Insira seu email' // Texto de dica para o usuário
                        className={estilo['input-email-login']} // Classe CSS personalizada
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Senha
                    <input
                        type="password" // Define o tipo do input como senha
                        placeholder='Insira sua senha' // Texto de dica para o usuário
                        className={estilo['input-password-login']} // Classe CSS personalizada
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </label>

                {/* Botão de login */}
                <input
                    type="submit" // Tipo botão (não envia o formulário por padrão)
                    value="CONFIRMAR CONTA" // Texto exibido no botão
                    className={estilo['input-button-login']} // Classe CSS personalizada
                />
            </form>
        </section>
    );
}

// Exporta o componente para ser utilizado em outros arquivos do projeto
export default LoginForm;
