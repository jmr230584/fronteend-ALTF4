// Importa o tipo JSX do React para tipagem do componente
import { JSX } from 'react';

// Importa o componente de cabeçalho
import Cabecalho from '../../../components/Cabecalho/Cabecalho';

// Importa o componente da tabela que lista os alunos
import TabelaCliente from '../../../components/Tabelas/TabelaCliente/TabelaCliente';
import TabelaGerente from '../../../components/Tabelas/TabelaGerente/TabelaGerente';
import TabelaPrato from '../../../components/Tabelas/TabelaPrato/TabelaPrato';
import TabelaPedido from '../../../components/Tabelas/TabelaPedido/TabelaPedido';

// Importa o componente de rodapé
import Rodape from '../../../components/Rodape/Rodape';

// Componente funcional que representa a página de listagem de alunos
function PListaCliente(): JSX.Element {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />
            {/* Renderiza a tabela com a lista de alunos */}
            <TabelaCliente />

            <TabelaGerente />

            <TabelaPrato />

            <TabelaPedido />
            {/* Renderiza o rodapé da página */}
            <Rodape />
        </div>
    );
}

// Exporta o componente para uso em outras partes do projeto
export default PListaCliente;
