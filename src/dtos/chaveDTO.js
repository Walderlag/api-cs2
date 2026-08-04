export function toChaveDTO(chave) {
  return {
    id: chave._id?.toString(),
    nome: chave.nome,
    quantidade: chave.quantidade
  };
}
