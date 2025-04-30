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
            <p>Desenvolvido por: Aula React</p>

            {/* Texto de direitos autorais */}
            <p>Copyright</p>
        </footer>
    );
}

// Exporta o componente para que possa ser utilizado em outros arquivos do projeto
export default Rodape;
