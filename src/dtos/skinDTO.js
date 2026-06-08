export function toSkinDTO(skin) {
  return {
    id: skin._id,
    arma: skin.arma,
    nome_skin: skin.nome_skin,
    raridade: skin.raridade,
    caixa_id: skin.caixa_id
  };
}
