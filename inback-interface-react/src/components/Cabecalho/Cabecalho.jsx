import { useState, useEffect } from 'react';
import estilo from './Cabecalho.module.css';
import { APP_ROUTES } from '../../appConfig';
import perfilPadrao from '../../assets/perfil.png';

function Cabecalho() {
    const [isAuth, setIsAuth] = useState(false);
    const [userType, setUserType] = useState('');
    const [perfilUrl, setPerfilUrl] = useState(perfilPadrao); // imagem padrão

    useEffect(() => {
        const auth = localStorage.getItem('isAuth') === 'true';
        const type = localStorage.getItem('userType') || '';
        const userId = localStorage.getItem('userId'); // armazenar id do usuário no login

        setIsAuth(auth);
        setUserType(type);

        if (auth && userId) {
            fetch(`http://localhost:3000/usuario/${userId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.imagemPerfil) {
                        setPerfilUrl(`http://localhost:3000/${data.imagemPerfil}`);
                    }
                })
                .catch(err => console.error('Erro ao buscar perfil:', err));
        }
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

            {isAuth && userType === 'cliente' && (
                <a href={APP_ROUTES.ROUTE_CARRINHO} className={estilo.botao}>
                    <h3>CARRINHO</h3>
                </a>
            )}

            {isAuth && userType === 'gerente' && (
                <a href={APP_ROUTES.ROUTE_LISTA_CLIENTE} className={estilo.botao}>
                    <h3>LISTAS</h3>
                </a>
            )}

            {isAuth && (
                <>
                    <button type="button" className={estilo.botao} onClick={handleLogout}>
                        <h3>SAIR</h3>
                    </button>
                    <a href={APP_ROUTES.ROUTE_PERFIL}>
                        <img src={perfilUrl} alt="Perfil" className={estilo.perfil} />
                    </a>
                </>
            )}
        </header>
    );
}

export default Cabecalho;
