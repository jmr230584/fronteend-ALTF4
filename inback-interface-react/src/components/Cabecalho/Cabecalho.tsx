// Importa o tipo JSX do React para definir o tipo de retorno do componente
import { JSX } from 'react';

// Importa os estilos CSS específicos para o componente de cabeçalho
import estilo from './Cabecalho.module.css';

// Importa a imagem do logotipo da aplicação
import logotipo from '../../assets/wallpaper.png';
// Importa as rotas da aplicação definidas no arquivo de configuração
import { APP_ROUTES } from '../../appConfig';

// Declara o componente funcional Cabecalho que retorna um elemento JSX
function Cabecalho(): JSX.Element {
    return (
        // Define o cabeçalho da aplicação com uma classe CSS personalizada
        <header className={estilo.cabecalho}>
            <div className={estilo.cabelhoprincipal}>
                <a href={APP_ROUTES.ROUTE_HOME} className={estilo.imgLogo}>
                    {/* Logotipo da aplicação */}
                    <img src={logotipo} alt="logotipo" />
                </a>
            </div>
            <div className={estilo.conexoes}>
                <a className={estilo.historia} href={APP_ROUTES.ROUTE_HOME}>
                    <h3>
                        História
                    </h3>
                </a>
                <a className={estilo.cardapio} href={APP_ROUTES.ROUTE_HOME}>
                    <h3>
                        Cardápio
                    </h3>
                </a>
                <a className={estilo.carrinho} href={APP_ROUTES.ROUTE_HOME}>
                    <h3>
                        Carrinho
                    </h3>
                </a>
                </div>
                <div className={estilo.conexoes2}>
                <a href={APP_ROUTES.ROUTE_HOME} className={estilo.imgLogo}>
                    {/* Logotipo da aplicação */}
                    <img src={logotipo} alt="logotipo" />
                </a>

            </div>
        </header>
    );
}

// Exporta o componente para ser utilizado em outros arquivos
export default Cabecalho;
