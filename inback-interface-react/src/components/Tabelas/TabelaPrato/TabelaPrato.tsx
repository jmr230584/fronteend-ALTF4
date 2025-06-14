// Importa hooks e tipos do React
import { JSX, useEffect, useState } from 'react';
// Importa os componentes da biblioteca PrimeReact
import { DataTable } from 'primereact/datatable'; // Tabela responsiva com recursos como paginação e ordenação
import { Column } from 'primereact/Column'; // Representa uma coluna da tabela
import { Button } from 'primereact/button'; // Botão estilizado da PrimeReact
// Importa o arquivo CSS com estilos específicos para este componente
import estilo from './TabelaPrato.module.css';
import PratoDTO from '../../../interfaces/Pratointerface';
import PratoRequests from '../../../fetch/PratoRequests';

// Declara o componente funcional TabelaLivro
function TabelaPrato(): JSX.Element {
    // Hook useState para armazenar a lista de livros
    const [pratos, setPratos] = useState<PratoDTO[]>([]);

    // Botões personalizados para a paginação da tabela (utilizado pelo componente DataTable da lib PrimeReact)
    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    // Hook useEffect para buscar os livros na primeira renderização do componente
    useEffect(() => {
        const fetchPratos = async () => {   // função para fazer a consulta de livros
            try {
                const listaDePratos = await PratoRequests.listarPratos(); // Chamada assíncrona à API
                setPratos(Array.isArray(listaDePratos) ? listaDePratos : []); // Atualiza o estado apenas se o retorno for um array
            } catch (error) {
                console.error(`Erro ao buscar Pratos: ${error}`); // Exibe erro no console se a requisição falhar
            }
        }

        fetchPratos(); // Executa a função de busca
    }, []); // Array vazio garante que será executado apenas uma vez (montagem do componente)

    return (
        <main>
            {/* Título da tabela com classe personalizada */}
            <h1 className={estilo['header-tabela-livro']}>Lista de Pratos</h1>

            {/* Componente DataTable da PrimeReact, responsável por exibir os dados em forma de tabela */}
            <DataTable
                value={pratos} // Fonte de dados da tabela
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
                <Column field="idPrato" header="ID do Prato" style={{ width: '15%' }} />
                <Column field="nome" header="Nome" style={{ width: '35%' }} />
                <Column field="descricao" header="Descrição" style={{ width: '35%' }} />
                {/* Coluna personalizada para exibir a data formatada */}
                {/* Coluna que exibe o valor de aquisição formatado como moeda brasileira */}
                <Column
                    field="preco"
                    header="Preço"
                    style={{ width: '15%' }}
                    body={(rowData) => {
                        const valor = Number(rowData.preco); // Converte o valor para número
                        return valor.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                        }); // Formata como moeda brasileira
                    }}
                />
            </DataTable>
        </main>
    );
}

// Exporta o componente para ser utilizado em outros arquivos
export default TabelaPrato;
