import { Router } from 'express';
import { renderizarPerfil } from '../controllers/perfilController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

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
 *       401:
 *         description: Token inválido ou não fornecido
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/', authMiddleware, renderizarPerfil);

export default router;