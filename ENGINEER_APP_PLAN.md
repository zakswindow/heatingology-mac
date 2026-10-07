# Heatingology Engineer Mobile App — Implementation Plan

---

## Overview

A dedicated React Native (Expo) mobile app for Heatingology field engineers. The app connects to the existing Next.js/Prisma/PostgreSQL backend via REST API, follows the Heatingology design system extracted from Figma, and gives engineers everything they need to manage their work from the road.

**Status:** Planning phase — ready to implement  
**Target platform:** iOS + Android (via Expo)  
**Backend:** Existing Heatingology Next.js API (extended with new engineer-facing endpoints)

---

## Design System (from Figma)

These tokens are non-negotiable — every screen must use these exactly.

| Token | Value |
|---|---|
| Brand Primary (Deep Violet) | `#342889` |
| Light Blue (accent bg) | `#D8DFFF` |
| Background Surface | `#F8F8F8` |
| Text Body | `#5B5B5B` |
| Black (headings) | `#000000` |
| White | `#FFFFFF` |
| Border | `#D9D9D9` |
| Border Width | `1px` |

**Typography:**
- Headings → **Baloo 2** SemiBold (24px / line-height 1.3)
- Body text → **Plus Jakarta Sans** Regular (16px / line-height 1.5)
- Taglines/labels → **Roboto** SemiBold (16px)
- Buttons → **Plus Jakarta Sans** SemiBold or Bold (16px)
- Small labels → **Plus Jakarta Sans** SemiBold (14px)

**Component language:**
- Cards: `border-radius: 20px`, white background, 1px `#D9D9D9` border
- Buttons: `border-radius: 40px` (pill), primary fill `#342889`, white text
- Spacing scale: 8 / 16 / 24 / 32 / 40px
- Section padding: 24px horizontal on mobile

---

## Tech Stack

