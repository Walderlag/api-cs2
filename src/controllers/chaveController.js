import * as inventoryService from '../services/inventoryService.js';
import { toChaveDTO } from '../dtos/chaveDTO.js';

export const listarChaves = async (req, res, next) => {
  try {
    const chaves = await inventoryService.getChaves();
    res.status(200).json((chaves ?? []).map(toChaveDTO));
  } catch (error) { next(error); }
};

export const buscarChavePorId = async (req, res, next) => {
  try {
    const { ObjectId } = await import('mongodb');
    const { id } = req.params;
    
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: 'ID inválido.' });
    }
    
    const db = (await import('../data/db.js')).getDb();
    const chave = await db.collection('chaves').findOne({ _id: new ObjectId(id) });
    
    if (!chave) return res.status(404).json({ mensagem: 'Chave não encontrada' });
    res.status(200).json(toChaveDTO(chave));
  } catch (error) { next(error); }
};

export const criarChave = async (req, res, next) => {
  try {
    const { nome, quantidade } = req.body;
    
    const db = (await import('../data/db.js')).getDb();
    const result = await db.collection('chaves').insertOne({ nome, quantidade });
    
    res.status(201).json(toChaveDTO({ _id: result.insertedId, nome, quantidade }));
  } catch (error) { next(error); }
};

export const atualizarChavePut = async (req, res, next) => {
  try {
    const { ObjectId } = await import('mongodb');
    const { id } = req.params;
    const { nome, quantidade } = req.body;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: 'ID inválido.' });
    }

    if (!nome || quantidade == null) {
      return res.status(400).json({ mensagem: 'Nome e quantidade são obrigatórios.' });
    }

    const db = (await import('../data/db.js')).getDb();
    const result = await db.collection('chaves').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { nome, quantidade } },
      { returnDocument: 'after' }
    );

    if (!result) return res.status(404).json({ mensagem: 'Chave não encontrada' });
    res.status(200).json(toChaveDTO(result));
  } catch (error) { next(error); }
};

export const atualizarChavePatch = async (req, res, next) => {
  try {
    const { ObjectId } = await import('mongodb');
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: 'ID inválido.' });
    }

    const db = (await import('../data/db.js')).getDb();
    const result = await db.collection('chaves').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );

    if (!result) return res.status(404).json({ mensagem: 'Chave não encontrada' });
    res.status(200).json(toChaveDTO(result));
  } catch (error) { next(error); }
};

export const deletarChave = async (req, res, next) => {
  try {
    const { ObjectId } = await import('mongodb');
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ mensagem: 'ID inválido.' });
    }

    const db = (await import('../data/db.js')).getDb();
    const result = await db.collection('chaves').deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) return res.status(404).json({ mensagem: 'Chave não encontrada' });
    res.status(204).send();
  } catch (error) { next(error); }
};
