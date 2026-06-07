// Curated set of well-known women-in-tech programmes that are not easily
// scrapable (one-off pages, varied site structures). These are maintained
// by hand; new entries land here first and graduate into a dedicated source
// scraper if the underlying site is structured enough.

export const name = 'women-in-tech curated baseline';

const CURATED = [
  {
    title: 'AnitaB.org Grace Hopper Celebration scholarship',
    summary:
      'Conference scholarships for women, non-binary technologists and refugees to attend Grace Hopper Celebration (Europe edition runs in late spring). Covers registration, travel and accommodation. Ukrainian women in STEM regularly receive awards.',
    opportunity_type: 'conference',
    categories: ['software_engineering', 'data_science', 'leadership'],
    eligibility_tags: ['women_only'],
    career_stage: ['student', 'early_career', 'mid_career', 'senior'],
    residency: ['any'],
    countries: ['EU', 'REMOTE'],
    languages: ['en'],
    format: 'On-site / virtual',
    cost_type: 'funded',
    funding_amount: 2500,
    funding_currency: 'EUR',
    deadline: null,
    source_url: 'https://ghc.anitab.org/scholarships/',
    source: 'AnitaB.org',
  },
  {
    title: 'Code First Girls Nanodegree (UK)',
    summary:
      'Free 16-week part-time software development nanodegree for women and non-binary people in the UK, with guaranteed interview at hiring partners. Funded by employer sponsorship; no cost to participants. Strong returnship pathway.',
    opportunity_type: 'bootcamp',
    categories: ['software_engineering', 'data_science'],
    eligibility_tags: ['women_only', 'caregiver_return', 'career_changer'],
    career_stage: ['career_changer', 'returner', 'early_career'],
    residency: ['uk_resident'],
    countries: ['UK', 'REMOTE'],
    languages: ['en'],
    format: 'Online, UK',
    cost_type: 'free',
    funding_amount: 0,
    funding_currency: 'GBP',
    deadline: null,
    source_url: 'https://codefirstgirls.com/',
    source: 'Code First Girls',
  },
  {
    title: 'Women Techmakers — Google scholarship for women in tech',
    summary:
      'Annual scholarship for women in computing in EMEA region (Ukraine included). Covers a year of study costs plus access to Google networking events and mentorship.',
    opportunity_type: 'scholarship',
    categories: ['software_engineering', 'ai_ml'],
    eligibility_tags: ['women_only', 'ukrainian_passport', 'eu_resident', 'uk_resident'],
    career_stage: ['student', 'early_career'],
    residency: ['any'],
    countries: ['EU', 'UK', 'UA'],
    languages: ['en'],
    format: 'Study at home university',
    cost_type: 'funded',
    funding_amount: 7000,
    funding_currency: 'EUR',
    deadline: null,
    source_url: 'https://www.womentechmakers.com/scholars',
    source: 'Google',
  },
  {
    title: 'Mums In Tech / Tech Returners — paid returnship programmes',
    summary:
      'Paid 12-16 week returnship placements at UK tech employers for women returning to work after a career break (caregiving, displacement, redundancy). Salary + retraining + guaranteed interview.',
    opportunity_type: 'returnship',
    categories: ['software_engineering', 'product', 'data_science'],
    eligibility_tags: ['women_only', 'caregiver_return'],
    career_stage: ['returner', 'mid_career', 'senior'],
    residency: ['uk_resident'],
    countries: ['UK'],
    languages: ['en'],
    format: 'On-site / hybrid, UK',
    cost_type: 'funded',
    funding_amount: 28000,
    funding_currency: 'GBP',
    deadline: null,
    source_url: 'https://www.techreturners.com/',
    source: 'Tech Returners',
  },
  {
    title: 'WomenGoTech mentorship (Ukraine / EU)',
    summary:
      'Six-month structured mentorship for women starting or pivoting into tech careers. Pairs participants with senior mentors from international tech companies. Free, runs twice a year, open to Ukrainian residents and diaspora.',
    opportunity_type: 'mentorship',
    categories: ['software_engineering', 'data_science', 'product', 'ux_design'],
    eligibility_tags: ['women_only', 'ukrainian_passport', 'eu_resident'],
    career_stage: ['career_changer', 'early_career', 'returner'],
    residency: ['any'],
    countries: ['UA', 'EU', 'REMOTE'],
    languages: ['uk', 'en'],
    format: 'Online',
    cost_type: 'free',
    funding_amount: 0,
    funding_currency: 'EUR',
    deadline: null,
    source_url: 'https://womengotech.org/',
    source: 'WomenGoTech',
  },
];

export async function scrape() {
  return CURATED;
}
