create table trash_bin (
  id uuid default gen_random_uuid(),
  title text, 
  created_at timestamp with time zone default now()
)