# 🌿 GramBangla (গ্রামবাংলা) Organic Food — Express.js REST API with Supabase

A modern, fast, and production-ready Express.js REST API for GramBangla E-commerce platform with optional Supabase PostgreSQL integration.

---

## ⚡ Supabase Database Setup (মাত্র ২ মিনিটে কানেক্ট করুন)

### ১. Supabase প্রজেক্ট তৈরি করুন
1. [supabase.com](https://supabase.com) এ লগইন করে একটি নতুন প্রজেক্ট তৈরি করুন।
2. প্রজেক্টের **Project Settings > API** সেকশনে যান।
3. সেখান থেকে **Project URL** এবং **anon public key** (বা `service_role secret key`) কপি করুন।

### ২. `.env` ফাইলে ক্রেডেনশিয়াল দিন
`backend/.env` ফাইলে মান দুটি পেস্ট করুন:
```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_KEY=your-anon-or-service-role-key
```

### ৩. ডাটাবেস টেবিল তৈরি ও সিডিং (১-ক্লিক সমাধান)
**অপশন ক (কমান্ড লাইন দিয়ে সিড):**
```bash
npm run db:seed
```
এটি স্বয়ংক্রিয়ভাবে সব ক্যাটাগরি, প্রোডাক্ট, কুপন এবং স্টোর সেটিংস Supabase ডাটাবেসে পুশ করে দেবে!

**অপশন খ (SQL Editor এ রান করা):**
[backend/supabase-schema.sql](file:///e:/vue/grambangla/backend/supabase-schema.sql) ফাইলটি কপি করে Supabase ড্যাশবোর্ডের **SQL Editor**-এ পেস্ট করে **Run** চাপুন।

---

## 🚀 Quick Start (লোকাল সার্ভার চালু)

### 1. Install Dependencies
```bash
cd backend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
The server will run on: **http://localhost:5000**  
Health Check: **http://localhost:5000/api/health**

---

## 📡 API Endpoints Documentation

### 📦 1. Products API (`/api/products`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/products` | Get all products (supports filtering & sorting) |
| `GET` | `/api/products/:slugOrId` | Get single product with related products |
| `POST` | `/api/products` | Create a new product (Admin) |
| `PUT` | `/api/products/:id` | Update product details (Admin) |
| `PATCH` | `/api/products/:id/stock` | Update stock quantity or inStock toggle |
| `DELETE` | `/api/products/:id` | Delete product (Admin) |

#### Query Parameters for `GET /api/products`:
- `category`: Filter by category (e.g. `mustard-oil`, `ghee`, `honey`, `gur`, `rice`)
- `search`: Search query matching Bengali or English name, description, location
- `minPrice` & `maxPrice`: Filter by price range
- `inStock`: `true` to show only in-stock products
- `featured`: `true` to show featured products
- `sort`: `price-low`, `price-high`, or `rating`

---

### 📂 2. Categories API (`/api/categories`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/categories` | Get all categories with dynamic item counts |
| `GET` | `/api/categories/:slug` | Get single category and its products |

---

### 🛒 3. Orders API (`/api/orders`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/orders` | Get all customer orders (Admin) |
| `GET` | `/api/orders/:orderId` | Get single order details / invoice |
| `POST` | `/api/orders` | Place a new order (Checkout) |
| `PATCH` | `/api/orders/:orderId/status` | Update order status (`Pending`, `Confirmed`, `Processing`, `Delivered`, `Cancelled`) |
| `DELETE` | `/api/orders/:orderId` | Delete an order |

#### Example: Place Order (`POST /api/orders`)
```json
{
  "customerName": "মোঃ রাকিবুল হাসান",
  "phone": "01711234567",
  "email": "rakibul@example.com",
  "address": "হাউজ #১২, রোড #৫, ধানমন্ডি",
  "city": "ঢাকা মেট্রো",
  "paymentMethod": "cod",
  "couponCode": "KIKU10",
  "items": [
    { "productId": "gb-1", "quantity": 2 }
  ]
}
```

---

### 🏷️ 4. Coupons & Offers API (`/api/coupons`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/coupons` | List all coupons (Admin) |
| `POST` | `/api/coupons/apply` | Validate coupon and calculate discount |
| `POST` | `/api/coupons` | Create new promo coupon (Admin) |
| `DELETE` | `/api/coupons/:id` | Delete coupon (Admin) |

#### Example: Apply Coupon (`POST /api/coupons/apply`)
```json
{
  "code": "KIKU10",
  "cartTotal": 1500
}
```

---

### ⚙️ 5. Store Settings API (`/api/settings`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/settings` | Get store hotline, whatsapp, delivery fees, Meta Pixel |
| `PUT` | `/api/settings` | Update store settings (Admin) |

---

### 📊 6. Admin Analytics API (`/api/dashboard/stats`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/dashboard/stats` | KPI stats: Total revenue, orders, delivery rate, low stock |

---

### 👥 7. Customer CRM & Contact API

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/customers` | Get all customer leads with lifetime spending |
| `POST` | `/api/contact` | Submit contact inquiry form |
| `POST` | `/api/newsletter` | Subscribe to newsletter |

---

### 🔐 8. Authentication API (`/api/auth`)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/auth/login` | Admin login (`admin@KIKU.com` / `admin123`) |
| `GET` | `/api/auth/me` | Verify session / get admin profile |

---

## 💾 Data Persistence
All data is persistently saved in `backend/data/store.json`. Any updates (orders placed, products edited, coupons created, settings changed) are immediately persisted to disk and survive server restarts.
