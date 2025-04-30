// Importa o tipo JSX do React para tipar corretamente o retorno do componente
import { JSX } from 'react';

// Importa os estilos CSS específicos para o componente Welcome
import estilo from './Welcome.module.css';

// Importa a imagem para aplicação
import hamburguer from '../../assets/lancheDouble.png'

// Declara o componente funcional Welcome, que retorna uma estrutura JSX
function Welcome(): JSX.Element {
    return (

        <main className={estilo.principal}>
        <div>
            <p>DOUBLE</p>
            <p>INBACK</p>
        </div>
        <div>
            <img src={hamburguer} alt="DoubleInback" />
        </div>
        <div>
            <p>HAMBURGUER DO DIA</p>
        </div>
        </main>
    );
}

// Exporta o componente para que possa ser utilizado em outras partes do projeto
export default Welcome;
