// // Importa os hooks e componentes necessários
import { JSX, useEffect, useState } from 'react'; // Hooks do React para trabalhar com estado e efeitos colaterais
// Importa o arquivo CSS com estilos específicos para este componente
import estilo from './TabelaCliente.module.css'; // Importa os estilos específicos para este componenteimport { DataTable } from 'primereact/datatable'; // Componente de tabela da biblioteca PrimeReact
import { Column } from 'primereact/Column'; // Componente de coluna da tabela
import { Button } from 'primereact/button'; // Componente de botão da PrimeReact
import ClienteRequests from '../../../fetch/ClienteRequests';
import ClienteDTO from '../../../interfaces/Clienteinterface';
import { DataTable } from 'primereact/datatable';
import EditIcon from '../../../assets/editar.svg.png';

/**
 * Componente que exibe uma tabela com os dados dos alunos.
 * Os dados são carregados da API assim que o componente é montado na tela.
 */
function TabelaCliente(): JSX.Element {
    // Hook useState: cria uma variável de estado chamada `alunos` para armazenar os dados dos alunos
    const [clientes, setClientes] = useState<ClienteDTO[]>([]);
    // Botões personalizados para a paginação da tabela (utilizado pelo componente DataTable da lib PrimeReact)
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;
    /**
        * Hook useEffect: executa a função `fetchAlunos` assim que o componente for renderizado.
        * A função busca os alunos na API e armazena no estado.
        */
    useEffect(() => {
        const fetchClientes = async () => {   // função para fazer a consulta de alunos
            try {
                const listaDeClientes = await ClienteRequests.listarClientes(); // Requisição à API
                setClientes(Array.isArray(listaDeClientes) ? listaDeClientes : []); // Atualiza o estado com os dados
            } catch (error) {
                console.error(`Erro ao buscar clientes: ${error}`); // Exibe erro no console se a requisição falhar
            }
        };
        fetchClientes();  // Executa a função de busca
    }, []); // Array vazio garante que será executado apenas uma vez (montagem do componente)
    return (
        <main>
            {/* Título da tabela com classe personalizada */}
            <h1 className={estilo['header-tabela-aluno']}>Lista de Clientes</h1>
            {/* Componente DataTable: renderiza a tabela com os dados dos alunos */}
            <DataTable
                value={clientes} // Define os dados que serão exibidos
                paginator // Habilita paginação
                rows={5} // Quantidade de linhas por página
                rowsPerPageOptions={[5, 10, 25, 50]} // Opções de linhas por página
                tableStyle={{ minWidth: '50rem' }} // Estilização mínima da tabela
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink" // Template da paginação
                currentPageReportTemplate="{first} de {last} total {totalRecords}" // Template do relatório da página
                paginatorLeft={paginatorLeft} // Botão à esquerda da paginação
                paginatorRight={paginatorRight} // Botão à direita da paginação
                className={estilo['data-table']} // Classe CSS personalizada
            >
                {/* Colunas da tabela, baseadas nos campos dos objetos de aluno */}
                <Column field="idCliente" header="ID Do Cliente" style={{ width: '15%' }} />
                <Column field="nome" header="Nome" style={{ width: '15%' }} />
                <Column field="email" header="Email" style={{ width: '20%' }} />
                <Column field="endereco" header="Endereço" style={{ width: '20%' }} />
                <Column
                    field="telefone"
                    header="Celular"
                    style={{ width: '10%' }}
                    body={(rowData) => {
                        const celular = rowData.telefone?.replace(/\D/g, '');
                        if (!celular || celular.length < 10) return celular;
                        return celular.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
                    }}
                />
                <Column field="senha" header="Senha" style={{ width: '10%' }} />
                <Column field="statusCliente" header="Status" style={{ width: '10%' }} body={(rowData) => (rowData.statusCliente ? 'Ativo' : 'Inativo')} />
                {/* Coluna personalizada para exibir a data formatada
                 <Column
                     field="dataNascimento"
                     header="Data Nascimento"
                     style={{ width: '15%' }}
                     body={(rowData) => {
                         const data = new Date(rowData.dataNascimento);
                         const dia = String(data.getDate()).padStart(2, '0');
                         const mes = String(data.getMonth() + 1).padStart(2, '0');
                         const ano = data.getFullYear();
                         return `${dia}/${mes}/${ano}`;
                     }}
                 /> */}
                {/* Coluna personalizada para exibir o celular formatado */}
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
export default TabelaCliente;
