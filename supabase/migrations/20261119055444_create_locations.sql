-- LOCATIONS TABLE --

create table if not exists public.locations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text not null,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

alter table public.locations enable row level security;

insert into locations 
  (id, name, address)
values
  ('1af62b6a-857a-4c1a-b83a-fd3c96145c3b', 'Olympic Hall', '267 DeNeve Dr.'),
  ('e52f372a-c75a-40a7-9d48-70089bf93886','Hedrick Hall', '250 DeNeve Dr.'),
  ('f9878ee7-1bcc-453e-b135-92bd0c169afd','Hedrick Summit', '240 DeNeve Dr.');

create policy "Public can read locations"
on public.locations for select
to anon
using (true);

create policy "Public can insert locations"
on public.locations for insert
to anon
with check (true);

create policy "Public can update locations"
on public.locations for update
to anon
using (true)
with check (true);

create policy "Public can delete locations"
on public.locations for delete
to anon
using (true);