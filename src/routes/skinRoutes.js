import { Router } from 'express';
import {
  listarSkins,
  listarMinhasSkins,
  buscarSkinPorId,
  criarSkin,
  atualizarSkinPut,
  atualizarSkinPatch,
  deletarSkin,
  renderizarSkins
} from '../controllers/skinController.js';
import { regrasValidacaoSkin } from '../validators/skinValidator.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/permissionMiddleware.js';

const router = Router();

/**
 * @swagger
 * /skins:
 *   get:
 *     summary: Listar todas as skins
 *     tags: [Skins]
 *     responses:
 *       200:
 *         description: Lista de skins
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skin'
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/', listarSkins);

/**
 * @swagger
 * /skins/minhas:
 *   get:
 *     summary: Listar minhas skins (usuário logado)
 *     tags: [Skins]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de skins do usuário
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Skin'
 *       401:
 *         description: Token inválido
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/minhas', authMiddleware, authorize('user', 'admin'), listarMinhasSkins);

/**
 * @swagger
 * /skins/view:
 *   get:
 *     summary: Renderizar página HTML de skins (Pug)
 *     tags: [Skins]
 *     responses:
 *       200:
 *         description: Página HTML renderizada
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/view', renderizarSkins);

/**
 * @swagger
 * /skins/{id}:
 *   get:
 *     summary: Obter skin por ID
 *     tags: [Skins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da skin (ObjectId do MongoDB)
 *     responses:
 *       200:
 *         description: Skin encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skin'
 *       404:
 *         description: Skin não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/:id', buscarSkinPorId);

/**
 * @swagger
 * /skins:
 *   post:
 *     summary: Criar nova skin (requer role admin)
 *     tags: [Skins]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [arma, nome_skin, raridade, caixa_id]
 *             properties:
 *               arma:
 *                 type: string
 *                 example: AK-47
 *               nome_skin:
 *                 type: string
 *                 example: Phantom Disruptor
 *               raridade:
 *                 type: string
 *                 example: Extraordinária
 *               caixa_id:
 *                 type: string
 *                 example: 507f1f77bcf86cd799439011
 *     responses:
 *       201:
 *         description: Skin criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skin'
 *       400:
 *         description: Validação falhou
 *       401:
 *         description: Token inválido
 *       403:
 *         description: Acesso negado
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/', authMiddleware, authorize('admin'), regrasValidacaoSkin, criarSkin);

/**
 * @swagger
 * /skins/{id}:
 *   put:
 *     summary: Atualizar skin completamente (requer role admin)
 *     tags: [Skins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [arma, nome_skin, raridade, caixa_id]
 *             properties:
 *               arma:
 *                 type: string
 *               nome_skin:
 *                 type: string
 *               raridade:
 *                 type: string
 *               caixa_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Skin atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skin'
 *       400:
 *         description: Validação falhou
 *       401:
 *         description: Token inválido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Skin não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
router.put('/:id', authMiddleware, authorize('admin'), regrasValidacaoSkin, atualizarSkinPut);

/**
 * @swagger
 * /skins/{id}:
 *   patch:
 *     summary: Atualizar parcialmente skin (requer role admin)
 *     tags: [Skins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               arma:
 *                 type: string
 *               nome_skin:
 *                 type: string
 *               raridade:
 *                 type: string
 *               caixa_id:
 *                 type: string
 *     responses:
 *       200:
 *         description: Skin atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Skin'
 *       401:
 *         description: Token inválido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Skin não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
router.patch('/:id', authMiddleware, authorize('admin'), atualizarSkinPatch);

/**
 * @swagger
 * /skins/{id}:
 *   delete:
 *     summary: Deletar skin (requer role admin)
 *     tags: [Skins]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Skin deletada com sucesso
 *       401:
 *         description: Token inválido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Skin não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
router.delete('/:id', authMiddleware, authorize('admin'), deletarSkin);

export default router;
