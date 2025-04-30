/**
 * Interface para representar os dados do livro recebidos da API
 */
interface ClienteDTO {
    nome?: string;               // ID do livro (? indica um parâmetro opcional)
    email?: string;         // Status do livro no sistema (ativo/inativo)
    endereco?: string;               // Título do livro
    telefone?: string;                // Autor do livro
}

export default ClienteDTO;
