import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getDb } from '../data/db.js';
import { ObjectId } from 'mongodb';

const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realizar login e obter JWT
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@cs2.com
 *               senha:
 *                 type: string
 *                 example: senha123
 *     responses:
 *       200:
 *         description: Login bem-sucedido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: JWT com expiração de 1h
 *       400:
 *         description: Email ou senha inválidos
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/login', async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ mensagem: 'Email e senha são obrigatórios.' });
    }

    const db = getDb();
    const usuario = await db.collection('users').findOne({ email });

    if (!usuario) {
      return res.status(400).json({ mensagem: 'Email ou senha inválidos.' });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      return res.status(400).json({ mensagem: 'Email ou senha inválidos.' });
    }

    const token = jwt.sign(
      { id: usuario._id.toString(), email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    next(error);
  }
});

export default router;
