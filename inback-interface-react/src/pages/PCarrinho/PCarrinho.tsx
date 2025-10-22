// Importa o componente de cabeçalho da aplicação
import Cabecalho from "../../components/Cabecalho/Cabecalho.jsx";
import Carrinho from "../../components/Carrinho/Carrinho";
import Rodape from "../../components/Rodape/Rodape";


// Componente funcional que representa a página de login
function PCarrinho() {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            {/* Renderiza o formulário de login */}
            <Carrinho />

            <Rodape />
        </div>
    );
}

// Exporta o componente para que possa ser usado em outras partes da aplicação
export default PCarrinho;
