# Sobrevivieagoraensino

Arquitetura do Sistema
┌──────────────────────────────────────────────────────┐
│  FRONT-END                                           │
│                                                      │
│  HTML + CSS + JS                                     │
│  (ou framework depois: React, Vue, etc.)             │
│                                                      │
│  ├── Página pública (livro, autor, contato)          │
│  ├── Biblioteca de conteúdo (Reels, reflexões)       │
│  ├── Ferramentas interativas (diário, questionários) │
│  └── Área de membros (login, cursos)                 │
└──────────────────────────────────────────────────────┘
                       │
                       │ HTTPS / API REST
                       ▼
┌──────────────────────────────────────────────────────┐
│  BACK-END (roda no servidor)                         │
│                                                      │
│  Django (Python) ou Node.js (Express/Nest)           │
│                                                      │
│  ├── API de autenticação (login, cadastro)           │
│  ├── API de conteúdo (listar reflexões, artigos)     │
│  ├── API de ferramentas (salvar diário, respostas)   │
│  ├── API de relatórios (gerar PDF, dashboard)        │
│  └── Camada de IA (baseada no JSON "Base Pública")   │
└──────────────────────────────────────────────────────┘
                       │
                       │ conexão segura
                       ▼
┌──────────────────────────────────────────────────────┐
│  BANCO DE DADOS                                      │
│                                                      │
│  PostgreSQL                                          │
│                                                      │
│  Tabelas principais:                                 │
│  ├── usuarios (id, nome, email, senha_hash)          │
│  ├── perfis (id, user_id, preferências)              │
│  ├── diarios (id, user_id, data, texto)              │
│  ├── respostas (id, user_id, pergunta_id, resposta)  │
│  ├── temas (id, título, perguntas, devolutivas)      │
│  ├── ferramentas (id, nome, tema_id, saída)          │
│  ├── relatorios (id, user_id, data, conteúdo)        │
│  └── logs_ia (id, user_id, pergunta, resposta)       │
└──────────────────────────────────────────────────────┘
                       │
                       ▼
┌──────────────────────────────────────────────────────┐
│  SERVIÇOS EXTERNOS                                   │
│                                                      │
│  ├── IA (OpenAI, Claude, Gemini)                     │
│  ├── E-mail transacional (Zoho, SendGrid, Brevo)     │
│  ├── Pagamento (Stripe, Mercado Pago)                │
│  └── Armazenamento (S3, Cloudflare R2)               │
└──────────────────────────────────────────────────────┘
