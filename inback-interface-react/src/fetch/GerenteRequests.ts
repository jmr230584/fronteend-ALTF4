import { SERVER_CFG } from '../appConfig';
import GerenteDTO from '../interfaces/Gerenteinterface';

class GerenteRequests {
    private serverURL: string;
    private routeListaGerente: string;
    private routeCadastraGerente: string;
    private routeAtualizaGerente: string;
    private routeRemoveGerente: string;

    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;
        this.routeListaGerente = '/lista/gerentes';
        this.routeCadastraGerente = '/novo/gerente';
        this.routeAtualizaGerente = '/atualiza/gerente';
        this.routeRemoveGerente = '/remove/gerente'; // <-- correto
    }

    async listarGerentes(): Promise<GerenteDTO[] | null> {
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaGerente}`);
            if (respostaAPI.ok) {
                return await respostaAPI.json();
            }
            return null;
        } catch (error) {
            console.error(`Erro ao fazer a consulta de gerentes: ${error}`);
            return null;
        }
    }

    async removerGerente(idGerente: number): Promise<boolean> {
        try {
            const url = `${this.serverURL}${this.routeRemoveGerente}?idGerente=${idGerente}`;

            const respostaAPI = await fetch(url, {
                method: 'PUT', // <-- método correto
            });

            return respostaAPI.ok;
        } catch (error) {
            console.error(`Erro ao remover gerente: ${error}`);
            return false;
        }
    }

    async criarGerente(gerente: GerenteDTO): Promise<GerenteDTO | null> {
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeCadastraGerente}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gerente),
            });

            if (respostaAPI.ok) {
                return await respostaAPI.json();
            }

            return null;
        } catch (error) {
            console.error(`Erro ao criar gerente: ${error}`);
            return null;
        }
    }
}

export default new GerenteRequests();
