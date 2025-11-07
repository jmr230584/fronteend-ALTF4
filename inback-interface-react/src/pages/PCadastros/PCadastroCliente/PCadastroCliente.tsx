// Importa o componente de cabeçalho da aplicação
import Cabecalho from "../../../components/Cabecalho/Cabecalho.jsx";

import CadastroCliente from "../../../components/Cadastros/CadastrarCliente/CadastroCliente.js";

// Importa o componente que contém o formulário de login

// Importa o componente de rodapé da aplicação


// Componente funcional que representa a página de login
function PCadastroCliente() {
    return (
        <div className="pagina-grid">
            {/* Renderiza o cabeçalho da página */}
            <Cabecalho />

            {/* Renderiza o formulário de login */}
            <CadastroCliente />
        </div>
    );
}

// Exporta o componente para que possa ser usado em outras partes da aplicação
export default PCadastroCliente;
