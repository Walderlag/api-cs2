import db from '../data/database.js';

const ensureData = () => {
  db.data = db.data ?? {};
  db.data.perfil ||= { nome: 'Jogador_01', patente: 'Global Elite', saldo: 250.0 };
  db.data.caixas ||= [];
  db.data.skins ||= [];
  db.data.chaves ||= [];
};

export const getPerfil = () => {
  ensureData();
  return db.data.perfil;
};

export const getAllCaixas = () => {
  ensureData();
  return db.data.caixas;
};

export const getCaixaById = (id) => {
  ensureData();
  return db.data.caixas.find((caixa) => caixa.id === Number(id));
};

export const addCaixa = async ({ nome, colecao }) => {
  ensureData();
  const novoId = db.data.caixas.length > 0 ? Math.max(...db.data.caixas.map((c) => c.id)) + 1 : 1;
  const novaCaixa = { id: novoId, nome, colecao };
  db.data.caixas.push(novaCaixa);
  await db.write();
  return novaCaixa;
};

export const updateCaixa = async (id, payload) => {
  ensureData();
  const index = db.data.caixas.findIndex((c) => c.id === Number(id));
  if (index === -1) return null;
  db.data.caixas[index] = { id: Number(id), ...payload };
  await db.write();
  return db.data.caixas[index];
};

export const patchCaixa = async (id, payload) => {
  ensureData();
  const caixa = db.data.caixas.find((c) => c.id === Number(id));
  if (!caixa) return null;
  if (payload.nome !== undefined) caixa.nome = payload.nome;
  if (payload.colecao !== undefined) caixa.colecao = payload.colecao;
  await db.write();
  return caixa;
};

export const deleteCaixa = async (id) => {
  ensureData();
  const index = db.data.caixas.findIndex((c) => c.id === Number(id));
  if (index === -1) return false;
  db.data.caixas.splice(index, 1);
  db.data.skins = db.data.skins.filter((skin) => skin.caixa_id !== Number(id));
  await db.write();
  return true;
};

export const getAllSkins = () => {
  ensureData();
  return db.data.skins;
};

export const getSkinById = (id) => {
  ensureData();
  return db.data.skins.find((skin) => skin.id === Number(id));
};

export const addSkin = async ({ arma, nome_skin, raridade, caixa_id }) => {
  ensureData();
  const novoId = db.data.skins.length > 0 ? Math.max(...db.data.skins.map((s) => s.id)) + 1 : 1;
  const novaSkin = { id: novoId, arma, nome_skin, raridade, caixa_id: Number(caixa_id) };
  db.data.skins.push(novaSkin);
  await db.write();
  return novaSkin;
};

export const updateSkin = async (id, payload) => {
  ensureData();
  const index = db.data.skins.findIndex((s) => s.id === Number(id));
  if (index === -1) return null;
  db.data.skins[index] = { id: Number(id), ...payload, caixa_id: Number(payload.caixa_id) };
  await db.write();
  return db.data.skins[index];
};

export const patchSkin = async (id, payload) => {
  ensureData();
  const skin = db.data.skins.find((s) => s.id === Number(id));
  if (!skin) return null;
  if (payload.arma !== undefined) skin.arma = payload.arma;
  if (payload.nome_skin !== undefined) skin.nome_skin = payload.nome_skin;
  if (payload.raridade !== undefined) skin.raridade = payload.raridade;
  if (payload.caixa_id !== undefined) skin.caixa_id = Number(payload.caixa_id);
  await db.write();
  return skin;
};

export const deleteSkin = async (id) => {
  ensureData();
  const index = db.data.skins.findIndex((s) => s.id === Number(id));
  if (index === -1) return false;
  db.data.skins.splice(index, 1);
  await db.write();
  return true;
};

export const getAllChaves = () => {
  ensureData();
  return db.data.chaves;
};

export const write = async () => {
  ensureData();
  await db.write();
};
