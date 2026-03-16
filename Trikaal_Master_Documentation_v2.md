TRIKAAL  ◈  Master Documentation v2.0		MongoDB Atlas + Admin Dashboard

ॐ

**TRIKAAL**

*A Modern Approach to Vedic Science*

**MASTER DOCUMENTATION PACKAGE  v2.0**

|**Property**|**Value**|
| :- | :- |
|Documents Included|PRD · BRD · Design Preferences · Build Workflow · AI Prompt|
|Project|Trikaal Vedic Sciences — 3D Website + Admin Dashboard|
|Database|MongoDB Atlas (Cloud) — All Collections Documented|
|Admin Panel|Advanced Dashboard — Enquiries, Pricing CMS, Services CMS, Analytics|
|Framework|Next.js 14 App Router · TypeScript|
|3D Engine|Three.js · @react-three/fiber · @react-three/drei|
|Animation|GSAP 3 · ScrollTrigger|
|Styling|Tailwind CSS · Shadcn/ui (Admin)|
|Auth (Admin)|NextAuth.js v5 · MongoDB Adapter|
|Hosting|Firebase Hosting · Cloud Functions (SSR)|
|Dev Environment|Google IDX|
|Currency Display|AED & INR — Dynamic from DB|
|Version|2\.0 — MongoDB Atlas Edition|





**SECTION 01**

**Product Requirements Document**

*PRD — What the product must do*

**1. Product Requirements Document (PRD)**

**1.1 Product Vision**

Trikaal is a premium Vedic Sciences consultancy. The digital product is a full-stack web application consisting of: (1) a public-facing immersive 3D website for client acquisition, and (2) a private admin dashboard connected to MongoDB Atlas for managing all data including enquiries, pricing, and service content.

|<p>**🎯  Vision Statement:**</p><p>Make Trikaal the most trusted and visually distinctive Vedic consultancy online — combining ancient wisdom with cutting-edge 3D web technology and a data-driven admin backend.</p>|
| :- |

**1.2 Product Goals**

- **G-01:**  Convert website visitors into paid consultation bookings via enquiry form.
- **G-02:**  Enable Smeet to manage all enquiries, services, and pricing from a single admin dashboard.
- **G-03:**  Store all form submissions securely in MongoDB Atlas with full CRUD admin capability.
- **G-04:**  Deliver a memorable 3D mandala experience that communicates brand premium-ness.
- **G-05:**  Provide dual-currency pricing (AED + INR) sourced dynamically from the database.

**1.3 Target Users**

**1.3.1 Public Website Users**

|**Persona**|**Description**|**Priority**|
| :- | :- | :- |
|Seekers|Individuals 16+ seeking life guidance — love, career, health, finance|High Volume|
|NRI / Diaspora|Indians in UAE and globally, comfortable with AED or INR|High Value|
|Business Owners|Commercial Vastu clients in Gujarat or UAE|High Value|
|Couples|Partners seeking marriage and family harmony|Medium Volume|
|First-time Visitors|Curious explorers discovering Vedic sciences|Awareness|

**1.3.2 Admin Dashboard Users**

|**User**|**Permissions**|**Role**|
| :- | :- | :- |
|Smeet (Owner)|Full access — all dashboard features, settings, user management|Super Admin|
|Assistant (future)|Can view and update enquiries, cannot edit pricing or services|Editor|

**1.4 Feature Requirements**

**1.4.1 Public Website Features**

|**ID**|**Feature**|**Priority**|**Tier**|
| :- | :- | :- | :- |
|FR-01|Rotating 3D mandala on hero — Three.js icosahedron + torus + particles|P0|Must Have|
|FR-02|Sanskrit mantra block — Devanagari, Roman, English meaning|P0|Must Have|
|FR-03|Service section — Trikaal Astrology, Vastu, Trikaal Vastu tab switcher|P0|Must Have|
|FR-04|Dual currency pricing — AED + INR fetched from MongoDB pricing collection|P0|Must Have|
|FR-05|Enquiry form — all fields, Zod validation, POST to API → MongoDB|P0|Must Have|
|FR-06|WhatsApp deep-link CTA on all pages|P0|Must Have|
|FR-07|Who Can Apply section — eligibility, confidentiality, global reach|P0|Must Have|
|FR-08|Meet Smeet section — credentials, languages, stats|P0|Must Have|
|FR-09|GSAP scroll animations — staggered entrance, mandala scroll scale|P1|Should Have|
|FR-10|WebGL fallback — CSS SVG mandala for non-WebGL browsers|P1|Should Have|
|FR-11|Loading screen — animated Om + progress bar|P1|Should Have|
|FR-12|Mobile-first responsive layout, hamburger nav|P0|Must Have|

**1.4.2 Admin Dashboard Features**

|**ID**|**Feature**|**Priority**|**Tier**|
| :- | :- | :- | :- |
|AD-01|Secure login — NextAuth.js, email + password, session-based|P0|Must Have|
|AD-02|Dashboard home — KPI cards (total enquiries, new today, by service, by status)|P0|Must Have|
|AD-03|Enquiries table — sortable, filterable, paginated, search by name/email/service|P0|Must Have|
|AD-04|Enquiry detail view — full submission, status change (New/In Progress/Booked/Closed)|P0|Must Have|
|AD-05|Enquiry notes — internal notes per enquiry, timestamped|P1|Should Have|
|AD-06|Export enquiries — CSV download with date range filter|P1|Should Have|
|AD-07|Pricing CMS — edit all AED prices; INR auto-calculated; changes live immediately|P0|Must Have|
|AD-08|Services CMS — edit service descriptions, topics, requirements from dashboard|P1|Should Have|
|AD-09|Analytics page — enquiries over time chart, conversion by service type, by country|P1|Should Have|
|AD-10|Settings — WhatsApp number, email recipient, exchange rate, site metadata|P1|Should Have|
|AD-11|Admin user management — add/remove admin users|P2|Nice to Have|
|AD-12|Email notifications — auto-email to Smeet on new enquiry submission|P0|Must Have|

**1.5 Non-Functional Requirements**

|**Requirement**|**Specification**|
| :- | :- |
|Performance|LCP < 2.5s on 4G mobile. 3D canvas async-loaded. Admin dashboard initial load < 1.5s.|
|Security|Admin routes protected by NextAuth session middleware. MongoDB credentials via env vars only. No PII in client bundle. Rate-limit form API (10 req/min/IP).|
|Scalability|MongoDB Atlas M0 free tier for launch; upgrade path to M10 for >1,000 enquiries/month.|
|Availability|Firebase Hosting SLA 99.95%. MongoDB Atlas M0 shared; upgrade for SLA guarantee.|
|Accessibility|WCAG 2.1 AA — keyboard navigable admin dashboard, ARIA on all form elements.|
|SEO|Next.js SSG for all public pages. JSON-LD LocalBusiness schema. Dynamic OG tags.|
|Data Retention|Enquiries stored indefinitely in Atlas. Soft-delete (isArchived flag) — no hard deletes.|
|Backup|MongoDB Atlas automatic daily backups (M2+ tier) or manual export via admin CSV.|





**SECTION 02**

**Business Requirements Document**

*BRD — Why the product exists*

**2. Business Requirements Document (BRD)**

**2.1 Business Context**

Trikaal operates in the Vedic Sciences consultancy market, serving clients across Gujarat (India) and UAE. The business currently relies on referrals. A premium website + admin system is needed to: scale client acquisition, professionalize the booking process, and give Smeet full operational control over enquiries and content without requiring a developer for day-to-day changes.

**2.2 Business Objectives**

