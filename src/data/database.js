import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error('MONGO_URI não está definido no arquivo .env');
}

let client;

export async function connectDB() {
  try {
    client = new MongoClient(MONGO_URI);
    await client.connect();
    console.log('✅ Conectado ao MongoDB Atlas');
    return client;
  } catch (error) {
    console.error('❌ Erro ao conectar ao MongoDB:', error);
    process.exit(1);
  }
}

export function getClient() {
  if (!client) {
    throw new Error('MongoDB não está conectado. Chame connectDB() antes.');
  }
  return client;
}

export async function disconnectDB() {
  if (client) {
    await client.close();
    console.log('Desconectado do MongoDB');
  }
}

export default { connectDB, getClient, disconnectDB };