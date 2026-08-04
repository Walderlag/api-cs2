export function toCaixaDTO(caixa) {
  return {
    id: caixa._id?.toString(),
    nome: caixa.nome,
    colecao: caixa.colecao
  };
}
