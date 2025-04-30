// Importa o tipo JSX do React para tipar o retorno do componente
import { JSX } from 'react';

// Importa os estilos CSS específicos para o rodapé
import estilo from './Rodape.module.css';

// Declara o componente funcional Rodape que retorna um elemento JSX
function Rodape(): JSX.Element {
    return (
        // Elemento <footer> que representa o rodapé da página, com classe de estilo personalizada
        <footer className={estilo.rodape}>
            {/* Texto com o nome do desenvolvedor ou entidade responsável */}
            <p>Para o atendimento à sua solicitação será necessária a coleta de seus dados, como, mas não limitado a: nome completo, telefone, e-mail e endereço. Esses dados serão tratados de acordo com a Política de Privacidade e Termos de Uso do Grupo Alt-F4. Encaminhando o formulário, você declara estar ciente sobre a utilização dos seus dados pessoais para a continuidade do seu atendimento.</p>

            {/* Texto de direitos autorais */}
            <p>© Senai 2025 | AltF4</p>
        </footer>
    );
}

// Exporta o componente para que possa ser utilizado em outros arquivos do projeto
export default Rodape;
