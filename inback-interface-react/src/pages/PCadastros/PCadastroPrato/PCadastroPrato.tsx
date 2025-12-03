// Importa o componente de cabeçalho da aplicação
import Cabecalho from "../../../components/Cabecalho/Cabecalho.jsx";



import CadastroPrato from "../../../components/Cadastros/CadastrarPrato/CadastroPrato.js";
// Importa o componente que contém o formulário de login

// Importa o componente de rodapé da aplicação


// Componente funcional que representa a página de login
function PCadastroPrato() {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            <CadastroPrato/>

            {/* Renderiza o formulário de login */}
        </div>
    );
}

// Exporta o componente para que possa ser usado em outras partes da aplicação
export default PCadastroPrato;
