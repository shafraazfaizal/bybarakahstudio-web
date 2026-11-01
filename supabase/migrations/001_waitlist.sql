-- ByBarakahStudio waitlist
-- Run once in the Supabase SQL Editor (new project: bybarakahstudio).

create table if not exists public.waitlist (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  name        text not null check (char_length(name) between 1 and 80),
  email       text not null check (char_length(email) between 3 and 160),
  interest    text not null check (interest in ('nur', 'kids', 'both')),
  country     text not null check (country in ('uk', 'sri_lanka', 'elsewhere')),
  consent     boolean not null default false,
  source      text,
  user_agent  text,
  notified_at timestamptz            -- set this when you email them that orders are open
);

-- one signup per email (case-insensitive)
create unique index if not exists waitlist_email_unique on public.waitlist (lower(email));
create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);

-- Lock the table: RLS on with NO policies means the public anon key can't read or write it.
-- The website writes through the server-only service role key, which bypasses RLS.
alter table public.waitlist enable row level security;

-- Handy view for checking numbers in the dashboard
create or replace view public.waitlist_summary
with (security_invoker = true) as
select
  count(*)                                         as total,
  count(*) filter (where interest in ('nur','both'))  as want_nur,
  count(*) filter (where interest in ('kids','both')) as want_kids,
  count(*) filter (where country = 'uk')           as uk,
  count(*) filter (where country = 'sri_lanka')    as sri_lanka,
  count(*) filter (where country = 'elsewhere')    as elsewhere
from public.waitlist;
