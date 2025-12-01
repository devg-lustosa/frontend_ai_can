# 🏋️ AICan — Frontend (Interface Web)

---

## 📌 Sobre o Projeto

O **AICan Frontend** é uma interface web responsiva e intuitiva para **geração de planos de treino personalizados** com integração à IA. 

Desenvolvido com foco em:
- 🔐 **Sistema de autenticação** (cadastro, login, logout)
- 📝 **Formulários inteligentes** com validação em tempo real
- 🎬 **Visualização dinâmica** de planos de treino com vídeos explicativos
- 🍽️ **Sugestões nutricionais** personalizadas (pré e pós-treino)
- 📄 **Exportação em PDF** otimizada para desktop e mobile
- 💾 **Persistência local** com expiração automática e validação de integridade

---

## 🏗️ Arquitetura e Componentes

O frontend foi desenvolvido com **JavaScript Vanilla** seguindo uma arquitetura **modular e leve**:

| Componente | Descrição |
|-----------|-----------|
| **HTML5** | Markup semântico, validação nativa, acessibilidade |
| **CSS3** | Variáveis CSS, Grid/Flexbox, animações, design premium |
| **JavaScript Vanilla** | Módulos ES6, código otimizado, validação robusta |
| **StorageManager** | Classe gerenciadora de localStorage com metadados e expiração |
| **Fetch API** | Comunicação assíncrona com backend, tratamento de erros |
| **html2pdf.js** | Geração de PDF client-side otimizada para mobile |

---

## 📁 Estrutura do Projeto

```
frontend/
├── README.md
├── LICENSE
│
└── app/
    ├── index.html             # Página de login
    ├── home.css               # Estilos da página de login
    │
    ├── assets/
    │   ├── favicon.png        # Ícone do site
    │   ├── logo.aican.png     # Logo (250x250px)
    │   └── gym.fundo.mp4      # Vídeo de fundo
    │
    ├── view/
    │   ├── cadastro.html          # Página de cadastro
    │   ├── ajuda.html             # FAQ e informações
    │   ├── solicitar-lista.html   # Formulário de treino
    │   └── lista-exercicios.html  # Exibição de resultados
    │
    ├── styles/
    │   ├── cadastro.css           # Estilos do cadastro
    │   ├── ajuda.css              # Estilos da página de ajuda
    │   ├── solicitar-lista.css    # Estilos do formulário
    │   └── lista.css              # Estilos da lista de treinos
    │
    └── scripts/
        ├── api.js                 # Comunicação com backend (Fetch API)
        ├── functions.js           # Funções globais (logout, localStorage helpers)
        ├── validators.js          # Validações de formulários
        ├── storage-manager.js     # Classe StorageManager (localStorage avançado)
        ├── feedback.js            # Sistema de like/dislike para exercícios e refeições
        ├── home.js                # Animações da landing page
        ├── login.js               # Lógica de autenticação
        ├── cadastro.js            # Lógica de registro
        ├── solicitar-lista.js     # Validação e envio do formulário
        ├── lista-page.js          # Renderização dos treinos
        └── pdf-generator.js       # Geração de PDF (mobile-friendly)
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
- ❓ **Ajuda/FAQ**: `http://localhost:5500/app/view/ajuda.html`

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

- **Loading inteligente** com mensagens de status dinâmicas
- **Navegação por dias** de treino (cards clicáveis)
- **Detalhes de exercícios**: nome, séries, reps, descanso, vídeo
- **Sugestões nutricionais**: pré e pós-treino (opções econômica, equilibrada e premium)
- **Sistema de Feedback**: Like/Dislike para exercícios e refeições (gema para cima/baixo)
- **Personalização**: Próximos planos gerados evitam itens com dislike
- **Botão "Refazer Lista"** que limpa cache e retorna ao formulário

### 📄 **Geração de PDF**

