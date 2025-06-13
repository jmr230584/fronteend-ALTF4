/**
 * Interface para representar os dados do livro recebidos da API
 */
interface GerenteDTO {
    nome?: string;
    telefone?: string;               // ID do livro (? indica um parâmetro opcional)
    email?: string;         // Status do livro no sistema (ativo/inativo)
    senha?: string;               // Título do livro            // Autor do livro
}

export default GerenteDTO;
