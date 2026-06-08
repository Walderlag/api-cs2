import { ObjectId } from 'mongodb';

export function SkinModel({ arma, nome_skin, raridade, caixa_id }) {
  return { arma, nome_skin, raridade, caixa_id: new ObjectId(caixa_id) };
}
