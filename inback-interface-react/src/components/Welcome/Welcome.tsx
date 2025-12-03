import { useEffect, useState } from 'react';
import estilo from './Welcome.module.css';

import hamburguer from '../../assets/lancheDouble.png';
import familiainback from '../../assets/familiaInback.png';
import doubleinback from '../../assets/INBACKDOUBLE.png';
import img1 from "../../assets/hamburguer1.jpg";
import img2 from "../../assets/hamburguer2.jpg";
import img3 from "../../assets/hamburguer3.jpg";
import { APP_ROUTES } from '../../appConfig';

function Welcome() {
    const [nomeUsuario, setNomeUsuario] = useState<string | null>(null);
    
    // Estado para o carrossel
    const [indiceAtual, setIndiceAtual] = useState(0);

    // Dados para o carrossel (usando a imagem importada como exemplo)
    // Você pode importar outras imagens e substituir aqui
    const lanchesCarrossel = [
        { id: 1, nome: 'HAMBÚRGUER CLÁSSICO', img: img1, desc: 'Crocância inigualável' },
        { id: 2, nome: 'HAMBÚRGUER CAESAR', img: img2, desc: 'Queijo derretendo' },
        { id: 3, nome: 'HAMBÚRGUER PARMESÃO', img: img3, desc: 'Leve e saboroso' },
    ];

    useEffect(() => {
        const isAuth = localStorage.getItem('isAuth') === 'false';
        const nome = localStorage.getItem('username');

        if (isAuth && nome) {
            setNomeUsuario(nome);
        }
    }, []);

    // Lógica para mudar os slides
    const proximoSlide = () => {
        setIndiceAtual((prev) => (prev === lanchesCarrossel.length - 1 ? 0 : prev + 1));
    };

    const slideAnterior = () => {
        setIndiceAtual((prev) => (prev === 0 ? lanchesCarrossel.length - 1 : prev - 1));
    };

    return (
        <main className={estilo.principal}>
            {nomeUsuario && (
                <div className={estilo.boasVindas}>
                    <h2>Bem-vindo, {nomeUsuario}!</h2>
                </div>
            )}

            {/* Texto/Imagem inicial */}
            <div className={estilo.containerTextoInicial}>
                <img src={doubleinback} alt="Inback Double" className={estilo.imagemTexto} />
            </div>

            {/* Imagem Principal (Hero) com Badge */}
            <div className={estilo.heroContainer}>
                <img src={hamburguer} alt="DoubleInback" className={estilo.hamburguer} />
                <div className={estilo.badge}>Mais Pedido!</div>
            </div>

            {/* NOVO: Carrossel de Destaques */}
            <section className={estilo.secaoCarrossel}>
                <h3 className={estilo.tituloSecao}>Experimente Também</h3>
                
                <div className={estilo.carrosselContainer}>
                    <button onClick={slideAnterior} className={estilo.botaoCarrossel}>❮</button>
                    
                    <div className={estilo.cardLanche}>
                        <img 
                            src={lanchesCarrossel[indiceAtual].img} 
                            alt={lanchesCarrossel[indiceAtual].nome} 
                            className={estilo.imgCarrossel}
                        />
                        <h4>{lanchesCarrossel[indiceAtual].nome}</h4>
                        <p>{lanchesCarrossel[indiceAtual].desc}</p>
                    </div>

                    <button onClick={proximoSlide} className={estilo.botaoCarrossel}>❯</button>
                </div>
                
                {/* Indicadores (bolinhas) */}
                <div className={estilo.indicadores}>
                    {lanchesCarrossel.map((_, idx) => (
                        <span 
                            key={idx} 
                            className={`${estilo.bolinha} ${idx === indiceAtual ? estilo.bolinhaAtiva : ''}`}
                            onClick={() => setIndiceAtual(idx)}
                        ></span>
                    ))}
                </div>
            </section>

            {/* Seção Hamburguer do Dia */}
            <div className={estilo.secaoEspecial}>
                <p className={estilo.tituloDia}>HAMBÚRGUER DO DIA</p>
                <a href={APP_ROUTES.ROUTE_HISTORIA} className={estilo.linkHistoria}>
                    <div className={estilo.cardFamilia}>
                        <img
                            src={familiainback}
                            alt="Família Inback"
                            className={estilo.familiaInback}
                        />
                        <span className={estilo.verDetalhes}>Ver História</span>
                    </div>
                </a>
            </div>

            {/* Botão Aproveite Agora */}
            <div className={estilo.aproveiteagora}>
                <h1 className={estilo.textoaproveite}>Aproveite Agora</h1>
            </div>
        </main>
    );
}

export default Welcome;