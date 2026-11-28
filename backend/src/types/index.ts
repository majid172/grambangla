export interface Product {
  id: string;
  slug: string;
  nameBn: string;
  nameEn: string;
  category: 'mustard-oil' | 'ghee' | 'honey' | 'rice' | 'pulses' | 'spices' | 'gur';
  categoryNameBn: string;
  shortDescBn: string;
  fullDescBn: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  unit: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewCount: number;
  featured: boolean;
  isBestseller?: boolean;
  organicCertified?: boolean;
  image: string;
  gallery: string[];
  badge?: string;
  sourceLocation: string;
  nutritionalHighlights: string[];
}

export interface Category {
  id: string;
  nameBn: string;
  nameEn: string;
  slug: string;
  image: string;
  itemCount: number;
  descriptionBn: string;
  tagline: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface OrderDetails {
  orderId: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  deliveryMethod: 'regular' | 'express';
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  status: 'Pending' | 'Confirmed' | 'Processing' | 'Delivered' | 'Cancelled';
  orderDate: string;
  notes?: string;
}

export interface AdminCustomer {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  address: string;
  totalOrders: number;
  totalSpent: number;
  lastOrderDate: string;
}

export interface AdminCoupon {
  id: string;
  code: string;
  discountPercent: number;
  minOrderAmount: number;
  usageCount: number;
  isActive: boolean;
  expiryDate: string;
}

export interface StoreSettings {
  storeName: string;
  hotline: string;
  whatsapp: string;
  email: string;
  address: string;
  deliveryDhaka: number;
  deliveryOutside: number;
  freeShippingThreshold: number;
  metaPixelId: string;
  isStoreOpen: boolean;
  announcementText: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  createdAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
}
