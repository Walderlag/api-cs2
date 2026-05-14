import * as inventoryService from '../services/inventoryService.js';

export const renderizarPerfil = async (req, res, next) => {
  try {
    const totalCaixas = inventoryService.countCaixas();
    const totalSkins = inventoryService.countSkins();
    const totalChaves = inventoryService.countChaves();

    res.render('perfil', {
      jogador: inventoryService.getPerfil() ?? {},
      estatisticas: {
        caixas: totalCaixas,
        skins: totalSkins,
        chaves: totalChaves
      },
      inventarioSkins: inventoryService.getSkins() ?? []
    });
  } catch (error) {
    next(error);
  }
};