import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function EditarCliente() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [cliente, setCliente] = useState<any>({
    nome: '',
    telefone: '',
    email: '',
    senha: '',
    endereco: ''
  });

  useEffect(() => {
    // Busca os dados do cliente pelo ID
    fetch(`http://localhost:3000/cliente/${id}`)
      .then(res => res.json())
      .then(data => setCliente(data))
      .catch(err => console.error(err));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/cliente/atualizar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idCliente: id, ...cliente }),
      });

      if (response.ok) {
        alert('Cliente atualizado com sucesso!');
        navigate('/'); // volta para a lista
      } else {
        alert('Erro ao atualizar cliente');
      }
    } catch (error) {
      console.error(error);
      alert('Erro ao atualizar cliente');
    }
  };

  return (
    <div>
      <h2>Editar Cliente</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input name="nome" value={cliente.nome} onChange={handleChange} required />
        </label>
        <label>
          Telefone:
          <input name="telefone" value={cliente.telefone} onChange={handleChange} required />
        </label>
        <label>
          Email:
          <input name="email" value={cliente.email} onChange={handleChange} required />
        </label>
        <label>
          Senha:
          <input name="senha" value={cliente.senha} onChange={handleChange} required />
        </label>
        <label>
          Endereço:
          <input name="endereco" value={cliente.endereco} onChange={handleChange} required />
        </label>
        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
}

export default EditarCliente;