1. Increase qualified consultation bookings by establishing a professional digital presence.
1. Enable Smeet to independently manage all enquiries, pricing, and service content via admin dashboard.
1. Build client trust through premium 3D design, credential display, and confidentiality assurance.
1. Serve dual-market pricing (UAE in AED, India in INR) dynamically from a single database.
1. Capture all enquiry data in MongoDB Atlas for business intelligence and follow-up tracking.
1. Reduce enquiry response time by receiving instant email alerts on new form submissions.

**2.3 Stakeholders & Responsibilities**

|**Stakeholder**|**Role**|**Responsibility**|
| :- | :- | :- |
|Smeet|Business Owner / Super Admin|Content, pricing, enquiry management, final sign-off|
|Web Developer|Technical Implementer|Build website, admin dashboard, MongoDB integration|
|Design Lead|Visual Designer|3D mandala assets, colour system, UI component library|
|MongoDB Atlas|Database Platform|Data storage, backups, connection management|
|Firebase / Google|Hosting Platform|CDN, HTTPS, serverless functions for SSR|
|Resend / SMTP|Email Service|Transactional email notifications on new enquiries|

**2.4 Business Rules**

- **BR-01:**  All public prices are stored in AED in MongoDB. INR is calculated as AED × exchange\_rate (stored in settings collection). Exchange rate must be updatable from admin dashboard.
- **BR-02:**  Urgent tier pricing (1 working day) is stored as a separate price set in MongoDB — not calculated. Admin can update independently.
- **BR-03:**  In-person consultations are only available in Gujarat, India and UAE. This restriction is stored as a geo\_availability field in the services collection and must display on the website.
- **BR-04:**  Client information is confidential. Enquiry data in MongoDB must never be exposed to any public API endpoint. Only authenticated admin sessions can read enquiry data.
- **BR-05:**  Minimum client age is 16+ for Trikaal Astrology. This must be validated at form level and stored in the enquiry record.
- **BR-06:**  Trikaal Vastu includes an additional AED 150 per person chart. This surcharge is stored as extra\_per\_person\_aed in the trikaalVastu pricing document.
- **BR-07:**  Fees are per person (astrology) and per property (Vastu). This rule is stored in the pricing documents as fee\_unit field ("per\_person" | "per\_property").
- **BR-08:**  Every enquiry must be assigned a status on creation: "new". Admin must be able to progress it through: new → in\_progress → booked → completed → closed.
- **BR-09:**  Smeet must receive an email notification within 60 seconds of a new enquiry being submitted.
- **BR-10:**  No hard-deletes in the database. All records use soft-delete with isArchived: true flag.

**2.5 Full Pricing Reference**

|<p>**💰  Pricing Source:**</p><p>All prices below are the initial seed data for MongoDB. The admin can update all values via the Pricing CMS dashboard. INR = AED × 22.5 (initial exchange rate).</p>|
| :- |

**Trikaal Astrology Pricing**

|**Format**|**Tier**|**AED**|**INR**|
| :- | :- | :- | :- |
|Audio Call 30 min|Regular|AED 150|INR 3,375|
|Audio Call 60 min|Regular|AED 250|INR 5,625|
|Video Call 30 min|Regular|AED 300|INR 6,750|
|Video Call 60 min|Regular|AED 550|INR 12,375|
|In-Person Meet|Regular|AED 1,000|INR 22,500|
|Audio Call 30 min|Urgent|AED 250|INR 5,625|
|Audio Call 60 min|Urgent|AED 350|INR 7,875|
|Video Call 30 min|Urgent|AED 500|INR 11,250|
|Video Call 60 min|Urgent|AED 700|INR 15,750|
|In-Person Meet|Urgent|AED 1,500|INR 33,750|

**Vastu & Trikaal Vastu Pricing**

|**Type**|**Service**|**AED**|**INR**|
| :- | :- | :- | :- |
|Residential On-site|Vastu|AED 7,000|INR 1,57,500|
|Commercial On-site|Vastu|AED 10,000|INR 2,25,000|
|Residential Online|Vastu|AED 5,000|INR 1,12,500|
|Commercial Online|Vastu|AED 7,000|INR 1,57,500|
|Residential On-site|Trikaal Vastu|AED 7,000 + AED 150/person|INR 1,57,500+|
|Commercial On-site|Trikaal Vastu|AED 10,000 + AED 150/owner|INR 2,25,000+|
|Residential Online|Trikaal Vastu|AED 5,000 + AED 150/person|INR 1,12,500+|
|Commercial Online|Trikaal Vastu|AED 7,000 + AED 150/owner|INR 1,57,500+|





**SECTION 03**

**MongoDB Atlas Architecture**

*Database design, collections & schemas*

**3. MongoDB Atlas — Database Architecture**

**3.1 Atlas Setup**

1. Go to cloud.mongodb.com → Create a free account or sign in.
1. Create a new Project: "trikaal-prod".
1. Create a Cluster: M0 Free Tier → Region: Mumbai (ap-south-1) for India, or Frankfurt for UAE-primary.
1. Create a Database User: username "trikaal\_app" — strong auto-generated password. Role: readWrite on trikaal\_db.
1. Add IP Access: 0.0.0.0/0 for development (restrict to Firebase server IPs in production).
1. Get Connection String: Drivers → Node.js → Copy URI. Store in .env.local as MONGODB\_URI.

|<p>**🔐  Security:**</p><p>Never commit MONGODB\_URI to git. Use .env.local for development and Google IDX Secrets / Firebase environment config for production. Rotate the DB password every 90 days.</p>|
| :- |

**3.2 Database & Collections Overview**

Database name: trikaal\_db

|**Collection**|**Purpose**|
| :- | :- |
|enquiries|All client enquiry/booking form submissions from the public website|
|pricing|All service pricing data — aed amounts, fee units, tier labels|
|services|Service descriptions, topic lists, requirements, availability info|
|settings|Site-wide config — exchange rate, WhatsApp number, email, metadata|
|admin\_users|Admin dashboard user accounts — managed by NextAuth.js|
|admin\_sessions|NextAuth.js session tokens — auto-managed, TTL indexed|
|enquiry\_notes|Internal notes added by admin per enquiry — separate collection|
|analytics\_events|Custom event log — page views, form starts, CTA clicks (optional)|

**3.3 Collection Schemas**

**3.3.1 enquiries Collection**

This is the most critical collection. Every field from the public booking form is stored here.

// enquiries — MongoDB document schema (TypeScript interface)

{

`  `\_id: ObjectId,                      // Auto-generated by MongoDB

`  `enquiry\_id: string,                  // Human-readable: "TRK-2024-0001"



`  `// ── Client Details ─────────────────────────────────────────

`  `full\_name: string,                   // Required

`  `email: string,                       // Required, validated

`  `whatsapp: string,                    // Required, with country code

`  `preferred\_language: "english" | "hindi" | "gujarati",



`  `// ── Service Selection ───────────────────────────────────────

`  `service\_type: "trikaal\_astrology" | "vastu" | "trikaal\_vastu",

`  `consultation\_mode: "audio" | "video" | "in\_person",

`  `duration\_minutes: 30 | 60 | null,    // null for in\_person / vastu

`  `tier: "regular" | "urgent",



`  `// ── Birth Details (Astrology only) ──────────────────────────

`  `birth\_date: string | null,           // "YYYY-MM-DD"

`  `birth\_time: string | null,           // "HH:MM"

`  `birth\_city: string | null,

`  `gender: "male" | "female" | "other" | null,

`  `age\_confirmed\_16\_plus: boolean,



`  `// ── Property Details (Vastu only) ───────────────────────────

`  `property\_type: "residential" | "commercial" | null,

`  `property\_location: string | null,    // City / country

`  `num\_residents: number | null,        // For Trikaal Vastu chart surcharge



`  `// ── Message ────────────────────────────────────────────────

`  `message: string,                     // Free text, max 1000 chars



`  `// ── Admin / Status ──────────────────────────────────────────

`  `status: "new" | "in\_progress" | "booked" | "completed" | "closed",

`  `assigned\_to: string | null,          // Admin user email

`  `source\_country: string | null,       // From IP geo-detection

`  `utm\_source: string | null,           // Marketing tracking



`  `// ── Timestamps ─────────────────────────────────────────────

`  `created\_at: Date,                    // ISODate — indexed

`  `updated\_at: Date,

`  `is\_archived: boolean,                // Soft delete flag

}

