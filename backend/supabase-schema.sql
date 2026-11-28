-- =========================================================================
-- GramBangla (গ্রামবাংলা) Organic Food E-commerce — Supabase PostgreSQL Schema
-- =========================================================================
-- How to run:
-- 1. Go to your Supabase Dashboard: https://supabase.com/dashboard
-- 2. Select your project -> SQL Editor -> New query
-- 3. Paste this entire file and click "Run"
-- =========================================================================

-- 1. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_bn TEXT NOT NULL,
  name_en TEXT NOT NULL,
  image TEXT NOT NULL,
  item_count INT DEFAULT 0,
  description_bn TEXT NOT NULL,
  tagline TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name_bn TEXT NOT NULL,
  name_en TEXT NOT NULL,
  category TEXT NOT NULL REFERENCES categories(slug) ON DELETE CASCADE,
  category_name_bn TEXT NOT NULL,
  short_desc_bn TEXT NOT NULL,
  full_desc_bn TEXT NOT NULL,
  price NUMERIC NOT NULL,
  original_price NUMERIC,
  discount_percent INT,
  unit TEXT NOT NULL,
  in_stock BOOLEAN DEFAULT TRUE,
  stock_count INT DEFAULT 50,
  rating NUMERIC DEFAULT 5.0,
  review_count INT DEFAULT 0,
  featured BOOLEAN DEFAULT FALSE,
  is_bestseller BOOLEAN DEFAULT FALSE,
  organic_certified BOOLEAN DEFAULT TRUE,
  image TEXT NOT NULL,
  gallery JSONB DEFAULT '[]'::jsonb,
  badge TEXT,
  source_location TEXT NOT NULL,
  nutritional_highlights JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  order_id TEXT PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  delivery_method TEXT DEFAULT 'regular',
  payment_method TEXT DEFAULT 'cod',
  items JSONB NOT NULL DEFAULT '[]'::jsonb,
  subtotal NUMERIC NOT NULL,
  delivery_fee NUMERIC NOT NULL DEFAULT 0,
  discount NUMERIC NOT NULL DEFAULT 0,
  total NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'Pending',
  order_date TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CUSTOMERS TABLE
