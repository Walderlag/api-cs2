# 🎮 CS2 Inventory API

API REST para gerenciamento de inventário de Counter-Strike 2 com autenticação JWT, controle de acesso por papéis (RBAC) e documentação automática via Swagger.

## 📋 Descrição do Projeto

Esta é uma API desenvolvida para um trabalho de Backend Web que implementa um sistema de abertura de caixas de CS2 (Counter-Strike 2). O sistema permite:

- **Autenticação** com JWT e controle de acesso por papéis (admin/user)
- **Gerenciamento de Caixas** com skins associadas
- **Abertura de Caixas** com mecânica de sorteio baseada em raridade
- **Inventário de Usuários** para armazenar skins obtidas
- **Sistema de Chaves** para abrir caixas
- **Perfil de Jogador** com dados gerais
- **Documentação Swagger** automática e interativa

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Banco de Dados**: MongoDB
- **Autenticação**: JWT + bcrypt
- **Template Engine**: Pug (para views)
- **Documentação**: Swagger/OpenAPI

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
RENDER_EXTERNAL_URL=http://localhost:3000
```

### 3. Criar primeiro usuário admin

Execute o script de seed para criar o primeiro usuário admin e dados iniciais:

```bash
npm run seed
```

**Credenciais padrão**:
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

## 🔐 Autenticação e Autorização

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
Se houver muitas tentativas de login inválidas, a conta do usuário pode ser temporariamente bloqueada e a API retornará status 403 até que o bloqueio expire.


### 2. Usar o token nas requisições protegidas

Adicione o header `Authorization`:

```bash
GET /caixas
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 3. Controle de acesso

- **public**: sem autenticação necessária
- **authenticated**: requer token JWT válido
- **admin**: requer token JWT e role `admin`

## 📚 Documentação da API Interativa

Acesse a documentação interativa do Swagger em:

```
http://localhost:3000/api-docs
```

## 🗂 Estrutura de Rotas

### 🔑 Autenticação (`/auth`)

| Método | Rota | Autenticação | Descrição |
|--------|------|--------------|-----------|
| POST | `/auth/login` | public | Fazer login e obter JWT |

### 👥 Usuários (`/users`)

| Método | Rota | Autenticação | Descrição |
|--------|------|--------------|-----------|
| GET | `/users` | admin | Listar todos os usuários |
| POST | `/users` | admin | Criar novo usuário |

### 📦 Caixas (`/caixas`)

| Método | Rota | Autenticação | Descrição |
|--------|------|--------------|-----------|
| GET | `/caixas` | public | Listar todas as caixas |
| GET | `/caixas/view` | public | Renderizar página HTML de caixas |
| GET | `/caixas/:id` | public | Obter caixa por ID |
| POST | `/caixas` | admin | Criar nova caixa |
| PUT | `/caixas/:id` | admin | Atualizar caixa (PUT) |
| PATCH | `/caixas/:id` | admin | Atualizar caixa parcialmente (PATCH) |
| DELETE | `/caixas/:id` | admin | Deletar caixa |
| POST | `/caixas/:id/abrir` | authenticated | Abrir caixa (usar uma chave) |

### 🎨 Skins (`/skins`)

| Método | Rota | Autenticação | Descrição |
|--------|------|--------------|-----------|
| GET | `/skins` | public | Listar todas as skins |
| GET | `/skins/view` | public | Renderizar página HTML de skins |
| GET | `/skins/:id` | public | Obter skin por ID |
| POST | `/skins` | admin | Criar nova skin |
| PUT | `/skins/:id` | admin | Atualizar skin (PUT) |
| PATCH | `/skins/:id` | admin | Atualizar skin parcialmente (PATCH) |
| DELETE | `/skins/:id` | admin | Deletar skin |

### 🔓 Chaves (`/chaves`)

| Método | Rota | Autenticação | Descrição |
|--------|------|--------------|-----------|
| GET | `/chaves` | public | Listar todas as chaves |
| GET | `/chaves/:id` | public | Obter chave por ID |
| POST | `/chaves` | admin | Criar nova chave |
| PUT | `/chaves/:id` | admin | Atualizar chave (PUT) |
| PATCH | `/chaves/:id` | admin | Atualizar chave parcialmente (PATCH) |
| DELETE | `/chaves/:id` | admin | Deletar chave |

### 👤 Perfil (`/perfil`)

| Método | Rota | Autenticação | Descrição |
|--------|------|--------------|-----------|
| GET | `/perfil` | public | Obter perfil do jogador |
| GET | `/perfil/view` | public | Renderizar página HTML do perfil |

### 📈 Inventário (`/inventario`)

| Método | Rota | Autenticação | Descrição |
|--------|------|--------------|-----------|
| GET | `/inventario` | authenticated | Obter inventário do usuário autenticado |

## 🔍 Exemplos de Uso

### Criar uma nova caixa (admin)

```bash
POST /caixas HTTP/1.1
Authorization: Bearer <seu_token>
Content-Type: application/json

{
  "nome": "Caixa de Operação Horizon",
  "colecao": "Horizon"
}
```

### Criar uma nova skin (admin)

```bash
POST /skins HTTP/1.1
Authorization: Bearer <seu_token>
Content-Type: application/json

{
  "arma": "AK-47",
  "nome_skin": "Phantom Disruptor",
  "raridade": "classified",
  "caixa_id": "507f1f77bcf86cd799439011"
}
```

### Criar uma nova chave (admin)

```bash
POST /chaves HTTP/1.1
Authorization: Bearer <seu_token>
Content-Type: application/json

{
  "nome": "Chave de Caso",
  "quantidade": 50
}
```

