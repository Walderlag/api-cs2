import * as inventoryService from '../services/inventoryService.js';
import { toCaixaDTO } from '../dtos/caixaDTO.js';
import { toSkinDTO } from '../dtos/skinDTO.js';

export const listarCaixas = async (req, res, next) => {
  try {
    const caixas = await inventoryService.getCaixas();
    res.status(200).json((caixas ?? []).map(toCaixaDTO));
  } catch (error) { next(error); }
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
  } catch (error) { next(error); }
};

export const buscarCaixaPorId = async (req, res, next) => {
  try {
    const caixa = await inventoryService.getCaixa(req.params.id);
    if (!caixa) return res.status(404).json({ mensagem: 'Caixa não encontrada' });
    res.status(200).json(toCaixaDTO(caixa));
  } catch (error) { next(error); }
};

export const criarCaixa = async (req, res, next) => {
  try {
    const { nome, colecao } = req.body;
    const novaCaixa = await inventoryService.addCaixa({ nome, colecao });
    res.status(201).json(toCaixaDTO(novaCaixa));
  } catch (error) { next(error); }
};

export const atualizarCaixaPut = async (req, res, next) => {
  try {
    const caixaAtualizada = await inventoryService.updateCaixa(req.params.id, req.body);
    if (!caixaAtualizada) return res.status(404).json({ mensagem: 'Caixa não encontrada' });
    res.status(200).json(toCaixaDTO(caixaAtualizada));
  } catch (error) { next(error); }
};

export const atualizarCaixaPatch = async (req, res, next) => {
  try {
    const caixaAtualizada = await inventoryService.patchCaixa(req.params.id, req.body);
    if (!caixaAtualizada) return res.status(404).json({ mensagem: 'Caixa não encontrada' });
    res.status(200).json(toCaixaDTO(caixaAtualizada));
  } catch (error) { next(error); }
};

export const deletarCaixa = async (req, res, next) => {
  try {
    const removido = await inventoryService.deleteCaixa(req.params.id);
    if (!removido) return res.status(404).json({ mensagem: 'Caixa não encontrada' });
    res.status(204).send();
  } catch (error) { next(error); }
};

export const abrirCaixa = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const caixa = await inventoryService.getCaixa(id);
    if (!caixa) return res.status(404).json({ mensagem: 'Caixa não encontrada' });

    const skinSorteada = await inventoryService.abrirCaixa(id, userId);

    res.status(200).json({
      mensagem: 'Caixa aberta com sucesso!',
      skin: toSkinDTO(skinSorteada)
    });
  } catch (error) {
    if (error.message === 'Sem chaves disponíveis') {
      return res.status(400).json({ mensagem: error.message });
    }
    next(error);
  }
};
