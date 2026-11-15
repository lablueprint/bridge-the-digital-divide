# Bridge LA

## Run locally

### Prerequisites

- Node.js and npm
- Docker Desktop
- Local Supabase configuration

### Install dependencies

From the repository directory:

```bash
npm ci
```

### Configure the local environment

Start Supabase and view the local connection values:

```bash
npx supabase start
npx supabase status
```

Create `.env.local` with the local API URL and publishable key from `supabase status`:

```env
NEXT_PUBLIC_SUPABASE_URL=http://127.0.0.1:54321
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_LOCAL_PUBLISHABLE_KEY
```

### Start the app

Start Next.js from a separate terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

The browser communicates with the Next.js app, which communicates with the local Supabase services.

### Check the app

```bash
npm run lint
npm run format:check
npm run build
```

### Stop local Supabase

```bash
npx supabase stop
```
