// Importa o componente de cabeçalho da aplicação
import Cabecalho from "../../components/Cabecalho/Cabecalho.jsx";

// Importa o componente que contém o formulário de login
import Perfil from "../../components/Perfil/Perfil.js";

// Importa o componente de rodapé da aplicação


// Componente funcional que representa a página de login
function PPerfil() {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            {/* Renderiza o formulário de login */}
            <Perfil />

        </div>
    );
}

// Exporta o componente para que possa ser usado em outras partes da aplicação
export default PPerfil;
