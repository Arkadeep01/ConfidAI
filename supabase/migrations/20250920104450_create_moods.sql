create table moods (
  id bigserial primary key,
  user_id uuid references auth.users(id) on delete cascade,
  mood text, -- happy, sad, anxious, etc.
  sentiment jsonb, -- store AI tone/sentiment analysis
  created_at timestamp default now()
);
