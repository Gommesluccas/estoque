import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import './style.css';

const ControleEstoque = () => {
  const [estoque, setEstoque] = useState([]);
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');
  const [preco, setPreco] = useState('');

  const adicionarProduto = () => {
    if (nome && descricao && quantidade && preco) {
      const novoProduto = { nome, descricao, quantidade, preco };
      setEstoque([...estoque, novoProduto]);
      setNome('');
      setDescricao('');
      setQuantidade('');
      setPreco('');
    }
  };

  const removerProduto = (index) => {
    const novoEstoque = [...estoque];
    novoEstoque.splice(index, 1);
    setEstoque(novoEstoque);
  };

  return (
    <div className="dark-mode">
      <h1>Controle de Estoque</h1>
      <label htmlFor="nome">Nome do Produto:</label>
      <input
        type="text"
        id="nome"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <br />
      <label htmlFor="descricao">Descrição:</label>
      <input
        type="text"
        id="descricao"
        value={descricao}
        onChange={(e) => setDescricao(e.target.value)}
      />
      <br />
      <label htmlFor="quantidade">Quantidade:</label>
      <input
        type="number"
        id="quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />
      <br />
      <label htmlFor="preco">Preço:</label>
      <input
        type="number"
        id="preco"
        value={preco}
        onChange={(e) => setPreco(e.target.value)}
      />
      <br />
      <Button variant="primary" onClick={adicionarProduto}>
        Adicionar Produto
      </Button>
      <br />
      <h2>Estoque:</h2>
      {estoque.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Descrição</th>
              <th>Quantidade</th>
              <th>Preço</th>
              <th>Ação</th>
            </tr>
          </thead>
          <tbody>
            {estoque.map((produto, index) => (
              <tr key={index}>
                <td>{produto.nome}</td>
                <td>{produto.descricao}</td>
                <td>{produto.quantidade}</td>
                <td>{produto.preco}</td>
                <td>
                  <Button variant="danger" onClick={() => removerProduto(index)}>
                    Remover
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Nenhum produto cadastrado.</p>
      )}
    </div>
  );
};

export default ControleEstoque;
