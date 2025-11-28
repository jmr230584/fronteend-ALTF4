import { useState, JSX } from 'react';
import estilo from './CadastroGerente.module.css';
import backgroundImage from '../../../assets/background.webp';

function CadastroGerente(): JSX.Element {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('telefone', telefone);
        formData.append('email', email);
        formData.append('senha', senha);

        try {
            const response = await fetch('http://localhost:3333/novo/gerente', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Gerente cadastrado:', data);

            if (response.ok) {
                alert('Gerente cadastrado com sucesso!');
                setNome('');
                setTelefone('');
                setEmail('');
                setSenha('');
            } else {
                alert('Erro: ' + data);
            }
        } catch (err) {
            console.error('Erro ao cadastrar gerente:', err);
            alert('Erro ao cadastrar gerente');
        }
    };

    return (
        <section
            className={estilo['form-section']}
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <form className={estilo['form-login']} onSubmit={handleSubmit}>
                <h3>Cadastro de Gerente</h3>

                <label>
                    Nome Completo
                    <input
                        type="text"
                        placeholder="Insira o nome completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Telefone
                    <input
                        type="text"
                        placeholder="Insira o telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        required
                    />
                </label>

                <label>
                    E-mail
                    <input
                        type="email"
                        placeholder="Insira o e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Senha
                    <input
                        type="password"
                        placeholder="Crie uma senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </label>

                <input
                    type="submit"
                    value="CADASTRAR GERENTE"
                    className={estilo['input-button-login']}
                />
            </form>
        </section>
    );
}

export default CadastroGerente;
