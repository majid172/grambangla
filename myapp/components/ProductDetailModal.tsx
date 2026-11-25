'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { 
  X, 
  Star, 
  ShoppingBag, 
  Check, 
  ShieldCheck, 
  Truck, 
  MapPin, 
  Plus, 
  Minus,
  Sparkles,
  Heart,
  FileText,
  Activity,
  UserCheck
} from 'lucide-react';

export default function ProductDetailModal() {
  const { 
    selectedDetailProduct, 
    setSelectedDetailProduct, 
    addToCart, 
    setIsCheckoutOpen,
    toggleWishlist,
    isInWishlist
  } = useCart();

  const [activeTab, setActiveTab] = useState<'desc' | 'nutrition' | 'origin'>('desc');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!selectedDetailProduct) return null;

  const product = selectedDetailProduct;
  const isFavorited = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setSelectedDetailProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#244C32]/20">
        
        {/* Sticky Close Button */}
        <button
          onClick={() => setSelectedDetailProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Overview Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 p-6 sm:p-10 border-b border-gray-100">
          
          {/* Gallery - 5 cols */}
          <div className="md:col-span-5 space-y-4">
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden shadow-sm bg-gray-50 border border-gray-100">
              <img
                src={product.gallery[activeImageIdx] || product.image}
                alt={product.nameBn}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#E5B83F] text-[#244C32] text-xs font-black px-3 py-1 rounded-full shadow">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {product.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIdx(idx)}
                  className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                    activeImageIdx === idx ? 'border-[#244C32] scale-105' : 'border-gray-200 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info - 7 cols */}
          <div className="md:col-span-7 flex flex-col justify-between space-y-6">
            <div>
              {/* Origin & Rating */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 text-xs text-[#8B6E1A] bg-[#E5B83F]/20 px-3 py-1 rounded-full font-bold">
                  <MapPin className="w-3.5 h-3.5" />
                  উৎস: {product.sourceLocation}
                </span>

                <div className="flex items-center gap-1 text-xs">
                  <div className="flex text-[#E5B83F]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-[#244C32]">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} যাচাইকৃত রিভিউ)</span>
                </div>
              </div>

              {/* Title & English Subtitle */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#244C32] leading-tight">
                {product.nameBn}
              </h1>
              <p className="text-xs sm:text-sm text-gray-500 mt-1 font-medium">
                {product.nameEn} • {product.unit}
              </p>

              {/* Pricing */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-black text-[#244C32]">
                  ৳{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-base text-gray-400 line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="bg-[#244C32] text-[#FAF8F0] text-xs font-bold px-2.5 py-1 rounded-lg">
                    {product.discountPercent}% ছাড়
                  </span>
                )}
              </div>

              {/* Short Desc */}
              <p className="mt-4 text-sm text-gray-700 leading-relaxed">
                {product.shortDescBn}
              </p>

              {/* Quick Trust Checklist */}
              <div className="mt-5 grid grid-cols-2 gap-2 text-xs text-gray-700">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>১০০% রাসায়নিক ও প্রিজারভেটিভ মুক্ত</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-emerald-600" />
                  <span>ক্যাশ অন ডেলিভারি সুবিধা</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-6 border-t border-gray-100 space-y-4">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-700">পরিমাণ:</span>
                <div className="flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2.5 hover:bg-gray-100 transition-colors text-gray-600"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-5 text-sm font-bold text-[#244C32]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2.5 hover:bg-gray-100 transition-colors text-gray-600"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isFavorited ? 'border-rose-300 text-rose-500 bg-rose-50' : 'border-gray-200 text-gray-400 hover:text-rose-500'
                  }`}
                  title="পছন্দের তালিকা"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    setSelectedDetailProduct(null);
                  }}
                  className="w-full bg-[#FAF8F0] hover:bg-[#244C32]/10 text-[#244C32] border-2 border-[#244C32]/30 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>কার্টে যুক্ত করুন</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#244C32] hover:bg-[#1A3824] text-[#FAF8F0] py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#E5B83F]" />
                  <span>সরাসরি অর্ডার করুন</span>
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Tabs Section */}
        <div className="p-6 sm:p-10 bg-[#FAF8F0]">
          {/* Tabs */}
          <div className="flex border-b border-gray-200 gap-4 sm:gap-8 mb-6">
            <button
              onClick={() => setActiveTab('desc')}
              className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'desc'
                  ? 'border-[#244C32] text-[#244C32]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>বিস্তারিত বিবরণ</span>
            </button>

            <button
              onClick={() => setActiveTab('nutrition')}
              className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'nutrition'
                  ? 'border-[#244C32] text-[#244C32]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>পুষ্টিগুণ ও উপকারিতা</span>
            </button>

            <button
              onClick={() => setActiveTab('origin')}
              className={`pb-3 text-sm font-bold flex items-center gap-2 border-b-2 transition-all ${
                activeTab === 'origin'
                  ? 'border-[#244C32] text-[#244C32]'
                  : 'border-transparent text-gray-500 hover:text-gray-800'
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>কৃষকের তথ্য ও উৎস</span>
            </button>
          </div>

          {/* Tab Content */}
          <div className="bg-white p-6 rounded-2xl border border-[#244C32]/10 shadow-sm text-sm text-gray-700 leading-relaxed">
            {activeTab === 'desc' && (
              <div className="space-y-4">
                <p>{product.fullDescBn}</p>
                <div className="p-4 bg-[#FAF8F0] rounded-xl border border-[#244C32]/10">
                  <h4 className="font-bold text-[#244C32] mb-1">ব্যবহারের সেরা উপায়:</h4>
                  <p className="text-xs text-gray-600">
                    দৈনন্দিন রান্না, ভর্তা বা ভাজিতে আসল ঝাঁঝ ও সুঘ্রাণ পেতে রান্নার শেষভাগে বা সরাসরি গরম খাবারে পরিবেশন করুন। আলো ও তাপ থেকে দূরে শীতল স্থানে সংরক্ষণ করুন।
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'nutrition' && (
              <div className="space-y-4">
                <h4 className="font-bold text-[#244C32]">প্রাকৃতিক পুষ্টি উপাদানের হাইলাইটস:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.nutritionalHighlights.map((item, i) => (
                    <div key={i} className="flex items-start gap-2 bg-[#FAF8F0] p-3 rounded-xl border border-gray-100">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="font-medium text-xs sm:text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'origin' && (
              <div className="space-y-3">
                <h4 className="font-bold text-[#244C32]">উৎপাদন এলাকা ও কৃষক অংশীদারিত্ব:</h4>
                <p>
                  এই পণ্যটি সরাসরি <strong>{product.sourceLocation}</strong> এলাকার চুক্তিভিত্তিক ক্ষুদ্র কৃষক ও সনাতন কারিগরদের থেকে সংগৃহীত। কোনো মধ্যস্বত্বভোগী ছাড়া সঠিক মূল্যে পণ্য কিনে আমরা কৃষকের মুখে হাসি ফোটাতে ও আপনাকে আসল ভেজালহীন খাবার দিতে প্রতিশ্রুতিবদ্ধ।
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
