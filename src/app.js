import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import swaggerUi from 'swagger-ui-express';
import { specs } from './swagger.js';

import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import caixaRoutes from './routes/caixaRoutes.js';
import skinRoutes from './routes/skinRoutes.js';
import perfilRoutes from './routes/perfilRoutes.js';
import chaveRoutes from './routes/chaveRoutes.js';




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('trust proxy', 1);
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 429,
    message: 'Muitas requisições. Tente novamente mais tarde.'
  }
});

app.use(globalLimiter);

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Rotas principais
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/caixas', caixaRoutes);
app.use('/skins', skinRoutes);
app.use('/perfil', perfilRoutes);
app.use('/chaves', chaveRoutes);

// Rota raiz (boas-vindas)
app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    data: {
      mensagem: 'API CS2 Inventory está rodando com sucesso!',
      documentacao: '/api-docs',
      paginas: ['/perfil', '/caixas/view', '/skins/view']
    }
  });
});

// 404 - Deve ficar por último
app.use((req, res) => {
  res.status(404).json({ status: 404, message: 'A rota solicitada não existe.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || err.statusCode || 500;
  const message = err.message || 'Erro interno no servidor.';
  res.status(status).json({ status, message });
});

export default app;