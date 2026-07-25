/**
 * Seed John's public Drifter dating card.
 * Run: yarn seed:john
 */
import { config } from 'dotenv';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { eq } from 'drizzle-orm';
import { v4 as uuidv4 } from 'uuid';
import * as schema from '../src/db/schema';

config({ path: '.env.local' });
config({ path: '.env' });

const useLocal = process.env.USE_LOCAL === 'true';
const authToken = process.env.TURSO_AUTH_TOKEN?.trim();
const tursoUrl = process.env.TURSO_DATABASE_URL?.trim();

const client =
  useLocal || !authToken
    ? createClient({ url: 'file:./dev.sqlite3' })
    : createClient({ url: tursoUrl!, authToken });

const db = drizzle(client, { schema: schema });

const JOHN = {
  renaissanceId: 'local-john',
  username: 'john',
  displayName: 'John',
  age: 37,
  slug: 'john',
  vibe: 'Cat dad energy. Bad decisions, good stories.',
  photoUrl: '/profiles/john.png',
  activities: JSON.stringify(['pinball', 'crypto', 'travel', 'building', 'events']),
  isPublic: true,
};

async function main() {
  console.log(useLocal || !authToken ? '📁 Seeding local SQLite' : '☁️ Seeding Turso');

  const existing = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.slug, 'john'))
    .limit(1);

  const now = new Date();

  if (existing.length) {
    await db
      .update(schema.users)
      .set({
        ...JOHN,
        name: JOHN.displayName,
        profilePicture: JOHN.photoUrl,
        pfpUrl: JOHN.photoUrl,
        updatedAt: now,
      })
      .where(eq(schema.users.id, existing[0].id));
    console.log('✅ Updated John card:', existing[0].id);
  } else {
    const byRen = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.renaissanceId, JOHN.renaissanceId))
      .limit(1);

    if (byRen.length) {
      await db
        .update(schema.users)
        .set({
          ...JOHN,
          name: JOHN.displayName,
          profilePicture: JOHN.photoUrl,
          pfpUrl: JOHN.photoUrl,
          updatedAt: now,
        })
        .where(eq(schema.users.id, byRen[0].id));
      console.log('✅ Updated John by renaissanceId:', byRen[0].id);
    } else {
      const id = uuidv4();
      await db.insert(schema.users).values({
        id,
        ...JOHN,
        name: JOHN.displayName,
        profilePicture: JOHN.photoUrl,
        pfpUrl: JOHN.photoUrl,
        email: null,
        phone: null,
        accountAddress: null,
        status: 'active',
        role: 'admin',
        createdAt: now,
        updatedAt: now,
      });
      console.log('✅ Created John card:', id);
    }
  }

  console.log('🔗 Share: /p/john');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
