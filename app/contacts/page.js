import Link from 'next/link';

export const metadata = {
  title: 'Контакти',
  description:
    'Як звʼязатися з командою herhive: email, Instagram, запропонувати нову програму, повідомити про помилку.',
  alternates: { canonical: 'https://herhive.eu/contacts' },
};

export default function ContactsPage() {
  return (
    <div className="container">
      <nav className="opportunity-breadcrumbs">
        <Link href="/">← Усі можливості</Link>
      </nav>
      <article className="legal-page">
        <h1>Контакти</h1>

        <p className="lead">
          Будемо раді зворотному звʼязку, новим програмам, виправленням помилок
          або просто привітанням.
        </p>

        <div className="contact-grid">
          <a href="mailto:hello@herhive.eu" className="contact-card">
            <span className="contact-icon">✉️</span>
            <div>
              <div className="contact-title">Написати нам</div>
              <div className="contact-sub">hello@herhive.eu</div>
            </div>
          </a>

          <Link href="/submit" className="contact-card">
            <span className="contact-icon">➕</span>
            <div>
              <div className="contact-title">Запропонувати можливість</div>
              <div className="contact-sub">Заповніть форму — Mary перевірить і додасть.</div>
            </div>
          </Link>

          <a
            href="mailto:hello@herhive.eu?subject=Зауваження%20до%20herhive.eu"
            className="contact-card"
          >
            <span className="contact-icon">🐛</span>
            <div>
              <div className="contact-title">Повідомити про помилку</div>
              <div className="contact-sub">Прострочена програма, неправильний опис, баг.</div>
            </div>
          </a>

          <a
            href="https://www.instagram.com/herhive.eu"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card"
          >
            <span className="contact-icon">📷</span>
            <div>
              <div className="contact-title">Instagram</div>
              <div className="contact-sub">@herhive.eu — щотижневі апдейти</div>
            </div>
          </a>
        </div>

        <h2>Партнерство</h2>
        <p>
          Ви буткемп, EdTech-провайдер, університет або фундація і хочете
          обговорити featured placement чи верифіковане партнерство?{' '}
          <a href="mailto:partners@herhive.eu">partners@herhive.eu</a>.
        </p>
      </article>
    </div>
  );
}
