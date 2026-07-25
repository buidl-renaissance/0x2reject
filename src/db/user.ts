import { v4 as uuidv4 } from 'uuid';
import { and, count, eq, ne, sql } from 'drizzle-orm';
import { db } from './drizzle';
import { leads, swipes, users, UserRole, UserStatus } from './schema';

export interface User {
  id: string;
  renaissanceId?: string | null;
  phone?: string | null;
  email?: string | null;
  username?: string | null;
  name?: string | null;
  displayName?: string | null;
  pfpUrl?: string | null;
  profilePicture?: string | null;
  accountAddress?: string | null;
  slug?: string | null;
  vibe?: string | null;
  age?: number | null;
  photoUrl?: string | null;
  activities: string[];
  isPublic: boolean;
  status?: UserStatus | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

function parseActivities(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.map(String) : [];
  } catch {
    return [];
  }
}

function rowToUser(row: typeof users.$inferSelect): User {
  return {
    id: row.id,
    renaissanceId: row.renaissanceId,
    phone: row.phone,
    email: row.email,
    username: row.username,
    name: row.name,
    displayName: row.displayName,
    pfpUrl: row.pfpUrl,
    profilePicture: row.profilePicture,
    accountAddress: row.accountAddress,
    slug: row.slug,
    vibe: row.vibe,
    age: row.age ?? null,
    photoUrl: row.photoUrl,
    activities: parseActivities(row.activities),
    isPublic: Boolean(row.isPublic),
    status: row.status as UserStatus | null,
    role: row.role,
    createdAt: row.createdAt || new Date(),
    updatedAt: row.updatedAt || new Date(),
  };
}

export function isProfileComplete(user: User | null | undefined): boolean {
  if (!user) return false;
  const name = user.displayName || user.name || user.username;
  const photo = user.photoUrl || user.pfpUrl || user.profilePicture;
  return Boolean(name && photo && user.vibe && user.slug);
}

export function toAppUser(user: User) {
  return {
    id: user.id,
    renaissanceId: user.renaissanceId ?? null,
    username: user.username ?? null,
    displayName: user.displayName || user.name || null,
    pfpUrl: user.pfpUrl ?? null,
    slug: user.slug ?? null,
    vibe: user.vibe ?? null,
    age: user.age ?? null,
    activities: user.activities,
    isPublic: user.isPublic,
    photoUrl: user.photoUrl || user.pfpUrl || user.profilePicture || null,
    profileComplete: isProfileComplete(user),
  };
}

export function toPublicCard(user: User) {
  return {
    id: user.id,
    full_name: user.displayName || user.name || user.username,
    username: user.username,
    slug: user.slug,
    vibe: user.vibe,
    age: user.age ?? null,
    photo_url: user.photoUrl || user.pfpUrl || user.profilePicture,
    activities: user.activities,
  };
}

export async function getUserById(userId: string): Promise<User | null> {
  const results = await db.select().from(users).where(eq(users.id, userId)).limit(1);
  return results.length ? rowToUser(results[0]) : null;
}

export async function getUserByRenaissanceId(renaissanceId: string): Promise<User | null> {
  const results = await db
    .select()
    .from(users)
    .where(eq(users.renaissanceId, renaissanceId))
    .limit(1);
  return results.length ? rowToUser(results[0]) : null;
}

export async function getUserByUsername(username: string): Promise<User | null> {
  const results = await db
    .select()
    .from(users)
    .where(sql`lower(${users.username}) = lower(${username})`)
    .limit(1);
  return results.length ? rowToUser(results[0]) : null;
}

export async function getUserBySlug(slug: string): Promise<User | null> {
  const results = await db
    .select()
    .from(users)
    .where(and(eq(users.slug, slug), eq(users.isPublic, true)))
    .limit(1);
  return results.length ? rowToUser(results[0]) : null;
}

export interface RenaissanceUserData {
  renaissanceId?: string;
  username?: string;
  name?: string;
  displayName?: string;
  pfpUrl?: string;
  accountAddress?: string;
  publicAddress?: string;
}