### Abrir uma caixa (usuário autenticado)

```bash
POST /caixas/507f1f77bcf86cd799439011/abrir HTTP/1.1
Authorization: Bearer <seu_token>
```

**Resposta (sucesso)**:
```json
{
  "mensagem": "Caixa aberta com sucesso!",
  "skin": {
    "id": "507f1f77bcf86cd799439012",
    "arma": "AK-47",
    "nome_skin": "Phantom Disruptor",
    "raridade": "classified",
    "caixa_id": "507f1f77bcf86cd799439011"
  }
}
```

### Obter inventário (usuário autenticado)

```bash
GET /inventario HTTP/1.1
Authorization: Bearer <seu_token>
```

## 🗄 Estrutura do Banco de Dados

### Collections

- **users** - Usuários do sistema
  ```json
  {
    "_id": "ObjectId",
    "email": "string",
    "senha": "string (bcrypt)",
    "role": "string (admin|user)",
    "criadoEm": "Date",
    "tentativasFalhas": "number",
    "bloqueadoAte": "Date | null"
  }
  ```

- **caixas** - Caixas de casos
  ```json
  {
    "_id": "ObjectId",
    "nome": "string",
    "colecao": "string"
  }
  ```

- **skins** - Armas com skins
  ```json
  {
    "_id": "ObjectId",
    "arma": "string",
    "nome_skin": "string",
    "raridade": "string",
    "caixa_id": "ObjectId"
  }
  ```

- **chaves** - Chaves de caso
  ```json
  {
    "_id": "ObjectId",
    "nome": "string",
    "quantidade": "number"
  }
  ```

- **inventario** - Inventários de usuários
  ```json
  {
    "_id": "ObjectId",
    "userId": "ObjectId",
    "skinId": "ObjectId",
    "arma": "string",
    "nome_skin": "string",
    "raridade": "string",
    "caixa_id": "ObjectId",
    "obtidoEm": "Date"
  }
  ```

## 📁 Estrutura do Projeto

```
api-cs2/
├── src/
│   ├── app.js                    # Configuração principal do Express
│   ├── server.js                 # Inicialização do servidor
│   ├── swagger.js                # Configuração do Swagger/OpenAPI
│   ├── controllers/              # Controladores (lógica de rota)
│   │   ├── caixaController.js
│   │   ├── chaveController.js
│   │   ├── perfilController.js
│   │   └── skinController.js
│   ├── models/                   # Modelos de dados
│   │   ├── Caixa.js
│   │   ├── Chave.js
│   │   └── Skin.js
│   ├── dtos/                     # Data Transfer Objects (serialização)
│   │   ├── caixaDTO.js
│   │   ├── chaveDTO.js
│   │   └── skinDTO.js
│   ├── validators/               # Validadores (express-validator)
│   │   ├── caixaValidator.js
│   │   ├── chaveValidator.js
│   │   └── skinValidator.js
│   ├── repositories/             # Acesso a dados (MongoDB)
│   │   └── inventoryRepository.js
│   ├── services/                 # Lógica de negócio
│   │   └── inventoryService.js
│   ├── middlewares/              # Middlewares (autenticação, permissão, validação)
│   │   ├── authMiddleware.js
│   │   ├── permissionMiddleware.js
│   │   └── validatorMiddleware.js
│   ├── routes/                   # Definição de rotas
│   │   ├── authRoutes.js
│   │   ├── caixaRoutes.js
│   │   ├── chaveRoutes.js
│   │   ├── perfilRoutes.js
│   │   ├── skinRoutes.js
│   │   └── userRoutes.js
│   ├── views/                    # Templates Pug
│   │   ├── caixas.pug
│   │   ├── perfil.pug
│   │   └── skins.pug
│   └── data/                     # Configuração de banco de dados
│       ├── database.js
│       └── db.js
├── .env.example                  # Exemplo de variáveis de ambiente
├── package.json
├── seed.js                       # Script para criar dados iniciais
└── README.md
```

## 🎯 Padrões de Código

### Controllers
- Cada controller tem funções separadas para diferentes ações (list, get, create, update, delete)
- Usam async/await com try/catch
- Tratamento de erros com `next(error)`

### Validators
- Usam `express-validator` com `body()` para validação
- Middleware `verificarErros` processa erros de validação

### DTOs
- Formatam dados antes de enviar ao cliente
- Mascaram campos sensíveis (ex: senhas)

### Services
- Contêm lógica de negócio
- Chamam repositórios para acesso a dados

### Repositories
- Encapsulam operações de MongoDB
- Tratam validação de ObjectId

## 🚀 Deploy

A API está pronta para ser deployada em serviços como:

- **Render** (gratuito)
- **Heroku** (pago)
- **Railway** (pago)
- **DigitalOcean** (pago)

Use a variável `RENDER_EXTERNAL_URL` ou similar conforme o serviço.

## 📝 Notas Importantes

- Senhas são sempre hasheadas com bcrypt antes de armazenar
- JWT tokens têm duração configurável no `authMiddleware.js`
- Chaves são consumidas ao abrir uma caixa
- Skins sorteadas são adicionadas ao inventário do usuário
- Todas as alterações requerem autenticação admin, exceto listagens públicas

## 👨‍💻 Desenvolvimento

Dúvidas ou bugs? Verifique:

1. As variáveis de ambiente estão corretas?
2. MongoDB Atlas está acessível?
3. Verifique os logs do servidor (stderr)
4. Teste as rotas no Swagger: `/api-docs`

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
