import app from './app.js';

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor de Inventário CS2 rodando em http://localhost:${PORT}`);
  console.log(`📦 Página de Caixas em http://localhost:${PORT}/caixas/view`);
  console.log(`🎮 Página de Skins em http://localhost:${PORT}/skins/view`);
  console.log(`👤 Perfil do Jogador em http://localhost:${PORT}/perfil`);
});