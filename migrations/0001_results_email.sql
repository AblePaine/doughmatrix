-- "Email me these results" requests (capture fold-in, Brad's ruling
-- 2026-11-05). The UI stores a request here; no mail send leg exists
-- yet, so rows accumulate with the results snapshot until a sender is
-- wired. Delivery state is implicit: every row is pending.
create table if not exists results_email_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  surface text not null,
  snapshot jsonb not null,
  created_at timestamptz not null default now()
);

create index if not exists results_email_requests_created_idx
  on results_email_requests (created_at);
