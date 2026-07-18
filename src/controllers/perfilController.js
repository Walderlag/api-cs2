import * as inventoryService from '../services/inventoryService.js';

export const renderizarPerfil = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const usuarioLogado = {
      email: req.user.email,
      role: req.user.role,
      id: req.user.id
    };

    const totalCaixas = await inventoryService.countCaixas();
    const totalSkins = await inventoryService.countSkins();
    const totalChaves = await inventoryService.countChaves();
    const perfil = await inventoryService.getPerfil();
    const inventarioRaw = await inventoryService.getInventario(userId);

    // Agrupar skins iguais e contar
    const inventarioAgrupado = inventarioRaw.reduce((acc, skin) => {
      const existente = acc.find(s => s.skinId === skin.skinId.toString());
      if (existente) {
        existente.quantidade += 1;
      } else {
        acc.push({
          skinId: skin.skinId.toString(),
          arma: skin.arma,
          nome_skin: skin.nome_skin,
          raridade: skin.raridade,
          quantidade: 1,
          obtidoEm: skin.obtidoEm
        });
      }
      return acc;
    }, []);

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
      inventarioSkins: inventarioAgrupado ?? []
    });
  } catch (error) {
    next(error);
  }
};