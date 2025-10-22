import { useState } from 'react';
import styles from './Pagamento.module.css';
import produtoImg from '../../assets/lancheDouble.png'; // substitua pelo caminho da imagem real
import pixImg from '../../assets/forma-de-pagamento.png';
import cartaoImg from '../../assets/cartao-de-credito.png';
import boletoImg from '../../assets/economizar.png';

interface Item {
  id: number;
  nome: string;
  quantidade: number;
  preco: number;
  imagem: string;
}

function Checkout() {
  const [email, setEmail] = useState('');
  const [cep, setCep] = useState('');
  const [cupom, setCupom] = useState('');
  const [formaPagamento, setFormaPagamento] = useState('cartao');

  const itens: Item[] = [
    {
      id: 1,
      nome: 'Backstage Meat and Heat',
      quantidade: 3,
      preco: 24,
      imagem: produtoImg,
    },
  ];

  const subtotal = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const aplicarCupom = () => alert(`Cupom ${cupom} aplicado!`);
  const finalizarPedido = () => alert('Pedido finalizado!');

  return (
    <div className={styles.container}>
      <div className={styles.esquerda}>
        <div className={styles.email}>
          <label>Endereço do E-mail</label>
          <p>O comprovante será enviado para o seu E-mail</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Insira seu e-mail"
          />
        </div>

        <div className={styles.pedido}>
          <h3>Pedido 1 de {itens.length}</h3>
          {itens.map((item) => (
            <div key={item.id} className={styles.item}>
              <img src={item.imagem} alt={item.nome} />
              <div>
                <p>{item.nome} x{item.quantidade}</p>
                <p>SUBTOTAL: R$ {(item.preco * item.quantidade).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.direita}>
        <div className={styles.resumo}>
          <p>Total:</p>
          <p>R$ {subtotal.toFixed(2)}</p>
          <button onClick={finalizarPedido}>Finalizar Pedido</button>
          <a href="#">← Continuar comprando</a>
        </div>

        <div className={styles.pagamento}>
          <h4>Formas de Pagamento</h4>

          <label className={styles.forma}>
            <input
              type="radio"
              name="pagamento"
              value="cartao"
              checked={formaPagamento === 'cartao'}
              onChange={() => setFormaPagamento('cartao')}
            />
            <img src={cartaoImg} alt="Cartão" className={styles.imgPagamento} />
            Cartão de Crédito ou Débito
          </label>

          <label className={styles.forma}>
            <input
              type="radio"
              name="pagamento"
              value="pix"
              checked={formaPagamento === 'pix'}
              onChange={() => setFormaPagamento('pix')}
            />
            <img src={pixImg} alt="Pix" className={styles.imgPagamento} />
            Pix
          </label>

          <label className={styles.forma}>
            <input
              type="radio"
              name="pagamento"
              value="boleto"
              checked={formaPagamento === 'boleto'}
              onChange={() => setFormaPagamento('boleto')}
            />
            <img src={boletoImg} alt="Boleto" className={styles.imgPagamento} />
            Boleto Bancário
          </label>
        </div>


        <div className={styles.cupomCep}>
          <div className={styles.cupom}>
            <p>Aplicar Cupom</p>
            <input
              type="text"
              placeholder="Insira seu cupom"
              value={cupom}
              onChange={(e) => setCupom(e.target.value)}
            />
            <button onClick={aplicarCupom}>Aplicar cupom</button>
          </div>

          <div className={styles.cep}>
            <p>Adicione Aqui o CEP</p>
            <input
              type="text"
              placeholder="Insira seu CEP"
              value={cep}
              onChange={(e) => setCep(e.target.value)}
            />
            <span>✔</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checkout;