import * as inventoryService from '../services/inventoryService.js';
import { toSkinDTO } from '../dtos/skinDTO.js';
import { pickAllowedFields } from '../utils/pickAllowedFields.js';

const SKIN_CAMPOS_PERMITIDOS = ['arma', 'nome_skin', 'raridade', 'caixa_id'];

export const listarSkins = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const skins = await inventoryService.getSkins({ page, limit });
    res.status(200).json({ status: 200, data: (skins ?? []).map(toSkinDTO) });
  } catch (error) {
    next(error);
  }
};

export const listarMinhasSkins = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const minhasSkins = await inventoryService.getInventario(userId);
    res.status(200).json({ status: 200, data: minhasSkins ?? [] });
  } catch (error) {
    next(error);
  }
};

export const buscarSkinPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skin = await inventoryService.getSkin(id);

    if (!skin) {
      return res.status(404).json({ status: 404, message: 'Skin não encontrada' });
    }

    res.status(200).json({ status: 200, data: toSkinDTO(skin) });
  } catch (error) {
    next(error);
  }
};

export const renderizarSkins = async (req, res, next) => {
  try {
    const skins = await inventoryService.getSkinsSemPaginacao();
    res.render('skins', {
      titulo: 'Coleção Sonhos e Pesadelos',
      skins: skins ?? []
    });
  } catch (error) {
    next(error);
  }
};

export const criarSkin = async (req, res, next) => {
  try {
    const { arma, nome_skin, raridade, caixa_id } = req.body;
    const novaSkin = await inventoryService.addSkin({ arma, nome_skin, raridade, caixa_id });
    res.status(201).json({ status: 201, data: toSkinDTO(novaSkin) });
  } catch (error) {
    next(error);
  }
};

export const atualizarSkinPut = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skinAtualizada = await inventoryService.updateSkin(id, req.body);

    if (!skinAtualizada) {
      return res.status(404).json({ status: 404, message: 'Skin não encontrada' });
    }

    res.status(200).json({ status: 200, data: toSkinDTO(skinAtualizada) });
  } catch (error) {
    next(error);
  }
};

export const atualizarSkinPatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = pickAllowedFields(req.body, SKIN_CAMPOS_PERMITIDOS);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ status: 400, message: 'Nenhum campo válido para atualizar.' });
    }
    const skinAtualizada = await inventoryService.patchSkin(id, payload);

    if (!skinAtualizada) {
      return res.status(404).json({ status: 404, message: 'Skin não encontrada' });
    }

    res.status(200).json({ status: 200, data: toSkinDTO(skinAtualizada) });
  } catch (error) {
    next(error);
  }
};

export const deletarSkin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removido = await inventoryService.deleteSkin(id);

    if (!removido) {
      return res.status(404).json({ status: 404, message: 'Skin não encontrada' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