**Indexes on enquiries:**

- **created\_at:**  descending — for "newest first" sorting in admin dashboard
- **status:**  for filtering by status in admin
- **service\_type:**  for analytics grouping
- **email:**  for duplicate detection and client lookup
- **is\_archived:**  to efficiently filter out soft-deleted records

**3.3.2 pricing Collection**

// pricing — one document per service type

{

`  `\_id: ObjectId,

`  `service\_key: "trikaal\_astrology" | "vastu" | "trikaal\_vastu",  // unique

`  `service\_label: string,              // Display name: "Trikaal Astrology"

`  `fee\_unit: "per\_person" | "per\_property",

`  `extra\_per\_person\_aed: number | null, // 150 for trikaal\_vastu, else null



`  `tiers: [

`    `{

`      `tier\_key: "regular" | "urgent",

`      `tier\_label: "Regular (5 working days)" | "Urgent (1 working day)",

`      `items: [

`        `{

`          `key: string,               // e.g. "audio\_30"

`          `label: string,             // e.g. "Audio Call — 30 min"

`          `mode: "audio" | "video" | "in\_person" | "online" | "onsite",

`          `type: "residential" | "commercial" | null,

`          `price\_aed: number,

`          `available\_locations: string[], // ["Gujarat, India", "UAE", "Worldwide"]

`        `}

`      `]

`    `}

`  `],



`  `updated\_at: Date,

`  `updated\_by: string,                // Admin email who last changed price

}

**3.3.3 services Collection**

// services — one document per service

{

`  `\_id: ObjectId,

`  `service\_key: "trikaal\_astrology" | "vastu" | "trikaal\_vastu",

`  `display\_name: string,

`  `short\_description: string,         // Hero tagline

`  `full\_description: string,          // Italic intro block on website

`  `icon\_name: string,                 // Lucide icon name for admin UI



`  `topics: string[],                  // Array of topic chips

`  `requirements: {

`    `label: string,                   // "Required from clients:"

`    `items: string[],                 // List of required info

`  `},

`  `availability: {

`    `in\_person\_locations: string[],   // ["Gujarat, India", "UAE"]

`    `online\_available: boolean,

`    `online\_note: string,             // "Available worldwide"

`  `},

`  `is\_active: boolean,

`  `sort\_order: number,

`  `updated\_at: Date,

}

**3.3.4 settings Collection**

// settings — single document, \_id: "global"

{

`  `\_id: "global",

`  `exchange\_rate\_inr: number,          // Default: 22.5 (AED to INR)

`  `exchange\_rate\_updated: Date,

`  `whatsapp\_number: string,            // "+971XXXXXXXXX"

`  `notification\_email: string,         // Smeet's email for alerts

`  `site\_name: string,                  // "Trikaal"

`  `site\_tagline: string,

`  `consultant\_name: string,            // "Smeet"

`  `consultant\_experience\_years: number,

`  `consultant\_languages: string[],

`  `minimum\_age: number,                // 16

`  `confidentiality\_statement: string,

`  `meta\_title: string,

`  `meta\_description: string,

`  `updated\_at: Date,

`  `updated\_by: string,

}

**3.3.5 enquiry\_notes Collection**

// enquiry\_notes — internal admin notes per enquiry

{

`  `\_id: ObjectId,

`  `enquiry\_id: ObjectId,              // Ref to enquiries.\_id — indexed

`  `note\_text: string,

`  `created\_by: string,               // Admin email

`  `created\_at: Date,

}

**3.4 MongoDB Connection — Next.js Pattern**

Use a singleton connection pattern to reuse the connection across serverless function invocations in Next.js:

// lib/mongodb.ts

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB\_URI!;

const options = { maxPoolSize: 10 };

let client: MongoClient;

declare global { var \_mongoClientPromise: Promise<MongoClient>; }

if (!global.\_mongoClientPromise) {

`  `client = new MongoClient(uri, options);

`  `global.\_mongoClientPromise = client.connect();

}

export default global.\_mongoClientPromise;

// Usage in API route:

// const client = await clientPromise;

// const db = client.db("trikaal\_db");

// const enquiries = db.collection("enquiries");





**SECTION 04**

**Admin Dashboard Specification**

*Full feature design for the admin panel*

**4. Admin Dashboard — Full Specification**

|<p>**🔒  Access:**</p><p>Admin dashboard lives at /admin — protected by NextAuth.js middleware. All /admin/\* routes redirect to /admin/login if no valid session exists. Session stored in MongoDB admin\_sessions collection.</p>|
| :- |

**4.1 Tech Stack — Admin**

|**Layer**|**Technology**|
| :- | :- |
|UI Framework|Next.js 14 App Router — /app/admin/\* route group|
|Component Library|Shadcn/ui — pre-built accessible components (Table, Dialog, Form, Select, Badge, Card)|
|Charts|Recharts — enquiry volume over time, service breakdown pie chart|
|Authentication|NextAuth.js v5 — Credentials provider + MongoDB Adapter|
|Data Fetching|Server Components for initial load + React Server Actions for mutations|
|Tables|TanStack Table v8 — sorting, filtering, pagination client-side|
|Forms|React Hook Form + Zod — pricing edit forms, settings forms|
|Export|xlsx library — CSV/Excel export of enquiries|
|Styling|Tailwind CSS — admin uses light theme (opposite of dark public site)|
|Toast Notifications|Sonner — success/error toasts on save/update actions|

**4.2 Admin Routes**

|**Route**|**Purpose**|
| :- | :- |
|/admin/login|Login page — email + password form, NextAuth credentials provider|
|/admin|Dashboard home — KPI cards + recent enquiries table|
|/admin/enquiries|All enquiries — full table with search, filter, sort, pagination|
|/admin/enquiries/[id]|Single enquiry detail — all fields, status picker, notes thread|
|/admin/pricing|Pricing CMS — edit all AED prices per service, per tier, per format|
|/admin/services|Services CMS — edit descriptions, topics, requirements per service|
|/admin/analytics|Analytics — enquiry charts, breakdown by service/country/status|
|/admin/settings|Global settings — exchange rate, WhatsApp, notification email|
|/admin/export|Export — date range picker + CSV/Excel download|
|/admin/users|User management — add/remove admin users (super admin only)|

**4.3 Dashboard Home — /admin**

**KPI Cards (top row)**

- **Total Enquiries:**  count of all documents in enquiries collection (is\_archived: false)
- **New Today:**  count where created\_at >= today 00:00 and status = "new"
- **In Progress:**  count where status = "in\_progress"
- **Booked / Completed:**  count where status in ["booked","completed"]
- **This Month Revenue Estimate:**  sum of price\_aed from completed enquiries in current month (from pricing collection lookup)

**Recent Enquiries Table (last 10)**

- Columns: Enquiry ID | Name | Service | Mode | Tier | Status (badge) | Date
- Status badge colours: New=blue, In Progress=amber, Booked=green, Completed=teal, Closed=grey
- Click any row → navigates to /admin/enquiries/[id]
- Quick-action button: "Mark In Progress" inline (React Server Action)

**Charts Row**

