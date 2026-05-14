import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node'; 

const defaultData = { 
  perfil: { nome: "Jogador_01", patente: "Global Elite", saldo: 250.00 },
  caixas: [], 
  skins: [], 
  chaves: [] // Adicionamos as chaves aqui
};
const adapter = new JSONFile('db.json');
const db = new Low(adapter, defaultData);

await db.read();

db.data = db.data ?? defaultData;
db.data.perfil ||= { nome: 'Jogador_01', patente: 'Global Elite', saldo: 250.0 };
db.data.caixas ||= [];
db.data.skins ||= [];
db.data.chaves ||= [];
await db.write();

export default db;