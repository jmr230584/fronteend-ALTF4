/**
 * Interface para representar os dados do livro recebidos da API
 */
interface ClienteDTO {
    idCliente?: number;
    nome?: string;
    email?: string;
    endereco?: string;
    telefone?: string;
    senha?: string;
    statusCliente?: boolean; // Indica se o cliente está ativo ou inativo
}

export default ClienteDTO;
