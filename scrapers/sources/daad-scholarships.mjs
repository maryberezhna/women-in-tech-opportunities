// DAAD — Deutscher Akademischer Austauschdienst.
// Largest German academic exchange service; many scholarships explicitly
// open to applicants from Ukraine and to women in STEM fields.
// Live HTML changes often, so this source ships with a curated baseline
// and can be extended with HTML scraping later.

export const name = 'DAAD — German Academic Exchange Service';

const CURATED = [
  {
    title: 'DAAD Hilde Domin Programme',
    summary:
      'Scholarships for students and doctoral candidates from countries where access to education is restricted (Ukraine eligible). Covers full study programmes in Germany with a monthly stipend, travel allowance and family supplement.',
    opportunity_type: 'scholarship',
    categories: ['stem', 'humanities', 'social_sciences'],
    eligibility_tags: ['ukrainian_passport', 'refugee_status', 'women_only'],
    career_stage: ['student', 'early_career'],
    residency: ['any'],
    countries: ['DE'],
    languages: ['en', 'de'],
    format: 'On-site, Germany',
    cost_type: 'funded',
    funding_amount: 14000,
    funding_currency: 'EUR',
    deadline: null,
    source_url: 'https://www.daad.de/en/the-daad/hilde-domin-programm/',
    source: 'DAAD',
  },
  {
    title: 'DAAD Helmut-Schmidt-Programme (Master Public Policy and Good Governance)',
    summary:
      'Full master scholarships in public policy, economics and law at German universities. Open to graduates from developing/transition countries including Ukraine. Tuition, stipend, travel and language course covered.',
    opportunity_type: 'scholarship',
    categories: ['public_policy', 'economics', 'leadership'],
    eligibility_tags: ['ukrainian_passport'],
    career_stage: ['early_career'],
    residency: ['any'],
    countries: ['DE'],
    languages: ['en'],
    format: 'On-site, Germany',
    cost_type: 'funded',
    funding_amount: 18000,
    funding_currency: 'EUR',
    deadline: null,
    source_url: 'https://www.daad.de/en/studying-in-germany/scholarships/helmut-schmidt-programme/',
    source: 'DAAD',
  },
  {
    title: 'DAAD Leadership for Africa / Eastern Partnership scholarships',
    summary:
      'Master scholarships in STEM, economics and public administration for Eastern Partnership candidates including Ukraine. Strong focus on women in leadership roles.',
    opportunity_type: 'scholarship',
    categories: ['stem', 'leadership', 'economics'],
    eligibility_tags: ['ukrainian_passport'],
    career_stage: ['early_career', 'mid_career'],
    residency: ['any'],
    countries: ['DE'],
    languages: ['en'],
    format: 'On-site, Germany',
    cost_type: 'funded',
    funding_amount: 16000,
    funding_currency: 'EUR',
    deadline: null,
    source_url: 'https://www.daad.de/en/study-and-research-in-germany/scholarships/',
    source: 'DAAD',
  },
];

export async function scrape() {
  // TODO: replace curated baseline with live scraping of daad.de/en/study-and-research-in-germany/scholarships/.
  // The site uses a filterable React app — easier to consume the JSON
  // endpoint behind it than to parse HTML. See `man-contests.mjs` from
  // the dityam project for a pattern.
  return CURATED;
}
