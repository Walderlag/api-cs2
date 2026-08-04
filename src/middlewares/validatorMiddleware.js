import { validationResult } from 'express-validator';

export const verificarErros = (req, res, next) => {
    const erros = validationResult(req);
    if (!erros.isEmpty()) {
        return res.status(400).json({ 
            status: 400,
            message: 'Erro de validação', 
            errors: erros.array() 
        });
    }
    next();
};