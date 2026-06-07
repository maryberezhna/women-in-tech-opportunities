'use client';
import Link from 'next/link';
import { useLocale } from './LocaleContext';

export default function Footer() {
  const { t } = useLocale();
  return (
    <footer className="site-footer">
      <div>{t.site.footer}</div>
      <nav className="site-footer-links" aria-label="Footer">
        <Link href="/about">{t.site.nav.about}</Link>
        <Link href="/submit">{t.submit.navLabel}</Link>
        <Link href="/contacts">{t.site.nav.contact}</Link>
        <Link href="/privacy">Privacy</Link>
        <Link href="/support">{t.site.nav.support}</Link>
        <a
          href="https://www.instagram.com/herhive.eu"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </nav>
    </footer>
  );
}
