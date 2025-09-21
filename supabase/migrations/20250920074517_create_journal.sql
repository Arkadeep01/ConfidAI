create table journals (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  content text,
  created_at timestamp default now(),
  updated_at timestamp default now()
);