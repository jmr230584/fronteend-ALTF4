import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { APP_ROUTES } from './appConfig';
import PHome from './pages/PHome/PHome';
import PLogin from './pages/PLogin/PLogin';
import PCadastro from './pages/PCadastro/PCadastro';
import PCardapio from './pages/PCardapio/PCardapio';
import PListaCliente from './pages/PListagem/PListaClientes/PListaCliente';
import ProtectedRoute from './components/Rotas/ProtectedRoutes';
import PCarrinho from './pages/PCarrinho/PCarrinho';
import PPagamento from './pages/PPagamento/PPagamento';
import PPerfil from './pages/PPerfil/PPerfil';
import PCadastroCliente from './pages/PCadastros/PCadastroCliente/PCadastroCliente';
import PHistoria from './pages/PHistoria/PHistoria';

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

                <Route path={APP_ROUTES.ROUTE_CADASTRO_CLIENTE} element={<PCadastroCliente />} />

                <Route path={APP_ROUTES.ROUTE_HISTORIA} element={<PHistoria />} />
{/* 
                <Route path={APP_ROUTES.ROUTE_CADASTRO_GERENTE} element={<PCadastroGerente />} />

                <Route path={APP_ROUTES.ROUTE_CADASTRO_PEDIDO} element={<PCadastroPedido />} />

                <Route path={APP_ROUTES.ROUTE_CADASTRO_PRATO} element={<PCadastroPrato />} /> */}

                <Route path={APP_ROUTES.ROUTE_CARDAPIO} element={<PCardapio />} />

                <Route path={APP_ROUTES.ROUTE_CARRINHO} element={<PCarrinho />} />

                <Route path={APP_ROUTES.ROUTE_PAGAMENTO} element={<PPagamento />} />

                <Route path={APP_ROUTES.ROUTE_PERFIL} element={<PPerfil />} />

                <Route path={APP_ROUTES.ROUTE_LISTA_CLIENTE} element={<ProtectedRoute element={PListaCliente} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRoutes;