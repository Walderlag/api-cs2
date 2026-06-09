import { Router } from 'express';
import { getDb } from '../data/db.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/permissionMiddleware.js';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const db = getDb();
    const chaves = await db.collection('chaves').find({}).toArray();
    res.json(chaves);
  } catch (error) { next(error); }
});

router.post('/', authMiddleware, authorize('admin'), async (req, res, next) => {
  try {
    const { nome, quantidade } = req.body;
    if (!nome || quantidade == null) {
      return res.status(400).json({ mensagem: 'nome e quantidade são obrigatórios.' });
    }
    const db = getDb();
    const result = await db.collection('chaves').insertOne({ nome, quantidade });
    res.status(201).json({ id: result.insertedId, nome, quantidade });
  } catch (error) { next(error); }
});

router.patch('/:id', authMiddleware, authorize('admin'), async (req, res, next) => {
  try {
    const { ObjectId } = await import('mongodb');
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ mensagem: 'ID inválido.' });
    const db = getDb();
    const result = await db.collection('chaves').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: req.body },
      { returnDocument: 'after' }
    );
    if (!result) return res.status(404).json({ mensagem: 'Chave não encontrada.' });
    res.json(result);
  } catch (error) { next(error); }
});

router.delete('/:id', authMiddleware, authorize('admin'), async (req, res, next) => {
  try {
    const { ObjectId } = await import('mongodb');
    const { id } = req.params;
    if (!ObjectId.isValid(id)) return res.status(400).json({ mensagem: 'ID inválido.' });
    const db = getDb();
    const result = await db.collection('chaves').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return res.status(404).json({ mensagem: 'Chave não encontrada.' });
    res.status(204).send();
  } catch (error) { next(error); }
});

export default router;
