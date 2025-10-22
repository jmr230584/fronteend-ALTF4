import { useState, useEffect } from 'react';
import estilo from './Cabecalho.module.css';
import { APP_ROUTES } from '../../appConfig';
import perfil from '../../assets/perfil.png';


function Cabecalho() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('isAuth') === 'true';
        setIsAuth(auth);
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        window.location.href = APP_ROUTES.ROUTE_LOGIN;
    };

    return (
        <header className={estilo.cabecalho}>
            <a href={APP_ROUTES.ROUTE_HOME} className={estilo.botao}>
                <h3>HOME</h3>
            </a>

            {!isAuth && (
                <a href={APP_ROUTES.ROUTE_LOGIN} className={estilo.botao}>
                    <h3>LOGIN</h3>
                </a>
            )}

            <a href={APP_ROUTES.ROUTE_CARDAPIO} className={estilo.botao}>
                <h3>CARDÁPIO</h3>
            </a>
            {isAuth &&(
            <a href={APP_ROUTES.ROUTE_CARRINHO} className={estilo.botao}>
                <h3>CARRINHO</h3>
            </a>
            )}

            {isAuth && (
                <>
                    <a href={APP_ROUTES.ROUTE_LISTA_CLIENTE} className={estilo.botao}>
                        <h3>LISTAS</h3>
                    </a>
                    <button type="button" className={estilo.botao} onClick={handleLogout}>
                        <h3>SAIR</h3>
                    </button>
                </>
            )}

            {isAuth && (
                <a href={APP_ROUTES.ROUTE_PERFIL}>
                    <img src={perfil} alt="Perfil" className={estilo.perfil} />
                </a>
            )}
        </header>
    );
}

export default Cabecalho;
