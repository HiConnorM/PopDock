-- ─────────────────────────────────────────────
-- Popdock — Initial Database Schema
-- Run in Supabase SQL Editor
-- ─────────────────────────────────────────────

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ── Profiles ──────────────────────────────────
create table if not exists profiles (
  id            uuid primary key references auth.users on delete cascade,
  email         text not null,
  full_name     text,
  avatar_url    text,
  plan          text not null default 'free' check (plan in ('free','creator','studio')),
  project_count int  not null default 0,
  generation_count int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

alter table profiles enable row level security;
create policy "Users can view/edit own profile" on profiles
  for all using (auth.uid() = id);

-- ── Subscriptions ────────────────────────────
create table if not exists subscriptions (
  id                       uuid primary key default uuid_generate_v4(),
  user_id                  uuid not null references profiles(id) on delete cascade,
  stripe_customer_id       text not null,
  stripe_subscription_id   text not null unique,
  plan                     text not null check (plan in ('creator','studio')),
  status                   text not null,
  current_period_end       timestamptz,
  cancel_at_period_end     boolean not null default false,
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

alter table subscriptions enable row level security;
create policy "Users can view own subscription" on subscriptions
  for select using (auth.uid() = user_id);

-- ── Brand Profiles ────────────────────────────
create table if not exists brand_profiles (
  id                   uuid primary key default uuid_generate_v4(),
  user_id              uuid not null references profiles(id) on delete cascade,
  project_id           uuid,
  business_name        text not null default '',
  tagline              text,
  website_url          text,
  instagram_handle     text,
  product_description  text not null default '',
  product_categories   text[] not null default '{}',
  price_range_min      numeric not null default 0,
  price_range_max      numeric not null default 100,
  target_customer      text not null default '',
  aesthetics           text[] not null default '{}',
  vibe_words           text[] not null default '{}',
  color_palette        jsonb,
  typography           jsonb,
  logo_url             text,
  product_photo_urls   text[] not null default '{}',
  reference_urls       text[] not null default '{}',
  brand_personality    text,
  tone_of_voice        text,
  visual_style         text,
  brand_summary        text,
  material_style       text,
  created_at           timestamptz not null default now(),
  updated_at           timestamptz not null default now()
);

alter table brand_profiles enable row level security;
create policy "Users can manage own brand profiles" on brand_profiles
  for all using (auth.uid() = user_id);

-- ── Popup Projects ────────────────────────────
create table if not exists popup_projects (
  id               uuid primary key default uuid_generate_v4(),
  user_id          uuid not null references profiles(id) on delete cascade,
  brand_profile_id uuid references brand_profiles(id),
  title            text not null,
  popup_types      text[] not null default '{}',
  status           text not null default 'planning'
                     check (status in ('planning','in-progress','ready','completed')),
  completion_pct   int  not null default 0,
  city             text not null default '',
  venue            text,
  event_types      text[] not null default '{}',
  event_date       date,
  indoor_outdoor   text not null default 'outdoor'
                     check (indoor_outdoor in ('indoor','outdoor','both')),
  booth_size       text not null default '6ft table',
  budget           text not null default '100-300',
  experience       text not null default 'first-time',
  inventory_count  int,
  amenities        text[] not null default '{}',
  aesthetics       text[] not null default '{}',
  kit_sections     text[] not null default '{}',
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);

alter table popup_projects enable row level security;
create policy "Users can manage own projects" on popup_projects
  for all using (auth.uid() = user_id);

-- ── Kit Sections ──────────────────────────────
create table if not exists kit_sections (
  id           uuid primary key default uuid_generate_v4(),
  project_id   uuid not null references popup_projects(id) on delete cascade,
  section_type text not null,
  status       text not null default 'todo'
                 check (status in ('todo','in-progress','complete')),
  title        text not null default '',
  subtitle     text not null default '',
  content      jsonb not null default '{}',
  generated_at timestamptz,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  unique(project_id, section_type)
);

alter table kit_sections enable row level security;
create policy "Users can manage own kit sections" on kit_sections
  for all using (
    auth.uid() = (select user_id from popup_projects where id = project_id)
  );

-- ── Materials ─────────────────────────────────
create table if not exists materials (
  id             uuid primary key default uuid_generate_v4(),
  project_id     uuid not null references popup_projects(id) on delete cascade,
  template_id    uuid,
  material_type  text not null,
  title          text not null default '',
  status         text not null default 'pending'
                   check (status in ('pending','generating','ready','error')),
  content_json   jsonb not null default '{}',
  design_json    jsonb not null default '{}',
  preview_url    text,
  export_urls    jsonb not null default '{}',
  dimensions     text not null default '',
  format         text[] not null default '{}',
  generated_at   timestamptz,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

alter table materials enable row level security;
create policy "Users can manage own materials" on materials
  for all using (
    auth.uid() = (select user_id from popup_projects where id = project_id)
  );

-- ── Checklist Items ───────────────────────────
create table if not exists checklist_items (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references popup_projects(id) on delete cascade,
  category    text not null,
  task        text not null,
  notes       text,
  urgent      boolean not null default false,
  due_offset  text,
  completed   boolean not null default false,
  sort_order  int   not null default 0,
  created_at  timestamptz not null default now()
);

alter table checklist_items enable row level security;
create policy "Users can manage own checklist" on checklist_items
  for all using (
    auth.uid() = (select user_id from popup_projects where id = project_id)
  );

-- ── Shopping Items ────────────────────────────
create table if not exists shopping_items (
  id              uuid primary key default uuid_generate_v4(),
  project_id      uuid not null references popup_projects(id) on delete cascade,
  category        text not null default '',
  name            text not null,
  quantity        int  not null default 1,
  unit            text,
  estimated_cost  numeric not null default 0,
  priority        text not null default 'recommended'
                    check (priority in ('essential','recommended','optional')),
  notes           text,
  purchased       boolean not null default false,
  purchased_at    timestamptz,
  created_at      timestamptz not null default now()
);

alter table shopping_items enable row level security;
create policy "Users can manage own shopping list" on shopping_items
  for all using (
    auth.uid() = (select user_id from popup_projects where id = project_id)
  );

-- ── Timeline Tasks ────────────────────────────
create table if not exists timeline_tasks (
  id          uuid primary key default uuid_generate_v4(),
  project_id  uuid not null references popup_projects(id) on delete cascade,
  week        text not null,
  task        text not null,
  category    text not null default '',
  notes       text,
  completed   boolean not null default false,
  due_date    date,
  created_at  timestamptz not null default now()
);

alter table timeline_tasks enable row level security;
create policy "Users can manage own timeline" on timeline_tasks
  for all using (
    auth.uid() = (select user_id from popup_projects where id = project_id)
  );

-- ── Inventory Items ───────────────────────────
create table if not exists inventory_items (
  id               uuid primary key default uuid_generate_v4(),
  project_id       uuid not null references popup_projects(id) on delete cascade,
  category         text not null default '',
  name             text not null,
  sku              text,
  quantity         int  not null default 0,
  target_quantity  int  not null default 0,
  price_tier       text not null check (price_tier in ('impulse','core','premium','hero')),
  price_suggested  numeric not null default 0,
  display_zone     text,
  notes            text,
  created_at       timestamptz not null default now()
);

alter table inventory_items enable row level security;
create policy "Users can manage own inventory" on inventory_items
  for all using (
    auth.uid() = (select user_id from popup_projects where id = project_id)
  );

-- ── AI Generation Log ─────────────────────────
create table if not exists ai_generations (
  id           uuid primary key default uuid_generate_v4(),
  project_id   uuid references popup_projects(id) on delete set null,
  user_id      uuid not null references profiles(id) on delete cascade,
  section_type text not null,
  model        text not null,
  prompt_hash  text,
  tokens_used  int,
  success      boolean not null default false,
  error        text,
  created_at   timestamptz not null default now()
);

alter table ai_generations enable row level security;
create policy "Users can view own generation log" on ai_generations
  for select using (auth.uid() = user_id);

-- ── Auto-update trigger ───────────────────────
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger profiles_updated_at        before update on profiles        for each row execute function update_updated_at();
create trigger brand_profiles_updated_at  before update on brand_profiles  for each row execute function update_updated_at();
create trigger popup_projects_updated_at  before update on popup_projects  for each row execute function update_updated_at();
create trigger kit_sections_updated_at    before update on kit_sections    for each row execute function update_updated_at();
create trigger materials_updated_at       before update on materials       for each row execute function update_updated_at();

-- ── Profile auto-create on signup ─────────────
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'avatar_url'
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
