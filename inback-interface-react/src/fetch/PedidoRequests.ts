import { SERVER_CFG } from '../appConfig';
import PedidoDTO from '../interfaces/Pedidointerface';

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
        this.routeRemovePedido = '/remove/pedido'; // ✔ CORRETO
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

            return respostaAPI.ok ? await respostaAPI.json() : null;

        } catch (error) {
            console.error(`Erro ao fazer a consulta de pedidos: ${error}`);
            return null;
        }
    }

    // Remover pedido (PUT + query param)
    async removerPedido(idPedido: number): Promise<boolean> {
        const token = localStorage.getItem("token");

        try {
            const url = `${this.serverURL}${this.routeRemovePedido}?idPedido=${idPedido}`;

            const respostaAPI = await fetch(url, {
                method: 'PUT', // ✔ METÓDO CORRETO
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                }
            });

            return respostaAPI.ok;

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

            return respostaAPI.ok ? await respostaAPI.json() : null;

        } catch (error) {
            console.error(`Erro ao criar pedido: ${error}`);
            return null;
        }
    }

}

export default new PedidoRequests();
