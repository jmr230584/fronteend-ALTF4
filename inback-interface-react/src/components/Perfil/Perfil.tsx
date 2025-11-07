import { useState } from 'react';
import estilo from './Perfil.module.css';
import perfilImg from '../../assets/perfil.png';
import background from '../../assets/background.webp';

function Perfil() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [imagemPerfil, setImagemPerfil] = useState(perfilImg);
    const [mostrarModal, setMostrarModal] = useState(false);
    const [novaImagem, setNovaImagem] = useState<File | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Senha:', senha);
        console.log('Imagem atual:', imagemPerfil);
    };

    const handleAbrirModal = () => {
        setMostrarModal(true);
    };

    const handleFecharModal = () => {
        setMostrarModal(false);
        setNovaImagem(null);
    };

    const handleSelecionarImagem = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setNovaImagem(file);
        }
    };

    const handleSalvarImagem = () => {
        if (novaImagem) {
            const imageURL = URL.createObjectURL(novaImagem);
            setImagemPerfil(imageURL);

            // Simula salvar no "banco"
            localStorage.setItem('fotoPerfil', imageURL);
            console.log('Imagem salva (simulada no banco):', imageURL);
        }
        handleFecharModal();
    };

    return (
        <div
            className={estilo.perfilContainer}
            style={{ backgroundImage: `url(${background})` }}
        >
            <form className={estilo.perfilForm} onSubmit={handleSubmit}>
                <img
                    src={imagemPerfil}
                    alt="Perfil"
                    className={estilo.perfilImagem}
                    onClick={handleAbrirModal}
                    title="Clique para alterar a imagem"
                />

                <label className={estilo.perfilLabel} htmlFor="email">
                    E-MAIL
                </label>
                <input
                    className={estilo.perfilInput}
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu email"
                />

                <label className={estilo.perfilLabel} htmlFor="senha">
                    SENHA
                </label>
                <input
                    className={estilo.perfilInput}
                    id="senha"
                    type="password"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="Digite sua senha"
                />

                <button className={estilo.perfilBotao} type="submit">
                    CONFIRMAR ALTERAÇÕES
                </button>
            </form>

            {/* Modal de troca de imagem */}
            {mostrarModal && (
                <div className={estilo.modalOverlay}>
                    <div className={estilo.modalContent}>
                        <h3>Alterar imagem de perfil</h3>
                        <input type="file" accept="image/*" onChange={handleSelecionarImagem} />

                        <div className={estilo.modalBotoes}>
                            <button onClick={handleSalvarImagem}>Salvar</button>
                            <button onClick={handleFecharModal}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Perfil;
