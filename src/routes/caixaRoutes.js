import { Router } from 'express';
import {
  listarCaixas,
  buscarCaixaPorId,
  criarCaixa,
  atualizarCaixaPut,
  atualizarCaixaPatch,
  deletarCaixa,
  renderizarCaixas
} from '../controllers/caixaController.js';
import { regrasValidacaoCaixa } from '../validators/caixaValidator.js';

const router = Router();

router.get('/', listarCaixas);
router.get('/view', renderizarCaixas);
router.get('/:id', buscarCaixaPorId);
router.post('/', regrasValidacaoCaixa, criarCaixa);
router.put('/:id', regrasValidacaoCaixa, atualizarCaixaPut);
router.patch('/:id', atualizarCaixaPatch);
router.delete('/:id', deletarCaixa);

export default router;
