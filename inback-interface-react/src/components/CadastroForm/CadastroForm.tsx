import { useState, JSX } from 'react';
import estilo from './CadastroForm.module.css';
import backgroundImage from '../../assets/background.webp';

function CadastroForm(): JSX.Element {
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [email, setEmail] = useState('');
    const [celular, setCelular] = useState('');
    const [senha, setSenha] = useState('');
    const [imagem, setImagem] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImagemChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImagem(file);
            setPreview(URL.createObjectURL(file)); // mostra preview
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('dataNascimento', dataNascimento);
        formData.append('email', email);
        formData.append('celular', celular);
        formData.append('senha', senha);
        if (imagem) formData.append('imagemPerfil', imagem);

        try {
            const response = await fetch('http://localhost:3000/usuario', {
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
                
                {/* Preview da imagem */}
                <div className={estilo['imagem-preview-container']}>
                    {preview ? (
                        <img src={preview} alt="Preview" className={estilo['imagem-preview']} />
                    ) : (
                        <div className={estilo['imagem-preview-placeholder']}>
                            Selecione uma imagem
                        </div>
                    )}
                </div>

                <label>
                    Foto de Perfil
                    <input type="file" accept="image/*" onChange={handleImagemChange} />
                </label>

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
                    Data de Nascimento
                    <input
                        type="date"
                        value={dataNascimento}
                        onChange={(e) => setDataNascimento(e.target.value)}
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
                    Celular
                    <input
                        type="text"
                        placeholder="Insira seu celular"
                        value={celular}
                        onChange={(e) => setCelular(e.target.value)}
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
