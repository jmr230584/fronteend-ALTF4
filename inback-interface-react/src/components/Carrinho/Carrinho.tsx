import { useState } from "react";
import styles from "./Carrinho.module.css";
import Trash from "../../assets/lixeira.png";
import { APP_ROUTES } from "../../appConfig";

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
            nome: "Backstage Meat and Heat",
            preco: 24.0,
            imagem: "",
        },
        {
            id: 2,
            nome: "Backstage Meat and Heat",
            preco: 24.0,
            imagem: "",
        },
        {
            id: 3,
            nome: "Backstage Meat and Heat",
            preco: 24.0,
            imagem: "",
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


                <a className={styles.botao} onClick={comprar} href={APP_ROUTES.ROUTE_PAGAMENTO}>
                    Ir para o pagamento
                </a>
            </div>
        </main>
    );
}

export default Carrinho;