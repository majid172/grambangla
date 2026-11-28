import { Product, Category, OrderDetails } from '@/types';
import { PRODUCTS, CATEGORIES } from '@/data/products';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchJson<T>(url: string, options?: RequestInit): Promise<T | null> {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(options?.headers || {}),
      },
    });

    if (!res.ok) {
      throw new Error(`API Error: ${res.statusText}`);
    }

    return await res.json();
  } catch (err) {
    console.warn(`[গ্রামবাংলা API] Could not connect to Express backend at ${url}. Falling back to local data.`);
    return null;
  }
}

export const api = {
  // Products
  products: {
    getAll: async (query?: { category?: string; search?: string; sort?: string }) => {
      const params = new URLSearchParams();
      if (query?.category && query.category !== 'all') params.set('category', query.category);
      if (query?.search) params.set('search', query.search);
      if (query?.sort) params.set('sort', query.sort);

      const queryString = params.toString() ? `?${params.toString()}` : '';
      const response = await fetchJson<{ success: boolean; data: Product[] }>(
        `${API_BASE_URL}/products${queryString}`
      );

      return response?.data || PRODUCTS;
    },

    getBySlugOrId: async (slugOrId: string) => {
      const response = await fetchJson<{ success: boolean; data: Product; related: Product[] }>(
        `${API_BASE_URL}/products/${slugOrId}`
      );

      if (response?.data) return response;

      const fallback = PRODUCTS.find((p) => p.slug === slugOrId || p.id === slugOrId);
      const related = PRODUCTS.filter((p) => p.category === fallback?.category && p.id !== fallback?.id).slice(0, 4);
      return fallback ? { data: fallback, related } : null;
    },

    create: async (productData: Partial<Product>) => {
      return await fetchJson<{ success: boolean; data: Product }>(`${API_BASE_URL}/products`, {
        method: 'POST',
        body: JSON.stringify(productData),
      });
    },

    updateStock: async (id: string, stockCount: number, inStock?: boolean) => {
      return await fetchJson<{ success: boolean; data: Product }>(`${API_BASE_URL}/products/${id}/stock`, {
        method: 'PATCH',
        body: JSON.stringify({ stockCount, inStock }),
      });
    },

    delete: async (id: string) => {
      return await fetchJson<{ success: boolean; message: string }>(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Categories
  categories: {
    getAll: async () => {
      const response = await fetchJson<{ success: boolean; data: Category[] }>(
        `${API_BASE_URL}/categories`
      );
      return response?.data || CATEGORIES;
    },

    getBySlug: async (slug: string) => {
      const response = await fetchJson<{ success: boolean; data: Category & { products: Product[] } }>(
        `${API_BASE_URL}/categories/${slug}`
      );
      if (response?.data) return response.data;
      const cat = CATEGORIES.find((c) => c.slug === slug);
      const catProducts = PRODUCTS.filter((p) => p.category === slug);
      return cat ? { ...cat, products: catProducts } : null;
    },
  },

  // Orders
  orders: {
    create: async (orderData: {
      customerName: string;
      phone: string;
      email?: string;
      address: string;
      city: string;
      deliveryMethod?: string;
      paymentMethod: string;
      items: Array<{ productId: string; quantity: number }>;
      couponCode?: string;
      notes?: string;
    }) => {
      return await fetchJson<{ success: boolean; message: string; data: OrderDetails }>(
        `${API_BASE_URL}/orders`,
        {
          method: 'POST',
          body: JSON.stringify(orderData),
        }
      );
    },

    getAll: async (status?: string, search?: string) => {
      const params = new URLSearchParams();
      if (status && status !== 'all') params.set('status', status);
      if (search) params.set('search', search);

      const queryString = params.toString() ? `?${params.toString()}` : '';
      return await fetchJson<{ success: boolean; count: number; data: OrderDetails[] }>(
        `${API_BASE_URL}/orders${queryString}`
      );
    },

    updateStatus: async (orderId: string, status: OrderDetails['status']) => {
      return await fetchJson<{ success: boolean; data: OrderDetails }>(
        `${API_BASE_URL}/orders/${orderId}/status`,
        {
          method: 'PATCH',
          body: JSON.stringify({ status }),
        }
      );
    },

    delete: async (orderId: string) => {
      return await fetchJson<{ success: boolean; message: string }>(
        `${API_BASE_URL}/orders/${orderId}`,
        {
          method: 'DELETE',
        }
      );
    },
  },

  // Coupons
  coupons: {
    apply: async (code: string, cartTotal: number) => {
      return await fetchJson<{
        success: boolean;
        message: string;
        data?: { code: string; discountPercent: number; discountAmount: number };
      }>(`${API_BASE_URL}/coupons/apply`, {
        method: 'POST',
        body: JSON.stringify({ code, cartTotal }),
      });
    },

    getAll: async () => {
      return await fetchJson<{ success: boolean; data: any[] }>(`${API_BASE_URL}/coupons`);
    },
  },

  // Settings
  settings: {
    get: async () => {
      return await fetchJson<{ success: boolean; data: any }>(`${API_BASE_URL}/settings`);
    },
    update: async (settingsData: any) => {
      return await fetchJson<{ success: boolean; data: any }>(`${API_BASE_URL}/settings`, {
        method: 'PUT',
        body: JSON.stringify(settingsData),
      });
    },
  },

  // Dashboard Stats
  dashboard: {
    getStats: async () => {
      return await fetchJson<{ success: boolean; data: any }>(`${API_BASE_URL}/dashboard/stats`);
    },
  },

  // Contact & Newsletter
  contact: {
    sendMessage: async (data: { name: string; phone: string; email?: string; subject?: string; message: string }) => {
      return await fetchJson<{ success: boolean; message: string }>(`${API_BASE_URL}/contact`, {
        method: 'POST',
        body: JSON.stringify(data),
      });
    },
    subscribeNewsletter: async (email: string) => {
      return await fetchJson<{ success: boolean; message: string }>(`${API_BASE_URL}/newsletter`, {
        method: 'POST',
        body: JSON.stringify({ email }),
      });
    },
  },
};

