import { Router } from 'express';
import { renderizarPerfil } from '../controllers/perfilController.js';

const router = Router();

/**
 * @swagger
 * /perfil:
 *   get:
 *     summary: Renderizar página do perfil (Pug)
 *     tags: [Perfil]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Página do perfil renderizada
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/', renderizarPerfil);

export default router;