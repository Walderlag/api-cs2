import { Router } from 'express';
import {
  listarChaves,
  buscarChavePorId,
  criarChave,
  atualizarChavePut,
  atualizarChavePatch,
  deletarChave
} from '../controllers/chaveController.js';
import { regrasValidacaoChave } from '../validators/chaveValidator.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/permissionMiddleware.js';

const router = Router();

/**
 * @swagger
 * /chaves:
 *   get:
 *     summary: Listar todas as chaves
 *     tags: [Chaves]
 *     responses:
 *       200:
 *         description: Lista de chaves
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Chave'
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/', listarChaves);

/**
 * @swagger
 * /chaves/{id}:
 *   get:
 *     summary: Obter chave por ID
 *     tags: [Chaves]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da chave (ObjectId do MongoDB)
 *     responses:
 *       200:
 *         description: Chave encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chave'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       404:
 *         description: Chave não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/:id', buscarChavePorId);

/**
 * @swagger
 * /chaves:
 *   post:
 *     summary: Criar nova chave (requer role admin)
 *     tags: [Chaves]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, quantidade]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Chave de Caso
 *               quantidade:
 *                 type: integer
 *                 example: 10
 *     responses:
 *       201:
 *         description: Chave criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chave'
 *       400:
 *         description: Dados inválidos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Acesso negado. Permissões insuficientes
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/', authMiddleware, authorize('admin'), regrasValidacaoChave, criarChave);

/**
 * @swagger
 * /chaves/{id}:
 *   put:
 *     summary: Atualizar chave (requer role admin)
 *     tags: [Chaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da chave (ObjectId do MongoDB)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, quantidade]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Chave de Caso Atualizada
 *               quantidade:
 *                 type: integer
 *                 example: 15
 *     responses:
 *       200:
 *         description: Chave atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chave'
 *       400:
 *         description: ID inválido ou dados incompletos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Acesso negado. Permissões insuficientes
 *       404:
 *         description: Chave não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro interno no servidor
 */
router.put('/:id', authMiddleware, authorize('admin'), regrasValidacaoChave, atualizarChavePut);

/**
 * @swagger
 * /chaves/{id}:
 *   patch:
 *     summary: Atualizar parcialmente chave (requer role admin)
 *     tags: [Chaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da chave (ObjectId do MongoDB)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Novo Nome
 *               quantidade:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: Chave atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Chave'
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Acesso negado. Permissões insuficientes
 *       404:
 *         description: Chave não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro interno no servidor
 */
router.patch('/:id', authMiddleware, authorize('admin'), atualizarChavePatch);

/**
 * @swagger
 * /chaves/{id}:
 *   delete:
 *     summary: Deletar chave (requer role admin)
 *     tags: [Chaves]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da chave (ObjectId do MongoDB)
 *     responses:
 *       204:
 *         description: Chave deletada com sucesso
 *       400:
 *         description: ID inválido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Acesso negado. Permissões insuficientes
 *       404:
 *         description: Chave não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro interno no servidor
 */
router.delete('/:id', authMiddleware, authorize('admin'), deletarChave);

export default router;
