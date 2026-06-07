import { cookies } from 'next/headers';
import { Inter } from 'next/font/google';
import { Analytics } from './Analytics';
import TelegramFAB from './TelegramFAB';
import ScrollNav from './ScrollNav';
import TopBar from './TopBar';
import SubscribePopup from './SubscribePopup';
import { LocaleProvider } from './LocaleContext';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '@/lib/i18n';
import './globals.css';

function readLocale() {
  const cookie = cookies().get('herhive-locale')?.value;
  return SUPPORTED_LOCALES.includes(cookie) ? cookie : DEFAULT_LOCALE;
}

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  metadataBase: new URL('https://herhive.eu'),
  title: {
    default: 'herhive — можливості у tech та освіті для українок у Європі (18-99)',
    template: '%s | herhive',
  },
  description:
    'Безкоштовний трилінгвальний каталог стипендій, фелоушипів, буткемпів, перекваліфікацій і програм для українських жінок 18-99 років в ЄС, Великій Британії та Україні. Перевірені програми з дедлайнами і умовами участі — українською, англійською, німецькою.',
  keywords: [
    'стипендії для українок', 'буткемпи Європа', 'перекваліфікація жінки',
    'Bildungsgutschein', 'returnship', 'DAAD', 'Erasmus+',
    'жінки в tech', 'gender tech program', 'EU women scholarship',
    'tech opportunities women', 'reskilling EU', 'Ukrainian women diaspora',
  ],
  authors: [{ name: 'Mary Berezhna' }],
  alternates: { canonical: 'https://herhive.eu' },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: 'uk_UA',
    url: 'https://herhive.eu',
    siteName: 'herhive',
    title: 'Усі tech-можливості для українок у Європі в одному місці',
    description:
      'Каталог стипендій, буткемпів, фелоушипів і перекваліфікацій для українок 18-99 років у ЄС/Великій Британії — українською, англійською, німецькою.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'herhive — каталог можливостей для українок у Європі',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Усі tech-можливості для українок у Європі в одному місці',
    description:
      'Каталог стипендій, буткемпів, фелоушипів і перекваліфікацій для українок 18-99 років у ЄС/Великій Британії.',
    images: ['/og-image.png'],
  },
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': 'https://herhive.eu/#website',
      url: 'https://herhive.eu',
      name: 'herhive',
      description:
        'Каталог можливостей у tech та освіті для українських жінок 18-99 років у ЄС, Великій Британії та Україні.',
      inLanguage: ['uk', 'en', 'de'],
      potentialAction: {
        '@type': 'SearchAction',
        target: 'https://herhive.eu/?q={search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://herhive.eu/#org',
      name: 'herhive',
      url: 'https://herhive.eu',
      logo: 'https://herhive.eu/icon.svg',
      sameAs: ['https://www.instagram.com/herhive.eu'],
    },
  ],
};

export default function RootLayout({ children }) {
  const locale = readLocale();
  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
        <LocaleProvider initialLocale={locale}>
          <TopBar />
          {children}
          <SubscribePopup />
        </LocaleProvider>
        <ScrollNav />
        <TelegramFAB />
        <Analytics />
      </body>
    </html>
  );
}
