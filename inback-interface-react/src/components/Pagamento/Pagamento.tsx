import { useState } from 'react';
import styles from './Pagamento.module.css';
import pixImg from '../../assets/forma-de-pagamento.png';
import cartaoImg from '../../assets/cartao-de-credito.png';
import boletoImg from '../../assets/economizar.png';

import img1 from "../../assets/hamburguer1.jpg";
import img2 from "../../assets/hamburguer2.jpg";
import img3 from "../../assets/hamburguer3.jpg";
import imgQRCODE from "../../assets/QRCODE.png";

import { APP_ROUTES } from '../../appConfig';

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

  // CAMPOS DO CARTÃO
  const [dadosCartao, setDadosCartao] = useState({
    nome: '',
    numero: '',
    validade: '',
    cvv: '',
    cpf: ''
  });

  const handleChangeCartao = (campo: string, valor: string) => {
    setDadosCartao((prev) => ({ ...prev, [campo]: valor }));
  };

  const itens: Item[] = [
    { id: 1, nome: 'HAMBÚRGUER CLÁSSICO', quantidade: 1, preco: 35.90, imagem: img1 },
    { id: 2, nome: 'HAMBÚRGUER CAESAR', quantidade: 1, preco: 27.50, imagem: img2 },
    { id: 3, nome: 'HAMBÚRGUER PARMESÃO', quantidade: 1, preco: 42.0, imagem: img3 },
  ];

  const subtotal = itens.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const aplicarCupom = () => alert(`Cupom ${cupom} aplicado!`);

  const finalizarPedido = () => {
    if (formaPagamento === 'cartao') {
      console.log("Dados do cartão salvos:", dadosCartao);
    }
    alert('Pedido finalizado!');
  };

  return (
    <div className={styles.container}>

      {/* COLUNA ESQUERDA */}
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

      {/* COLUNA DIREITA */}
      <div className={styles.direita}>

        <div className={styles.resumo}>
          <p>Total:</p>
          <p>R$ {subtotal.toFixed(2)}</p>
          <button onClick={finalizarPedido}>Finalizar Pedido</button>
          <a href={APP_ROUTES.ROUTE_CARDAPIO}>← Continuar comprando</a>
        </div>

        {/* FORMAS DE PAGAMENTO */}
        <div className={styles.pagamento}>
          <h4>Formas de Pagamento</h4>

          {/* CARTÃO */}
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

          {formaPagamento === 'cartao' && (
            <div className={styles.cartaoBox}>
              <h5>Informações do Cartão</h5>

              <input type="text" placeholder="Nome no cartão"
                value={dadosCartao.nome}
                onChange={(e) => handleChangeCartao("nome", e.target.value)} />

              <input type="text" placeholder="Número do cartão"
                value={dadosCartao.numero}
                onChange={(e) => handleChangeCartao("numero", e.target.value)} />

              <input type="text" placeholder="Validade (MM/AA)"
                value={dadosCartao.validade}
                onChange={(e) => handleChangeCartao("validade", e.target.value)} />

              <input type="text" placeholder="CVV"
                value={dadosCartao.cvv}
                onChange={(e) => handleChangeCartao("cvv", e.target.value)} />

              <input type="text" placeholder="CPF do titular"
                value={dadosCartao.cpf}
                onChange={(e) => handleChangeCartao("cpf", e.target.value)} />
            </div>
          )}

          {/* PIX */}
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

          {formaPagamento === 'pix' && (
            <div className={styles.pixBox}>
              <h5>Pagamento via Pix</h5>
              <img src={imgQRCODE} alt="QR Code Pix" className={styles.qrCode} />
              <p>Escaneie o QR Code para pagar</p>
            </div>
          )}

          {/* BOLETO */}
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

          {formaPagamento === 'boleto' && (
            <div className={styles.boletoBox}>
              <h5>Boleto Bancário</h5>

              <p>O boleto será gerado com vencimento de 2 dias.</p>

              <div className={styles.codigoBarras}>
                █ ███ █ ████ █ ██ █ ███ ███ █ ███ ██ █ ███ ██
              </div>

              <button className={styles.btnBoleto}>
                Gerar boleto
              </button>
            </div>
          )}

        </div>

        {/* CUPOM + CEP */}
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
