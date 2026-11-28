import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  Product,
  Category,
  OrderDetails,
  AdminCustomer,
  AdminCoupon,
  StoreSettings,
  ContactMessage,
  NewsletterSubscriber,
} from '../types/index.js';
import {
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CUSTOMERS,
  INITIAL_COUPONS,
  INITIAL_STORE_SETTINGS,
} from '../data/initialData.js';
import { supabase, isSupabaseConfigured } from '../config/supabase.js';

interface DatabaseSchema {
  products: Product[];
  categories: Category[];
  orders: OrderDetails[];
  customers: AdminCustomer[];
  coupons: AdminCoupon[];
  settings: StoreSettings;
  messages: ContactMessage[];
  subscribers: NewsletterSubscriber[];
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.resolve(__dirname, '../../data');
const DB_FILE = path.join(DATA_DIR, 'store.json');

class JSONDatabase {
  private data: DatabaseSchema;

  constructor() {
    this.ensureDirectoryExists();
    this.data = this.loadDatabase();
    this.initSupabaseSync();
  }

  private ensureDirectoryExists() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
  }

  private loadDatabase(): DatabaseSchema {
    if (fs.existsSync(DB_FILE)) {
      try {
        const fileContent = fs.readFileSync(DB_FILE, 'utf-8');
        return JSON.parse(fileContent);
      } catch (err) {
        console.error('Failed to parse database file, re-initializing...', err);
      }
    }

    const initialDb: DatabaseSchema = {
      products: INITIAL_PRODUCTS,
      categories: INITIAL_CATEGORIES,
      orders: INITIAL_ORDERS,
      customers: INITIAL_CUSTOMERS,
      coupons: INITIAL_COUPONS,
      settings: INITIAL_STORE_SETTINGS,
      messages: [],
      subscribers: [],
    };

    this.persist(initialDb);
    return initialDb;
  }

  private persist(dataToSave?: DatabaseSchema) {
    try {
      this.ensureDirectoryExists();
      fs.writeFileSync(
        DB_FILE,
        JSON.stringify(dataToSave || this.data, null, 2),
        'utf-8'
      );
    } catch (err) {
      console.error('Error persisting database:', err);
    }
  }

  private async initSupabaseSync() {
    if (isSupabaseConfigured() && supabase) {
      try {
        // Fetch products from Supabase if present
        const { data: supaProducts, error: prodErr } = await supabase.from('products').select('*');
        if (!prodErr && supaProducts && supaProducts.length > 0) {
          this.data.products = supaProducts.map((p) => ({
            id: p.id,
            slug: p.slug,
            nameBn: p.name_bn,
            nameEn: p.name_en,
            category: p.category,
            categoryNameBn: p.category_name_bn,
            shortDescBn: p.short_desc_bn,
            fullDescBn: p.full_desc_bn,
            price: Number(p.price),
            originalPrice: p.original_price ? Number(p.original_price) : undefined,
            discountPercent: p.discount_percent,
            unit: p.unit,
            inStock: p.in_stock,
            stockCount: p.stock_count,
            rating: Number(p.rating),
            reviewCount: p.review_count,
            featured: p.featured,
            isBestseller: p.is_bestseller,
            organicCertified: p.organic_certified,
            image: p.image,
            gallery: p.gallery || [],
            badge: p.badge,
            sourceLocation: p.source_location,
            nutritionalHighlights: p.nutritional_highlights || [],
          }));
          this.persist();
        }

        // Fetch settings from Supabase if present
        const { data: supaSettings, error: setErr } = await supabase.from('store_settings').select('*').limit(1).single();
        if (!setErr && supaSettings) {
          this.data.settings = {
            storeName: supaSettings.store_name,
            hotline: supaSettings.hotline,
            whatsapp: supaSettings.whatsapp,
            email: supaSettings.email,
            address: supaSettings.address,
            deliveryDhaka: Number(supaSettings.delivery_dhaka),
            deliveryOutside: Number(supaSettings.delivery_outside),
            freeShippingThreshold: Number(supaSettings.free_shipping_threshold),
            metaPixelId: supaSettings.meta_pixel_id || '',
            isStoreOpen: supaSettings.is_store_open,
            announcementText: supaSettings.announcement_text || '',
          };
          this.persist();
        }
      } catch (err) {
        console.warn('Supabase initial fetch skipped or failed:', err);
      }
    }
  }

