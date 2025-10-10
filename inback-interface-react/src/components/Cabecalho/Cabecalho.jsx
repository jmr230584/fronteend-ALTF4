import { useState, useEffect } from 'react';
import { JSX } from 'react';
import estilo from './Cabecalho.module.css';
import { APP_ROUTES } from '../../appConfig';

function Cabecalho() {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem('isAuth') === 'true';
        setIsAuth(auth);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('nome');
        localStorage.removeItem('email');
        localStorage.removeItem('id_usuario');
        localStorage.removeItem('nivelAcesso');
        localStorage.removeItem('isAuth');
        window.location.href = APP_ROUTES.ROUTE_LOGIN;
    };

    return (
        <header className={estilo.cabecalho}>
            <div className={estilo.cabelhoprincipal}>
                <a href={APP_ROUTES.ROUTE_HOME} className={estilo.home}>
                    <h3>HOME</h3>
                </a>
            </div>

            <div className={estilo.conexoes}>
                {!isAuth && (
                    <a className={estilo.login} href={APP_ROUTES.ROUTE_LOGIN}>
                        <h3>LOGIN</h3>
                    </a>
                )}
                <a className={estilo.cardapio} href={APP_ROUTES.ROUTE_CARDAPIO}>
                    <h3>CARDÁPIO</h3>
                </a>
                <a className={estilo.carrinho} href={APP_ROUTES.ROUTE_HOME}>
                    <h3>CARRINHO</h3>
                </a>

                {isAuth && (
                    <>
                        <a className={estilo.lista} href={APP_ROUTES.ROUTE_LISTA_CLIENTE}>
                            <h3>LISTAS</h3>
                        </a>
                        <button className={estilo.sair} onClick={handleLogout}>
                            <h3>SAIR</h3>
                        </button>
                    </>
                )}
            </div>
        </header>
    );
}

export default Cabecalho;
