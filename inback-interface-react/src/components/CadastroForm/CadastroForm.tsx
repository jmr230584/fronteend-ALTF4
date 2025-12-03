import { useState } from 'react';
import estilo from './CadastroForm.module.css';
import backgroundImage from '../../assets/background.webp';

function CadastroForm() {
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
            console.log('Cliente cadastrado:', data);

            if (response.ok) {
                alert('Cliente cadastrado com sucesso!');

                // limpar campos
                setNome('');
                setEmail('');
                setSenha('');
                setEndereco('');
                setTelefone('');
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

                <label>
                    NOME COMPLETO
                    <input
                        type="text"
                        placeholder="INSIRA SEU NOME COMPLETO"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </label>

                <label>
                    E-MAIL
                    <input
                        type="email"
                        placeholder="INSIRA SEU EMAIL"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </label>

                <label>
                    SENHA
                    <input
                        type="password"
                        placeholder="INSIRA SUA SENHA"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                </label>

                <label>
                    ENDEREÇO
                    <input
                        type="text"
                        placeholder="INSIRA SEU ENDEREÇO"
                        value={endereco}
                        onChange={(e) => setEndereco(e.target.value)}
                        required
                    />
                </label>

                <label>
                    TELEFONE
                    <input
                        type="text"
                        placeholder="INSIRA SEU TELEFONE"
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
