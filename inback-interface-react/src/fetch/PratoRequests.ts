import { SERVER_CFG } from '../appConfig';
import PratoDTO from '../interfaces/Pratointerface';

class PratoRequests {

    private serverURL: string;
    private routeListaPrato: string;
    private routeCadastraPrato: string;
    private routeAtualizaPrato: string;
    private routeRemovePrato: string;

    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;
        this.routeListaPrato = '/lista/pratos';
        this.routeCadastraPrato = '/novo/prato';
        this.routeAtualizaPrato = '/atualiza/prato';
        this.routeRemovePrato = '/remove/prato';
    }

    // Listar pratos
    async listarPratos(): Promise<PratoDTO[]> {
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaPrato}`);
            if (respostaAPI.ok) {
                const listaDePratos: PratoDTO[] = await respostaAPI.json();
                return listaDePratos;
            }
            return [];
        } catch (error) {
            console.error(`Erro ao fazer a consulta de pratos: ${error}`);
            return [];
        }
    }

    async removerPrato(idPrato: number): Promise<boolean> {
        try {
            // Backend espera ?idPrato= em vez de /idPrato
            const respostaAPI = await fetch(`${this.serverURL}${this.routeRemovePrato}?idPrato=${idPrato}`, {
                method: 'DELETE',
            });

            return respostaAPI.ok;
        } catch (error) {
            console.error(`Erro ao remover prato: ${error}`);
            return false;
        }
    }


    async criarPrato(prato: PratoDTO): Promise<PratoDTO | null> {
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraPrato}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(prato),
            });

            if (respostaAPI.ok) {
                const novoPrato: PratoDTO = await respostaAPI.json();
                return novoPrato;
            }

            console.error('Erro ao criar prato: resposta não OK');
            return null;
        } catch (error) {
            console.error(`Erro ao criar prato: ${error}`);
            return null;
        }
    }
}

export default new PratoRequests();
