# Scrapers

Node-based scrapers that emit a CSV matching the Supabase `opportunities` table.

## Run

```bash
npm install
npm run scrape
```

Output: `scrapers/output/opportunities-YYYY-MM-DD.csv`

Import into Supabase via Table editor → **Insert** → **Import data from CSV**,
or set `NEXT_PUBLIC_SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` and let the
runner upsert automatically (dedup on `content_hash`).

## What's included

| File | Source | Notes |
|---|---|---|
| `sources/daad-scholarships.mjs` | daad.de | DAAD scholarships open to Ukrainian women in STEM/humanities |
| `sources/bildungsgutschein.mjs` | arbeitsagentur.de | German voucher-funded reskilling for Tymchasovyi zakhyst holders |
| `sources/erasmus-plus.mjs` | erasmus-plus.ec.europa.eu | EU education programmes (Erasmus Mundus, short mobility) |
| `sources/women-in-tech-curated.mjs` | various | Curated set of established women-in-tech programmes (Grace Hopper, Code First Girls, Tech Returners, WomenGoTech, …) |

Each scraper ships with a **curated baseline** — if the live HTML changes
or the site is down, a small set of known opportunities is emitted instead
so the run never produces zero rows. Live scraping for each source is a
TODO marked inside the file.

## Adding a new source

1. Create `sources/<name>.mjs` exporting `name` (string) and `scrape()` (async, returns array of partial rows).
2. Each partial row needs at minimum: `title`, `summary`, `opportunity_type`, `cost_type`, `countries` (≥ 1), `source_url`, `source`. See `lib/normalize.mjs` for the validator and allowed enums.
3. Register the import in `run.mjs`.

`buildRow()` adds `slug` and `content_hash` automatically. `content_hash` is what Supabase uses to dedupe on import — keep `content_hash` as the unique key on conflict.

## Insertion rules (`lib/rules.mjs`)

Every row that passes schema validation is then run through these rules. Failed rows go to `output/rejects-YYYY-MM-DD.txt` instead of the CSV; warnings print to stdout.

| Rule | What it does | Why |
|---|---|---|
| `nonEmptyTitle` | Reject if title < 5 chars | Keeps stub rows out |
| `nonEmptySummary` | Reject if summary < 30 chars | Search shows summary; thin = bad UX |
| `validUrl` | Reject if `source_url` is unparseable or non-http(s) | Avoids broken links |
| `notHardBlocked` | Reject if `source_url` is in `HARD_BLOCKED_URLS` | Curated row already exists |
| `ageWithinAdulthood` | Reject if age range outside 18-99 | Catalogue is for adult women |
| `deadlineNotFarPast` | Reject if deadline > 1 year ago | Dead programmes |
| `hasCountry` | Reject if `countries` is empty | Country filter is the primary axis |
| `dedupHash` | Reject if `content_hash` already seen this run | Identical title+url collision |
| `dedupSourceUrl` | Reject if `source_url` already seen this run, unless in `LANDING_URLS` | Different opportunities can share a landing page |
| `noLandingAsPrimary` | Warn if `source_url` is a landing page | Suggests scraper should drill deeper |

`normalizeFormat()` rewrites known format aliases (`online + offline` → `Hybrid`, etc.) before validation, so the database stays consistent. Add new aliases to `FORMAT_ALIASES` in `lib/rules.mjs`.

## Schedule

A GitHub Actions workflow can run the scrapers weekly (Monday 05:00 UTC) and upload the CSV as a workflow artifact. See `.github/workflows/scrape.yml` (add when ready).
