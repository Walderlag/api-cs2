import app from './app.js';
import { connectDB } from './data/database.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const EXTERNAL_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

if (!process.env.JWT_SECRET) {
  console.error('JWT_SECRET não está definido no arquivo .env');
  process.exit(1);
}

async function startServer() {
  try {
    // Conectar ao MongoDB antes de iniciar o servidor
    await connectDB();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor de Inventário CS2 rodando em ${EXTERNAL_URL}`);
      console.log(`Documentação API: ${EXTERNAL_URL}/api-docs`);
      console.log(`Página de Caixas em ${EXTERNAL_URL}/caixas/view`);
      console.log(`Página de Skins em ${EXTERNAL_URL}/skins/view`);
      console.log(`Perfil do Jogador em ${EXTERNAL_URL}/perfil`);
      console.log(`Login em POST ${EXTERNAL_URL}/auth/login`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();