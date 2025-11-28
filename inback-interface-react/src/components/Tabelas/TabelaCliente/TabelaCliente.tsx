import { JSX, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import estilo from './TabelaCliente.module.css';
import ClienteDTO from '../../../interfaces/Clienteinterface';
import ClienteRequests from '../../../fetch/ClienteRequests';
import EditIcon from '../../../assets/editar.svg.png';
import DeleteIcon from '../../../assets/lixeira.png';
import AddIcon from '../../../assets/botao-adicionar.png';
import { APP_ROUTES } from '../../../appConfig';

function TabelaCliente(): JSX.Element {
    const [clientes, setClientes] = useState<ClienteDTO[]>([]);

    const paginatorLeft = <Button type="button" icon="pi pi-refresh" text />;
    const paginatorRight = <Button type="button" icon="pi pi-download" text />;

    useEffect(() => {
        const fetchClientes = async () => {
            try {
                const listaDeClientes = await ClienteRequests.listarClientes();
                setClientes(Array.isArray(listaDeClientes) ? listaDeClientes : []);
            } catch (error) {
                console.error(`Erro ao buscar clientes: ${error}`);
            }
        };

        fetchClientes();
    }, []);

    const handleEditarCliente = (idCliente: number) => {
        alert(`Editar cliente: ${idCliente}`);
    };

    // usa ClienteRequests.removerCliente (que manda PUT /remove/cliente?idCliente=XX)
    const handleRemoverCliente = async (idCliente: number) => {
        const confirmacao = window.confirm("Deseja realmente apagar este cliente?");
        if (!confirmacao) return;

        try {
            const sucesso = await ClienteRequests.removerCliente(idCliente);

            if (sucesso) {
                setClientes(prev => prev.filter(c => c.idCliente !== idCliente));
                alert("Cliente removido com sucesso!");
            } else {
                alert("Erro ao remover cliente. Verifique o console (network/backend).");
            }
        } catch (error) {
            console.error("Erro ao remover cliente:", error);
            alert("Erro ao remover cliente.");
        }
    };

    return (
        <main>
            <h1 className={estilo['header-tabela-cliente']}>Lista de Clientes</h1>

            <Button
                className="p-button-success"
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}
                onClick={() => window.location.href = APP_ROUTES.ROUTE_CADASTRO_CLIENTE}
            >
                <img src={AddIcon} alt="Adicionar" style={{ width: '20px', height: '20px' }} />
                Adicionar Cliente
            </Button>

            <DataTable
                value={clientes}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
                currentPageReportTemplate="{first} de {last} total {totalRecords}"
                paginatorLeft={paginatorLeft}
                paginatorRight={paginatorRight}
                className={estilo['data-table']}
            >
                <Column field="idCliente" header="ID" style={{ width: '10%' }} />
                <Column field="nome" header="Nome" style={{ width: '20%' }} />
                <Column field="email" header="Email" style={{ width: '30%' }} />
                <Column field="endereco" header="Endereço" style={{ width: '20%'}} />
                <Column field="telefone" header="Telefone" style={{ width: '20%' }} />

                <Column
                    header="Ações"
                    style={{ width: '20%' }}
                    body={(rowData) => (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                className="p-button-warning"
                                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                onClick={() => handleEditarCliente(rowData.idCliente)}
                            >
                                <img src={EditIcon} alt="Editar" style={{ width: '16px', height: '16px' }} />
                                Editar
                            </Button>

                            <Button
                                className="p-button-danger"
                                style={{ display: 'flex', alignItems: 'center', gap: '4px' }}
                                onClick={() => handleRemoverCliente(rowData.idCliente)}
                            >
                                <img src={DeleteIcon} alt="Apagar" style={{ width: '16px', height: '16px' }} />
                                Apagar
                            </Button>
                        </div>
                    )}
                />
            </DataTable>
        </main>
    );
}

export default TabelaCliente;
