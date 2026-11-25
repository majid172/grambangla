'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { CartProvider, useCart } from '@/context/CartContext';
import { trackViewContent, trackContact } from '@/lib/fpixel';
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
  ChevronRight,
  Star,
  ShoppingBag,
  ArrowRight,
  Zap,
  Heart,
  MapPin,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  PhoneCall,
  MessageCircle,
  Plus,
  Minus,
  Sparkles,
  FileText,
  Activity,
  UserCheck,
  Share2,
  Clock,
  Leaf
} from 'lucide-react';

interface ProductDetailClientProps {
  product: Product;
  relatedProducts: Product[];
}

function ProductDetailContent({ product, relatedProducts }: ProductDetailClientProps) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    setIsCheckoutOpen,
    showToast
  } = useCart();

  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'desc' | 'nutrition' | 'origin' | 'reviews'>('desc');

  const isFavorited = isInWishlist(product.id);
  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  // Meta Pixel: Track ViewContent when customer views product details
  useEffect(() => {
    trackViewContent({
      id: product.id,
      name: product.nameBn,
      category: product.category,
      price: product.price,
    });
  }, [product]);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setIsCheckoutOpen(true);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(window.location.href);
      showToast('পণ্যটির লিঙ্ক কপি করা হয়েছে!');
    }
  };

  const handleWhatsAppOrder = () => {
    trackContact('whatsapp', 'product_detail');
    const text = encodeURIComponent(
      `হ্যালো গ্রামবাংলা, আমি "${product.nameBn}" (${product.unit}) ${quantity}টি অর্ডার করতে চাই। মূল্য: ৳${product.price * quantity}।`
    );
    window.open(`https://wa.me/8801312617206?text=${text}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F0]">
      <Navbar />

      <main className="flex-1 pb-20">

        {/* Breadcrumb Navigation Bar */}
        <div className="bg-white border-b border-[#244C32]/10 py-3.5 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <nav className="flex items-center gap-2 text-gray-500 overflow-x-auto whitespace-nowrap">
              <Link href="/" className="hover:text-[#244C32] transition-colors">হোম</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <Link href="/shop" className="hover:text-[#244C32] transition-colors">শপ</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <Link href="/categories" className="hover:text-[#244C32] transition-colors">{product.categoryNameBn}</Link>
              <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="text-[#244C32] font-bold truncate max-w-xs">{product.nameBn}</span>
            </nav>

            <button
              onClick={handleShare}
              className="hidden sm:flex items-center gap-1.5 text-gray-600 hover:text-[#244C32] font-semibold text-xs transition-colors shrink-0 pl-3"
              title="লিঙ্ক কপি করুন"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>শেয়ার করুন</span>
            </button>
          </div>
        </div>

        {/* Product Details Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#244C32]/10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

              {/* Left Column: Image Gallery (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                {/* Main Large Display Image */}
                <div className="relative h-80 sm:h-[420px] rounded-3xl overflow-hidden bg-[#FAF7EE] border border-gray-100 shadow-inner group">
                  <img
                    src={product.gallery[activeImageIdx] || product.image}
                    alt={product.nameBn}
                    className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                  />

                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
                    {product.badge && (
                      <span className="bg-[#E5B83F] text-[#244C32] text-xs font-black px-3 py-1 rounded-full shadow-md flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>{product.badge}</span>
                      </span>
                    )}
                    {savings > 0 && (
                      <span className="bg-[#244C32] text-[#FAF8F0] text-xs font-bold px-2.5 py-0.5 rounded-lg shadow-sm">
                        ৳{savings} সাশ্রয় ({product.discountPercent}%)
                      </span>
                    )}
                  </div>

                  {/* Wishlist Button */}
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`absolute top-4 right-4 z-10 w-11 h-11 rounded-full flex items-center justify-center transition-all shadow-md ${isFavorited
                      ? 'bg-rose-500 text-white'
                      : 'bg-white/90 text-gray-700 hover:text-rose-500 hover:bg-white'
                      }`}
                    title="পছন্দের তালিকায় রাখুন"
                  >
                    <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                  </button>

                  {/* Origin Location Pill */}
                  <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md text-white text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
                    <MapPin className="w-3.5 h-3.5 text-[#E5B83F]" />
                    <span>উৎস: {product.sourceLocation}</span>
                  </div>
                </div>

                {/* Thumbnails Selector */}
                {product.gallery.length > 1 && (
                  <div className="flex items-center gap-3 overflow-x-auto pb-1">
                    {product.gallery.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImageIdx(idx)}
                        className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-white ${activeImageIdx === idx ? 'border-[#244C32] scale-103 shadow-md' : 'border-gray-200 opacity-70 hover:opacity-100'
                          }`}
                      >
                        <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}

                {/* Packaging and Purity Highlights */}
                <div className="grid grid-cols-2 gap-2 pt-2 text-xs text-gray-700">
                  <div className="bg-[#FAF8F0] p-3 rounded-2xl border border-gray-100 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">১০০% কেমিক্যালমুক্ত</span>
                  </div>
                  <div className="bg-[#FAF8F0] p-3 rounded-2xl border border-gray-100 flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span className="font-semibold">ফুডগ্রেড কাঁচের জার</span>
                  </div>
                </div>
              </div>

              {/* Right Column: Product Information & Purchase Controls (7 cols) */}
              <div className="lg:col-span-7 space-y-6">

                <div>
                  {/* Category & Rating */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-[#8B6E1A] bg-[#E5B83F]/20 px-3 py-1 rounded-full uppercase tracking-wider">
                      {product.categoryNameBn}
                    </span>

                    <div className="flex items-center gap-1.5 text-xs">
                      <div className="flex text-[#E5B83F]">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="font-extrabold text-[#244C32]">{product.rating}</span>
                      <span className="text-gray-400 font-medium">({product.reviewCount} যাচাইকৃত রিভিউ)</span>
                    </div>
                  </div>

                  {/* Title & Subtitle */}
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#244C32] leading-tight">
                    {product.nameBn}
                  </h1>
                  <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">
                    {product.nameEn} • {product.unit}
                  </p>

                  {/* Pricing Display */}
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-[#244C32]">
                      ৳{product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-base sm:text-lg text-gray-400 line-through">
                        ৳{product.originalPrice}
                      </span>
                    )}
                    <span className="text-xs text-emerald-800 font-bold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
                      স্টকে আছে ({product.stockCount} টি)
                    </span>
                  </div>

                  {/* Short Description */}
                  <p className="mt-4 text-sm text-gray-700 leading-relaxed font-normal">
                    {product.shortDescBn}
                  </p>

                  {/* Key Nutrition Highlights Checklist */}
                  <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-gray-800 bg-[#FAF8F0] p-4 rounded-2xl border border-[#244C32]/10">
                    {product.nutritionalHighlights.map((item, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span className="font-semibold">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Purchase Controls: Quantity & Buttons */}
                <div className="pt-4 border-t border-gray-100 space-y-4">

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-4">
                    <span className="text-xs sm:text-sm font-bold text-gray-700">পরিমাণ নির্বাচন:</span>
                    <div className="flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden shadow-xs">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="p-2.5 hover:bg-gray-100 text-gray-700 transition-colors"
                        aria-label="Decrease"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-5 text-sm font-black text-[#244C32]">{quantity}</span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="p-2.5 hover:bg-gray-100 text-gray-700 transition-colors"
                        aria-label="Increase"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="text-xs text-gray-500 font-medium">
                      মোট প্রদেয়: <strong className="text-[#244C32] text-sm font-black">৳{product.price * quantity}</strong>
                    </div>
                  </div>

                  {/* Primary Action Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <button
                      onClick={() => addToCart(product, quantity)}
                      className="w-full h-12 px-5 bg-white hover:bg-emerald-50/40 text-[#244C32] border border-gray-300 hover:border-[#244C32] rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-2xs hover:shadow-xs active:bg-gray-100 active:scale-[0.99] cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4 text-[#244C32] shrink-0" />
                      <span>কার্টে যোগ করুন</span>
                    </button>

                    <button
                      onClick={handleBuyNow}
                      className="w-full h-12 px-5 bg-[#244C32] hover:bg-[#1B3B26] active:bg-[#142C1D] text-white border border-[#1B3B26] rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <span>এখনই সরাসরি অর্ডার করুন</span>
                      <ArrowRight className="w-4 h-4 text-[#E5B83F] shrink-0" />
                    </button>
                  </div>

                  {/* Instant Order Channels: Call & WhatsApp */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <a
                      href="tel:+8801312617206"
                      onClick={() => trackContact('call', 'product_detail')}
                      className="h-10 px-3 bg-gray-50/80 hover:bg-gray-100 border border-gray-200 text-gray-700 hover:text-[#244C32] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-[#244C32]" />
                      <span>ফোনে অর্ডার (013-12617206)</span>
                    </a>

                    <button
                      onClick={handleWhatsAppOrder}
                      className="h-10 px-3 bg-[#E8F8EE] hover:bg-[#D4F4DF] text-[#15803D] border border-[#B8E6C6] rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <MessageCircle className="w-3.5 h-3.5 fill-current" />
                      <span>হোয়াটসঅ্যাপে সরাসরি অর্ডার</span>
                    </button>
                  </div>

                  {/* Delivery & Trust Guarantee Box */}
                  <div className="mt-4 p-4 rounded-2xl bg-[#FAF8F0] border border-[#244C32]/10 space-y-2 text-xs text-gray-700">
                    <div className="flex items-center gap-2 font-bold text-[#244C32]">
                      <Truck className="w-4 h-4 text-emerald-600" />
                      <span>ডেলিভারি তথ্য: ঢাকা সিটিতে ২৪-৪৮ ঘণ্টা (৳৭০), ঢাকার বাইরে ২-৩ দিন (৳১৩০)</span>
                    </div>
                    <div className="flex items-center gap-2 font-semibold text-emerald-800">
                      <Sparkles className="w-4 h-4 text-[#E5B83F]" />
                      <span>৳২,০০০ এর অর্ডারে সারা দেশে ডেলিভারি সম্পূর্ণ ফ্রি!</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <RotateCcw className="w-4 h-4 text-emerald-600" />
                      <span>পণ্য দেখে ক্যাশ অন ডেলিভারি এবং ৭ দিনের রিপ্লেসমেন্ট গ্যারান্টি।</span>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>

        {/* Detailed Information Tabs Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#244C32]/10 shadow-xs">

            {/* Tabs Header */}
            <div className="flex border-b border-gray-200 gap-4 sm:gap-8 overflow-x-auto scrollbar-none mb-6">
              <button
                onClick={() => setActiveTab('desc')}
                className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${activeTab === 'desc'
                  ? 'border-[#244C32] text-[#244C32]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
              >
                <FileText className="w-4 h-4" />
                <span>বিস্তারিত বিবরণ ও ব্যবহার প্রণালী</span>
              </button>

              <button
                onClick={() => setActiveTab('nutrition')}
                className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${activeTab === 'nutrition'
                  ? 'border-[#244C32] text-[#244C32]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
              >
                <Activity className="w-4 h-4" />
                <span>পুষ্টিগুণ ও স্বাস্থ্য উপকারিতা</span>
              </button>

              <button
                onClick={() => setActiveTab('origin')}
                className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${activeTab === 'origin'
                  ? 'border-[#244C32] text-[#244C32]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
              >
                <UserCheck className="w-4 h-4" />
                <span>কৃষক ও অঞ্চলের গল্প</span>
              </button>

              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 whitespace-nowrap transition-all ${activeTab === 'reviews'
                  ? 'border-[#244C32] text-[#244C32]'
                  : 'border-transparent text-gray-500 hover:text-gray-900'
                  }`}
              >
                <Star className="w-4 h-4" />
                <span>গ্রাহক রিভিউ ({product.reviewCount})</span>
              </button>
            </div>

            {/* Tab Contents */}
            <div className="text-sm text-gray-700 leading-relaxed space-y-4">
              {activeTab === 'desc' && (
                <div className="space-y-4">
                  <p>{product.fullDescBn}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    <div className="bg-[#FAF8F0] p-4 rounded-2xl border border-gray-100 space-y-1.5">
                      <h4 className="font-bold text-[#244C32] flex items-center gap-1.5">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>ব্যবহারের সেরা উপায়:</span>
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        ভর্তা, ভাজি বা রান্নার শেষভাগে পরিবেশন করলে আসল সুবাস ও ঝাঁঝ শতভাগ উপভোগ করা যায়। শিশুদের খাবারে ও দৈনন্দিন ডায়েটে নিয়মিত ব্যবহার নিরাপদ।
                      </p>
                    </div>

                    <div className="bg-[#FAF8F0] p-4 rounded-2xl border border-gray-100 space-y-1.5">
                      <h4 className="font-bold text-[#244C32] flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span>সংরক্ষণ পদ্ধতি:</span>
                      </h4>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        সরাসরি সূর্যের আলো ও আর্দ্রতা থেকে দূরে শীতল ও শুষ্ক স্থানে সংরক্ষণ করুন। ব্যবহারের পর বয়ামের ছিপি ভালোভাবে বন্ধ রাখুন।
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div className="space-y-4">
                  <h4 className="font-bold text-base text-[#244C32]">প্রাকৃতিক পুষ্টি উপাদানের বিবরণ:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {product.nutritionalHighlights.map((highlight, idx) => (
                      <div key={idx} className="bg-[#FAF8F0] p-3.5 rounded-2xl border border-gray-100 flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-[#244C32] text-xs sm:text-sm">{highlight}</span>
                          <p className="text-[11px] text-gray-500 mt-0.5">১০০% প্রাকৃতিক উপাদানে ভরপুর, কোনো কৃত্রিম প্রিজারভেটিভ নেই।</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'origin' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-base text-[#244C32]">উৎপাদন এলাকা ও কৃষক অংশীদারিত্ব:</h4>
                  <p>
                    এই পণ্যটি সরাসরি <strong>{product.sourceLocation}</strong> এলাকার চুক্তিভিত্তিক ক্ষুদ্র কৃষক, গাছি ও সনাতন কারিগরদের থেকে সংগৃহীত। কোনো মধ্যস্বত্বভোগী ছাড়া সঠিক মূল্যে পণ্য কিনে আমরা কৃষকের মুখে হাসি ফোটাতে ও আপনাকে আসল ভেজালহীন খাবার দিতে প্রতিশ্রুতিবদ্ধ।
                  </p>
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 text-xs text-emerald-900 font-medium">
                    ✓ কৃষককে ন্যায্যমূল্য প্রদান ও শতভাগ খাঁটি খাদ্য প্রক্রিয়াজাতকরণের নিশ্চয়তা।
                  </div>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-[#FAF8F0] p-4 rounded-2xl border border-gray-100">
                    <div className="text-center pr-4 border-r border-gray-200">
                      <div className="text-3xl font-black text-[#244C32]">{product.rating}</div>
                      <div className="flex text-[#E5B83F] justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <div className="text-[10px] text-gray-400 mt-1">{product.reviewCount} যাচাইকৃত রিভিউ</div>
                    </div>
                    <p className="text-xs text-gray-600">
                      আমাদের সকল রিভিউ সরাসরি গ্রামবাংলা থেকে ক্রয়কারী যাচাইকৃত গ্রাহকদের দ্বারা প্রদত্ত। পণ্য ডেলিভারির পর গ্রাহকের সন্তুষ্টি আমাদের শীর্ষ অগ্রাধিকার।
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-bold text-[#8B6E1A] bg-[#E5B83F]/20 px-3 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                  আপনার পছন্দের সাথে মানানসই
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#244C32]">
                  সম্পর্কিত আরও খাঁটি খাদ্যপণ্য
                </h3>
              </div>

              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold text-[#244C32] hover:text-[#8B6E1A] transition-colors"
              >
                <span>সব পণ্য দেখুন</span>
                <ChevronRight className="w-4 h-4 text-[#E5B83F]" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relProduct) => (
                <ProductCard key={relProduct.id} product={relProduct} />
              ))}
            </div>
          </section>
        )}

      </main>

      <Footer />
      <WhatsAppButton />
      <Toast />

      {/* Drawers & Modals (Cart, Wishlist, Checkout) */}
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

export default function ProductDetailClient(props: ProductDetailClientProps) {
  return (
    <CartProvider>
      <ProductDetailContent {...props} />
    </CartProvider>
  );
}
