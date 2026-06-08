import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger.js';
import caixaRoutes from './routes/caixaRoutes.js';
import skinRoutes from './routes/skinRoutes.js';
import perfilRoutes from './routes/perfilRoutes.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// 1. Middlewares básicos
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// 2. Configuração do Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 3. Swagger/OpenAPI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// 4. Rotas de autenticação
app.use('/auth', authRoutes);

// 5. Rotas de usuários
app.use('/users', userRoutes);

// 6. Rotas principais 
app.use('/caixas', caixaRoutes);
app.use('/skins', skinRoutes);
app.use('/perfil', perfilRoutes);

// 7. Rota de fallback (404)
app.use((req, res) => {
  res.status(404).json({ mensagem: "A rota solicitada não existe." });
});

// 8. Global error handler 
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensagem: "Erro interno no servidor." });
});

export default app;