### Mobile App
| Layer | Choice | Reason |
|---|---|---|
| Framework | React Native + Expo SDK 51+ | Cross-platform, fast dev, OTA updates |
| Language | TypeScript | Matches existing codebase |
| Navigation | Expo Router (file-based) | Modern, consistent with Next.js mental model |
| State/Server | TanStack React Query v5 | Already used in web app — same patterns |
| Forms | React Hook Form + Zod | Already used in web app |
| Auth | Expo SecureStore + JWT | Secure token storage on device |
| Maps | react-native-maps + Google Maps SDK | Native maps performance |
| Camera/Files | expo-image-picker, expo-document-picker | Document/photo uploads |
| Push Notifs | Expo Notifications (FCM/APNs) | Job alerts, customer ETA messages |
| Location | expo-location | Real-time engineer location for ETA |
| Styling | StyleSheet + custom theme tokens | No Tailwind (native doesn't support it) |
| Icons | @expo/vector-icons (Ionicons) | Consistent icon set |

### Backend Extensions (to existing Next.js app)
New API routes to add under `/api/engineer-app/`:
- Auth routes (signup, login, verify email, MFA, OAuth)
- Profile management (documents, certificates, address)
- Availability/slot management
- Job management (receive, accept, update status)
- Customer messaging (ETA notifications)
- Photo/document uploads (extending existing S3 logic)

### Third-party Services (reuse existing)
- **AWS S3** — document and photo uploads (already configured)
- **AWS SES** — email verification and notifications (already configured)
- **Google Maps Platform** — directions, geocoding, ETA calculation
- **Firebase** — Google OAuth + push notifications (FCM)
- **Twilio** — SMS for MFA and customer ETA messages (new addition)

---

## Feature Specifications

### Feature 1 — Authentication

**Sign Up (Email/Password + MFA)**
- Engineer enters: email, password (min 8 chars, 1 uppercase, 1 number, 1 special char)
- App sends verification email via AWS SES
- Engineer confirms email via link → account activated
- On next login, MFA code sent to email (or Twilio SMS if phone added)
- TOTP (Google Authenticator) as optional MFA upgrade

**Sign Up / Login via Google (OAuth)**
- Google Sign-In via Firebase Auth
- On first Google login, engineer completes a profile setup wizard
- On subsequent logins, goes directly to dashboard

**Login (returning engineer)**
- Email + password
- If MFA enabled: prompt for code
- JWT stored in Expo SecureStore (not AsyncStorage)
- Auto-refresh token with sliding expiry

**Backend changes needed:**
- New `EngineerAuth` model (or extend `Engineer` with `passwordHash`, `emailVerified`, `mfaEnabled`, `mfaSecret`, `refreshToken`, `googleId`)
- New API: `POST /api/engineer-app/auth/signup`
- New API: `POST /api/engineer-app/auth/login`
- New API: `POST /api/engineer-app/auth/verify-email`
- New API: `POST /api/engineer-app/auth/google`
- New API: `POST /api/engineer-app/auth/mfa/verify`
- New API: `POST /api/engineer-app/auth/refresh`

---

### Feature 2 — Engineer Profile

**Personal info:**
- Full name, title (Mr/Mrs/Ms/Dr), phone, email (read-only after verification)
- Profile photo upload

**Address:**
- Home address (used for calculating job distance)
- Postcode lookup using existing Ideal Postcodes integration

**Certifications & Documents** (all upload to S3, URL stored in DB):
- ✅ Gas Safe Certificate (required)
- ✅ Gas Safe Licence Number
- ✅ DBS Certificate
- ✅ Public Liability Insurance (optional)
- ✅ Employer's Liability Insurance (optional)
- ✅ FGA Certificate (optional)
- ✅ CCN Certificate (optional)
- ✅ Any other trade certificates (multi-upload, labelled by engineer)
- Each document shows: upload date, expiry date (engineer enters), status badge (Valid/Expiring Soon/Expired)

**Profile completion indicator:**
- Progress bar showing % complete
- Prompts for missing mandatory documents
- Admin can see completion status in existing CMS

**Backend changes needed:**
- Extend `Engineer` model with `profilePhotoUrl`, `homeAddress`, `homePostcode`
- Extend `Document` model with `expiryDate`, `label`, `documentType`
- New API: `GET/PUT /api/engineer-app/profile`
- New API: `POST /api/engineer-app/profile/documents`
- New API: `DELETE /api/engineer-app/profile/documents/[id]`

---

### Feature 3 — Availability & Slot Management

**Calendar view:**
- Weekly/monthly calendar showing current availability slots
- Engineer can mark days/time slots as available (green) or unavailable (grey)
- Each slot: date, start time, end time, job type preferences (boiler install / repair / service / EV charger / heat pump)

**Slot release flow:**
- Engineer taps a day → selects time range → selects job types → confirms
- Released slots become visible to admin in the existing CMS
- Engineer can withdraw availability up to 24h before the slot

**Admin visibility:**
- New admin view: "Available Engineers" — shows who's available on a given date, their qualifications, distance from job location

**Backend changes needed:**
- New `EngineerSlot` model: `engineerId`, `date`, `startTime`, `endTime`, `jobTypes[]`, `status` (AVAILABLE / BOOKED / WITHDRAWN)
- New API: `GET/POST /api/engineer-app/slots`
- New API: `DELETE /api/engineer-app/slots/[id]`
- New API: `GET /api/admin/available-engineers?date=&jobType=&postcode=` (for CMS)

---

### Feature 4 — Job Management

**Receiving jobs:**
- Push notification when admin assigns a job
- Notification contains: customer name, job type, address, date/time, payment amount
- Engineer can Accept or Decline within a configurable window (e.g. 2 hours)

**Job list views:**
- **Upcoming** — accepted jobs sorted by date
- **Pending** — jobs awaiting acceptance/decline
- **Completed** — job history with earnings summary
- **Declined** — for engineer's own reference

**Job detail screen:**
- Customer: name, address, contact number (revealed after acceptance)
- Job: type, description, parts included, special instructions from admin
- Photos attached by admin or customer from survey
- Payment: job value, any bonuses noted by admin
- Map preview (tap to open directions)
- Status timeline: Assigned → Accepted → En Route → Arrived → Completed

**Backend changes needed:**
- New `EngineerJob` model linking `Quote`/`Order` to `Engineer` with status tracking
- Or extend existing `Quote` with `engineerId` foreign key + `jobStatus` enum
- New API: `GET /api/engineer-app/jobs`
- New API: `GET /api/engineer-app/jobs/[id]`
- New API: `POST /api/engineer-app/jobs/[id]/accept`
- New API: `POST /api/engineer-app/jobs/[id]/decline`
- New API: `POST /api/engineer-app/jobs/[id]/status` (update job progress)

---

### Feature 5 — Job Photos & Documentation

**On-site uploads:**
- Before photos (condition of existing equipment)
- After photos (completed installation/repair)
- Gas certificate / completion certificate upload per job
- Engineer can add notes per photo

**Upload flow:**
- Tap camera icon → choose: take photo / pick from library / upload PDF
- Photos uploaded to S3 under `jobs/{jobId}/engineer/`
- Admin can see all uploads in existing CMS order view

**Backend changes needed:**
- New `JobPhoto` model: `jobId`, `engineerId`, `url`, `type` (BEFORE/AFTER/CERTIFICATE/OTHER), `caption`, `uploadedAt`
- New API: `POST /api/engineer-app/jobs/[id]/photos`
- New API: `GET /api/engineer-app/jobs/[id]/photos`
- New API: `DELETE /api/engineer-app/jobs/[id]/photos/[photoId]`

---

### Feature 6 — Google Maps & Navigation

**Map integration:**
- Job detail screen shows map with customer property pinned
- "Get Directions" button opens turn-by-turn navigation in Google Maps app (deep link) or within-app via `react-native-maps`
- Distance and estimated drive time shown on job card

**Auto-routing:**
- App uses current GPS location to calculate route to customer
- Engineer can view multiple jobs on a map for day planning

**Backend changes needed:**
- Store `lat`/`lng` on `Quote` (geocode from customer address using Google Geocoding API)
- New API: `GET /api/engineer-app/jobs/[id]/route` — returns geocoded customer address

---

### Feature 7 — Customer ETA Notifications

**"On My Way" flow:**
- Engineer taps "I'm on my way" on job detail screen
- App calculates current ETA using Google Directions API
- Customer receives: SMS (Twilio) + email (AWS SES) with engineer's name and ETA
- Message: *"Good news! Your Heatingology engineer [Name] is on their way and should arrive by [Time]. Track your appointment reference: [REF]"*

**ETA update:**
- If engineer is delayed, they can send an updated ETA
- Customer receives updated message

**Backend changes needed:**
- New API: `POST /api/engineer-app/jobs/[id]/on-my-way` — triggers Twilio SMS + SES email to customer
- Store `onMyWayAt`, `estimatedArrival` on job record
- New env vars: `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_FROM_NUMBER`

---

### Feature 8 — Additional Suggested Features

These are strongly recommended additions based on engineer workflow needs:

**8a. Earnings Dashboard**
- Weekly/monthly earnings summary
- Breakdown by job type
- Upcoming payment schedule
- Export to PDF for tax records

**8b. In-App Messaging (Engineer ↔ Admin)**
- Simple chat thread per job
- Admin can send instructions, clarifications, parts info
- Engineer can ask questions before arriving on site
- Push notifications for new messages

**8c. Job Completion Report**
- Structured end-of-job form: work completed, parts used, time on site, any follow-up needed
- Generates a PDF completion report auto-sent to customer and admin
- Customer signature capture on mobile (drawn on screen)

**8d. Parts & Equipment Requests**
- Engineer can flag if additional parts are needed mid-job
- Admin notified in CMS with part name/number
- Reduces delays caused by missing parts

**8e. Certificate Expiry Alerts**
- App alerts engineer 30/14/7 days before any certificate expires
- Push notification + banner on dashboard
- Admin also notified so compliance is maintained

**8f. Offline Mode**
- Job details cached locally for areas with poor signal
- Photos queued for upload when connectivity restored
- Critical for engineers working in basements or rural areas

**8g. Emergency Contact / Safety Check-In**
- Engineer can flag a job as "In progress" with a time-based check-in
- If they don't check in by expected completion + 30 mins, admin is alerted
- Lone worker safety feature (important for UK Gas Safe regulations)

**8h. Customer Feedback Collection**
- After job completion, a short link is sent to customer for a 5-star review
- Ratings visible on engineer's profile in admin CMS
- Top-rated engineers can be prioritised for bookings

**8i. Training & Compliance Hub**
- Section showing required qualifications for different job types
- Links to Gas Safe renewal, OFTEC, etc.
- Reminders for CPD (Continuing Professional Development)

**8j. Dark Mode**
- Full dark mode support using the brand palette adapted for dark backgrounds
- Engineer-friendly for early morning / late evening work

---

## App Screen Map

```
App (Expo Router)
├── (auth)/
│   ├── welcome.tsx           # Splash / welcome screen
│   ├── login.tsx             # Email + password login
│   ├── signup.tsx            # Registration form
│   ├── verify-email.tsx      # Email verification waiting screen
│   ├── mfa.tsx               # MFA code entry
│   └── forgot-password.tsx   # Password reset
│
├── (app)/                    # Protected — requires auth
│   ├── _layout.tsx           # Tab navigation (Home, Jobs, Calendar, Profile)
│   │
│   ├── home/
│   │   └── index.tsx         # Dashboard: upcoming jobs, earnings snapshot, alerts
│   │
│   ├── jobs/
│   │   ├── index.tsx         # Job list (Upcoming / Pending / Completed tabs)
│   │   ├── [id]/
│   │   │   ├── index.tsx     # Job detail: customer info, map, status actions
│   │   │   ├── photos.tsx    # Upload before/after photos
│   │   │   ├── report.tsx    # Completion report form
│   │   │   └── messages.tsx  # Job-specific chat with admin
│   │   └── map.tsx           # Map view of all today's jobs
│   │
│   ├── calendar/
│   │   ├── index.tsx         # Availability calendar
│   │   └── slot-editor.tsx   # Add/edit availability slot
│   │
│   ├── earnings/
│   │   └── index.tsx         # Earnings dashboard + history
│   │
│   └── profile/
│       ├── index.tsx         # Profile overview + completion progress
│       ├── personal.tsx      # Edit personal info + address
│       ├── documents/
│       │   ├── index.tsx     # Document list with status badges
│       │   └── upload.tsx    # Upload new document
│       └── settings.tsx      # Notifications, MFA, password change, logout
```

---

## Backend API Extensions (New Routes)

All new routes live under `/api/engineer-app/` to avoid conflicts with existing admin routes.

### Authentication
| Method | Route | Description |
|---|---|---|
| POST | `/api/engineer-app/auth/signup` | Register with email/password |
| POST | `/api/engineer-app/auth/login` | Login, returns JWT pair |
| POST | `/api/engineer-app/auth/logout` | Invalidate refresh token |
| GET | `/api/engineer-app/auth/verify-email` | Email verification callback |
| POST | `/api/engineer-app/auth/refresh` | Refresh access token |
| POST | `/api/engineer-app/auth/google` | Google OAuth login |
| POST | `/api/engineer-app/auth/mfa/setup` | Enable TOTP MFA |
| POST | `/api/engineer-app/auth/mfa/verify` | Verify MFA code |
| POST | `/api/engineer-app/auth/password-reset` | Request password reset |

### Profile
| Method | Route | Description |
|---|---|---|
| GET | `/api/engineer-app/profile` | Get own profile |
| PUT | `/api/engineer-app/profile` | Update personal info |
| POST | `/api/engineer-app/profile/photo` | Upload profile photo |
| GET | `/api/engineer-app/profile/documents` | List all documents |
| POST | `/api/engineer-app/profile/documents` | Upload new document |
| PUT | `/api/engineer-app/profile/documents/[id]` | Update document metadata |
| DELETE | `/api/engineer-app/profile/documents/[id]` | Remove document |

### Availability
| Method | Route | Description |
|---|---|---|
| GET | `/api/engineer-app/slots` | Get own slots (date range) |
| POST | `/api/engineer-app/slots` | Create availability slot |
| PUT | `/api/engineer-app/slots/[id]` | Edit slot |
| DELETE | `/api/engineer-app/slots/[id]` | Withdraw slot |

### Jobs
| Method | Route | Description |
|---|---|---|
| GET | `/api/engineer-app/jobs` | List jobs (filter by status) |
| GET | `/api/engineer-app/jobs/[id]` | Job detail |
| POST | `/api/engineer-app/jobs/[id]/accept` | Accept a job |
| POST | `/api/engineer-app/jobs/[id]/decline` | Decline a job |
| POST | `/api/engineer-app/jobs/[id]/status` | Update job status |
| POST | `/api/engineer-app/jobs/[id]/on-my-way` | Trigger customer ETA notification |
| POST | `/api/engineer-app/jobs/[id]/complete` | Mark job complete + submit report |
| GET | `/api/engineer-app/jobs/[id]/photos` | Get job photos |
| POST | `/api/engineer-app/jobs/[id]/photos` | Upload job photo |
| DELETE | `/api/engineer-app/jobs/[id]/photos/[photoId]` | Delete job photo |

### Earnings
| Method | Route | Description |
|---|---|---|
| GET | `/api/engineer-app/earnings` | Earnings summary (weekly/monthly) |
| GET | `/api/engineer-app/earnings/history` | Paginated job payment history |

### Messaging
| Method | Route | Description |
|---|---|---|
| GET | `/api/engineer-app/jobs/[id]/messages` | Get job messages |
| POST | `/api/engineer-app/jobs/[id]/messages` | Send message |

---

## Database Schema Changes

```prisma
// New model: Engineer authentication
model EngineerAuth {
  id              String    @id @default(cuid())
  engineerId      String    @unique
  engineer        Engineer  @relation(fields: [engineerId], references: [id])
  email           String    @unique
  passwordHash    String?
  googleId        String?   @unique
  emailVerified   Boolean   @default(false)
  mfaEnabled      Boolean   @default(false)
  mfaSecret       String?   // TOTP secret (encrypted)
  refreshToken    String?
  lastLoginAt     DateTime?
  createdAt       DateTime  @default(now())
  updatedAt       DateTime  @updatedAt
}

// New model: Availability slots
model EngineerSlot {
  id          String        @id @default(cuid())
  engineerId  String
  engineer    Engineer      @relation(fields: [engineerId], references: [id])
  date        DateTime
  startTime   String        // "09:00"
  endTime     String        // "17:00"
  jobTypes    ProductType[]
  status      SlotStatus    @default(AVAILABLE)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}

enum SlotStatus {
  AVAILABLE
  BOOKED
  WITHDRAWN
}

// New model: Job photos
model JobPhoto {
  id         String        @id @default(cuid())
  quoteId    String
  engineerId String
  url        String
  type       JobPhotoType
  caption    String?
  uploadedAt DateTime      @default(now())
}

enum JobPhotoType {
  BEFORE
  AFTER
  CERTIFICATE
  PARTS
  OTHER
}

// New model: Job messages
model JobMessage {
  id         String      @id @default(cuid())
  quoteId    String
  senderId   String
  senderType MessageSenderType
  content    String
  sentAt     DateTime    @default(now())
  readAt     DateTime?
}

enum MessageSenderType {
  ENGINEER
  ADMIN
}

// Extend Engineer model
// Add to existing Engineer:
// profilePhotoUrl  String?
// homeAddress      String?
// homePostcode     String?
// homeLat          Float?
// homeLng          Float?

// Extend Quote model
// Add to existing Quote:
// engineerJobStatus  EngineerJobStatus @default(PENDING)
// onMyWayAt          DateTime?
// estimatedArrival   DateTime?
// completedAt        DateTime?
// completionNotes    String?

enum EngineerJobStatus {
  PENDING     // Assigned by admin, awaiting engineer response
  ACCEPTED    // Engineer confirmed
  DECLINED    // Engineer declined
  EN_ROUTE    // Engineer tapped "On my way"
  ARRIVED     // Engineer tapped "I've arrived"
  COMPLETED   // Job done
}
```

---

## Implementation Phases (for Claude)

### Phase 1 — Foundation & Auth (Week 1–2)
**Goal:** Working app shell with full authentication flow

1. Initialise Expo project: `npx create-expo-app heatingology-engineer --template expo-template-blank-typescript`
2. Install core dependencies: expo-router, @tanstack/react-query, react-hook-form, zod, expo-secure-store, @expo/vector-icons
3. Set up theme tokens file (`src/theme/colors.ts`, `src/theme/typography.ts`, `src/theme/spacing.ts`) from Figma design system
4. Build shared components: `Button`, `Card`, `Input`, `Badge`, `Avatar`, `LoadingSpinner`
5. Build auth screens: Welcome, Login, Signup, Verify Email, MFA, Forgot Password
6. Backend: Add `EngineerAuth` model to Prisma schema + run migration
7. Backend: Implement all `/api/engineer-app/auth/*` routes
8. Backend: Add JWT middleware for engineer-app routes
9. Implement Google OAuth via Firebase SDK
10. Implement MFA: TOTP setup + email OTP fallback
11. Set up Expo push notification tokens + store in DB

**Deliverable:** Engineer can sign up, verify email, MFA login, and reach an empty dashboard.

---

### Phase 2 — Profile & Documents (Week 3)
**Goal:** Engineer can complete their profile and upload all certifications

1. Build profile screens: overview, personal info editor, address with postcode lookup
2. Build document list screen with status badges (Valid/Expiring/Expired)
3. Build document upload flow (camera + file picker + PDF support)
4. Connect to AWS S3 for uploads (reuse existing S3 config)
5. Backend: Extend `Engineer` model with new profile fields
6. Backend: Implement all `/api/engineer-app/profile/*` routes
7. Implement certificate expiry alerts (local notifications via expo-notifications)
8. Profile completion progress bar component

**Deliverable:** Engineer can fully populate their profile and upload all required documents.

---

### Phase 3 — Availability Calendar (Week 4)
**Goal:** Engineers can release and manage their availability slots

1. Build calendar component (weekly view default, monthly toggle)
2. Build slot editor screen (date, time range, job type checkboxes)
3. Backend: Add `EngineerSlot` model + migration
4. Backend: Implement `/api/engineer-app/slots` routes
5. Backend: Update admin CMS to surface available engineers for a given date/job type
6. Slot conflict detection (prevent overlapping slots)
7. 24h withdrawal deadline enforcement

**Deliverable:** Admin can see engineer availability in CMS; engineers can manage their calendar.

---

### Phase 4 — Jobs (Week 5–6)
**Goal:** Full job lifecycle from notification to completion

1. Configure push notifications for new job assignments
2. Build job list screen with Upcoming/Pending/Completed/Declined tabs
3. Build job detail screen with full info, status timeline, action buttons
4. Build accept/decline flow with confirmation dialog
5. Backend: Add `EngineerJobStatus` enum to `Quote` model + migration
6. Backend: Implement all `/api/engineer-app/jobs/*` routes
7. Backend: Add webhook/trigger when admin assigns engineer (sends push notification)
8. Job status update flow (En Route → Arrived → Completed)

**Deliverable:** Engineers receive job notifications and can manage the full job lifecycle.

---

### Phase 5 — Maps & Navigation (Week 7)
**Goal:** In-app maps and one-tap directions

1. Install `react-native-maps` + configure Google Maps SDK (iOS + Android API keys)
2. Build map view on job detail screen (customer pin, engineer current location)
3. "Get Directions" button: deep-link to Google Maps app with pre-filled destination
4. All-jobs map view: pins for today's jobs
5. Backend: Geocode customer addresses using Google Geocoding API, store lat/lng on `Quote`
6. ETA calculation using Google Directions API
7. Request foreground location permission with clear explanation

**Deliverable:** Engineers can see customer locations on a map and tap to get directions.

---

### Phase 6 — Customer ETA & Messaging (Week 8)
**Goal:** Customer communication and engineer-admin messaging

1. "I'm On My Way" button triggers ETA notification flow
2. Backend: Integrate Twilio for SMS to customer
3. Backend: Use existing AWS SES for email ETA to customer
4. ETA update flow (if engineer is running late)
5. Build in-app messaging screen per job (engineer ↔ admin)
6. Backend: Add `JobMessage` model + implement messaging API
7. Push notifications for new messages

**Deliverable:** Customers get automated ETA messages; engineers can message admin per job.

---

### Phase 7 — Photos, Reports & Earnings (Week 9)
**Goal:** Job documentation and financial visibility

1. Build photo upload screen per job (before/after/certificate)
2. Camera + image picker integration
3. Build job completion report form
4. Customer signature capture screen
5. Auto-generate PDF completion report (using existing PDF skill)
6. Build earnings dashboard: weekly/monthly totals, job history
7. Backend: Add `JobPhoto` model + `JobMessage` model + migrations
8. Backend: Implement earnings aggregation API

**Deliverable:** Engineers can document jobs completely and see their earnings history.

---

### Phase 8 — Polish & Testing (Week 10)
**Goal:** Production-ready quality

1. Offline mode: cache job details with AsyncStorage, queue photo uploads
2. Dark mode support using React Native's `useColorScheme`
3. Emergency check-in / lone worker safety feature
4. Accessibility audit (screen reader labels, tap target sizes)
5. Performance optimisation (image lazy loading, list virtualisation)
6. End-to-end testing with Detox or Maestro
7. TestFlight (iOS) + Google Play Internal Testing track setup
8. App Store metadata, screenshots, privacy policy

**Deliverable:** App submitted to both stores for review.

---

## Environment Variables Required (new additions)

```env
# Engineer App JWT
ENGINEER_JWT_SECRET=
ENGINEER_JWT_REFRESH_SECRET=
ENGINEER_JWT_EXPIRES_IN=15m
ENGINEER_JWT_REFRESH_EXPIRES_IN=30d

# Google OAuth (Firebase)
FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=

# Google Maps
GOOGLE_MAPS_API_KEY=
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=

# Twilio (customer SMS)
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
TWILIO_FROM_NUMBER=

# Expo Push
EXPO_ACCESS_TOKEN=
```

---

## Key Decisions & Rationale

| Decision | Choice | Why |
|---|---|---|
| Framework | React Native + Expo | Fastest path, cross-platform, matches existing React skills |
| Navigation | Expo Router | File-based like Next.js — consistent mental model |
| Auth token storage | Expo SecureStore | Encrypted on-device — NOT AsyncStorage (insecure) |
| Maps | react-native-maps + Google Maps | Native performance, supports deep-linking to Google Maps |
| Push notifications | Expo + FCM/APNs | Handles both platforms without separate SDKs |
| SMS | Twilio | Most reliable for UK numbers, easy integration |
| Document storage | Existing AWS S3 | Reuse infrastructure, no additional cost |
| API auth | JWT (not cookies) | Mobile-friendly, stateless, works offline |
| Offline support | AsyncStorage cache + upload queue | Engineers may be in poor-signal areas |

---

## What Claude Needs to Implement (Step-by-Step Instructions)

When you're ready to start building, give Claude these instructions per phase:

### Starting Phase 1:
> "Implement Phase 1 of the Heatingology Engineer app. Create the Expo project structure, set up the theme tokens from the design system in ENGINEER_APP_PLAN.md, build the shared component library (Button, Card, Input, Badge), and build all auth screens. Use the exact brand colors: Deep Violet #342889, Light Blue #D8DFFF, Background #F8F8F8. Fonts: Baloo 2 for headings, Plus Jakarta Sans for body. Add the new EngineerAuth Prisma model and implement all /api/engineer-app/auth/* routes in the existing Next.js app."

### Starting each subsequent phase:
> "Implement Phase [N] of the Heatingology Engineer app as described in ENGINEER_APP_PLAN.md. The Phase [N-1] code is in [location]. Continue from there."

---

*Plan generated: 2026-05-17*  
*Design system sourced from Figma: https://www.figma.com/design/vSIUauRic7W66WpznTpEit/*  
*Backend reference: Heatingology Next.js app (this repository)*
