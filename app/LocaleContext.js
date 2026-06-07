'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { SUPPORTED_LOCALES, DEFAULT_LOCALE, getDict, loc as locField } from '@/lib/i18n';

const LocaleContext = createContext({
  locale: DEFAULT_LOCALE,
  setLocale: () => {},
  t: getDict(DEFAULT_LOCALE),
  loc: (item, field) => locField(item, field, DEFAULT_LOCALE),
});

function readCookieLocale() {
  if (typeof document === 'undefined') return DEFAULT_LOCALE;
  const match = document.cookie.match(/(?:^|;\s*)herhive-locale=([^;]+)/);
  const value = match ? decodeURIComponent(match[1]) : null;
  return SUPPORTED_LOCALES.includes(value) ? value : DEFAULT_LOCALE;
}

export function LocaleProvider({ initialLocale, children }) {
  const [locale, setLocaleState] = useState(initialLocale || DEFAULT_LOCALE);

  useEffect(() => {
    // Sync from cookie on mount in case the server-set value differs.
    const cookieLocale = readCookieLocale();
    if (cookieLocale !== locale) setLocaleState(cookieLocale);
  }, []);

  const setLocale = (next) => {
    if (!SUPPORTED_LOCALES.includes(next)) return;
    setLocaleState(next);
    document.cookie = `herhive-locale=${next}; Path=/; Max-Age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    // Force server components (detail page, footer copy) to re-render in the
    // new locale on next navigation. Simplest path is a full reload.
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  const value = {
    locale,
    setLocale,
    t: getDict(locale),
    loc: (item, field) => locField(item, field, locale),
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
