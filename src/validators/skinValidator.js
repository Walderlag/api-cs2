import { body } from 'express-validator';
import { verificarErros } from '../middlewares/validatorMiddleware.js';

export const regrasValidacaoSkin = [
  body('arma')
    .trim()
    .notEmpty().withMessage('O nome da arma é obrigatório')
    .isLength({ min: 3 }).withMessage('A arma deve ter ao menos 3 caracteres'),

  body('nome_skin')
    .trim()
    .notEmpty().withMessage('O nome da skin é obrigatório')
    .isLength({ min: 3 }).withMessage('O nome da skin deve ter ao menos 3 caracteres'),

  body('raridade')
    .trim()
    .notEmpty().withMessage('A raridade é obrigatória'),

  body('caixa_id')
    .notEmpty().withMessage('O ID da caixa é obrigatório')
    .isMongoId().withMessage('O ID da caixa deve ser um ObjectId válido'),

  verificarErros
];

export const regrasValidacaoSkinPatch = [
  body('arma')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('A arma deve ter ao menos 3 caracteres'),

  body('nome_skin')
    .optional()
    .trim()
    .isLength({ min: 3 }).withMessage('O nome da skin deve ter ao menos 3 caracteres'),

  body('raridade')
    .optional()
    .trim(),

  body('caixa_id')
    .optional()
    .isMongoId().withMessage('O ID da caixa deve ser um ObjectId válido'),

  verificarErros
];
