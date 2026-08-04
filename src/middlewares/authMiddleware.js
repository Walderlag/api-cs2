import jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    let token;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.slice(7);
    } else if (req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return res.status(401).json({ status: 401, message: 'Token inválido ou não fornecido.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: 401, message: 'Token inválido ou não fornecido.' });
  }
}

export default authMiddleware;