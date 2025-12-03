import { useState } from "react";
import estilo from "./Historia.module.css";
import HistoriaImg from "../../assets/Historia.png";

export default function Historia() {

  const [mostrarExtra, setMostrarExtra] = useState(false);

  return (
    <main className={estilo.main}>
      <section className={estilo.container}>

        <div className={estilo.textoBox}>
          
          <span className={estilo.subTitulo}>TRADIÇÃO • SABOR • IDENTIDADE</span>
          <h1 className={estilo.titulo}>NOSSA HISTÓRIA</h1>

          <div className={estilo.card}>
            <p>NOME: INBACK - RESTAURANT</p>
            <p>FUNDADO EM: 2023 POR PIAGO GONZALLES</p>
            <p>LOCALIZAÇÃO: SERTÃOZINHO, SÃO PAULO</p>
            <p>ESPECIALIDADE: CARNES ARTESANAIS, PRATOS AUTORAIS E HAMBÚRGUERES COM ALMA DE CÓDIGO.</p>
            <p>FUNDADORES: LUCAS MORAES (CHEF) E VINÍCIUS PRADO (DESENVOLVEDOR E ENTUSIASTA GASTRONÔMICO)</p>
            <p>SLOGAN: “ONDE O SABOR RODA NO SERVIDOR”</p>
          </div>

          {/* Botão */}
          <button 
            className={estilo.botao}
            onClick={() => setMostrarExtra(!mostrarExtra)}
          >
            {mostrarExtra ? "ESCONDER HISTÓRIA" : "LER HISTÓRIA COMPLETA"}
          </button>

          {/* História extra aparece só quando clicar */}
          {mostrarExtra && (
            <p className={estilo.historiaExtra}>
              Tudo começou com uma ideia simples: unir gastronomia artesanal com criatividade,
              tecnologia e identidade. De um pequeno projeto entre amigos, o InBack cresceu para se tornar
              um dos restaurantes mais queridos da região. Nosso propósito sempre foi oferecer pratos feitos
              com paixão — servidos com a mesma dedicação de quem compila um código perfeito.
            </p>
          )}

        </div>

        <div className={estilo.imgBox}>
          <div className={estilo.decoracao}></div>
          <img src={HistoriaImg} alt="Chef preparando hambúrguer" />
        </div>

      </section>
    </main>
  );
}
