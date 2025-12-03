import { useState, JSX } from 'react';
import estilo from './CadastroPrato.module.css';
import backgroundImage from '../../../assets/background.webp';

function CadastroPrato(): JSX.Element {

    const [nome, setNome] = useState('');
    const [descricao, setDescricao] = useState('');
    const [preco, setPreco] = useState('');

    // ID do gerente logado (substitua pelo ID real do usuário logado)
    const idGerente = 1;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const prato = {
            nome,
            descricao,
            preco: parseFloat(preco),
            idGerente
        };

        try {
            const response = await fetch('http://localhost:3333/novo/prato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prato)
            });

            const data = await response.json();
            console.log('Prato cadastrado:', data);

            if (response.ok) {
                alert('Prato cadastrado com sucesso!');
                setNome('');
                setDescricao('');
                setPreco('');
            } else {
                alert('Erro: ' + data);
            }
        } catch (err) {
            console.error('Erro ao cadastrar prato:', err);
            alert('Erro ao cadastrar prato');
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
                <h3>Cadastro de Prato</h3>

                <label>
                    Nome do Prato
                    <input
                        type="text"
                        placeholder="Insira o nome do prato"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Descrição
                    <input
                        type="text"
                        placeholder="Insira a descrição do prato"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        required
                    />
                </label>

                <label>
                    Preço (R$)
                    <input
                        type="number"
                        step="0.01"
                        placeholder="Insira o preço"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        required
                    />
                </label>

                <input
                    type="submit"
                    value="CADASTRAR PRATO"
                    className={estilo['input-button-login']}
                />
            </form>
        </section>
    );
}

export default CadastroPrato;
