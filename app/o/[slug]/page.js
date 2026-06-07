import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { fakeOpportunities, findFakeOpportunity } from '@/lib/fake-opportunities';
import { getDict, loc, DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/lib/i18n';

const COURSE_TYPES = new Set([
  'bootcamp', 'reskilling', 'university_program', 'mooc',
  'language_course', 'certification', 'mentorship',
]);
const EVENT_TYPES = new Set(['conference', 'competition', 'accelerator']);

export const revalidate = 3600;

function readLocale() {
  const cookie = cookies().get('herhive-locale')?.value;
  return SUPPORTED_LOCALES.includes(cookie) ? cookie : DEFAULT_LOCALE;
}

async function getOpportunity(slug) {
  if (!supabase) return findFakeOpportunity(slug);
  const { data } = await supabase
    .from('opportunities')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();
  return data || findFakeOpportunity(slug);
}

async function getRelated(item, limit = 6) {
  if (!item) return [];
  if (!supabase) {
    return fakeOpportunities
      .filter((o) => o.slug !== item.slug)
      .sort((a, b) => {
        const aMatch = a.opportunity_type === item.opportunity_type ? 0 : 1;
        const bMatch = b.opportunity_type === item.opportunity_type ? 0 : 1;
        return aMatch - bMatch;
      })
      .slice(0, limit);
  }
  const { data } = await supabase
    .from('opportunities')
    .select('slug, title, summary, opportunity_type, countries, cost_type, title_en, title_uk, summary_en, summary_uk')
    .neq('slug', item.slug)
    .eq('opportunity_type', item.opportunity_type)
    .limit(limit);
  if (data && data.length >= 3) return data;

  const { data: fallback } = await supabase
    .from('opportunities')
    .select('slug, title, summary, opportunity_type, countries, cost_type, title_en, title_uk, summary_en, summary_uk')
    .neq('slug', item.slug)
    .limit(limit);
  return fallback || [];
}

export async function generateStaticParams() {
  if (!supabase) return fakeOpportunities.map((o) => ({ slug: o.slug }));
  const { data } = await supabase.from('opportunities').select('slug');
  return (data || []).map((row) => ({ slug: row.slug }));
}

export async function generateMetadata({ params }) {
  const item = await getOpportunity(params.slug);
  if (!item) return { title: 'Not found' };

  const locale = readLocale();
  const t = getDict(locale);
  const title = loc(item, 'title', locale);
  const description = (loc(item, 'summary', locale) || '').slice(0, 160);
  const typeLabel = t.types[item.opportunity_type] || '';
  const countries = (item.countries || []).map((c) => t.countries[c] || c).join(', ');
  const url = `https://herhive.eu/o/${item.slug}`;
  const fullTitle = countries
    ? `${title} — ${typeLabel} (${countries})`
    : `${title} — ${typeLabel}`;

  return {
    title: fullTitle,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      url,
      title: fullTitle,
      description,
      siteName: 'herhive',
      locale: locale === 'uk' ? 'uk_UA' : 'en_GB',
      images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'herhive.eu' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: ['/og-image.png'],
    },
  };
}

function formatDate(dateStr, months) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

function formatFunding(item) {
  if (!item.funding_amount) return null;
  const currency = item.funding_currency || 'EUR';
  const symbol = currency === 'EUR' ? '€' : currency === 'GBP' ? '£' : currency === 'USD' ? '$' : `${currency} `;
  const amount = Number(item.funding_amount).toLocaleString('en-US');
  return `${symbol}${amount}`;
}

function buildJsonLd(item, t, locale) {
  const url = `https://herhive.eu/o/${item.slug}`;
  const isFree = item.cost_type === 'free' || item.cost_type === 'funded';
  const inLanguage = item.languages?.[0] || locale;
  const name = loc(item, 'title', locale);
  const description = loc(item, 'summary', locale);

  if (COURSE_TYPES.has(item.opportunity_type)) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name, description, url, inLanguage,
      provider: { '@type': 'Organization', name: item.source || 'herhive', sameAs: item.source_url || undefined },
      ...(isFree && { offers: { '@type': 'Offer', price: '0', priceCurrency: item.funding_currency || 'EUR', category: 'Free' } }),
    };
  }

  if (EVENT_TYPES.has(item.opportunity_type)) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Event',
      name, description, url, inLanguage,
      ...(item.deadline && { startDate: item.deadline }),
      eventAttendanceMode: 'https://schema.org/MixedEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: { '@type': 'Place', name: item.format || 'Europe' },
      organizer: { '@type': 'Organization', name: item.source || 'herhive', url: item.source_url || undefined },
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name, description, url, inLanguage,
  };
}

