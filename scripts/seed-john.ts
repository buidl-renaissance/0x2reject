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
  secondaryPhotoUrl: '/profiles/john-sash.png',
  packageHint: '... and yes, this cute little girl is included in the package',
  textPhone: '+13135503518',
  activities: JSON.stringify(['pinball', 'crypto', 'travel', 'building', 'events']),
  isPublic: true,
};

async function upsertJohn(
  id: string | null,
  now: Date
) {
  const payload = {
    ...JOHN,
    name: JOHN.displayName,
    profilePicture: JOHN.photoUrl,
    pfpUrl: JOHN.photoUrl,
    updatedAt: now,
  };

  if (id) {
    await db.update(schema.users).set(payload).where(eq(schema.users.id, id));
    return id;
  }

  const newId = uuidv4();
  await db.insert(schema.users).values({
    id: newId,
    ...payload,
    email: null,
    phone: null,
    accountAddress: null,
    status: 'active',
    role: 'admin',
    createdAt: now,
  });
  return newId;
}

async function main() {
  console.log(useLocal || !authToken ? '📁 Seeding local SQLite' : '☁️ Seeding Turso');

  const existing = await db
    .select()
    .from(schema.users)
    .where(eq(schema.users.slug, 'john'))
    .limit(1);

  const now = new Date();
  let id: string | null = existing[0]?.id ?? null;

  if (!id) {
    const byRen = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.renaissanceId, JOHN.renaissanceId))
      .limit(1);
    id = byRen[0]?.id ?? null;
  }

  const savedId = await upsertJohn(id, now);
  console.log(id ? '✅ Updated John card:' : '✅ Created John card:', savedId);
  console.log('🔗 Share: /john  (also /p/john)');
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
