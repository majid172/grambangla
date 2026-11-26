import { OrderDetails } from '@/types';
import { PRODUCTS } from './products';

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

export const INITIAL_STORE_SETTINGS: StoreSettings = {
  storeName: 'গ্রামবাংলা (GramBangla)',
  hotline: '01700-123456',
  whatsapp: '01700-123456',
  email: 'support@grambangla.com',
  address: 'হাউজ #৪২, রোড #১১, ধানমন্ডি, ঢাকা - ১২০৯',
  deliveryDhaka: 70,
  deliveryOutside: 130,
  freeShippingThreshold: 2000,
  metaPixelId: '',
  isStoreOpen: true,
  announcementText: 'শীতের সেরা অফার: খেজুরের খাঁটি নলেন গুড় ও সিরাজগঞ্জের সরিষার তেলে আকর্ষণীয় ছাড়!',
};

export const INITIAL_ADMIN_COUPONS: AdminCoupon[] = [
  {
    id: 'cpn-1',
    code: 'GRAMBANGLA10',
    discountPercent: 10,
    minOrderAmount: 1000,
    usageCount: 42,
    isActive: true,
    expiryDate: '৩১ ডিসেম্বর, ২০২৬',
  },
  {
    id: 'cpn-2',
    code: 'DESHI15',
    discountPercent: 15,
    minOrderAmount: 2500,
    usageCount: 18,
    isActive: true,
    expiryDate: '১৫ জানুয়ারি, ২০২৭',
  },
  {
    id: 'cpn-3',
    code: 'WELCOME5',
    discountPercent: 5,
    minOrderAmount: 500,
    usageCount: 89,
    isActive: true,
    expiryDate: 'অব্যাহত (Ongoing)',
  },
];

export const INITIAL_ADMIN_ORDERS: OrderDetails[] = [
  {
    orderId: 'GB-2026-9281',
    customerName: 'মোঃ রাকিবুল হাসান',
    phone: '01711234567',
    email: 'rakibul.h@gmail.com',
    address: 'বাড়ি #১৫, রোড #৪, ধানমন্ডি',
    city: 'ঢাকা মেট্রো',
    deliveryMethod: 'regular',
    paymentMethod: 'cod',
    items: [
      { product: PRODUCTS[0], quantity: 2 }, // Mustard Oil 1L
      { product: PRODUCTS[1], quantity: 1 }, // Ghee 500g
    ],
    subtotal: 1670,
    deliveryFee: 70,
    discount: 100,
    total: 1640,
    status: 'Pending',
    orderDate: '২৬ নভেম্বর, ২০২৬',
  },
  {
    orderId: 'GB-2026-9140',
    customerName: 'ফাহমিদা আক্তার',
    phone: '01819876543',
    email: 'fahmida.akt@yahoo.com',
    address: 'ব্লক-সি, রোড #১১, বনানী',
    city: 'ঢাকা মেট্রো',
    deliveryMethod: 'regular',
    paymentMethod: 'bkash',
    items: [
      { product: PRODUCTS[2], quantity: 1 }, // Honey 500g
      { product: PRODUCTS[3], quantity: 2 }, // Patali Gur 1kg
    ],
    subtotal: 1550,
    deliveryFee: 70,
    discount: 0,
    total: 1620,
    status: 'Confirmed',
    orderDate: '২৬ নভেম্বর, ২০২৬',
  },
  {
    orderId: 'GB-2026-8924',
    customerName: 'তানভীর আহমেদ চৌধুরী',
    phone: '01912349876',
    email: 'tanvir.ctg@gmail.com',
    address: 'জিইসি মোড়, নাসিরাবাদ হাউজিং সোসাইটি',
    city: 'ঢাকার বাইরে',
    deliveryMethod: 'regular',
    paymentMethod: 'cod',
    items: [
      { product: PRODUCTS[0], quantity: 3 }, // Mustard oil
      { product: PRODUCTS[3], quantity: 1 }, // Kalijira rice
    ],
    subtotal: 1460,
    deliveryFee: 130,
    discount: 0,
    total: 1590,
    status: 'Processing',
    orderDate: '২৫ নভেম্বর, ২০২৬',
  },
  {
    orderId: 'GB-2026-8812',
    customerName: 'প্রফেসর ড. মোজাম্মেল হক',
    phone: '01715554321',
    email: 'mojammel.raj@edu.bd',
    address: 'সেক্টর-৩, উপশহর, বোয়ালিয়া',
    city: 'ঢাকার বাইরে',
    deliveryMethod: 'regular',
    paymentMethod: 'bkash',
    items: [
      { product: PRODUCTS[1], quantity: 2 }, // Ghee
      { product: PRODUCTS[2], quantity: 2 }, // Honey
    ],
    subtotal: 3400,
    deliveryFee: 0, // Free delivery
    discount: 200,
    total: 3200,
    status: 'Delivered',
    orderDate: '২৪ নভেম্বর, ২০২৬',
  },
  {
    orderId: 'GB-2026-8703',
    customerName: 'সালমা বেগম',
    phone: '01678123456',
    email: 'salma.begum@hotmail.com',
    address: 'সেক্টর-৭, রোড #৯, উত্তরা',
    city: 'ঢাকা মেট্রো',
    deliveryMethod: 'regular',
    paymentMethod: 'cod',
    items: [
      { product: PRODUCTS[0], quantity: 1 },
      { product: PRODUCTS[1], quantity: 1 },
    ],
    subtotal: 980,
    deliveryFee: 70,
    discount: 0,
    total: 1050,
    status: 'Delivered',
    orderDate: '২৩ নভেম্বর, ২০২৬',
  },
  {
    orderId: 'GB-2026-8519',
    customerName: 'আরিফুল ইসলাম',
    phone: '01552345678',
    email: 'ariful.is@gmail.com',
    address: 'বঙ্গবন্ধু সড়ক, চাষাঢ়া',
    city: 'ঢাকার বাইরে',
    deliveryMethod: 'regular',
    paymentMethod: 'cod',
    items: [
      { product: PRODUCTS[1], quantity: 1 },
    ],
    subtotal: 950,
    deliveryFee: 130,
    discount: 0,
    total: 1080,
    status: 'Cancelled',
    orderDate: '২২ নভেম্বর, ২০২৬',
  },
  {
    orderId: 'GB-2026-8411',
    customerName: 'মাহমুদুর রহমান',
    phone: '01722334455',
    email: 'mahmud.mirpur@gmail.com',
    address: 'ব্লক-ডি, সেকশন-১০, মিরপুর',
    city: 'ঢাকা মেট্রো',
    deliveryMethod: 'regular',
    paymentMethod: 'nagad',
    items: [
      { product: PRODUCTS[0], quantity: 2 },
      { product: PRODUCTS[3], quantity: 1 },
    ],
    subtotal: 1120,
    deliveryFee: 70,
    discount: 50,
    total: 1140,
    status: 'Delivered',
    orderDate: '২১ নভেম্বর, ২০২৬',
  },
];

