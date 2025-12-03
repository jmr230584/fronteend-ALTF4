import { JSX, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import estilo from './TabelaPrato.module.css';
import PratoDTO from '../../../interfaces/Pratointerface';
import PratoRequests from '../../../fetch/PratoRequests';
import EditIcon from '../../../assets/editar.svg.png';
import DeleteIcon from '../../../assets/lixeira.png';
import AddIcon from '../../../assets/botao-adicionar.png';
import { APP_ROUTES } from '../../../appConfig';

function TabelaPrato(): JSX.Element {
    const [pratos, setPratos] = useState<PratoDTO[]>([]);
    const navigate = useNavigate();

    // Carrega os pratos ao abrir a página
    useEffect(() => {
        const fetchPratos = async () => {
            try {
                const listaDePratos = await PratoRequests.listarPratos();
                setPratos(listaDePratos || []);
            } catch (error) {
                console.error(`Erro ao buscar pratos: ${error}`);
            }
        };
        fetchPratos();
    }, []);

    // Remove o prato usando o backend existente (/remove/prato?idPrato=)
    // Remove o prato chamando a PratoRequests
    const handleRemoverPrato = async (idPrato: number) => {
        const confirmacao = window.confirm("Deseja realmente apagar este prato?");
        if (!confirmacao) return;

        const sucesso = await PratoRequests.removerPrato(idPrato);

        if (sucesso) {
            setPratos(prev => prev.filter(p => p.idPrato !== idPrato));
            alert("Prato removido com sucesso!");
        } else {
            alert("Erro ao remover prato.");
        }
    };


    return (
        <main>
            <h1 className={estilo['header-tabela-prato']}>Lista de Pratos</h1>

            {/* Botão de adicionar */}
            <Button
                className={estilo['add-button']}
                onClick={() => navigate(APP_ROUTES.ROUTE_CADASTRO_PRATO)}
                style={{ marginBottom: '1rem' }}
            >
                <img src={AddIcon} alt="Adicionar" />
                Adicionar Prato
            </Button>


            <DataTable
                value={pratos}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                className={estilo['data-table']}
            >
                <Column field="idPrato" header="ID do Prato" style={{ width: '15%' }} />
                <Column field="nome" header="Nome" style={{ width: '35%' }} />
                <Column field="descricao" header="Descrição" style={{ width: '35%' }} />
                <Column
                    header="Ações"
                    style={{ width: '15%' }}
                    body={(rowData) => (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                className="p-button-warning"
                                onClick={() => alert(`Editar prato: ${rowData.nome}`)}
                            >
                                <img src={EditIcon} alt="Editar" style={{ width: '16px', height: '16px' }} />
                                Editar
                            </Button>
                            <Button
                                className="p-button-danger"
                                onClick={() => handleRemoverPrato(rowData.idPrato)}
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

export default TabelaPrato;
