import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { config } from 'dotenv';
import * as schema from './schema';

config({ path: '.env.local' });
config({ path: '.env' });

let tursoClient: ReturnType<typeof createClient> | null = null;
let dbInstance: ReturnType<typeof drizzle> | null = null;

function getTursoClient() {
  if (tursoClient) return tursoClient;

  const useLocal = process.env.USE_LOCAL === 'true';
  const url = process.env.TURSO_DATABASE_URL || 'file:./dev.sqlite3';
  const authToken = process.env.TURSO_AUTH_TOKEN;

  if (useLocal || !authToken) {
    const localUrl = 'file:./dev.sqlite3';
    console.log('📁 Using local SQLite database:', localUrl);
    tursoClient = createClient({ url: localUrl });
  } else {
    console.log('☁️ Using remote Turso database');
    tursoClient = createClient({ url, authToken });
  }

  return tursoClient;
}

export function getDb() {
  if (dbInstance) return dbInstance;
  dbInstance = drizzle(getTursoClient(), { schema });
  return dbInstance;
}

export const db = getDb();
export type Database = typeof db;
