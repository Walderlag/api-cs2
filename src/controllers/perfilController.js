import * as inventoryService from '../services/inventoryService.js';

export const renderizarPerfil = async (req, res, next) => {
  try {
    const totalCaixas = await inventoryService.countCaixas();
    const totalSkins = await inventoryService.countSkins();
    const totalChaves = await inventoryService.countChaves();
    const perfil = await inventoryService.getPerfil();
    const skins = await inventoryService.getSkins();

    res.render('perfil', {
      jogador: perfil ?? {},
      estatisticas: {
        caixas: totalCaixas,
        skins: totalSkins,
        chaves: totalChaves
      },
      inventarioSkins: skins ?? []
    });
  } catch (error) {
    next(error);
  }
};