export function authorize(...allowedRoles) {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ mensagem: 'Acesso negado. Permissões insuficientes.' });
    }
    next();
  };
}

export default authorize;
