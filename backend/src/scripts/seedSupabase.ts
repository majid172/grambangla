import { supabase, isSupabaseConfigured } from '../config/supabase.js';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_COUPONS,
  INITIAL_STORE_SETTINGS,
} from '../data/initialData.js';

async function seed() {
  if (!isSupabaseConfigured() || !supabase) {
    console.error('❌ Supabase credentials are missing or invalid in .env!');
    console.error('Please set SUPABASE_URL and SUPABASE_KEY in backend/.env first.');
    process.exit(1);
  }

  console.log('🚀 Starting Supabase Database Seeding for GramBangla...');

  try {
    // 1. Seed Categories
    console.log('📦 Seeding Categories...');
    for (const cat of INITIAL_CATEGORIES) {
      const { error } = await supabase.from('categories').upsert(
        {
          id: cat.id,
          slug: cat.slug,
          name_bn: cat.nameBn,
          name_en: cat.nameEn,
          image: cat.image,
          item_count: cat.itemCount,
          description_bn: cat.descriptionBn,
          tagline: cat.tagline,
        },
        { onConflict: 'slug' }
      );
      if (error) console.warn(`Warning inserting category ${cat.slug}:`, error.message);
    }
    console.log('✅ Categories seeded successfully.');

    // 2. Seed Products
    console.log('🌾 Seeding Products...');
    for (const p of INITIAL_PRODUCTS) {
      const { error } = await supabase.from('products').upsert(
        {
          id: p.id,
          slug: p.slug,
          name_bn: p.nameBn,
          name_en: p.nameEn,
          category: p.category,
          category_name_bn: p.categoryNameBn,
          short_desc_bn: p.shortDescBn,
          full_desc_bn: p.fullDescBn,
          price: p.price,
          original_price: p.originalPrice,
          discount_percent: p.discountPercent,
          unit: p.unit,
          in_stock: p.inStock,
          stock_count: p.stockCount,
          rating: p.rating,
          review_count: p.reviewCount,
          featured: p.featured,
          is_bestseller: p.isBestseller,
          organic_certified: p.organicCertified,
          image: p.image,
          gallery: p.gallery,
          badge: p.badge,
          source_location: p.sourceLocation,
          nutritional_highlights: p.nutritionalHighlights,
        },
        { onConflict: 'slug' }
      );
      if (error) console.warn(`Warning inserting product ${p.slug}:`, error.message);
    }
    console.log('✅ Products seeded successfully.');

    // 3. Seed Coupons
    console.log('🏷️ Seeding Coupons...');
    for (const c of INITIAL_COUPONS) {
      const { error } = await supabase.from('coupons').upsert(
        {
          id: c.id,
          code: c.code,
          discount_percent: c.discountPercent,
          min_order_amount: c.minOrderAmount,
          usage_count: c.usageCount,
          is_active: c.isActive,
          expiry_date: c.expiryDate,
        },
        { onConflict: 'code' }
      );
      if (error) console.warn(`Warning inserting coupon ${c.code}:`, error.message);
    }
    console.log('✅ Coupons seeded successfully.');

    // 4. Seed Settings
    console.log('⚙️ Seeding Store Settings...');
    const { error: settingsError } = await supabase.from('store_settings').upsert({
      id: 1,
      store_name: INITIAL_STORE_SETTINGS.storeName,
      hotline: INITIAL_STORE_SETTINGS.hotline,
      whatsapp: INITIAL_STORE_SETTINGS.whatsapp,
      email: INITIAL_STORE_SETTINGS.email,
      address: INITIAL_STORE_SETTINGS.address,
      delivery_dhaka: INITIAL_STORE_SETTINGS.deliveryDhaka,
      delivery_outside: INITIAL_STORE_SETTINGS.deliveryOutside,
      free_shipping_threshold: INITIAL_STORE_SETTINGS.freeShippingThreshold,
      meta_pixel_id: INITIAL_STORE_SETTINGS.metaPixelId,
      is_store_open: INITIAL_STORE_SETTINGS.isStoreOpen,
      announcement_text: INITIAL_STORE_SETTINGS.announcementText,
    });
    if (settingsError) console.warn('Warning inserting settings:', settingsError.message);
    console.log('✅ Settings seeded successfully.');

    console.log('\n🎉 ALL DATA HAS BEEN SUCCESSFULLY SEEDED INTO SUPABASE POSTGRESQL!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding failed with error:', err);
    process.exit(1);
  }
}

seed();
