// Importa o tipo JSX do React para tipar corretamente o retorno do componente
import { JSX } from 'react';

// Importa os estilos CSS específicos para o componente Welcome
import estilo from './Welcome.module.css';

// Declara o componente funcional Welcome, que retorna uma estrutura JSX
function Welcome(): JSX.Element {
    return (
        // Elemento principal da página com classe de estilo personalizada
        <main className={estilo.principal}>
            {/* Mensagem de boas-vindas ao usuário */}
            <p>Seja bem-vindo(a) à biblioteca.</p>

            {/* Mensagem orientando o usuário a fazer login */}
            <p>Para ter uma melhor experiência, faça o login no sistema</p>
        </main>
    );
}

// Exporta o componente para que possa ser utilizado em outras partes do projeto
export default Welcome;
