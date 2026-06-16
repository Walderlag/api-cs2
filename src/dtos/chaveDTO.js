export function toChaveDTO(chave) {
  return {
    id: chave._id,
    nome: chave.nome,
    quantidade: chave.quantidade
  };
}
