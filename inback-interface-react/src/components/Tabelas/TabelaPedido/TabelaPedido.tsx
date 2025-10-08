// Importa hooks e tipos do React
import { JSX, useEffect, useState } from 'react';
// Importa os componentes da biblioteca PrimeReact
import { DataTable } from 'primereact/datatable'; // Tabela responsiva com recursos como paginação e ordenação
import { Column } from 'primereact/Column'; // Representa uma coluna da tabela
import { Button } from 'primereact/button'; // Botão estilizado da PrimeReact
// Importa o arquivo CSS com estilos específicos para este componente
import estilo from './TabelaPedido.module.css';
import PedidoDTO from '../../../interfaces/Pedidointerface';
import PedidoRequests from '../../../fetch/PedidoRequests';
import EditIcon from '../../../assets/editar.svg.png';

// Declara o componente funcional TabelaLivro
function TabelaPrato(): JSX.Element {
    // Hook useState para armazenar a lista de livros
    const [pedidos, setPedidos] = useState<PedidoDTO[]>([]);

    // Botões personalizados para a paginação da tabela (utilizado pelo componente DataTable da lib PrimeReact)
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    // Hook useEffect para buscar os livros na primeira renderização do componente
    useEffect(() => {
        const fetchPedidos = async () => {   // função para fazer a consulta de livros
            try {
                const listaDePedidos = await PedidoRequests.listarPedidos(); // Chamada assíncrona à API
                setPedidos(Array.isArray(listaDePedidos) ? listaDePedidos : []); // Atualiza o estado apenas se o retorno for um array
            } catch (error) {
                console.error(`Erro ao buscar os pedidos: ${error}`); // Exibe erro no console se a requisição falhar
            }
        }

        fetchPedidos(); // Executa a função de busca
    }, []); // Array vazio garante que será executado apenas uma vez (montagem do componente)

    return (
        <main>
            {/* Título da tabela com classe personalizada */}
            <h1 className={estilo['header-tabela-pedido']}>Lista de Pedidos</h1>

            {/* Componente DataTable da PrimeReact, responsável por exibir os dados em forma de tabela */}
            <DataTable
                value={pedidos} // Fonte de dados da tabela
                paginator // Ativa paginação
                rows={5} // Mostra 10 registros por página por padrão
                rowsPerPageOptions={[5, 10, 25, 50]} // Opções que o usuário pode escolher
                tableStyle={{ minWidth: '50rem' }} // Define um estilo mínimo para a tabela
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" // Layout dos controles de paginação
                currentPageReportTemplate="{first} de {last} total {totalRecords}" // Texto que exibe o status da paginação
                paginatorLeft={paginatorLeft} // Botão à esquerda da paginação
                paginatorRight={paginatorRight} // Botão à direita da paginação
                className={estilo['data-table']} // Classe CSS personalizada
            >
                {/* Colunas que representam os atributos de cada livro */}
                <Column field="idPedido" header="ID DO PEDIDO" style={{ width: '20%' }} />
                <Column field="idCliente" header="ID DO CLIENTE" style={{ width: '20%' }} />
                <Column field="idPrato" header="ID DO PRATO" style={{ width: '20%' }} />
                {/* Coluna personalizada para exibir a data formatada */}
                <Column
                    field="dataPedido"
                    header="Data do Pedido"
                    style={{ width: '20%' }}
                    body={(rowData) => {
                        const data = new Date(rowData.dataPedido);
                        const dia = String(data.getDate()).padStart(2, '0');
                        const mes = String(data.getMonth() + 1).padStart(2, '0');
                        const ano = data.getFullYear();
                        return `${dia}/${mes}/${ano}`;
                    }}
                />

                {/* Coluna que exibe o valor de aquisição formatado como moeda brasileira */}
                {/* <Column
                    field="valorAquisicao"
                    header="Valor de Aquisição"
                    style={{ width: '10%' }}
                    body={(rowData) => {
                        const valor = Number(rowData.valorAquisicao); // Converte o valor para número
                        return valor.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }); // Formata como moeda brasileira
                    }}
                /> */}
                <Column field="quantidade" header="Quantidade" style={{ width: '20%' }} />
                <Column
                    header="Ações"
                    style={{ width: '10%' }}
                    body={(rowData) => (
                        <Button
                            className="p-button-warning"
                            onClick={() => alert(`Editar cliente: ${rowData.nome}`)}
                        >
                            <img src={EditIcon} alt="Editar" style={{ width: '16px', marginRight: '4px' }} />
                            Editar
                        </Button>
                    )}
                />

            </DataTable>
        </main>
    );
}

// Exporta o componente para ser utilizado em outros arquivos
export default TabelaPrato;
