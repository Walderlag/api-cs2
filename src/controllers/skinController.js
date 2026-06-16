import * as inventoryService from '../services/inventoryService.js';
import { toSkinDTO } from '../dtos/skinDTO.js';

export const listarSkins = async (req, res, next) => {
  try {
    const skins = await inventoryService.getSkins();
    res.status(200).json((skins ?? []).map(toSkinDTO));
  } catch (error) {
    next(error);
  }
};

export const listarMinhasSkins = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const minhasSkins = await inventoryService.getInventario(userId);
    res.status(200).json(minhasSkins ?? []);
  } catch (error) {
    next(error);
  }
};

export const buscarSkinPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skin = await inventoryService.getSkin(id);

    if (!skin) {
      return res.status(404).json({ mensagem: 'Skin não encontrada' });
    }

    res.status(200).json(toSkinDTO(skin));
  } catch (error) {
    next(error);
  }
};

export const renderizarSkins = async (req, res, next) => {
  try {
    const skins = await inventoryService.getSkins();
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
    res.status(201).json(toSkinDTO(novaSkin));
  } catch (error) {
    next(error);
  }
};

export const atualizarSkinPut = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skinAtualizada = await inventoryService.updateSkin(id, req.body);

    if (!skinAtualizada) {
      return res.status(404).json({ mensagem: 'Skin não encontrada' });
    }

    res.status(200).json(toSkinDTO(skinAtualizada));
  } catch (error) {
    next(error);
  }
};

export const atualizarSkinPatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skinAtualizada = await inventoryService.patchSkin(id, req.body);

    if (!skinAtualizada) {
      return res.status(404).json({ mensagem: 'Skin não encontrada' });
    }

    res.status(200).json(toSkinDTO(skinAtualizada));
  } catch (error) {
    next(error);
  }
};

export const deletarSkin = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removido = await inventoryService.deleteSkin(id);

    if (!removido) {
      return res.status(404).json({ mensagem: 'Skin não encontrada' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
