# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev      # Start dev server at localhost:3000
npm run build    # Production build
npm run lint     # ESLint
```

No test suite is configured.

## Environment Variables

Required in `.env`:
```
GOOGLE_ID=
GOOGLE_CLIENT_SECRET=
MONGODB_URI=
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=
```

## Architecture

**Stack**: Next.js 16 (App Router), React 19, TypeScript, MongoDB/Mongoose, NextAuth v4, Tailwind CSS v4.

**Database**: MongoDB via Mongoose. Connection is managed in `utils/database.ts` with a module-level `isConnected` flag to avoid redundant connections in serverless/lambda environments. Always call `connectToDB()` at the start of every API route handler.

**Auth**: Google OAuth via NextAuth. The `signIn` callback auto-creates users in MongoDB on first login. The `session` callback attaches the MongoDB `_id` as `session.user.id`. The type augmentation is in `types/next-auth.d.ts`. `Provider` (`components/Provider.tsx`) wraps the entire app with `SessionProvider`.

**Models**:
- `models/user.ts` — `{ email, username, image }`. Username enforced with an 8-20 char alphanumeric regex.
- `models/prompt.ts` — `{ creator: ObjectId → User, prompt: string, tag: string }`.

**API Routes** (all under `app/api/`):
- `GET /api/prompt` — fetch all prompts, populated with creator. File is `.js` (not `.ts`).
- `POST /api/prompt/new` — create a prompt; expects `{ userId, prompt, tag }` in the JSON body.
- `GET /api/users/[id]/posts` — fetch all prompts created by a specific user (by MongoDB `_id`), populated with creator.
- `[...nextauth]` — NextAuth handler.

**Pages / Client Components**:
- `app/page.tsx` — home, renders `<Feed>`.
- `app/create-prompt/page.tsx` — `'use client'`, uses `useSession` to get `userId` for the POST body, then delegates rendering to `<Form type="Create">`.
- `app/profile/page.tsx` — `'use client'`, renders the current user's profile. Fetches `/api/users/{id}/posts` on mount using `session.user.id`, then passes results to `<Profile>`. `handleEdit` and `handleDelete` are stubbed.
- `components/Feed.tsx` — `'use client'`, fetches `/api/prompt` on mount, renders `PromptCardList`. Search input exists in the UI but `handleSearchChange` is stubbed (filtering not yet implemented).
- `components/Profile.tsx` — displays a user's profile header (`name`, `desc`) and their prompt list. Receives `{ name, desc, data, handleEdit, handleDelete }`. Prompt list rendering is not yet wired up (stub).
- `components/PromptCard.tsx` — stub, not yet implemented.
- `components/Form.tsx` — shared controlled form for create/edit flows; receives `{ type, post, setPost, submitting, handleSubmit }`.
- `components/Nav.tsx` — responsive nav; desktop and mobile layouts coexist in the same component gated by Tailwind `sm:` breakpoints.

**Path alias**: `@/` maps to the project root (`tsconfig.json` `paths`).

**Image domains**: Google user avatars (`lh3.googleusercontent.com`) are allowlisted in `next.config.ts`.
