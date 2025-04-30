/**
 * Interface para representar os dados do livro recebidos da API
 */
interface PratoDTO {
    idPedido?: number;               // ID do livro (? indica um parâmetro opcional)
    idCliente?: number;         // Status do livro no sistema (ativo/inativo)
    idPrato?: number;
    dataPedido?: Date;
    quantidade?: number;               // Título do livro            // Autor do livro
}

export default PratoDTO;
