// Importa os hooks e componentes necessários
import { JSX, useEffect, useState } from 'react'; // Hooks do React para trabalhar com estado e efeitos colaterais

// Importa os componentes da biblioteca PrimeReact
import { DataTable } from 'primereact/datatable'; // Componente de tabela da biblioteca PrimeReact
import { Column } from 'primereact/column'; // Componente de coluna da tabela
import { Button } from 'primereact/button'; // Componente de botão da PrimeReact

// Importa o serviço responsável pelas requisições relacionadas a alunos
import AlunoRequests from '../../../fetch/AlunoRequests'; // Importa a classe responsável pelas requisições dos alunos

// Importa o arquivo CSS com estilos específicos para este componente
import estilo from './TabelaAluno.module.css'; // Importa os estilos específicos para este componente
import AlunoDTO from '../../../interfaces/AlunoInterface';

/**
 * Componente que exibe uma tabela com os dados dos alunos.
 * Os dados são carregados da API assim que o componente é montado na tela.
 */
function TabelaAluno(): JSX.Element {
    // Hook useState: cria uma variável de estado chamada `alunos` para armazenar os dados dos alunos
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);

    // Botões personalizados para a paginação da tabela (utilizado pelo componente DataTable da lib PrimeReact)
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    /**
     * Hook useEffect: executa a função `fetchAlunos` assim que o componente for renderizado.
     * A função busca os alunos na API e armazena no estado.
     */
    useEffect(() => {
        const fetchAlunos = async () => {   // função para fazer a consulta de alunos
            try {
                const listaDeAlunos = await AlunoRequests.listarAlunos(); // Requisição à API
                setAlunos(Array.isArray(listaDeAlunos) ? listaDeAlunos : []); // Atualiza o estado com os dados
            } catch (error) {
                console.error(`Erro ao buscar alunos: ${error}`); // Exibe erro no console se a requisição falhar
            }
        };

        fetchAlunos();  // Executa a função de busca
    }, []); // Array vazio garante que será executado apenas uma vez (montagem do componente)

    return (
        <main>
            {/* Título da tabela com classe personalizada */}
            <h1 className={estilo['header-tabela-aluno']}>Lista de Alunos</h1>

            {/* Componente DataTable: renderiza a tabela com os dados dos alunos */}
            <DataTable
                value={alunos} // Define os dados que serão exibidos
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
                <Column field="nome" header="Nome" style={{ width: '15%' }} />
                <Column field="sobrenome" header="Sobrenome" style={{ width: '15%' }} />
                <Column field="endereco" header="Endereço" style={{ width: '20%' }} />
                <Column field="email" header="E-mail" style={{ width: '20%' }} />

                {/* Coluna personalizada para exibir a data formatada */}
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
                />

                {/* Coluna personalizada para exibir o celular formatado */}
                <Column
                    field="celular"
                    header="Celular"
                    style={{ width: '15%' }}
                    body={(rowData) => {
                        const celular = rowData.celular?.replace(/\D/g, '');
                        if (!celular || celular.length < 10) return celular;
                        return celular.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
                    }}
                />
            </DataTable>
        </main>
    );
}

export default TabelaAluno;
