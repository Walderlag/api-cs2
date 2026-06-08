export function toCaixaDTO(caixa) {
  return {
    id: caixa._id,
    nome: caixa.nome,
    colecao: caixa.colecao
  };
}
