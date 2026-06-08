import { connectDB } from './src/data/database.js';
import { getDb } from './src/data/db.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

async function seedAdmin() {
  try {
    console.log('🌱 Iniciando seed de dados...');
    
    await connectDB();
    const db = getDb();
    
    // Verificar se admin já existe
    const adminExistente = await db.collection('users').findOne({ role: 'admin' });
    
    if (adminExistente) {
      console.log('⚠️  Admin já existe no banco de dados');
      process.exit(0);
    }
    
    // Criar hash da senha
    const senhaHash = await bcrypt.hash('admin123', 10);
    
    // Inserir admin
    const result = await db.collection('users').insertOne({
      email: 'admin@cs2.com',
      senha: senhaHash,
      role: 'admin',
      criadoEm: new Date()
    });
    
    console.log('✅ Admin criado com sucesso!');
    console.log('');
    console.log('📧 Email: admin@cs2.com');
    console.log('🔑 Senha: admin123');
    console.log('');
    console.log('Use essas credenciais para fazer login em POST /auth/login');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao criar admin:', error);
    process.exit(1);
  }
}

seedAdmin();
