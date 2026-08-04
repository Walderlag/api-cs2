import { body } from 'express-validator';
import { verificarErros } from '../middlewares/validatorMiddleware.js';

export const regrasValidacaoChave = [
  body('nome')
    .trim()
    .notEmpty().withMessage('O nome da chave é obrigatório')
    .isLength({ min: 3 }).withMessage('O nome da chave deve ter ao menos 3 caracteres'),

  body('quantidade')
    .isInt({ min: 0 }).withMessage('A quantidade deve ser um número inteiro maior ou igual a 0'),

  verificarErros
];

export const regrasValidacaoChavePatch = [
  body('nome')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('O nome da chave deve ter ao menos 3 caracteres'),

  body('quantidade')
    .optional()
    .isInt({ min: 0 }).withMessage('A quantidade deve ser um número inteiro maior ou igual a 0'),

  verificarErros
];
