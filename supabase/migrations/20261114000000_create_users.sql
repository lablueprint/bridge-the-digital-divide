-- USERS TABLE --

-- Example migration: creates a users table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  username text not null unique
);

-- This line enables RLS (row level security)
-- later we add "policies", that restrict which users can do certain actions that change database information
alter table public.users enable row level security;


-- example of adding a seed:

insert into users 
  (username)
values
  ('kianbaghai'),
  ('gokulnamibiar');

-- Example policy: allow browser clients to read users through the publishable key.
create policy "Allow public users reads"
on public.users
for select
to anon, authenticated
using (true);