import Link from 'next/link';
import { cookies } from 'next/headers';
import { getDict, DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/lib/i18n';
import SubmitForm from './SubmitForm';

function readLocale() {
  const cookie = cookies().get('herhive-locale')?.value;
  return SUPPORTED_LOCALES.includes(cookie) ? cookie : DEFAULT_LOCALE;
}

export async function generateMetadata() {
  const t = getDict(readLocale());
  return {
    title: t.submit.metaTitle,
    description: t.submit.metaDescription,
    alternates: { canonical: 'https://herhive.eu/submit' },
  };
}

export default function SubmitPage() {
  const locale = readLocale();
  const t = getDict(locale);
  return (
    <div className="container">
      <nav className="opportunity-breadcrumbs">
        <Link href="/">{t.detail.back}</Link>
      </nav>
      <article className="legal-page submit-page">
        <h1>{t.submit.h1}</h1>
        <p className="lead">{t.submit.lead}</p>
        <SubmitForm />
      </article>
    </div>
  );
}