CREATE TABLE IF NOT EXISTS customers (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT UNIQUE NOT NULL,
  email TEXT,
  city TEXT NOT NULL,
  address TEXT NOT NULL,
  total_orders INT DEFAULT 1,
  total_spent NUMERIC DEFAULT 0,
  last_order_date TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. COUPONS TABLE
CREATE TABLE IF NOT EXISTS coupons (
  id TEXT PRIMARY KEY,
  code TEXT UNIQUE NOT NULL,
  discount_percent INT NOT NULL,
  min_order_amount NUMERIC DEFAULT 0,
  usage_count INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  expiry_date TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. STORE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS store_settings (
  id INT PRIMARY KEY DEFAULT 1,
  store_name TEXT NOT NULL,
  hotline TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  email TEXT NOT NULL,
  address TEXT NOT NULL,
  delivery_dhaka NUMERIC NOT NULL DEFAULT 70,
  delivery_outside NUMERIC NOT NULL DEFAULT 130,
  free_shipping_threshold NUMERIC NOT NULL DEFAULT 2000,
  meta_pixel_id TEXT DEFAULT '',
  is_store_open BOOLEAN DEFAULT TRUE,
  announcement_text TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CONTACT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. NEWSLETTER SUBSCRIBERS TABLE
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY (RLS) & PUBLIC READ ACCESS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow public read & write access (or customize as desired for authenticated roles)
CREATE POLICY "Public Read Categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Products" ON products FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON store_settings FOR SELECT USING (true);
CREATE POLICY "Public Read Coupons" ON coupons FOR SELECT USING (true);
CREATE POLICY "Public Insert Orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Orders" ON orders FOR SELECT USING (true);
CREATE POLICY "Public Update Orders" ON orders FOR UPDATE USING (true);
CREATE POLICY "Public All Products" ON products FOR ALL USING (true);
CREATE POLICY "Public All Customers" ON customers FOR ALL USING (true);
CREATE POLICY "Public All Messages" ON contact_messages FOR ALL USING (true);
CREATE POLICY "Public All Subscribers" ON newsletter_subscribers FOR ALL USING (true);
CREATE POLICY "Public All Settings" ON store_settings FOR ALL USING (true);
CREATE POLICY "Public All Coupons" ON coupons FOR ALL USING (true);

-- =========================================================================
-- INITIAL SEED DATA
-- =========================================================================

-- Insert Categories
INSERT INTO categories (id, slug, name_bn, name_en, image, item_count, description_bn, tagline)
VALUES 
  ('cat-1', 'mustard-oil', 'সরিষার তেল', 'Cold Pressed Mustard Oil', 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80', 8, 'সিরাজগঞ্জের বাছাইকৃত মাঘী সরিষা থেকে কাঠের ঘানিতে ভাঙা খাঁটি ঝাঁঝালো তেল', 'শতভাগ কাঠের ঘানিভাঙা'),
  ('cat-2', 'ghee', 'গাওয়া ও বিলোড়ন ঘি', 'Grass-fed Desi Ghee', 'https://www.cookwithkushi.com/wp-content/uploads/2022/10/best_homemade_traditional_desi_ghee.jpg', 6, 'দেশি গাভীর খাঁটি দুধের মাখন থেকে তৈরি দানাদার সুবাসিত ঘি', 'মাটির হাঁড়িতে মৃদু আঁচে তৈরি'),
  ('cat-3', 'honey', 'প্রাকৃতিক মধু', 'Sundarbans Wild Honey', 'https://www.purehaat.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fphunipro%2Fimage%2Fupload%2Fv1772265231%2Fsn9yq7dd9l9-1772265231077-images-Swadeshii-Honey-Modhu-Product-Sorisha-2-removebg-preview.png&w=1200&q=75', 5, 'সুন্দরবনের গভীর অরণ্য ও খলিশা ফুলের অপরিশোধিত কাঁচা এনজাইম সমৃদ্ধ মধু', '১০০% কাঁচা ও আনপ্রসেসড'),
  ('cat-4', 'gur', 'খেজুরের গুড়', 'Authentic Date Jaggery', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRLtBXSxGFZMinsYa4GyfhGj2QssMc__87lV6plIEuv9zulQOdeDJ4qV8&s=10', 4, 'যশোরের ঐতিহ্যবাহী গাছিদের হাতে তৈরি খাঁটি নলেন গুড় ও সুস্বাদু পাটালি', 'শীতের আসল প্রাকৃতিক মিষ্টি'),
  ('cat-5', 'rice', 'সুগন্ধি ও ঢেঁকিছাঁটা চাল', 'Aromatic & Heritage Rice', 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', 7, 'দিনাজপুরের চিনিগুঁড়া, কাটারিভোগ ও লাল চালের পুষ্টিকর পুষ্টিগুণ', 'কেমিক্যাল ও পলিশবিহীন'),
  ('cat-6', 'spices', 'পাহাড়ি খাঁটি মসলা', 'Pure Native Spices', 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80', 9, 'খাগড়াছড়ির জুমের হলুদ, খাঁটি মরিচ গুঁড়া ও ঘানিভাঙা কালোজিরা তেল', 'লেড ও কৃত্রিম রঙ মুক্ত')
ON CONFLICT (slug) DO NOTHING;

-- Insert Products
INSERT INTO products (id, slug, name_bn, name_en, category, category_name_bn, short_desc_bn, full_desc_bn, price, original_price, discount_percent, unit, in_stock, stock_count, rating, review_count, featured, is_bestseller, organic_certified, image, gallery, badge, source_location, nutritional_highlights)
VALUES
  ('gb-1', 'cold-pressed-mustard-oil-1l', 'কাঠের ঘানিভাঙা সরিষার তেল – ১ লিটার', 'Traditional Cold Pressed Mustard Oil – 1L', 'mustard-oil', 'সরিষার তেল', 'সিরাজগঞ্জের মাঠ থেকে বাছাই করা মাঘী সরিষা। কাঠের ঘানিতে ধীর গতিতে কোল্ড-প্রেসড করায় প্রাকৃতিক ঝাঁঝ ও পুষ্টি অক্ষুণ্ণ।', 'আমাদের এই তেল স্থানীয় কৃষকদের সংগৃহীত সেরা জাতের মাঘী সরিষা থেকে প্রস্তুত করা হয়। সনাতন কাঠের ঘানিতে কোল্ড-প্রেসড করায় খাঁটি ঝাঁঝ ও ভিটামিন ই পুরোপুরি অক্ষুণ্ণ থাকে।', 360, 420, 14, '১ লিটার কাঁচের বোতল', true, 45, 4.9, 184, true, true, true, 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80"]'::jsonb, 'সেরা বিক্রয়', 'তাড়াশ, সিরাজগঞ্জ', '["সনাতন কাঠের ঘানিতে কোল্ড-প্রেসড", "প্রাকৃতিক ঝাঁঝ ও আসল সুবাস", "কোনো কেমিক্যাল নেই"]'::jsonb),
  ('gb-2', 'pure-desi-ghee-500g', 'পাবনার খাঁটি দানাদার গাওয়া ঘি – ৫০০ গ্রাম', 'Pabna Traditional Desi Ghee – 500g', 'ghee', 'গাওয়া ও বিলোড়ন ঘি', 'মুক্ত চারণভূমির দেশি গাভীর দুধের মাখন থেকে তৈরি। ঐতিহ্যবাহী মাটির হাঁড়িতে জ্বাল দেওয়া স্বর্গীয় সোনালী সুবাস।', 'পাবনা অঞ্চলের প্রাকৃতিক ঘাস খাওয়া দেশি গাভীর তাজা দুধ থেকে সনাতনী বিলোড়ন পদ্ধতিতে মাখন সংগ্রহ করে মাটির হাঁড়িতে ধীর আঁচে তৈরি।', 950, 1100, 14, '৫০০ গ্রাম ফুডগ্রেড কাঁচের জার', true, 32, 5.0, 142, true, true, true, 'https://www.cookwithkushi.com/wp-content/uploads/2022/10/best_homemade_traditional_desi_ghee.jpg', '["https://www.cookwithkushi.com/wp-content/uploads/2022/10/best_homemade_traditional_desi_ghee.jpg"]'::jsonb, 'প্রিমিয়াম কোয়ালিটি', 'সাঁথিয়া, পাবনা', '["ঘাস খাওয়া দেশি গরুর মাখন", "শতভাগ প্রাকৃতিক দানাদার", "স্বর্গীয় সুবাস"]'::jsonb),
  ('gb-3', 'sundarbans-wild-honey-500g', 'সুন্দরবনের প্রাকৃতিক খলিশা ফুলের মধু – ৫০০ গ্রাম', 'Raw Sundarbans Khilisha Flower Honey – 500g', 'honey', 'প্রাকৃতিক মধু', 'সুন্দরবনের গহিন জঙ্গল থেকে মৌয়ালদের সংগৃহীত অপরিশোধিত কাঁচা মধু। কোনো চিনি বা কৃত্রিম প্রক্রিয়াজাতকরণ ছাড়া।', 'সুন্দরবনের গভীর ম্যানগ্রোভ অরণ্য থেকে সরাসরি সংগৃহীত ১০০% কাঁচা মধু। প্রাকৃতিক এনজাইম ও পরাগরেণু সমৃদ্ধ।', 750, 850, 12, '৫০০ গ্রাম কাঁচের জার', true, 28, 4.8, 96, true, true, true, 'https://www.purehaat.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fphunipro%2Fimage%2Fupload%2Fv1772265231%2Fsn9yq7dd9l9-1772265231077-images-Swadeshii-Honey-Modhu-Product-Sorisha-2-removebg-preview.png&w=1200&q=75', '["https://www.purehaat.com/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fphunipro%2Fimage%2Fupload%2Fv1772265231%2Fsn9yq7dd9l9-1772265231077-images-Swadeshii-Honey-Modhu-Product-Sorisha-2-removebg-preview.png&w=1200&q=75"]'::jsonb, '১০০% কাঁচা মধু', 'শ্যামনগর, সুন্দরবন অঞ্চল', '["অশোধিত কাঁচা মধু", "জীবন্ত এনজাইম অক্ষুণ্ণ", "রোগ প্রতিরোধ ক্ষমতা বাড়ায়"]'::jsonb),
  ('gb-4', 'jashore-patali-gur-1kg', 'যশোরের খাঁটি খেজুরের নলেন পাটালি গুড় – ১ কেজি', 'Authentic Jashore Date Palm Jaggery – 1kg', 'gur', 'খেজুরের গুড়', 'যশোরের ঐতিহ্যবাহী গাছিদের হাতে মাটির চুলার ধীর আঁচে তৈরি বিশুদ্ধ খেজুরের পাটালি। কোনো চিনি বা রাসায়নিক হাইড্রোস নেই।', 'শীতের সকালে যশোরের ঐতিহ্যবাহী খেজুর গাছ থেকে রস সংগ্রহ করে মাটির চুলায় কাঠের মৃদু তাপে জ্বাল দিয়ে তৈরি আসল পাটালি গুড়।', 390, 450, 13, '১ কেজি ক্লে/ইকো বক্স', true, 50, 5.0, 118, true, false, true, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRLtBXSxGFZMinsYa4GyfhGj2QssMc__87lV6plIEuv9zulQOdeDJ4qV8&s=10', '["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRLtBXSxGFZMinsYa4GyfhGj2QssMc__87lV6plIEuv9zulQOdeDJ4qV8&s=10"]'::jsonb, 'ঐতিহ্যবাহী স্বাদ', 'চৌগাছা, যশোর', '["চিনি ও কেমিক্যাল মুক্ত", "প্রাকৃতিক আয়রন সমৃদ্ধ", "মুখে দিলেই মিলিয়ে যায়"]'::jsonb),
  ('gb-5', 'dinajpur-kalijira-rice-2kg', 'দিনাজপুরের সুগন্ধি কালোজিরা চাল – ২ কেজি', 'Dinajpur Aromatic Small Grain Rice – 2kg', 'rice', 'সুগন্ধি ও ঢেঁকিছাঁটা চাল', 'উত্তরবঙ্গের কৃষকদের দেশীয় বীজ থেকে উৎপাদিত সুগন্ধি ছোট দানার চাল। পোলাও, বিরিয়ানি ও পায়েসের জন্য সেরা।', 'দিনাজপুরের উর্বর পলি মাটিতে উৎপাদিত খাঁটি কালোজিরা সুগন্ধি চাল। রান্নার পর ঝরঝরে থাকে এবং চমৎকার সুবাস ছড়ায়।', 340, 380, 11, '২ কেজি ইকো কটন ব্যাগ', true, 60, 4.9, 89, false, false, true, 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80', '["https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"]'::jsonb, 'পোলাও চাল', 'বীরগঞ্জ, দিনাজপুর', '["প্রাকৃতিক ভেষজ সুবাস", "ইউরিয়া মুক্ত", "সহজে হজমযোগ্য"]'::jsonb)
ON CONFLICT (slug) DO NOTHING;

-- Insert Coupons
INSERT INTO coupons (id, code, discount_percent, min_order_amount, usage_count, is_active, expiry_date)
VALUES
  ('cpn-1', 'GRAMBANGLA10', 10, 1000, 42, true, '৩১ ডিসেম্বর, ২০২৬'),
  ('cpn-2', 'DESHI15', 15, 2500, 18, true, '১৫ জানুয়ারি, ২০২৭'),
  ('cpn-3', 'WELCOME5', 5, 500, 89, true, 'অব্যাহত (Ongoing)')
ON CONFLICT (code) DO NOTHING;

-- Insert Default Settings
INSERT INTO store_settings (id, store_name, hotline, whatsapp, email, address, delivery_dhaka, delivery_outside, free_shipping_threshold, meta_pixel_id, is_store_open, announcement_text)
VALUES
  (1, 'গ্রামবাংলা (GramBangla)', '01700-123456', '01700-123456', 'support@grambangla.com', 'হাউজ #৪২, রোড #১১, ধানমন্ডি, ঢাকা - ১২০৯', 70, 130, 2000, '', true, 'শীতের সেরা অফার: খেজুরের খাঁটি নলেন গুড় ও সিরাজগঞ্জের সরিষার তেলে আকর্ষণীয় ছাড়!')
ON CONFLICT (id) DO UPDATE SET
  hotline = EXCLUDED.hotline,
  whatsapp = EXCLUDED.whatsapp;
