// Erasmus+ — EU programme for education, training, youth and sport.
// Ukrainian citizens have access via the Programme Countries (when residing
// in one) and via specific Partner Country actions. We focus on tracks
// likely to be relevant to tech/education for women.

export const name = 'Erasmus+ — EU education programmes';

const CURATED = [
  {
    title: 'Erasmus Mundus Joint Masters (EMJM)',
    summary:
      'Two-year fully funded master programmes across two or three European universities. Approx. 200 programmes; many in data science, AI, sustainability, digital humanities. Open to Ukrainian citizens worldwide, with women-in-STEM scholarships in several consortiums.',
    opportunity_type: 'scholarship',
    categories: ['stem', 'data_science', 'ai_ml', 'sustainability'],
    eligibility_tags: ['ukrainian_passport'],
    career_stage: ['early_career'],
    residency: ['any'],
    countries: ['EU'],
    languages: ['en'],
    format: 'On-site, multi-country EU',
    cost_type: 'funded',
    funding_amount: 28000,
    funding_currency: 'EUR',
    deadline: null,
    source_url: 'https://erasmus-plus.ec.europa.eu/opportunities/individuals/students/erasmus-mundus-joint-masters',
    source: 'European Commission',
  },
  {
    title: 'Erasmus+ short-term mobility for adult learners',
    summary:
      'Short funded mobilities (5-30 days) for adult learners to attend courses, job-shadowing or training in other EU countries. Used by Ukrainian women in reskilling pathways for language immersion or sector-specific training.',
    opportunity_type: 'grant',
    categories: ['language', 'professional_development'],
    eligibility_tags: ['eu_resident', 'temporary_protection'],
    career_stage: ['returner', 'mid_career', 'senior', 'career_changer'],
    residency: ['eu_resident', 'temporary_protection'],
    countries: ['EU'],
    languages: ['en'],
    format: 'Short-term mobility',
    cost_type: 'funded',
    funding_amount: 1500,
    funding_currency: 'EUR',
    deadline: null,
    source_url: 'https://erasmus-plus.ec.europa.eu/opportunities/individuals/adults',
    source: 'European Commission',
  },
];

export async function scrape() {
  // TODO: parse the EC opportunity finder. It exposes a JSON API at
  // `/api/opportunities` with action-type filters; pagination is cursor-based.
  return CURATED;
}
