'use client';
import { useState } from 'react';
import { useLocale } from '../LocaleContext';

const TYPE_KEYS = [
  'scholarship', 'fellowship', 'bootcamp', 'reskilling', 'returnship',
  'university_program', 'mooc', 'internship', 'mentorship', 'grant',
  'conference', 'competition', 'language_course', 'certification', 'accelerator',
];

const COUNTRY_KEYS = [
  'EU', 'DE', 'AT', 'PL', 'CZ', 'FR', 'NL', 'ES', 'IT',
  'SE', 'DK', 'FI', 'IE', 'UK', 'UA', 'REMOTE',
];

const LANGUAGE_KEYS = ['en', 'uk', 'de'];

const EMPTY = {
  title: '',
  source_url: '',
  summary: '',
  opportunity_type: 'scholarship',
  countries: [],
  language: 'en',
  deadline: '',
  funding_amount: '',
  submitter_name: '',
  submitter_email: '',
  notes: '',
  // Honeypot — should always stay empty for real users.
  website: '',
};

function isValidUrl(value) {
  try {
    const u = new URL(value);
    return ['http:', 'https:'].includes(u.protocol);
  } catch {
    return false;
  }
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default function SubmitForm() {
  const { locale, t } = useLocale();
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
  };

  const toggleCountry = (code) => {
    setForm((f) => {
      const next = f.countries.includes(code)
        ? f.countries.filter((c) => c !== code)
        : [...f.countries, code];
      return { ...f, countries: next };
    });
  };

  const reset = () => {
    setForm(EMPTY);
    setStatus('idle');
    setErrorMessage('');
  };

  const validate = () => {
    if (!form.title.trim() || !form.source_url.trim() || !form.summary.trim()) {
      return t.submit.errorMissing;
    }
    if (form.title.length > 200) return t.submit.errorTitle;
    if (form.summary.length < 30 || form.summary.length > 1000) return t.submit.errorSummary;
    if (!isValidUrl(form.source_url)) return t.submit.errorUrl;
    if (form.submitter_email && !isValidEmail(form.submitter_email)) return t.submit.errorEmail;
    if (form.countries.length === 0) return t.submit.errorNoCountry;
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setErrorMessage(validationError);
      setStatus('error');
      return;
    }
    setStatus('submitting');
    setErrorMessage('');

    try {
      const res = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, locale }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || `HTTP ${res.status}`);
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(err.message ? `${t.submit.errorGeneric} (${err.message})` : t.submit.errorGeneric);
    }
  };

  if (status === 'success') {
    return (
      <div className="submit-success">
        <div className="submit-success-icon" aria-hidden="true">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2>{t.submit.successTitle}</h2>
        <p>{t.submit.successHint}</p>
        <button type="button" className="submit-button submit-button-secondary" onClick={reset}>
          {t.submit.submitAnother}
        </button>
      </div>
    );
  }

  return (
    <form className="submit-form" onSubmit={handleSubmit} noValidate>
      <fieldset className="form-fieldset">
        <legend className="form-legend">{t.submit.sectionAbout}</legend>

        <label className="form-field">
          <span className="form-label">
            {t.submit.fieldTitle} <span className="form-required">*</span>
          </span>
          <input
            type="text"
            className="form-input"
            value={form.title}
            onChange={handleChange('title')}
            maxLength={200}
            required
          />
          <span className="form-hint">{t.submit.fieldTitleHint}</span>
        </label>

        <label className="form-field">
          <span className="form-label">
            {t.submit.fieldUrl} <span className="form-required">*</span>
          </span>
          <input
            type="url"
            className="form-input"
            placeholder="https://"
            value={form.source_url}
            onChange={handleChange('source_url')}
            required
          />
          <span className="form-hint">{t.submit.fieldUrlHint}</span>
        </label>

        <label className="form-field">
          <span className="form-label">
            {t.submit.fieldSummary} <span className="form-required">*</span>
          </span>
          <textarea
            className="form-textarea"
            rows={4}
            value={form.summary}
            onChange={handleChange('summary')}
            maxLength={1000}
            required
          />
          <span className="form-hint">
            {t.submit.fieldSummaryHint}
            {' '}
            <span className="form-hint-count">{form.summary.length}/1000</span>
          </span>
        </label>
      </fieldset>

      <fieldset className="form-fieldset">
        <legend className="form-legend">{t.submit.sectionMeta}</legend>

        <label className="form-field">
          <span className="form-label">{t.submit.fieldType}</span>
          <select
            className="form-input"
            value={form.opportunity_type}
            onChange={handleChange('opportunity_type')}
          >
            {TYPE_KEYS.map((k) => (
              <option key={k} value={k}>{t.types[k]}</option>
            ))}
          </select>
        </label>

        <div className="form-field">
          <span className="form-label">
            {t.submit.fieldCountries} <span className="form-required">*</span>
          </span>
          <div className="form-chip-row">
            {COUNTRY_KEYS.map((code) => {
              const active = form.countries.includes(code);
              return (
                <button
                  key={code}
                  type="button"
                  className={`form-chip ${active ? 'active' : ''}`}
                  onClick={() => toggleCountry(code)}
                >
                  {t.countries[code] || code}
                </button>
              );
            })}
          </div>
          <span className="form-hint">{t.submit.fieldCountriesHint}</span>
        </div>

        <div className="form-grid">
          <label className="form-field">
            <span className="form-label">{t.submit.fieldLanguage}</span>
            <select
              className="form-input"
              value={form.language}
              onChange={handleChange('language')}
            >
              {LANGUAGE_KEYS.map((k) => (
                <option key={k} value={k}>{t.languages[k]}</option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span className="form-label">{t.submit.fieldDeadline}</span>
            <input
              type="date"
              className="form-input"
              value={form.deadline}
              onChange={handleChange('deadline')}
            />
            <span className="form-hint">{t.submit.fieldDeadlineHint}</span>
          </label>

          <label className="form-field">
            <span className="form-label">{t.submit.fieldFunding}</span>
            <input
              type="number"
              className="form-input"
              min="0"
              step="100"
              placeholder="0"
              value={form.funding_amount}
              onChange={handleChange('funding_amount')}
            />
            <span className="form-hint">{t.submit.fieldFundingHint}</span>
          </label>
        </div>
      </fieldset>

      <fieldset className="form-fieldset">
        <legend className="form-legend">{t.submit.sectionContact}</legend>

        <div className="form-grid">
          <label className="form-field">
            <span className="form-label">{t.submit.fieldName}</span>
            <input
              type="text"
              className="form-input"
              value={form.submitter_name}
              onChange={handleChange('submitter_name')}
              maxLength={120}
            />
          </label>

          <label className="form-field">
            <span className="form-label">{t.submit.fieldEmail}</span>
            <input
              type="email"
              className="form-input"
              value={form.submitter_email}
              onChange={handleChange('submitter_email')}
              maxLength={160}
            />
            <span className="form-hint">{t.submit.fieldEmailHint}</span>
          </label>
        </div>

        <label className="form-field">
          <span className="form-label">{t.submit.fieldNotes}</span>
          <textarea
            className="form-textarea"
            rows={3}
            value={form.notes}
            onChange={handleChange('notes')}
            maxLength={500}
          />
          <span className="form-hint">{t.submit.fieldNotesHint}</span>
        </label>

        {/* Honeypot — hidden from real users, bots fill it. */}
        <label className="form-honeypot" aria-hidden="true" tabIndex={-1}>
          Website
          <input
            type="text"
            value={form.website}
            onChange={handleChange('website')}
            tabIndex={-1}
            autoComplete="off"
          />
        </label>
      </fieldset>

      {status === 'error' ? (
        <div className="form-error" role="alert">{errorMessage}</div>
      ) : null}

      <div className="form-actions">
        <button
          type="submit"
          className="submit-button"
          disabled={status === 'submitting'}
        >
          {status === 'submitting' ? t.submit.submitting : t.submit.submit}
        </button>
      </div>
    </form>
  );
}
