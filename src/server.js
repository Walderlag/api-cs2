import app from './app.js';
import { connectDB } from './data/database.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.RENDER_EXTERNAL_URL || `http://localhost:${PORT}`;

async function startServer() {
  try {
    // Conectar ao MongoDB antes de iniciar o servidor
    await connectDB();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor de Inventário CS2 rodando em ${BASE_URL}`);
      console.log(`Documentação API: ${BASE_URL}/api-docs`);
      console.log(`Página de Caixas em ${BASE_URL}/caixas/view`);
      console.log(`Página de Skins em ${BASE_URL}/skins/view`);
      console.log(`Perfil do Jogador em ${BASE_URL}/perfil`);
      console.log(`Login em POST ${BASE_URL}/auth/login`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();