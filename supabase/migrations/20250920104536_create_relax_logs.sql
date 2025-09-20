create table relax_logs (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  tool text, -- e.g., breathing, meditation, audio
  duration int,
  created_at timestamp default now()
);