// Verified seed catalogue — 30 opportunities curated by Mary Berezhna
// on 2026-05-13. Source: herhive.me Catalogue Seed PDF. Each row was
// confirmed live on the official organisation domain before publishing.
// Used as a fallback when Supabase is not configured (local preview).

const TODAY = new Date('2026-05-13T00:00:00Z');

function inDays(n) {
  const d = new Date(TODAY);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

const ROWS = [
  // ========================================================================
  // GROUP A — EU-funded reskilling & digital-skills programmes (8)
  // ========================================================================
  {
    // A1
    title_en: 'Marie Skłodowska-Curie Postdoctoral Fellowships 2026',
    title_uk: 'Marie Skłodowska-Curie — постдокторські фелоушипи 2026',
    summary_en:
      'Flagship EU postdoctoral fellowship paying competitive salary and allowances (~€5,080/mo × country coefficient + mobility, family, research/training) at a European host institution, with explicit reintegration provisions for researchers displaced by conflict.',
    summary_uk:
      'Флагманський постдокторський фелоушип ЄС — конкурентна зарплата (~€5,080/міс × коефіцієнт країни + надбавки на мобільність, сімʼю, дослідження) при європейській host-інституції. Окремі положення для дослідниць, переміщених через конфлікт.',
    opportunity_type: 'fellowship',
    categories: ['research', 'stem'],
    eligibility_tags: ['temporary_protection'],
    career_stage: ['mid_career', 'senior'],
    countries: ['EU'],
    languages: ['en'],
    format: 'On-site, EU/HE-associated host · 1–3 yrs',
    cost_type: 'funded',
    funding_amount: 60000,
    deadline: inDays(119),
    source: 'European Commission — DG EAC / REA',
    source_url: 'https://marie-sklodowska-curie-actions.ec.europa.eu/funding/msca-postdoctoral-fellowships-2026',
  },
  {
    // A2
    title_en: 'MSCA4Ukraine Fellowship Scheme',
    title_uk: 'MSCA4Ukraine — фелоушип для переміщених дослідниць',
    summary_en:
      'The only EU fellowship designed exclusively for displaced Ukrainian doctoral and postdoctoral researchers to continue their work safely at European host institutions. MSCA rates + country correction + family costs; 176 fellows funded to date.',
    summary_uk:
      'Єдиний фелоушип ЄС, створений виключно для переміщених українських PhD-кандидаток і постдокторок, щоб безпечно продовжити роботу в європейських host-інституціях. Ставки MSCA + корекція країни + сімейні витрати; 176 фелоушипів видано на сьогодні.',
    opportunity_type: 'fellowship',
    categories: ['research', 'stem'],
    eligibility_tags: ['ukrainian_passport', 'refugee_status', 'temporary_protection'],
    career_stage: ['early_career', 'mid_career'],
    countries: ['EU'],
    languages: ['en'],
    format: 'On-site, EU host · 6–24 months · optional secondment to UA',
    cost_type: 'funded',
    funding_amount: 60000,
    deadline: null,
    source: 'European Commission · Scholars at Risk Europe · Humboldt Foundation',
    source_url: 'https://sareurope.eu/msca4ukraine/',
  },
  {
    // A3
    title_en: 'Erasmus+ 2026 Call (Adult Learning, VET, Higher Education)',
    title_uk: 'Erasmus+ 2026 (доросле навчання, VET, вища освіта)',
    summary_en:
      'Europe\'s flagship education programme funding study, traineeships and partnerships across Europe. €5.2 bn 2026 budget; mobility €34–€191/day + travel; partnership grants €30k–€400k. Continuing 2026 priority for Ukrainian displaced learners; OLS free in Ukrainian.',
    summary_uk:
      'Флагманська освітня програма Європи фінансує навчання, стажування і партнерства по всій Європі. Бюджет 2026: €5.2 млрд; мобільність €34–€191/день + переліт; партнерські гранти €30k–€400k. Пріоритет для українок-переміщенок; OLS-платформа має українську версію.',
    opportunity_type: 'grant',
    categories: ['language', 'professional_development'],
    eligibility_tags: ['temporary_protection', 'eu_resident', 'ukrainian_passport'],
    career_stage: ['student', 'early_career', 'mid_career', 'returner', 'senior'],
    countries: ['EU'],
    languages: ['uk', 'en'],
    format: 'Hybrid · in-person mobility + virtual exchanges + OLS',
    cost_type: 'funded',
    funding_amount: 1500,
    deadline: null,
    source: 'European Commission — DG EAC / EACEA',
    source_url: 'https://erasmus-plus.ec.europa.eu/whats-new/news/future-skills-start-here-2026-erasmus-funding-call-is-open',
  },
  {
    // A4
    title_en: 'Digital Europe — Advanced Digital Skills (DIGITAL-2026-SKILLS-10)',
    title_uk: 'Digital Europe — Advanced Digital Skills (DIGITAL-2026-SKILLS-10)',
    summary_en:
      'EU funding for consortia delivering advanced digital-skills training (AI, cybersecurity, quantum, EdTech) that funded projects then deliver free to adult learners across the EU. €12.5M across 3 sub-topics; many DEP projects explicitly target Ukrainians.',
    summary_uk:
      'Фінансування ЄС для консорціумів, що проводять тренінги з advanced digital skills (AI, кібербезпека, quantum, EdTech) — а проєкти потім надають їх безкоштовно дорослим учасницям по всій ЄС. €12.5M на 3 під-теми; багато DEP-проєктів цілено працюють з українками.',
    opportunity_type: 'reskilling',
    categories: ['ai_ml', 'cybersecurity', 'ux_design'],
    eligibility_tags: ['temporary_protection', 'refugee_status', 'eu_resident'],
    career_stage: ['career_changer', 'returner', 'mid_career'],
    countries: ['EU'],
    languages: ['en'],
    format: 'Hybrid · online / in-person / blended via funded consortia',
    cost_type: 'free',
    funding_amount: null,
    deadline: inDays(141),
    source: 'European Commission (DG CNECT) + HaDEA',
    source_url: 'https://digital-skills-jobs.europa.eu/en/latest/news/eu-launches-new-set-open-calls-under-digital-boost-advanced-digital-skills',
  },
  {
    // A5
    title_en: 'EU Talent Pool Pilot — Ukraine',
    title_uk: 'EU Talent Pool — пілот для українок під тимчасовим захистом',
    summary_en:
      'Free EU online platform that lets Temporary Protection holders upload skills/CV in multiple languages and match directly with EU employers and Public Employment Services. UA-lang interface; continuous; full platform expected 2027.',
    summary_uk:
      'Безкоштовна онлайн-платформа ЄС, що дає українкам під тимчасовим захистом завантажити CV/навички кількома мовами і напряму матчитися з роботодавцями ЄС та державними службами зайнятості. Українська мова інтерфейсу; постійно; повна платформа — 2027.',
    opportunity_type: 'certification',
    categories: ['professional_development'],
    eligibility_tags: ['temporary_protection', 'ukrainian_passport'],
    career_stage: ['career_changer', 'returner', 'mid_career', 'senior'],
    countries: ['EU'],
    languages: ['uk', 'en'],
    format: 'Online (Europass profile + EURES matching)',
    cost_type: 'free',
    funding_amount: null,
    deadline: null,
    source: 'European Labour Authority · DG EMPL · DG HOME',
    source_url: 'https://eures.europa.eu/eu-talent-pool-pilot_en',
  },
  {
    // A6
    title_en: 'EIT Digital Master School 2027 Intake',
    title_uk: 'EIT Digital Master School — набір 2027',
    summary_en:
      'Two-year EIT-funded double-degree Master\'s combining deep-tech specialisation (data science, cybersecurity, cloud, embedded systems) with innovation & entrepreneurship across multiple European universities. Scholarship of Excellence + Deferred Tuition for Ukrainian nationals.',
    summary_uk:
      'Дворічна магістратура з подвійним дипломом від EIT — поєднує deep-tech (data science, кібербезпека, cloud, embedded) з innovation & entrepreneurship у кількох європейських університетах. Stipendium of Excellence + Deferred Tuition для українок.',
    opportunity_type: 'university_program',
    categories: ['data_science', 'ai_ml', 'cybersecurity', 'cloud', 'entrepreneurship'],
    eligibility_tags: ['ukrainian_passport', 'women_only'],
    career_stage: ['early_career'],
    countries: ['EU'],
    languages: ['en'],
    format: 'On-site · 2 yrs · 2 EU universities + Summer School',
    cost_type: 'funded',
    funding_amount: 30000,
    deadline: null,
    source: 'European Institute of Innovation & Technology (EIT) Digital',
    source_url: 'https://masterschool.eitdigital.eu/',
  },
  {
    // A7
    title_en: 'AMIF Transnational Call — Migrant Women\'s Social & Economic Integration',
    title_uk: 'AMIF — соціальна та економічна інтеграція жінок-мігранток',
    summary_en:
      'EU funding for transnational projects delivering labour-market training, mentoring and integration support specifically to migrant and refugee women — including dedicated pathways for Ukrainian women. ~€34M total; services free to beneficiaries.',
    summary_uk:
      'Фінансування ЄС для транснаціональних проєктів, що навчають, менторять і підтримують інтеграцію жінок-мігранток і біженок — з окремими шляхами для українок. Загалом ~€34 млн; послуги для учасниць безкоштовні.',
    opportunity_type: 'grant',
    categories: ['professional_development', 'leadership'],
    eligibility_tags: ['temporary_protection', 'refugee_status', 'women_only'],
    career_stage: ['career_changer', 'returner', 'mid_career', 'senior'],
    countries: ['EU'],
    languages: ['en'],
    format: 'Hybrid · training, mentoring, language, childcare-friendly upskilling',
    cost_type: 'free',
    funding_amount: null,
    deadline: null,
    source: 'European Commission — DG HOME (AMIF 2021–2027)',
    source_url: 'https://home-affairs.ec.europa.eu/funding/asylum-migration-and-integration-funds/asylum-migration-and-integration-fund-2021-2027_en',
  },
  {
    // A8
    title_en: 'European Prize for Women Innovators 2027 (EIC + EIT)',
    title_uk: 'European Prize for Women Innovators 2027 (EIC + EIT)',
    summary_en:
      'Annual EU prize honouring women entrepreneurs whose disruptive deep-tech innovations drive positive change. Cash prizes up to €100,000 per winner across Women Innovators, Rising Innovators (under 35) and EIT Women Leadership Award tracks. Ukrainian women founders eligible.',
    summary_uk:
      'Щорічна нагорода ЄС для жінок-підприємиць, чиї deep-tech інновації змінюють світ. До €100,000 за переможницю в треках Women Innovators, Rising Innovators (до 35) і EIT Women Leadership. Українські жінки-засновниці допущені.',
    opportunity_type: 'competition',
    categories: ['entrepreneurship', 'leadership'],
    eligibility_tags: ['women_only', 'ukrainian_passport', 'eu_resident'],
    career_stage: ['early_career', 'mid_career', 'senior'],
    countries: ['EU'],
    languages: ['en'],
    format: 'Online application + in-person ceremony, Brussels',
    cost_type: 'funded',
    funding_amount: 100000,
    deadline: null,
    source: 'European Innovation Council (EISMEA) + EIT',
    source_url: 'https://eic.ec.europa.eu/eic-prizes/european-prize-women-innovators-powered-eic-eit_en',
  },

  // ========================================================================
  // GROUP B — German country-level reskilling & integration programmes (7)
  // ========================================================================
  {
    // B1
    title_en: 'Bildungsgutschein — Tech & Reskilling Voucher',
    title_uk: 'Bildungsgutschein — ваучер на tech-перекваліфікацію',
    summary_en:
      'German government voucher that lets unemployed or under-qualified people enrol free in certified vocational programmes — including English-language tech bootcamps — once approved by their Jobcenter caseworker. Up to 100% tuition (€10k–€20k typical) + childcare and travel.',
    summary_uk:
      'Державний ваучер Німеччини, що дає безробітним або недокваліфікованим записатися безкоштовно на сертифіковані професійні програми — включно з англомовними tech-буткемпами — після схвалення Jobcenter. До 100% курсу (€10k–€20k) + догляд за дитиною і переліт.',
    opportunity_type: 'reskilling',
    categories: ['software_engineering', 'data_science', 'professional_development'],
    eligibility_tags: ['temporary_protection', 'refugee_status'],
    career_stage: ['career_changer', 'returner', 'mid_career', 'senior'],
    countries: ['DE'],
    languages: ['uk', 'de', 'en'],
    format: 'Hybrid · AZAV-certified providers nationwide',
    cost_type: 'funded',
    funding_amount: 15000,
    deadline: null,
    source: 'Bundesagentur für Arbeit / Jobcenter',
    source_url: 'https://www.arbeitsagentur.de/ukraine',
  },
  {
    // B2
    title_en: 'Aufstiegs-BAföG (AFBG)',
    title_uk: 'Aufstiegs-BAföG — фінансування на підвищення кваліфікації',
    summary_en:
      'Federal entitlement programme that pays both living costs and tuition for state-regulated upgrade training, e.g. certified IT specialist, master craftsperson or technical professional. Up to €1,019/mo subsistence + up to €15,000 fees (50% grant + 50% KfW loan).',
    summary_uk:
      'Федеральна програма Німеччини оплачує і прожиткові витрати, і навчання на держрегульованих кваліфікаційних апгрейдах — наприклад, сертифікована IT-фахівчиня, Meisterin, Technikerin. До €1,019/міс + до €15,000 (50% грант + 50% позика KfW). DE-B2+ де-факто.',
    opportunity_type: 'reskilling',
    categories: ['software_engineering', 'cloud', 'professional_development'],
    eligibility_tags: ['temporary_protection', 'eu_resident', 'caregiver_return'],
    career_stage: ['career_changer', 'returner', 'mid_career', 'senior'],
    countries: ['DE'],
    languages: ['de'],
    format: 'Hybrid (in-person + virtual since 2020)',
    cost_type: 'partially_free',
    funding_amount: 15000,
    deadline: null,
    source: 'BMFTR (administered by Länder)',
    source_url: 'https://www.aufstiegs-bafoeg.de/',
  },
  {
    // B3
    title_en: 'DAAD Future Ukraine — Research Grants',
    title_uk: 'DAAD Future Ukraine — дослідницькі гранти',
    summary_en:
      'A 1–6-month fully funded research scholarship that lets Ukrainian academic women keep their Ukrainian university affiliation while running a research project in Germany. €992–€2,300/mo + insurance + travel. Equal-opportunity criterion weighted.',
    summary_uk:
      'Повністю фінансований дослідницький фелоушип 1-6 місяців — українські дослідниці зберігають афіляцію з українським університетом і ведуть проєкт у Німеччині. €992-€2,300/міс + страхування + переліт. У відборі враховується критерій гендерної рівності.',
    opportunity_type: 'fellowship',
    categories: ['research', 'stem', 'humanities'],
    eligibility_tags: ['ukrainian_passport', 'temporary_protection', 'women_only'],
    career_stage: ['early_career', 'mid_career', 'senior'],
    countries: ['DE'],
    languages: ['en', 'de'],
    format: 'On-site, German university/research institute · 1–6 mo',
    cost_type: 'funded',
    funding_amount: 12000,
    deadline: inDays(0),
    source: 'DAAD (funded by Auswärtiges Amt)',
    source_url: 'https://www2.daad.de/deutschland/stipendium/datenbank/en/21148-scholarship-database/?detail=57650857',
  },
  {
    // B4
    title_en: 'DAAD Hilde Domin Programme — Students at Risk',
    title_uk: 'DAAD Hilde Domin — для студенток у зоні ризику',
    summary_en:
      'Fully funded Master\'s or PhD scholarship for at-risk students worldwide — Ukrainian women fleeing the war qualify. Full degree coverage (€992/mo Master\'s, €1,200/mo PhD) + insurance + travel + 6-month preparatory German course. Requires nomination by a German HEI/NGO.',
    summary_uk:
      'Повністю фінансована магістратура або PhD для студенток у зоні ризику — українки, які тікають від війни, допущені. Повне покриття диплому (€992/міс магістерська, €1,200/міс докторська) + страхування + переліт + 6-міс. підготовчий мовний курс. Потрібна номінація від університету/NGO.',
    opportunity_type: 'scholarship',
    categories: ['research', 'stem', 'humanities'],
    eligibility_tags: ['ukrainian_passport', 'refugee_status', 'women_only'],
    career_stage: ['student', 'early_career'],
    countries: ['DE'],
    languages: ['en', 'de'],
    format: 'On-site · any state-recognised German university · full degree',
    cost_type: 'funded',
    funding_amount: 35000,
    deadline: inDays(155),
    source: 'DAAD (funded by Auswärtiges Amt)',
    source_url: 'https://www.daad.de/en/studying-in-germany/scholarships/daad-scholarships/hilde-domin-programme/',
  },
  {
    // B5
    title_en: 'Heinrich-Böll-Stiftung Studienstipendium',
    title_uk: 'Heinrich-Böll-Stiftung — стипендія для соціально активних',
    summary_en:
      'Green-political-foundation scholarship for politically and socially engaged international Master\'s and PhD students, including Ukrainian refugees, at a German university. €934/mo + health insurance for non-EU; PhDs €1,650/mo. German B2+ mandatory; civic engagement weighted.',
    summary_uk:
      'Стипендія Зеленої фундації для міжнародних магістранток і PhD-кандидаток із соціально-політичною активністю — включно з українками-біженками — в німецьких університетах. €934/міс + страхування для не-ЄС; PhD €1,650/міс. Обовʼязково DE-B2+; враховується громадянська позиція.',
    opportunity_type: 'scholarship',
    categories: ['research', 'social_sciences', 'civic_engagement'],
    eligibility_tags: ['refugee_status', 'ukrainian_passport', 'eu_resident'],
    career_stage: ['student', 'early_career', 'mid_career'],
    countries: ['DE'],
    languages: ['de'],
    format: 'On-site · any state-recognised German university',
    cost_type: 'funded',
    funding_amount: 12000,
    deadline: inDays(111),
    source: 'Heinrich-Böll-Stiftung Studienwerk',
    source_url: 'https://www.boell.de/en/scholarships',
  },
  {
    // B6
    title_en: 'Deutschlandstipendium',
    title_uk: 'Deutschlandstipendium — стипендія Німеччини',
    summary_en:
      'A €300/month merit-and-engagement scholarship that any Ukrainian woman studying at a participating German university can apply for, with refugee/flight experience explicitly counted as supporting evidence. Compatible with BAföG up to €300/mo combined. ~300 HEIs participate.',
    summary_uk:
      'Стипендія €300/міс за досягнення і громадянську активність — будь-яка українка, що навчається в німецькому університеті-учаснику, може подаватись. Досвід війни/втечі офіційно враховується як підтверджуюче свідчення. Сумісно з BAföG до €300/міс. ~300 ВНЗ-учасників.',
    opportunity_type: 'scholarship',
    categories: ['stem', 'humanities', 'professional_development'],
    eligibility_tags: ['temporary_protection', 'eu_resident', 'ukrainian_passport', 'refugee_status'],
    career_stage: ['student', 'early_career'],
    countries: ['DE'],
    languages: ['de', 'en'],
    format: 'On-site · ~300 participating German universities',
    cost_type: 'funded',
    funding_amount: 3600,
    deadline: inDays(18),
    source: 'BMBF + private sponsors',
    source_url: 'https://www.deutschlandstipendium.de/',
  },
  {
    // B7
    title_en: 'BAMF Integrationskurs & Berufssprachkurs',
    title_uk: 'BAMF — інтеграційні та професійні мовні курси',
    summary_en:
      'The official, free BAMF-funded German-language and orientation course system that gets Ukrainian women from A0 to job-ready B2/C1, including women-only and parents-with-childcare formats. Free for Bürgergeld recipients and TP holders; travel + childcare covered.',
    summary_uk:
      'Офіційна безкоштовна система мовних і орієнтаційних курсів від BAMF — від A0 до B2/C1 для виходу на ринок праці. Доступні жіночі та сімейні формати з догляданням за дітьми. Безкоштовно для отримувачок Bürgergeld і ТЗ; переліт і догляд за дітьми покриваються.',
    opportunity_type: 'language_course',
    categories: ['language', 'professional_development'],
    eligibility_tags: ['temporary_protection', 'refugee_status'],
    career_stage: ['career_changer', 'returner', 'mid_career', 'senior'],
    countries: ['DE'],
    languages: ['uk', 'de'],
    format: 'Hybrid · VHS / Goethe-Institut / private schools nationwide',
    cost_type: 'free',
    funding_amount: null,
    deadline: null,
    source: 'Bundesamt für Migration und Flüchtlinge (BAMF)',
    source_url: 'https://www.bamf.de/DE/Themen/Integration/ZugewanderteTeilnehmende/zugewanderteteilnehmende-node.html',
  },

  // ========================================================================
  // GROUP C — Tech bootcamps with women's tracks operating in Germany/EU (5)
  // ========================================================================
  {
    // C1
    title_en: 'ReDI School — Digital Women Program',
    title_uk: 'ReDI School — програма Digital Women',
    summary_en:
      'Free part-time tech courses (Web Dev, Data Analytics, UX/UI, Cybersecurity, Cloud, AI, Coding Fundamentals) specifically designed to empower migrant and refugee women with digital skills, career mentorship and job-network access. Berlin, Munich, Hamburg, NRW, Copenhagen, Malmö.',
    summary_uk:
      'Безкоштовні part-time tech-курси (веб, data analytics, UX/UI, кібербезпека, cloud, AI, основи кодування), створені спеціально для жінок-мігранток і біженок — даючи цифрові навички, менторство і доступ до job-network. Берлін, Мюнхен, Гамбург, NRW, Копенгаген, Мальме.',
    opportunity_type: 'bootcamp',
    categories: ['software_engineering', 'data_science', 'ux_design', 'cybersecurity', 'cloud', 'ai_ml'],
    eligibility_tags: ['women_only', 'refugee_status', 'temporary_protection', 'ukrainian_passport'],
    career_stage: ['career_changer', 'returner', 'early_career', 'mid_career'],
    countries: ['DE', 'DK', 'SE'],
    languages: ['uk', 'en', 'de'],
    format: 'Hybrid · evenings/Saturdays',
    cost_type: 'free',
    funding_amount: null,
    deadline: inDays(137),
    source: 'ReDI School of Digital Integration gGmbH',
    source_url: 'https://www.redi-school.org/women-courses',
  },
  {
    // C2
    title_en: 'neue fische — Web Dev, Data Science & AI Bootcamps',
    title_uk: 'neue fische — буткемпи з Web Dev, Data Science та AI',
    summary_en:
      'Intensive 12–18-week live-online bootcamps in Web Dev, Data Science & AI, IHK-certified AI Modelling, UX/UI, Cloud, Cybersecurity and IT Project Management. 100% Bildungsgutschein-eligible → €0 for qualifying TP holders. Dedicated Women-in-Tech scholarship + Alma Pay deferred tuition.',
    summary_uk:
      'Інтенсивні 12-18-тижневі live-online буткемпи з Web Dev, Data Science & AI, IHK-сертифікованим AI Modelling, UX/UI, Cloud, кібербезпеки та IT Project Management. 100% покриваються Bildungsgutschein → €0 для українок під ТЗ. Окрема Women-in-Tech стипендія + Alma Pay (deferred tuition).',
    opportunity_type: 'bootcamp',
    categories: ['software_engineering', 'data_science', 'ai_ml', 'cybersecurity', 'ux_design', 'cloud'],
    eligibility_tags: ['temporary_protection', 'women_only', 'career_changer'],
    career_stage: ['career_changer', 'returner', 'mid_career'],
    countries: ['DE', 'REMOTE'],
    languages: ['en'],
    format: 'Live online (instructor-led) · Germany-wide',
    cost_type: 'funded',
    funding_amount: 10500,
    deadline: null,
    source: 'neuefische GmbH',
    source_url: 'https://www.neuefische.de/en',
  },
  {
    // C3
    title_en: 'WBS Coding School — AI Software Dev, Data Science, UX/UI',
    title_uk: 'WBS Coding School — AI Software Dev, Data Science, UX/UI',
    summary_en:
      'AZAV-certified live-online tech bootcamps fully fundable by the German employment agency, with a 12-month post-graduation career-services guarantee and a SpeakTech option that bundles tech with certified German/English courses. English-only tracks remove the language barrier.',
    summary_uk:
      'AZAV-сертифіковані live-online tech-буткемпи з повним покриттям через Bildungsgutschein. 12-місячна гарантія career services після випуску і опція SpeakTech, що поєднує tech із сертифікованими курсами німецької/англійської. Англомовні треки знімають мовний барʼєр.',
    opportunity_type: 'bootcamp',
    categories: ['software_engineering', 'data_science', 'ai_ml', 'ux_design'],
    eligibility_tags: ['temporary_protection', 'eu_resident', 'career_changer'],
    career_stage: ['career_changer', 'returner', 'mid_career'],
    countries: ['DE', 'REMOTE'],
    languages: ['en', 'de'],
    format: '100% live online + 280+ WBS coworking spaces across Germany',
    cost_type: 'funded',
    funding_amount: 12000,
    deadline: null,
    source: 'WBS CODING SCHOOL',
    source_url: 'https://www.wbscodingschool.com/',
  },
  {
    // C4
    title_en: 'Masterschool (MSIT) — Software Eng, Data, Cybersecurity, AI',
    title_uk: 'Masterschool (MSIT) — Software Eng, Data, Cybersecurity, AI',
    summary_en:
      'Online tech career-training programs with three funding routes: Bildungsgutschein (100% covered for eligible Germany residents), Deferred tuition (pay only after employment, 36 monthly instalments), or Upfront/monthly with 56%/46% discount. €250 commitment fee only.',
    summary_uk:
      'Онлайн-програми tech-перепідготовки з трьома моделями фінансування: Bildungsgutschein (100% покриття для жителів Німеччини), Deferred tuition (платіж лише після працевлаштування, 36 щомісячних внесків), або Upfront/щомісячно зі знижками 56%/46%. Тільки €250 застави.',
    opportunity_type: 'bootcamp',
    categories: ['software_engineering', 'data_science', 'ai_ml', 'cybersecurity'],
    eligibility_tags: ['temporary_protection', 'eu_resident', 'career_changer'],
    career_stage: ['career_changer', 'returner', 'mid_career'],
    countries: ['DE', 'REMOTE'],
    languages: ['en'],
    format: 'Online (live + self-paced) · HQ Berlin',
    cost_type: 'funded',
    funding_amount: 20000,
    deadline: null,
    source: 'Master School Institute of Technology (MSIT)',
    source_url: 'https://de.masterschool.com/en/',
  },
  {
    // C5
    title_en: 'Le Wagon Berlin & Munich — Women in Tech Scholarship',
    title_uk: 'Le Wagon Berlin & Munich — стипендія Women in Tech',
    summary_en:
      'Globally-recognised intensive 9-week (or 24-week part-time) coding & AI bootcamp with dedicated Women-in-Tech scholarships of up to 100% tuition, plus a Berlin-specific HelloFresh partnership funnel for scholarships and paid internships. English-only delivery.',
    summary_uk:
      'Глобально визнаний інтенсивний 9-тижневий (або 24-тижневий part-time) буткемп з кодування та AI зі стипендіями Women-in-Tech до 100% курсу. Окрема Berlin-партнерська воронка з HelloFresh — стипендії та оплачуваний intern-pathway. Англомовне навчання.',
    opportunity_type: 'bootcamp',
    categories: ['software_engineering', 'ai_ml'],
    eligibility_tags: ['women_only', 'temporary_protection', 'eu_resident', 'career_changer'],
    career_stage: ['career_changer', 'returner', 'early_career'],
    countries: ['DE', 'REMOTE'],
    languages: ['en'],
    format: 'In-person (Berlin & Munich) or fully online · full-time or part-time',
    cost_type: 'funded',
    funding_amount: 10000,
    deadline: null,
    source: 'Le Wagon',
    source_url: 'https://www.lewagon.com/berlin',
  },

  // ========================================================================
  // GROUP D — Corporate diversity programmes (4)
  // ========================================================================
  {
    // D1
    title_en: 'IBM SkillsBuild',
    title_uk: 'IBM SkillsBuild — безкоштовне навчання з AI та tech',
    summary_en:
      'Free IBM-credentialed online courses and live cohorts in AI, cybersecurity, data analytics and cloud, designed for adult career-changers and students with no prior tech background. Available in 11 languages including Ukrainian. EU partnerships with ReDI.',
    summary_uk:
      'Безкоштовні онлайн-курси з IBM-сертифікатами та live-когорти з AI, кібербезпеки, аналітики даних і cloud — для дорослих, які змінюють кар\'єру або починають з нуля. Доступно 11 мовами включно з українською. EU-партнерства з ReDI School.',
    opportunity_type: 'mooc',
    categories: ['ai_ml', 'cybersecurity', 'data_science', 'cloud'],
    eligibility_tags: ['temporary_protection', 'refugee_status', 'eu_resident', 'ukrainian_passport'],
    career_stage: ['career_changer', 'student', 'early_career', 'mid_career', 'returner'],
    countries: ['EU', 'REMOTE'],
    languages: ['uk', 'en', 'de'],
    format: 'Online self-paced + live virtual cohorts',
    cost_type: 'free',
    funding_amount: null,
    deadline: null,
    source: 'IBM (with ReDI School partners)',
    source_url: 'https://skillsbuild.org/',
  },
  {
    // D2
    title_en: 'AWS re/Start',
    title_uk: 'AWS re/Start — буткемп з cloud computing',
    summary_en:
      'A free, full-time 12-week classroom cloud-computing reskilling bootcamp that prepares people with little to no tech experience for entry-level AWS roles, with 90%+ of graduates connected to job interviews. AWS launched dedicated Ukrainian-refugee cohorts in Germany and Poland.',
    summary_uk:
      'Безкоштовний full-time 12-тижневий очний буткемп з cloud computing — готує людей без tech-досвіду до entry-level AWS-ролей; 90%+ випускниць виходять на співбесіди. AWS запустила окремі когорти для українських біженок у Німеччині та Польщі.',
    opportunity_type: 'bootcamp',
    categories: ['cloud', 'software_engineering'],
    eligibility_tags: ['temporary_protection', 'refugee_status', 'ukrainian_passport', 'career_changer'],
    career_stage: ['career_changer', 'early_career'],
    countries: ['DE', 'PL', 'NL', 'IE', 'UK', 'ES'],
    languages: ['en'],
    format: 'Full-time classroom + online supplement · 12 weeks',
    cost_type: 'free',
    funding_amount: null,
    deadline: null,
    source: 'Amazon Web Services (with jobs4refugees, ReDI, Powercoders…)',
    source_url: 'https://aws.amazon.com/training/restart/how-to-apply/',
  },
  {
    // D3
    title_en: 'Cisco Networking Academy — Start IT. Cisco4Ukraine',
    title_uk: 'Cisco Networking Academy — Start IT. Cisco4Ukraine',
    summary_en:
      'Free remote Cisco Networking Academy learning paths in cybersecurity, Python programming and network technician skills, designed specifically for Ukrainian refugees building IT careers in Europe. CCST entry-level certification pathway free via Skills for All.',
    summary_uk:
      'Безкоштовні дистанційні навчальні шляхи Cisco Networking Academy з кібербезпеки, Python-програмування і network technician — створено спеціально для українських біженок, що будують IT-карʼєру в Європі. Шлях до CCST entry-level сертифікації безкоштовний через Skills for All.',
    opportunity_type: 'certification',
    categories: ['cybersecurity', 'software_engineering'],
    eligibility_tags: ['ukrainian_passport', 'refugee_status', 'temporary_protection'],
    career_stage: ['career_changer', 'student', 'early_career'],
    countries: ['EU', 'REMOTE'],
    languages: ['uk', 'en'],
    format: '100% online · self-paced + instructor-supported',
    cost_type: 'free',
    funding_amount: null,
    deadline: null,
    source: 'Cisco (with UITM Rzeszów, Poland)',
    source_url: 'https://cisco4ukraine.pl/',
  },
  {
    // D4
    title_en: 'Microsoft AI Skills Navigator / Microsoft Elevate',
    title_uk: 'Microsoft AI Skills Navigator / Microsoft Elevate',
    summary_en:
      'A free, personalised AI and cloud-skilling pathway from Microsoft offering role-based learning, lab-based Applied Skills credentials and Career Essentials Professional Certificates on Generative AI through LinkedIn Learning. EU residents fully eligible.',
    summary_uk:
      'Безкоштовний персоналізований AI- і cloud-шлях від Microsoft — role-based навчання, Applied Skills-кредіали з лабами і Career Essentials Professional Certificates з Generative AI через LinkedIn Learning. Резидентки ЄС повністю допущені.',
    opportunity_type: 'mooc',
    categories: ['ai_ml', 'cloud'],
    eligibility_tags: ['eu_resident', 'temporary_protection', 'refugee_status'],
    career_stage: ['career_changer', 'student', 'early_career', 'mid_career'],
    countries: ['EU', 'REMOTE'],
    languages: ['en', 'de'],
    format: 'Online self-paced + virtual sessions + Microsoft Innovation Centers',
    cost_type: 'free',
    funding_amount: null,
    deadline: null,
    source: 'Microsoft (with LinkedIn Learning + GitHub)',
    source_url: 'https://www.microsoft.com/en-us/corporate-responsibility/ai-skills-resources',
  },

  // ========================================================================
  // GROUP E — Ukraine-specific integration & reskilling programmes (4)
  // ========================================================================
  {
    // E1
    title_en: 'Vidnova Plus Engagement (Cohort 3, 2026)',
    title_uk: 'Vidnova Plus Engagement — 3-тя когорта 2026',
    summary_en:
      'A four-month skill- and community-building programme that equips Ukrainian Temporary Protection holders in Berlin/Brandenburg with project management, facilitation, public speaking, advocacy and communication skills to launch a community initiative or volunteer locally.',
    summary_uk:
      'Чотиримісячна програма розвитку навичок і спільноти — українкам під тимчасовим захистом у Берліні/Бранденбурзі — project management, фасилітація, public speaking, адвокація і комунікації, щоб запустити локальну ініціативу або волонтерити.',
    opportunity_type: 'mentorship',
    categories: ['leadership', 'civic_engagement'],
    eligibility_tags: ['temporary_protection', 'ukrainian_passport'],
    career_stage: ['career_changer', 'returner', 'mid_career'],
    countries: ['DE'],
    languages: ['uk'],
    format: 'Hybrid in Berlin/Brandenburg · 4-month cohort of 25',
    cost_type: 'free',
    funding_amount: null,
    deadline: null,
    source: 'Commit gGmbH (EU-funded · Bosch · EVZ · Mercator)',
    source_url: 'https://vidnova.org/vidnova-plus/engagement/',
  },
  {
    // E2
    title_en: 'Diia.Education (Дія.Освіта)',
    title_uk: 'Дія.Освіта — національна онлайн-платформа',
    summary_en:
      'Ukraine\'s free national online learning platform offering Ukrainian-language video courses in digital literacy, AI, programming, cybersecurity, entrepreneurship and professional reskilling. Built by the Ministry of Digital Transformation; accessible to TP holders anywhere in the EU.',
    summary_uk:
      'Безкоштовна національна онлайн-платформа України з україномовними відеокурсами з цифрової грамотності, AI, програмування, кібербезпеки, підприємництва і професійного перенавчання. Створено Мінцифрою; доступно українкам під ТЗ у будь-якій країні ЄС.',
    opportunity_type: 'mooc',
    categories: ['software_engineering', 'ai_ml', 'cybersecurity', 'entrepreneurship'],
    eligibility_tags: ['ukrainian_passport', 'temporary_protection', 'refugee_status'],
    career_stage: ['career_changer', 'student', 'early_career', 'mid_career', 'returner'],
    countries: ['UA', 'EU', 'REMOTE'],
    languages: ['uk', 'en'],
    format: '100% online self-paced (MOOC) + 6,000+ Digital Education Hubs',
    cost_type: 'free',
    funding_amount: null,
    deadline: null,
    source: 'Ministry of Digital Transformation of Ukraine',
    source_url: 'https://osvita.diia.gov.ua/en',
  },
  {
    // E3
    title_en: 'Vidnova Fellowship Europe',
    title_uk: 'Vidnova Fellowship Europe — для українок civil society',
    summary_en:
      'An individually designed fellowship that gives displaced Ukrainian civil-society professionals up to €1,500/month stipend + project micro-grants + a European host organisation so they can continue their human-rights, cultural, educational or social work from exile.',
    summary_uk:
      'Індивідуально розроблений фелоушип для українок з civil society у переміщенні — до €1,500/міс стипендія + міні-гранти на проєкти + європейська host-організація, щоб продовжувати правозахисну, культурну, освітню або соціальну роботу з-за кордону.',
    opportunity_type: 'fellowship',
    categories: ['civic_engagement', 'leadership'],
    eligibility_tags: ['ukrainian_passport', 'refugee_status', 'temporary_protection', 'women_only'],
    career_stage: ['mid_career', 'senior'],
    countries: ['EU', 'DE'],
    languages: ['uk', 'en'],
    format: 'Hybrid · in-person host org + online training/coaching · 5–9 months',
    cost_type: 'funded',
    funding_amount: 13500,
    deadline: null,
    source: 'Commit gGmbH · Bosch Stiftung · EVZ · Mercator · Gerda Henkel',
    source_url: 'https://vidnova.org/fellowship/',
  },
  {
    // E4
    title_en: 'Civil Society Leadership Programme for Ukraine 2026 (CLPU)',
    title_uk: 'Civil Society Leadership Programme for Ukraine 2026',
    summary_en:
      'A fully scholarship-funded capacity-building leadership programme for Ukrainian NGO and civil-society leaders, combining 10 days of in-person training in Austria with online coaching focused on strategic management, fundraising, governance, advocacy and personal resilience.',
    summary_uk:
      'Повністю стипендійна leadership-програма для лідерок українських NGO і civil society — 10 днів очного тренінгу в Австрії + онлайн-коучинг зі стратегічного менеджменту, fundraising, governance, адвокації та особистої стійкості.',
    opportunity_type: 'fellowship',
    categories: ['leadership', 'civic_engagement'],
    eligibility_tags: ['ukrainian_passport', 'women_only'],
    career_stage: ['mid_career', 'senior'],
    countries: ['AT'],
    languages: ['en'],
    format: 'Hybrid · 10 days Payerbach + Vienna + online coaching',
    cost_type: 'funded',
    funding_amount: 5000,
    deadline: inDays(-13),
    source: 'NGO Academy (ERSTE Stiftung + WU Vienna)',
    source_url: 'https://ngoacademy.net/clpu2026/',
  },

  // ========================================================================
  // GROUP F — Returnships & fellowships in tech (2)
  // ========================================================================
  {
    // F1
    title_en: 'Goldman Sachs Returnship — EMEA (Frankfurt)',
    title_uk: 'Goldman Sachs Returnship — EMEA (Франкфурт)',
    summary_en:
      'A paid, 12-week full-time programme at Goldman Sachs that helps experienced professionals restart their careers after a 2+ year break, with placements across Global Banking & Markets, Asset & Wealth Management, Operations, Technology, Risk and Finance. Permanent-role conversion for top performers.',
    summary_uk:
      'Оплачувана 12-тижнева full-time програма від Goldman Sachs — для досвідчених фахівчинь, які повертаються після 2+ років паузи. Розміщення в Global Banking & Markets, Asset & Wealth Management, Operations, Technology, Risk і Finance. Перехід на постійну роль для топ-перформерок.',
    opportunity_type: 'returnship',
    categories: ['leadership', 'professional_development'],
    eligibility_tags: ['temporary_protection', 'eu_resident', 'caregiver_return', 'women_only'],
    career_stage: ['returner', 'mid_career', 'senior'],
    countries: ['DE', 'UK', 'FR', 'PL'],
    languages: ['en'],
    format: 'Hybrid / in-office · Frankfurt, London, Paris, Warsaw, Birmingham',
    cost_type: 'funded',
    funding_amount: 14000,
    deadline: inDays(110),
    source: 'Goldman Sachs',
    source_url: 'https://www.goldmansachs.com/careers/programs-for-professionals/returnship',
  },
  {
    // F2
    title_en: 'Amazon EU Returners Programme',
    title_uk: 'Amazon EU Returners Programme',
    summary_en:
      'A 6–9-month paid Amazon returnship across EU offices that re-launches careers after an 18+ month break. Structured coaching from Career Returners, an Amazon mentor and buddy, and a pathway to permanent roles in vendor management, product, programme management and operations.',
    summary_uk:
      '6-9 місячна оплачувана Amazon-программа повернення в офісах ЄС — після 18+ місяців перерви. Структурований коучинг від Career Returners, ментор і buddy від Amazon, перехід на постійні ролі у vendor management, product, programme management та operations.',
    opportunity_type: 'returnship',
    categories: ['product', 'leadership', 'professional_development'],
    eligibility_tags: ['temporary_protection', 'eu_resident', 'caregiver_return', 'women_only'],
    career_stage: ['returner', 'mid_career', 'senior'],
    countries: ['DE', 'UK', 'FR', 'IT'],
    languages: ['en', 'de'],
    format: 'Hybrid · Munich/Berlin · Luxembourg · London · 6–9 months',
    cost_type: 'funded',
    funding_amount: 50000,
    deadline: null,
    source: 'Amazon (with Career Returners UK)',
    source_url: 'https://www.amazon.jobs/en/jobs/2847497/retail-returners-program',
  },
];

function makeSlug(title, idx) {
  const ascii = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 60);
  return `${ascii}-${idx}`;
}

export const fakeOpportunities = ROWS.map((row, idx) => {
  const baseTitle = row.title_en || row.title_uk || row.title;
  const baseSummary = row.summary_en || row.summary_uk || row.summary;
  return {
    id: `seed-${idx + 1}`,
    slug: makeSlug(baseTitle, idx + 1),
    age_from: 18,
    age_to: 99,
    residency: [],
    funding_currency: 'EUR',
    content_hash: `seed-${idx + 1}`,
    created_at: new Date(TODAY.getTime() - idx * 86400000).toISOString(),
    updated_at: new Date(TODAY.getTime() - idx * 86400000).toISOString(),
    ...row,
    title: baseTitle,
    summary: baseSummary,
    title_en: row.title_en || baseTitle,
    title_uk: row.title_uk || baseTitle,
    summary_en: row.summary_en || baseSummary,
    summary_uk: row.summary_uk || baseSummary,
  };
});

export function findFakeOpportunity(slug) {
  return fakeOpportunities.find((o) => o.slug === slug) || null;
}
