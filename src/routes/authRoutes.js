import { Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getDb } from '../data/db.js';
import loginLimiter from '../middlewares/rateLimiter.js';

const router = Router();
const MAX_LOGIN_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 15;

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
 *       403:
 *         description: Conta temporariamente bloqueada devido a várias tentativas falhas
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/login', loginLimiter, async (req, res, next) => {
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

    const bloqueadoAte = usuario.bloqueadoAte ? new Date(usuario.bloqueadoAte) : null;
    if (bloqueadoAte && bloqueadoAte > new Date()) {
      const retryAfter = Math.ceil((bloqueadoAte - new Date()) / 1000);
      res.set('Retry-After', retryAfter.toString());
      return res.status(403).json({
        mensagem: 'Conta temporariamente bloqueada devido a várias tentativas de login incorretas. Tente novamente mais tarde.'
      });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      const tentativasFalhas = (usuario.tentativasFalhas || 0) + 1;
      const update = { $set: { tentativasFalhas } };

      if (tentativasFalhas >= MAX_LOGIN_ATTEMPTS) {
        update.$set.bloqueadoAte = new Date(Date.now() + LOCKOUT_DURATION_MINUTES * 60 * 1000);
        update.$set.tentativasFalhas = 0;
      }

      await db.collection('users').updateOne({ _id: usuario._id }, update);
      return res.status(400).json({ mensagem: 'Email ou senha inválidos.' });
    }

    await db.collection('users').updateOne(
      { _id: usuario._id },
      { $set: { tentativasFalhas: 0 }, $unset: { bloqueadoAte: '' } }
    );

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
