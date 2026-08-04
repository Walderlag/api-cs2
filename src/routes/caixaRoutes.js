import { Router } from 'express';
import {
  listarCaixas,
  buscarCaixaPorId,
  criarCaixa,
  atualizarCaixaPut,
  atualizarCaixaPatch,
  deletarCaixa,
  renderizarCaixas,
  abrirCaixa
} from '../controllers/caixaController.js';
import { regrasValidacaoCaixa, regrasValidacaoCaixaPatch } from '../validators/caixaValidator.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/permissionMiddleware.js';

const router = Router();

/**
 * @swagger
 * /caixas:
 *   get:
 *     summary: Listar todas as caixas
 *     tags: [Caixas]
 *     responses:
 *       200:
 *         description: Lista de caixas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Caixa'
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/', listarCaixas);

/**
 * @swagger
 * /caixas/view:
 *   get:
 *     summary: Renderizar página HTML de caixas (Pug)
 *     tags: [Caixas]
 *     responses:
 *       200:
 *         description: Página HTML renderizada
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/view', renderizarCaixas);

/**
 * @swagger
 * /caixas/{id}:
 *   get:
 *     summary: Obter caixa por ID
 *     tags: [Caixas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da caixa (ObjectId do MongoDB)
 *     responses:
 *       200:
 *         description: Caixa encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caixa'
 *       404:
 *         description: Caixa não encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Erro'
 *       500:
 *         description: Erro interno no servidor
 */
router.get('/:id', buscarCaixaPorId);

/**
 * @swagger
 * /caixas:
 *   post:
 *     summary: Criar nova caixa (requer role admin)
 *     tags: [Caixas]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, colecao]
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Caixa de Operação
 *               colecao:
 *                 type: string
 *                 example: Recon
 *     responses:
 *       201:
 *         description: Caixa criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caixa'
 *       400:
 *         description: Validação falhou
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
router.post('/', authMiddleware, authorize('admin'), regrasValidacaoCaixa, criarCaixa);

/**
 * @swagger
 * /caixas/{id}:
 *   put:
 *     summary: Atualizar caixa completamente (requer role admin)
 *     tags: [Caixas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da caixa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nome, colecao]
 *             properties:
 *               nome:
 *                 type: string
 *               colecao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Caixa atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caixa'
 *       400:
 *         description: Validação falhou
 *       401:
 *         description: Token inválido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Caixa não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
router.put('/:id', authMiddleware, authorize('admin'), regrasValidacaoCaixa, atualizarCaixaPut);
router.patch('/:id', authMiddleware, authorize('admin'), regrasValidacaoCaixaPatch, atualizarCaixaPatch);

/**
 * @swagger
 * /caixas/{id}:
 *   patch:
 *     summary: Atualizar parcialmente caixa (requer role admin)
 *     tags: [Caixas]
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
 *               nome:
 *                 type: string
 *               colecao:
 *                 type: string
 *     responses:
 *       200:
 *         description: Caixa atualizada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Caixa'
 *       401:
 *         description: Token inválido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Caixa não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
/**
 * @swagger
 * /caixas/{id}:
 *   delete:
 *     summary: Deletar caixa (requer role admin)
 *     tags: [Caixas]
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
 *         description: Caixa deletada com sucesso
 *       401:
 *         description: Token inválido
 *       403:
 *         description: Acesso negado
 *       404:
 *         description: Caixa não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
router.delete('/:id', authMiddleware, authorize('admin'), deletarCaixa);

/**
 * @swagger
 * /caixas/{id}/abrir:
 *   post:
 *     summary: Abrir caixa e sortear skin (requer chave)
 *     tags: [Caixas]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da caixa
 *     responses:
 *       200:
 *         description: Caixa aberta, skin sorteada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mensagem:
 *                   type: string
 *                 skin:
 *                   $ref: '#/components/schemas/Skin'
 *       400:
 *         description: Sem chaves disponíveis
 *       401:
 *         description: Token inválido
 *       404:
 *         description: Caixa não encontrada
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/:id/abrir', authMiddleware, authorize('user', 'admin'), abrirCaixa);

export default router;
