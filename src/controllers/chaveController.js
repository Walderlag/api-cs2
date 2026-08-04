import * as inventoryService from '../services/inventoryService.js';
import { toChaveDTO } from '../dtos/chaveDTO.js';
import { pickAllowedFields } from '../utils/pickAllowedFields.js';

const CHAVE_CAMPOS_PERMITIDOS = ['nome', 'quantidade'];

export const listarChaves = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const chaves = await inventoryService.getChaves({ page, limit });
    res.status(200).json({ status: 200, data: (chaves ?? []).map(toChaveDTO) });
  } catch (error) { next(error); }
};

export const buscarChavePorId = async (req, res, next) => {
  try {
    const chave = await inventoryService.getChave(req.params.id);
    if (!chave) {
      return res.status(404).json({ status: 404, message: 'Chave não encontrada' });
    }
    res.status(200).json({ status: 200, data: toChaveDTO(chave) });
  } catch (error) { next(error); }
};

export const criarChave = async (req, res, next) => {
  try {
    const { nome, quantidade } = req.body;
    const chave = await inventoryService.addChave({ nome, quantidade });
    res.status(201).json({ status: 201, data: toChaveDTO(chave) });
  } catch (error) { next(error); }
};

export const atualizarChavePut = async (req, res, next) => {
  try {
    const chaveAtualizada = await inventoryService.updateChave(req.params.id, req.body);
    if (!chaveAtualizada) {
      return res.status(404).json({ status: 404, message: 'Chave não encontrada' });
    }
    res.status(200).json({ status: 200, data: toChaveDTO(chaveAtualizada) });
  } catch (error) { next(error); }
};

export const atualizarChavePatch = async (req, res, next) => {
  try {
    const payload = pickAllowedFields(req.body, CHAVE_CAMPOS_PERMITIDOS);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ status: 400, message: 'Nenhum campo válido para atualizar.' });
    }
    const chaveAtualizada = await inventoryService.patchChave(req.params.id, payload);
    if (!chaveAtualizada) {
      return res.status(404).json({ status: 404, message: 'Chave não encontrada' });
    }
    res.status(200).json({ status: 200, data: toChaveDTO(chaveAtualizada) });
  } catch (error) { next(error); }
};

export const deletarChave = async (req, res, next) => {
  try {
    const removido = await inventoryService.deleteChave(req.params.id);
    if (!removido) {
      return res.status(404).json({ status: 404, message: 'Chave não encontrada' });
    }
    res.status(204).send();
  } catch (error) { next(error); }
};
