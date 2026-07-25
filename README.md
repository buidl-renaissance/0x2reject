# 0x2 Reject (Drifter)

Dating-card lead funnel for people who meet online through Renaissance City.

## Modes

- **Ren embed / `/deck`** — multi-user swipe deck of public cards
- **Shareable app `/p/[slug]`** — personal lead funnel for one profile
- **`/profile`** — build photo, name, vibe, activities, and share link

## Stack

- Next.js (Pages Router) + TypeScript + Styled Components
- Turso / local SQLite via Drizzle ORM

## Setup

```bash
yarn install
cp .env.example .env.local
yarn db:push
yarn dev
```

Local auth: open `/start` and use **Continue (local)** (`USE_LOCAL=true`).

Production: set `TURSO_DATABASE_URL` + `TURSO_AUTH_TOKEN`, unset or set `USE_LOCAL=false`, then `yarn db:push`.

## Renaissance SSO

Mini app injects `__renaissanceAuthContext` → `POST /api/auth/context` sets `user_session` cookie.
