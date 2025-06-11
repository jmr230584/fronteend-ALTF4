// Importa o tipo JSX do React para tipar corretamente o retorno do componente
import { JSX } from 'react';

// Importa os estilos CSS específicos para o componente Welcome
import estilo from './Cardapio.module.css';

// Importa a imagem para aplicação


// Declara o componente funcional Welcome, que retorna uma estrutura JSX
function Cardapio(): JSX.Element {
    return (

        <main className={estilo.principal}>
        <div className={estilo['cardapiotext']}>
            <p>CARDÁPIO</p>
            <p>frete gratís para toda região (são paulo - sertãozinho)</p>
        </div>
        <section>
            <div className={estilo['lanche1']}>
                <p>BACKSTAGE MEAT AND HEAT (R$30,00)</p>
                <div className={estilo['imagemlanche1']}></div>
                <div className={estilo['descricao']}>
                    <p>Descrição</p>
                    </div>
                

                
            </div>
        </section>
        </main>

    );
}

// Exporta o componente para que possa ser utilizado em outras partes do projeto
export default Cardapio;
