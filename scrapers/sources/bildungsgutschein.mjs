// German Bundesagentur für Arbeit — Bildungsgutschein.
// A voucher scheme that funds full reskilling and certification programmes
// for people on unemployment benefits or at risk of unemployment. Ukrainian
// women on Tymchasovyi zakhyst regularly qualify. The actual reskilling
// providers (techeducators, ReDi, neuefische, etc.) are listed under
// Kursnet — this scraper currently ships representative providers as a
// curated baseline.

export const name = 'Bildungsgutschein — German reskilling vouchers';

const CURATED = [
  {
    title: 'ReDI School of Digital Integration — Career Programmes (Berlin/Munich/Hamburg)',
    summary:
      'Free 3-6 month coding, data and product programmes for newcomers to Germany, including Ukrainian women under Tymchasovyi zakhyst. Bildungsgutschein-eligible tracks lead to junior dev / data roles. Strong placement support.',
    opportunity_type: 'reskilling',
    categories: ['software_engineering', 'data_science', 'product'],
    eligibility_tags: ['temporary_protection', 'refugee_status'],
    career_stage: ['career_changer', 'returner', 'early_career', 'mid_career'],
    residency: ['eu_resident', 'temporary_protection'],
    countries: ['DE'],
    languages: ['en', 'de'],
    format: 'On-site / hybrid, Berlin / Munich / Hamburg',
    cost_type: 'free',
    funding_amount: 0,
    funding_currency: 'EUR',
    deadline: null,
    source_url: 'https://www.redi-school.org/',
    source: 'ReDI School',
  },
  {
    title: 'neuefische — Bildungsgutschein-funded data analytics / web dev bootcamps',
    summary:
      'Intensive 12-week bootcamps in data analytics, data science and web development. Fully funded for Bildungsgutschein holders, which includes most Ukrainian women on Tymchasovyi zakhyst registered with Agentur für Arbeit.',
    opportunity_type: 'bootcamp',
    categories: ['data_science', 'software_engineering'],
    eligibility_tags: ['temporary_protection', 'refugee_status'],
    career_stage: ['career_changer', 'returner', 'mid_career'],
    residency: ['eu_resident', 'temporary_protection'],
    countries: ['DE', 'REMOTE'],
    languages: ['en', 'de'],
    format: 'Online / hybrid',
    cost_type: 'funded',
    funding_amount: 12000,
    funding_currency: 'EUR',
    deadline: null,
    source_url: 'https://www.neuefische.de/en/bootcamps',
    source: 'neuefische',
  },
  {
    title: 'Agentur für Arbeit — Bildungsgutschein (general)',
    summary:
      'The German federal employment agency funds full reskilling programmes for jobseekers including women on Tymchasovyi zakhyst. Apply for the voucher at your local Arbeitsagentur, then choose any certified course.',
    opportunity_type: 'reskilling',
    categories: ['software_engineering', 'data_science', 'cybersecurity', 'cloud', 'ux_design'],
    eligibility_tags: ['temporary_protection', 'refugee_status', 'caregiver_return'],
    career_stage: ['career_changer', 'returner', 'mid_career', 'senior'],
    residency: ['eu_resident', 'temporary_protection'],
    countries: ['DE'],
    languages: ['de'],
    format: 'Hybrid',
    cost_type: 'funded',
    deadline: null,
    source_url: 'https://www.arbeitsagentur.de/bildung/weiterbildung/foerderung-mit-bildungsgutschein',
    source: 'Bundesagentur für Arbeit',
  },
];

export async function scrape() {
  // TODO: pull live Kursnet data via the public search API for filtered
  // queries (Frauen, IT, Online). For now we ship a curated baseline of
  // the three most-asked-about providers.
  return CURATED;
}
