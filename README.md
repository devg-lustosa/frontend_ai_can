# 🏋️ AICan — Frontend (Interface Web)

---

## 📌 Sobre o Projeto

O **AICan Frontend** é uma interface web inteligente e responsiva para **coleta de dados do usuário** e **exibição de planos de treino personalizados** gerados pela IA. 

O objetivo é oferecer uma **experiência de usuário intuitiva** para:
- 📝 Coleta de informações físicas e preferências (altura, peso, idade, objetivo, disponibilidade)
- 🎬 Visualização de planos de treino em tempo real com vídeos e instruções
- 🍽️ Recomendações nutricionais personalizadas (pré-treino e pós-treino)
- 📱 Interface responsiva para desktop e mobile
- 💾 Gerenciamento de dados local com validação e metadados

---

## 🏗️ Arquitetura e Componentes

O frontend foi desenvolvido em **HTML5, CSS3 e JavaScript Vanilla** com foco em:

| Componente | Descrição |
|-----------|-----------|
| **HTML5** | Markup semântico, vídeo em background, formulários com validação nativa |
| **CSS3** | Layout responsivo, animações, variáveis CSS, scrollbar customizado |
| **JavaScript Vanilla** | Sem frameworks, execução leve, validação de formulário, comunicação com API |
| **LocalStorage API** | Persistência de dados com hash e metadados de controle |
| **Fetch API** | Requisições HTTP assíncronas para backend, tratamento de erros |
| **Responsive Design** | Mobile-first, breakpoints para tablets e desktops |

---

## 📁 Estrutura do Repositório

```text
frontend/
├── README.md                # Documentação do projeto
├── LICENSE
│
└── app/
    ├── assets/              # Arquivos de mídia
    │   ├── logo.aican.png   # Logo principal
    │   └── gym.fundo.mp4    # Vídeo de fundo (720p/1080p)
    │
    ├── view/                # Páginas HTML
    │   ├── index.html       # Landing page / Home
    │   ├── solicitar-lista.html  # Formulário de coleta de dados
    │   └── lista-exercicios.html # Exibição de planos gerados
    │
    ├── styles/              # Folhas de estilo CSS
    │   ├── home.css         # Estilos da landing page
    │   ├── lista.css        # Estilos da página de treinos
    │   └── solicitar-lista.css # Estilos do formulário
    │
    └── scripts/             # Lógica JavaScript
        ├── api.js           # Comunicação com backend
        ├── functions.js     # Funções utilitárias globais
        ├── home.js          # Scripts da landing page
        ├── solicitar-lista.js # Validação e lógica do formulário
        └── lista-page.js    # Renderização e navegação de treinos
```

---

## 🌐 Páginas Disponíveis

### 1️⃣ **index.html** — Landing Page
- 🎥 Vídeo de fundo em loop
- 📱 Logo e descrição do projeto
- 🎯 Call-to-action para começar
- 🔗 Link para página de ajuda

**Rota:** `/app/view/index.html`

### 2️⃣ **solicitar-lista.html** — Formulário de Coleta
- 📝 Campos: Nome, Peso, Idade, Altura, Disponibilidade, Local, Objetivo
- ✅ Validação em tempo real com mensagens de erro
- 🎬 Vídeo de fundo
- 🔄 Estados de loading durante a requisição
- 💾 Armazenamento local de dados

**Rota:** `/app/view/solicitar-lista.html`

**Validações implementadas:**

| Campo | Regras |
|-------|--------|
| **Nome** | Obrigatório, 3-50 caracteres, sem números, sem caracteres especiais |
| **Peso (kg)** | Obrigatório, 20-350 kg |
| **Idade (anos)** | Obrigatório, 11-110 anos |
| **Altura (cm)** | Obrigatório, 50-300 cm |
| **Disponibilidade** | Obrigatório, 1-7 dias por semana |
| **Local de Treino** | Obrigatório, opções: Academia, Ar Livre, Em Casa |
| **Objetivo** | Obrigatório, opções: Perder Peso, Ganhar Peso, Hipertrofia, Definição |

