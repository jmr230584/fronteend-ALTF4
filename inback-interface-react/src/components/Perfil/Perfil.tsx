import { useState } from 'react';
import estilo from './Perfil.module.css';
import perfilImg from '../../assets/perfil.png';
import background from '../../assets/background.webp';

function Perfil() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Email:', email);
        console.log('Senha:', senha);
    };

    return (
        <div
            className={estilo.perfilContainer}
            style={{ backgroundImage: `url(${background})` }}
        >
            <form className={estilo.perfilForm} onSubmit={handleSubmit}>
                <img src={perfilImg} alt="Perfil" className={estilo.perfilImagem} />

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
        </div>
    );
}

export default Perfil;
