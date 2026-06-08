import * as inventoryService from '../services/inventoryService.js';
import { toCaixaDTO } from '../dtos/caixaDTO.js';

export const listarCaixas = async (req, res, next) => {
  try {
    const caixas = await inventoryService.getCaixas();
    res.status(200).json((caixas ?? []).map(toCaixaDTO));
  } catch (error) {
    next(error);
  }
};

export const renderizarCaixas = async (req, res, next) => {
  try {
    const caixas = await inventoryService.getCaixas();
    const chaves = await inventoryService.getChaves();
    res.render('caixas', {
      titulo: 'Caixas e Chaves Disponíveis',
      caixas: caixas ?? [],
      chaves: chaves ?? []
    });
  } catch (error) {
    next(error);
  }
};

export const buscarCaixaPorId = async (req, res, next) => {
  try {
    const { id } = req.params;
    const caixa = await inventoryService.getCaixa(id);

    if (!caixa) {
      return res.status(404).json({ mensagem: 'Caixa não encontrada' });
    }

    res.status(200).json(toCaixaDTO(caixa));
  } catch (error) {
    next(error);
  }
};

export const criarCaixa = async (req, res, next) => {
  try {
    const { nome, colecao } = req.body;
    const novaCaixa = await inventoryService.addCaixa({ nome, colecao });
    res.status(201).json(toCaixaDTO(novaCaixa));
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

    res.status(200).json(toCaixaDTO(caixaAtualizada));
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

    res.status(200).json(toCaixaDTO(caixaAtualizada));
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

export const abrirCaixa = async (req, res, next) => {
  try {
    const { id } = req.params;

    const caixa = await inventoryService.getCaixa(id);
    if (!caixa) {
      return res.status(404).json({ mensagem: 'Caixa não encontrada' });
    }

    const chaves = await inventoryService.getChaves();
    const totalChaves = chaves.reduce((acc, c) => acc + (c.quantidade || 0), 0);

    if (totalChaves <= 0) {
      return res.status(400).json({ mensagem: 'Sem chaves disponíveis' });
    }

    const skinSorteada = await inventoryService.abrirCaixa(id);
    res.status(200).json({
      mensagem: 'Caixa aberta com sucesso!',
      skin: toSkinDTO(skinSorteada)
    });
  } catch (error) {
    next(error);
  }
};