- Enquiries Over Time: Line chart — last 30 days, X axis = date, Y axis = count (Recharts)
- By Service Type: Donut chart — Trikaal Astrology / Vastu / Trikaal Vastu %
- By Status: Horizontal bar chart

**4.4 Enquiries Table — /admin/enquiries**

**Filters & Search**

- Search box: full-text search on name, email, whatsapp (MongoDB $or query)
- Status filter: multi-select dropdown (New, In Progress, Booked, Completed, Closed)
- Service Type filter: multi-select (Trikaal Astrology, Vastu, Trikaal Vastu)
- Date range: "From" and "To" date pickers
- Country filter: dropdown populated from distinct source\_country values
- Clear all filters button

**Table Columns**

- Enquiry ID (TRK-YYYY-XXXX) | Full Name | Email | Service | Mode | Tier | Status Badge | Date | Actions
- Sortable columns: Date, Name, Service, Status
- Paginated: 25 per page, page selector at bottom
- Row checkbox: multi-select for bulk status update
- Actions column: View (icon) | Quick Status Change (dropdown)

**Bulk Actions**

- Select multiple enquiries → Bulk action dropdown: Change Status, Export Selected, Archive Selected
- Confirmation dialog before bulk archive

**4.5 Enquiry Detail — /admin/enquiries/[id]**

**Layout: Two-column**

Left column (60%): All enquiry field values displayed in read-only card. Right column (40%): Status panel + Notes thread.

**Left Column — Enquiry Data**

- Header: Enquiry ID + Full Name + Created date
- Section cards: Client Info | Service Selection | Birth Details (if astrology) | Property Info (if Vastu) | Message
- Each field shown as label + value pair
- Sensitive fields (birth details) shown with a lock icon to reinforce confidentiality

**Right Column — Status & Notes**

- **Status Card:**  Current status badge + dropdown to change status. "Save Status" button triggers MongoDB updateOne + updated\_at timestamp. Toast confirmation.
- **Assigned To:**  Dropdown of admin users. Assign enquiry to a specific admin.
- **WhatsApp Button:**  Opens wa.me/[number] with pre-filled message template.
- **Notes Thread:**  Chronological list of internal notes, newest at top. Each note shows: admin email, timestamp, note text. "Add Note" textarea + submit button. Notes POSTed to /api/admin/notes → inserted into enquiry\_notes collection.
- **Delete / Archive:**  "Archive Enquiry" button — sets is\_archived: true. Confirmation dialog required. Never a hard delete.

**4.6 Pricing CMS — /admin/pricing**

This page allows Smeet to update all service prices without a developer. Changes go live on the public website immediately (next request fetches from MongoDB).

**Layout**

- Tab row: Trikaal Astrology | Vastu | Trikaal Vastu
- For each service: Regular tier section + Urgent tier section (astrology only)
- Each pricing item is an editable row: Label (read-only) | AED Price (number input) | INR Preview (auto-calculated, read-only) | Available Locations (tags)
- Exchange rate display at top: "Current Rate: 1 AED = ₹22.5 — Update in Settings"
- "Save All Changes" button per service tab — batch updateOne to MongoDB pricing collection
- Last updated timestamp + "Updated by: smeet@trikaal.com" shown after save

|<p>**⚡  Live Updates:**</p><p>The public website fetches pricing from MongoDB on every request (Next.js dynamic route with cache: "no-store" on pricing API). Price changes made in admin are live within seconds — no redeploy needed.</p>|
| :- |

**4.7 Services CMS — /admin/services**

- Tab row: one tab per service
- Editable fields: Display Name | Short Description | Full Description (rich textarea) | Icon
- Topics: tag input — add/remove individual topic chips. Saves as array in MongoDB.
- Requirements: label text input + dynamic list of requirement items (add/remove rows)
- Availability: toggle switches for online/onsite + location tags
- "Publish Changes" button → MongoDB updateOne on services collection

**4.8 Analytics — /admin/analytics**

**Charts & Metrics**

- **Enquiries Over Time:**  Line chart, selectable ranges: Last 7 days / 30 days / 3 months / 1 year. Data from MongoDB $group by date aggregation pipeline.
- **By Service Type:**  Donut chart — % breakdown across Astrology, Vastu, Trikaal Vastu.
- **By Consultation Mode:**  Bar chart — Audio vs Video vs In-Person.
- **By Country:**  Horizontal bar chart — top 10 countries by enquiry count (source\_country field).
- **Conversion Funnel:**  New → In Progress → Booked → Completed — shows drop-off at each stage.
- **Average Response Time:**  Avg time from created\_at to first status change from "new".

**4.9 Settings — /admin/settings**

|**Setting Key**|**Input Type**|**Effect**|
| :- | :- | :- |
|exchange\_rate\_inr|Number input — AED to INR rate. Updates settings collection.|Used in all INR calculations sitewide|
|whatsapp\_number|Text input with +country code. Validates E.164 format.|Used in WhatsApp CTA deep links|
|notification\_email|Email input — where new enquiry alerts are sent.|Used by Resend API on form submit|
|minimum\_age|Number input — default 16. Shows on booking form.|Displayed as note on form|
|confidentiality\_statement|Textarea — shown near booking form.|Editable without redeploy|
|meta\_title|Text input — browser tab title.|SEO — updates Next.js metadata|
|meta\_description|Textarea — 160 char max.|SEO — Open Graph description|





**SECTION 05**

**Design Preferences**

*Visual identity, 3D specs, component design*

**5. Design Preferences & Visual Identity**

**5.1 Aesthetic Direction**

"Earthy Spiritual Luxury" — the visual vocabulary of ancient Indian temples, sacred geometry, and Vedic cosmology, elevated through Three.js 3D web technology. Deep cosmic backgrounds with warm gold geometry. Every element should feel like it belongs in a digital shrine.

**5.2 Colour Palette — Public Website**

|**Name**|**Hex**|**Usage**|
| :- | :- | :- |
|Deep Space Black|#0A0608|Primary background|
|Temple Black|#1E1218|Card backgrounds, elevated surfaces|
|Sacred Gold|#C9A84C|Primary accent — borders, headings, icons|
|Soft Gold Glow|#E8C97A|Hover states, highlights|
|Warm Parchment|#F5E4B0|Light text on dark backgrounds|
|Ash White|#F0E8D8|Body text, list items|
|Deep Muted Gold|#8A7B6A|Tertiary text — captions, notes|
|Mystic Plum|#7B3F6E|Vastu badge, Urgent tier accent|
|Temple Brown|#2D1A25|Section dividers, nav backgrounds|

**5.3 Colour Palette — Admin Dashboard**

Admin uses a clean light theme to contrast with the dark public site — feels professional, not mystical.

|**Name**|**Hex**|**Usage**|
| :- | :- | :- |
|Background|#FAFAF9|Page background|
|Surface|#FFFFFF|Cards, panels|
|Border|#E5E1D8|Dividers, input borders|
|Text Primary|#1C1917|Headings, labels|
|Text Secondary|#78716C|Muted labels, captions|
|Gold Accent|#8B6914|Active states, selected rows, primary buttons|
|Status New|#2563EB|Blue badge|
|Status In Progress|#D97706|Amber badge|
|Status Booked|#16A34A|Green badge|
|Status Completed|#0D9488|Teal badge|
|Status Closed|#6B7280|Grey badge|
|Danger|#DC2626|Delete, archive actions|

**5.4 Typography**

