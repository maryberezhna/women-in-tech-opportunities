import Link from 'next/link';
import PayPalButton from './PayPalButton';

const MONOBANK_URL = 'https://send.monobank.ua/jar/PLACEHOLDER';

export const metadata = {
  title: 'Support herhive',
  description:
    'Support the free trilingual catalogue of tech and education opportunities for Ukrainian women across Europe. PayPal or Monobank — every contribution helps add new programs.',
  alternates: { canonical: 'https://herhive.eu/support' },
  openGraph: {
    type: 'website',
    url: 'https://herhive.eu/support',
    title: 'Support herhive.eu',
    description: 'PayPal or Monobank — your contribution helps add more opportunities.',
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Support herhive.eu',
    description: 'PayPal or Monobank — your contribution helps add more opportunities.',
    images: ['/og-image.png'],
  },
};

export default function SupportPage() {
  return (
    <div className="container">
      <nav className="opportunity-breadcrumbs">
        <Link href="/">← Усі можливості</Link>
      </nav>

      <article className="legal-page support-page">
        <h1>Support herhive</h1>

        <p className="lead">
          herhive is a free trilingual (Ukrainian / English / German) catalogue
          of verified tech and education opportunities for Ukrainian women
          aged 18-99 across the EU, UK, and Ukraine. Scholarships, fellowships,
          bootcamps, reskilling vouchers, returnships, university tracks — all
          in one place. Always free for users.
        </p>

        <p>Your support helps us:</p>
        <ul>
          <li>verify and add new programs across 60-80 monitored sources</li>
          <li>maintain trilingual content (UK / EN / DE) with native review</li>
          <li>keep the platform ad-free and free for every applicant</li>
        </ul>

        <p>
          Every contribution means more opportunities reaching the women who
          need them. Дякуємо! 💛💙
        </p>

        <h2>PayPal</h2>
        <p>
          For donors outside Ukraine — pay any amount with PayPal, debit or
          credit card.
        </p>
        <PayPalButton />

        <h2>Monobank (Україна)</h2>
        <p>Для донорів в Україні — банка monobank.</p>
        <div className="support-links">
          <a
            href={MONOBANK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-btn"
          >
            🏦 Банка monobank
          </a>
        </div>

        <h2>Institutional partnership</h2>
        <p>
          Are you a foundation, EdTech provider, university, or bootcamp interested
          in featured placement or verified-partner status?{' '}
          <a href="mailto:partners@herhive.eu">partners@herhive.eu</a>.
        </p>

        <p className="modal-footer">
          Built by one person with grant and donor support. Free for users forever.
        </p>
      </article>
    </div>
  );
}
