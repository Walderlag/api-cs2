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

  body('chave_id')
    .notEmpty().withMessage('O ID da chave é obrigatório')
    .isMongoId().withMessage('O ID da chave deve ser um ObjectId válido'),

  verificarErros
];

export const regrasValidacaoCaixaPatch = [
  body('nome')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('O nome da caixa deve ter ao menos 3 caracteres'),

  body('colecao')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('A coleção deve ter ao menos 3 caracteres'),

  body('chave_id')
    .optional()
    .isMongoId().withMessage('O ID da chave deve ser um ObjectId válido'),

  verificarErros
];
