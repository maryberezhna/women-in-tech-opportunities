// Insertion rules — guard the opportunities table from quality regressions.
// Used by scrapers/run.mjs after a row is built and before CSV emission.
// Each rule returns { ok, reason } so the runner can log a structured
// reject log per skipped row.

export const FORMAT_ALIASES = {
  'Online + offline': 'Hybrid',
  'Offline + online': 'Hybrid',
  'Offline/online': 'Hybrid',
  'online': 'Online',
  'in-person': 'On-site',
  'remote': 'Online',
};

export function normalizeFormat(value) {
  if (!value) return value;
  const trimmed = value.trim().replace(/\s+/g, ' ');
  if (FORMAT_ALIASES[trimmed]) return FORMAT_ALIASES[trimmed];
  return trimmed;
}

// Generic landing pages that legitimately host multiple opportunities.
// These are NOT used as the dedup key; the scraper should drill deeper.
export const LANDING_URLS = new Set([
  'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
  'https://erasmus-plus.ec.europa.eu/opportunities',
  'https://www.arbeitsagentur.de/bildung/weiterbildung',
  'https://eu.boschalumni.org/',
]);

// URLs that have historically been mass-duplicated. Hard-block insertion.
export const HARD_BLOCKED_URLS = new Set([
  // Add specific URLs here as cleanup events happen, with a date note.
]);

const rules = [
  function nonEmptyTitle(row) {
    if (!row.title || row.title.trim().length < 5) {
      return { ok: false, reason: 'title too short (<5 chars)' };
    }
    return { ok: true };
  },

  function nonEmptySummary(row) {
    if (!row.summary || row.summary.trim().length < 30) {
      return { ok: false, reason: 'summary too short (<30 chars)' };
    }
    return { ok: true };
  },

  function validUrl(row) {
    try {
      const u = new URL(row.source_url);
      if (!['http:', 'https:'].includes(u.protocol)) {
        return { ok: false, reason: 'non-http(s) source_url' };
      }
    } catch {
      return { ok: false, reason: 'unparseable source_url' };
    }
    return { ok: true };
  },

  function notHardBlocked(row) {
    if (HARD_BLOCKED_URLS.has(row.source_url)) {
      return { ok: false, reason: 'source_url is hard-blocked (already curated in DB)' };
    }
    return { ok: true };
  },

  function ageWithinAdulthood(row) {
    if (row.age_from < 18 || row.age_to > 99) {
      return { ok: false, reason: `age range ${row.age_from}-${row.age_to} outside 18-99` };
    }
    return { ok: true };
  },

  function deadlineNotFarPast(row) {
    if (!row.deadline) return { ok: true };
    const d = new Date(row.deadline);
    if (isNaN(d.getTime())) return { ok: false, reason: 'unparseable deadline' };
    const now = new Date();
    const yearAgo = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    if (d < yearAgo) {
      return { ok: false, reason: `deadline ${row.deadline} is more than a year in the past` };
    }
    return { ok: true };
  },

  function hasCountry(row) {
    if (!row.countries || row.countries.length === 0) {
      return { ok: false, reason: 'missing countries (need at least one — EU, DE, UK, REMOTE, etc.)' };
    }
    return { ok: true };
  },

  function dedupHash(row, ctx) {
    if (ctx.seenHashes.has(row.content_hash)) {
      return { ok: false, reason: `duplicate content_hash within this run` };
    }
    return { ok: true };
  },

  function dedupSourceUrl(row, ctx) {
    if (LANDING_URLS.has(row.source_url)) return { ok: true };
    if (ctx.seenUrls.has(row.source_url)) {
      return { ok: false, reason: `duplicate source_url within this run` };
    }
    return { ok: true };
  },

  function noLandingAsPrimary(row) {
    if (LANDING_URLS.has(row.source_url)) {
      return { ok: true, warning: 'using landing/category URL — try to find a more specific upstream link' };
    }
    return { ok: true };
  },
];

export function applyRules(row, ctx) {
  row.format = normalizeFormat(row.format);

  const reasons = [];
  const warnings = [];
  for (const rule of rules) {
    const result = rule(row, ctx);
    if (!result.ok) reasons.push(result.reason);
    if (result.warning) warnings.push(result.warning);
  }

  return {
    ok: reasons.length === 0,
    reasons,
    warnings,
  };
}
