-- herhive — initial schema for the opportunities catalogue.
-- Mirrors the dityam.com.ua opportunities table shape, adapted for the
-- women-in-tech-and-education audience (18-99 across EU/UK/Ukraine).

create extension if not exists "uuid-ossp";

create table if not exists opportunities (
  id              uuid primary key default uuid_generate_v4(),
  title           text not null,
  slug            text not null unique,
  summary         text not null,
  opportunity_type text not null,
  categories      text[] not null default '{}',
  eligibility_tags text[] not null default '{}',
  career_stage    text[] not null default '{}',
  residency       text[] not null default '{}',
  countries       text[] not null default '{}',
  languages       text[] not null default '{}',
  age_from        smallint not null default 18,
  age_to          smallint not null default 99,
  format          text not null default '',
  cost_type       text not null,
  funding_amount  numeric,
  funding_currency text default 'EUR',
  deadline        date,
  source_url      text not null,
  source          text not null default '',
  content_hash    text not null unique,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

-- Speed up filter/list queries on the home page.
create index if not exists opportunities_deadline_idx on opportunities (deadline);
create index if not exists opportunities_type_idx on opportunities (opportunity_type);
create index if not exists opportunities_cost_idx on opportunities (cost_type);
create index if not exists opportunities_created_idx on opportunities (created_at desc);
create index if not exists opportunities_countries_idx on opportunities using gin (countries);
create index if not exists opportunities_categories_idx on opportunities using gin (categories);
create index if not exists opportunities_eligibility_idx on opportunities using gin (eligibility_tags);

-- Type/cost CHECK constraints keep junk out of the catalogue and mirror
-- the enum sets in scrapers/lib/normalize.mjs.
alter table opportunities
  add constraint opportunities_type_check check (opportunity_type in (
    'scholarship', 'fellowship', 'bootcamp', 'reskilling',
    'returnship', 'university_program', 'mooc', 'internship',
    'mentorship', 'grant', 'conference', 'competition',
    'language_course', 'certification', 'accelerator'
  )),
  add constraint opportunities_cost_check check (cost_type in (
    'free', 'partially_free', 'funded', 'paid_affordable', 'paid_premium', 'closed'
  )),
  add constraint opportunities_age_check check (age_from >= 18 and age_to <= 99 and age_from <= age_to);

-- Submissions from the community (verified before they enter `opportunities`).
create table if not exists opportunity_submissions (
  id              uuid primary key default uuid_generate_v4(),
  payload         jsonb not null,
  submitter_email text,
  submitter_name  text,
  status          text not null default 'pending',
  reviewer_note   text,
  created_at      timestamptz not null default now(),
  reviewed_at     timestamptz
);

create index if not exists opportunity_submissions_status_idx
  on opportunity_submissions (status, created_at desc);

-- Newsletter signups (segmented by category preferences).
create table if not exists newsletter_subscribers (
  id              uuid primary key default uuid_generate_v4(),
  email           text not null unique,
  preferred_categories text[] not null default '{}',
  preferred_countries  text[] not null default '{}',
  preferred_language   text default 'uk',
  confirmed       boolean not null default false,
  created_at      timestamptz not null default now()
);
