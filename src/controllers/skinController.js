import * as inventoryService from '../services/inventoryService.js';

export const listarSkins = async (req, res, next) => {
  try {
    res.status(200).json(inventoryService.getSkins() ?? []);
  } catch (error) {
    next(error);
  }
};

export const buscarSkinPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const skin = inventoryService.getSkin(id);

    if (!skin) {
      return res.status(404).json({ mensagem: 'Skin não encontrada' });
    }

    res.status(200).json(skin);
  } catch (error) {
    next(error);
  }
};

export const renderizarSkins = async (req, res, next) => {
  try {
    res.render('skins', {
      titulo: 'Coleção Sonhos e Pesadelos',
      skins: inventoryService.getSkins() ?? []
    });
  } catch (error) {
    next(error);
  }
};

export const criarSkin = async (req, res, next) => {
  try {
    const { arma, nome_skin, raridade, caixa_id } = req.body;
    const novaSkin = await inventoryService.addSkin({ arma, nome_skin, raridade, caixa_id });
    res.status(201).json(novaSkin);
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

    res.status(200).json(skinAtualizada);
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

    res.status(200).json(skinAtualizada);
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
