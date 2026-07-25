import { sqliteTable, text, integer, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export type UserRole = 'user' | 'admin';
export const USER_STATUSES = ['active', 'inactive', 'banned'] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const users = sqliteTable(
  'users',
  {
    id: text('id').primaryKey(),
    renaissanceId: text('renaissanceId').unique(),
    phone: text('phone').unique(),
    email: text('email'),
    username: text('username'),
    name: text('name'),
    displayName: text('displayName'),
    pfpUrl: text('pfpUrl'),
    profilePicture: text('profilePicture'),
    accountAddress: text('accountAddress'),
    // Drifter dating card fields
    slug: text('slug').unique(),
    vibe: text('vibe'),
    age: integer('age'),
    photoUrl: text('photoUrl'),
    activities: text('activities').default('[]'), // JSON string array
    isPublic: integer('isPublic', { mode: 'boolean' }).default(false).notNull(),
    status: text('status').$type<UserStatus>().default('active'),
    role: text('role').$type<UserRole>().default('user').notNull(),
    createdAt: integer('createdAt', { mode: 'timestamp' })
      .default(sql`(strftime('%s', 'now'))`)
      .notNull(),
    updatedAt: integer('updatedAt', { mode: 'timestamp' })
      .default(sql`(strftime('%s', 'now'))`)
      .notNull(),
  },
  (table) => ({
    slugIdx: uniqueIndex('users_slug_idx').on(table.slug),
  })
);

export const leads = sqliteTable('leads', {
  id: text('id').primaryKey(),
  profileId: text('profileId')
    .notNull()
    .references(() => users.id, { onDelete: 'cascade' }),
  phone: text('phone'),
  visitorUserId: text('visitorUserId').references(() => users.id, {
    onDelete: 'set null',
  }),
  source: text('source').$type<'deck' | 'share'>().default('share').notNull(),
  createdAt: integer('createdAt', { mode: 'timestamp' })
    .default(sql`(strftime('%s', 'now'))`)
    .notNull(),
});

export const swipes = sqliteTable(
  'swipes',
  {
    id: text('id').primaryKey(),
    swiperId: text('swiperId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    profileId: text('profileId')
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    direction: text('direction').$type<'left' | 'right'>().notNull(),
    createdAt: integer('createdAt', { mode: 'timestamp' })
      .default(sql`(strftime('%s', 'now'))`)
      .notNull(),
  },
  (table) => ({
    pairIdx: uniqueIndex('swipes_pair_idx').on(table.swiperId, table.profileId),
  })
);
