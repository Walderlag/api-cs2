import { Router } from 'express';
import { renderizarPerfil } from '../controllers/perfilController.js';

const router = Router();

router.get('/', renderizarPerfil);

export default router;