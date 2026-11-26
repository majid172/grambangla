'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  Product, 
  OrderDetails, 
  CartItem 
} from '@/types';
import { PRODUCTS as INITIAL_PRODUCTS } from '@/data/products';
import { 
  INITIAL_ADMIN_ORDERS, 
  INITIAL_ADMIN_CUSTOMERS, 
  INITIAL_ADMIN_COUPONS, 
  INITIAL_STORE_SETTINGS,
  AdminCustomer,
  AdminCoupon,
  StoreSettings
} from '@/data/adminMockData';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  Tag, 
  Settings, 
  LogOut, 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Truck, 
  XCircle, 
  Printer, 
  MessageCircle, 
  Phone, 
  ExternalLink, 
  Menu, 
  X, 
  TrendingUp, 
  DollarSign, 
  AlertCircle, 
  ArrowUpRight, 
  Save, 
  Leaf, 
  Layers, 
  Lock,
  ChevronDown,
  Bell,
  RefreshCw,
  Edit3
} from 'lucide-react';

export default function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [loginEmail, setLoginEmail] = useState('admin@grambangla.com');
  const [loginPassword, setLoginPassword] = useState('admin123');
  const [authError, setAuthError] = useState('');

  // Navigation State
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'customers' | 'coupons' | 'settings'>('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Data States
  const [orders, setOrders] = useState<OrderDetails[]>(INITIAL_ADMIN_ORDERS);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [customers, setCustomers] = useState<AdminCustomer[]>(INITIAL_ADMIN_CUSTOMERS);
  const [coupons, setCoupons] = useState<AdminCoupon[]>(INITIAL_ADMIN_COUPONS);
  const [settings, setSettings] = useState<StoreSettings>(INITIAL_STORE_SETTINGS);

  // Modals
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<OrderDetails | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);
  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);

  // Order Filters
  const [orderSearchQuery, setOrderSearchQuery] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | 'Pending' | 'Confirmed' | 'Processing' | 'Delivered' | 'Cancelled'>('all');

  // Product Filters
  const [productSearchQuery, setProductSearchQuery] = useState('');
  const [productCategoryFilter, setProductCategoryFilter] = useState<string>('all');

  // New Product Form State
  const [newProdNameBn, setNewProdNameBn] = useState('');
  const [newProdNameEn, setNewProdNameEn] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<'mustard-oil' | 'ghee' | 'honey' | 'rice' | 'pulses' | 'spices' | 'gur'>('mustard-oil');
  const [newProdPrice, setNewProdPrice] = useState<number>(350);
  const [newProdOriginalPrice, setNewProdOriginalPrice] = useState<number>(400);
  const [newProdUnit, setNewProdUnit] = useState('১ লিটার');
  const [newProdLocation, setNewProdLocation] = useState('সিরাজগঞ্জ');
  const [newProdImage, setNewProdImage] = useState('https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=800&q=80');

  // New Coupon Form State
  const [newCpnCode, setNewCpnCode] = useState('');
  const [newCpnDiscount, setNewCpnDiscount] = useState<number>(10);
  const [newCpnMinOrder, setNewCpnMinOrder] = useState<number>(1000);

  // Show Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3000);
  };

  // Load Initial Data from localStorage or fallbacks
  useEffect(() => {
    try {
      // Load Orders
      const savedOrders = localStorage.getItem('gb_admin_orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      } else {
        setOrders(INITIAL_ADMIN_ORDERS);
        localStorage.setItem('gb_admin_orders', JSON.stringify(INITIAL_ADMIN_ORDERS));
      }

      // Load Settings
      const savedSettings = localStorage.getItem('gb_admin_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }

      // Load Products
      const savedProducts = localStorage.getItem('gb_admin_products');
      if (savedProducts) {
        setProducts(JSON.parse(savedProducts));
      }

      // Load Coupons
      const savedCoupons = localStorage.getItem('gb_admin_coupons');
      if (savedCoupons) {
        setCoupons(JSON.parse(savedCoupons));
      }
    } catch {
      setOrders(INITIAL_ADMIN_ORDERS);
    }
  }, []);

  // Save Orders
  const updateOrdersState = (newOrders: OrderDetails[]) => {
    setOrders(newOrders);
    try {
      localStorage.setItem('gb_admin_orders', JSON.stringify(newOrders));
    } catch {}
  };

  // Handle Order Status Change
  const handleStatusChange = (orderId: string, newStatus: OrderDetails['status']) => {
    const updated = orders.map((ord) => 
      ord.orderId === orderId ? { ...ord, status: newStatus } : ord
    );
    updateOrdersState(updated);
    showToast(`অর্ডার #${orderId} এর স্ট্যাটাস '${newStatus}' এ পরিবর্তন হয়েছে!`);
  };

  // Handle Delete Order
  const handleDeleteOrder = (orderId: string) => {
    if (confirm(`আপনি কি নিশ্চিতভাবে অর্ডার #${orderId} মুছে ফেলতে চান?`)) {
      const updated = orders.filter((o) => o.orderId !== orderId);
      updateOrdersState(updated);
      showToast(`অর্ডার #${orderId} মুছে ফেলা হয়েছে!`);
    }
  };

  // Handle Save Settings
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.setItem('gb_admin_settings', JSON.stringify(settings));
      showToast('স্টোর সেটিংস সফলভাবে সংরক্ষিত হয়েছে!');
    } catch {
      showToast('সেটিংস সংরক্ষণে সমস্যা হয়েছে');
    }
  };

  // Handle Add Product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProdNameBn) return;

    const newSlug = newProdNameEn ? newProdNameEn.toLowerCase().replace(/\s+/g, '-') : `product-${Date.now()}`;
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      slug: newSlug,
      nameBn: newProdNameBn,
      nameEn: newProdNameEn || newProdNameBn,
      category: newProdCategory,
      categoryNameBn: newProdCategory === 'mustard-oil' ? 'সরিষার তেল' : 'অর্গানিক ফুড',
      shortDescBn: 'গ্রামবাংলার নিজস্ব তত্ত্বাবধানে প্রস্তুত শতভাগ খাঁটি ও প্রাকৃতিক খাবার।',
      fullDescBn: 'কোনো প্রকার প্রিজারভেটিভ বা ভেজাল ছাড়া বিশুদ্ধ দেশীয় উপায়ে তৈরি।',
      price: Number(newProdPrice),
      originalPrice: Number(newProdOriginalPrice),
      discountPercent: Math.round(((newProdOriginalPrice - newProdPrice) / newProdOriginalPrice) * 100),
      unit: newProdUnit,
      inStock: true,
      stockCount: 50,
      rating: 5.0,
      reviewCount: 1,
      featured: true,
      image: newProdImage,
      gallery: [newProdImage],
      sourceLocation: newProdLocation,
      nutritionalHighlights: ['১০০% বিশুদ্ধ', 'প্রিজারভেটিভ মুক্ত']
    };

    const updated = [newProduct, ...products];
    setProducts(updated);
    try {
      localStorage.setItem('gb_admin_products', JSON.stringify(updated));
    } catch {}

    setIsAddProductOpen(false);
    showToast(`নতুন পণ্য "${newProdNameBn}" সফলভাবে যুক্ত হয়েছে!`);
    setNewProdNameBn('');
    setNewProdNameEn('');
  };

  // Handle Delete Product
  const handleDeleteProduct = (productId: string) => {
    if (confirm('আপনি কি পণ্যটি ক্যাটালগ থেকে মুছে ফেলতে চান?')) {
      const updated = products.filter((p) => p.id !== productId);
      setProducts(updated);
      try {
        localStorage.setItem('gb_admin_products', JSON.stringify(updated));
      } catch {}
      showToast('পণ্যটি সফলভাবে মুছে ফেলা হয়েছে!');
    }
  };

  // Handle Toggle Product Stock
  const handleToggleProductStock = (productId: string) => {
    const updated = products.map((p) => 
      p.id === productId ? { ...p, inStock: !p.inStock } : p
    );
    setProducts(updated);
    try {
      localStorage.setItem('gb_admin_products', JSON.stringify(updated));
    } catch {}
  };

  // Handle Stock Count Change
  const handleUpdateStockCount = (productId: string, delta: number) => {
    const updated = products.map((p) => 
      p.id === productId ? { ...p, stockCount: Math.max(0, p.stockCount + delta) } : p
    );
    setProducts(updated);
    try {
      localStorage.setItem('gb_admin_products', JSON.stringify(updated));
    } catch {}
  };

  // Handle Add Coupon
  const handleAddCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCpnCode) return;

    const newCoupon: AdminCoupon = {
      id: `cpn-${Date.now()}`,
      code: newCpnCode.toUpperCase().trim(),
      discountPercent: Number(newCpnDiscount),
      minOrderAmount: Number(newCpnMinOrder),
      usageCount: 0,
      isActive: true,
      expiryDate: 'চলতি বছর (Active)',
    };

    const updated = [newCoupon, ...coupons];
    setCoupons(updated);
    try {
      localStorage.setItem('gb_admin_coupons', JSON.stringify(updated));
    } catch {}

    setIsAddCouponOpen(false);
    setNewCpnCode('');
    showToast(`কুপন কোড "${newCoupon.code}" তৈরি হয়েছে!`);
  };

  // Calculations for KPI Cards
  const stats = useMemo(() => {
    const totalRevenue = orders
      .filter((o) => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.total, 0);
    const totalOrdersCount = orders.length;
    const pendingOrdersCount = orders.filter((o) => o.status === 'Pending').length;
    const deliveredCount = orders.filter((o) => o.status === 'Delivered').length;
    const deliveredRate = totalOrdersCount > 0 ? Math.round((deliveredCount / totalOrdersCount) * 100) : 0;
    const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
    const lowStockCount = products.filter((p) => p.stockCount < 10).length;

    return {
      totalRevenue,
      totalOrdersCount,
      pendingOrdersCount,
      deliveredRate,
      avgOrderValue,
      lowStockCount
    };
  }, [orders, products]);

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch = 
        order.orderId.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        order.customerName.toLowerCase().includes(orderSearchQuery.toLowerCase()) ||
        order.phone.includes(orderSearchQuery);
      const matchesStatus = orderStatusFilter === 'all' || order.status === orderStatusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, orderSearchQuery, orderStatusFilter]);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch = 
        p.nameBn.toLowerCase().includes(productSearchQuery.toLowerCase()) ||
        p.nameEn.toLowerCase().includes(productSearchQuery.toLowerCase());
      const matchesCat = productCategoryFilter === 'all' || p.category === productCategoryFilter;
      return matchesSearch && matchesCat;
    });
  }, [products, productSearchQuery, productCategoryFilter]);

  // Login handler
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginEmail === 'admin@grambangla.com' && loginPassword === 'admin123') {
      setIsAuthenticated(true);
      setAuthError('');
      showToast('অ্যাডমিন ড্যাশবোর্ডে স্বাগতম!');
    } else {
      setAuthError('ভুল ইমেইল বা পাসওয়ার্ড। সঠিক তথ্য দিন।');
    }
  };

  // Login View if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FAF8F0] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl border border-[#244C32]/10 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-14 h-14 bg-[#244C32] rounded-2xl flex items-center justify-center mx-auto text-[#E5B83F] shadow-lg">
              <Leaf className="w-8 h-8" />
            </div>
            <h2 className="text-2xl font-black text-[#244C32]">গ্রামবাংলা অ্যাডমিন</h2>
            <p className="text-xs text-gray-500 font-medium">নিরাপদ স্টোর ম্যানেজমেন্ট পোর্টাল</p>
          </div>

          {authError && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">অ্যাডমিন ইমেইল</label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">পাসওয়ার্ড</label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full text-sm bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 bg-[#244C32] hover:bg-[#1A3824] text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-[0.99] cursor-pointer"
            >
              লগইন করুন
            </button>
          </form>

          <div className="pt-2 border-t border-gray-100 text-center">
            <div className="text-[11px] text-gray-400">
              ডেমো এক্সেস: <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono">admin@grambangla.com</code> / <code className="bg-gray-100 px-1.5 py-0.5 rounded text-gray-700 font-mono">admin123</code>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F5F2] flex text-[#252B25] antialiased">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#244C32] text-white px-5 py-3 rounded-xl shadow-2xl text-xs sm:text-sm font-bold flex items-center gap-2 border border-[#E5B83F]/30 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#E5B83F]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      {/* Left Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-[#1E432B] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        
        <div>
          {/* Brand Header */}
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E5B83F] text-[#1E432B] flex items-center justify-center font-bold shadow-sm">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h1 className="font-extrabold text-base tracking-tight text-white">গ্রামবাংলা</h1>
                <span className="text-[10px] text-emerald-200 uppercase tracking-widest font-semibold block">অ্যাডমিন প্যানেল</span>
              </div>
            </Link>

            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/10 text-white/80"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-3 space-y-1.5">
            <button
              onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-white/15 text-white shadow-xs'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <LayoutDashboard className="w-4 h-4 text-[#E5B83F]" />
                <span>ড্যাশবোর্ড ওভারভিউ</span>
              </div>
            </button>

            <button
              onClick={() => { setActiveTab('orders'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'orders'
                  ? 'bg-white/15 text-white shadow-xs'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="w-4 h-4 text-[#E5B83F]" />
                <span>অর্ডারসমূহ</span>
              </div>
              {stats.pendingOrdersCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500 text-white">
                  {stats.pendingOrdersCount}
                </span>
              )}
            </button>

            <button
              onClick={() => { setActiveTab('products'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-white/15 text-white shadow-xs'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Package className="w-4 h-4 text-[#E5B83F]" />
                <span>পণ্য ক্যাটালগ</span>
              </div>
              <span className="text-[10px] text-gray-300 font-semibold">{products.length}টি</span>
            </button>

            <button
              onClick={() => { setActiveTab('customers'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'customers'
                  ? 'bg-white/15 text-white shadow-xs'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-[#E5B83F]" />
                <span>গ্রাহক ও লিডস</span>
              </div>
              <span className="text-[10px] text-gray-300 font-semibold">{customers.length}</span>
            </button>

            <button
              onClick={() => { setActiveTab('coupons'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'coupons'
                  ? 'bg-white/15 text-white shadow-xs'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Tag className="w-4 h-4 text-[#E5B83F]" />
                <span>কুপন ও ছাড়</span>
              </div>
              <span className="text-[10px] text-gray-300 font-semibold">{coupons.length}টি</span>
            </button>

            <button
              onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-white/15 text-white shadow-xs'
                  : 'text-gray-300 hover:bg-white/10 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Settings className="w-4 h-4 text-[#E5B83F]" />
                <span>স্টোর সেটিংস</span>
              </div>
            </button>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-bold transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-[#E5B83F]" />
            <span>লাইভ স্টোর দেখুন</span>
          </Link>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#E5B83F] text-[#1E432B] flex items-center justify-center font-bold text-xs">
                GA
              </div>
              <div className="text-left">
                <div className="text-xs font-bold text-white">অ্যাডমিন ইউজার</div>
                <div className="text-[10px] text-emerald-200">সুপার অ্যাডমিন</div>
              </div>
            </div>

            <button
              onClick={() => { setIsAuthenticated(false); showToast('লগআউট করা হয়েছে'); }}
              title="লগআউট"
              className="p-1.5 rounded-lg hover:bg-rose-500/20 text-gray-300 hover:text-rose-400 transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        
        {/* Top Header Bar */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200/80 px-4 sm:px-6 py-3.5 flex items-center justify-between shadow-2xs">
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="text-xs text-gray-500 font-medium hidden sm:block">গ্রামবাংলা ইকমার্স প্ল্যাটফর্ম</div>
              <h2 className="text-base sm:text-lg font-black text-[#244C32]">
                {activeTab === 'overview' && 'ড্যাশবোর্ড ও বিশ্লেষণ'}
                {activeTab === 'orders' && 'অর্ডার ব্যবস্থাপনা'}
                {activeTab === 'products' && 'পণ্য ক্যাটালগ ও ইনভেন্টরি'}
                {activeTab === 'customers' && 'গ্রাহক তথ্য ও হটলাইন লিডস'}
                {activeTab === 'coupons' && 'কুপন কোড ও প্রমোশনাল ছাড়'}
                {activeTab === 'settings' && 'স্টোর ও হটলাইন সেটিংস'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Store Status Pill */}
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              স্টোর সক্রিয় (Online)
            </span>

            {/* Quick Action Button */}
            {activeTab === 'products' && (
              <button
                onClick={() => setIsAddProductOpen(true)}
                className="h-9 px-3 bg-[#244C32] hover:bg-[#1A3824] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#E5B83F]" />
                <span>নতুন পণ্য</span>
              </button>
            )}

            {activeTab === 'coupons' && (
              <button
                onClick={() => setIsAddCouponOpen(true)}
                className="h-9 px-3 bg-[#244C32] hover:bg-[#1A3824] text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-[#E5B83F]" />
                <span>নতুন কুপন</span>
              </button>
            )}

            {/* View Store button */}
            <Link
              href="/"
              className="h-9 px-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <span>ওয়েবসাইট</span>
              <ExternalLink className="w-3 h-3 text-gray-500" />
            </Link>
          </div>

        </header>

        {/* Tab Contents */}
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6 animate-fadeIn">
              
              {/* 4 KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Total Revenue */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-xs font-bold">মোট বিক্রি (Revenue)</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-[#244C32]">৳{stats.totalRevenue.toLocaleString('bn-BD')}</div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                    <TrendingUp className="w-3 h-3" />
                    <span>চলতি মাসে +১২.৫% প্রবৃদ্ধি</span>
                  </div>
                </div>

                {/* Total Orders */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-xs font-bold">মোট অর্ডার সংখ্যা</span>
                    <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-[#244C32]">{stats.totalOrdersCount} টি</div>
                  <div className="flex items-center gap-1 text-[11px] font-semibold text-amber-800">
                    <Clock className="w-3 h-3 text-amber-600" />
                    <span>{stats.pendingOrdersCount} টি অর্ডার অপেক্ষমান (Pending)</span>
                  </div>
                </div>

                {/* Avg Order Value */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-xs font-bold">গড় অর্ডার মূল্য (AOV)</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                      <Layers className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-[#244C32]">৳{stats.avgOrderValue}</div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    প্রতি কাস্টমার গড়ে ২.৩ টি পণ্য কেনেন
                  </div>
                </div>

                {/* Delivery Success Rate */}
                <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-gray-500">
                    <span className="text-xs font-bold">সফল ডেলিভারি রেট</span>
                    <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center">
                      <Truck className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="text-2xl font-black text-[#244C32]">{stats.deliveredRate}%</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">
                    ঢাকার ভেতরে ২৪-৪৮ ঘণ্টার মধ্যে
                  </div>
                </div>

              </div>

              {/* Two Column Layout: Recent Orders + Quick Insights */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                
                {/* Recent Orders (8 cols) */}
                <div className="lg:col-span-8 bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-black text-[#244C32]">সাম্প্রতিক অর্ডারসমূহ</h3>
                      <p className="text-xs text-gray-500">সর্বশেষ গ্রাহকদের দেওয়া অর্ডার তালিকা</p>
                    </div>

                    <button
                      onClick={() => setActiveTab('orders')}
                      className="text-xs font-bold text-[#244C32] hover:text-[#1A3824] flex items-center gap-1 hover:underline"
                    >
                      <span>সকল অর্ডার ({orders.length})</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-gray-50/80 text-gray-600 border-b border-gray-200 font-bold">
                          <th className="py-3 px-4">অর্ডার আইডি</th>
                          <th className="py-3 px-4">গ্রাহক</th>
                          <th className="py-3 px-4">পণ্যসমূহ</th>
                          <th className="py-3 px-4">মূল্য</th>
                          <th className="py-3 px-4">স্ট্যাটাস</th>
                          <th className="py-3 px-4 text-right">অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {orders.slice(0, 5).map((order) => (
                          <tr key={order.orderId} className="hover:bg-gray-50/60 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-[#244C32]">
                              {order.orderId}
                              <div className="text-[10px] text-gray-400 font-sans">{order.orderDate}</div>
                            </td>
                            <td className="py-3 px-4">
                              <div className="font-bold text-gray-900">{order.customerName}</div>
                              <div className="text-[10px] text-gray-500">{order.phone} • {order.city}</div>
                            </td>
                            <td className="py-3 px-4 max-w-[200px]">
                              <div className="truncate text-gray-700">
                                {order.items.map((it) => `${it.product?.nameBn || 'পণ্য'} (${it.quantity})`).join(', ')}
                              </div>
                            </td>
                            <td className="py-3 px-4 font-black text-[#244C32]">
                              ৳{order.total}
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                order.status === 'Pending' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                                order.status === 'Confirmed' ? 'bg-blue-50 text-blue-800 border-blue-200' :
                                order.status === 'Processing' ? 'bg-purple-50 text-purple-800 border-purple-200' :
                                order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                                'bg-rose-50 text-rose-800 border-rose-200'
                              }`}>
                                {order.status === 'Pending' && 'নতুন (Pending)'}
                                {order.status === 'Confirmed' && 'কনফার্মড'}
                                {order.status === 'Processing' && 'প্রসেসিং'}
                                {order.status === 'Delivered' && 'ডেলিভার্ড'}
                                {order.status === 'Cancelled' && 'বাতিল'}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => setSelectedOrderForInvoice(order)}
                                className="p-1.5 rounded-lg border border-gray-200 hover:border-[#244C32] text-gray-600 hover:text-[#244C32] hover:bg-emerald-50/50 transition-colors inline-flex items-center gap-1 text-[11px] font-bold"
                              >
                                <Eye className="w-3 h-3" />
                                <span>চালান</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Right Side: Popular Categories & Low Stock Warnings (4 cols) */}
                <div className="lg:col-span-4 space-y-6">
                  
                  {/* Category Revenue Shares */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
                    <h3 className="text-sm font-black text-[#244C32]">জনপ্রিয় ক্যাটাগরি বিক্রি</h3>

                    <div className="space-y-3 text-xs">
                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>কাঠের ঘানিভাঙা সরিষার তেল</span>
                          <span className="text-[#244C32]">৪২%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-[#244C32] h-full rounded-full" style={{ width: '42%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>গাওয়া ও বিলোড়ন ঘি</span>
                          <span className="text-[#244C32]">২৮%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-[#E5B83F] h-full rounded-full" style={{ width: '28%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>সুন্দরবনের প্রাকৃতিক মধু</span>
                          <span className="text-[#244C32]">১৮%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-amber-600 h-full rounded-full" style={{ width: '18%' }}></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between font-bold mb-1">
                          <span>খেজুরের নলেন ও পাটালি গুড়</span>
                          <span className="text-[#244C32]">১২%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                          <div className="bg-emerald-600 h-full rounded-full" style={{ width: '12%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Low Stock Warning Card */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-black text-[#244C32] flex items-center gap-1.5">
                        <AlertCircle className="w-4 h-4 text-amber-500" />
                        <span>ইনভেন্টরি সতর্কতা</span>
                      </h3>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        স্টক পর্যবেক্ষণ
                      </span>
                    </div>

                    <p className="text-xs text-gray-500">
                      যেসব পণ্যের স্টক বর্তমানে কম রয়েছে এবং পুনরায় সংগ্রহ প্রয়োজন:
                    </p>

                    <div className="divide-y divide-gray-100 text-xs">
                      {products.slice(0, 3).map((p) => (
                        <div key={p.id} className="py-2 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img src={p.image} alt={p.nameBn} className="w-7 h-7 rounded-md object-cover" />
                            <span className="font-semibold text-gray-800 line-clamp-1">{p.nameBn}</span>
                          </div>
                          <span className="font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded text-[11px]">
                            {p.stockCount} টি অবশিষ্ট
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>

            </div>
          )}

          {/* TAB 2: ORDERS MANAGEMENT */}
          {activeTab === 'orders' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Filter & Search Bar */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
                
                {/* Search */}
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={orderSearchQuery}
                    onChange={(e) => setOrderSearchQuery(e.target.value)}
                    placeholder="অর্ডার আইডি, গ্রাহক নাম বা ফোন..."
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#244C32]"
                  />
                </div>

                {/* Status Tabs */}
                <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
                  {(['all', 'Pending', 'Confirmed', 'Processing', 'Delivered', 'Cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                        orderStatusFilter === st
                          ? 'bg-[#244C32] text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {st === 'all' && `সব (${orders.length})`}
                      {st === 'Pending' && `পেন্ডিং (${orders.filter(o => o.status === 'Pending').length})`}
                      {st === 'Confirmed' && 'কনফার্মড'}
                      {st === 'Processing' && 'প্রসেসিং'}
                      {st === 'Delivered' && 'ডেলিভার্ড'}
                      {st === 'Cancelled' && 'বাতিল'}
                    </button>
                  ))}
                </div>

              </div>

              {/* Orders Table */}
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 border-b border-gray-200 font-bold">
                        <th className="py-3.5 px-4">অর্ডার আইডি</th>
                        <th className="py-3.5 px-4">তারিখ</th>
                        <th className="py-3.5 px-4">গ্রাহক ও ঠিকানা</th>
                        <th className="py-3.5 px-4">পণ্য ও পরিমাণ</th>
                        <th className="py-3.5 px-4">পেমেন্ট মেথড</th>
                        <th className="py-3.5 px-4">মোট টাকা</th>
                        <th className="py-3.5 px-4">স্ট্যাটাস পরিবর্তন</th>
                        <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-12 text-center text-gray-500 font-medium">
                            কোনো অর্ডার পাওয়া যায়নি। ফিল্টার পরিবর্তন করে দেখুন।
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((order) => (
                          <tr key={order.orderId} className="hover:bg-gray-50/70 transition-colors">
                            <td className="py-3.5 px-4 font-mono font-bold text-[#244C32]">
                              {order.orderId}
                            </td>
                            <td className="py-3.5 px-4 text-gray-500">
                              {order.orderDate}
                            </td>
                            <td className="py-3.5 px-4">
                              <div className="font-bold text-gray-900">{order.customerName}</div>
                              <div className="text-[11px] text-gray-600 font-mono">{order.phone}</div>
                              <div className="text-[10px] text-gray-400 line-clamp-1">{order.address}, {order.city}</div>
                            </td>
                            <td className="py-3.5 px-4 max-w-[220px]">
                              <div className="space-y-1">
                                {order.items.map((it, idx) => (
                                  <div key={idx} className="flex items-center gap-1.5 text-gray-700">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#244C32]"></span>
                                    <span className="truncate">{it.product?.nameBn || 'পণ্য'}</span>
                                    <span className="font-bold text-[#244C32]">× {it.quantity}</span>
                                  </div>
                                ))}
                              </div>
                            </td>
                            <td className="py-3.5 px-4">
                              <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                                order.paymentMethod === 'bkash' ? 'bg-[#E2136E]/10 text-[#E2136E]' :
                                order.paymentMethod === 'nagad' ? 'bg-[#F7941D]/10 text-[#F7941D]' :
                                'bg-gray-100 text-gray-800'
                              }`}>
                                {order.paymentMethod === 'cod' && 'ক্যাশ অন ডেলিভারি'}
                                {order.paymentMethod === 'bkash' && 'বিকাশ'}
                                {order.paymentMethod === 'nagad' && 'নগদ'}
                              </span>
                            </td>
                            <td className="py-3.5 px-4 font-black text-sm text-[#244C32]">
                              ৳{order.total}
                            </td>
                            <td className="py-3.5 px-4">
                              <select
                                value={order.status}
                                onChange={(e) => handleStatusChange(order.orderId, e.target.value as any)}
                                className={`text-[11px] font-bold px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                                  order.status === 'Pending' ? 'bg-amber-50 text-amber-800 border-amber-300' :
                                  order.status === 'Confirmed' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                                  order.status === 'Processing' ? 'bg-purple-50 text-purple-800 border-purple-300' :
                                  order.status === 'Delivered' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                                  'bg-rose-50 text-rose-800 border-rose-300'
                                }`}
                              >
                                <option value="Pending">নতুন (Pending)</option>
                                <option value="Confirmed">কনফার্মড</option>
                                <option value="Processing">প্রসেসিং</option>
                                <option value="Delivered">ডেলিভার্ড</option>
                                <option value="Cancelled">বাতিল</option>
                              </select>
                            </td>
                            <td className="py-3.5 px-4 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedOrderForInvoice(order)}
                                  title="চালান ও বিবরণ দেখুন"
                                  className="p-1.5 rounded-lg border border-gray-200 hover:border-[#244C32] text-gray-700 hover:text-[#244C32] transition-colors"
                                >
                                  <Eye className="w-3.5 h-3.5" />
                                </button>
                                <a
                                  href={`https://wa.me/88${order.phone}?text=${encodeURIComponent(`আসসালামু আলাইকুম ${order.customerName}, গ্রামবাংলা থেকে আপনার অর্ডার #${order.orderId} সম্পর্কিত বার্তা:`)}`}
                                  target="_blank"
                                  title="হোয়াটসঅ্যাপে মেসেজ পাঠান"
                                  className="p-1.5 rounded-lg border border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-colors"
                                >
                                  <MessageCircle className="w-3.5 h-3.5" />
                                </a>
                                <button
                                  onClick={() => handleDeleteOrder(order.orderId)}
                                  title="অর্ডার মুছুন"
                                  className="p-1.5 rounded-lg border border-gray-200 hover:border-rose-400 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: PRODUCTS MANAGEMENT */}
          {activeTab === 'products' && (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Search & Category Filter */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
                
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    placeholder="পণ্যের নাম দিয়ে খুঁজুন..."
                    className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:border-[#244C32]"
                  />
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={productCategoryFilter}
                    onChange={(e) => setProductCategoryFilter(e.target.value)}
                    className="text-xs bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 font-semibold text-gray-700 focus:outline-none"
                  >
                    <option value="all">সকল ক্যাটাগরি</option>
                    <option value="mustard-oil">সরিষার তেল</option>
                    <option value="ghee">গাওয়া ঘি</option>
                    <option value="honey">প্রাকৃতিক মধু</option>
                    <option value="gur">খেজুরের গুড়</option>
                    <option value="rice">চাল</option>
                    <option value="spices">মসলা</option>
                  </select>

                  <button
                    onClick={() => setIsAddProductOpen(true)}
                    className="h-9 px-4 bg-[#244C32] hover:bg-[#1A3824] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#E5B83F]" />
                    <span>নতুন পণ্য যোগ</span>
                  </button>
                </div>

              </div>

              {/* Products Table */}
              <div className="bg-white rounded-2xl border border-gray-200/80 shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 border-b border-gray-200 font-bold">
                        <th className="py-3.5 px-4">ছবি</th>
                        <th className="py-3.5 px-4">পণ্যের নাম</th>
                        <th className="py-3.5 px-4">ক্যাটাগরি</th>
                        <th className="py-3.5 px-4">মূল্য (৳)</th>
                        <th className="py-3.5 px-4">ইনভেন্টরি স্টক</th>
                        <th className="py-3.5 px-4">স্টক স্ট্যাটাস</th>
                        <th className="py-3.5 px-4 text-right">অ্যাকশন</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {filteredProducts.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4">
                            <img src={p.image} alt={p.nameBn} className="w-10 h-10 rounded-xl object-cover border border-gray-200" />
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="font-bold text-gray-900 text-xs sm:text-sm">{p.nameBn}</div>
                            <div className="text-[11px] text-gray-400">{p.nameEn} • {p.unit}</div>
                            <div className="text-[10px] text-emerald-800 font-medium">উৎস: {p.sourceLocation}</div>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="bg-gray-100 text-gray-700 px-2.5 py-1 rounded-md font-semibold text-[11px]">
                              {p.categoryNameBn || p.category}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-sm text-[#244C32]">
                            ৳{p.price}
                            {p.originalPrice && (
                              <span className="text-[11px] text-gray-400 line-through block font-normal">
                                ৳{p.originalPrice}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => handleUpdateStockCount(p.id, -1)}
                                className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-bold font-mono">{p.stockCount}</span>
                              <button
                                onClick={() => handleUpdateStockCount(p.id, 1)}
                                className="w-6 h-6 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-xs"
                              >
                                +
                              </button>
                            </div>
                          </td>
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => handleToggleProductStock(p.id)}
                              className={`px-2.5 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                                p.inStock
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100'
                                  : 'bg-rose-50 text-rose-800 border-rose-200 hover:bg-rose-100'
                              }`}
                            >
                              {p.inStock ? '✓ স্টকে আছে' : '✕ স্টক আউট'}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <Link
                                href={`/details/${p.slug}`}
                                target="_blank"
                                title="প্রোডাক্ট পেজ দেখুন"
                                className="p-1.5 rounded-lg border border-gray-200 hover:border-[#244C32] text-gray-600 hover:text-[#244C32] transition-colors"
                              >
                                <Eye className="w-3.5 h-3.5" />
                              </Link>
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                title="মুছে ফেলুন"
                                className="p-1.5 rounded-lg border border-gray-200 hover:border-rose-400 text-gray-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 4: CUSTOMERS & LEADS */}
          {activeTab === 'customers' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
                <h3 className="text-sm font-black text-[#244C32] mb-1">নিবন্ধিত ও সক্রিয় গ্রাহক তালিকা</h3>
                <p className="text-xs text-gray-500 mb-4">যাঁরা সরাসরি ওয়েবসাইট বা হটলাইনে অর্ডার দিয়েছেন</p>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 border-b border-gray-200 font-bold">
                        <th className="py-3.5 px-4">গ্রাহকের নাম</th>
                        <th className="py-3.5 px-4">মোবাইল নম্বর</th>
                        <th className="py-3.5 px-4">ঠিকানা ও শহর</th>
                        <th className="py-3.5 px-4 text-center">মোট অর্ডার</th>
                        <th className="py-3.5 px-4">মোট কেনাকাটা</th>
                        <th className="py-3.5 px-4">সর্বশেষ অর্ডার</th>
                        <th className="py-3.5 px-4 text-right">যোগাযোগ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {customers.map((cust) => (
                        <tr key={cust.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-bold text-gray-900">
                            {cust.name}
                            <div className="text-[10px] text-gray-400 font-normal">{cust.email}</div>
                          </td>
                          <td className="py-3.5 px-4 font-mono font-bold text-[#244C32]">
                            {cust.phone}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-gray-800">{cust.city}</span>
                            <div className="text-[10px] text-gray-400 line-clamp-1">{cust.address}</div>
                          </td>
                          <td className="py-3.5 px-4 text-center font-bold">
                            <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full border border-emerald-100">
                              {cust.totalOrders} টি
                            </span>
                          </td>
                          <td className="py-3.5 px-4 font-bold text-emerald-800 font-mono">
                            ৳{cust.totalSpent.toLocaleString('bn-BD')}
                          </td>
                          <td className="py-3.5 px-4 text-gray-500">
                            {cust.lastOrderDate}
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <a
                                href={`tel:${cust.phone}`}
                                title="সরাসরি ফোন করুন"
                                className="p-1.5 rounded-lg border border-gray-200 text-gray-700 hover:border-[#244C32] hover:text-[#244C32] transition-colors"
                              >
                                <Phone className="w-3.5 h-3.5" />
                              </a>
                              <a
                                href={`https://wa.me/88${cust.phone}`}
                                target="_blank"
                                title="হোয়াটসঅ্যাপ চ্যাট করুন"
                                className="p-1.5 rounded-lg border border-emerald-200 text-emerald-600 hover:bg-emerald-50 transition-colors"
                              >
                                <MessageCircle className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: COUPONS */}
          {activeTab === 'coupons' && (
            <div className="space-y-4 animate-fadeIn">
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-[#244C32]">সক্রিয় প্রোমো ও কুপন কোডসমূহ</h3>
                    <p className="text-xs text-gray-500">গ্রাহকরা চেকআউটের সময় এই কোড প্রয়োগ করতে পারবেন</p>
                  </div>

                  <button
                    onClick={() => setIsAddCouponOpen(true)}
                    className="h-9 px-3.5 bg-[#244C32] hover:bg-[#1A3824] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4 text-[#E5B83F]" />
                    <span>নতুন কুপন তৈরি</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs">
                    <thead>
                      <tr className="bg-gray-50 text-gray-600 border-b border-gray-200 font-bold">
                        <th className="py-3.5 px-4">কুপন কোড</th>
                        <th className="py-3.5 px-4">ছাড়ের হার (%)</th>
                        <th className="py-3.5 px-4">ন্যূনতম অর্ডার</th>
                        <th className="py-3.5 px-4">মোট ব্যবহার</th>
                        <th className="py-3.5 px-4">মেয়াদ</th>
                        <th className="py-3.5 px-4">স্ট্যাটাস</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {coupons.map((cpn) => (
                        <tr key={cpn.id} className="hover:bg-gray-50/70 transition-colors">
                          <td className="py-3.5 px-4 font-mono font-black text-sm text-[#244C32]">
                            {cpn.code}
                          </td>
                          <td className="py-3.5 px-4 font-bold text-amber-700">
                            {cpn.discountPercent}% ছাড়
                          </td>
                          <td className="py-3.5 px-4 text-gray-700">
                            ৳{cpn.minOrderAmount} বা তদূর্ধ্ব
                          </td>
                          <td className="py-3.5 px-4 font-bold">
                            {cpn.usageCount} বার
                          </td>
                          <td className="py-3.5 px-4 text-gray-500">
                            {cpn.expiryDate}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                              সক্রিয় (Active)
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl space-y-6 animate-fadeIn">
              <form onSubmit={handleSaveSettings} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-200/80 shadow-xs space-y-6">
                
                <div>
                  <h3 className="text-base font-black text-[#244C32]">স্টোর ও যোগাযোগ সেটিংস</h3>
                  <p className="text-xs text-gray-500 mt-0.5">এখানে পরিবর্তন করলে সাইটের হটলাইন, হোয়াটসঅ্যাপ ও ডেলিভারি ফি সাথে সাথে আপডেট হবে।</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">স্টোরের নাম</label>
                    <input
                      type="text"
                      value={settings.storeName}
                      onChange={(e) => setSettings({ ...settings, storeName: e.target.value })}
                      className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">হটলাইন ফোন নম্বর</label>
                    <input
                      type="text"
                      value={settings.hotline}
                      onChange={(e) => setSettings({ ...settings, hotline: e.target.value })}
                      placeholder="01700-123456"
                      className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">হোয়াটসঅ্যাপ অর্ডার নম্বর</label>
                    <input
                      type="text"
                      value={settings.whatsapp}
                      onChange={(e) => setSettings({ ...settings, whatsapp: e.target.value })}
                      placeholder="01700-123456"
                      className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">সাপোর্ট ইমেইল</label>
                    <input
                      type="email"
                      value={settings.email}
                      onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                      className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <h4 className="text-xs font-bold text-gray-700 mb-3">ডেলিভারি চার্জ ও ফ্রি ডেলিভারি সীমা</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">ঢাকা মেট্রো চার্জ (৳)</label>
                      <input
                        type="number"
                        value={settings.deliveryDhaka}
                        onChange={(e) => setSettings({ ...settings, deliveryDhaka: Number(e.target.value) })}
                        className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#244C32]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">ঢাকার বাইরে চার্জ (৳)</label>
                      <input
                        type="number"
                        value={settings.deliveryOutside}
                        onChange={(e) => setSettings({ ...settings, deliveryOutside: Number(e.target.value) })}
                        className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#244C32]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-gray-600 mb-1">ফ্রি ডেলিভারি ন্যূনতম (৳)</label>
                      <input
                        type="number"
                        value={settings.freeShippingThreshold}
                        onChange={(e) => setSettings({ ...settings, freeShippingThreshold: Number(e.target.value) })}
                        className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#244C32]"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 space-y-3">
                  <h4 className="text-xs font-bold text-gray-700">মেটা পিক্সেল (Meta Pixel ID) কনফিগারেশন</h4>
                  <input
                    type="text"
                    value={settings.metaPixelId}
                    onChange={(e) => setSettings({ ...settings, metaPixelId: e.target.value })}
                    placeholder="আপনার Meta Pixel ID (যেমন: 123456789012345)"
                    className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 font-mono focus:outline-none focus:border-[#244C32]"
                  />
                  <p className="text-[11px] text-gray-400">মেটা ইভেন্টস ম্যানেজার থেকে পাওয়া পিক্সেল আইডি এখানে সংরক্ষণ করুন।</p>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="h-11 px-6 bg-[#244C32] hover:bg-[#1A3824] text-white rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <Save className="w-4 h-4 text-[#E5B83F]" />
                    <span>সেটিংস সংরক্ষণ করুন</span>
                  </button>
                </div>

              </form>
            </div>
          )}

        </div>

      </main>

      {/* MODAL 1: INVOICE / ORDER DETAIL DRAWER */}
      {selectedOrderForInvoice && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative my-6 max-h-[92vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedOrderForInvoice(null)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Printable Invoice Header */}
            <div className="border-b border-gray-200 pb-5 mb-5 flex flex-col sm:flex-row justify-between items-start gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-[#244C32] text-[#E5B83F] flex items-center justify-center font-bold">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <h3 className="font-extrabold text-lg text-[#244C32]">গ্রামবাংলা (GramBangla)</h3>
                </div>
                <p className="text-xs text-gray-500 mt-1">খাঁটি খাবার, বাংলার স্বাদ • ধানমন্ডি, ঢাকা</p>
                <p className="text-xs text-gray-500">হটলাইন: {settings.hotline}</p>
              </div>

              <div className="text-left sm:text-right">
                <span className="text-xs uppercase font-extrabold text-gray-400 block tracking-widest">অর্ডার ইনভয়েস</span>
                <span className="font-mono font-black text-base text-[#244C32]">{selectedOrderForInvoice.orderId}</span>
                <div className="text-xs text-gray-500">তারিখ: {selectedOrderForInvoice.orderDate}</div>
                <div className="mt-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    selectedOrderForInvoice.status === 'Delivered' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    স্ট্যাটাস: {selectedOrderForInvoice.status}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Bill To */}
            <div className="bg-[#FAF8F0] p-4 rounded-xl border border-gray-200/60 mb-5 text-xs space-y-1">
              <div className="font-bold text-gray-500 uppercase tracking-wider text-[10px]">গ্রাহকের বিবরণ (Customer Details):</div>
              <div className="font-bold text-sm text-gray-900">{selectedOrderForInvoice.customerName}</div>
              <div className="text-gray-700">মোবাইল: <strong className="font-mono text-[#244C32]">{selectedOrderForInvoice.phone}</strong></div>
              <div className="text-gray-700">ঠিকানা: {selectedOrderForInvoice.address}, {selectedOrderForInvoice.city}</div>
              <div className="text-gray-700">পেমেন্ট মেথড: <strong className="uppercase">{selectedOrderForInvoice.paymentMethod}</strong></div>
            </div>

            {/* Line Items Table */}
            <div className="overflow-x-auto mb-5">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500 font-bold bg-gray-50">
                    <th className="py-2.5 px-3">পণ্য</th>
                    <th className="py-2.5 px-3 text-center">পরিমাণ</th>
                    <th className="py-2.5 px-3 text-right">একক মূল্য</th>
                    <th className="py-2.5 px-3 text-right">মোট</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {selectedOrderForInvoice.items.map((it, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-3 font-semibold text-gray-800">
                        {it.product?.nameBn || 'খাদ্যপণ্য'}
                        <span className="block text-[10px] text-gray-400">{it.product?.nameEn || ''} ({it.product?.unit || ''})</span>
                      </td>
                      <td className="py-2.5 px-3 text-center font-bold">{it.quantity}</td>
                      <td className="py-2.5 px-3 text-right font-mono">৳{it.product?.price || 0}</td>
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-[#244C32]">৳{(it.product?.price || 0) * it.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Summary */}
            <div className="border-t border-gray-200 pt-3 space-y-1 text-xs max-w-xs ml-auto">
              <div className="flex justify-between text-gray-600">
                <span>সাবটোটাল:</span>
                <span className="font-mono font-semibold">৳{selectedOrderForInvoice.subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>ডেলিভারি চার্জ:</span>
                <span className="font-mono font-semibold">৳{selectedOrderForInvoice.deliveryFee}</span>
              </div>
              {selectedOrderForInvoice.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>ডিসকাউন্ট:</span>
                  <span className="font-mono">-৳{selectedOrderForInvoice.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black text-[#244C32] border-t border-gray-200 pt-2">
                <span>মোট প্রদেয়:</span>
                <span className="font-mono">৳{selectedOrderForInvoice.total}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <button
                onClick={() => window.print()}
                className="h-10 px-4 bg-gray-900 hover:bg-black text-white rounded-xl text-xs font-bold flex items-center gap-2 cursor-pointer shadow-sm"
              >
                <Printer className="w-4 h-4 text-[#E5B83F]" />
                <span>চালান প্রিন্ট করুন (Print)</span>
              </button>

              <a
                href={`https://wa.me/88${selectedOrderForInvoice.phone}?text=${encodeURIComponent(`আসসালামু আলাইকুম ${selectedOrderForInvoice.customerName}, গ্রামবাংলা থেকে আপনার অর্ডার #${selectedOrderForInvoice.orderId} (মোট ৳${selectedOrderForInvoice.total}) কনফার্ম হয়েছে।`)}`}
                target="_blank"
                className="h-10 px-4 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm"
              >
                <MessageCircle className="w-4 h-4" />
                <span>গ্রাহককে WhatsApp এ আপডেট পাঠান</span>
              </a>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 2: ADD PRODUCT MODAL */}
      {isAddProductOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-200 relative my-6">
            
            <button
              onClick={() => setIsAddProductOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-black text-lg text-[#244C32] mb-1">নতুন পণ্য যুক্ত করুন</h3>
            <p className="text-xs text-gray-500 mb-5">প্রয়োজনীয় তথ্য দিয়ে সরাসরি স্টোর ক্যাটালগে যুক্ত করুন</p>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">পণ্যের নাম (বাংলা) *</label>
                <input
                  type="text"
                  required
                  value={newProdNameBn}
                  onChange={(e) => setNewProdNameBn(e.target.value)}
                  placeholder="যেমন: খাঁটি গাওয়া ঘি"
                  className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">পণ্যের নাম (English)</label>
                <input
                  type="text"
                  value={newProdNameEn}
                  onChange={(e) => setNewProdNameEn(e.target.value)}
                  placeholder="e.g. Pure Grass-Fed Ghee"
                  className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ক্যাটাগরি</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full text-xs bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 font-semibold text-gray-700 focus:outline-none"
                  >
                    <option value="mustard-oil">সরিষার তেল</option>
                    <option value="ghee">গাওয়া ঘি</option>
                    <option value="honey">প্রাকৃতিক মধু</option>
                    <option value="gur">খেজুরের গুড়</option>
                    <option value="rice">চাল</option>
                    <option value="spices">মসলা</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">পরিমাপ / Unit</label>
                  <input
                    type="text"
                    value={newProdUnit}
                    onChange={(e) => setNewProdUnit(e.target.value)}
                    placeholder="১ লিটার / ৫০০ গ্রাম"
                    className="w-full text-xs bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#244C32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">বিক্রয় মূল্য (৳) *</label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(Number(e.target.value))}
                    className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#244C32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">আসল মূল্য (ছাড়ের পূর্বে)</label>
                  <input
                    type="number"
                    value={newProdOriginalPrice}
                    onChange={(e) => setNewProdOriginalPrice(Number(e.target.value))}
                    className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#244C32]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">উৎস / জেলা</label>
                  <input
                    type="text"
                    value={newProdLocation}
                    onChange={(e) => setNewProdLocation(e.target.value)}
                    placeholder="যেমন: পাবনা, সিরাজগঞ্জ"
                    className="w-full text-xs bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#244C32]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ছবির ইউআরএল</label>
                  <input
                    type="text"
                    value={newProdImage}
                    onChange={(e) => setNewProdImage(e.target.value)}
                    className="w-full text-xs bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#244C32]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddProductOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold hover:bg-gray-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#244C32] hover:bg-[#1A3824] text-white rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  পণ্য যুক্ত করুন
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* MODAL 3: ADD COUPON MODAL */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-200 relative">
            <button
              onClick={() => setIsAddCouponOpen(false)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-black text-base text-[#244C32] mb-1">নতুন কুপন কোড</h3>
            <p className="text-xs text-gray-500 mb-4">অফার প্রচারণার জন্য নতুন প্রোমো কোড তৈরি করুন</p>

            <form onSubmit={handleAddCoupon} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">কুপন কোড (যেমন: EID2026)</label>
                <input
                  type="text"
                  required
                  value={newCpnCode}
                  onChange={(e) => setNewCpnCode(e.target.value)}
                  placeholder="GRAMBANGLA15"
                  className="w-full uppercase font-mono font-bold bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-[#244C32]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">ছাড়ের হার (%)</label>
                <input
                  type="number"
                  required
                  min={1}
                  max={50}
                  value={newCpnDiscount}
                  onChange={(e) => setNewCpnDiscount(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-[#244C32]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">ন্যূনতম অর্ডার মূল্য (৳)</label>
                <input
                  type="number"
                  value={newCpnMinOrder}
                  onChange={(e) => setNewCpnMinOrder(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-300 rounded-xl px-3 py-2 focus:outline-none focus:border-[#244C32]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCouponOpen(false)}
                  className="px-4 py-2 rounded-xl border border-gray-300 font-bold hover:bg-gray-100"
                >
                  বাতিল
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#244C32] hover:bg-[#1A3824] text-white rounded-xl font-bold shadow-md cursor-pointer"
                >
                  কুপন তৈরি করুন
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
