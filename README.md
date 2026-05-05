# 🐾 PawApp v3 — Plataforma Social Pet Completa

> Protótipo completo com **5 tipos de conta**, dashboards personalizados, chat real entre usuários, painel admin com moderação, e muito mais. Funciona como GitHub Page sem dependências externas.

## 🔗 Ver ao Vivo

👉 **[Abrir o PawApp](https://SEU_USUARIO.github.io/pawapp/)**

---

## 👤 5 Tipos de Conta

| Tipo | Acesso | Funcionalidades |
|---|---|---|
| 🐶 **Tutor de Pet** | Login → Feed, Mapa, Lojas, Consulta, Agenda, Meu Pet... | Rede social completa, consulta veterinária, SOS |
| 🩺 **Veterinário** | Login → Painel, Consultas Online, Pacientes, Prescrições | Atender pacientes, emitir receitas e laudos |
| 🏪 **Lojista** | Login → Painel, Produtos, Promoções, Pedidos | Gerenciar loja, promoções e pedidos |
| 🧳 **Pet Sitter** | Login → Painel, Agendamentos, Disponibilidade | Gerenciar cuidados e relatórios diários |
| 🛡️ **Admin** | Login → Painel Geral, Usuários, Postagens, Denúncias | Moderar tudo, banir, advertir, configurar |

---

## 🗂️ Seções por Perfil

### 🐶 Tutor de Pet (11 seções)
Feed · Explorar Perto · Lojas & Promoções · Consulta Online · Mensagens · Agenda · Meu Pet · Locais Pet-Friendly · SOS Pet · Pet Sitter · Passaporte Digital

### 🩺 Veterinário (6 seções)
Painel · Consultas Online · Pacientes · Mensagens · Minha Agenda · Prescrições

### 🏪 Lojista (5 seções)
Painel · Produtos · Promoções · Pedidos · Mensagens

### 🧳 Pet Sitter (4 seções)
Painel · Agendamentos · Disponibilidade · Mensagens

### 🛡️ Admin (6 seções)
Painel Geral · Gerenciar Usuários · Moderar Postagens · Denúncias · Banimentos · Configurações

---

## ✨ Funcionalidades Interativas

- ✅ Login com seleção de tipo de conta + acesso rápido (demo)
- ✅ Chat em tempo real com respostas simuladas por contexto
- ✅ Troca de conta instantânea pelo botão flutuante (demo)
- ✅ Calendário interativo com eventos
- ✅ Countdown de oferta relâmpago
- ✅ SOS Toast — alerta pop-up de pet perdido
- ✅ Admin: banir/desbanir usuários, remover posts, advertir
- ✅ Admin: aprovar/rejeitar denúncias
- ✅ Admin: toggles de configuração do sistema
- ✅ Filtro de busca de usuários em tempo real
- ✅ Curtidas, seguir/deixar de seguir, salvar posts
- ✅ Comentários dinâmicos
- ✅ Carrinho de compras com contador
- ✅ Veterinário: toggle online/offline
- ✅ Drag-to-scroll nas stories
- ✅ Modais com formulários funcionais
- ✅ Design responsivo — mobile e desktop

---

## 🛠️ Tecnologias

```
pawapp/
├── index.html   → Toda estrutura HTML (5 dashboards + 35+ seções + 20+ modais)
├── style.css    → Design completo — ~2000 linhas
├── app.js       → Lógica completa — navegação, chat, admin, modais
└── README.md    → Documentação
```

- **Zero dependências** — HTML/CSS/JS puro
- **Google Fonts** — Sora + Playfair Display
- **Desktop-first** — sidebar fixa, responsivo até 320px

---

## 🚀 Publicar no GitHub Pages

```bash
git init
git add .
git commit -m "feat: PawApp v3 multi-perfil completo"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/pawapp.git
git push -u origin main
```

**Settings → Pages → Source: `main` / `root` → Save**

Disponível em: `https://SEU_USUARIO.github.io/pawapp/` ✅

---

Projeto acadêmico — Análise de Dados · Rede Social Pet 🐾
