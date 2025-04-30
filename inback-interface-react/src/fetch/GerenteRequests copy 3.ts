import { SERVER_CFG } from '../appConfig';
import GerenteDTO from '../interfaces/Gerenteinterface';

/**
 * Classe com a coleção de funções que farão as requisições à API
 * Esta classe representa apenas as requisições da entidade Aluno
 */
class GerenteRequests {

    private serverURL: string;          // Variável para o endereço do servidor
    private routeListaGerente: string;   // Variável para a rota de listagem de alunos
    private routeCadastraGerente: string; // Variável para a rota de cadastro de aluno
    private routeAtualizaGerente: string; // Variável para a rota de atualiação de aluno
    private routeRemoveGerente: string;   // Variável para a rota de remoção do aluno

    /**
     * O construtor é chamado automaticamente quando criamos uma nova instância da classe.
     * Ele define os valores iniciais das variáveis com base nas configurações da API.
     */
    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;     // Endereço do servidor web
        this.routeListaGerente = '/lista/gerente';    // Rota configurada na API
        this.routeCadastraGerente = '/novo/gerente';    // Rota configurada na API
        this.routeAtualizaGerente = '/atualiza/gerente'; // Rota configurada na API
        this.routeRemoveGerente = '/remove/gerente';    // Rota configurada na API
    }

    /**
     * Método que faz uma requisição à API para buscar a lista de alunos cadastrados
     * @returns Retorna um JSON com a lista de alunos ou null em caso de erro
     */
    async listarGerente(): Promise<GerenteDTO | null> {
        try {
            // faz a requisição no servidor
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaGerente}`);

            // Verifica se a resposta foi bem-sucedida (status HTTP 200-299)
            if (respostaAPI.ok) {
                // converte a reposta para um JSON
                const listaDeAlunos: GerenteDTO = await respostaAPI.json();
                // retorna a resposta
                return listaDeAlunos;
            }

            // retorna um valor nulo caso o servidor não envie a resposta
            return null;
        } catch (error) {
            // exibe detalhes do erro no console
            console.error(`Erro ao fazer a consulta de alunos: ${error}`);
            // retorna um valor nulo
            return null;
        }
    }
}

// Exporta a classe já instanciando um objeto da mesma
export default new GerenteRequests();