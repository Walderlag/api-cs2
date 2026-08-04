import { ObjectId } from 'mongodb';
import { getDb } from '../data/db.js';
import { CaixaModel } from '../models/Caixa.js';
import { SkinModel } from '../models/Skin.js';

export const getPerfil = async () => {
  const db = getDb();
  let perfil = await db.collection('perfis').findOne({ nome: 'Jogador_01' });
  if (!perfil) {
    perfil = { nome: 'Jogador_01', patente: 'Global Elite', saldo: 250.0 };
    await db.collection('perfis').insertOne(perfil);
  }
  return perfil;
};

export const getAllCaixas = async ({ page = 1, limit = 20 } = {}) => {
  const db = getDb();
  const skip = (page - 1) * limit;
  return await db.collection('caixas').find({}).skip(skip).limit(limit).toArray();
};

export const getAllCaixasSemPaginacao = async () => {
  const db = getDb();
  return await db.collection('caixas').find({}).toArray();
};

export const getCaixaById = async (id) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  return await db.collection('caixas').findOne({ _id: new ObjectId(id) });
};

export const addCaixa = async ({ nome, colecao, chave_id }) => {
  const db = getDb();
  const doc = CaixaModel({ nome, colecao, chave_id });
  const result = await db.collection('caixas').insertOne(doc);
  return { _id: result.insertedId, nome, colecao, chave_id };
};

export const updateCaixa = async (id, payload) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  return await db.collection('caixas').findOneAndUpdate(
    { _id: new ObjectId(id) }, { $set: payload }, { returnDocument: 'after' }
  );
};

export const patchCaixa = async (id, payload) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  return await db.collection('caixas').findOneAndUpdate(
    { _id: new ObjectId(id) }, { $set: payload }, { returnDocument: 'after' }
  );
};

export const deleteCaixa = async (id) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return false;
  await db.collection('skins').deleteMany({ caixa_id: new ObjectId(id) });
  const result = await db.collection('caixas').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

export const getAllSkins = async ({ page = 1, limit = 20 } = {}) => {
  const db = getDb();
  const skip = (page - 1) * limit;
  return await db.collection('skins').find({}).skip(skip).limit(limit).toArray();
};

export const getAllSkinsSemPaginacao = async () => {
  const db = getDb();
  return await db.collection('skins').find({}).toArray();
};

export const getSkinsByCaixaId = async (caixaId) => {
  const db = getDb();
  if (!ObjectId.isValid(caixaId)) return [];
  return await db.collection('skins').find({ caixa_id: new ObjectId(caixaId) }).toArray();
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
  return { _id: result.insertedId, arma, nome_skin, raridade, caixa_id: new ObjectId(caixa_id) };
};

export const updateSkin = async (id, payload) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  const updateData = { ...payload };
  if (updateData.caixa_id && ObjectId.isValid(updateData.caixa_id))
    updateData.caixa_id = new ObjectId(updateData.caixa_id);
  return await db.collection('skins').findOneAndUpdate(
    { _id: new ObjectId(id) }, { $set: updateData }, { returnDocument: 'after' }
  );
};

export const patchSkin = async (id, payload) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  const updateData = { ...payload };
  if (updateData.caixa_id && ObjectId.isValid(updateData.caixa_id))
    updateData.caixa_id = new ObjectId(updateData.caixa_id);
  return await db.collection('skins').findOneAndUpdate(
    { _id: new ObjectId(id) }, { $set: updateData }, { returnDocument: 'after' }
  );
};

export const deleteSkin = async (id) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return false;
  const result = await db.collection('skins').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

export const getAllChaves = async ({ page = 1, limit = 20 } = {}) => {
  const db = getDb();
  const skip = (page - 1) * limit;
  return await db.collection('chaves').find({}).skip(skip).limit(limit).toArray();
};

export const getAllChavesSemPaginacao = async () => {
  const db = getDb();
  return await db.collection('chaves').find({}).toArray();
};

export const countCaixasDb = async () => {
  const db = getDb();
  return db.collection('caixas').countDocuments();
};

export const countSkinsDb = async () => {
  const db = getDb();
  return db.collection('skins').countDocuments();
};

export const countChavesDb = async () => {
  const db = getDb();
  return db.collection('chaves').countDocuments();
};

export const getChaveById = async (id) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  return await db.collection('chaves').findOne({ _id: new ObjectId(id) });
};

export const addChave = async ({ nome, quantidade }) => {
  const db = getDb();
  const result = await db.collection('chaves').insertOne({ nome, quantidade });
  return { _id: result.insertedId, nome, quantidade };
};

export const updateChave = async (id, payload) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  return await db.collection('chaves').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: payload },
    { returnDocument: 'after' }
  );
};

export const patchChave = async (id, payload) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return null;
  return await db.collection('chaves').findOneAndUpdate(
    { _id: new ObjectId(id) },
    { $set: payload },
    { returnDocument: 'after' }
  );
};

export const deleteChave = async (id) => {
  const db = getDb();
  if (!ObjectId.isValid(id)) return false;
  const result = await db.collection('chaves').deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
};

export const consumirChave = async (chaveId, session = null) => {
  const db = getDb();
  const chave = await db.collection('chaves').findOne(
    { _id: new ObjectId(chaveId), quantidade: { $gt: 0 } },
    { session }
  );
  if (!chave) return null;
  await db.collection('chaves').updateOne(
    { _id: chave._id },
    { $inc: { quantidade: -1 } },
    { session }
  );
  return chave;
};

export const getInventarioByUser = async (userId) => {
  const db = getDb();
  return await db.collection('inventario').find({ userId }).toArray();
};

export const addAoInventario = async (userId, skin, session = null) => {
  const db = getDb();
  await db.collection('inventario').insertOne({
    userId,
    skinId: skin._id,
    arma: skin.arma,
    nome_skin: skin.nome_skin,
    raridade: skin.raridade,
    caixa_id: skin.caixa_id,
    obtidoEm: new Date()
  }, { session });
};

export const write = async () => {};
