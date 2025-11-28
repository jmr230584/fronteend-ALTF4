import { SERVER_CFG } from '../appConfig';
import ClienteDTO from '../interfaces/Clienteinterface';

class ClienteRequests {

    private serverURL: string;
    private routeListaCliente: string;
    private routeCadastraCliente: string;
    private routeAtualizaCliente: string;
    private routeRemoveCliente: string;

    constructor() {
        // Certifique-se que SERVER_CFG.SERVER_URL não termina com '/' (ex: http://localhost:3333)
        this.serverURL = SERVER_CFG.SERVER_URL.replace(/\/+$/, '');
        this.routeListaCliente = '/lista/clientes';
        this.routeCadastraCliente = '/novo/cliente';
        this.routeAtualizaCliente = '/atualiza/cliente';
        this.routeRemoveCliente = '/remove/cliente';
    }

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

    // Remove cliente usando PUT na query string: /remove/cliente?idCliente=XX
    async removerCliente(idCliente: number): Promise<boolean> {
        try {
            const url = `${this.serverURL}${this.routeRemoveCliente}?idCliente=${idCliente}`;

            const respostaAPI = await fetch(url, {
                method: 'PUT', // -> conforme seu backend espera
                // headers: { 'Content-Type': 'application/json' } // não necessário se não enviar body
            });

            if (respostaAPI.ok) {
                return true;
            } else {
                // loga texto de erro para ajudar no debug
                const text = await respostaAPI.text();
                console.error(`Falha ao remover cliente. status=${respostaAPI.status} resposta=${text}`);
                return false;
            }
        } catch (error) {
            console.error(`Erro ao remover cliente: ${error}`);
            return false;
        }
    }

    async criarCliente(cliente: ClienteDTO): Promise<ClienteDTO | null> {
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraCliente}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(cliente),
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
