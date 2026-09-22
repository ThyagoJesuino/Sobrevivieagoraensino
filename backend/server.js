const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const pool = require('./db/pool');

const authRoutes = require('./routes/auth');
const conteudosRoutes = require('./routes/conteudos');

const app = express();
app.use(cors());
app.use(express.json());

// Servir arquivos do frontend
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Rota raiz (API)
app.get('/api', (req, res) => {
  res.json({ mensagem: 'API do portal está rodando!' });
});

// Teste de banco
app.get('/db-test', async (req, res) => {
  try {
    const r = await pool.query('SELECT NOW() AS agora');
    res.json({ ok: true, hora: r.rows[0].agora });
  } catch (err) {
    res.status(500).json({ ok: false, erro: err.message });
  }
});

// Rotas da API
app.use('/auth', authRoutes);
app.use('/conteudos', conteudosRoutes);

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
  console.log(`🌐 Rede local: http://${getLocalIP()}:${PORT}`);
});

function getLocalIP() {
  const os = require("os");
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === "IPv4" && !net.internal) {
        return net.address;
      }
    }
  }
  return "localhost";
}