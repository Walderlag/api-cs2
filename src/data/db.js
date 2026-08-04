import { getClient } from './database.js';

export function getDb() {
  const client = getClient();
  return client.db('cs2_inventory');
}

export function startSession() {
  const client = getClient();
  return client.startSession();
}

export default { getDb, startSession };
