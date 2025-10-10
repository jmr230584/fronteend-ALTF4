import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './appConfig';
import PHome from './pages/PHome/PHome';
import PLogin from './pages/PLogin/PLogin';
import PCadastro from './pages/PCadastro/PCadastro';
import PCardapio from './pages/PCardapio/PCardapio';
import PListaCliente from './pages/PListagem/PListaClientes/PListaCliente';
import ProtectedRoute from './components/Rotas/ProtectedRoutes';

/**
 * Componente que irá lidar com todas as rotas da aplicação
 * @returns Um componente web para lidar com as rotas
 */
function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Quando a rota representada pela variável ROUTE_HOME é acessada, renderiza a página PHome */}
                <Route path={APP_ROUTES.ROUTE_HOME} element={<PHome />} />
                {/* Quando a rota representada pela variável ROUTE_LOGIN é acessada, renderiza a página PLogin */}
                <Route path={APP_ROUTES.ROUTE_LOGIN} element={<PLogin />} />
                {/* Quando a rota representada pela variável ROUTE_CADASTRP é acessada, renderiza a página PCadastro */}
                <Route path={APP_ROUTES.ROUTE_CADASTRO} element={<PCadastro />} />

                <Route path={APP_ROUTES.ROUTE_CARDAPIO} element={<PCardapio />} />


                <Route path={APP_ROUTES.ROUTE_LISTA_CLIENTE} element={<ProtectedRoute element={PListaCliente} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;