### 3️⃣ **lista-exercicios.html** — Exibição de Planos
- 📊 Renderização dinâmica de dias de treino
- 🏋️ Detalhes de exercícios (nome, séries, repetições, descanso, vídeo)
- 🍽️ Sugestões nutricionais (pré e pós-treino)
- 🔄 Estado de loading com spinner
- 📄 Botão para gerar PDF (preparado para extensão)
- 🔙 Botão para refazer o plano

**Rota:** `/app/view/lista-exercicios.html`

---

## 🔧 Funcionalidades Principais

### 📌 **Validação de Formulário** (`solicitar-lista.js`)

```javascript
// Validadores modulares e reutilizáveis
const validators = {
  required: (value) => ({ isValid: !!value?.trim(), message: "..." }),
  minLength: (min) => (value) => ({ isValid: value.length >= min, message: "..." }),
  maxLength: (max) => (value) => ({ isValid: value.length <= max, message: "..." }),
  pattern: (regex, msg) => (value) => ({ isValid: regex.test(value), message: msg }),
  range: (min, max, unit) => (value) => ({ isValid: value >= min && value <= max, message: "..." })
};

// Aplicação das regras
const regrasValidacao = {
  nome: [validators.required, validators.minLength(3), ...],
  peso: [validators.required, validators.range(20, 350, 'kg')],
  // ...
};
```

### 💾 **Gerenciamento de LocalStorage** (`lista-page.js`)

- **Armazenamento com metadados:**
  - Timestamp de criação
  - Hash para detectar corrupção
  - Versão do formato
  - Tamanho em KB

- **Expiração automática:** 24 horas
- **Limite de tamanho:** 800 KB
- **Limpeza de dados:** Removidos ao expirar ou quando corrompidos

```javascript
const STORAGE_CONFIG = {
  PLAN_KEY: 'aican_resposta',
  METADATA_KEY: 'aican_metadata',
  EXPIRATION_HOURS: 24,
  MAX_SIZE_KB: 800
};
```

### 🔄 **Comunicação com API** (`api.js`)

```javascript
async function solicitarPlano(dadosUsuario) {
  const response = await fetch('https://backend-ai-can.onrender.com/api/v1/sugestao', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dadosFormatados),
    timeout: 30000
  });
  
  if (!response.ok) {
    throw new Error(`API Error ${response.status}`);
  }
  
  return await response.json();
}
```

### 🎨 **Design Responsivo**

- **Mobile-first approach**
- **Breakpoints:**
  - `< 768px` — Mobile (ajustes de padding, overflow)
  - `768px - 1024px` — Tablet (layout otimizado)
  - `> 1024px` — Desktop (full width)

- **Vídeo de fundo:**
  - Responsivo com `object-fit: cover`
  - Opacity reduzida (0.1) para legibilidade
  - Fallback para cor sólida em navegadores antigos

---

## 🚀 Configuração e Instalação

### Pré-requisitos

- Navegador moderno (Chrome, Firefox, Safari, Edge) com suporte a:
  - HTML5 Video
  - LocalStorage API
  - Fetch API
  - CSS Grid/Flexbox
- Servidor web (Apache, Nginx) ou local com live server
- Conexão com backend AICan (produção ou desenvolvimento)

### 1️⃣ Clone o Repositório

```bash
git clone https://github.com/devg-lustosa/frontend_ai_can.git
cd frontend
```

### 2️⃣ Configure a API Backend

Edite `app/scripts/api.js` e configure a URL do backend:

```javascript
const API_BASE_URL = 'https://backend-ai-can.onrender.com'; // Produção
// ou
const API_BASE_URL = 'http://localhost:8000'; // Desenvolvimento local
```

### 3️⃣ Adicione Mídia (Assets)

Coloque os arquivos na pasta `app/assets/`:

- `logo.aican.png` — Logo principal (250x250px recomendado)
- `gym.fundo.mp4` — Vídeo de fundo em MP4 (720p/1080p)

### 4️⃣ Teste Localmente

**Opção A: Live Server (VS Code)**

```bash
# Instale a extensão "Live Server" no VS Code
# Clique em "Go Live" na raiz do projeto
# Acesse http://localhost:5500/app/view/index.html
```

