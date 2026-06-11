# Share Prompts

An open-source AI prompt sharing platform where users can discover, create, edit, and delete AI prompts. Built with Next.js 16, MongoDB, and Google OAuth.

## Features

- Google OAuth sign-in / sign-out
- Browse all community prompts on the home feed
- Search prompts by tag or username
- Create, edit, and delete your own prompts
- Personal profile page showing your prompts
- Protected routes — unauthenticated users are redirected automatically

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: MongoDB via Mongoose
- **Auth**: NextAuth v4 (Google OAuth)
- **Styling**: Tailwind CSS v4

## Getting Started

### Prerequisites

- Node.js 18+
- A MongoDB database (e.g. MongoDB Atlas)
- A Google OAuth app ([Google Cloud Console](https://console.cloud.google.com/))

### Environment Variables

Create a `.env` file in the project root:

```env
GOOGLE_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_nextauth_secret
```

### Install & Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Scripts

```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
```

## Project Structure

```
app/
  api/
    auth/          # NextAuth handler
    prompt/        # GET all, POST new, GET/PATCH/DELETE by id
    users/[id]/    # GET prompts by user
  create-prompt/   # Create a new prompt
  update-prompt/   # Edit an existing prompt
  profile/         # Current user's profile
components/
  Nav.tsx          # Navigation with sign-in/out
  Feed.tsx         # Home feed with search
  PromptCard.tsx   # Individual prompt card
  Profile.tsx      # Profile page layout
  Form.tsx         # Shared create/edit form
models/
  user.ts          # User schema
  prompt.ts        # Prompt schema
utils/
  database.ts      # MongoDB connection
middleware.ts      # Protects /profile, /create-prompt, /update-prompt
```
