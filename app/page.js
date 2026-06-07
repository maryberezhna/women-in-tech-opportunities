import { supabase } from '@/lib/supabase';
import { fakeOpportunities } from '@/lib/fake-opportunities';
import OpportunitiesList from './OpportunitiesList';
import Footer from './Footer';

export const revalidate = 300;

async function getOpportunities() {
  if (!supabase) {
    console.warn('Supabase not configured — serving fake opportunities for preview');
    return fakeOpportunities;
  }
  const { data, error } = await supabase
    .from('opportunities')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase error:', error);
    return fakeOpportunities;
  }
  return data && data.length > 0 ? data : fakeOpportunities;
}

export default async function Home() {
  const opportunities = await getOpportunities();
  const total = opportunities.length;
  const fundedCount = opportunities.filter(
    (o) => o.cost_type === 'free' || o.cost_type === 'funded' || o.cost_type === 'partially_free'
  ).length;
  const sourceCount = new Set(opportunities.map((o) => o.source)).size;
  const countryCount = new Set(
    opportunities.flatMap((o) => o.countries || [])
  ).size;

  const itemListLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Tech & education opportunities for Ukrainian women in Europe',
    numberOfItems: opportunities.length,
    itemListElement: opportunities.slice(0, 100).map((o, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://herhive.eu/o/${o.slug}`,
      name: o.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      <OpportunitiesList
        opportunities={opportunities}
        stats={{ total, fundedCount, sourceCount, countryCount }}
      />

      <Footer />
    </>
  );
}
