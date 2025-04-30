import { SERVER_CFG } from '../appConfig';
import PratoDTO from '../interfaces/Pratointerface';

/**
 * Classe com a coleção de funções que farão as requisições à API
 * Esta classe representa apenas as requisições da entidade Aluno
 */
class PratoRequests {

    private serverURL: string;          // Variável para o endereço do servidor
    private routeListaPrato: string;   // Variável para a rota de listagem de alunos
    private routeCadastraPrato: string; // Variável para a rota de cadastro de aluno
    private routeAtualizaPrato: string; // Variável para a rota de atualiação de aluno
    private routeRemovePrato: string;   // Variável para a rota de remoção do aluno

    /**
     * O construtor é chamado automaticamente quando criamos uma nova instância da classe.
     * Ele define os valores iniciais das variáveis com base nas configurações da API.
     */
    constructor() {
        this.serverURL = SERVER_CFG.SERVER_URL;     // Endereço do servidor web
        this.routeListaPrato = '/lista/prato';    // Rota configurada na API
        this.routeCadastraPrato = '/novo/prato';    // Rota configurada na API
        this.routeAtualizaPrato = '/atualiza/prato'; // Rota configurada na API
        this.routeRemovePrato = '/remove/prato';    // Rota configurada na API
    }

    /**
     * Método que faz uma requisição à API para buscar a lista de alunos cadastrados
     * @returns Retorna um JSON com a lista de alunos ou null em caso de erro
     */
    async listarAlunos(): Promise<PratoDTO | null> {
        try {
            // faz a requisição no servidor
            const respostaAPI = await fetch(`${this.serverURL}${this.routeListaPrato}`);

            // Verifica se a resposta foi bem-sucedida (status HTTP 200-299)
            if (respostaAPI.ok) {
                // converte a reposta para um JSON
                const listaDeAlunos: PratoDTO = await respostaAPI.json();
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
export default new PratoRequests();