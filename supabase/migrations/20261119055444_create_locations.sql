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
  (name, address)
values
  ('Olympic Hall', '267 DeNeve Dr.'),
  ('Hedrick Hall', '250 DeNeve Dr.'),
  ('Hedrick Summit', '240 DeNeve Dr.');

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