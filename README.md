# 🎮 CS2 Inventory API

API REST para gerenciamento de inventário de Counter-Strike 2 com autenticação JWT, controle de acesso por papéis (RBAC) e documentação automática via Swagger.

## 📋 Pré-requisitos

- Node.js 16+
- MongoDB Atlas (conta gratuita em [mongodb.com](https://www.mongodb.com/cloud/atlas))
- npm

## 🚀 Instalação e Setup

### 1. Clonar e instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto baseado em `.env.example`:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
MONGO_URI=mongodb+srv://user_api:SUA_SENHA@cluster.mongodb.net/cs2_inventory?retryWrites=true&w=majority
JWT_SECRET=sua_chave_secreta_aqui_min_32_caracteres
PORT=3000
```

### 3. Criar primeiro usuário admin

Execute o script de seed para criar o primeiro usuário admin:

```bash
npm run seed
```

Credenciais padrão:
- **Email**: `admin@cs2.com`
- **Senha**: `admin123`

## 📖 Como usar

### Iniciar servidor de desenvolvimento

```bash
npm run dev
```

O servidor rodará em `http://localhost:3000`

### Iniciar servidor de produção

```bash
npm start
```

## 🔐 Autenticação

### 1. Fazer login

```bash
POST /auth/login
Content-Type: application/json

{
  "email": "admin@cs2.com",
  "senha": "admin123"
}
```

**Resposta (sucesso)**:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. Usar o token nas requisições protegidas

Adicione o header `Authorization`:

```bash
GET /caixas
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## 📚 Documentação da API

Acesse a documentação interativa do Swagger em:

```
http://localhost:3000/api-docs
```

Todas as rotas estão documentadas com exemplos de requisição/resposta.

## 🛣️ Rotas Disponíveis

### Autenticação

- `POST /auth/login` - Fazer login e obter JWT

### Usuários (requer admin)

- `POST /users` - Criar novo usuário

### Caixas

- `GET /caixas` - Listar todas as caixas
- `GET /caixas/:id` - Obter caixa por ID
- `GET /caixas/view` - Renderizar página HTML
- `POST /caixas` - Criar nova caixa (requer admin)
- `PUT /caixas/:id` - Atualizar caixa completamente (requer admin)
- `PATCH /caixas/:id` - Atualizar caixa parcialmente (requer admin)
- `DELETE /caixas/:id` - Deletar caixa (requer admin)

### Skins

- `GET /skins` - Listar todas as skins
- `GET /skins/:id` - Obter skin por ID
- `GET /skins/view` - Renderizar página HTML
- `POST /skins` - Criar nova skin (requer admin)
- `PUT /skins/:id` - Atualizar skin completamente (requer admin)
- `PATCH /skins/:id` - Atualizar skin parcialmente (requer admin)
- `DELETE /skins/:id` - Deletar skin (requer admin)

### Perfil

- `GET /perfil` - Renderizar página do perfil

## 🛠️ Tecnologias

- **Express.js** - Framework web
- **MongoDB** - Banco de dados
- **JWT** - Autenticação
- **bcrypt** - Hash de senhas
- **Swagger** - Documentação da API
- **Pug** - Template engine

## 📁 Estrutura do Projeto

```
src/
├── app.js                    # Configuração Express
├── server.js                 # Entrada principal
├── controllers/              # Lógica das rotas
├── routes/                   # Definição de rotas
├── services/                 # Lógica de negócio
├── repositories/             # Acesso ao MongoDB
├── middlewares/              # Middlewares (auth, validation)
├── validators/               # Regras de validação
├── data/                     # Conexão MongoDB
├── views/                    # Templates Pug
└── swagger.js                # Documentação Swagger
```

## ⚠️ Observações Importantes

- O arquivo `.env` contém dados sensíveis e **não deve ser commitado**
- O `JWT_SECRET` deve ter no mínimo 32 caracteres
- Senhas são hasheadas com bcrypt (rounds: 10)
- Tokens JWT expiram em 1 hora
- Rotas de escrita (POST, PUT, PATCH, DELETE) requerem autenticação e role `admin`

## 🐛 Troubleshooting

### "MongoDB não está conectado"

Verifique se o `MONGO_URI` está correto em `.env` e se você tem acesso à internet para conectar ao MongoDB Atlas.

### "Token inválido ou não fornecido"

Certifique-se de que:
1. O header `Authorization` está presente
2. O formato é `Bearer <token>` (com espaço)
3. O token não expirou

### "Acesso negado. Permissões insuficientes"

Verifique se o usuário tem role `admin`. Use `npm run seed` para criar um admin se necessário.

## 📞 Suporte

Para reportar bugs ou sugerir melhorias, crie uma issue no repositório.
