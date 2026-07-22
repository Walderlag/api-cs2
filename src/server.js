import app from './app.js';
import { connectDB } from './data/database.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.RENDER_EXTERNAL_URL || 'https://api-cs2.onrender.com';

async function startServer() {
  try {
    // Conectar ao MongoDB antes de iniciar o servidor
    await connectDB();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor de Inventário CS2 rodando em https://api-cs2.onrender.com`);
      console.log(`Documentação API: https://api-cs2.onrender.com/api-docs`);
      console.log(`Página de Caixas em https://api-cs2.onrender.com/caixas/view`);
      console.log(`Página de Skins em https://api-cs2.onrender.com/skins/view`);
      console.log(`Perfil do Jogador em https://api-cs2.onrender.com/perfil`);
      console.log(`Login em POST https://api-cs2.onrender.com/auth/login`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();