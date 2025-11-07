import { useState, JSX } from 'react';
import estilo from './CadastroCliente.module.css';
import backgroundImage from '../../../assets/background.webp';

function CadastroCliente(): JSX.Element {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [endereco, setEndereco] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const cliente = {
            nome,
            telefone,
            email,
            senha,
            endereco,
        };

        try {
            const response = await fetch('http://localhost:3000/cliente', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cliente),
            });

            const data = await response.json();
            console.log('Cliente cadastrado:', data);

            if (response.ok) {
                alert('Cliente cadastrado com sucesso!');
                setNome('');
                setTelefone('');
                setEmail('');
                setSenha('');
                setEndereco('');
            } else {
                alert('Erro: ' + data);
            }
        } catch (err) {
            console.error('Erro ao cadastrar cliente:', err);
            alert('Erro ao cadastrar cliente');
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
                <h3>Cadastro de Cliente</h3>

                <label>
                    Nome Completo
                    <input
                        type="text"
                        placeholder="Insira seu nome completo"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Telefone
                    <input
                        type="text"
                        placeholder="Insira seu telefone"
                        value={telefone}
                        onChange={(e) => setTelefone(e.target.value)}
                        required
                    />
                </label>

                <label>
                    E-mail
                    <input
                        type="email"
                        placeholder="Insira seu e-mail"
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

                <label>
                    Endereço
                    <input
                        type="text"
                        placeholder="Insira seu endereço completo"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        required
                    />
                </label>

                <input
                    type="submit"
                    value="CADASTRAR CLIENTE"
                    className={estilo['input-button-login']}
                />
            </form>
        </section>
    );
}

export default CadastroCliente;
