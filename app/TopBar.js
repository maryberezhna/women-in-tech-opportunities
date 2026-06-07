'use client';
import Link from 'next/link';
import { OPEN_SUBSCRIBE_EVENT } from './SubscribePopup';
import { useLocale } from './LocaleContext';
import { SUPPORTED_LOCALES } from '@/lib/i18n';

export default function TopBar() {
  const { locale, setLocale, t } = useLocale();

  const openSubscribe = () => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(OPEN_SUBSCRIBE_EVENT, {
        detail: { source: 'topbar' }
      }));
    }
  };

  return (
    <header className="topbar">
      <Link href="/" className="topbar-brand">
        <span className="topbar-brand-logo">h</span>
        <span>{t.site.brand}</span>
        <span className="topbar-beta">{t.site.beta}</span>
      </Link>

      <nav className="topbar-nav" aria-label="Primary">
        <Link href="/">{t.site.nav.catalogue}</Link>
        <Link href="/submit">{t.submit.navLabel}</Link>
        <Link href="/about">{t.site.nav.about}</Link>
        <Link href="/contacts">{t.site.nav.contact}</Link>
      </nav>

      <div className="topbar-spacer" />

      <div className="topbar-actions">
        <div className="topbar-locale" role="group" aria-label="Language">
          {SUPPORTED_LOCALES.map((code) => (
            <button
              key={code}
              type="button"
              className={code === locale ? 'active' : ''}
              aria-pressed={code === locale}
              onClick={() => setLocale(code)}
            >
              {code.toUpperCase()}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="topbar-btn topbar-btn-primary"
          onClick={openSubscribe}
        >
          {t.site.subscribe}
        </button>
      </div>
    </header>
  );
}
