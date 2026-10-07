# Heatingology — Operations & Handover Document

**Last updated:** 2026-05-12  
**Author:** Rufina T  
**Audience:** Engineering team / Manager / New maintainer

## Contents

- [1. Overview](#1-overview)
- [2. Technology Stack](#2-technology-stack)
- [3. Infrastructure & Hosting](#3-infrastructure--hosting)
- [4. Deployment](#4-deployment)
- [5. Environment Variables](#5-environment-variables)
- [6. Local Development Setup](#6-local-development-setup)
- [7. Application Routes](#7-application-routes)
- [8. API Routes](#8-api-routes)
- [9. Database Schema (Prisma)](#9-database-schema-prisma)
- [10. Feature Flags](#10-feature-flags)
- [11. Payment Integrations](#11-payment-integrations)
- [12. Email (AWS SES)](#12-email-aws-ses)
- [13. Testing](#13-testing)
- [14. Build Notes](#14-build-notes)
- [15. Key File Locations](#15-key-file-locations)

---

## 1. Overview

Heatingology is a customer-facing web platform for purchasing and booking heating and energy installations in the UK (boilers, heat pumps, EV chargers). Customers receive instant quotes, choose a product, book an installation date, and pay online. Engineers can also self-register through a separate flow.

**Live domain:** `https://heatingology.co.uk`  
**Production server:** AWS EC2 instance at `35.176.66.220` (eu-west-2)  
**Repository:** `github.com/rufinn/heatingology` — primary development branch is `dev`, with `main` as the stable/production branch.

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router), React 19 |
| Language | TypeScript 5 |
| Styling | SCSS Modules |
| Database | PostgreSQL 15 (via Prisma 6 ORM) |
| Process manager | PM2 (`ecosystem.config.js`) |
| Reverse proxy | Nginx |
| Package manager | Yarn 1.x |

**Key third-party services:**

| Service | Purpose |
|---|---|
| AWS RDS (PostgreSQL) | Production database |
| AWS S3 (`heatingology-joinus`, eu-west-2) | Engineer document uploads |
| AWS SES | Transactional email (invoices, confirmations) — sender: `no-reply@heatingology.co.uk` |
| Stripe | Card payment checkout |
| PayPal | PayPal payment option |
| Kanda (`hub.kanda.co.uk`) | Finance / Buy-now-pay-later for EV chargers |
| GetAddress / Ideal Postcodes | Postcode address lookup and autocomplete |

---

## 3. Infrastructure & Hosting

### Production Server (EC2)

- **OS:** Amazon Linux (ec2-user)
- **Remote path:** `/home/ec2-user/heatingology`
- **Node process:** Managed by PM2. The app runs as process `heatingology` on port `3000`.
- **Web server:** Nginx reverse-proxies public traffic to port `3000`.
- **Prisma Studio** is optionally available via PM2 process `heatingology-db` on port `5555` (not intended for public access).

### Production Database

AWS RDS PostgreSQL instance: `heatingology-dev.cypiy57aqdre.eu-west-2.rds.amazonaws.com`  
Connection string is set in `.env.production` as `DATABASE_URL`.

### Asset Hosting

Product images are referenced from `https://assets.heatingology.com`. Engineer documents are uploaded to and served from the S3 bucket `heatingology-joinus` in `eu-west-2`.

---

## 4. Deployment

Deployment is performed manually from a local machine using `scripts/deploy.sh`.

**What the script does:**
1. `rsync` — syncs `src/`, `prisma/`, `public/`, and config files to the EC2 instance (deletes files removed locally).
2. Runs `yarn install --frozen-lockfile` on the server.
3. Generates the Prisma client on the server.
4. Runs `yarn build` (Next.js production build).
5. Restarts PM2 processes and reloads Nginx.

**To deploy:**
```bash
# From your local machine, in the repo root:
bash scripts/deploy.sh
```

> Prerequisite: SSH access to `ec2-user@35.176.66.220` must be configured (key pair in `~/.ssh`).

**There is no CI/CD pipeline.** All deployments are manual.

---

## 5. Environment Variables

Three `.env` files exist at the repo root:

| File | Used when |
|---|---|
| `.env.development` | `yarn dev` (local, points to local or dev RDS DB) |
| `.env` | Fallback / shared values |
| `.env.production` | Production build |

**Required variables:**

| Variable | Purpose |
|---|---|
| `DATABASE_URL` | PostgreSQL connection string |
| `STRIPE_SECRET_KEY` | Stripe server-side key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Stripe client-side key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signature |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` | PayPal client ID |
| `PAYPAL_SECRET` | PayPal server-side secret |
| `KANDA_API_KEY` | Kanda finance API key |
| `KANDA_BASE` | Kanda API base URL (`https://hub.kanda.co.uk`) |
| `AWS_ACCESS_KEY_ID` | AWS credentials (S3 + SES) |
| `AWS_SECRET_ACCESS_KEY` | AWS credentials (S3 + SES) |
| `NEXT_PUBLIC_AWS_S3_REGION` | `eu-west-2` |
| `NEXT_PUBLIC_AWS_S3_BUCKET_NAME` | `heatingology-joinus` |
| `AWS_FROM_EMAIL` | SES sender (`no-reply@heatingology.co.uk`) |
| `GETADDRESS_API_Key` | getaddress.io key (postcode lookup) |
| `IDEALPOSTCODES_API_KEY` | Ideal Postcodes key (address autocomplete) |
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for internal API calls |
| `NEXT_PUBLIC_DOMAIN` | Public domain (used in payment return URLs) |
| `NEXT_PUBLIC_REVIEW_RATING` | Displayed review rating (Google) |
| `NEXT_PUBLIC_REVIEW_COUNT` | Displayed review count (Google) |
| `NEXT_PUBLIC_CUSTOMISE_SAVING` | Displayed saving % in product customiser |

---

## 6. Local Development Setup

```bash
# 1. Install dependencies
yarn install

# 2. Start the Postgres container (requires Docker)
yarn docker:db

# 3. Run database migrations
npx prisma migrate deploy --schema ./prisma

# 4. Seed initial data
yarn seed:db

# 5. Start the dev server
yarn dev
# App available at http://localhost:3000/home
```

**After any schema change:**
```bash
yarn migrate:db <migration-name>   # create + apply migration
yarn generate:db                   # regenerate Prisma client
```

**Inspect the database interactively:**
```bash
yarn verify:db   # opens Prisma Studio at http://localhost:5555
```

### Adding seed data without wiping the database

`prisma/seedAdditional.ts` lets you insert new products and blogs into an existing database. Unlike `seed:db`, it never deletes records — it skips anything that already exists.

```bash
yarn add:db
```

**To add new products (boilers, heat pumps, etc.):**

1. Create a data file in `prisma/seedData/`, modelled on `boilers.ts`. Each item must include at minimum `brand`, `model`, `productType`, `price`, and `description`.

   ```ts
   // prisma/seedData/newBoilers.ts
   import { ProductType, BoilerType, FuelType, FlueType, HtmlTag } from "@prisma/client";

   export const newBoilers = [{
       brand: "Viessmann",
       model: "Vitodens 100-W",
       productType: ProductType.boiler,
       boilerType: BoilerType.COMBI,
       fuelType: FuelType.GAS,
       flueType: FlueType.HORIZONTAL,
       price: 2950,
       homeowner: true,
       landlord: false,
       warranty: "7 years",
       specs: ["7 years warranty"],
       minBath: 1, maxBath: 1, minBed: 1, maxBed: 3,
       productImage: "/products/boilers/viessmann/main.png",
       productImages: ["/products/boilers/viessmann/main.png"],
       description: [
           { tag: HtmlTag.PARAGRAPH, content: "Description here." }
       ],
   }];
   ```

2. Import and spread it in `prisma/seedAdditional.ts`:

   ```ts
   import { newBoilers } from "./seedData/newBoilers";
   // ...
   const newProducts: NewProduct[] = [
       ...newBoilers,
   ];
   ```

3. Run:
   ```bash
   yarn add:db
   ```

**To add new blog posts:**

1. Create a data file in `prisma/seedData/`, modelled on `blogs.ts`:

   ```ts
   // prisma/seedData/newBlogs.ts
   import { BLOG_CATEGORIES } from "@prisma/client";

   export const newBlogs = [{
       categoryId: BLOG_CATEGORIES.BOILER_GUIDE,
       title: "My New Post",
       content: "<p>Content here.</p>",
       image: "https://assets.heatingology.com/blogs/my-post.png",
   }];
   ```

2. Import and spread it in `prisma/seedAdditional.ts`:

   ```ts
   import { newBlogs } from "./seedData/newBlogs";
   // ...
   const newBlogs: NewBlog[] = [
       ...newBlogs,
   ];
   ```

3. Run:
   ```bash
   yarn add:db
   ```

> Products are matched by `brand` + `model`. Blogs are matched by `title`. Both are skipped if the record already exists. Blog categories are upserted (safe to re-run). `priceWithVat` is computed automatically.

---

## 7. Application Routes

### Marketing / Informational (`(pages)` route group)

| URL | Content |
|---|---|
| `/home` | Homepage |
| `/service/boiler` | Boiler service page |
| `/service/boilerRepair` | Boiler repair page |
| `/service/boilerServicing` | Boiler servicing page |
| `/service/heatPump` | Heat pump page |
| `/service/evCharger` | EV charger page |
| `/company/*` | Company information |
| `/blogs` | Blog listing |
| `/legal/*` | Legal pages |

### Quote Flow (`(quote)` route group)

| URL | Content |
|---|---|
| `/quote/[productType]` | Questionnaire for the selected product type |
| `/packages/[quoteId]` | Matched products for a completed quote |

### Booking Flow (`(steps)` route group)

| URL | Content |
|---|---|
| `/booking/[quoteId]` | Multi-step booking: Contact → Calendar → Checkout |
| `/confirm` | Booking confirmation |
| `/status/[quoteId]` | Payment status (Stripe return URL) |

### Engineer Registration

| URL | Content |
|---|---|
| `/engineerSignup` | Multi-step engineer onboarding form |

---

## 8. API Routes

All API routes live under `src/app/api/`. Response shape: `{ success: boolean, result?: any, error?: string }`.

| Route | Method(s) | Purpose |
|---|---|---|
| `/api/quote` | GET, POST | Create / list quotes |
| `/api/quote/[quoteId]` | GET, PATCH | Fetch / update a quote |
| `/api/quote/confirm` | POST | Confirm a quote (mark as paid) |
| `/api/quote/save` | POST | Save partial quote progress |
| `/api/products` | GET | List all products |
| `/api/products/[productType]` | GET | Products filtered by type |
| `/api/products/search` | GET | Product search |
| `/api/product` | GET | Single product lookup |
| `/api/payments/checkout` | POST | Create a Stripe Checkout session (returns `clientSecret`) |
| `/api/payments/paypal` | POST | Create a PayPal order |
| `/api/payments/kanda` | POST | Create a Kanda finance application |
| `/api/payments/kanda/rates` | GET | Fetch available Kanda finance rates |
| `/api/payments/status` | GET | Check payment status |
| `/api/payments/invoice` | POST | Send invoice email via AWS SES |
| `/api/postcode/search` | GET | Postcode address lookup (Ideal Postcodes) |
| `/api/postcode/autocomplete` | GET | Address autocomplete (Ideal Postcodes) |
| `/api/engineers/signup` | POST | Create engineer + company record |
| `/api/engineers/documents` | POST | Generate S3 presigned URL for document upload |
| `/api/engineers/qualifications` | GET | List engineer qualifications |
| `/api/engineers/company` | GET | Company lookup |
| `/api/survey` | GET, POST | Submit / retrieve surveys |
| `/api/blogs` | GET | Blog posts |
| `/api/blogs/[categoryId]` | GET | Blogs by category |
| `/api/blogs/categories` | GET | Blog categories |

---

## 9. Database Schema (Prisma)

Schema files are in `prisma/schema/` (one file per domain). Migrations are in `prisma/migrations/`.

### Core Models

**Quote** — the central entity. Created when a customer completes a questionnaire. Holds all contact and address details, selected products, payment method, install date/time, and status (`Pending` → `Paid` → `Completed`).

**Product** — catalogue items. Types include `boiler`, `heatPump`, `ev_charger`, `boiler_service`, `boiler_repair`, and several add-on/extra types. Products are matched to quotes based on questionnaire answers.

**Engineer** — registered engineer profile with certification documents (Gas Safe card, CCN, insurance, FGA, DBS) stored as S3 URLs.

**Company** — engineer's company (limited company or sole trader). Each engineer belongs to one company.

**Qualification / QualificationCategory** — engineer qualification tags (Gas Safe, installation abilities, technical abilities).

**Survey** — captures pre-survey data from customers, optionally contact-only.

**Blog / Testimonial / Text** — CMS-style content models.

### Running migrations

```bash
# Development: create a new migration
yarn migrate:db <descriptive-name>

# Production: apply pending migrations (no interactive prompt)
npx prisma migrate deploy --schema ./prisma
```

---

## 10. Feature Flags

A simple in-code feature flag object is defined in `src/lib/_features.ts`:

```typescript
export const featuresFlag = {
    kanda: false,   // Kanda finance option — currently disabled
    blogs: false    // Blog section — currently disabled
}
```

To enable a feature, set the corresponding flag to `true` and redeploy. No external flag service is used.

---

## 11. Payment Integrations

### Stripe
- Uses Stripe Checkout in **custom UI mode** (embedded, not hosted).
- A `clientSecret` is returned from `/api/payments/checkout` and passed to the Stripe JS SDK on the frontend.
- After payment, Stripe redirects to `/status/[quoteId]?session_id=...`.
- API version: `2025-04-30.basil`.

### PayPal
- Standard PayPal JS SDK integration via `@paypal/react-paypal-js`.
- Order created server-side via `/api/payments/paypal`.

### Kanda (Finance)
- Only available for EV charger products (hardcoded `workType: "ev_charger"`).
- Currently **disabled** via feature flag.
- Rates fetched from `https://hub.kanda.co.uk/api/info/rate`.

---

## 12. Email (AWS SES)

Invoice emails are sent via SES from `no-reply@heatingology.co.uk`. The sender address must be verified in the AWS SES console. The HTML template is generated in `src/assets/emails/invoice.ts`.

---

## 13. Testing

### End-to-End Tests (Playwright)
```bash
yarn test:e2e           # headless
yarn test:e2e:headed    # with browser visible
yarn test:e2e:ui        # interactive Playwright UI
```

Tests are in the `e2e/` directory and cover: page loading (`pages.spec.ts`), navigation (`navigation.spec.ts`), link checks (`links.spec.ts`), CTA buttons (`ctas.spec.ts`), and visual regression (`visual.spec.ts`).

**There is no unit or integration test suite.** TypeScript and ESLint errors are intentionally suppressed during builds (`ignoreBuildErrors: true`).

---

## 14. Build Notes

```bash
yarn build        # production build (clears .next + node_modules/.cache first)
```

Build is memory-constrained — the Next.js config sets `cpus: 1` and `workerThreads: false` to avoid OOM on the EC2 instance. Source maps are disabled in production. If the build fails with OOM, use:

```bash
yarn build:debug  # enables memory tracing
```

---

## 15. Key File Locations

| Purpose | Path |
|---|---|
| App entry / root layout | `src/app/layout.tsx` |
| Global providers | `src/app/providers.tsx` |
| Route navigation enum | `src/lib/_nav.ts` |
| Feature flags | `src/lib/_features.ts` |
| Prisma singleton client | `src/lib/prisma.ts` |
| API URL helper | `src/lib/_api.ts` |
| Booking context (state) | `src/app/(steps)/booking/[quoteId]/_context.tsx` |
| Pricing calculations | `src/lib/_calculations.ts` |
| S3 upload helper | `src/lib/_upload.ts` |
| Kanda finance helper | `src/lib/_kanda.ts` |
| Prisma schema root | `prisma/schema/schema.prisma` |
| Seed data script | `prisma/seed.ts` |
| Deploy script | `scripts/deploy.sh` |
| PM2 config | `ecosystem.config.js` |
| Next.js config | `next.config.ts` |
