# 🏋️ AICan — Frontend (Interface Web)

---

## 📌 Sobre o Projeto

O **AICan Frontend** é uma interface web responsiva e intuitiva para **geração de planos de treino personalizados** com integração à IA. 

Desenvolvido com foco em:
- 🔐 **Sistema de autenticação** (cadastro, login, logout)
- 📝 **Formulários inteligentes** com validação em tempo real
- 🎬 **Visualização dinâmica** de planos de treino com vídeos explicativos
- 🍽️ **Sugestões nutricionais** personalizadas (pré e pós-treino)
- 📄 **Exportação em PDF** com nome descritivo
- 💾 **Persistência local** com expiração automática

---

## 🏗️ Arquitetura e Componentes

O frontend foi desenvolvido com **JavaScript Vanilla** seguindo uma arquitetura **modular e leve**:

| Componente | Descrição |
|-----------|-----------|
| **HTML5** | Markup semântico, validação nativa, acessibilidade |
| **CSS3** | Variáveis CSS, Grid/Flexbox, animações, design premium |
| **JavaScript Vanilla** | Sem frameworks, código otimizado, validação robusta |
| **LocalStorage API** | Cache inteligente com metadados e expiração (24h) |
| **Fetch API** | Comunicação assíncrona com backend, tratamento de erros |
| **html2pdf.js** | Geração de PDF client-side com formatação customizada |

---

## 📁 Estrutura do Projeto

```
frontend/
├── README.md
├── LICENSE
│
└── app/
    ├── assets/
    │   ├── favicon.png        # Ícone do site
    │   ├── logo.aican.png     # Logo (250x250px)
    │   └── gym.fundo.mp4      # Vídeo de fundo
    │
    ├── view/
    │   ├── index.html         # Login/Registro
    │   ├── cadastro.html      # Página de cadastro
    │   ├── ajuda.html         # FAQ e informações
    │   ├── solicitar-lista.html    # Formulário de treino
    │   └── lista-exercicios.html   # Exibição de resultados
    │
    ├── styles/
    │   ├── home.css           # Estilos login/registro
    │   ├── cadastro.css       # Estilos do cadastro
    │   ├── ajuda.css          # Estilos da página de ajuda
    │   ├── solicitar-lista.css     # Estilos do formulário
    │   └── lista.css          # Estilos da lista de treinos
    │
    └── scripts/
        ├── api.js             # Comunicação com backend
        ├── functions.js       # Funções globais (logout, etc)
        ├── home.js            # Animações da landing page
        ├── login.js           # Lógica de autenticação
        ├── cadastro.js        # Lógica de registro
        ├── solicitar-lista.js # Validação do formulário
        ├── lista-page.js      # Renderização dos treinos
        └── pdf-generator.js   # Geração de PDF
```

---

