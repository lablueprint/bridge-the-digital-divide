create type class_type as enum ('class', 'workshop');

create table if not exists public.classes (
  id uuid primary key default gen_random_uuid(),
  location_id uuid not null references locations(id) on delete restrict, --is this right?
  title text not null,
  description text,
  type class_type not null,
  level text check (level in ('beginner', 'intermediate', 'advanced')),
  language text not null default 'en' check (language in ('en', 'es')),
  day_of_week smallint check (day_of_week between 0 and 6),
  date date,
  start_time time not null,
  end_time time not null check (end_time > start_time),
  capacity int check (capacity > 0),
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  check (day_of_week is not null or date is not null) --can i add this here?
);

alter table public.classes enable row level security;

insert into public.classes
  (location_id, title, type, level, language, day_of_week, start_time, end_time, capacity)
values
  ('1af62b6a-857a-4c1a-b83a-fd3c96145c3b', 'Intro to Email', 'class', 'beginner', 'en', 2, '10:00', '11:30', 15),
  ('e52f372a-c75a-40a7-9d48-70089bf93886', 'Introducción al Correo', 'class', 'intermediate', 'es', 4, '18:00', '19:30', 12),
  ('f9878ee7-1bcc-453e-b135-92bd0c169afd', 'Smartphone Basics', 'class', 'beginner', 'en', 1, '14:00', '15:30', 8);

create policy "anon can read classes"
on public.classes for select
to anon
using (true);

create policy "anon can insert classes"
on public.classes for insert
to anon
with check (true);

create policy "anon can update classes"
on public.classes for update
to anon
using (true)
with check (true);

create policy "anon can delete classes"
on public.classes for delete
to anon
using (true);