export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID || '';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
  }
}

// Track standard PageView
export const pageview = () => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', 'PageView');
  }
};

// Generic event tracker
export const event = (name: string, options: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', name, options);
  }
};

// Track when a customer views a product detail page
export const trackViewContent = (product: {
  id: string;
  name: string;
  category?: string;
  price: number;
}) => {
  event('ViewContent', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    content_category: product.category,
    value: product.price,
    currency: 'BDT',
  });
};

// Track when a customer adds an item to cart
export const trackAddToCart = (product: {
  id: string;
  name: string;
  category?: string;
  price: number;
  quantity?: number;
}) => {
  const qty = product.quantity || 1;
  event('AddToCart', {
    content_ids: [product.id],
    content_name: product.name,
    content_type: 'product',
    content_category: product.category,
    value: product.price * qty,
    currency: 'BDT',
  });
};

// Track when customer initiates checkout
export const trackInitiateCheckout = (
  items: Array<{ id: string; price: number; quantity: number }>,
  total: number
) => {
  event('InitiateCheckout', {
    content_ids: items.map((i) => i.id),
    content_type: 'product',
    num_items: items.reduce((acc, i) => acc + i.quantity, 0),
    value: total,
    currency: 'BDT',
  });
};

// Track successful purchase / confirmed order
export const trackPurchase = (order: {
  orderId: string;
  items: Array<{ id: string; price: number; quantity: number }>;
  total: number;
}) => {
  event('Purchase', {
    order_id: order.orderId,
    content_ids: order.items.map((i) => i.id),
    content_type: 'product',
    num_items: order.items.reduce((acc, i) => acc + i.quantity, 0),
    value: order.total,
    currency: 'BDT',
  });
};

// Track phone call or WhatsApp order initiation
export const trackContact = (method: 'whatsapp' | 'call', context?: string) => {
  event('Contact', {
    contact_method: method,
    content_category: context || 'customer_engagement',
  });
};
