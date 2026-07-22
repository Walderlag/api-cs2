import express from 'express';
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
app.use(express.json());

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
  res.json({ 
    mensagem: "API CS2 Inventory está rodando com sucesso!",
    documentacao: "/api-docs",
    paginas: ["/perfil", "/caixas/view", "/skins/view"]
  });
});

// 404 - Deve ficar por último
app.use((req, res) => {
  res.status(404).json({ mensagem: "A rota solicitada não existe." });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensagem: "Erro interno no servidor." });
});

export default app;