|**Font**|**Role & Usage**|
| :- | :- |
|Cinzel|Display — hero headline "TRIKAAL", nav logo, CTA buttons, section labels. Google Fonts. 400/600/700.|
|Cormorant Garamond|Body — service descriptions, consultant bio, mantra translations. Google Fonts. 300/400/600 + italics.|
|Noto Serif Devanagari|Sanskrit only — mantra Devanagari text. Google Fonts. 400/600.|
|Inter|Admin dashboard — clean, readable, systematic. Google Fonts. 400/500/600.|
|JetBrains Mono|Code blocks in admin (API keys, MongoDB strings). Google Fonts.|

**5.5 3D Visual Specifications**

**Hero Mandala — Three.js Scene**

|**Element**|**Specification**|
| :- | :- |
|Canvas|Full viewport, z-index behind content, pointer-events: none on mobile|
|Geometry 1|IcosahedronGeometry(2, 1) — wireframe, MeshBasicMaterial #C9A84C, opacity 0.6|
|Geometry 2|TorusGeometry(3, 0.02, 8, 80) — 3 rings at 0°, 60°, 120° tilt, same material|
|Geometry 3|TorusGeometry(4, 0.015, 8, 120) — outer ring, opacity 0.3|
|Particles|Points, SphereGeometry distribution, count 3000 desktop / 1000 mobile, size 0.03|
|Lighting|PointLight(0xFFEED0, 0.5) at center. AmbientLight(0xFFFFFF, 0.1).|
|Rotation|useFrame: mesh.rotation.y += 0.002, mesh.rotation.x += 0.0005|
|Parallax|Mouse move on Canvas → lerp rotation offset, max ±0.3 rad|
|Scroll Effect|GSAP ScrollTrigger: scale from 1 to 0.3, opacity 1 to 0 as hero exits viewport|
|Mobile|canvas hidden on < 768px, replaced with CSS animated SVG mandala|
|WebGL Fallback|ErrorBoundary + Suspense — shows SVG fallback if WebGL throws|

**5.6 Animation System**

|**Animation Type**|**Specification**|
| :- | :- |
|Entrance (Scroll)|GSAP fromTo: opacity 0→1, y 20→0. Duration 0.6s. Ease: "power2.out". Stagger 0.08s on groups.|
|3D Card Hover|CSS perspective(1000px) + rotateX + rotateY. Max 8deg. Transition 200ms ease-out.|
|Loading Screen|SVG mandala stroke animation (stroke-dashoffset) + Om text + progress bar. Fade out on load.|
|Currency Toggle|GSAP countUp from old value to new value. Duration 0.4s. Ease "power1.inOut".|
|Button Press|CSS transform: translateY(1px) translateZ(-2px) on :active. Box-shadow depth shift.|
|Nav Scroll|Add backdrop-filter blur(12px) and increase background opacity after scrolling 60px.|
|Reduced Motion|@media (prefers-reduced-motion: reduce) — remove all transitions, set durations to 0ms.|





**SECTION 06**

**Build Workflow**

*Google IDX + Firebase + MongoDB Atlas step-by-step*

**6. Build Workflow — Google IDX + Firebase + MongoDB Atlas**

**6.1 Complete Tech Stack**

|**Package / Platform**|**Purpose**|
| :- | :- |
|Next.js 14|App Router, TypeScript, Server Components, Server Actions|
|Three.js r158|@react-three/fiber 8 + @react-three/drei — 3D mandala|
|GSAP 3|@gsap/react + ScrollTrigger — all scroll animations|
|Tailwind CSS 3|Custom design tokens in tailwind.config.ts|
|Shadcn/ui|Admin dashboard UI components (built on Radix UI)|
|MongoDB Driver|mongodb npm package — official Node.js driver|
|NextAuth.js v5|Admin authentication — Credentials + MongoDB Adapter|
|React Hook Form|Form state + validation integration|
|Zod|Schema validation — public form + admin forms|
|Recharts|Admin analytics charts|
|TanStack Table|Admin enquiries table — sort/filter/paginate|
|xlsx|CSV/Excel export of enquiries|
|Resend|Transactional email — new enquiry notifications|
|next/font/google|Cinzel, Cormorant Garamond, Noto Serif Devanagari, Inter|
|Firebase Hosting|CDN + HTTPS + Cloud Functions for Next.js SSR|
|Google IDX|Cloud development environment|

**6.2 Environment Variables**

Create .env.local in the project root. Never commit to git. Add to .gitignore.

\# .env.local

\# MongoDB Atlas

MONGODB\_URI=mongodb+srv://trikaal\_app:<password>@cluster0.xxxxx.mongodb.net/trikaal\_db?retryWrites=true&w=majority

\# NextAuth

NEXTAUTH\_SECRET=<generate with: openssl rand -base64 32>

NEXTAUTH\_URL=http://localhost:3000

\# Email (Resend)

RESEND\_API\_KEY=re\_xxxxxxxxxxxxxxxxxxxx

NOTIFICATION\_EMAIL=smeet@trikaal.com

\# Admin Seed (first admin user)

ADMIN\_EMAIL=smeet@trikaal.com

ADMIN\_PASSWORD\_HASH=<bcrypt hash of password>

\# App

NEXT\_PUBLIC\_SITE\_URL=https://trikaal.com

NEXT\_PUBLIC\_WHATSAPP=+971XXXXXXXXX

**6.3 Full Project Folder Structure**

trikaal-website/

├── app/

│   ├── layout.tsx              # Root layout — fonts, GA4, metadata

│   ├── page.tsx                # Public homepage — all sections

│   ├── globals.css             # Tailwind base + CSS variables

│   ├── api/

│   │   ├── enquiry/route.ts    # POST: save enquiry to MongoDB + send email

│   │   ├── pricing/route.ts    # GET: fetch pricing from MongoDB

│   │   └── services/route.ts   # GET: fetch services from MongoDB

│   └── admin/

│       ├── layout.tsx          # Admin layout — sidebar, top nav, auth guard

│       ├── login/page.tsx      # Login form

│       ├── page.tsx            # Dashboard home — KPIs + charts

│       ├── enquiries/

│       │   ├── page.tsx        # Enquiries table

│       │   └── [id]/page.tsx   # Enquiry detail + notes

│       ├── pricing/page.tsx    # Pricing CMS

│       ├── services/page.tsx   # Services CMS

│       ├── analytics/page.tsx  # Analytics charts

│       ├── settings/page.tsx   # Global settings

│       ├── export/page.tsx     # CSV export

│       └── users/page.tsx      # Admin user management

├── components/

│   ├── 3d/

│   │   ├── MandalaScene.tsx    # Three.js canvas

│   │   ├── ParticleField.tsx   # Star background

│   │   └── MandalaFallback.tsx # CSS SVG fallback

│   ├── sections/

│   │   ├── Hero.tsx

│   │   ├── About.tsx

│   │   ├── WhoCanApply.tsx

│   │   ├── Services.tsx

│   │   ├── Pricing.tsx

│   │   └── Contact.tsx

│   ├── ui/                     # Shared UI: CurrencyToggle, ServiceCard, etc.

│   └── admin/                  # Admin-only: EnquiryTable, PricingEditor, etc.

├── lib/

│   ├── mongodb.ts              # MongoDB singleton connection

│   ├── models/                 # TypeScript interfaces for all collections

│   ├── actions/                # React Server Actions

│   ├── validations/            # Zod schemas

│   └── utils.ts

├── auth.ts                     # NextAuth.js v5 config

├── middleware.ts               # Protect /admin/\* routes

├── scripts/

│   └── seed-db.ts              # Seed initial pricing + services + settings

├── tailwind.config.ts

├── next.config.mjs

└── .env.local                  # Never commit!

**6.4 Development Phases**

