/**
 * Interface para representar os dados do livro recebidos da API
 */
interface PratoDTO {
    idPrato?: number;               // ID do livro (? indica um parâmetro opcional)
    nome?: string;         // Status do livro no sistema (ativo/inativo)
    descricao?: string;
    preco?: number;
    idGerente?: number;               // Título do livro            // Autor do livro
}

export default PratoDTO;
