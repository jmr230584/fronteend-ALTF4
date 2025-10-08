import { SERVER_CFG } from '../appConfig';
import PedidoDTO from '../interfaces/Pedidointerface';

/**
 * Classe com a coleção de funções que farão as requisições à API
 * Esta classe representa apenas as requisições da entidade Aluno
 */
class PedidoRequests {

    private serverURL: string;          // Variável para o endereço do servidor
    private routeListaPedido: string;   // Variável para a rota de listagem de alunos
    private routeCadastraPedido: string; // Variável para a rota de cadastro de aluno
    private routeAtualizaPedido: string; // Variável para a rota de atualiação de aluno
    private routeRemovePedido: string;   // Variável para a rota de remoção do aluno

    /**
     * O construtor é chamado automaticamente quando criamos uma nova instância da classe.
     * Ele define os valores iniciais das variáveis com base nas configurações da API.
     */
    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;     // Endereço do servidor web
        this.routeListaPedido = '/lista/pedidos';    // Rota configurada na API
        this.routeCadastraPedido = '/novo/pedido';    // Rota configurada na API
        this.routeAtualizaPedido = '/atualiza/pedido'; // Rota configurada na API
        this.routeRemovePedido = '/remove/pedido';    // Rota configurada na API
    }

    /**
     * Método que faz uma requisição à API para buscar a lista de alunos cadastrados
     * @returns Retorna um JSON com a lista de alunos ou null em caso de erro
     */
async listarPedidos(): Promise<PedidoDTO | null> {
    const token = localStorage.getItem("token"); // pega o token do localStorage
    try {
        const respostaAPI = await fetch(`${this.serverURL}${this.routeListaPedido}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token ? { Authorization: `Bearer ${token}` } : {}) // envia no padrão Bearer
            }
        });

        if (respostaAPI.ok) {
            const listaDePedidos: PedidoDTO = await respostaAPI.json();
            return listaDePedidos;
        }

        return null;
    } catch (error) {
        console.error(`Erro ao fazer a consulta de pedidos: ${error}`);
        return null;
    }
}

}

// Exporta a classe já instanciando um objeto da mesma
export default new PedidoRequests();