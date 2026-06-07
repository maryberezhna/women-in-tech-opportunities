'use client';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { useLocale } from './LocaleContext';

const ANNUAL_TYPES = new Set([
  'scholarship', 'fellowship', 'university_program', 'returnship',
  'grant', 'competition', 'conference',
]);

const PAGE_SIZE = 12;

// Type → emoji icon for the card hero band.
const TYPE_ICONS = {
  scholarship: '🎓',
  fellowship: '🔬',
  bootcamp: '💻',
  reskilling: '🔄',
  returnship: '↩️',
  university_program: '🏛️',
  mooc: '📺',
  internship: '🧪',
  mentorship: '🤝',
  grant: '💰',
  conference: '🎤',
  competition: '🏆',
  language_course: '💬',
  certification: '📜',
  accelerator: '🚀',
};

// Type → swatch colour for the small dot next to type filter options.
const TYPE_DOT = {
  scholarship: '#4338ca',
  fellowship: '#7e22ce',
  bootcamp: '#0369a1',
  reskilling: '#0f766e',
  returnship: '#be185d',
  university_program: '#b45309',
  mooc: '#0e7490',
  mentorship: '#be123c',
  grant: '#4d7c0f',
  conference: '#c2410c',
  competition: '#b91c1c',
  language_course: '#a16207',
  certification: '#334155',
  accelerator: '#6d28d9',
};

const GROUP_ICONS = {
  type: '🏷️',
  country: '🌍',
  language: '💬',
  stage: '👤',
  eligibility: '✅',
  cost: '💸',
  deadline: '📅',
};

function daysUntilDeadline(dateStr) {
  if (!dateStr) return null;
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return null;
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  return Math.ceil((date - now) / (1000 * 60 * 60 * 24));
}

function deadlineMatches(item, value) {
  const days = daysUntilDeadline(item.deadline);
  if (value === 'none') return days === null;
  if (value === 'week') return days !== null && days >= 0 && days <= 7;
  if (value === 'month') return days !== null && days >= 0 && days <= 31;
  if (value === 'quarter') return days !== null && days >= 0 && days <= 92;
  return false;
}