**Opção B: Python HTTP Server**

```bash
# Python 3
cd frontend
python -m http.server 8080

# Acesse http://localhost:8080/app/view/index.html
```

**Opção C: Node.js (http-server)**

```bash
npm install -g http-server
cd frontend
http-server -p 8080

# Acesse http://localhost:8080/app/view/index.html
```

### 5️⃣ Deploy em Produção

#### **Opção 1: Vercel (Recomendado)**

1. Faça fork do repositório no GitHub
2. Conecte ao Vercel: <https://vercel.com/import>
3. Configure variáveis de ambiente (se necessário):
   - `VITE_API_URL` ou similar em `.env.production`
4. Deploy automático a cada push na branch `main`

#### **Opção 2: Netlify**

```bash
# 1. Instale Netlify CLI
npm install -g netlify-cli

# 2. Faça deploy
cd frontend
netlify deploy --prod --dir .
```

#### **Opção 3: GitHub Pages**

```bash
# 1. Configure no repositório
# Settings → Pages → Source: main branch /root

# 2. Push para GitHub
git add .
git commit -m "Deploy frontend"
git push origin main

# Acesse https://seu-username.github.io/frontend_ai_can/
```

#### **Opção 4: Servidor Apache/Nginx**

```bash
# Apache
# 1. Copie arquivos para /var/www/html/aican-frontend/
# 2. Configure .htaccess para SPA routing (se necessário)
# 3. Acesse https://seu-dominio.com/aican-frontend/

# Nginx
# 1. Configure bloco de server em nginx.conf
# 2. Root diretório: /usr/share/nginx/html/aican-frontend/
# 3. Acesse https://seu-dominio.com/aican-frontend/
```

**Exemplo nginx.conf:**

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    root /usr/share/nginx/html/aican-frontend;
    index index.html;
    
    location / {
        try_files $uri $uri/ /app/view/index.html;
    }
    
    # CORS para chamadas à API
    add_header Access-Control-Allow-Origin "https://backend-ai-can.onrender.com";
    add_header Access-Control-Allow-Methods "GET, POST, OPTIONS";
}
```

---

## 🔐 Configurações de Segurança

### CORS (Cross-Origin Resource Sharing)

O frontend faz requisições ao backend. Certifique-se de:

1. **Backend permite origem do frontend:**

```python
# main.py (FastAPI)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://seu-frontend.com", "http://localhost:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

2. **Não exponha dados sensíveis no LocalStorage:**
   - Dados do usuário são armazenados temporariamente
   - Expiram após 24 horas
   - Não incluem senhas ou tokens

### Content Security Policy (CSP)

Adicione a tag meta em `index.html` para segurança adicional:

```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self'; 
               style-src 'self' 'unsafe-inline'; 
               media-src https:; 
               connect-src https://backend-ai-can.onrender.com;">
```

---

## 🧪 Testes e Validação

### Teste de Validação de Formulário

```javascript
// Abra o console do navegador (F12) e execute:

// Teste 1: Nome inválido
document.getElementById('nome').value = '123';
console.log(validarCampo(document.getElementById('nome'), regrasValidacao.nome)); // false

// Teste 2: Peso fora do intervalo
document.getElementById('peso').value = '500';
console.log(validarCampo(document.getElementById('peso'), regrasValidacao.peso)); // false

// Teste 3: Dados válidos
document.getElementById('nome').value = 'João Silva';
document.getElementById('peso').value = '80';
// ... preencher outros campos ...
console.log('Formulário pronto para submissão');
```

### Teste de LocalStorage

```javascript
// Verificar dados armazenados
console.log(JSON.parse(localStorage.getItem('aican_resposta')));

// Verificar metadados
console.log(JSON.parse(localStorage.getItem('aican_metadata')));

// Limpar dados (para forçar nova requisição)
localStorage.removeItem('aican_resposta');
localStorage.removeItem('aican_metadata');
```

---

## 📊 Performance e Otimizações

### Tamanho de Arquivo

