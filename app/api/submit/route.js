import { createClient } from '@supabase/supabase-js';

const TYPE_ENUM = new Set([
  'scholarship', 'fellowship', 'bootcamp', 'reskilling', 'returnship',
  'university_program', 'mooc', 'internship', 'mentorship', 'grant',
  'conference', 'competition', 'language_course', 'certification', 'accelerator',
]);

function badRequest(error) {
  return Response.json({ error }, { status: 400 });
}

function isValidUrl(value) {
  try {
    const u = new URL(value);
    return ['http:', 'https:'].includes(u.protocol);
  } catch {
    return false;
  }
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return badRequest('Invalid JSON body');
  }

  // Honeypot — silently accept and drop. Bots filling `website` should
  // not get a distinct error response that helps them tune their script.
  if (body?.website && body.website.trim().length > 0) {
    return Response.json({ ok: true, honeypot: true });
  }

  const title = typeof body?.title === 'string' ? body.title.trim() : '';
  const sourceUrl = typeof body?.source_url === 'string' ? body.source_url.trim() : '';
  const summary = typeof body?.summary === 'string' ? body.summary.trim() : '';
  const opportunityType = body?.opportunity_type;
  const countries = Array.isArray(body?.countries) ? body.countries : [];
  const submitterEmail = typeof body?.submitter_email === 'string' ? body.submitter_email.trim() : '';
  const submitterName = typeof body?.submitter_name === 'string' ? body.submitter_name.trim() : '';

  if (!title || !sourceUrl || !summary) return badRequest('Missing required fields');
  if (title.length < 5 || title.length > 200) return badRequest('Title length invalid');
  if (summary.length < 30 || summary.length > 1000) return badRequest('Summary length invalid');
  if (!isValidUrl(sourceUrl)) return badRequest('Invalid source URL');
  if (countries.length === 0) return badRequest('At least one country required');
  if (opportunityType && !TYPE_ENUM.has(opportunityType)) return badRequest('Invalid opportunity type');

  const payload = {
    title,
    source_url: sourceUrl,
    summary,
    opportunity_type: opportunityType || null,
    countries,
    language: typeof body?.language === 'string' ? body.language : null,
    deadline: body?.deadline || null,
    funding_amount: body?.funding_amount ? Number(body.funding_amount) : null,
    notes: typeof body?.notes === 'string' ? body.notes.trim() : '',
    locale: typeof body?.locale === 'string' ? body.locale : 'uk',
  };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  // Preview mode: log and acknowledge so the form works in local dev
  // without a Supabase project attached.
  if (!url || !key) {
    console.log('[submit] Supabase not configured — preview mode submission:');
    console.log(JSON.stringify({ payload, submitterEmail, submitterName }, null, 2));
    return Response.json({ ok: true, preview: true });
  }

  const supabase = createClient(url, key, { auth: { persistSession: false } });
  const { error } = await supabase.from('opportunity_submissions').insert({
    payload,
    submitter_email: submitterEmail || null,
    submitter_name: submitterName || null,
    status: 'pending',
  });

  if (error) {
    console.error('[submit] Supabase insert error:', error.message);
    return Response.json({ error: 'Failed to save submission' }, { status: 500 });
  }

  return Response.json({ ok: true });
}
