import { JSX, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import estilo from './TabelaGerente.module.css';
import GerenteDTO from '../../../interfaces/Gerenteinterface';
import GerenteRequests from '../../../fetch/GerenteRequests';
import EditIcon from '../../../assets/editar.svg.png';
import DeleteIcon from '../../../assets/lixeira.png';
import AddIcon from '../../../assets/botao-adicionar.png';
import { APP_ROUTES } from '../../../appConfig';

function TabelaGerente(): JSX.Element {
    const [gerentes, setGerentes] = useState<GerenteDTO[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGerentes = async () => {
            try {
                const lista = await GerenteRequests.listarGerentes();
                setGerentes(Array.isArray(lista) ? lista : []);
            } catch (error) {
                console.error(`Erro ao buscar gerentes: ${error}`);
            }
        };
        fetchGerentes();
    }, []);

    const handleRemoverGerente = async (idGerente: number) => {
        const confirmacao = window.confirm("Deseja realmente apagar este gerente?");
        if (!confirmacao) return;

        try {
            const sucesso = await GerenteRequests.removerGerente(idGerente);

            if (sucesso) {
                setGerentes(prev => prev.filter(g => g.idGerente !== idGerente));
                alert("Gerente removido com sucesso!");
            } else {
                alert("Erro ao remover gerente.");
            }
        } catch (error) {
            console.error("Erro ao remover gerente:", error);
            alert("Erro ao remover gerente.");
        }
    };

    const handleAdicionarGerente = () => {
        navigate(APP_ROUTES.ROUTE_CADASTRO_GERENTE);
    };

    return (
        <main>
            <h1 className={estilo['header-tabela-gerente']}>Lista de Gerentes</h1>

            <Button
                className={estilo['add-button']}
                onClick={handleAdicionarGerente}
                style={{ marginBottom: '1rem' }}
            >
                <img src={AddIcon} alt="Adicionar" />
                Adicionar Gerente
            </Button>

            <DataTable
                value={gerentes}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                className={estilo['data-table']}
            >
                <Column field="idGerente" header="ID do Gerente" style={{ width: '10%' }} />
                <Column field="nome" header="Nome" style={{ width: '25%' }} />

                <Column
                    field="telefone"
                    header="Celular"
                    style={{ width: '25%' }}
                    body={(rowData) => {
                        const celular = rowData.telefone?.replace(/\D/g, '');
                        if (!celular || celular.length < 10) return celular;
                        return celular.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, '($1) $2 $3-$4');
                    }}
                />

                <Column field="email" header="Email" style={{ width: '25%' }} />
                <Column field="senha" header="Senha" style={{ width: '15%' }} />

                <Column
                    header="Ações"
                    style={{ width: '15%' }}
                    body={(rowData) => (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button
                                className="p-button-warning"
                                onClick={() => alert(`Editar gerente: ${rowData.nome}`)}
                            >
                                <img src={EditIcon} alt="Editar" style={{ width: '16px', marginRight: '4px' }} />
                                Editar
                            </Button>

                            <Button
                                className="p-button-danger"
                                onClick={() => handleRemoverGerente(rowData.idGerente)}
                            >
                                <img src={DeleteIcon} alt="Apagar" style={{ width: '16px', marginRight: '4px' }} />
                                Apagar
                            </Button>
                        </div>
                    )}
                />
            </DataTable>
        </main>
    );
}

export default TabelaGerente;