## 🚀 Instalação e Configuração

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge)
- Servidor web local ou em produção
- Backend AICan rodando ([ver repositório](https://github.com/joaokrv/backend_ai_can))

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/devg-lustosa/frontend_ai_can.git
cd frontend
```

### 2️⃣ Configure a URL da API

Edite `app/scripts/api.js`:

```javascript
const API_BASE_URL = 'http://localhost:8000';  // Desenvolvimento
// ou
const API_BASE_URL = 'https://backend-ai-can.onrender.com';  // Produção
```

### 3️⃣ Execute Localmente

**Opção A: Live Server (VS Code)**
```bash
# Instale a extensão "Live Server"
# Clique em "Go Live" na raiz do projeto
# Acesse http://localhost:5500/app/index.html
```

**Opção B: Python HTTP Server**
```bash
cd frontend
python -m http.server 5500
# Acesse http://localhost:5500/app/index.html
```

**A aplicação estará disponível em:**
- 🏠 **Home/Login**: `http://localhost:5500/app/index.html`
- 📝 **Cadastro**: `http://localhost:5500/app/view/cadastro.html`
- 🏋️ **Solicitar Lista**: `http://localhost:5500/app/view/solicitar-lista.html`

---

## 🌐 Funcionalidades Implementadas

### 🔐 **Sistema de Autenticação**

- **Cadastro** com validação de email único e confirmação de senha
- **Login** com JWT token armazenado em `localStorage`
- **Logout** disponível em todas as páginas autenticadas
- **Toggle de senha** (mostrar/esconder) em campos de password
- **Redirecionamento automático** após login bem-sucedido

### 📋 **Formulário de Solicitação**

**Campos validados:**
- Peso (20-350 kg)
- Idade (11-110 anos)
- Altura (50-300 cm)
- Disponibilidade (1-7 dias/semana)
- Local de Treino (Academia, Ar Livre, Casa)
- Objetivo (Perder Peso, Ganhar Peso, Hipertrofia, Definição)

### 🏋️ **Exibição de Planos**

- **Loading inteligente** com mensagens de status
- **Navegação por dias** de treino (cards clicáveis)
- **Detalhes de exercícios**: nome, séries, reps, descanso, vídeo
- **Sugestões nutricionais**: pré e pós-treino com receitas
- **Botão "Refazer Lista"** que limpa cache e retorna ao formulário

### 📄 **Geração de PDF**

- **Preview antes de gerar**: visualiza quantas páginas terá
- **Nome descritivo**: `Treino_AICAN_<nome_do_plano>_DD_MM_AAAA.pdf`
- **Formatação premium**: cores customizadas, logos, links clicáveis
- **Links funcionais**: URLs de vídeos e receitas sublinhados

### 💾 **Gerenciamento de Dados**

```javascript
const STORAGE_CONFIG = {
  PLAN_KEY: 'aican_resposta',      // Dados do plano
  METADATA_KEY: 'aican_metadata',  // Metadados (timestamp, hash)
  TOKEN_KEY: 'token',              // JWT do usuário
  USER_NAME: 'user_name',          // Nome do usuário
  EXPIRATION_HOURS: 24             // Cache expira em 24h
};
```

---

## 🎨 Design e UX

### Padrão Visual Premium

- **Cor principal**: `#008fcb` (azul vibrante)
- **Fundo**: Vídeo de academia em loop (opacidade 10%)
- **Glassmorphism**: Containers com backdrop-filter
- **Animações suaves**: Fade-in, scale on hover, glow effects
- **Typography**: Roboto (Google Fonts)

### Responsividade

```css
/* Mobile-first approach */
@media (max-width: 768px) {
  /* Ajustes para mobile */
}

@media (min-width: 768px) and (max-width: 1024px) {
  /* Ajustes para tablet */
}
```

### Botão de Logout

- Posição: **Bottom-left** (fixo)
- Estilo: Match com design premium
- Funcionalidade: Limpa localStorage e redireciona

---

## 📡 Comunicação com Backend

### Endpoints Utilizados

```javascript
// Autenticação
POST /api/v1/auth/register  // Criar conta
POST /api/v1/auth/login     // Login (retorna JWT)

// Geração de Planos
POST /api/v1/sugestao       // Gerar plano personalizado
Headers: { Authorization: 'Bearer <token>' }
```

### Formato de Requisição

```json
{
  "nome": "João Silva",
  "peso": 80,
  "idade": 25,
  "altura": 175,
  "disponibilidade_dias": 4,
  "local_treino": "academia",
  "objetivo": "hipertrofia"
}
```

---

## 🔐 Segurança

✅ **XSS Protection**: Sanitização de inputs  
✅ **CSRF**: Token JWT em headers  
✅ **HTTPS**: Recomendado para produção  
✅ **Data Expiration**: Cache expira em 24h  
✅ **No Sensitive Data**: Senhas não armazenadas no frontend  

---

## 📚 Recursos e Documentação

- [MDN Web Docs](https://developer.mozilla.org/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)
- [CSS Grid & Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/MinhaFeature`  
3. Commit: `git commit -m 'Adiciona MinhaFeature'`
4. Push: `git push origin feature/MinhaFeature`
5. Abra um Pull Request

**Padrões de código:**
- camelCase para JavaScript
- kebab-case para CSS
- 2 espaços de indentação
- Comentários em funções complexas

---

## 📄 Licença

Projeto acadêmico para fins educacionais.

---

## 👥 Autores

- **João Victor Carvalho** - Backend & Frontend - [GitHub](https://github.com/joaokrv)
- **Guilherme Lustosa** - Frontend - [GitHub](https://github.com/devg-lustosa)

---

## 📞 Suporte

Para dúvidas ou problemas, abra uma **issue** no repositório.

---

**Última atualização:** 27 de novembro de 2025  
**Versão:** 2.0.0  
**Status:** ✅ Ativo
