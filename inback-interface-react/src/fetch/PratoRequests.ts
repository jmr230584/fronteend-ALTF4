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
        this.routeRemovePrato = '/remove/prato'; // ✔ rota correta
    }

    // Listar pratos
    async listarPratos(): Promise<PratoDTO[]> {
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaPrato}`);
            return respostaAPI.ok ? await respostaAPI.json() : [];
        } catch (error) {
            console.error(`Erro ao fazer a consulta de pratos: ${error}`);
            return [];
        }
    }

    // Remover prato (PUT)
    async removerPrato(idPrato: number): Promise<boolean> {
        const token = localStorage.getItem("token");

        try {
            const url = `${this.serverURL}${this.routeRemovePrato}?idPrato=${idPrato}`;

            const respostaAPI = await fetch(url, {
                method: 'PUT', // ✔ correto
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                }
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
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(prato),
            });

            return respostaAPI.ok ? await respostaAPI.json() : null;

        } catch (error) {
            console.error(`Erro ao criar prato: ${error}`);
            return null;
        }
    }
}

export default new PratoRequests();
