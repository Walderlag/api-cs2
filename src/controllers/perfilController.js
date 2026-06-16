import * as inventoryService from '../services/inventoryService.js';
import { getDb } from '../data/db.js';

export const renderizarPerfil = async (req, res, next) => {
  try {
    let userId = req.user?.id;

    if (!userId) {
      const db = getDb();
      const admin = await db.collection('users').findOne({ role: 'admin' });
      userId = admin?._id.toString() || 'Jogador_01';
    }

    const totalCaixas = await inventoryService.countCaixas();
    const totalSkins = await inventoryService.countSkins();
    const totalChaves = await inventoryService.countChaves();
    const perfil = await inventoryService.getPerfil();
    const inventario = await inventoryService.getInventario(userId);

    const usuarioLogado = req.user ? {
      email: req.user.email,
      role: req.user.role,
      id: req.user.id
    } : null;

    res.render('perfil', {
      jogador: {
        ...perfil,
        userId: userId,
        usuarioLogado: usuarioLogado
      },
      estatisticas: {
        caixas: totalCaixas,
        skins: totalSkins,
        chaves: totalChaves
      },
      inventarioSkins: inventario ?? []
    });
  } catch (error) {
    next(error);
  }
};