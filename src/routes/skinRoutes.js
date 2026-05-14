import { Router } from 'express';
import {
  listarSkins,
  buscarSkinPorId,
  criarSkin,
  atualizarSkinPut,
  atualizarSkinPatch,
  deletarSkin,
  renderizarSkins
} from '../controllers/skinController.js';
import { regrasValidacaoSkin } from '../validators/skinValidator.js';

const router = Router();

router.get('/', listarSkins);
router.get('/view', renderizarSkins);
router.get('/:id', buscarSkinPorId);
router.post('/', regrasValidacaoSkin, criarSkin);
router.put('/:id', regrasValidacaoSkin, atualizarSkinPut);
router.patch('/:id', atualizarSkinPatch);
router.delete('/:id', deletarSkin);

export default router;