| Recurso | Tamanho |
|---------|---------|
| HTML (3 páginas) | ~15 KB |
| CSS (3 folhas) | ~25 KB |
| JavaScript (5 scripts) | ~35 KB |
| Vídeo (gym.fundo.mp4) | ~5-10 MB (comprimido) |
| **Total (sem vídeo)** | ~75 KB |

### Otimizações Implementadas

✅ **Lazy loading** de scripts (carregados apenas quando necessário)  
✅ **Variáveis CSS** para reutilização de cores e tamanhos  
✅ **Flexbox/Grid** para layout eficiente  
✅ **Debouncing** em validações (pode ser adicionado)  
✅ **Compressão de vídeo** (use format like WebM ou HEVC)  
✅ **Caching de localStorage** com expiração inteligente  

### Melhorias Futuras

- [ ] Minificação de CSS/JS para produção
- [ ] Service Workers para offline support
- [ ] PWA manifest para instalação mobile
- [ ] Compressão de vídeo (WebM + MP4 fallback)
- [ ] Lazy loading de imagens
- [ ] Otimização de Core Web Vitals (LCP, CLS, FID)

---

## ❓ Troubleshooting

### Erro: `Failed to fetch API`

**Causa:** Backend offline ou CORS não configurado

**Solução:**
1. Verifique se o backend está rodando
2. Confirme a URL em `api.js`
3. Teste a API: `curl https://backend-ai-can.onrender.com/health`
4. Configure CORS no backend

### Erro: `Vídeo não carrega`

**Causa:** Arquivo não encontrado ou navegador não suporta MP4

**Solução:**
1. Verifique se `gym.fundo.mp4` está em `app/assets/`
2. Use formato alternativo (WebM)
3. Reduza resolução (720p em vez de 1080p)
4. Comprima com FFmpeg: `ffmpeg -i input.mp4 -crf 28 output.mp4`

### Erro: `localStorage quota exceeded`

**Causa:** Dados muito grandes ou muitas requisições

**Solução:**
1. Limpe dados antigos: `localStorage.clear()`
2. Reduza tamanho da resposta no backend
3. Implementar compressão de JSON (gzip)

### Erro: `Formulário não valida`

**Causa:** Validadores não funcionando

**Solução:**
1. Abra o console (F12) e verifique erros
2. Teste cada validador isoladamente
3. Confirme que os `id` dos inputs correspondem aos nomes em `regrasValidacao`

### Validação não aparece em tempo real

**Causa:** Falta event listener em inputs

**Solução:**
1. Adicione event listeners em `solicitar-lista.js`:
```javascript
document.querySelectorAll('input, select').forEach(field => {
  field.addEventListener('blur', () => {
    // Validar campo ao sair do foco
  });
});
```

---

## 📚 Recursos e Documentação

- [MDN Web Docs](https://developer.mozilla.org/) — Referência JavaScript/CSS/HTML
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [LocalStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [CSS Grid & Flexbox](https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout)
- [HTML5 Video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch: `git checkout -b feature/MinhaFeature`
3. Faça commits descritivos: `git commit -m 'Adiciona MinhaFeature'`
4. Push para a branch: `git push origin feature/MinhaFeature`
5. Abra um Pull Request com descrição clara

**Guia de código:**

- Siga padrões de nomenclatura camelCase (JavaScript) e kebab-case (CSS)
- Documente funções com comentários
- Use nomes descritivos para variáveis
- Teste em múltiplos navegadores (Chrome, Firefox, Safari, Edge)
- Valide HTML com [W3C Validator](https://validator.w3.org/)

---

## 📄 Licença

Trabalho acadêmico para fins educacionais.

---

## 👥 Autores

- **João Victor Carvalho** — Frontend — [GitHub](https://github.com/joaokrv)
- **Guilherme Lustosa** — Frontend — [GitHub](https://github.com/devg-lustosa)

---

## 🔄 Melhorias Futuras

- [ ] Modo dark/light automático
- [ ] Exportação em PDF e imagem

---

## 📞 Suporte

Para dúvidas ou problemas, abra uma **issue** no repositório.

---

**Última atualização:** 20 de novembro de 2025  
**Versão:** 1.0.0  
**Status:** Ativo
