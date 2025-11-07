import estilo from "./Historia.module.css";
import HistoriaImg from "../../assets/Historia.png";

export default function Historia() {
  return (
    <main className={estilo.main}>
      <section className={estilo.container}>
        
        <div className={estilo.textoBox}>
          <h1 className={estilo.titulo}>NOSSA HISTÓRIA</h1>

          <div className={estilo.card}>
            <p>NOME: INBACK - RESTAURANT</p>
            <p>FUNDADO EM: 2023 POR PIAGO GONZALLES</p>
            <p>LOCALIZAÇÃO: SERTÃOZINHO, SÃO PAULO</p>
            <p>ESPECIALIDADE: CARNES ARTESANAIS, PRATOS AUTORAIS E HAMBÚRGUERES COM ALMA DE CÓDIGO.</p>
            <p>FUNDADORES: LUCAS MORAES (CHEF) E VINÍCIUS PRADO (DESENVOLVEDOR E ENTUSIASTA GASTRONÔMICO)</p>
            <p>SLOGAN: “ONDE O SABOR RODA NO SERVIDOR”</p>
          </div>
        </div>

        <div className={estilo.imgBox}>
          <img src={HistoriaImg} alt="Chef preparando hambúrguer" />
        </div>

      </section>
    </main>
  );
}
