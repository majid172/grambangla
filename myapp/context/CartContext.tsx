'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, OrderDetails } from '@/types';
import { trackAddToCart } from '@/lib/fpixel';

interface CartContextType {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  cartCount: number;
  cartTotal: number;
  wishlistCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedQuickViewProduct: Product | null;
  setSelectedQuickViewProduct: (product: Product | null) => void;
  selectedDetailProduct: Product | null;
  setSelectedDetailProduct: (product: Product | null) => void;
  policyModal: string | null;
  setPolicyModal: (policy: string | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  completedOrder: OrderDetails | null;
  setCompletedOrder: (order: OrderDetails | null) => void;
  appliedCoupon: { code: string; discountPercent: number } | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discountAmount: number;
  finalTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedQuickViewProduct, setSelectedQuickViewProduct] = useState<Product | null>(null);
  const [selectedDetailProduct, setSelectedDetailProduct] = useState<Product | null>(null);
  const [policyModal, setPolicyModal] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [completedOrder, setCompletedOrder] = useState<OrderDetails | null>(null);
  const [appliedCoupon, setAppliedCoupon] = useState<{ code: string; discountPercent: number } | null>(null);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('gb_cart');
      if (savedCart) setCart(JSON.parse(savedCart));

      const savedWishlist = localStorage.getItem('gb_wishlist');
      if (savedWishlist) setWishlist(JSON.parse(savedWishlist));
    } catch {
      // ignore
    }
  }, []);

  // Save changes
  useEffect(() => {
    try {
      localStorage.setItem('gb_cart', JSON.stringify(cart));
    } catch { }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('gb_wishlist', JSON.stringify(wishlist));
    } catch { }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const addToCart = (product: Product, quantity = 1) => {
    // Meta Pixel Event
    trackAddToCart({
      id: product.id,
      name: product.nameBn,
      category: product.category,
      price: product.price,
      quantity,
    });

    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`"${product.nameBn}" কার্টে যুক্ত করা হয়েছে!`);
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('পণ্যটি কার্ট থেকে সরানো হয়েছে');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        showToast(`"${product.nameBn}" পছন্দের তালিকা থেকে সরানো হয়েছে`);
        return prev.filter((item) => item.id !== product.id);
      } else {
        showToast(`"${product.nameBn}" পছন্দের তালিকায় যুক্ত করা হয়েছে ❤️`);
        return [...prev, product];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const applyCoupon = (code: string) => {
    const cleaned = code.trim().toUpperCase();
    if (cleaned === 'GRAMBANGLA10' || cleaned === 'GB10') {
      setAppliedCoupon({ code: cleaned, discountPercent: 10 });
      showToast('১০% ডিসকাউন্ট কুপন সফলভাবে যুক্ত হয়েছে! 🎉');
      return true;
    } else if (cleaned === 'ORGANIC50') {
      setAppliedCoupon({ code: cleaned, discountPercent: 15 });
      showToast('১৫% স্পেশাল ডিসকাউন্ট কুপন সফলভাবে যুক্ত হয়েছে! 🎉');
      return true;
    } else {
      showToast('দুঃখিত, কুপন কোডটি সঠিক নয় বা মেয়াদোত্তীর্ণ');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('কুপন কোড বাতিল করা হয়েছে');
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const wishlistCount = wishlist.length;

  const discountAmount = appliedCoupon ? Math.round((cartTotal * appliedCoupon.discountPercent) / 100) : 0;
  const finalTotal = Math.max(0, cartTotal - discountAmount);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        isInWishlist,
        cartCount,
        cartTotal,
        wishlistCount,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSearchOpen,
        setIsSearchOpen,
        isAuthOpen,
        setIsAuthOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedQuickViewProduct,
        setSelectedQuickViewProduct,
        selectedDetailProduct,
        setSelectedDetailProduct,
        policyModal,
        setPolicyModal,
        toastMessage,
        showToast,
        completedOrder,
        setCompletedOrder,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        discountAmount,
        finalTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}

