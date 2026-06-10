import app from './app.js';
import { connectDB } from './data/database.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // Conectar ao MongoDB antes de iniciar o servidor
    await connectDB();
    
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Servidor de Inventário CS2 rodando em http://localhost:${PORT}`);
      console.log(`📚 Documentação API: http://localhost:${PORT}/api-docs`);
      console.log(`📦 Página de Caixas em http://localhost:${PORT}/caixas/view`);
      console.log(`🎮 Página de Skins em http://localhost:${PORT}/skins/view`);
      console.log(`👤 Perfil do Jogador em http://localhost:${PORT}/perfil`);
      console.log(`🔑 Login em POST http://localhost:${PORT}/auth/login`);
    });
  } catch (error) {
    console.error('❌ Erro ao iniciar o servidor:', error);
    process.exit(1);
  }
}

startServer();