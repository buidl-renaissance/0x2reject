# 0x2 Reject (Drifter)

A dating-card lead funnel for people who meet online through Renaissance City.

## Modes

- **Ren embed / `/deck`** — multi-user swipe deck of public cards
- **Shareable app `/p/[slug]`** — personal lead funnel for one profile
- **`/profile`** — build photo, name, vibe, activities, and share link

## Stack

- Next.js (Pages Router) + TypeScript + Styled Components
- Supabase Auth + Postgres

## Setup

```bash
yarn install
cp .env.example .env.local
```

Fill in Supabase keys and `RENAISSANCE_SSO_SECRET`. Apply migrations under `supabase/migrations/` (including `20260725000000_renaissance_drifter.sql`). Create a public `photos` storage bucket if photo upload is used.

```bash
yarn dev
```

## Renaissance SSO

The mobile mini app injects `__renaissanceAuthContext`. The guest app POSTs to `/api/auth/context`, which mints a Supabase session for that `renaissanceUserId`.

## Catalog URL

`https://0x2reject.vercel.app`
