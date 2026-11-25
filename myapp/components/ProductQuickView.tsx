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
  Heart
} from 'lucide-react';

export default function ProductQuickView() {
  const { 
    selectedQuickViewProduct, 
    setSelectedQuickViewProduct, 
    addToCart, 
    setIsCheckoutOpen,
    toggleWishlist,
    isInWishlist
  } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  if (!selectedQuickViewProduct) return null;

  const product = selectedQuickViewProduct;
  const isFavorited = isInWishlist(product.id);

  const handleBuyNow = () => {
    addToCart(product, quantity);
    setSelectedQuickViewProduct(null);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-[#244C32]/20 overflow-hidden">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-700 shadow-md flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Gallery */}
          <div className="p-6 bg-[#FAF8F0] flex flex-col justify-between">
            <div className="relative h-72 sm:h-84 rounded-2xl overflow-hidden shadow-inner bg-white">
              <img
                src={product.gallery[activeImageIdx] || product.image}
                alt={product.nameBn}
                className="w-full h-full object-cover"
              />
              {product.badge && (
                <span className="absolute top-3 left-3 bg-[#E5B83F] text-[#244C32] text-xs font-black px-2.5 py-1 rounded-full shadow">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnail selector */}
            {product.gallery.length > 1 && (
              <div className="flex items-center gap-2 mt-4 overflow-x-auto pb-1">
                {product.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImageIdx === idx ? 'border-[#244C32] scale-105' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Product Details */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
            <div>
              {/* Rating & Origin */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex items-center text-[#E5B83F]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="font-bold text-[#244C32]">{product.rating}</span>
                  <span className="text-gray-400">({product.reviewCount} রিভিউ)</span>
                </div>

                <div className="flex items-center gap-1 text-xs text-[#8B6E1A] bg-[#E5B83F]/20 px-2 py-0.5 rounded-full font-medium">
                  <MapPin className="w-3 h-3" />
                  <span>{product.sourceLocation}</span>
                </div>
              </div>

              {/* Title & Unit */}
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#244C32] leading-tight">
                {product.nameBn}
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {product.nameEn} • {product.unit}
              </p>

              {/* Pricing */}
              <div className="mt-4 flex items-baseline gap-3">
                <span className="text-3xl font-black text-[#244C32]">
                  ৳{product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ৳{product.originalPrice}
                  </span>
                )}
                {product.discountPercent && (
                  <span className="bg-[#244C32] text-[#FAF8F0] text-xs font-bold px-2 py-0.5 rounded-lg">
                    {product.discountPercent}% ছাড়
                  </span>
                )}
              </div>

              {/* Short Description */}
              <p className="mt-4 text-xs sm:text-sm text-gray-600 leading-relaxed">
                {product.shortDescBn}
              </p>

              {/* Highlights */}
              <div className="mt-4 space-y-1.5 bg-[#FAF8F0] p-3 rounded-2xl border border-[#244C32]/10 text-xs">
                {product.nutritionalHighlights.slice(0, 3).map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity & Actions */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-700">পরিমাণ:</span>
                <div className="flex items-center border border-gray-300 rounded-xl bg-white overflow-hidden shadow-sm">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-gray-100 transition-colors text-gray-600"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="px-4 text-sm font-bold text-[#244C32]">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-gray-100 transition-colors text-gray-600"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2.5 rounded-xl border transition-colors ${
                    isFavorited ? 'border-rose-300 text-rose-500 bg-rose-50' : 'border-gray-200 text-gray-400 hover:text-rose-500'
                  }`}
                  title="পছন্দের তালিকা"
                  aria-label="Wishlist"
                >
                  <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    addToCart(product, quantity);
                    setSelectedQuickViewProduct(null);
                  }}
                  className="w-full bg-[#FAF8F0] hover:bg-[#244C32]/10 text-[#244C32] border border-[#244C32]/30 py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4 text-[#244C32]" />
                  <span>কার্টে যুক্ত করুন</span>
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full bg-[#244C32] hover:bg-[#1A3824] text-[#FAF8F0] py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-1.5 shadow-md transition-colors"
                >
                  <Sparkles className="w-4 h-4 text-[#E5B83F]" />
                  <span>এখনই অর্ডার করুন</span>
                </button>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
