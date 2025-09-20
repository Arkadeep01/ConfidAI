create table profiles (
  id uuid references auth.users(id) primary key,
  full_name text,
  avatar_url text,
  preferred_language text default 'en',
  created_at timestamp default now()
);