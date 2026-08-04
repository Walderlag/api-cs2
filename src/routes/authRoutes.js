import { Router } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { getDb } from '../data/db.js';
import { verificarErros } from '../middlewares/validatorMiddleware.js';
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
router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/registrar', (req, res) => {
  res.render('register');
});

const regrasRegistro = [
  body('email').trim().isEmail().withMessage('Email inválido'),
  body('senha').isLength({ min: 6 }).withMessage('Senha deve ter ao menos 6 caracteres'),
  verificarErros
];

router.post('/registrar', regrasRegistro, async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    const db = getDb();
    const usuarioExistente = await db.collection('users').findOne({ email });

    if (usuarioExistente) {
      return res.status(400).json({ status: 400, message: 'Email já existe.' });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const result = await db.collection('users').insertOne({
      email,
      senha: senhaHash,
      role: 'user',
      criadoEm: new Date(),
      tentativasFalhas: 0,
      bloqueadoAte: null
    });

    res.status(201).json({ status: 201, data: { id: result.insertedId.toString(), email, role: 'user' } });
  } catch (error) {
    next(error);
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/login');
});

router.post('/login', loginLimiter, async (req, res, next) => {
  try {
    const { email, senha } = req.body;

    if (!email || !senha) {
      return res.status(400).json({ status: 400, message: 'Email e senha são obrigatórios.' });
    }

    const db = getDb();
    const usuario = await db.collection('users').findOne({ email });

    if (!usuario) {
      return res.status(400).json({ status: 400, message: 'Email ou senha inválidos.' });
    }

    const bloqueadoAte = usuario.bloqueadoAte ? new Date(usuario.bloqueadoAte) : null;
    if (bloqueadoAte && bloqueadoAte > new Date()) {
      const retryAfter = Math.ceil((bloqueadoAte - new Date()) / 1000);
      res.set('Retry-After', retryAfter.toString());
      return res.status(403).json({
        status: 403,
        message: 'Conta temporariamente bloqueada devido a várias tentativas de login incorretas. Tente novamente mais tarde.'
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
      return res.status(400).json({ status: 400, message: 'Email ou senha inválidos.' });
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

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3600000
    });

    res.status(200).json({ status: 200, data: { token } });
  } catch (error) {
    next(error);
  }
});

export default router;
