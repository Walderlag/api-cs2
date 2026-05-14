import * as repo from '../repositories/inventoryRepository.js';

export const getPerfil = () => repo.getPerfil();

export const getCaixas = () => repo.getAllCaixas();

export const getCaixa = (id) => repo.getCaixaById(id);

export const addCaixa = async (payload) => repo.addCaixa(payload);

export const updateCaixa = async (id, payload) => repo.updateCaixa(id, payload);

export const patchCaixa = async (id, payload) => repo.patchCaixa(id, payload);

export const deleteCaixa = async (id) => repo.deleteCaixa(id);

export const getSkins = () => repo.getAllSkins();

export const getSkin = (id) => repo.getSkinById(id);

export const addSkin = async (payload) => repo.addSkin(payload);

export const updateSkin = async (id, payload) => repo.updateSkin(id, payload);

export const patchSkin = async (id, payload) => repo.patchSkin(id, payload);

export const deleteSkin = async (id) => repo.deleteSkin(id);

export const getChaves = () => repo.getAllChaves();

export const countCaixas = () => getCaixas().length;

export const countSkins = () => getSkins().length;

export const countChaves = () => getChaves().length;

export const writeChanges = async () => repo.write();
