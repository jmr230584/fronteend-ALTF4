// Importa o tipo JSX do React para tipar corretamente o retorno do componente
import { JSX } from 'react';

// Importa os estilos CSS específicos para o componente Welcome
import estilo from './Welcome.module.css';

// Declara o componente funcional Welcome, que retorna uma estrutura JSX
function Welcome(): JSX.Element {
    return (

        <main className={estilo.principal}>
            <p>DOUBLE</p>
            <p>INBACK</p>

    
        </main>
    );
}

// Exporta o componente para que possa ser utilizado em outras partes do projeto
export default Welcome;
