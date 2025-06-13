/**
 * Configuração de todas as rotas da interface web
 * Todas os endereços das páginas devem ser inseridas em APP_ROUTES
 * Essas rotas serão refenciadas no componente AppRoutes que está no arquivo routes.tsx
 * e em qualquer página que tenha um link que faça o direcionamento para outra página ou componente
 */
export const APP_ROUTES = {
    ROUTE_HOME: '/',
    ROUTE_LOGIN: '/login',
    ROUTE_CADASTRO: '/cadastro',
    ROUTE_CARDAPIO: '/cardapio',
    ROUTE_LISTA_CLIENTE: '/lista/clientes',
    ROUTE_LISTA_PRATOS: '/lista/gerentes',
}

/**
 * Configurações referente ao servidor da API
 * Todas as configurações referentes aos servidor web devem ser inseridas em SERVER_CFG
 * Todos os endereços configurados aqui são referentes as configurações do servidor web (backend)
 * Qualquer alteração nos endpoints, no endereço do servidor ou porta que forem feitas lá deve ser replicada aqui
 */
export const SERVER_CFG = {
    SERVER_URL: 'http://localhost:3333'
}