|**Phase**|**Name**|**Deliverables**|**Est. Time**|
| :- | :- | :- | :- |
|Phase 1|Environment|IDX project setup. npm install all dependencies. Tailwind config with design tokens. Firebase init.|3–4 hrs|
|Phase 2|MongoDB Atlas|Atlas cluster setup. MongoDB URI in .env. Singleton connection lib. Run seed script for pricing + services + settings.|2–3 hrs|
|Phase 3|3D Engine|MandalaScene Three.js component. ParticleField. WebGL ErrorBoundary + SVG fallback. Mobile detection.|4–5 hrs|
|Phase 4|Public Website|All 8 sections. Pricing fetched from MongoDB API. Services from MongoDB. Currency toggle with GSAP countUp.|8–10 hrs|
|Phase 5|GSAP Animations|ScrollTrigger entrances on all sections. Mandala scroll scale. 3D card hover tilts. Loading screen.|3–4 hrs|
|Phase 6|Enquiry Form|React Hook Form + Zod. POST to /api/enquiry. Save to MongoDB enquiries. Send Resend email. Confirmation toast.|3–4 hrs|
|Phase 7|Auth Setup|NextAuth.js v5. Credentials provider. MongoDB Adapter. middleware.ts protecting /admin. Login page.|2–3 hrs|
|Phase 8|Admin Dashboard|Home KPIs + charts. Enquiries table + detail page. Pricing CMS. Services CMS. Settings. Export.|12–15 hrs|
|Phase 9|Analytics|MongoDB aggregation pipelines for all charts. Recharts components. Date range filters.|4–5 hrs|
|Phase 10|SEO + Performance|Next.js metadata API per page. JSON-LD schema. Lighthouse audit → target 90+ mobile.|2–3 hrs|
|Phase 11|Testing|Form validation edge cases. Admin auth flows. Mobile/iOS Safari. Pricing CMS live-update test.|3–4 hrs|
|Phase 12|Deploy|Firebase Hosting. Cloud Functions for SSR. Custom domain. HTTPS. GA4 verification.|2–3 hrs|

**6.5 Seed Database Script**

Run once to populate MongoDB with initial data:

// Run: npx ts-node scripts/seed-db.ts

import clientPromise from "../lib/mongodb";

async function seed() {

`  `const client = await clientPromise;

`  `const db = client.db("trikaal\_db");

`  `// Seed settings

`  `await db.collection("settings").replaceOne(

`    `{ \_id: "global" as any },

`    `{ \_id: "global", exchange\_rate\_inr: 22.5, whatsapp\_number: "+971XXXXXXXXX",

`      `notification\_email: "smeet@trikaal.com", minimum\_age: 16,

`      `site\_name: "Trikaal", updated\_at: new Date() },

`    `{ upsert: true }

`  `);

`  `// Seed pricing (abbreviated — full data in AI prompt)

`  `await db.collection("pricing").deleteMany({});

`  `await db.collection("pricing").insertMany(PRICING\_SEED\_DATA);

`  `// Seed services

`  `await db.collection("services").deleteMany({});

`  `await db.collection("services").insertMany(SERVICES\_SEED\_DATA);

`  `console.log("✅ Database seeded successfully");

`  `process.exit(0);

}

seed().catch(console.error);





**SECTION 07**

**AI Builder Prompt**

*Complete prompt for Google AI Studio — Gemini 2.5 Pro*

**7. AI Builder Prompt — Google AI Studio**

|<p>**📋  Instructions:**</p><p>Go to aistudio.google.com → New Prompt → Set model to Gemini 2.5 Pro (1M context) → Set temperature to 0.2 → Paste the ENTIRE prompt below → Click Run. The model will generate complete file-by-file code.</p>|
| :- |


**━━━━  BEGIN PROMPT  ━━━━**

**ROLE & CONTEXT**

You are a senior full-stack TypeScript developer specializing in Next.js 14, Three.js 3D experiences, MongoDB Atlas, and admin dashboard development. You write complete, production-ready code with zero placeholders. Every file you output must be 100% complete and immediately runnable.

**PROJECT OVERVIEW**

Build the complete codebase for TRIKAAL — a premium Vedic Sciences consultancy website (public 3D site + admin dashboard) with MongoDB Atlas as the database. The consultant is Smeet, based in Gujarat, India and UAE, offering Jyotish Astrology and Vastu Shastra services.

**TECH STACK — USE EXACTLY**

- **Framework:**  Next.js 14 App Router, TypeScript strict mode
- **3D:**  Three.js r158, @react-three/fiber 8, @react-three/drei
- **Animation:**  GSAP 3 + @gsap/react + ScrollTrigger plugin
- **Styling:**  Tailwind CSS 3 with custom design tokens
- **Admin UI:**  Shadcn/ui components (Button, Table, Card, Dialog, Badge, Select, Input, Textarea, Tabs)
- **Database:**  MongoDB Atlas — official "mongodb" npm driver (NOT mongoose)
- **Auth:**  NextAuth.js v5 (beta) — Credentials provider + MongoDB Adapter
- **Forms:**  React Hook Form + Zod validation
- **Charts:**  Recharts (for admin analytics)
- **Tables:**  TanStack Table v8 (for admin enquiries)
- **Email:**  Resend npm package
- **Export:**  xlsx npm package (CSV/Excel)
- **Fonts:**  next/font/google — Cinzel, Cormorant\_Garamond, Noto\_Serif\_Devanagari, Inter

**DESIGN SYSTEM — IMPLEMENT EXACTLY**

