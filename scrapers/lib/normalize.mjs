import { createHash } from 'node:crypto';

export const TYPES = new Set([
  'scholarship', 'fellowship', 'bootcamp', 'reskilling',
  'returnship', 'university_program', 'mooc', 'internship',
  'mentorship', 'grant', 'conference', 'competition',
  'language_course', 'certification', 'accelerator',
]);

export const COSTS = new Set([
  'free', 'partially_free', 'funded', 'paid_affordable', 'paid_premium', 'closed',
]);

const CYRILLIC_MAP = {
  а:'a',б:'b',в:'v',г:'h',ґ:'g',д:'d',е:'e',є:'ie',ж:'zh',з:'z',и:'y',
  і:'i',ї:'i',й:'i',к:'k',л:'l',м:'m',н:'n',о:'o',п:'p',р:'r',с:'s',
  т:'t',у:'u',ф:'f',х:'kh',ц:'ts',ч:'ch',ш:'sh',щ:'shch',ь:'',ю:'iu',я:'ia',
};

export function slugify(title) {
  const ascii = [...title.toLowerCase()].map((c) => CYRILLIC_MAP[c] ?? c).join('');
  const base = ascii.replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 80);
  const suffix = createHash('sha256').update(title).digest('hex').slice(0, 6);
  return `${base}-${suffix}`;
}

export function contentHash({ title, source_url }) {
  return createHash('sha256').update(`${title} ${source_url}`).digest('hex').slice(0, 16);
}

export function validate(row) {
  const errors = [];
  if (!row.title) errors.push('missing title');
  if (!row.source_url) errors.push('missing source_url');
  if (!TYPES.has(row.opportunity_type)) errors.push(`bad type: ${row.opportunity_type}`);
  if (!COSTS.has(row.cost_type)) errors.push(`bad cost: ${row.cost_type}`);
  if (row.age_from == null || row.age_to == null) errors.push('missing age range');
  if (row.age_from > row.age_to) errors.push('age_from > age_to');
  if (row.age_from < 18 || row.age_to > 99) errors.push(`age range ${row.age_from}-${row.age_to} outside 18-99`);
  return errors;
}

export function buildRow(partial) {
  const row = {
    title: partial.title?.trim(),
    summary: (partial.summary ?? '').trim(),
    age_from: partial.age_from ?? 18,
    age_to: partial.age_to ?? 99,
    opportunity_type: partial.opportunity_type,
    categories: partial.categories ?? [],
    eligibility_tags: partial.eligibility_tags ?? [],
    career_stage: partial.career_stage ?? ['any'],
    residency: partial.residency ?? [],
    countries: partial.countries ?? [],
    languages: partial.languages ?? [],
    format: partial.format ?? '',
    cost_type: partial.cost_type ?? 'free',
    funding_amount: partial.funding_amount ?? null,
    funding_currency: partial.funding_currency ?? 'EUR',
    deadline: partial.deadline ?? null,
    source_url: partial.source_url,
    source: partial.source ?? '',
  };
  row.slug = slugify(row.title || 'untitled');
  row.content_hash = contentHash({ title: row.title, source_url: row.source_url });
  return row;
}
