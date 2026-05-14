import * as inventoryService from '../services/inventoryService.js';

export const listarCaixas = async (req, res, next) => {
  try {
    res.status(200).json(inventoryService.getCaixas() ?? []);
  } catch (error) {
    next(error);
  }
};

export const renderizarCaixas = async (req, res, next) => {
  try {
    res.render('caixas', {
      titulo: 'Caixas e Chaves Disponíveis',
      caixas: inventoryService.getCaixas() ?? [],
      chaves: inventoryService.getChaves() ?? []
    });
  } catch (error) {
    next(error);
  }
};

export const buscarCaixaPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const caixa = inventoryService.getCaixa(id);

    if (!caixa) {
      return res.status(404).json({ mensagem: 'Caixa não encontrada' });
    }

    res.status(200).json(caixa);
  } catch (error) {
    next(error);
  }
};

export const criarCaixa = async (req, res, next) => {
  try {
    const { nome, colecao } = req.body;
    const novaCaixa = await inventoryService.addCaixa({ nome, colecao });
    res.status(201).json(novaCaixa);
  } catch (error) {
    next(error);
  }
};

export const atualizarCaixaPut = async (req, res, next) => {
  try {
    const { id } = req.params;
    const caixaAtualizada = await inventoryService.updateCaixa(id, req.body);

    if (!caixaAtualizada) {
      return res.status(404).json({ mensagem: 'Caixa não encontrada' });
    }

    res.status(200).json(caixaAtualizada);
  } catch (error) {
    next(error);
  }
};

export const atualizarCaixaPatch = async (req, res, next) => {
  try {
    const { id } = req.params;
    const caixaAtualizada = await inventoryService.patchCaixa(id, req.body);

    if (!caixaAtualizada) {
      return res.status(404).json({ mensagem: 'Caixa não encontrada' });
    }

    res.status(200).json(caixaAtualizada);
  } catch (error) {
    next(error);
  }
};

export const deletarCaixa = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removido = await inventoryService.deleteCaixa(id);

    if (!removido) {
      return res.status(404).json({ mensagem: 'Caixa não encontrada' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
