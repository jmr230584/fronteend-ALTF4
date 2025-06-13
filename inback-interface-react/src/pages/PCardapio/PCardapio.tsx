// Importa o componente de cabeçalho da aplicação
import Cabecalho from "../../components/Cabecalho/Cabecalho.jsx";
import Cardapio from "../../components/Cardapio/Cardapio";

// Importa o componente que contém o formulário de login
import LoginForm from "../../components/Cardapio/Cardapio";
import Rodape from "../../components/Rodape/Rodape";

// Importa o componente de rodapé da aplicação


// Componente funcional que representa a página de login
function PCardapio() {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            {/* Renderiza o formulário de login */}
            <Cardapio />

            <Rodape />
        </div>
    );
}

// Exporta o componente para que possa ser usado em outras partes da aplicação
export default PCardapio;