function formatDeadlineShort(dateStr, months) {
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

function deadlineStateClass(item) {
  const days = daysUntilDeadline(item.deadline);
  if (days === null || days < 0) return '';
  if (days <= 7) return 'tile-deadline-urgent';
  if (days <= 30) return 'tile-deadline-soon';
  return '';
}

function FilterGroup({ icon, label, options, selected, onToggle, defaultOpen = true, dotMap }) {
  const [open, setOpen] = useState(defaultOpen);
  const activeCount = selected.size;

  return (
    <div className="sidebar-section">
      <button
        type="button"
        className="sidebar-section-toggle"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
      >
        <span className="sidebar-label">
          {icon ? <span className="sidebar-label-icon" aria-hidden="true">{icon}</span> : null}
          {label}
        </span>
        {activeCount > 0 ? (
          <span className="sidebar-section-count" aria-label={`${activeCount} active`}>{activeCount}</span>
        ) : null}
        <svg
          className={`sidebar-chevron ${open ? 'open' : ''}`}
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open ? (
        <div className="sidebar-options">
          {options.map((o) => {
            const active = selected.has(o.value);
            const dot = dotMap ? dotMap[o.value] : null;
            return (
              <button
                key={o.value}
                type="button"
                className={`sidebar-option ${active ? 'active' : ''}`}
                onClick={() => onToggle(o.value)}
              >
                <span className="sidebar-option-check" aria-hidden="true">
                  {active ? (
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : null}
                </span>
                {dot ? <span className="sidebar-option-dot" style={{ '--dot-color': dot }} aria-hidden="true" /> : null}
                {o.label}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default function OpportunitiesList({ opportunities, stats }) {
  const { t, loc } = useLocale();

  const [types, setTypes] = useState(() => new Set());
  const [countries, setCountries] = useState(() => new Set());
  const [languages, setLanguages] = useState(() => new Set());
  const [stages, setStages] = useState(() => new Set());
  const [eligibility, setEligibility] = useState(() => new Set());
  const [costs, setCosts] = useState(() => new Set());
  const [deadlines, setDeadlines] = useState(() => new Set());
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('deadline');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Persist sidebar collapse state across reloads.
  useEffect(() => {
    try {
      const stored = localStorage.getItem('herhive-sidebar-collapsed');
      if (stored === '1') setSidebarCollapsed(true);
    } catch {}
  }, []);

  const toggleSidebarCollapsed = () => {
    setSidebarCollapsed((prev) => {
      const next = !prev;
      try { localStorage.setItem('herhive-sidebar-collapsed', next ? '1' : '0'); } catch {}
      return next;
    });
  };

  const typeOptions = useMemo(() => {
    const keys = ['scholarship', 'fellowship', 'bootcamp', 'reskilling', 'returnship',
      'university_program', 'mooc', 'mentorship', 'grant'];
    return keys.map((k) => ({ value: k, label: t.typesPlural[k] || t.types[k] }));
  }, [t]);

  const languageOptions = useMemo(() =>
    Object.entries(t.languages).map(([k, v]) => ({ value: k, label: v })),
  [t]);

  const stageOptions = useMemo(() =>
    Object.entries(t.stages).map(([k, v]) => ({ value: k, label: v })),
  [t]);

  const eligibilityOptions = useMemo(() =>
    Object.entries(t.eligibilityFilter).map(([k, v]) => ({ value: k, label: v })),
  [t]);

  const costOptions = useMemo(() => {
    const keys = ['free', 'funded', 'partially_free'];
    return keys.map((k) => ({ value: k, label: t.costs[k] }));
  }, [t]);

  const deadlineOptions = useMemo(() =>
    Object.entries(t.deadlineFilter).map(([k, v]) => ({ value: k, label: v })),
  [t]);

  const sortOptions = useMemo(() =>
    Object.entries(t.results.sort).map(([k, v]) => ({ value: k, label: v })),
  [t]);

  const toggle = (setter) => (value) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  };

  const resetAll = () => {
    setTypes(new Set());
    setCountries(new Set());
    setLanguages(new Set());
    setStages(new Set());
    setEligibility(new Set());
    setCosts(new Set());
    setDeadlines(new Set());
    setQuery('');
  };

  const activeFilterCount =
    types.size + countries.size + languages.size + stages.size +
    eligibility.size + costs.size + deadlines.size + (query ? 1 : 0);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  // Reset pagination whenever filters/sort/query change so the user
  // always starts back at the top of the result set.
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [types, countries, languages, stages, eligibility, costs, deadlines, query, sort]);

  const filtered = useMemo(() => {
    let result = opportunities.filter((item) => {
      const days = daysUntilDeadline(item.deadline);
      if (days !== null && days < 0 && !ANNUAL_TYPES.has(item.opportunity_type)) return false;

      if (types.size > 0 && !types.has(item.opportunity_type)) return false;

      if (countries.size > 0) {
        const itemCountries = item.countries || [];
        if (!itemCountries.some((c) => countries.has(c))) return false;
      }

      if (languages.size > 0) {
        const itemLangs = item.languages || [];
        if (!itemLangs.some((l) => languages.has(l))) return false;
      }

      if (stages.size > 0) {
        const itemStages = item.career_stage || [];
        if (!itemStages.some((s) => stages.has(s)) && !itemStages.includes('any')) return false;
      }

      if (eligibility.size > 0) {
        const itemTags = item.eligibility_tags || [];
        if (!itemTags.some((tag) => eligibility.has(tag))) return false;
      }

      if (costs.size > 0 && !costs.has(item.cost_type)) return false;
      if (deadlines.size > 0 && ![...deadlines].some((v) => deadlineMatches(item, v))) return false;

      if (query) {
        const q = query.toLowerCase();
        const hay = `${loc(item, 'title')} ${loc(item, 'summary')} ${item.source || ''}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const deadlineRank = (item) => {
      const days = daysUntilDeadline(item.deadline);
      if (days === null) return 4;
      if (days < 0) return 4;
      if (days <= 7) return 0;
      if (days <= 30) return 1;
      if (days <= 92) return 2;
      return 3;
    };

    if (sort === 'deadline') {
      result.sort((a, b) => {
        const aDays = daysUntilDeadline(a.deadline);
        const bDays = daysUntilDeadline(b.deadline);
        if (aDays === null && bDays === null) return 0;
        if (aDays === null) return 1;
        if (bDays === null) return -1;
        if (aDays < 0 && bDays < 0) return 0;
        if (aDays < 0) return 1;
        if (bDays < 0) return -1;
        return aDays - bDays;
      });
    } else if (sort === 'funding') {
      result.sort((a, b) => (b.funding_amount || 0) - (a.funding_amount || 0));
    } else {
      let secondary;
      if (sort === 'title') secondary = (a, b) => loc(a, 'title').localeCompare(loc(b, 'title'));
      else if (sort === 'recent') secondary = (a, b) => (b.created_at || '').localeCompare(a.created_at || '');
      else secondary = () => 0;

      result.sort((a, b) => {
        const rank = deadlineRank(a) - deadlineRank(b);
        if (rank !== 0) return rank;
        return secondary(a, b);
      });
    }

    return result;
  }, [opportunities, types, countries, languages, stages, eligibility, costs, deadlines, query, sort, loc]);

  const handleLinkClick = (title) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'opportunity_click', {
        event_category: 'engagement',
        event_label: title,
      });
    }
  };

  const deadlineLabel = (item) => {
    const days = daysUntilDeadline(item.deadline);
    if (days === null) return t.tile.deadlineRolling;
    if (days < 0) {
      return ANNUAL_TYPES.has(item.opportunity_type) ? t.tile.deadlineAnnual : null;
    }
    if (days === 0) return t.tile.deadlineToday;
    if (days <= 30) return t.tile.deadlineDays(days);
    return formatDeadlineShort(item.deadline, t.monthsShort);
  };

  const renderTile = (item) => {
    const funding = formatFunding(item);
    const dl = deadlineLabel(item);
    const dlClass = deadlineStateClass(item);
    const countryList = (item.countries || []).slice(0, 2)
      .map((c) => t.countries[c] || c).join(', ');
    const icon = TYPE_ICONS[item.opportunity_type] || '✨';

    return (
      <article key={item.id} className={`tile t-${item.opportunity_type}`}>
        <div className="tile-hero">
          <span className="tile-icon" aria-hidden="true">{icon}</span>
          <div className="tile-hero-meta">
            <span className="tile-type">{t.types[item.opportunity_type] || item.opportunity_type}</span>
            {funding ? (
              <span className="tile-funding">
                <span className="tile-funding-label">{t.tile.fundingUpTo}</span>
                {funding}
              </span>
            ) : null}
          </div>
        </div>

        <div className="tile-body">
          <h3 className="tile-title">
            <Link href={`/o/${item.slug}`}>{loc(item, 'title')}</Link>
          </h3>

          <p className="tile-summary">{loc(item, 'summary')}</p>

          <div className="tile-meta">
            {countryList ? <span className="tile-meta-item">{countryList}</span> : null}
            {countryList && (item.format || dl) ? <span className="tile-meta-divider">·</span> : null}
            {item.format ? <span className="tile-meta-item">{item.format}</span> : null}
            {(countryList || item.format) && dl ? <span className="tile-meta-divider">·</span> : null}
            {dl ? <span className={`tile-meta-item tile-deadline ${dlClass}`}>{dl}</span> : null}
          </div>

          {item.source_url ? (
            <a
              href={item.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className="tile-cta"
              onClick={() => handleLinkClick(loc(item, 'title'))}
            >
              {t.tile.ctaApply.replace(' →', '')}
              <svg
                className="tile-cta-arrow"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          ) : null}
        </div>
      </article>
    );
  };

  return (
    <>
      <div className={`dashboard ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        <aside
          className={`sidebar ${drawerOpen ? 'open' : ''}`}
          aria-label="Filters"
          onClick={sidebarCollapsed ? toggleSidebarCollapsed : undefined}
        >
          <div className="sidebar-section sidebar-search">
            <span className="sidebar-search-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="search"
              placeholder={t.sidebar.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Search opportunities"
            />
            {query ? (
              <button
                type="button"
                className="sidebar-search-clear"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            ) : null}
          </div>

          <FilterGroup icon={GROUP_ICONS.type} label={t.sidebar.groupType} options={typeOptions} selected={types} onToggle={toggle(setTypes)} defaultOpen={true} dotMap={TYPE_DOT} />
          <FilterGroup icon={GROUP_ICONS.country} label={t.sidebar.groupCountry} options={t.countriesFilter} selected={countries} onToggle={toggle(setCountries)} defaultOpen={true} />
          <FilterGroup icon={GROUP_ICONS.eligibility} label={t.sidebar.groupEligibility} options={eligibilityOptions} selected={eligibility} onToggle={toggle(setEligibility)} defaultOpen={true} />
          <FilterGroup icon={GROUP_ICONS.deadline} label={t.sidebar.groupDeadline} options={deadlineOptions} selected={deadlines} onToggle={toggle(setDeadlines)} defaultOpen={false} />
          <FilterGroup icon={GROUP_ICONS.language} label={t.sidebar.groupLanguage} options={languageOptions} selected={languages} onToggle={toggle(setLanguages)} defaultOpen={false} />
          <FilterGroup icon={GROUP_ICONS.stage} label={t.sidebar.groupStage} options={stageOptions} selected={stages} onToggle={toggle(setStages)} defaultOpen={false} />
          <FilterGroup icon={GROUP_ICONS.cost} label={t.sidebar.groupCost} options={costOptions} selected={costs} onToggle={toggle(setCosts)} defaultOpen={false} />

          {activeFilterCount > 0 ? (
            <button type="button" className="sidebar-reset" onClick={resetAll}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polyline points="1 4 1 10 7 10" />
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
              </svg>
              {t.sidebar.reset} · {activeFilterCount}
            </button>
          ) : null}
        </aside>

        <div
          className={`sidebar-overlay ${drawerOpen ? 'open' : ''}`}
          onClick={() => setDrawerOpen(false)}
          aria-hidden="true"
        />

        <main className="main">
          <div className="main-header">
            <h1 className="main-title">{t.home.h1}</h1>
            <span className="main-subtitle">{t.home.subtitle}</span>
          </div>

          <div className="stats-strip">
            <span className="stat-pill"><strong>{stats.total}</strong> {t.home.statsTotal}</span>
            <span className="stat-pill"><strong>{stats.fundedCount}</strong> {t.home.statsFunded}</span>
            <span className="stat-pill"><strong>{stats.sourceCount}</strong> {t.home.statsSources}</span>
            <span className="stat-pill"><strong>{stats.countryCount || 'EU+UK'}</strong> {t.home.statsCountries}</span>
          </div>

          <div className="results-bar">
            <div className="results-left">
              <button
                type="button"
                className="sidebar-collapse-btn"
                onClick={toggleSidebarCollapsed}
                aria-label={sidebarCollapsed ? t.sidebar.show : t.sidebar.hide}
                aria-expanded={!sidebarCollapsed}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <line x1="9" y1="3" x2="9" y2="21" />
                  {sidebarCollapsed ? <polyline points="14 9 17 12 14 15" /> : <polyline points="17 9 14 12 17 15" />}
                </svg>
                <span className="sidebar-collapse-label">{sidebarCollapsed ? t.sidebar.show : t.sidebar.hide}</span>
              </button>
              <span className="results-count">
                {t.results.showing(Math.min(visibleCount, filtered.length), filtered.length)}
              </span>
              {activeFilterCount > 0 ? (
                <button
                  type="button"
                  className="results-reset"
                  onClick={resetAll}
                  aria-label={t.sidebar.reset}
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                  {t.sidebar.reset}
                  <span className="results-reset-count">{activeFilterCount}</span>
                </button>
              ) : null}
            </div>
            <div className="results-tools">
              <button
                type="button"
                className="filters-mobile-btn"
                onClick={() => setDrawerOpen(true)}
                aria-label="Open filters"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="7" y1="12" x2="17" y2="12" />
                  <line x1="10" y1="18" x2="14" y2="18" />
                </svg>
                {t.sidebar.filtersMobile}
                {activeFilterCount > 0 ? (
                  <span className="filters-mobile-btn-count">{activeFilterCount}</span>
                ) : null}
              </button>
              <select
                className="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                aria-label="Sort"
              >
                {sortOptions.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="empty">
              <h3>{t.results.emptyTitle}</h3>
              <p>{t.results.emptyHint}</p>
            </div>
          ) : (
            <>
              <div className="grid">
                {filtered.slice(0, visibleCount).map((item) => renderTile(item))}
              </div>
              {filtered.length > visibleCount ? (
                <div className="load-more-wrap">
                  <button
                    type="button"
                    className="load-more-btn"
                    onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
                  >
                    {t.results.showMore}
                    <span className="load-more-count">
                      {filtered.length - visibleCount}
                    </span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                </div>
              ) : null}
            </>
          )}
        </main>
      </div>
    </>
  );
}
