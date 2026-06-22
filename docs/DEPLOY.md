# Railway Deployment Checklist

## One-time setup

### 1. Add the Next.js service to Railway

1. Go to https://railway.com → your project (ID: `8c21fadf-ef58-4d3a-9df6-1f6f6d3911ef`)
2. Click **+ New** → **GitHub Repo** → connect this repo
3. Railway auto-detects the `railway.toml` and uses Nixpacks to build

### 2. Link the PostgreSQL service

The PostgreSQL service is already in your project. To connect it:

1. In the Next.js service → **Variables** tab → click **Add Reference**
2. Select the PostgreSQL service → choose `DATABASE_URL`
3. Railway injects it at build and runtime automatically

### 3. Set all required environment variables

Copy from `.env.example` and set each one in Railway → **Variables**:

| Variable | Where to get it |
|---|---|
| `AUTH_SECRET` | `openssl rand -base64 32` |
| `AUTH_URL` | Your Railway domain (e.g. `https://tealregistry-web.up.railway.app`) |
| `ADMIN_EMAILS` | Your email address |
| `EMAIL_SERVER_HOST` | Resend/SendGrid/Postmark SMTP settings |
| `EMAIL_SERVER_PORT` | Usually `587` |
| `EMAIL_SERVER_USER` | SMTP username |
| `EMAIL_SERVER_PASSWORD` | SMTP password or API key |
| `EMAIL_FROM` | `Teal Registry <noreply@tealregistry.com>` |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys |
| `STRIPE_WEBHOOK_SECRET` | Stripe Dashboard → Webhooks → your endpoint |
| `STRIPE_TEAL_VERIFIED` | Stripe Dashboard → Products → create $1,200/yr price |
| `STRIPE_TEAL_CERTIFIED` | Stripe Dashboard → Products → create $3,800/yr price |
| `STRIPE_ACCREDITED` | Stripe Dashboard → Products → create $2,400/yr price |
| `NEXT_PUBLIC_APP_URL` | Your production URL |

### 4. First deploy

Push to `main`. Railway runs:
```
npm install
npm run build
npx prisma migrate deploy  ← creates all tables
node .next/standalone/server.js
```

Migrations create: Users, Accounts, Sessions, VerificationTokens, Profiles, Applications, Cases, Evidence, Decisions, Badges, Complaints, and all supporting tables.

### 5. Set up Stripe webhook

1. Stripe Dashboard → Developers → Webhooks → **Add endpoint**
2. URL: `https://YOUR-RAILWAY-DOMAIN.up.railway.app/api/stripe/webhook`
3. Events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy the webhook signing secret → paste into Railway `STRIPE_WEBHOOK_SECRET`

### 6. Create Stripe products

1. Stripe Dashboard → Products → **+ Add product**
2. Create three products:
   - **Teal Verified** — $1,200/year recurring → copy Price ID → `STRIPE_TEAL_VERIFIED`
   - **Teal Certified** — $3,800/year recurring → copy Price ID → `STRIPE_TEAL_CERTIFIED`
   - **Accredited** — $2,400/year recurring → copy Price ID → `STRIPE_ACCREDITED`

### 7. Custom domain (optional)

Railway → your service → **Settings** → **Custom Domain** → add `tealregistry.com`
Update `AUTH_URL` and `NEXT_PUBLIC_APP_URL` to match.

---

## Local development

```bash
# Copy env
cp .env.example .env.local
# Edit .env.local with your values

# Install deps
npm install

# Generate Prisma client
npx prisma generate

# Push schema to local DB (or Railway DB directly)
npx prisma db push

# Run dev server
npm run dev
```

## Useful commands

```bash
npx prisma studio          # GUI for your DB
npx prisma migrate dev     # Create a new migration
npx prisma migrate deploy  # Apply migrations to production
npm run typecheck          # TypeScript check without building
npm run build              # Production build
```

---

## Architecture summary

| Layer | Technology |
|---|---|
| Framework | Next.js 16 App Router (standalone output) |
| Database | PostgreSQL on Railway |
| ORM | Prisma 7.8 |
| Auth | NextAuth v5 beta — magic link + credentials |
| Payments | Stripe (subscriptions, webhooks) |
| Email | Nodemailer (configurable SMTP) |
| CSS | Custom design system (CSS variables, no Tailwind) |
| Fonts | Fraunces (display) + Inter (body) via Google Fonts |
| Icons | Lucide React |
| Deployment | Railway (Nixpacks, standalone Node.js) |
