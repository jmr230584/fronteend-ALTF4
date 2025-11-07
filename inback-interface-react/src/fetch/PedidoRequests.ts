import { SERVER_CFG } from '../appConfig';
import PedidoDTO from '../interfaces/Pedidointerface';

/**
 * Classe com a coleção de funções que farão as requisições à API
 * Esta classe representa apenas as requisições da entidade Pedido
 */
class PedidoRequests {

    private serverURL: string;
    private routeListaPedido: string;
    private routeCadastraPedido: string;
    private routeAtualizaPedido: string;
    private routeRemovePedido: string;

    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;
        this.routeListaPedido = '/lista/pedidos';
        this.routeCadastraPedido = '/novo/pedido';
        this.routeAtualizaPedido = '/atualiza/pedido';
        this.routeRemovePedido = '/remove/pedido';
    }

    // Listar pedidos
    async listarPedidos(): Promise<PedidoDTO[] | null> {
        const token = localStorage.getItem("token");
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaPedido}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                }
            });

            if (respostaAPI.ok) {
                const listaDePedidos: PedidoDTO[] = await respostaAPI.json();
                return listaDePedidos;
            }

            return null;
        } catch (error) {
            console.error(`Erro ao fazer a consulta de pedidos: ${error}`);
            return null;
        }
    }

    // Remover pedido
    async removerPedido(idPedido: number): Promise<boolean> {
        const token = localStorage.getItem("token");
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeRemovePedido}/${idPedido}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                }
            });

            return respostaAPI.ok; // retorna true se a requisição foi bem-sucedida
        } catch (error) {
            console.error(`Erro ao remover o pedido: ${error}`);
            return false;
        }
    }

    // Criar novo pedido
    async criarPedido(pedido: PedidoDTO): Promise<PedidoDTO | null> {
        const token = localStorage.getItem("token");
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraPedido}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify(pedido),
            });

            if (respostaAPI.ok) {
                const novoPedido: PedidoDTO = await respostaAPI.json();
                return novoPedido;
            }

            console.error('Erro ao criar pedido: resposta não OK');
            return null;
        } catch (error) {
            console.error(`Erro ao criar pedido: ${error}`);
            return null;
        }
    }

}

// Exporta a classe já instanciando um objeto da mesma
export default new PedidoRequests();
