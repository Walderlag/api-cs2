import * as repo from '../repositories/inventoryRepository.js';

export const getPerfil = async () => repo.getPerfil();

export const getCaixas = async () => repo.getAllCaixas();

export const getCaixa = async (id) => repo.getCaixaById(id);

export const addCaixa = async (payload) => repo.addCaixa(payload);

export const updateCaixa = async (id, payload) => repo.updateCaixa(id, payload);

export const patchCaixa = async (id, payload) => repo.patchCaixa(id, payload);

export const deleteCaixa = async (id) => repo.deleteCaixa(id);

export const getSkins = async () => repo.getAllSkins();

export const getSkin = async (id) => repo.getSkinById(id);

export const addSkin = async (payload) => repo.addSkin(payload);

export const updateSkin = async (id, payload) => repo.updateSkin(id, payload);

export const patchSkin = async (id, payload) => repo.patchSkin(id, payload);

export const deleteSkin = async (id) => repo.deleteSkin(id);

export const getChaves = async () => repo.getAllChaves();

export const countCaixas = async () => {
  const caixas = await getCaixas();
  return caixas.length;
};

export const countSkins = async () => {
  const skins = await getSkins();
  return skins.length;
};

export const countChaves = async () => {
  const chaves = await getChaves();
  return chaves.length;
};

export const writeChanges = async () => repo.write();

export const abrirCaixa = async (caixaId) => {
  const skins = await getSkins();
  const skinsDaCaixa = skins.filter(s => s.caixa_id?.toString() === caixaId);

  if (skinsDaCaixa.length === 0) {
    throw new Error('Nenhuma skin encontrada nesta caixa');
  }

  const skinSorteada = skinsDaCaixa[Math.floor(Math.random() * skinsDaCaixa.length)];
  return skinSorteada;
};
