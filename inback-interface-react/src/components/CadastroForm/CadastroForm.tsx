import { useState, JSX } from 'react';
import estilo from './CadastroForm.module.css';
import backgroundImage from '../../assets/background.webp';

function CadastroForm(): JSX.Element {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [endereco, setEndereco] = useState('');
    const [telefone, setTelefone] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('email', email);
        formData.append('senha', senha);
        formData.append('endereco', endereco);
        formData.append('telefone', telefone);

        try {
            const response = await fetch('http://localhost:3333/novo/cliente', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            console.log('Usuário cadastrado:', data);
            alert('Cadastro realizado com sucesso!');
        } catch (err) {
            console.error('Erro ao cadastrar:', err);
            alert('Erro ao cadastrar usuário');
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
                    E-mail
                    <input
                        type="email"
                        placeholder="Insira seu email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Senha
                    <input
                        type="password"
                        placeholder="Insira sua senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Endereço
                    <input
                        type="text"
                        placeholder="Insira seu endereço"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
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

                <input
                    type="submit"
                    value="CONFIRMAR CONTA"
                    className={estilo['input-button-login']}
                />
            </form>
        </section>
    );
}

export default CadastroForm;
