import { useEffect, useState, JSX } from "react";
import estilo from "./Cardapio.module.css";

interface Prato {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string; // caso queira exibir imagem depois
}

function Cardapio(): JSX.Element {
  const [pratos, setPratos] = useState<Prato[]>([]);

  useEffect(() => {
    const carregarPratos = async () => {
      try {
        const resposta = await fetch("http://localhost:3333/lista/pratos/"); // sua rota do backend
        const dados = await resposta.json();
        setPratos(dados);
      } catch (erro) {
        console.error("Erro ao carregar os pratos:", erro);
      }
    };

    carregarPratos();
  }, []);

  return (
    <main className={estilo.principal}>
      <div className={estilo.cardapiotext}>
        <h1>CARDÁPIO</h1>
        <h2>FRETE GRÁTIS PARA TODA REGIÃO (SERTÃOZINHO-SP)</h2>
      </div>

      {/* Exibe dinamicamente os pratos do banco */}
      {pratos.map((prato) => (
        <section key={prato.id} className={estilo.card}>
          <div className={estilo.infoLanche}>
            <h3>
              {prato.nome.toUpperCase()} (R${prato.preco.toFixed(2)})
            </h3>

            <div className={estilo.imagem}>
              {prato.imagem ? (
                <img src={prato.imagem} alt={prato.nome} />
              ) : (
                <p style={{ color: "#aaa" }}>Imagem indisponível</p>
              )}
            </div>
          </div>

          <div className={estilo.descricao}>
            <h4>Descrição</h4>
            <div className={estilo.caixaDescricao}>
              <p>DESCRIÇÃO:</p>
              <p>{prato.descricao}</p>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}

export default Cardapio;