|**Token / Property**|**Value**|
| :- | :- |
|--color-bg-primary|#0A0608|
|--color-bg-card|#1E1218|
|--color-bg-section|#2D1A25|
|--color-gold|#C9A84C|
|--color-gold-light|#E8C97A|
|--color-gold-pale|#F5E4B0|
|--color-text-body|#F0E8D8|
|--color-text-muted|#8A7B6A|
|--color-plum|#7B3F6E|
|Font Display|Cinzel — hero, nav, buttons. Letter-spacing 0.08–0.25em.|
|Font Body|Cormorant Garamond — descriptions, bio. 18px, line-height 1.8.|
|Font Sanskrit|Noto Serif Devanagari — mantra only. Gold colour.|
|Font Admin|Inter — all admin dashboard text.|
|Card Style|bg #1E1218, border 1px solid rgba(201,168,76,0.2), border-radius 12px|
|Button Primary|bg linear-gradient(135deg, #C9A84C, #E8C97A), color #0A0608, font Cinzel|

**MONGODB COLLECTIONS — IMPLEMENT EXACTLY**

Database: trikaal\_db. Collections and their exact schemas:

// ENQUIRIES — public form submissions

interface Enquiry {

`  `\_id: ObjectId; enquiry\_id: string; // TRK-2024-0001

`  `full\_name: string; email: string; whatsapp: string;

`  `preferred\_language: "english"|"hindi"|"gujarati";

`  `service\_type: "trikaal\_astrology"|"vastu"|"trikaal\_vastu";

`  `consultation\_mode: "audio"|"video"|"in\_person";

`  `duration\_minutes: 30|60|null; tier: "regular"|"urgent";

`  `birth\_date?: string; birth\_time?: string; birth\_city?: string;

`  `gender?: "male"|"female"|"other";

`  `age\_confirmed\_16\_plus: boolean;

`  `property\_type?: "residential"|"commercial";

`  `property\_location?: string; num\_residents?: number;

`  `message: string;

`  `status: "new"|"in\_progress"|"booked"|"completed"|"closed";

`  `assigned\_to?: string; source\_country?: string; utm\_source?: string;

`  `created\_at: Date; updated\_at: Date; is\_archived: boolean;

}

// PRICING — one doc per service\_key

interface Pricing {

`  `\_id: ObjectId; service\_key: string; service\_label: string;

`  `fee\_unit: "per\_person"|"per\_property";

`  `extra\_per\_person\_aed: number|null;

`  `tiers: Array<{ tier\_key: string; tier\_label: string;

`    `items: Array<{ key: string; label: string; mode: string;

`      `type?: string; price\_aed: number; available\_locations: string[]; }> }>;

`  `updated\_at: Date; updated\_by: string;

}

// SETTINGS — single doc \_id:"global"

interface Settings {

`  `\_id: string; exchange\_rate\_inr: number;

`  `whatsapp\_number: string; notification\_email: string;

`  `site\_name: string; consultant\_name: string;

`  `minimum\_age: number; updated\_at: Date;

}

// ENQUIRY\_NOTES — internal admin notes

interface EnquiryNote {

`  `\_id: ObjectId; enquiry\_id: ObjectId;

`  `note\_text: string; created\_by: string; created\_at: Date;

}

**PUBLIC WEBSITE SECTIONS — BUILD ALL 9**

1. LOADING SCREEN (app/components/LoadingScreen.tsx) — Full-screen dark overlay. Centered SVG mandala with rotating animation using CSS @keyframes (stroke-dashoffset on circles). Gold "ॐ" text. Progress bar 0→100% using useEffect with 3 second timer. Fade-out animation when complete. Stored in localStorage to skip on return visits.
1. NAVIGATION (components/sections/Nav.tsx) — Fixed top. Height 64px. Background rgba(10,6,8,0.92) + backdrop-filter blur(12px). Logo: "ॐ TRIKAAL" in Cinzel gold. Links: Home · About · Services · Pricing · Contact. All links are anchor scroll to section IDs. Hamburger menu on mobile → full-screen overlay. GSAP opacity transition on mount.
1. HERO SECTION (components/sections/Hero.tsx) — 100vh. Dynamic import MandalaScene (ssr:false, loading="lazy"). Sanskrit mantra block: Devanagari in Noto Serif Devanagari + Roman transliteration + English meaning. "TRIKAAL" headline Cinzel 96px gold. "A Modern Approach to Vedic Science" italic tagline. Two CTAs: gold filled "Book Consultation" + outlined "Explore Services". Animated scroll chevron bouncing down.
1. WHO CAN APPLY (components/sections/WhoCanApply.tsx) — Grid of 4 cards with SVG icons. Cards: (1) Enhance Your Life — universal icon, (2) For Everyone Globally — globe icon, (3) Customised Remedies — sparkle icon, (4) Complete Confidentiality — lock icon. Each card: dark background, gold icon, Cinzel heading, body description. CSS 3D hover tilt effect.
1. MEET SMEET (components/sections/About.tsx) — Two-column layout: left = avatar circle "S" + stat pills + feature list. Right = credential details + quote. Avatar: 120px circle, gradient gold-plum, Cinzel "S" 48px. Stat pills: "3 Years Experience", "Jyotish Shastra", "Vastu Shastra". Features: Mentored by top Gurus · Fluent English/Hindi/Gujarati · Practical up-to-date remedies.
1. SERVICES (components/sections/Services.tsx) — Three tabs: Trikaal Astrology | Vastu | Trikaal Vastu. Tab switcher styled with gold underline on active. Each panel: italic description (from MongoDB services collection via getStaticProps), topic chips grid, requirements box (plum border), availability note. Fetch from /api/services.
1. PRICING (components/sections/Pricing.tsx) — Fetch from /api/pricing. CurrencyContext at top. AED/INR toggle (Cinzel buttons, gold active state). Trikaal Astrology: two cards side by side (Regular | Urgent). Each card has 5 price rows. Vastu section below: 2x2 grid (Residential/Commercial × Online/Onsite). Trikaal Vastu section with extra\_per\_person note. All INR = price\_aed × exchange\_rate.
1. CONTACT & BOOK (components/sections/Contact.tsx) — Heading "Begin Your Journey". Trust row: 4 small icons with labels (Confidential · Global · All Backgrounds · Ages 16+). Form fields: Full Name, Email, WhatsApp (with +country code), Service Type (select: 3 options), Preferred Language (select: English/Hindi/Gujarati), Consultation Mode (select: Audio/Video/In-Person), Duration (select: 30min/60min/N-A), Tier (select: Regular/Urgent), Birth Date (date input), Birth Time (time input), Birth City (text), Gender (select), Message (textarea 4 rows). Age 16+ checkbox required for astrology. POST to /api/enquiry. Show success toast (Sonner). WhatsApp CTA button below form.
1. FOOTER — "ॐ TRIKAAL" centered, Cinzel. Tagline italic. Three language badges: English · Hindi · Gujarati. Availability: Gujarat India & UAE for in-person. Copyright line. Small Om symbol animated rotation.

**ADMIN DASHBOARD — BUILD ALL PAGES**

1. AUTH (auth.ts + app/admin/login/page.tsx) — NextAuth.js v5 config: Credentials provider. Check email+password against admin\_users collection (bcrypt compare). On success return {id, email, name, role}. MongoDB Adapter for sessions. Login page: centered card, Inter font light theme, email+password inputs, "Sign In" button gold. Error display on invalid credentials.
1. MIDDLEWARE (middleware.ts) — Use NextAuth auth() middleware. Protect all /admin/\* routes except /admin/login. Redirect unauthenticated requests to /admin/login with callbackUrl.
1. ADMIN LAYOUT (app/admin/layout.tsx) — Light theme (bg #FAFAF9). Sidebar 240px: logo at top, nav links with icons (Home, Enquiries, Pricing, Services, Analytics, Settings, Export, Users). Active link gold accent. Top bar: page title + signed in as [email] + Sign Out button. Main content area flex-1.
1. DASHBOARD HOME (app/admin/page.tsx) — Server Component. MongoDB aggregations for: totalEnquiries, newToday, inProgress, bookedCompleted. 4 KPI cards in a row (Shadcn Card). Below: two-column row — left: Enquiries Last 30 Days line chart (Recharts, group by date aggregation), right: By Service donut chart. Below: Recent Enquiries table (last 10, Shadcn Table, status badge, View link).
1. ENQUIRIES TABLE (app/admin/enquiries/page.tsx) — TanStack Table. Server-side pagination (25/page). Filters: search input (debounced 300ms), status multi-select, service multi-select, date range pickers. MongoDB query uses $and with $or for search. Columns: ID, Name, Email, Service, Mode, Tier, Status (Shadcn Badge with colour map), Date, Actions. Bulk select checkboxes. Bulk status change action.
1. ENQUIRY DETAIL (app/admin/enquiries/[id]/page.tsx) — Fetch enquiry by \_id. Two-column layout. Left: all fields in Shadcn Cards grouped by category (Client, Service, Birth Details, Property, Message). Right: Status select (Shadcn Select) + Save button (Server Action: updateOne status + updated\_at). WhatsApp link button. Notes thread: list of enquiry\_notes sorted by created\_at desc. Add note textarea + submit (Server Action: insertOne into enquiry\_notes). Archive button (confirmation Shadcn Dialog).
1. PRICING CMS (app/admin/pricing/page.tsx) — Fetch all pricing docs. Shadcn Tabs (one per service). For each service: show tier sections. Each pricing item: label (read-only text) + price\_aed number input + INR preview (computed: price\_aed × exchange\_rate, read-only). Exchange rate shown at top. "Save Changes" Server Action: updateOne pricing doc in MongoDB. Sonner toast on success. Show "Last updated by" after save.
1. SERVICES CMS (app/admin/services/page.tsx) — Fetch services. Tabs per service. Form fields: Display Name, Short Description, Full Description (textarea), Topics (tag input: display as chips, add with Enter, remove with ×), Requirements (dynamic list: add/remove rows), Availability toggles. Server Action saves to MongoDB services collection.
1. ANALYTICS (app/admin/analytics/page.tsx) — Four Recharts: (1) Line chart: enquiries per day last 30d (MongoDB $group by date). (2) Pie chart: by service\_type. (3) Bar chart: by consultation\_mode. (4) Funnel: status progression counts. Date range selector at top. All charts responsive with gold colour scheme.
1. SETTINGS (app/admin/settings/page.tsx) — Form with React Hook Form. Fields: exchange\_rate\_inr (number), whatsapp\_number (text), notification\_email (email), minimum\_age (number), site\_name (text), meta\_description (textarea). "Save Settings" Server Action: replaceOne settings collection. Show last updated timestamp.
1. EXPORT (app/admin/export/page.tsx) — Date range pickers. Service filter. Status filter. Preview: count of matching enquiries. "Download CSV" button: Server Action queries MongoDB, builds CSV with xlsx library, returns as file download. "Download Excel" button same but .xlsx format.

**API ROUTES — BUILD ALL**

- **GET /api/pricing:**  Fetch all 3 pricing docs + settings (for exchange\_rate). Returns {pricing: Pricing[], exchange\_rate: number}. cache: "no-store" so pricing CMS changes are instant.
- **GET /api/services:**  Fetch all services docs. Returns {services: Service[]}. cache: "no-store".
- **POST /api/enquiry:**  Validate body with Zod EnquirySchema. Generate enquiry\_id (TRK-YYYY-XXXX format using count + 1). Insert into enquiries collection. Send email via Resend to notification\_email. Return {success: true, enquiry\_id}. Rate-limit: check 10 submissions per IP per minute using in-memory map.
- **POST /api/admin/notes:**  Auth-protected. Insert into enquiry\_notes collection. Return {success: true, note}.
- **GET /api/admin/enquiries:**  Auth-protected. Paginated query with filters. Return {enquiries, total, page, limit}.
- **PATCH /api/admin/enquiries/[id]:**  Auth-protected. Update status + updated\_at. Return {success: true}.

**ADDITIONAL REQUIREMENTS**

- **Zod Schema:**  Create lib/validations/enquiry.ts with complete Zod schema matching the Enquiry interface. Use .refine() to require birth\_date/time/city when service\_type is trikaal\_astrology. Require property\_type when service is vastu/trikaal\_vastu.
- **MongoDB Lib:**  Create lib/mongodb.ts with the global singleton pattern shown in the documentation. Export a typed helper: getDb() that returns db.collection types.
- **Enquiry ID Generation:**  In /api/enquiry: count existing docs for current year, pad to 4 digits, format as TRK-2024-0001.
- **Seed Script:**  Create scripts/seed-db.ts with complete PRICING\_SEED\_DATA array (all prices from the BRD) and SERVICES\_SEED\_DATA array (all services content). Run with: npx tsx scripts/seed-db.ts
- **Tailwind Config:**  Extend theme with all CSS colour tokens, fontFamily for Cinzel/Cormorant/Noto/Inter, keyframes for mandala-spin + shimmer + float + gradient-shift.
- **next.config.mjs:**  Configure images domains for any external images. Set headers for security (X-Frame-Options, X-Content-Type-Options). Dynamic import config for Three.js (webpack externals if needed).

**CONTENT — USE EXACTLY**

|**Content Key**|**Value**|
| :- | :- |
|Mantra Devanagari|ॐ असतो मा सद्गमय । तमसो मा ज्योतिर्गमय । मृत्योर्मा अमृतं गमय । ॐ शान्तिः शान्तिः शान्तिः ॥|
|Mantra Roman|Om Asato Maa Sad-Gamaya | Tamaso Maa Jyotir-Gamaya | Mrtyor-Maa Amrtam Gamaya | Om Shaantih Shaantih Shaantih |||
|Mantra Meaning|Lead me from Unreality to Reality, from Darkness to Light, from Mortality to Immortality. Om Peace Peace Peace.|
|Astrology Topics|Love & Marriage · Career · Money Related · Property Matters · Court Matters · Progeny · Education · Foreign Settlement · Health & Inner Peace · Gemstone Recommendation · Astro Numero Alignment · Lucky Numbers & Colours|
|Astrology Req.|Accurate Birthdate, Birth Time, Birth City, Gender. Client must be 16+|
|Smeet Bio|3 years experience in Jyotish Shastra & Vastu Shastra. Mentored by top Gurus. Fluently speaks English, Hindi, Gujarati. Gives practical up-to-date results & remedies.|
|In-person locations|Gujarat, India & UAE only|
|Online|Available worldwide|

**OUTPUT FORMAT**

Output each file as: a line with the filename (e.g. "// FILE: app/page.tsx"), followed immediately by the complete file content. Do NOT truncate any file. Do NOT use "// ... rest of file" or "// add more here" placeholders. Every function, every import, every JSX element must be written out in full. Start with: package.json, tailwind.config.ts, next.config.mjs, then lib/mongodb.ts, then auth.ts, then middleware.ts, then all API routes, then all components bottom-up (smallest first), then all page files, then scripts/seed-db.ts last.


**━━━━  END PROMPT  ━━━━**





**APPENDIX**

**Launch Checklist & Quick Reference**

**Appendix — Launch Checklist**

**A. Pre-Development Checklist**

- MongoDB Atlas account created + cluster M0 set up in Mumbai region
- trikaal\_db database created. trikaal\_app user created with readWrite access.
- Connection string copied to .env.local as MONGODB\_URI
- Resend account created + API key in .env.local
- Google IDX project created with Next.js template
- Firebase project created: trikaal-prod. Hosting enabled.
- GitHub repo created + connected to IDX
- Domain name purchased (e.g. trikaal.ae or trikaalvedic.com)

**B. Post-Build QA Checklist**

|**Infrastructure**|**Frontend**|**Admin & QA**|
| :- | :- | :- |
|Homepage loads < 3s on mobile 4G|3D mandala renders in Chrome desktop|SVG fallback shows on iOS Safari < 15|
|Currency toggle AED ↔ INR works|Pricing data loads from MongoDB|Services content loads from MongoDB|
|Enquiry form submits successfully|Email notification received within 60s|Form shows success toast|
|Admin login works at /admin/login|Invalid credentials show error|Unauthenticated /admin redirects to login|
|Enquiries table shows new submission|Status change saves to MongoDB|Notes can be added to enquiry|
|Pricing CMS: price edit saves + live on site|Settings: exchange rate update recalculates INR|CSV export downloads correctly|
|Lighthouse Performance > 85 mobile|Lighthouse Accessibility > 90|All meta titles and descriptions correct|
|WhatsApp CTA opens correct number|Tested on iPhone 14 Safari|Tested on Android Chrome|

**C. MongoDB Atlas Index Commands**

Run in Atlas Data Explorer → Collections → Indexes, or in mongosh:

// enquiries collection indexes

db.enquiries.createIndex({ created\_at: -1 })

db.enquiries.createIndex({ status: 1 })

db.enquiries.createIndex({ service\_type: 1 })

db.enquiries.createIndex({ email: 1 })

db.enquiries.createIndex({ is\_archived: 1 })

db.enquiries.createIndex({ created\_at: -1, status: 1 })  // compound for dashboard

// enquiry\_notes

db.enquiry\_notes.createIndex({ enquiry\_id: 1, created\_at: -1 })

// admin\_sessions (TTL — auto-expire after 30 days)

db.admin\_sessions.createIndex({ expires: 1 }, { expireAfterSeconds: 0 })



ॐ शान्तिः शान्तिः शान्तिः

*Trikaal — A Modern Approach to Vedic Science*

v2.0 — MongoDB Atlas + Admin Dashboard Edition
