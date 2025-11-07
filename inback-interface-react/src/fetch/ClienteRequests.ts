import { SERVER_CFG } from '../appConfig';
import ClienteDTO from '../interfaces/Clienteinterface';

class ClienteRequests {

    private serverURL: string;
    private routeListaCliente: string;
    private routeCadastraCliente: string;
    private routeAtualizaCliente: string;
    private routeRemoveCliente: string;

    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;
        this.routeListaCliente = '/lista/clientes';
        this.routeCadastraCliente = '/novo/cliente';
        this.routeAtualizaCliente = '/atualiza/cliente';
        this.routeRemoveCliente = '/remove/cliente';
    }

    // Lista todos os clientes
    async listarClientes(): Promise<ClienteDTO[]> {
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaCliente}`);
            if (respostaAPI.ok) {
                const listaDeClientes: ClienteDTO[] = await respostaAPI.json();
                return listaDeClientes;
            }
            return [];
        } catch (error) {
            console.error(`Erro ao listar clientes: ${error}`);
            return [];
        }
    }

    // Remove um cliente pelo ID
    async removerCliente(idCliente: number): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeRemoveCliente}/${idCliente}`, {
                method: 'DELETE',
            });
            return respostaAPI.ok;
        } catch (error) {
            console.error(`Erro ao remover cliente: ${error}`);
            return false;
        }
    }

    // Adiciona um novo cliente
    async criarCliente(cliente: ClienteDTO): Promise<ClienteDTO | null> {
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraCliente}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente), // envia o cliente em JSON
            });

            if (respostaAPI.ok) {
                const novoCliente: ClienteDTO = await respostaAPI.json();
                return novoCliente;
            }

            console.error('Erro ao criar cliente: resposta não OK');
            return null;
        } catch (error) {
            console.error(`Erro ao criar cliente: ${error}`);
            return null;
        }
    }
}

export default new ClienteRequests();