export const INITIAL_ADMIN_CUSTOMERS: AdminCustomer[] = [
  {
    id: 'cust-1',
    name: 'মোঃ রাকিবুল হাসান',
    phone: '01711234567',
    email: 'rakibul.h@gmail.com',
    city: 'ঢাকা মেট্রো',
    address: 'বাড়ি #১৫, রোড #৪, ধানমন্ডি',
    totalOrders: 4,
    totalSpent: 6540,
    lastOrderDate: '২৬ নভেম্বর, ২০২৬',
  },
  {
    id: 'cust-2',
    name: 'প্রফেসর ড. মোজাম্মেল হক',
    phone: '01715554321',
    email: 'mojammel.raj@edu.bd',
    city: 'রাজশাহী',
    address: 'সেক্টর-৩, উপশহর, বোয়ালিয়া',
    totalOrders: 6,
    totalSpent: 12450,
    lastOrderDate: '২৪ নভেম্বর, ২০২৬',
  },
  {
    id: 'cust-3',
    name: 'ফাহমিদা আক্তার',
    phone: '01819876543',
    email: 'fahmida.akt@yahoo.com',
    city: 'ঢাকা মেট্রো',
    address: 'ব্লক-সি, রোড #১১, বনানী',
    totalOrders: 3,
    totalSpent: 4890,
    lastOrderDate: '২৬ নভেম্বর, ২০২৬',
  },
  {
    id: 'cust-4',
    name: 'তানভীর আহমেদ চৌধুরী',
    phone: '01912349876',
    email: 'tanvir.ctg@gmail.com',
    city: 'চট্টগ্রাম',
    address: 'জিইসি মোড়, নাসিরাবাদ',
    totalOrders: 2,
    totalSpent: 3180,
    lastOrderDate: '২৫ নভেম্বর, ২০২৬',
  },
  {
    id: 'cust-5',
    name: 'সালমা বেগম',
    phone: '01678123456',
    email: 'salma.begum@hotmail.com',
    city: 'ঢাকা মেট্রো',
    address: 'সেক্টর-৭, রোড #৯, উত্তরা',
    totalOrders: 5,
    totalSpent: 7300,
    lastOrderDate: '২৩ নভেম্বর, ২০২৬',
  },
];
