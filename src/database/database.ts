import {pool} from './pool.js';
import {type QueryResult} from 'pg';
import dotenv from 'dotenv';

dotenv.config();


export const query = async (text: string, params?: any[]): Promise<QueryResult> => {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log('executed query', { text, duration, rows: res.rowCount });
  return res;
}
