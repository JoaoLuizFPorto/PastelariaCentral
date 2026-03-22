const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

app.post('/.netlify/functions/signin', async (req, res) => {
    const { nomeCompleto, email, senha } = req.body;

    try {
        const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        if (emailCheck.rows.length > 0) {
            return res.status(409).json({ message: 'Este e-mail já está cadastrado.' });
        }

        const result = await pool.query(
            'INSERT INTO users (nome_completo, email, senha) VALUES ($1, $2, $3) RETURNING *',
            [nomeCompleto, email, senha]
        );

        res.status(201).json({ message: 'Cadastro realizado com sucesso!', user: result.rows[0] });

    } catch (error) {
        console.error('Erro ao cadastrar usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor. Tente novamente mais tarde.' });
    }
});

module.exports.handler = serverless(app);