- **Compatibilidade mobile**: Renderização otimizada para dispositivos móveis
- **Preview interativo**: Modal com informações do PDF e opções
- **Fechar modal**: Clique fora do modal, tecla ESC ou botão X
- **Nome descritivo**: `Treino_AICAN_<nome_do_plano>_DD_MM_AAAA.pdf`
- **Formatação premium**: Cores customizadas (#008fcb), links clicáveis
- **Seções completas**: Exercícios por dia + Nutrição (pré e pós-treino)
- **Links funcionais**: URLs de vídeos do YouTube e receitas do Google

### 💾 **Gerenciamento de Dados (StorageManager)**

```javascript
// Classe StorageManager - Gerenciamento avançado de localStorage
StorageManager.CONFIG = {
  PLAN_KEY: 'aican_resposta',        // Dados do plano
  METADATA_KEY: 'aican_metadata',    // Metadados (timestamp, hash)
  SOLICITACAO_KEY: 'aican_solicitacao', // Dados da solicitação pendente
  TOKEN_KEY: 'token',                // JWT do usuário
  USER_NAME: 'user_name',            // Nome do usuário
  EXPIRATION_HOURS: 24,              // Cache expira em 24h
  MAX_SIZE_KB: 800                   // Limite de tamanho por item
};

// Métodos principais
StorageManager.save(key, data)       // Salvar com metadados
StorageManager.load(key)             // Carregar com validação de expiração
StorageManager.remove(key)           // Remover item e metadados
StorageManager.isExpired(key)        // Verificar expiração
StorageManager.getStorageInfo()      // Informações de uso
StorageManager.cleanExpired()        // Limpar dados expirados (auto)
```

---

## 🎨 Design e UX

### Padrão Visual Premium

- **Cor principal**: `#008fcb` (azul vibrante)
- **Cor hover**: `#0278aa` (azul escuro)
- **Fundo**: Vídeo de academia em loop (opacidade 10%)
- **Glassmorphism**: Containers com backdrop-filter
- **Animações suaves**: Fade-in, scale on hover, glow effects
- **Typography**: Roboto (Google Fonts)

### Responsividade

```css
/* Mobile-first approach */
@media (max-width: 768px) {
  /* Ajustes para mobile - PDF usa scale menor */
}

@media (min-width: 768px) and (max-width: 1024px) {
  /* Ajustes para tablet */
}
```

### Modal de PDF

- **Overlay**: Background rgba(0, 0, 0, 0.85)
- **Container**: Max-width 600px, border-radius 12px
- **Fechar**: Clique fora, tecla ESC, botão X (canto superior direito)
- **Botões**: Cancelar (outline) e Gerar PDF (primary)

---

## 📡 Comunicação com Backend

### Endpoints Utilizados

```javascript
// Autenticação
POST /api/v1/auth/register    // Criar conta
POST /api/v1/auth/login       // Login (retorna JWT)
GET  /api/v1/auth/me          // Dados do usuário autenticado

// Geração de Planos
POST /api/v1/sugestao         // Gerar plano personalizado
Headers: { Authorization: 'Bearer <token>' }

// Feedback (Like/Dislike)
POST /api/v1/feedback/exercicio  // Avaliar exercício
POST /api/v1/feedback/refeicao   // Avaliar refeição
GET  /api/v1/feedback/me         // Listar preferências do usuário

// Health Check
GET  /health                  // Verificar disponibilidade da API
```

### Formato de Requisição (Solicitação de Plano)

```json
{
  "nome": "João Silva",
  "peso": 80,
  "idade": 25,
  "altura": 175,
  "disponibilidade": 4,
  "local": "academia",
  "objetivo": "hipertrofia"
}
```

### Tratamento de Erros

```javascript
// Códigos HTTP tratados
401 → Sessão expirada (redireciona para login)
400 → Dados inválidos
404 → Recurso não encontrado
409 → Email já cadastrado
500 → Erro no servidor
```

---

## 🔐 Segurança

✅ **XSS Protection**: Sanitização de inputs  
✅ **CSRF**: Token JWT em headers Authorization  
✅ **HTTPS**: Recomendado para produção  
✅ **Data Expiration**: Cache expira automaticamente em 24h  
✅ **Data Validation**: Verificação de integridade via hash  
✅ **Size Limits**: Limite de 800KB por item no localStorage  
✅ **Feedback Validation**: Debounce (1s) bloqueia múltiplos cliques  
✅ **No Sensitive Data**: Senhas não armazenadas no frontend  

---

## 📚 Scripts e Módulos

| Script | Descrição |
|--------|-----------|
| `api.js` | Comunicação HTTP com backend, tratamento de erros |
| `storage-manager.js` | Classe StorageManager para localStorage avançado |
| `functions.js` | Funções utilitárias (logout, carregarLocalStorage, salvarLocalStorage) |
| `validators.js` | Validações de formulários e inputs |
| `login.js` | Lógica de autenticação e redirecionamento |
| `cadastro.js` | Validação e envio do formulário de cadastro |
| `solicitar-lista.js` | Validação do formulário de solicitação de treino |
| `lista-page.js` | Renderização dinâmica da lista de exercícios com feedback |
| `pdf-generator.js` | Geração de PDF com html2pdf.js (mobile-friendly) |
| `feedback.js` | Sistema de like/dislike (gema para cima/baixo) com integração API |
| `home.js` | Animações e efeitos da página inicial |

---

## 📚 Recursos e Documentação

- [MDN Web Docs](https://developer.mozilla.org/)
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js)
- [html2canvas](https://html2canvas.hertzen.com/)
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
- JSDoc para funções públicas
- Comentários em funções complexas

---

## 📄 Licença

Projeto acadêmico para fins educacionais.

---

## 👥 Autores

- **João Victor Carvalho** - Backend & Frontend & DB - [GitHub](https://github.com/joaokrv)
- **Guilherme Lustosa** - Frontend - [GitHub](https://github.com/devg-lustosa)
- **André Toledo** - Frontend [Github](https://github.com/AndreToledoo)
- **Marcelo Gutemberg** - Frontend

---

## 📞 Suporte

Para dúvidas ou problemas, abra uma **issue** no repositório.

---

**Última atualização:** 1 de dezembro de 2025  
**Versão:** 2.2.0  
**Status:** ✅ Ativo
