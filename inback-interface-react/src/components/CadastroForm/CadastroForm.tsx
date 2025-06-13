// Importa o tipo JSX do React para definir o tipo de retorno do componente
import { JSX } from 'react';

// Importa os estilos CSS específicos para o formulário de login
import estilo from './CadastroForm.module.css';

import backgroundImage from '../../assets/background.webp'; // ajuste o caminho relativo

// Declara o componente funcional LoginForm que retorna um elemento JSX
function LoginForm(): JSX.Element {
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
            
            {/* Início do formulário com classe de estilo personalizada */}
            <form action="" className={estilo['form-login']}>

                {/* Campo de e-mail com rótulo */}
                <label>
                    Nome Completo
                    <input 
                        type="type" // Define o tipo do input como e-mail
                        placeholder='Insira seu nome completo' // Texto de dica para o usuário
                        className={estilo['input-email-login']} // Classe CSS personalizada
                        // value={senha}
                        // onChange={(e) => setSenha(e.target.value)}
                        required
                    />    
                </label>
                <label>
                    Data de Nascimento
                    <input 
                        type="date " // Define o tipo do input como e-mail
                        placeholder='Insira sua data de nascimento' // Texto de dica para o usuário
                        className={estilo['input-email-login']} // Classe CSS personalizada
                        // value={senha}
                        // onChange={(e) => setSenha(e.target.value)}
                        required
                    />    
                </label>
                <label>
                    E-mail
                    <input 
                        type="email" // Define o tipo do input como e-mail
                        placeholder='Insira seu email' // Texto de dica para o usuário
                        className={estilo['input-email-login']} // Classe CSS personalizada
                        // value={senha}
                        // onChange={(e) => setSenha(e.target.value)}
                        required
                    />    
                </label>

                {/* Campo de senha com rótulo */}
                <label>
                    Celular
                    <input 
                        type="number" // Define o tipo do input como senha
                        placeholder='Insira seu celular' // Texto de dica para o usuário
                        className={estilo['input-password-login']} // Classe CSS personalizada
                        // value={senha}
                        // onChange={(e) => setSenha(e.target.value)}
                        required
                    />    
                </label>
                <label>
                    Senha
                    <input 
                        type="password" // Define o tipo do input como senha
                        placeholder='Insira sua senha' // Texto de dica para o usuário
                        className={estilo['input-password-login']} // Classe CSS personalizada
                        // value={senha}
                        // onChange={(e) => setSenha(e.target.value)}
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
