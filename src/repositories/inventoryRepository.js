import { ObjectId } from 'mongodb';
import { getDb } from '../data/db.js';
import { CaixaModel } from '../models/Caixa.js';
import { SkinModel } from '../models/Skin.js';

// ========== PERFIL ==========
export const getPerfil = async () => {
  const db = getDb();
  let perfil = await db.collection('perfis').findOne({ nome: 'Jogador_01' });

  if (!perfil) {
    perfil = {
      nome: 'Jogador_01',
      patente: 'Global Elite',
      saldo: 250.0
    };
    await db.collection('perfis').insertOne(perfil);
  }
  return perfil;
};

// ========== CAIXAS ==========
export const getAllCaixas = async () => {
  const db = getDb();
  return await db.collection('caixas').find({}).toArray();
};

export const getCaixaById = async (id) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  return await db.collection('caixas').findOne({ _id: new ObjectId(id) });
};

export const addCaixa = async ({ nome, colecao }) => {
  const db = getDb();
  const doc = CaixaModel({ nome, colecao });
  const result = await db.collection('caixas').insertOne(doc);
  return { _id: result.insertedId, nome, colecao };
};

export const updateCaixa = async (id, payload) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  const result = await db.collection('caixas').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: payload },
    { returnDocument: 'after' }
  );
  return result;
};

export const patchCaixa = async (id, payload) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  const result = await db.collection('caixas').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: payload },
    { returnDocument: 'after' }
  );
  return result;
};

export const deleteCaixa = async (id) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return false;
  
  // Deletar skins associadas
  await db.collection('skins').deleteMany({ caixa_id: new ObjectId(id) });
  
  // Deletar caixa
  const result = await db.collection('caixas').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

// ========== SKINS ==========
export const getAllSkins = async () => {
  const db = getDb();
  return await db.collection('skins').find({}).toArray();
};

export const getSkinById = async (id) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  return await db.collection('skins').findOne({ _id: new ObjectId(id) });
};

export const addSkin = async ({ arma, nome_skin, raridade, caixa_id }) => {
  const db = getDb();
  if (!ObjectId.isValid(caixa_id)) throw new Error('caixa_id inválido');

  const doc = SkinModel({ arma, nome_skin, raridade, caixa_id });
  const result = await db.collection('skins').insertOne(doc);

  return {
    _id: result.insertedId,
    arma,
    nome_skin,
    raridade,
    caixa_id: new ObjectId(caixa_id)
  };
};

export const updateSkin = async (id, payload) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  
  const updateData = { ...payload };
  if (updateData.caixa_id && ObjectId.isValid(updateData.caixa_id)) {
    updateData.caixa_id = new ObjectId(updateData.caixa_id);
  }
  
  const result = await db.collection('skins').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateData },
    { returnDocument: 'after' }
  );
  return result;
};

export const patchSkin = async (id, payload) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  
  const updateData = { ...payload };
  if (updateData.caixa_id && ObjectId.isValid(updateData.caixa_id)) {
    updateData.caixa_id = new ObjectId(updateData.caixa_id);
  }
  
  const result = await db.collection('skins').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: updateData },
    { returnDocument: 'after' }
  );
  return result;
};

export const deleteSkin = async (id) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return false;
  
  const result = await db.collection('skins').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

// ========== CHAVES ==========
export const getAllChaves = async () => {
  const db = getDb();
  return await db.collection('chaves').find({}).toArray();
};

export const write = async () => {
  // Com MongoDB, não é necessário fazer write manualmente
  // Os dados são persistidos imediatamente
};
