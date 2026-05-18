<div align="center">

<!-- LOGO PILL em SVG inline — renderiza no GitHub -->
<svg width="220" height="52" viewBox="0 0 220 52" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="52" height="52" rx="12" fill="#f97316"/>
  <path d="M12 40 L22 28 L30 34 L42 14" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="42" cy="14" r="4" fill="#fff"/>
  <rect x="60" y="0" width="160" height="52" rx="12" fill="#1e293b"/>
  <text x="80" y="30" font-family="system-ui, sans-serif" font-size="22" font-weight="700" fill="#f8fafc" letter-spacing="0.5">EduStats</text>
  <text x="80" y="44" font-family="monospace" font-size="10" fill="#64748b" letter-spacing="2">BRASIL · 2025</text>
</svg>

<br/>
<br/>

**Dashboard interativo de desempenho educacional brasileiro**  
Dados reais do ENEM · API IBGE · CRUD Back4App · Chart.js

<br/>

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Chart.js](https://img.shields.io/badge/Chart.js-FF6384?style=for-the-badge&logo=chartdotjs&logoColor=white)
![Back4App](https://img.shields.io/badge/Back4App-2D4059?style=for-the-badge&logo=parse&logoColor=white)

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-orange?style=flat-square)
![License](https://img.shields.io/badge/licença-MIT-green?style=flat-square)
![UNICAP](https://img.shields.io/badge/UNICAP-2026-blue?style=flat-square)

[🌐 Ver Demo ao vivo](https://edustats.vercel.app) · [📋 Relatório de bugs](../../issues) · [💡 Sugerir feature](../../issues)

</div>

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Arquitetura](#-arquitetura)
- [Stack Técnica](#-stack-técnica)
- [Integrações](#-integrações)
- [Estrutura de Arquivos](#-estrutura-de-arquivos)
- [Como Rodar Localmente](#-como-rodar-localmente)
- [Deploy](#-deploy)
- [Dados Utilizados](#-dados-utilizados)
- [Equipe](#-equipe)

---

## 🎯 Sobre o Projeto

O **EduStats** é um dashboard web interativo que centraliza e visualiza dados educacionais brasileiros, com foco nos resultados do **ENEM 2025**. O objetivo é tornar acessível a análise de desempenho por estado, região e disciplina, além de permitir o cadastro e gerenciamento de escolas via CRUD completo.

> Projeto desenvolvido para a disciplina de **Desenvolvimento Web** — UNICAP 2026  
> Atividade A07 — Dashboard usando HTML/CSS/JS

---

## ✨ Funcionalidades

### 📊 Dashboard (index.html)

| Componente | Descrição |
|---|---|
| **KPI Cards** | Total de inscrições, média geral, número de estados e edição do ENEM |
| **Gráfico de Barras** | Média ENEM por estado, colorido por região |
| **Gráfico Doughnut** | Distribuição de inscrições por região do Brasil |
| **Gráfico de Linha** | Evolução histórica de inscrições 2020–2025 |
| **Gráfico Horizontal** | Ranking de médias por área de conhecimento (5 disciplinas) |
| **Filtro por Região** | Filtra o gráfico de barras por Norte, Nordeste, Sul, etc. |
| **Filtro por Estado** | Populado dinamicamente via **API do IBGE** em tempo real |

### 🏫 Gerenciador de Escolas (crud.html)

| Operação | Descrição |
|---|---|
| **Create** | Formulário para cadastrar escola (nome, UF, média, ano, tipo) |
| **Read** | Tabela com todos os registros do **Back4App** |
| **Update** | Edição inline com formulário pré-preenchido |
| **Delete** | Remoção com modal de confirmação |
| **Busca** | Filtro em tempo real por nome ou estado |

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                        NAVEGADOR                            │
│                                                             │
│   index.html ──────────────────── crud.html                 │
│       │                               │                     │
│   main.js                        crud-page.js               │
│       │                               │                     │
│   ┌───┴────────────────┐         ┌────┴──────┐              │
│   │     charts.js      │         │   crud.js  │             │
│   │  (4 gráficos       │         │  (REST API │             │
│   │   Chart.js)        │         │  Back4App) │             │
│   └───────────────────-┘         └────┬──────┘              │
│           │                           │                     │
│   ┌───────┴──────┐                    │                     │
│   │  dataset.js  │         external-api.js                  │
│   │ (ENEM dados) │              │                           │
│   └──────────────┘              │                           │
└────────────────────────────────-│───────────────────────────┘
                                  │
          ┌───────────────────────┼───────────────────┐
          │                       │                   │
   ┌──────▼──────┐      ┌─────────▼────────┐    ┌────▼────┐
   │  Back4App   │      │    API IBGE       │    │ Chart.js│
   │ (Parse REST)│      │ /estados          │    │  CDN    │
   │   CRUD DB   │      │ dados geográficos │    └─────────┘
   └─────────────┘      └──────────────────┘
```

---

## 🛠️ Stack Técnica

| Camada | Tecnologia | Por quê |
|---|---|---|
| **Markup** | HTML5 semântico | Estrutura acessível e SEO-friendly |
| **Estilo** | Tailwind CSS (CDN) + CSS custom | Utility-first + customizações específicas |
| **Scripts** | Vanilla JS — ES6 Modules | Zero dependências de framework, `import/export` nativo |
| **Gráficos** | Chart.js 4.4 | Biblioteca mais madura para dashboards web |
| **Back-end** | Back4App (Parse REST API) | BaaS gratuito, sem necessidade de servidor próprio |
| **API Externa** | IBGE API pública | Dados oficiais dos estados brasileiros, sem chave |
| **Deploy** | Vercel | CI/CD automático via GitHub, HTTPS gratuito |
| **Versionamento** | Git + GitHub (UNICAP) | Controle de versão e entrega da atividade |

---

## 🔌 Integrações

### Back4App — CRUD de Escolas

```
POST   /classes/Escola          → Criar escola
GET    /classes/Escola          → Listar escolas
PUT    /classes/Escola/:id      → Atualizar escola
DELETE /classes/Escola/:id      → Deletar escola
```

**Headers necessários:**
```http
X-Parse-Application-Id: SEU_APP_ID
X-Parse-REST-API-Key: SUA_REST_KEY
Content-Type: application/json
```

### IBGE API — Estados Brasileiros

```
GET https://servicodados.ibge.gov.br/api/v1/localidades/estados
```

Retorna todos os 27 estados com sigla, nome e região. Usada para popular o filtro de estados do dashboard dinamicamente. **Não requer chave de autenticação.**

---

## 📁 Estrutura de Arquivos

```
EduStats/
│
├── 📄 index.html              # Dashboard principal
├── 📄 crud.html               # Gerenciamento de escolas
│
├── 📁 css/
│   └── style.css              # Estilos customizados (dark theme, animações)
│
├── 📁 js/
│   ├── main.js                # Inicialização do dashboard
│   ├── charts.js              # Todos os gráficos Chart.js
│   ├── crud.js                # Operações REST com Back4App
│   ├── crud-page.js           # Lógica da página CRUD (tabela, form, modal)
│   └── external-api.js        # Integração IBGE + fallback local
│
└── 📁 data/
    └── dataset.js             # Dados estáticos ENEM 2025 (27 estados)
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Qualquer editor de código (IntelliJ IDEA, VS Code)
- Node.js instalado *(apenas para o servidor local)*

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/SEU_USUARIO/edustats.git
cd edustats
```

**2. Inicie um servidor local**

> ⚠️ **Importante:** O projeto usa ES Modules (`import/export`). Não abra o `index.html` diretamente pelo explorador de arquivos — use sempre um servidor local.

```bash
# Opção 1 — npx (sem instalar nada)
npx serve .

# Opção 2 — Node.js http-server
npm install -g http-server
http-server . -p 3000

# Opção 3 — IntelliJ / VS Code
# Clique com botão direito no index.html → Open In → Browser
```

**3. Acesse no browser**
```
http://localhost:3000
```

### Configurar Back4App (opcional)

Para ativar o CRUD com persistência real, edite `js/crud.js`:

```js
const HEADERS = {
  "X-Parse-Application-Id": "SEU_APP_ID_AQUI",   // ← substitua
  "X-Parse-REST-API-Key":   "SUA_REST_KEY_AQUI",  // ← substitua
  "Content-Type": "application/json",
};
```

> Sem configuração, o CRUD funciona com **dados locais em memória** — útil para desenvolvimento.

---

## ☁️ Deploy

O projeto está hospedado na **Vercel** com deploy automático a cada `git push` na branch `main`.

```
Produção:    https://edustats.vercel.app
Branch:      main
Build:       Static (sem build step)
```

Para fazer seu próprio deploy:

1. Faça fork deste repositório
2. Acesse [vercel.com](https://vercel.com) → `New Project`
3. Importe o repositório
4. Clique em **Deploy** *(zero configuração necessária)*

---

## 📊 Dados Utilizados

### ENEM 2025 — Desempenho por Estado

Dados do **INEP** (Instituto Nacional de Estudos e Pesquisas Educacionais) disponíveis publicamente. O dataset cobre os **27 estados** brasileiros com:

- Média geral por estado
- Número de inscrições confirmadas
- Classificação por região geográfica

### Evolução Histórica de Inscrições (2020–2025)

| Ano | Inscrições | Variação |
|-----|-----------|---------|
| 2020 | 5.825.370 | — |
| 2021 | 3.444.178 | -40,9% *(pandemia)* |
| 2022 | 3.547.835 | +3,0% |
| 2023 | 4.018.414 | +13,3% |
| 2024 | 4.325.962 | +7,7% |
| 2025 | 4.811.338 | +11,2% |

### Médias por Disciplina — ENEM 2025

| Disciplina | Média |
|---|---|
| Redação | 669 pts |
| Matemática | 529 pts |
| Linguagens | 528 pts |
| Ciências Humanas | 517 pts |
| Ciências da Natureza | 495 pts |

---

## 👨‍💻 Equipe

Desenvolvido por alunos do curso de **Ciência da Computação / Sistemas de Informação** — UNICAP 2026.

| Nome | GitHub | Função |
|---|---|---|
| Integrante 1 | [@usuario1](https://github.com) | Frontend · Dashboard |
| Integrante 2 | [@usuario2](https://github.com) | CRUD · Back4App |
| Integrante 3 | [@usuario3](https://github.com) | API IBGE · Dados |

---

## 📄 Licença

Distribuído sob a licença MIT. Veja `LICENSE` para mais informações.

---

<div align="center">

Feito com ❤️ para a disciplina de Desenvolvimento Web — UNICAP 2026

[⬆ Voltar ao topo](#-sobre-o-projeto)

</div>
