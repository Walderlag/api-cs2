import { Router } from 'express';
import bcrypt from 'bcrypt';
import { getDb } from '../data/db.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/permissionMiddleware.js';

const router = Router();

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Criar novo usuário (requer role admin)
 *     tags: [Usuários]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha, role]
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@cs2.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: user
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 email:
 *                   type: string
 *                 role:
 *                   type: string
 *       400:
 *         description: Email já existe ou dados incompletos
 *       401:
 *         description: Token inválido ou não fornecido
 *       403:
 *         description: Acesso negado. Permissões insuficientes
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/', authMiddleware, authorize('admin'), async (req, res, next) => {
  try {
    const { email, senha, role } = req.body;

    if (!email || !senha || !role) {
      return res.status(400).json({ mensagem: 'Email, senha e role são obrigatórios.' });
    }

    const db = getDb();
    const usuarioExistente = await db.collection('users').findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ mensagem: 'Email já existe.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await db.collection('users').insertOne({
      email,
      senha: senhaHash,
      role,
      criadoEm: new Date()
    });

    res.status(201).json({
      id: result.insertedId.toString(),
      email,
      role
    });
  } catch (error) {
    next(error);
  }
});

export default router;
