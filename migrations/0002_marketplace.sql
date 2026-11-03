create table if not exists categories (
  slug text primary key,
  name text not null,
  name_am text not null default '',
  tint text not null default 'mint',
  sort int not null default 0
);

create table if not exists profiles (
  user_id text primary key,
  display_name text not null,
  phone text not null default '',
  city text not null default 'Addis Ababa',
  language text not null default 'en',
  is_business boolean not null default false,
  is_admin boolean not null default false,
  suspended boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists businesses (
  id serial primary key,
  owner_user_id text,
  name text not null,
  slug text not null unique,
  category_slug text not null,
  city text not null,
  area text not null default '',
  phone text not null default '',
  hours text not null default '',
  about text not null default '',
  logo text not null default '',
  verified boolean not null default false,
  suspended boolean not null default false,
  plan text not null default 'free',
  rating_tenths int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists services (
  id serial primary key,
  business_id int not null references businesses (id),
  category_slug text not null,
  kind text not null default 'service',
  title text not null,
  title_am text not null default '',
  blurb text not null default '',
  blurb_am text not null default '',
  description text not null default '',
  description_am text not null default '',
  image text not null default '',
  hero_image text not null default '',
  price int not null,
  compare_at int,
  price_premium int,
  price_platinum int,
  badge text not null default '',
  perk text not null default '',
  support text not null default '',
  tint text not null default 'mint',
  home_hero boolean not null default false,
  spotlight boolean not null default false,
  featured boolean not null default false,
  stock int,
  active boolean not null default true,
  rating_tenths int not null default 0,
  review_count int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists staff (
  id serial primary key,
  service_id int not null references services (id),
  name text not null,
  title text not null default '',
  photo text not null default '',
  phone text not null default ''
);

create table if not exists reviews (
  id serial primary key,
  service_id int not null references services (id),
  user_id text,
  author text not null,
  stars int not null,
  body text not null default '',
  created_at timestamptz not null default now(),
  constraint reviews_stars check (stars between 1 and 5)
);
create unique index if not exists reviews_user_service_idx on reviews (user_id, service_id) where user_id is not null;

create table if not exists orders (
  id serial primary key,
  customer_id text,
  customer_name text not null,
  business_id int not null references businesses (id),
  status text not null default 'placed',
  payment_method text not null,
  payment_status text not null default 'unpaid',
  address text not null default '',
  city text not null default '',
  scheduled_for date,
  note text not null default '',
  subtotal int not null,
  commission_etb int not null default 0,
  sample boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists order_items (
  id serial primary key,
  order_id int not null references orders (id),
  service_id int,
  title text not null,
  tier text not null,
  qty int not null,
  unit_price int not null
);

create table if not exists favorites (
  user_id text not null,
  service_id int not null references services (id),
  primary key (user_id, service_id)
);

create table if not exists favorite_businesses (
  user_id text not null,
  business_id int not null references businesses (id),
  primary key (user_id, business_id)
);

create table if not exists threads (
  id serial primary key,
  business_id int not null references businesses (id),
  customer_id text not null,
  created_at timestamptz not null default now(),
  unique (business_id, customer_id)
);

create table if not exists messages (
  id serial primary key,
  thread_id int not null references threads (id),
  sender_id text not null,
  body text not null,
  created_at timestamptz not null default now()
);

create table if not exists notifications (
  id serial primary key,
  user_id text not null,
  title text not null,
  body text not null default '',
  read boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists reports (
  id serial primary key,
  reporter_id text,
  business_id int,
  service_id int,
  body text not null,
  status text not null default 'open',
  created_at timestamptz not null default now()
);

create table if not exists activity (
  id serial primary key,
  actor_id text,
  action text not null,
  detail text not null default '',
  created_at timestamptz not null default now()
);

create table if not exists platform_settings (
  id int primary key,
  commission_bps int not null default 800,
  featured_price_etb int not null default 1499
);

create table if not exists plan_requests (
  id serial primary key,
  business_id int not null references businesses (id),
  plan text not null,
  status text not null default 'requested',
  created_at timestamptz not null default now()
);

create index if not exists services_business_idx on services (business_id);
create index if not exists services_category_idx on services (category_slug);
create index if not exists orders_customer_idx on orders (customer_id);
create index if not exists orders_business_idx on orders (business_id);
create index if not exists messages_thread_idx on messages (thread_id);
create index if not exists notifications_user_idx on notifications (user_id);