export async function getOrCreateUserByRenaissanceId(
  renaissanceUserId: string,
  userData?: RenaissanceUserData
): Promise<User> {
  const existing = await getUserByRenaissanceId(renaissanceUserId);
  if (existing) {
    if (userData) {
      const now = new Date();
      const updateData: Record<string, unknown> = { updatedAt: now };
      if (userData.username) updateData.username = userData.username;
      if (userData.displayName) {
        updateData.name = userData.displayName;
        updateData.displayName = userData.displayName;
      }
      if (userData.pfpUrl) {
        updateData.pfpUrl = userData.pfpUrl;
        if (!existing.photoUrl) updateData.photoUrl = userData.pfpUrl;
      }
      if (userData.publicAddress || userData.accountAddress) {
        updateData.accountAddress = userData.publicAddress || userData.accountAddress;
      }
      await db.update(users).set(updateData).where(eq(users.id, existing.id));
      return { ...existing, ...updateData, updatedAt: now } as User;
    }
    return existing;
  }

  if (userData?.username) {
    const byUsername = await getUserByUsername(userData.username);
    if (byUsername) {
      const now = new Date();
      const updateData: Record<string, unknown> = {
        renaissanceId: renaissanceUserId,
        updatedAt: now,
      };
      if (userData.displayName) {
        updateData.name = userData.displayName;
        updateData.displayName = userData.displayName;
      }
      if (userData.pfpUrl) updateData.pfpUrl = userData.pfpUrl;
      if (userData.publicAddress || userData.accountAddress) {
        updateData.accountAddress = userData.publicAddress || userData.accountAddress;
      }
      await db.update(users).set(updateData).where(eq(users.id, byUsername.id));
      return { ...byUsername, ...updateData, updatedAt: now } as User;
    }
  }

  const userCount = await db.select({ count: count() }).from(users);
  const role: UserRole = userCount[0].count === 0 ? 'admin' : 'user';
  const id = uuidv4();
  const now = new Date();
  const newUser = {
    id,
    renaissanceId: renaissanceUserId,
    username: userData?.username || null,
    name: userData?.displayName || null,
    displayName: userData?.displayName || null,
    pfpUrl: userData?.pfpUrl || null,
    profilePicture: userData?.pfpUrl || null,
    photoUrl: userData?.pfpUrl || null,
    accountAddress: userData?.publicAddress || userData?.accountAddress || null,
    activities: '[]',
    isPublic: false,
    status: 'active' as UserStatus,
    role,
    createdAt: now,
    updatedAt: now,
  };
  await db.insert(users).values(newUser);
  return rowToUser({ ...newUser, phone: null, email: null, slug: null, vibe: null, age: null });
}

export interface ProfileUpdateData {
  displayName?: string;
  username?: string;
  vibe?: string;
  age?: number | null;
  slug?: string;
  activities?: string[];
  isPublic?: boolean;
  photoUrl?: string;
  pfpUrl?: string;
}

export async function updateProfile(userId: string, data: ProfileUpdateData): Promise<User | null> {
  const existing = await getUserById(userId);
  if (!existing) return null;

  if (data.slug) {
    const conflict = await db
      .select()
      .from(users)
      .where(and(eq(users.slug, data.slug), ne(users.id, userId)))
      .limit(1);
    if (conflict.length) {
      throw new Error('Slug already taken');
    }
  }

  const now = new Date();
  const updateData: Record<string, unknown> = { updatedAt: now };
  if (data.displayName !== undefined) {
    updateData.displayName = data.displayName;
    updateData.name = data.displayName;
  }
  if (data.username !== undefined) updateData.username = data.username;
  if (data.vibe !== undefined) updateData.vibe = data.vibe;
  if (data.age !== undefined) updateData.age = data.age;
  if (data.slug !== undefined) updateData.slug = data.slug;
  if (data.activities !== undefined) updateData.activities = JSON.stringify(data.activities);
  if (data.isPublic !== undefined) updateData.isPublic = data.isPublic;
  if (data.photoUrl !== undefined) {
    updateData.photoUrl = data.photoUrl;
    updateData.profilePicture = data.photoUrl;
  }
  if (data.pfpUrl !== undefined) updateData.pfpUrl = data.pfpUrl;

  await db.update(users).set(updateData).where(eq(users.id, userId));
  return getUserById(userId);
}

export async function getDeckCards(excludeUserId: string, limit = 50): Promise<User[]> {
  const swiped = await db
    .select({ profileId: swipes.profileId })
    .from(swipes)
    .where(eq(swipes.swiperId, excludeUserId));
  const swipedIds = new Set(swiped.map((s) => s.profileId));
  swipedIds.add(excludeUserId);

  const results = await db
    .select()
    .from(users)
    .where(and(eq(users.isPublic, true), sql`${users.slug} IS NOT NULL`))
    .limit(limit * 2);

  return results
    .map(rowToUser)
    .filter(
      (u) =>
        !swipedIds.has(u.id) &&
        Boolean(u.vibe) &&
        Boolean(u.photoUrl || u.pfpUrl || u.profilePicture)
    )
    .slice(0, limit);
}

export async function recordSwipe(
  swiperId: string,
  profileId: string,
  direction: 'left' | 'right'
) {
  const id = uuidv4();
  const now = new Date();

  const existing = await db
    .select()
    .from(swipes)
    .where(and(eq(swipes.swiperId, swiperId), eq(swipes.profileId, profileId)))
    .limit(1);

  if (existing.length) {
    await db
      .update(swipes)
      .set({ direction, createdAt: now })
      .where(eq(swipes.id, existing[0].id));
    return { id: existing[0].id, swiperId, profileId, direction };
  }

  await db.insert(swipes).values({ id, swiperId, profileId, direction, createdAt: now });
  return { id, swiperId, profileId, direction };
}

export async function createLead(data: {
  profileId: string;
  phone: string;
  visitorUserId?: string | null;
  source: 'deck' | 'share';
}) {
  const id = uuidv4();
  const now = new Date();
  await db.insert(leads).values({
    id,
    profileId: data.profileId,
    phone: data.phone,
    visitorUserId: data.visitorUserId || null,
    source: data.source,
    createdAt: now,
  });
  return { id, ...data, createdAt: now };
}
