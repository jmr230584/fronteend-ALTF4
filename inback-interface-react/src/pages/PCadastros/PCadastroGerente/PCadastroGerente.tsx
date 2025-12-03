// Importa o componente de cabeçalho da aplicação
import Cabecalho from "../../../components/Cabecalho/Cabecalho.jsx";

import CadastroForm from "../../../components/CadastroForm/CadastroForm.js";

import CadastroGerente from "../../../components/Cadastros/CadastrarGerente/CadastroGerente.js";
// Importa o componente que contém o formulário de login

// Importa o componente de rodapé da aplicação


// Componente funcional que representa a página de login
function PCadastroGerente() {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            <CadastroGerente/>

            {/* Renderiza o formulário de login */}
        </div>
    );
}

// Exporta o componente para que possa ser usado em outras partes da aplicação
export default PCadastroGerente;