  // --- PRODUCTS ---
  public products = {
    getAll: () => this.data.products,
    getById: (id: string) => this.data.products.find((p) => p.id === id),
    getBySlug: (slug: string) => this.data.products.find((p) => p.slug === slug),
    create: (product: Product) => {
      this.data.products.unshift(product);
      this.persist();

      // Sync to Supabase
      if (isSupabaseConfigured() && supabase) {
        supabase.from('products').insert({
          id: product.id,
          slug: product.slug,
          name_bn: product.nameBn,
          name_en: product.nameEn,
          category: product.category,
          category_name_bn: product.categoryNameBn,
          short_desc_bn: product.shortDescBn,
          full_desc_bn: product.fullDescBn,
          price: product.price,
          original_price: product.originalPrice,
          discount_percent: product.discountPercent,
          unit: product.unit,
          in_stock: product.inStock,
          stock_count: product.stockCount,
          rating: product.rating,
          review_count: product.reviewCount,
          featured: product.featured,
          is_bestseller: product.isBestseller,
          organic_certified: product.organicCertified,
          image: product.image,
          gallery: product.gallery,
          badge: product.badge,
          source_location: product.sourceLocation,
          nutritional_highlights: product.nutritionalHighlights,
        }).then(({ error }) => {
          if (error) console.error('Supabase product insert error:', error.message);
        });
      }

      return product;
    },
    update: (id: string, updates: Partial<Product>) => {
      const idx = this.data.products.findIndex((p) => p.id === id);
      if (idx === -1) return null;
      this.data.products[idx] = { ...this.data.products[idx], ...updates };
      this.persist();

      // Sync to Supabase
      if (isSupabaseConfigured() && supabase) {
        const supaUpdates: Record<string, any> = {};
        if (updates.nameBn !== undefined) supaUpdates.name_bn = updates.nameBn;
        if (updates.price !== undefined) supaUpdates.price = updates.price;
        if (updates.stockCount !== undefined) supaUpdates.stock_count = updates.stockCount;
        if (updates.inStock !== undefined) supaUpdates.in_stock = updates.inStock;
        if (updates.originalPrice !== undefined) supaUpdates.original_price = updates.originalPrice;

        supabase.from('products').update(supaUpdates).eq('id', id).then();
      }

      return this.data.products[idx];
    },
    delete: (id: string) => {
      const idx = this.data.products.findIndex((p) => p.id === id);
      if (idx === -1) return false;
      this.data.products.splice(idx, 1);
      this.persist();

      // Sync to Supabase
      if (isSupabaseConfigured() && supabase) {
        supabase.from('products').delete().eq('id', id).then();
      }

      return true;
    },
  };

  // --- CATEGORIES ---
  public categories = {
    getAll: () => {
      return this.data.categories.map((c) => ({
        ...c,
        itemCount: this.data.products.filter((p) => p.category === c.slug).length,
      }));
    },
    getBySlug: (slug: string) =>
      this.data.categories.find((c) => c.slug === slug),
  };

  // --- ORDERS ---
  public orders = {
    getAll: () => this.data.orders,
    getById: (orderId: string) =>
      this.data.orders.find((o) => o.orderId === orderId),
    create: (order: OrderDetails) => {
      this.data.orders.unshift(order);

      // Decrement stock for ordered items
      order.items.forEach((item) => {
        const prod = this.data.products.find((p) => p.id === item.product.id);
        if (prod) {
          prod.stockCount = Math.max(0, prod.stockCount - item.quantity);
          if (prod.stockCount === 0) prod.inStock = false;
        }
      });

      // Upsert into customers list
      this.customers.upsertFromOrder(order);
      this.persist();

      // Sync to Supabase
      if (isSupabaseConfigured() && supabase) {
        supabase.from('orders').insert({
          order_id: order.orderId,
          customer_name: order.customerName,
          phone: order.phone,
          email: order.email,
          address: order.address,
          city: order.city,
          delivery_method: order.deliveryMethod,
          payment_method: order.paymentMethod,
          items: order.items,
          subtotal: order.subtotal,
          delivery_fee: order.deliveryFee,
          discount: order.discount,
          total: order.total,
          status: order.status,
          order_date: order.orderDate,
          notes: order.notes,
        }).then(({ error }) => {
          if (error) console.error('Supabase order insert error:', error.message);
        });
      }

      return order;
    },
    updateStatus: (orderId: string, status: OrderDetails['status']) => {
      const order = this.data.orders.find((o) => o.orderId === orderId);
      if (!order) return null;
      order.status = status;
      this.persist();

      // Sync to Supabase
      if (isSupabaseConfigured() && supabase) {
        supabase.from('orders').update({ status }).eq('order_id', orderId).then();
      }

      return order;
    },
    delete: (orderId: string) => {
      const idx = this.data.orders.findIndex((o) => o.orderId === orderId);
      if (idx === -1) return false;
      this.data.orders.splice(idx, 1);
      this.persist();

      // Sync to Supabase
      if (isSupabaseConfigured() && supabase) {
        supabase.from('orders').delete().eq('order_id', orderId).then();
      }

      return true;
    },
  };

