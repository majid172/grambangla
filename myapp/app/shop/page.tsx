'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { CartProvider, useCart } from '@/context/CartContext';
import { PRODUCTS, CATEGORIES } from '@/data/products';
import { Product } from '@/types';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import Toast from '@/components/Toast';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import SearchModal from '@/components/SearchModal';
import AuthModal from '@/components/AuthModal';
import CheckoutModal from '@/components/CheckoutModal';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import PolicyModal from '@/components/PolicyModal';
import {
  Filter,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  X,
  Sparkles,
  ChevronRight,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  PhoneCall,
  Star,
  ShoppingBag,
  ArrowRight,
  Heart,
  Eye,
  RotateCcw
} from 'lucide-react';

function ShopContent() {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen
  } = useCart();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(1200);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'discount'>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const districts = [
    'সিরাজগঞ্জ',
    'পাবনা',
    'যশোর',
    'সুন্দরবন',
    'দিনাজপুর',
    'কুষ্টিয়া',
    'খাগড়াছড়ি',
    'নাটোর'
  ];

  const handleDistrictToggle = (dist: string) => {
    setSelectedDistricts(prev =>
      prev.includes(dist) ? prev.filter(d => d !== dist) : [...prev, dist]
    );
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSelectedDistricts([]);
    setMaxPrice(1200);
    setSearchQuery('');
    setSortBy('featured');
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category match
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      // Price match
      const matchesPrice = product.price <= maxPrice;

      // District match
      const matchesDistrict = selectedDistricts.length === 0 ||
        selectedDistricts.some(dist => product.sourceLocation.includes(dist));

      // Search match
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        product.nameBn.toLowerCase().includes(q) ||
        product.nameEn.toLowerCase().includes(q) ||
        product.sourceLocation.toLowerCase().includes(q) ||
        product.shortDescBn.toLowerCase().includes(q);

      return matchesCategory && matchesPrice && matchesDistrict && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, maxPrice, selectedDistricts, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F0]">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Breadcrumb & Shop Header Banner */}
        <section className="bg-gradient-to-r from-[#244C32] via-[#1A3824] to-[#2E5F3F] text-white py-10 px-4 sm:px-6 lg:px-8 border-b-4 border-[#E5B83F]">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-300 mb-3">
              <Link href="/" className="hover:text-white transition-colors">হোম</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#E5B83F]" />
              <span className="text-[#E5B83F] font-bold">শপ কালেকশন</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
                  শিকড় সকল পণ্য ও খাঁটি সমাহার
                </h1>
                <p className="text-xs sm:text-sm text-gray-200 mt-1 max-w-2xl">
                  সিরাজগঞ্জের ঘানিভাঙা সরিষার তেল, পাবনার খাঁটি গাওয়া ঘি, সুন্দরবনের মধু ও শীতের খাঁটি খেজুরের গুড় সরাসরি কৃষকের গোলা থেকে।
                </p>
              </div>

              {/* Order via Phone Pill */}
              <div className="bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 flex items-center gap-3 self-start md:self-auto">
                <div className="w-10 h-10 rounded-xl bg-[#E5B83F] text-[#244C32] flex items-center justify-center font-bold">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-200">ফোনে সরাসরি অর্ডার করুন:</div>
                  <a href="tel:+8801312617206" className="text-sm font-extrabold text-[#E5B83F] hover:underline">
                    01312617206
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Shop Container */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Desktop Left Sidebar: 3 cols */}
            <aside className="hidden lg:block lg:col-span-3 space-y-6 sticky top-24">

              {/* Category Filter Box */}
              <div className="bg-white rounded-3xl p-5 border border-[#244C32]/10 shadow-xs">
                <div className="flex items-center justify-between border-b pb-3 mb-3">
                  <h3 className="font-extrabold text-sm text-[#244C32] flex items-center gap-1.5">
                    <Filter className="w-4 h-4 text-[#E5B83F]" />
                    <span>ক্যাটাগরিসমূহ</span>
                  </h3>
                  {selectedCategory !== 'all' && (
                    <button
                      onClick={() => setSelectedCategory('all')}
                      className="text-[11px] text-[#8B6E1A] hover:underline font-bold"
                    >
                      রিসেট
                    </button>
                  )}
                </div>

                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedCategory('all')}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${selectedCategory === 'all'
                      ? 'bg-[#244C32] text-[#FAF8F0] font-bold shadow-xs'
                      : 'text-gray-700 hover:bg-[#FAF8F0]'
                      }`}
                  >
                    <span>সব পণ্য (All Products)</span>
                    <span className="text-[10px] opacity-75">{PRODUCTS.length}</span>
                  </button>

                  {CATEGORIES.map((cat) => {
                    const isSelected = selectedCategory === cat.slug;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.slug)}
                        className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all ${isSelected
                          ? 'bg-[#244C32] text-[#FAF8F0] font-bold shadow-xs'
                          : 'text-gray-700 hover:bg-[#FAF8F0]'
                          }`}
                      >
                        <span className="truncate pr-2">{cat.nameBn}</span>
                        <span className="text-[10px] opacity-75">{cat.itemCount}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Range Slider Box */}
              <div className="bg-white rounded-3xl p-5 border border-[#244C32]/10 shadow-xs">
                <h3 className="font-extrabold text-sm text-[#244C32] border-b pb-3 mb-4">
                  সর্বোচ্চ মূল্য সীমা (Price Range)
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold text-[#244C32]">
                    <span>৳১০০</span>
                    <span className="bg-[#E5B83F]/20 text-[#8B6E1A] px-2.5 py-1 rounded-lg">
                      সর্বোচ্চ ৳{maxPrice}
                    </span>
                    <span>৳১,২০০</span>
                  </div>

                  <input
                    type="range"
                    min="100"
                    max="1200"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-[#244C32] cursor-pointer"
                  />
                </div>
              </div>

              {/* Regional Origin Filter Box */}
              <div className="bg-white rounded-3xl p-5 border border-[#244C32]/10 shadow-xs">
                <div className="flex items-center justify-between border-b pb-3 mb-3">
                  <h3 className="font-extrabold text-sm text-[#244C32] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#E5B83F]" />
                    <span>আঞ্চলিক উৎস (District)</span>
                  </h3>
                  {selectedDistricts.length > 0 && (
                    <button
                      onClick={() => setSelectedDistricts([])}
                      className="text-[11px] text-[#8B6E1A] hover:underline font-bold"
                    >
                      সব মুছুন
                    </button>
                  )}
                </div>

                <div className="space-y-2 text-xs">
                  {districts.map((dist) => {
                    const checked = selectedDistricts.includes(dist);
                    return (
                      <label
                        key={dist}
                        className="flex items-center justify-between cursor-pointer py-1 text-gray-700 hover:text-[#244C32]"
                      >
                        <div className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() => handleDistrictToggle(dist)}
                            className="rounded accent-[#244C32] w-4 h-4 cursor-pointer"
                          />
                          <span>{dist}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Trust Card */}
              <div className="bg-gradient-to-br from-[#244C32] to-[#1A3824] text-white p-5 rounded-3xl shadow-sm text-xs space-y-2.5">
                <div className="flex items-center gap-2 text-[#E5B83F] font-bold">
                  <ShieldCheck className="w-5 h-5" />
                  <span>শতভাগ বিশুদ্ধতার অঙ্গীকার</span>
                </div>
                <p className="text-gray-200 leading-relaxed">
                  পণ্য হাতে পাওয়ার পর পছন্দ না হলে বা কোনো ভেজাল প্রমাণিত হলে শতভাগ মূল্য ফেরত দেওয়া হবে।
                </p>
                <div className="pt-2 text-[11px] text-[#E5B83F] font-semibold">
                  ✓ সারা দেশে ক্যাশ অন ডেলিভারি
                </div>
              </div>

            </aside>

            {/* Right Main Catalog Area: 9 cols */}
            <div className="lg:col-span-9 space-y-6">

              {/* Top Controls: Search, Sort, View Modes & Mobile Filter Toggle */}
              <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#244C32]/10 shadow-xs space-y-4">

                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  {/* Search input */}
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="পণ্য বা অঞ্চলের নাম লিখুন..."
                      className="w-full bg-[#FAF8F0] border border-gray-200 rounded-2xl pl-10 pr-8 py-2.5 text-xs sm:text-sm text-[#252B25] focus:outline-none focus:border-[#244C32]"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery('')}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {/* Right: Mobile Filter Button, Sorting & View Toggle */}
                  <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">

                    {/* Mobile Filter Button */}
                    <button
                      onClick={() => setMobileFilterOpen(true)}
                      className="lg:hidden flex items-center gap-1.5 bg-[#FAF8F0] border border-gray-200 text-[#244C32] px-3 py-2 rounded-xl text-xs font-bold"
                    >
                      <Filter className="w-4 h-4 text-[#E5B83F]" />
                      <span>ফিল্টার</span>
                    </button>

                    {/* Sorting Select */}
                    <div className="flex items-center gap-1.5 text-xs">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as any)}
                        aria-label="সাজানোর ক্রম"
                        className="bg-[#FAF8F0] border border-gray-200 text-[#244C32] text-xs font-bold rounded-xl px-3 py-2 focus:outline-none focus:border-[#244C32]"
                      >
                        <option value="featured">জনপ্রিয় ও ফিচার্ড</option>
                        <option value="price-low">মূল্য: কম থেকে বেশি</option>
                        <option value="price-high">মূল্য: বেশি থেকে কম</option>
                        <option value="rating">সর্বোচ্চ রেটিং</option>
                        <option value="discount">সর্বোচ্চ ছাড়</option>
                      </select>
                    </div>

                    {/* View Switcher: Grid vs List */}
                    <div className="hidden sm:flex items-center bg-[#FAF8F0] p-1 rounded-xl border border-gray-200">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-[#244C32] text-white' : 'text-gray-500 hover:text-gray-900'
                          }`}
                        title="গ্রিড ভিউ"
                      >
                        <LayoutGrid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-[#244C32] text-white' : 'text-gray-500 hover:text-gray-900'
                          }`}
                        title="লিস্ট ভিউ"
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>

                  </div>
                </div>

                {/* Active Filter Badges */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-gray-100 text-xs">
                  <span className="text-gray-500 font-medium">ফলাফল: <strong>{filteredProducts.length} টি পণ্য</strong></span>

                  {selectedCategory !== 'all' && (
                    <span className="inline-flex items-center gap-1 bg-[#244C32]/10 text-[#244C32] px-2.5 py-1 rounded-full font-bold">
                      ক্যাটাগরি: {CATEGORIES.find(c => c.slug === selectedCategory)?.nameBn}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCategory('all')} />
                    </span>
                  )}

                  {selectedDistricts.map(dist => (
                    <span key={dist} className="inline-flex items-center gap-1 bg-[#E5B83F]/20 text-[#8B6E1A] px-2.5 py-1 rounded-full font-bold">
                      {dist}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => handleDistrictToggle(dist)} />
                    </span>
                  ))}

                  {maxPrice < 1200 && (
                    <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-2.5 py-1 rounded-full font-bold">
                      সর্বোচ্চ ৳{maxPrice}
                      <X className="w-3 h-3 cursor-pointer" onClick={() => setMaxPrice(1200)} />
                    </span>
                  )}

                  {(selectedCategory !== 'all' || selectedDistricts.length > 0 || maxPrice < 1200 || searchQuery) && (
                    <button
                      onClick={handleResetFilters}
                      className="text-xs text-rose-600 hover:underline font-bold ml-auto flex items-center gap-1"
                    >
                      <RotateCcw className="w-3 h-3" />
                      <span>সকল ফিল্টার রিসেট</span>
                    </button>
                  )}
                </div>

              </div>

              {/* Product Listing */}
              {filteredProducts.length > 0 ? (
                viewMode === 'grid' ? (
                  /* Grid View (3 columns on desktop) */
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                ) : (
                  /* List View (Detailed Horizontal Cards) */
                  <div className="space-y-4">
                    {filteredProducts.map((product) => {
                      const isFavorited = isInWishlist(product.id);
                      return (
                        <div
                          key={product.id}
                          className="bg-white rounded-3xl p-4 sm:p-5 border border-[#244C32]/10 shadow-xs hover:shadow-xl transition-all flex flex-col sm:flex-row gap-5 items-center justify-between group"
                        >
                          {/* Image */}
                          <Link
                            href={`/details/${product.slug}`}
                            className="relative block w-full sm:w-48 h-48 rounded-2xl overflow-hidden bg-gray-50 shrink-0"
                          >
                            <img
                              src={product.image}
                              alt={product.nameBn}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {product.badge && (
                              <span className="absolute top-2.5 left-2.5 bg-[#E5B83F] text-[#244C32] text-[10px] font-black px-2 py-0.5 rounded-full shadow-xs">
                                {product.badge}
                              </span>
                            )}
                          </Link>

                          {/* Content */}
                          <div className="flex-1 min-w-0 space-y-2 text-center sm:text-left">
                            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs">
                              <span className="text-[#8B6E1A] font-bold bg-[#E5B83F]/20 px-2 py-0.5 rounded-md flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {product.sourceLocation}
                              </span>
                              <span className="text-gray-400">•</span>
                              <div className="flex items-center gap-1">
                                <Star className="w-3.5 h-3.5 fill-[#E5B83F] text-[#E5B83F]" />
                                <span className="font-bold text-[#244C32]">{product.rating}</span>
                                <span className="text-gray-400">({product.reviewCount})</span>
                              </div>
                            </div>

                            <h3 className="font-extrabold text-base sm:text-lg text-[#244C32] hover:text-[#8B6E1A]">
                              <Link href={`/details/${product.slug}`}>
                                {product.nameBn}
                              </Link>
                            </h3>

                            <p className="text-xs text-gray-500 font-medium">
                              {product.nameEn} • {product.unit}
                            </p>

                            <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                              {product.shortDescBn}
                            </p>

                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1 text-[11px] text-gray-600">
                              {product.nutritionalHighlights.slice(0, 2).map((item, i) => (
                                <span key={i} className="bg-[#FAF8F0] px-2 py-0.5 rounded border border-gray-200">
                                  ✓ {item}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Price & Actions */}
                          <div className="w-full sm:w-44 border-t sm:border-t-0 sm:border-l border-gray-100 pt-3 sm:pt-0 sm:pl-5 flex flex-col justify-between items-center sm:items-end gap-3 shrink-0">
                            <div className="text-center sm:text-right">
                              <div className="text-2xl font-black text-[#244C32]">৳{product.price}</div>
                              {product.originalPrice && (
                                <div className="text-xs text-gray-400 line-through">৳{product.originalPrice}</div>
                              )}
                              <span className="text-[10px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 inline-block mt-1">
                                স্টকে আছে
                              </span>
                            </div>

                            <div className="w-full space-y-2">
                              <button
                                onClick={() => addToCart(product, 1)}
                                className="w-full h-9 bg-white hover:bg-[#FAF8F0] text-[#244C32] border border-gray-300 hover:border-[#244C32] rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 shadow-2xs transition-all cursor-pointer"
                              >
                                <ShoppingBag className="w-3.5 h-3.5 text-[#244C32]" />
                                <span>কার্টে যোগ করুন</span>
                              </button>

                              <button
                                onClick={() => {
                                  addToCart(product, 1);
                                  setIsCheckoutOpen(true);
                                }}
                                className="w-full h-9 bg-[#244C32] hover:bg-[#1B3B26] text-white border border-[#1B3B26] rounded-lg text-xs font-bold flex items-center justify-center gap-1 shadow-2xs hover:shadow-xs active:scale-[0.98] transition-all cursor-pointer"
                              >
                                <span>সরাসরি অর্ডার</span>
                                <ArrowRight className="w-3.5 h-3.5 text-[#E5B83F]" />
                              </button>
                            </div>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )
              ) : (
                /* Empty state */
                <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-gray-200 shadow-sm">
                  <div className="w-16 h-16 rounded-full bg-[#FAF8F0] flex items-center justify-center mx-auto mb-4 text-gray-400">
                    <Search className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-[#244C32]">কোন খাদ্যপণ্য পাওয়া যায়নি</h3>
                  <p className="text-xs text-gray-500 mt-1 mb-6">
                    আপনার নির্বাচিত ফিল্টারের সাথে মিলে এমন কোনো পণ্য মেলেনি। ফিল্টার রিসেট করে আবার দেখুন।
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="bg-[#244C32] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-[#1A3824]"
                  >
                    সকল ফিল্টার মুছুন
                  </button>
                </div>
              )}

            </div>

          </div>
        </div>

        {/* Mobile Filter Sliding Drawer */}
        {mobileFilterOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end animate-fadeIn lg:hidden">
            <div className="w-80 max-w-full bg-white h-full p-6 overflow-y-auto space-y-6">
              <div className="flex items-center justify-between border-b pb-3">
                <h3 className="font-extrabold text-base text-[#244C32] flex items-center gap-2">
                  <Filter className="w-4 h-4 text-[#E5B83F]" />
                  <span>ফিল্টার অপশন</span>
                </h3>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-lg text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile Categories */}
              <div>
                <h4 className="font-bold text-xs text-gray-700 mb-2">ক্যাটাগরি নির্বাচন করুন</h4>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => { setSelectedCategory('all'); setMobileFilterOpen(false); }}
                    className={`w-full text-left px-3 py-2 rounded-xl ${selectedCategory === 'all' ? 'bg-[#244C32] text-white font-bold' : 'text-gray-700'
                      }`}
                  >
                    সব পণ্য ({PRODUCTS.length})
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => { setSelectedCategory(cat.slug); setMobileFilterOpen(false); }}
                      className={`w-full text-left px-3 py-2 rounded-xl ${selectedCategory === cat.slug ? 'bg-[#244C32] text-white font-bold' : 'text-gray-700'
                        }`}
                    >
                      {cat.nameBn} ({cat.itemCount})
                    </button>
                  ))}
                </div>
              </div>

              {/* Mobile Price */}
              <div>
                <h4 className="font-bold text-xs text-gray-700 mb-2">সর্বোচ্চ মূল্য: ৳{maxPrice}</h4>
                <input
                  type="range"
                  min="100"
                  max="1200"
                  step="50"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#244C32]"
                />
              </div>

              {/* Mobile Districts */}
              <div>
                <h4 className="font-bold text-xs text-gray-700 mb-2">আঞ্চলিক জেলাসমূহ</h4>
                <div className="space-y-1.5 text-xs">
                  {districts.map(dist => (
                    <label key={dist} className="flex items-center gap-2 text-gray-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedDistricts.includes(dist)}
                        onChange={() => handleDistrictToggle(dist)}
                        className="rounded accent-[#244C32]"
                      />
                      <span>{dist}</span>
                    </label>
                  ))}
                </div>
              </div>

              <button
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#244C32] text-white py-3 rounded-xl text-xs font-bold shadow-md"
              >
                ফিল্টার প্রয়োগ করুন ({filteredProducts.length} টি পণ্য)
              </button>
            </div>
          </div>
        )}

      </main>

      <Footer />
      <WhatsAppButton />
      <Toast />

      {/* Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <AuthModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <PolicyModal />
    </div>
  );
}

export default function ShopPage() {
  return (
    <CartProvider>
      <ShopContent />
    </CartProvider>
  );
}
