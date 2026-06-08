import { getClient } from './database.js';

export function getDb() {
  const client = getClient();
  return client.db('cs2_inventory');
}

export default { getDb };