  // --- CUSTOMERS ---
  public customers = {
    getAll: () => this.data.customers,
    upsertFromOrder: (order: OrderDetails) => {
      const existing = this.data.customers.find(
        (c) => c.phone === order.phone || (order.email && c.email === order.email)
      );

      if (existing) {
        existing.totalOrders += 1;
        existing.totalSpent += order.total;
        existing.lastOrderDate = order.orderDate;
        existing.address = order.address;
        existing.city = order.city;
      } else {
        const newCust: AdminCustomer = {
          id: `cust-${Date.now()}`,
          name: order.customerName,
          phone: order.phone,
          email: order.email || 'N/A',
          city: order.city,
          address: order.address,
          totalOrders: 1,
          totalSpent: order.total,
          lastOrderDate: order.orderDate,
        };
        this.data.customers.unshift(newCust);
      }
      this.persist();
    },
  };

  // --- COUPONS ---
  public coupons = {
    getAll: () => this.data.coupons,
    getByCode: (code: string) =>
      this.data.coupons.find(
        (c) => c.code.toUpperCase() === code.toUpperCase() && c.isActive
      ),
    create: (coupon: AdminCoupon) => {
      this.data.coupons.unshift(coupon);
      this.persist();
      return coupon;
    },
    delete: (id: string) => {
      const idx = this.data.coupons.findIndex((c) => c.id === id);
      if (idx === -1) return false;
      this.data.coupons.splice(idx, 1);
      this.persist();
      return true;
    },
  };

  // --- SETTINGS ---
  public settings = {
    get: () => this.data.settings,
    update: (newSettings: Partial<StoreSettings>) => {
      this.data.settings = { ...this.data.settings, ...newSettings };
      this.persist();

      // Sync to Supabase
      if (isSupabaseConfigured() && supabase) {
        supabase.from('store_settings').update({
          store_name: this.data.settings.storeName,
          hotline: this.data.settings.hotline,
          whatsapp: this.data.settings.whatsapp,
          email: this.data.settings.email,
          address: this.data.settings.address,
          delivery_dhaka: this.data.settings.deliveryDhaka,
          delivery_outside: this.data.settings.deliveryOutside,
          free_shipping_threshold: this.data.settings.freeShippingThreshold,
          meta_pixel_id: this.data.settings.metaPixelId,
          is_store_open: this.data.settings.isStoreOpen,
          announcement_text: this.data.settings.announcementText,
        }).eq('id', 1).then();
      }

      return this.data.settings;
    },
  };

  // --- CONTACT MESSAGES ---
  public messages = {
    getAll: () => this.data.messages,
    create: (msg: ContactMessage) => {
      this.data.messages.unshift(msg);
      this.persist();

      // Sync to Supabase
      if (isSupabaseConfigured() && supabase) {
        supabase.from('contact_messages').insert({
          id: msg.id,
          name: msg.name,
          phone: msg.phone,
          email: msg.email,
          subject: msg.subject,
          message: msg.message,
        }).then();
      }

      return msg;
    },
  };

  // --- NEWSLETTER SUBSCRIBERS ---
  public subscribers = {
    getAll: () => this.data.subscribers,
    create: (email: string) => {
      const existing = this.data.subscribers.find(
        (s) => s.email.toLowerCase() === email.toLowerCase()
      );
      if (existing) return existing;
      const newSub: NewsletterSubscriber = {
        id: `sub-${Date.now()}`,
        email: email.toLowerCase(),
        subscribedAt: new Date().toLocaleDateString('bn-BD'),
      };
      this.data.subscribers.unshift(newSub);
      this.persist();

      // Sync to Supabase
      if (isSupabaseConfigured() && supabase) {
        supabase.from('newsletter_subscribers').insert({
          id: newSub.id,
          email: newSub.email,
        }).then();
      }

      return newSub;
    },
  };
}

export const db = new JSONDatabase();
