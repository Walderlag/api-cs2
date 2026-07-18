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
export const countCaixas = async () => (await getCaixas()).length;
export const countSkins = async () => (await getSkins()).length;
export const countChaves = async () => (await getChaves()).length;
export const writeChanges = async () => repo.write();

export const getInventario = async (userId) => repo.getInventarioByUser(userId);

const PROBABILIDADES = {
  'mil-spec': 0.7992,
  'restricted': 0.1598,
  'classified': 0.0320,
  'covert': 0.0064,
  'rare special': 0.0026,
};

function sortearSkin(skins) {
  const roll = Math.random();
  let acumulado = 0;

  const raridadesOrdenadas = ['mil-spec', 'restricted', 'classified', 'covert', 'rare special'];

  for (const raridade of raridadesOrdenadas) {
    acumulado += PROBABILIDADES[raridade];
    const skinsDaRaridade = skins.filter(s =>
      s.raridade?.toLowerCase() === raridade
    );
    if (roll <= acumulado && skinsDaRaridade.length > 0) {
      return skinsDaRaridade[Math.floor(Math.random() * skinsDaRaridade.length)];
    }
  }

  return skins[Math.floor(Math.random() * skins.length)];
}

export const abrirCaixa = async (caixaId, userId) => {
  const caixa = await repo.getCaixaById(caixaId);
  if (!caixa) {
    throw new Error('Caixa não encontrada');
  }

  const skins = await getSkins();
  const skinsDaCaixa = skins.filter(s => s.caixa_id?.toString() === caixaId);

  if (skinsDaCaixa.length === 0) {
    throw new Error('Nenhuma skin encontrada nesta caixa');
  }

  // Consome uma chave específica da caixa
  const chaveConsumida = await repo.consumirChave(caixa.chave_id);
  if (!chaveConsumida) {
    throw new Error('Sem chaves disponíveis para esta caixa');
  }

  // Sorteia com probabilidade
  const skinSorteada = sortearSkin(skinsDaCaixa);

  // Adiciona ao inventário do jogador
  await repo.addAoInventario(userId, skinSorteada);

  return skinSorteada;
};
