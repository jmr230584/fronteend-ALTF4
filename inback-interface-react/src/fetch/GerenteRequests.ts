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
        this.routeRemoveGerente = '/remove/gerente';
    }

    async listarGerentes(): Promise<GerenteDTO[] | null> {
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaGerente}`);
            if (respostaAPI.ok) {
                const listaDeGerentes: GerenteDTO[] = await respostaAPI.json();
                return listaDeGerentes;
            }
            return null;
        } catch (error) {
            console.error(`Erro ao fazer a consulta de gerentes: ${error}`);
            return null;
        }
    }

    async removerGerente(idGerente: number): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${this.serverURL}${this.routeRemoveGerente}/${idGerente}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${localStorage.getItem('token')}` // se necessário
                }
            });

            return respostaAPI.ok;
        } catch (error) {
            console.error(`Erro ao remover gerente: ${error}`);
            return false;
        }
    }

    /**
     * Método para criar um novo gerente na API
     * @param gerente Dados do gerente a ser criado
     * @returns O gerente criado ou null em caso de erro
     */
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
                const novoGerente: GerenteDTO = await respostaAPI.json();
                return novoGerente;
            }

            console.error('Erro ao criar gerente: resposta não OK');
            return null;
        } catch (error) {
            console.error(`Erro ao criar gerente: ${error}`);
            return null;
        }
    }
}

export default new GerenteRequests();
