import * as inventoryService from '../services/inventoryService.js';
import { toCaixaDTO } from '../dtos/caixaDTO.js';
import { toSkinDTO } from '../dtos/skinDTO.js';
import { pickAllowedFields } from '../utils/pickAllowedFields.js';

const CAIXA_CAMPOS_PERMITIDOS = ['nome', 'colecao', 'chave_id'];

export const listarCaixas = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const caixas = await inventoryService.getCaixas({ page, limit });
    res.status(200).json({ status: 200, data: (caixas ?? []).map(toCaixaDTO) });
  } catch (error) { next(error); }
};

export const renderizarCaixas = async (req, res, next) => {
  try {
    const caixas = await inventoryService.getCaixasSemPaginacao();
    const chaves = await inventoryService.getChavesSemPaginacao();
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
    if (!caixa) return res.status(404).json({ status: 404, message: 'Caixa não encontrada' });
    res.status(200).json({ status: 200, data: toCaixaDTO(caixa) });
  } catch (error) { next(error); }
};

export const criarCaixa = async (req, res, next) => {
  try {
    const { nome, colecao, chave_id } = req.body;
    const novaCaixa = await inventoryService.addCaixa({ nome, colecao, chave_id });
    res.status(201).json({ status: 201, data: toCaixaDTO(novaCaixa) });
  } catch (error) { next(error); }
};

export const atualizarCaixaPut = async (req, res, next) => {
  try {
    const caixaAtualizada = await inventoryService.updateCaixa(req.params.id, req.body);
    if (!caixaAtualizada) return res.status(404).json({ status: 404, message: 'Caixa não encontrada' });
    res.status(200).json({ status: 200, data: toCaixaDTO(caixaAtualizada) });
  } catch (error) { next(error); }
};

export const atualizarCaixaPatch = async (req, res, next) => {
  try {
    const payload = pickAllowedFields(req.body, CAIXA_CAMPOS_PERMITIDOS);
    if (Object.keys(payload).length === 0) {
      return res.status(400).json({ status: 400, message: 'Nenhum campo válido para atualizar.' });
    }
    const caixaAtualizada = await inventoryService.patchCaixa(req.params.id, payload);
    if (!caixaAtualizada) return res.status(404).json({ status: 404, message: 'Caixa não encontrada' });
    res.status(200).json({ status: 200, data: toCaixaDTO(caixaAtualizada) });
  } catch (error) { next(error); }
};

export const deletarCaixa = async (req, res, next) => {
  try {
    const removido = await inventoryService.deleteCaixa(req.params.id);
    if (!removido) return res.status(404).json({ status: 404, message: 'Caixa não encontrada' });
    res.status(204).send();
  } catch (error) { next(error); }
};

export const abrirCaixa = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const caixa = await inventoryService.getCaixa(id);
    if (!caixa) return res.status(404).json({ status: 404, message: 'Caixa não encontrada' });

    const skinSorteada = await inventoryService.abrirCaixa(id, userId);

    res.status(200).json({ status: 200, data: { message: 'Caixa aberta com sucesso!', skin: toSkinDTO(skinSorteada) } });
  } catch (error) {
    if (error.message === 'Sem chaves disponíveis') {
      return res.status(400).json({ status: 400, message: error.message });
    }
    next(error);
  }
};
