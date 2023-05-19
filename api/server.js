const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'estoque',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

// Rota para obter todos os produtos
app.get('/produtos', (req, res) => {
  const query = 'SELECT * FROM produtos';

  connection.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Rota para obter um produto pelo ID
app.get('/produtos/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM produtos WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) throw err;
    res.json(results[0]);
  });
});

// Rota para criar um novo produto
app.post('/produtos', (req, res) => {
    const { nome, descricao, quantidade, preco } = req.body;
    const query = 'INSERT INTO produtos (nome, descricao,quantidade, preco) VALUES (?, ?, ?, ?)';

connection.query(query, [nome, descricao, quantidade, preco], (err, results) => {
        if (err) throw err;
        res.sendStatus(201);
      });


      // Rota para atualizar um produto existente
    app.put('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const { nome, descricao, quantidade, preco } = req.body;
    const query = 'UPDATE produtos SET nome = ?, descricao = ?, quantidade = ?, preco = ? WHERE id = ?';
    connection.query(query, [nome, descricao, quantidade, preco, id], (err, results) => {
        if (err) throw err;
        res.sendStatus(200);
      });

    });

    // Rota para excluir um produto
    app.delete('/produtos/:id', (req, res) => {
    const { id } = req.params;
    const query = 'DELETE FROM produtos WHERE id = ?';
    connection.query(query, [id], (err, results) => {
        if (err) throw err;
        res.sendStatus(200);
      });
    });
    app.listen(port, () => {
        console.log(`Servidor backend em execução na porta ${port}`);
        });
    });

