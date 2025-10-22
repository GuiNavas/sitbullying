# 🛡️ Site Contra o Bullying

Plataforma de conscientização sobre bullying e cyberbullying com sistema de denúncias e estatísticas.

## 🚀 Deploy no Render

### 1. **Preparação**
- Faça upload do projeto para o GitHub
- Certifique-se de que todos os arquivos estão na pasta raiz

### 2. **Configuração no Render**
1. Acesse [render.com](https://render.com)
2. Clique em "New +" → "Web Service"
3. Conecte seu repositório GitHub
4. Configure:
   - **Name**: `bullying-site` (ou nome de sua escolha)
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
   - **Instance Type**: `Free` (ou pago para melhor performance)

### 3. **Deploy Automático**
- O Render detectará automaticamente o Flask
- O deploy será feito automaticamente
- Você receberá uma URL pública

## 📱 Recursos

### ✅ **Funcionalidades**
- **Página Inicial**: Informações sobre bullying
- **Sobre**: Detalhes sobre o projeto
- **Estatísticas**: Gráficos e dados simulados
- **Denúncia**: Formulário para reportar casos
- **Contato**: Formulário de contato

### ✅ **Responsividade**
- **Desktop**: Layout completo
- **Tablet**: Adaptado para telas médias
- **Mobile**: Otimizado para smartphones
- **Celulares pequenos**: Suporte até 320px

### ✅ **Tecnologias**
- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS3, JavaScript
- **Framework CSS**: Bootstrap 5
- **Ícones**: Font Awesome
- **Gráficos**: Matplotlib
- **Banco**: SQLite

## 🔧 Desenvolvimento Local

### **Requisitos**
- Python 3.11 (ou compatível)
- pip (gerenciador de pacotes do Python)
- (Opcional, recomendado) virtualenv/venv

### **Instalação**
```bash
pip install -r requirements.txt
```

### **Execução**
```bash
python app.py
```

### **Acesso**
- **Local**: `http://localhost:5000`
- **Rede**: `http://SEU_IP:5000`

### **Passo a passo no Windows (PowerShell)**
```bash
cd "C:\Users\hamud\Downloads\bullyin-main\bullyin-main"
python -m venv venv
venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

### **Área de Administrador**
- Clique na logo pequena no topo para abrir o prompt.
- Senha: `DanielGuilherme`
- Após sucesso: `http://localhost:5000/admin`

## 📊 Estrutura do Projeto

```
bullying-main/
├── app.py                 # Aplicação Flask principal
├── requirements.txt       # Dependências Python
├── Procfile              # Configuração para deploy
├── .gitignore            # Arquivos ignorados pelo Git
├── README.md             # Este arquivo
├── static/               # Arquivos estáticos
│   ├── css/
│   │   ├── bootstrap.min.css
│   │   └── style.css
│   ├── img/
│   │   └── logo.png
│   └── js/
│       ├── bootstrap.bundle.min.js
│       └── script.js
└── templates/            # Templates HTML
    ├── base.html
    ├── index.html
    ├── sobre.html
    ├── estatisticas.html
    ├── denuncia.html
    └── contato.html
```

## 🎨 Design

### **Cores**
- **Primária**: #e53935 (Vermelho)
- **Secundária**: #424242 (Cinza escuro)
- **Fundo**: #f8f9fa (Cinza claro)
- **Texto**: #212529 (Preto)

### **Tipografia**
- **Fonte**: Inter (Google Fonts)
- **Tamanhos**: Responsivos para mobile

## 📱 Teste Mobile

### **Local**
1. Execute: `python app.py`
2. Descubra seu IP: `ipconfig` (Windows) ou `ifconfig` (Mac/Linux)
3. Acesse no celular: `http://SEU_IP:5000`

### **Online**
- Use a URL fornecida pelo Render
- Teste em diferentes dispositivos

## 🔒 Segurança

- **Dados simulados**: Todas as estatísticas são fictícias
- **Projeto acadêmico**: Desenvolvido para fins educacionais
- **Validação**: Formulários com validação client-side e server-side

## 📈 Performance

- **CSS otimizado**: Carregamento rápido
- **JavaScript eficiente**: Funcionalidades responsivas
- **Imagens otimizadas**: Tamanhos adequados
- **Mobile-first**: Design otimizado para celular

## 🤝 Contribuição

Este é um projeto acadêmico de conscientização sobre bullying. 

## 📄 Licença

Projeto acadêmico - Uso educacional.

---

**Desenvolvido com ❤️ para combater o bullying**