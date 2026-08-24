-- =========================================================
-- SUPABASE / POSTGRESQL DATABASE SCHEMA FOR PRODUCT CATALOG
-- =========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. CATEGORIES TABLE
create table if not exists public.categories (
    id text primary key,
    name text not null,
    slug text unique not null,
    description text,
    image_url text,
    subcategories text[] default '{}',
    display_order integer default 1,
    status text default 'active',
    created_at timestamp with time zone default now()
);

-- 2. COLLECTIONS TABLE
create table if not exists public.collections (
    id text primary key,
    name text not null,
    slug text unique not null,
    description text,
    image_url text,
    display_order integer default 1,
    status text default 'active',
    created_at timestamp with time zone default now()
);

-- 3. PRODUCTS TABLE
create table if not exists public.products (
    id text primary key,
    name text not null,
    slug text unique not null,
    sku text not null,
    category text not null check (category in ('tshirts', 'shorts')),
    subcategory text not null,
    collection_ids text[] default '{}',
    selling_price numeric not null,
    original_price numeric,
    discount_percentage integer,
    short_description text,
    description text,
    fit text,
    fabric text,
    gsm text,
    sleeve text,
    neck text,
    length text,
    pattern text,
    stretch text,
    occasion text,
    gender text default 'Men',
    country_of_origin text default 'India',
    care_instructions text[] default '{}',
    status text default 'active' check (status in ('active', 'hidden', 'draft')),
    badge text check (badge in ('New', 'Featured', 'Bestseller', 'Limited', 'Sale')),
    featured boolean default false,
    new_arrival boolean default false,
    seo_title text,
    meta_description text,
    created_at timestamp with time zone default now(),
    updated_at timestamp with time zone default now()
);

-- 4. PRODUCT IMAGES TABLE
create table if not exists public.product_images (
    id text primary key,
    product_id text references public.products(id) on delete cascade,
    image_url text not null,
    alt_text text,
    is_primary boolean default false,
    angle text default 'front',
    sort_order integer default 0
);

-- 5. PRODUCT COLORS TABLE
create table if not exists public.product_colors (
    id text primary key,
    product_id text references public.products(id) on delete cascade,
    color_name text not null,
    hex_code text not null
);

-- 6. PRODUCT SIZES TABLE
create table if not exists public.product_sizes (
    id text primary key default uuid_generate_v4()::text,
    product_id text references public.products(id) on delete cascade,
    size text not null check (size in ('S', 'M', 'L', 'XL', 'XXL')),
    available boolean default true
);

-- 7. ENQUIRIES TABLE
create table if not exists public.enquiries (
    id text primary key,
    customer_name text not null,
    phone text not null,
    email text,
    product_id text,
    product_name text,
    product_code text,
    selected_color text,
    selected_size text,
    message text not null,
    status text default 'new' check (status in ('new', 'contacted', 'completed')),
    created_at timestamp with time zone default now()
);

-- 8. WEBSITE SETTINGS TABLE
create table if not exists public.website_settings (
    id text primary key default 'primary_config',
    brand_name text not null,
    tagline text,
    announcement_enabled boolean default true,
    announcement_text text,
    phone text,
    whatsapp_number text,
    email text,
    address text,
    business_hours text,
    map_embed_url text,
    instagram_url text,
    facebook_url text,
    whatsapp_url text,
    footer_description text,
    copyright_text text,
    updated_at timestamp with time zone default now()
);

-- =========================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================

alter table public.products enable row level security;
alter table public.categories enable row level security;
alter table public.collections enable row level security;
alter table public.enquiries enable row level security;
alter table public.website_settings enable row level security;

-- Public can read active products, categories, collections, and website settings
create policy "Public can view active products" on public.products for select using (status = 'active');
create policy "Public can view active categories" on public.categories for select using (status = 'active');
create policy "Public can view active collections" on public.collections for select using (status = 'active');
create policy "Public can view website settings" on public.website_settings for select using (true);

-- Public can submit enquiries
create policy "Public can submit enquiries" on public.enquiries for insert with check (true);

-- Authenticated Admin can perform full CRUD
create policy "Admins have full access to products" on public.products for all using (auth.role() = 'authenticated');
create policy "Admins have full access to categories" on public.categories for all using (auth.role() = 'authenticated');
create policy "Admins have full access to collections" on public.collections for all using (auth.role() = 'authenticated');
create policy "Admins have full access to enquiries" on public.enquiries for all using (auth.role() = 'authenticated');
create policy "Admins have full access to settings" on public.website_settings for all using (auth.role() = 'authenticated');
