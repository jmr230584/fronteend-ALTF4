// Importa o tipo JSX do React para definir o tipo de retorno do componente
import { JSX } from 'react';

// Importa os estilos CSS específicos para o formulário de login
import estilo from './LoginForm.module.css';

// Declara o componente funcional LoginForm que retorna um elemento JSX
function LoginForm(): JSX.Element {
    return (
        // Seção principal que contém o formulário de login, com classe de estilo personalizada
        <section className={estilo['form-section']}>
            
            {/* Título do formulário */}
            <h3>LOGIN</h3>
            
            {/* Início do formulário com classe de estilo personalizada */}
            <form action="" className={estilo['form-login']}>

                {/* Campo de e-mail com rótulo */}
                <label>
                    E-mail
                    <input 
                        type="email" // Define o tipo do input como e-mail
                        placeholder='Informe o seu e-mail' // Texto de dica para o usuário
                        className={estilo['input-email-login']} // Classe CSS personalizada
                    />    
                </label>

                {/* Campo de senha com rótulo */}
                <label>
                    Senha
                    <input 
                        type="password" // Define o tipo do input como senha
                        placeholder='Informe sua senha' // Texto de dica para o usuário
                        className={estilo['input-password-login']} // Classe CSS personalizada
                    />    
                </label>

                {/* Botão de login */}
                <input 
                    type="button" // Tipo botão (não envia o formulário por padrão)
                    value="Entrar" // Texto exibido no botão
                    className={estilo['input-button-login']} // Classe CSS personalizada
                />
            </form>
        </section>
    );
}

// Exporta o componente para ser utilizado em outros arquivos do projeto
export default LoginForm;
