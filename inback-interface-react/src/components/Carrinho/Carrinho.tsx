import { useState } from "react";
import styles from "./Carrinho.module.css";
import Trash from "../../assets/lixeira.png";
import { APP_ROUTES } from "../../appConfig";

// Imagens importadas
import img1 from "../../assets/hamburguer1.jpg";
import img2 from "../../assets/hamburguer2.jpg";
import img3 from "../../assets/hamburguer3.jpg";

interface Produto {
    id: number;
    nome: string;
    preco: number;
    imagem: string;
}

function Carrinho() {
    const [produtos, setProdutos] = useState<Produto[]>([
        {
            id: 1,
            nome: "HAMBÚRGUER CLÁSSICO",
            preco: 35.90,
            imagem: img1,
        },
        {
            id: 2,
            nome: "HAMBÚRGUER CAESAR",
            preco: 27.50,
            imagem: img2,
        },
        {
            id: 3,
            nome: "HAMBÚRGUER PARMESÃO",
            preco: 42.0,
            imagem: img3,
        },
    ]);

    const removerProduto = (id: number) => {
        setProdutos(produtos.filter((p) => p.id !== id));
    };

    const comprar = () => {
        alert("Você será direcionado para tela de Pagamento!");
    };

    return (
        <main className={styles.container}>
            <h1 className={styles.titulo}>CARRINHO</h1>

            <div className={styles.card}>
                {produtos.map((p) => (
                    <div key={p.id} className={styles.item}>
                        <img src={p.imagem} alt={p.nome} className={styles.imagem} />
                        <div className={styles.texto}>
                            <p>
                                R$ {p.preco.toFixed(2)} ({p.nome.toUpperCase()})
                            </p>
                        </div>
                        <img
                            src={Trash}
                            alt="Remover"
                            className={styles.trash}
                            onClick={() => removerProduto(p.id)}
                        />
                    </div>
                ))}

                <a
                    className={styles.botao}
                    onClick={comprar}
                    href={APP_ROUTES.ROUTE_PAGAMENTO}
                >
                    Ir para o pagamento
                </a>
            </div>
        </main>
    );
}

export default Carrinho;
