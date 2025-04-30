// Importa os hooks e componentes necessários
import { JSX, useEffect, useState } from 'react'; // Hooks do React para trabalhar com estado e efeitos colaterais

// Importa os componentes da biblioteca PrimeReact
import { DataTable } from 'primereact/datatable'; // Componente de tabela da biblioteca PrimeReact
import { Column } from 'primereact/column'; // Componente de coluna da tabela
import { Button } from 'primereact/button'; // Componente de botão da PrimeReact

// Importa o serviço responsável pelas requisições relacionadas a empréstimos
import EmprestimoRequests from '../../../fetch/EmprestimoRequests'; // Importa a classe responsável pelas requisições dos empréstimos

// Importa o arquivo CSS com estilos específicos para este componente
import estilo from './TabelaEmprestimo.module.css'; // Importa os estilos específicos para este componente
import EmprestimoDTO from '../../../interfaces/EmprestimoInterface';

function TabelaEmprestimo(): JSX.Element {
    // Define o estado local para armazenar os dados dos empréstimos
    const [emprestimos, setEmprestimos] = useState<EmprestimoDTO[]>([]);

    // Botões personalizados para a paginação da tabela (utilizado pelo componente DataTable da lib PrimeReact)
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />; // Botão de "refresh" na esquerda
    const paginatorRight = <Button type="button" icon="pi pi-download" text />; // Botão de "download" na direita

    // Hook useEffect para buscar os dados de empréstimos assim que o componente for montado
    useEffect(() => {
        // Função assíncrona para realizar a requisição dos empréstimos
        const fetchEmprestimos = async () => {
            try {
                const listaDeEmprestimos = await EmprestimoRequests.listarEmprestimos(); // Chamada à API
                // Atualiza o estado apenas se o retorno for um array
                setEmprestimos(Array.isArray(listaDeEmprestimos) ? listaDeEmprestimos : []);
            } catch (error) {
                console.error(`Erro ao buscar alunos: ${error}`); // Exibe erro no console se a requisição falhar
            }
        }

        fetchEmprestimos(); // Executa a função de busca
    }, []); // Array vazio indica que esse efeito será executado apenas uma vez (componenteDidMount)

    return (
        <main>
            {/* Título da tabela com classe personalizada */}
            <h1 className={estilo['header-tabela-emprestimo']}>Lista de Empréstimos</h1>

            {/* Componente DataTable: renderiza a tabela com os dados dos empréstimos */}
            <DataTable
                value={emprestimos} // Define os dados que serão exibidos
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
                {/* Colunas da tabela, baseadas nos campos dos objetos de empréstimo */}
                <Column field="aluno.nome" header="Aluno" style={{ width: '10%' }} /> {/* Nome do aluno */}
                <Column field="livro.titulo" header="Livro" /> {/* Título do livro */}

                {/* Coluna personalizada para exibir a data do empréstimo formatada */}
                <Column
                    field="dataEmprestimo"
                    header="Data do emprétimo"
                    style={{ width: '15%' }}
                    body={(rowData) => {
                        const data = new Date(rowData.dataEmprestimo); // Converte a string de data em objeto Date
                        const dia = String(data.getDate()).padStart(2, '0'); // Formata o dia com 2 dígitos
                        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Formata o mês com 2 dígitos
                        const ano = data.getFullYear(); // Obtém o ano
                        return `${dia}/${mes}/${ano}`; // Retorna a data no formato brasileiro
                    }}
                />

                {/* Coluna personalizada para exibir a data de devolução formatada */}
                <Column
                    field="dataDevolucao"
                    header="Data de devolução"
                    style={{ width: '15%' }}
                    body={(rowData) => {
                        const data = new Date(rowData.dataDevolucao); // Converte a string de data em objeto Date
                        const dia = String(data.getDate()).padStart(2, '0'); // Formata o dia
                        const mes = String(data.getMonth() + 1).padStart(2, '0'); // Formata o mês
                        const ano = data.getFullYear(); // Obtém o ano
                        return `${dia}/${mes}/${ano}`; // Retorna a data formatada
                    }}
                />

                {/* Coluna com o status do empréstimo (ex: "pendente", "devolvido") */}
                <Column field="statusEmprestimo" header="Status do empréstimo" style={{ width: '15%' }} />
            </DataTable>
        </main>
    );
}

export default TabelaEmprestimo; // Exporta o componente para ser usado em outras partes da aplicação