export default async function OpportunityPage({ params }) {
  const item = await getOpportunity(params.slug);
  if (!item) notFound();

  const locale = readLocale();
  const t = getDict(locale);
  const related = await getRelated(item);
  const jsonLd = buildJsonLd(item, t, locale);
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t.site.nav.catalogue, item: 'https://herhive.eu' },
      { '@type': 'ListItem', position: 2, name: t.types[item.opportunity_type] || 'Opportunity', item: 'https://herhive.eu' },
      { '@type': 'ListItem', position: 3, name: loc(item, 'title', locale), item: `https://herhive.eu/o/${item.slug}` },
    ],
  };

  const eligibility = (item.eligibility_tags || []).filter((tag) => t.eligibility[tag]);
  const fundingLabel = formatFunding(item);
  const countriesList = (item.countries || []).map((c) => t.countries[c] || c).join(', ');

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />

      <div className={`detail-page t-${item.opportunity_type}`}>
        <nav className="detail-breadcrumbs">
          <Link href="/">{t.detail.back}</Link>
        </nav>

        <article className="detail-main">
          <span className="detail-type">{t.types[item.opportunity_type] || item.opportunity_type}</span>
          <h1 className="detail-title">{loc(item, 'title', locale)}</h1>
          <p className="detail-summary">{loc(item, 'summary', locale)}</p>

          {eligibility.length > 0 ? (
            <div className="detail-tags">
              {eligibility.map((tag) => (
                <span key={tag} className="tag tag-eligibility">{t.eligibility[tag]}</span>
              ))}
            </div>
          ) : null}

          {item.source_url ? (
            <a
              href={item.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="detail-cta"
            >
              {t.detail.cta}
            </a>
          ) : null}
        </article>

        <aside className="detail-aside" aria-label={t.detail.relatedTitle}>
          {countriesList ? (
            <div className="detail-aside-row">
              <span className="detail-aside-label">{t.detail.asideCountry}</span>
              <span className="detail-aside-value">{countriesList}</span>
            </div>
          ) : null}
          {item.languages?.length > 0 ? (
            <div className="detail-aside-row">
              <span className="detail-aside-label">{t.detail.asideLanguage}</span>
              <span className="detail-aside-value">{item.languages.map((l) => t.languages[l] || l).join(', ')}</span>
            </div>
          ) : null}
          {item.format ? (
            <div className="detail-aside-row">
              <span className="detail-aside-label">{t.detail.asideFormat}</span>
              <span className="detail-aside-value">{item.format}</span>
            </div>
          ) : null}
          {fundingLabel ? (
            <div className="detail-aside-row">
              <span className="detail-aside-label">{t.detail.asideFunding}</span>
              <span className="detail-aside-value">{t.detail.fundingUpTo} {fundingLabel}</span>
            </div>
          ) : null}
          {item.deadline ? (
            <div className="detail-aside-row">
              <span className="detail-aside-label">{t.detail.asideDeadline}</span>
              <span className="detail-aside-value">{formatDate(item.deadline, t.months)}</span>
            </div>
          ) : null}
          {item.cost_type ? (
            <div className="detail-aside-row">
              <span className="detail-aside-label">{t.detail.asideCost}</span>
              <span className="detail-aside-value">{t.costsLong[item.cost_type] || item.cost_type}</span>
            </div>
          ) : null}
          {item.source ? (
            <div className="detail-aside-row">
              <span className="detail-aside-label">{t.detail.asideSource}</span>
              <span className="detail-aside-value">{item.source}</span>
            </div>
          ) : null}
        </aside>

        {related.length > 0 ? (
          <section className="detail-related" aria-labelledby="related-heading">
            <h2 id="related-heading">{t.detail.relatedTitle}</h2>
            <ul>
              {related.map((r) => (
                <li key={r.slug}>
                  <Link href={`/o/${r.slug}`}>
                    <span className="detail-related-name">{loc(r, 'title', locale)}</span>
                    {loc(r, 'summary', locale) ? (
                      <span>{(loc(r, 'summary', locale)).slice(0, 100)}{loc(r, 'summary', locale).length > 100 ? '…' : ''}</span>
                    ) : null}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    </>
  );
}
