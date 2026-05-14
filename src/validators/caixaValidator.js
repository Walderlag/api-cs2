import { body } from 'express-validator';
import { verificarErros } from '../middlewares/validatorMiddleware.js';

export const regrasValidacaoCaixa = [
  body('nome')
    .trim()
    .notEmpty().withMessage('O nome da caixa é obrigatório')
    .isLength({ min: 3 }).withMessage('O nome da caixa deve ter ao menos 3 caracteres'),

  body('colecao')
    .trim()
    .notEmpty().withMessage('A coleção é obrigatória')
    .isLength({ min: 3 }).withMessage('A coleção deve ter ao menos 3 caracteres'),

  verificarErros
];
