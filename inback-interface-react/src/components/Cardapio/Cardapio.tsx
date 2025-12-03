import { useEffect, useState, JSX } from "react";
import estilo from "./Cardapio.module.css";
import img1 from "../../assets/hamburguer1.jpg";
import img2 from "../../assets/hamburguer2.jpg";
import img3 from "../../assets/hamburguer3.jpg";

interface Prato {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  imagem?: string;
}

function Cardapio(): JSX.Element {
  const [pratos, setPratos] = useState<Prato[]>([]);
  const imagensFixas = [img1, img2, img3];

  useEffect(() => {
    const carregarPratos = async () => {
      try {
        const resposta = await fetch("http://localhost:3333/lista/pratos/");
        const dados = await resposta.json();
        setPratos(dados);
      } catch (erro) {
        console.error("Erro ao carregar os pratos:", erro);
      }
    };
    carregarPratos();
  }, []);

  const adicionarCarrinho = (prato: Prato) => {
    alert(`✔ ${prato.nome} adicionado ao carrinho!`);
  };

  return (
    <main className={estilo.principal}>
      {/* Texto do topo */}
      <div className={estilo.cardapiotext}>
        <h1>CARDÁPIO</h1>
        <h2>FRETE GRÁTIS PARA TODA REGIÃO (SERTÃOZINHO-SP)</h2>
      </div>

      {/* ---------------- CARROSSEL ---------------- */}
      <div className={estilo.carouselContainer}>
        <div className={estilo.carousel}>
          {imagensFixas.map((img, i) => (
            <div key={i} className={estilo.carouselItem}>
              <img src={img} alt={`Promoção ${i + 1}`} />
              <h3>Promoção Especial {i + 1}</h3>
              <p>Sabores incríveis preparados com ingredientes frescos!</p>
            </div>
          ))}
        </div>
      </div>

      {/* ---------------- LISTA DE PRATOS ---------------- */}
      {pratos.map((prato, index) => (
        <section key={prato.id} className={estilo.card}>
          <div className={estilo.infoLanche}>
            <h3>
              {prato.nome.toUpperCase()} — R${prato.preco.toFixed(2)}
            </h3>

            <div className={estilo.imagem}>
              <img
                src={imagensFixas[index % imagensFixas.length]}
                alt={prato.nome}
              />
            </div>

            <button
              className={estilo.btnCarrinho}
              onClick={() => adicionarCarrinho(prato)}
            >
              Adicionar ao Carrinho
            </button>
          </div>

          <div className={estilo.descricao}>
            <h4>Descrição</h4>
            <div className={estilo.caixaDescricao}>
              <p>{prato.descricao}</p>
            </div>
          </div>
        </section>
      ))}

      {/* ---------------- CURIOSIDADES ---------------- */}
      <section className={estilo.curiosidades}>
        <h2>🍔 Curiosidades sobre o Mundo dos Lanches</h2>

        <p>• O hambúrguer moderno surgiu nos EUA, mas seu nome vem da cidade de Hamburgo, na Alemanha.</p>
        <p>• O maior hambúrguer já feito pesou mais de 900kg!</p>
        <p>• A combinação carne + queijo derretido é uma das mais antigas do mundo, usada desde os gregos antigos.</p>
        <p>• Estudos mostram que 80% das pessoas preferem hambúrguer artesanal ao industrializado.</p>
      </section>
    </main>
  );
}

export default Cardapio;
