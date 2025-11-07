import { JSX, useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import estilo from './TabelaPedido.module.css';
import PedidoDTO from '../../../interfaces/Pedidointerface';
import PedidoRequests from '../../../fetch/PedidoRequests';
import EditIcon from '../../../assets/editar.svg.png';
import DeleteIcon from '../../../assets/lixeira.png';
import AddIcon from '../../../assets/botao-adicionar.png';

function TabelaPedido(): JSX.Element {
    const [pedidos, setPedidos] = useState<PedidoDTO[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const listaDePedidos = await PedidoRequests.listarPedidos();
                setPedidos(Array.isArray(listaDePedidos) ? listaDePedidos : []);
            } catch (error) {
                console.error(`Erro ao buscar os pedidos: ${error}`);
            }
        };
        fetchPedidos();
    }, []);

    const handleEditarPedido = (idPedido: number) => {
        alert(`Editar pedido: ${idPedido}`);
    };

    const handleRemoverPedido = async (idPedido: number) => {
        const confirmacao = window.confirm("Deseja realmente apagar este pedido?");
        if (!confirmacao) return;

        try {
            const sucesso = await PedidoRequests.removerPedido(idPedido);
            if (sucesso) setPedidos(prev => prev.filter(p => p.idPedido !== idPedido));
            else alert("Erro ao remover pedido.");
        } catch (error) {
            console.error("Erro ao remover pedido:", error);
            alert("Erro ao remover pedido.");
        }
    };

    const handleAdicionarPedido = () => {
        navigate('/pedido/novo');
    };

    return (
        <main>
            <h1 className={estilo['header-tabela-pedido']}>Lista de Pedidos</h1>

            {/* Botão de adicionar abaixo do título */}
            <Button className={estilo['add-button']} onClick={handleAdicionarPedido} style={{ marginBottom: '1rem' }}>
                <img src={AddIcon} alt="Adicionar" />
                Adicionar Pedido
            </Button>

            <DataTable
                value={pedidos}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25, 50]}
                tableStyle={{ minWidth: '50rem' }}
                className={estilo['data-table']}
            >
                <Column field="idPedido" header="ID DO PEDIDO" style={{ width: '20%' }} />
                <Column field="idCliente" header="ID DO CLIENTE" style={{ width: '20%' }} />
                <Column field="idPrato" header="ID DO PRATO" style={{ width: '20%' }} />
                <Column
                    field="dataPedido"
                    header="Data do Pedido"
                    style={{ width: '15%' }}
                    body={(rowData) => {
                        const data = new Date(rowData.dataPedido);
                        const dia = String(data.getDate()).padStart(2, '0');
                        const mes = String(data.getMonth() + 1).padStart(2, '0');
                        const ano = data.getFullYear();
                        return `${dia}/${mes}/${ano}`;
                    }}
                />
                <Column field="quantidade" header="Quantidade" style={{ width: '15%' }} />
                <Column
                    header="Ações"
                    style={{ width: '30%' }}
                    body={(rowData) => (
                        <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <Button className="p-button-warning" style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => handleEditarPedido(rowData.idPedido)}>
                                <img src={EditIcon} alt="Editar" style={{ width: '16px', height: '16px' }} />
                                Editar
                            </Button>

                            <Button className="p-button-danger" style={{ display: 'flex', alignItems: 'center', gap: '4px' }} onClick={() => handleRemoverPedido(rowData.idPedido)}>
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

export default TabelaPedido;
