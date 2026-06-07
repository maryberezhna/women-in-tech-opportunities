# herhive

**A curated catalogue of tech and education opportunities for Ukrainian women across Europe.**

## The idea

herhive is a free, trilingual editorial catalogue of programs that build digital and tech-adjacent skills or fund further education for Ukrainian women. It covers scholarships, fellowships, bootcamps, reskilling vouchers, returnships, university tracks, and MOOCs — every form of structured opportunity that advances tech and education access. The audience is Ukrainian women aged 18 to 99 across the European Union, the United Kingdom, and applicants in Ukraine accessing European programs. Content publishes in Ukrainian, English, and German with full parity.

## The audience

Ukrainian women aged 18 to 99. The framing is deliberate — returnships, reskilling vouchers and late-career programs serve women at every adult age, and that audience has been chronically underserved by platforms that default to "young women in tech" coding. Users include students considering scholarships, mid-career professionals returning to tech after caregiving breaks or wartime displacement, women retraining into digital roles, and late-career women re-entering the workforce in new sectors.

## The product

A browseable catalogue with structured filters — opportunity type, country, language, career stage, deadline, eligibility (Tymchasovyi zakhyst, women-only, returner status), cost. Every opportunity carries a verified source link, plain-language eligibility summary, deadline, funding amount, application URL, and editorial notes where context helps. A submit-an-opportunity form lets the community contribute new programs, subject to editorial verification before publication.

## Technical implementation

Built on **Next.js 14 (App Router) + Supabase**, mirroring the production-tested
pattern from [Dityam.com.ua](https://dityam.com.ua) so the founder (Mary) ships
on a stack she has already validated end-to-end.

> Note: the project was initially described as HubSpot CMS + HubDB; we pivoted
> to Next.js + Supabase to reuse the dityam codebase shape directly. HubSpot
> remains a viable option later for CMS-driven editorial pipelines if needed.

### Stack

- **Next.js 14** (App Router, JavaScript) — server components for SEO, client islands for filtering
- **Supabase Postgres** — `opportunities`, `opportunity_submissions`, `newsletter_subscribers` tables (see `supabase/migrations/`)
- **Vercel** — hosting + edge ISR (300s home, 3600s detail pages)
- **Node scrapers** under `scrapers/` — weekly run emits CSV + upserts via service-role key
- **Google Analytics 4 + Hotjar** — optional, gated by `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_HOTJAR_ID`
- **PayPal hosted button + Monobank** — donation routes, gated by env vars

### Data model

Three tables in Postgres:

| Table | Purpose |
|---|---|
| `opportunities` | Catalogue rows (title, type, countries, languages, funding, eligibility tags, etc.) |
| `opportunity_submissions` | Community-submitted programmes pending editorial review |
| `newsletter_subscribers` | Segmented signups (preferred categories, countries, language) |

See `supabase/migrations/20260513_init_opportunities.sql` for the full schema
including CHECK constraints (type/cost enums, age 18-99) and GIN indexes for
array-column filtering.

### Project shape

```
app/
  layout.js              root layout, fonts, metadata, JSON-LD
  page.js                home (hero + OpportunitiesList)
  globals.css            warm/amber styling system
  OpportunitiesList.js   client island with filters/search/sort
  StickyHeader.js / StickyBar.js   navigation chrome
  SubscribePopup.js / SubscribeButton.js / SubscribeSection.js   newsletter
  SupportPopup.js        in-page support CTA
  TelegramFAB.js         floating Telegram CTA
  ScrollNav.js           scroll-to-top/bottom
  Analytics.js           GA4 + Hotjar (env-gated)
  o/[slug]/page.js       opportunity detail page (with JSON-LD)
  about/ contacts/ privacy/ support/   static pages
  robots.js sitemap.js   SEO
lib/
  supabase.js            client (returns null when env vars missing)
supabase/
  migrations/            SQL migrations
scrapers/
  run.mjs                orchestrator: scrape → validate → URL-check → CSV + upsert
  lib/                   csv, fetch, normalize, rules
  sources/               daad, bildungsgutschein, erasmus-plus, women-in-tech-curated
public/
  og-image.png           1200×630 OG card (replace with branded artwork)
```

### Trilingual content

Phase 1 ships with primary Ukrainian copy (mirroring dityam's pattern of a
single-locale launch). Phase 2 adds `app/[locale]/` routing for English and
German with translation flow: **DeepL Pro first-draft → native German
editorial review**. The data model already supports per-row `languages` so
opportunities tagged `de` will surface naturally on the German locale.

### Compliance

- **GDPR** — privacy policy on `/privacy` covers GA4, Hotjar, Vercel, Supabase processors. Right of access/erasure via `hello@herhive.eu`.
- **WCAG AA** — semantic HTML, keyboard navigation, sufficient contrast, ARIA labels on all icon-only buttons.
- **Schema.org** — `WebSite`, `Organization`, `ItemList`, `Course`, `Event`, `BreadcrumbList` markup on relevant pages.

## Funding model

Year 1 grant-led (EU AMIF, UN Women, Robert Bosch Stiftung Ukraine, BMZ, GIZ,
USAID Ukraine, ERSTE Ukraine Engagement). Year 2 adds B2B partnerships with
bootcamps, EdTech providers, and universities (featured placements,
verified-partner subscriptions) and corporate CSR sponsorship of category
sections. Year 3 scales to institutional subscriptions for diaspora-serving
organizations and labour-market agencies. The platform remains free for users
permanently.

## Founder and timeline

Founded by Mary Berezhna, Lead HubSpot Architect at DataArt and founder of
[Dityam.com.ua](https://dityam.com.ua) — a free catalogue of opportunities
for Ukrainian children built solo (270+ opportunities, 160+ sources). Public
beta launch targets 10 to 14 weeks from build start, with 80 to 100 verified
opportunities at launch.

## Getting started

```bash
npm install

# Set up env (.env.local):
#   NEXT_PUBLIC_SUPABASE_URL=...
#   NEXT_PUBLIC_SUPABASE_ANON_KEY=...
#   SUPABASE_SERVICE_ROLE_KEY=...   (for scraper upserts)
#   NEXT_PUBLIC_GA_ID=...           (optional)
#   NEXT_PUBLIC_HOTJAR_ID=...       (optional)
#   NEXT_PUBLIC_PAYPAL_CLIENT_ID=...           (optional)
#   NEXT_PUBLIC_PAYPAL_HOSTED_BUTTON_ID=...    (optional)

# Run the dev server
npm run dev

# Run the scrapers (writes CSV to scrapers/output/, upserts to Supabase if envs set)
npm run scrape
```

Apply the schema migration via the Supabase SQL editor or `supabase db push`.

---

*Every tech and education opportunity for Ukrainian women across Europe — in your language, at any age.*

*Можливості для українок у Європі — у твоїй мові, у будь-якому віці.*
