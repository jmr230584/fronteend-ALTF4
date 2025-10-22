// Importa o componente de cabeçalho da aplicação
import Cabecalho from "../../components/Cabecalho/Cabecalho.jsx";

// Importa o componente que contém o formulário de login
import Pagamento from "../../components/Pagamento/Pagamento.js";
import Rodape from "../../components/Rodape/Rodape";
// Importa o componente de rodapé da aplicação


// Componente funcional que representa a página de login
function PPagamento() {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            {/* Renderiza o formulário de login */}
            <Pagamento />

             <Rodape />
        </div>
    );
}

// Exporta o componente para que possa ser usado em outras partes da aplicação
export default PPagamento;
