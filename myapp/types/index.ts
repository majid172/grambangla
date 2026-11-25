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

export interface CartItem {
  product: Product;
  quantity: number;
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

export interface Review {
  id: string;
  nameBn: string;
  locationBn: string;
  rating: number;
  date: string;
  commentBn: string;
  verifiedBuyer: boolean;
  avatar: string;
  purchasedProduct: string;
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
  status: 'Pending' | 'Confirmed' | 'Processing';
  orderDate: string;
}
