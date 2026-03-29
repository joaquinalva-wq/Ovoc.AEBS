create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'student' check (role in ('student', 'admin')),
  email text,
  first_name text,
  last_name text,
  full_name text,
  year_level text,
  course text,
  division text,
  age integer,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.journey_answers (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles (id) on delete cascade,
  activity_key text not null,
  payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  unique (student_id, activity_key)
);

create table if not exists public.journey_progress (
  student_id uuid primary key references public.profiles (id) on delete cascade,
  submitted boolean not null default false,
  completion_percent integer not null default 0,
  current_module integer not null default 0,
  submitted_at timestamptz,
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.admin_notes (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles (id) on delete cascade,
  author_name text not null,
  note text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_answers_updated_at on public.journey_answers;
create trigger set_answers_updated_at
before update on public.journey_answers
for each row
execute function public.set_updated_at();

drop trigger if exists set_progress_updated_at on public.journey_progress;
create trigger set_progress_updated_at
before update on public.journey_progress
for each row
execute function public.set_updated_at();

create or replace function public.is_admin(check_user uuid)
returns boolean
language sql
stable
as $$
  select exists (
    select 1
    from public.profiles
    where id = check_user
      and role = 'admin'
  );
$$;

alter table public.profiles enable row level security;
alter table public.journey_answers enable row level security;
alter table public.journey_progress enable row level security;
alter table public.admin_notes enable row level security;

drop policy if exists "profiles_select_self_or_admin" on public.profiles;
create policy "profiles_select_self_or_admin"
on public.profiles
for select
using (
  auth.uid() = id
  or public.is_admin(auth.uid())
);

drop policy if exists "profiles_insert_self_or_admin" on public.profiles;
create policy "profiles_insert_self_or_admin"
on public.profiles
for insert
with check (
  auth.uid() = id
  or public.is_admin(auth.uid())
);

drop policy if exists "profiles_update_self_or_admin" on public.profiles;
create policy "profiles_update_self_or_admin"
on public.profiles
for update
using (
  auth.uid() = id
  or public.is_admin(auth.uid())
)
with check (
  auth.uid() = id
  or public.is_admin(auth.uid())
);

drop policy if exists "answers_select_owner_or_admin" on public.journey_answers;
create policy "answers_select_owner_or_admin"
on public.journey_answers
for select
using (
  auth.uid() = student_id
  or public.is_admin(auth.uid())
);

drop policy if exists "answers_insert_owner_or_admin" on public.journey_answers;
create policy "answers_insert_owner_or_admin"
on public.journey_answers
for insert
with check (
  auth.uid() = student_id
  or public.is_admin(auth.uid())
);

drop policy if exists "answers_update_owner_or_admin" on public.journey_answers;
create policy "answers_update_owner_or_admin"
on public.journey_answers
for update
using (
  auth.uid() = student_id
  or public.is_admin(auth.uid())
)
with check (
  auth.uid() = student_id
  or public.is_admin(auth.uid())
);

drop policy if exists "progress_select_owner_or_admin" on public.journey_progress;
create policy "progress_select_owner_or_admin"
on public.journey_progress
for select
using (
  auth.uid() = student_id
  or public.is_admin(auth.uid())
);

drop policy if exists "progress_insert_owner_or_admin" on public.journey_progress;
create policy "progress_insert_owner_or_admin"
on public.journey_progress
for insert
with check (
  auth.uid() = student_id
  or public.is_admin(auth.uid())
);

drop policy if exists "progress_update_owner_or_admin" on public.journey_progress;
create policy "progress_update_owner_or_admin"
on public.journey_progress
for update
using (
  auth.uid() = student_id
  or public.is_admin(auth.uid())
)
with check (
  auth.uid() = student_id
  or public.is_admin(auth.uid())
);

drop policy if exists "notes_select_admin_only" on public.admin_notes;
create policy "notes_select_admin_only"
on public.admin_notes
for select
using (public.is_admin(auth.uid()));

drop policy if exists "notes_insert_admin_only" on public.admin_notes;
create policy "notes_insert_admin_only"
on public.admin_notes
for insert
with check (public.is_admin(auth.uid()));
