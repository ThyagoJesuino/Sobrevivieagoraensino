const express = require('express');
const pool = require('../db/pool');
const auth = require('../middleware/auth');

const router = express.Router();

// Todas as rotas aqui exigem token
router.use(auth);

// Listar todos os conteúdos
router.get('/', async (req, res) => {
  try {
    const r = await pool.query(
      `SELECT c.id, c.titulo, c.categoria, c.corpo, c.criado_em, u.nome AS autor
       FROM conteudos c
       LEFT JOIN usuarios u ON u.id = c.autor_id
       ORDER BY c.criado_em DESC`
    );
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar conteúdos' });
  }
});

// Criar novo conteúdo
router.post('/', async (req, res) => {
  const { titulo, categoria, corpo } = req.body;

  if (!titulo) {
    return res.status(400).json({ erro: 'Título é obrigatório' });
  }

  try {
    const r = await pool.query(
      `INSERT INTO conteudos (titulo, categoria, corpo, autor_id)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [titulo, categoria || null, corpo || null, req.usuario.id]
    );
    res.status(201).json(r.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao criar conteúdo' });
  }
});

module.exports = router;