'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { 
  Star, 
  Heart, 
  Eye, 
  ShoppingBag, 
  MapPin, 
  Check, 
  Sparkles,
  Zap
} from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setIsCheckoutOpen,
    cart
  } = useCart();

  const isFavorited = isInWishlist(product.id);
  const cartItem = cart.find(item => item.product.id === product.id);
  const inCartQuantity = cartItem ? cartItem.quantity : 0;

  const handleQuickBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, 1);
    setIsCheckoutOpen(true);
  };

  const savings = product.originalPrice ? product.originalPrice - product.price : 0;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 border border-[#244C32]/12 flex flex-col justify-between transform hover:-translate-y-1 relative">
      
      {/* Top Image Container */}
      <div className="relative h-60 sm:h-64 overflow-hidden bg-[#F5F2E9]">
        <Link href={`/details/${product.slug}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.nameBn}
            className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
          />

          {/* Soft Organic Shadow */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10 opacity-70 group-hover:opacity-50 transition-opacity"></div>
        </Link>

        {/* Badge - Top Left */}
        {product.badge && (
          <div className="absolute top-3 left-3 bg-[#E5B83F] text-[#244C32] text-[11px] font-black px-2.5 py-1 rounded-full shadow-md flex items-center gap-1 pointer-events-none">
            <Sparkles className="w-3 h-3" />
            <span>{product.badge}</span>
          </div>
        )}

        {/* Discount Savings Tag */}
        {savings > 0 && (
          <div className="absolute bottom-3 left-3 bg-[#244C32] text-[#FAF8F0] text-[11px] font-bold px-2 py-0.5 rounded-lg shadow-sm pointer-events-none">
            ৳{savings} সাশ্রয় ({product.discountPercent}%)
          </div>
        )}

        {/* Floating Actions - Top Right */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 shadow-md ${
              isFavorited
                ? 'bg-rose-500 text-white'
                : 'bg-white/90 text-gray-700 hover:text-rose-500 hover:bg-white'
            }`}
            title="পছন্দের তালিকায় রাখুন"
            aria-label="Wishlist"
          >
            <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
          </button>

          {/* Direct Link to Details (No Popup!) */}
          <Link
            href={`/details/${product.slug}`}
            className="w-9 h-9 rounded-full bg-white/90 text-gray-700 hover:text-[#244C32] hover:bg-white flex items-center justify-center transition-all duration-300 shadow-md opacity-90 group-hover:opacity-100"
            title="বিস্তারিত দেখুন"
            aria-label="View Details"
          >
            <Eye className="w-4 h-4" />
          </Link>
        </div>

        {/* Regional Origin Pill */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1 pointer-events-none">
          <MapPin className="w-3 h-3 text-[#E5B83F]" />
          <span>{product.sourceLocation}</span>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Rating & Packaging Unit */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1 text-xs">
              <Star className="w-3.5 h-3.5 fill-[#E5B83F] text-[#E5B83F]" />
              <span className="font-black text-[#244C32]">{product.rating}</span>
              <span className="text-gray-400">({product.reviewCount})</span>
            </div>
            <span className="text-[11px] font-bold text-[#8B6E1A] bg-[#E5B83F]/20 px-2.5 py-0.5 rounded-md">
              {product.unit}
            </span>
          </div>

          {/* Bengali Title linked to /details/[slug] */}
          <h3 className="font-extrabold text-base sm:text-lg text-[#244C32] hover:text-[#8B6E1A] transition-colors leading-snug line-clamp-2">
            <Link href={`/details/${product.slug}`}>
              {product.nameBn}
            </Link>
          </h3>

          <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1 font-medium">
            {product.nameEn}
          </p>

          <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
            {product.shortDescBn}
          </p>
        </div>

        {/* Pricing & Double Action (Add to cart & Direct Order) */}
        <div className="mt-5 pt-4 border-t border-gray-100 space-y-3">
          
          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-[#244C32]">
                ৳{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-[11px] text-emerald-800 font-bold bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
              স্টকে আছে
            </span>
          </div>

          {/* Action Buttons: Add to Cart & Quick Order */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => addToCart(product, 1)}
              className={`py-2.5 px-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-all duration-300 ${
                inCartQuantity > 0
                  ? 'bg-[#E5B83F] text-[#244C32] hover:bg-[#d4a82b]'
                  : 'bg-[#244C32]/10 hover:bg-[#244C32] text-[#244C32] hover:text-[#FAF8F0]'
              }`}
            >
              {inCartQuantity > 0 ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>কার্টে ({inCartQuantity})</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>কার্টে নিন</span>
                </>
              )}
            </button>

            <button
              onClick={handleQuickBuy}
              className="py-2.5 px-2 bg-[#244C32] hover:bg-[#1A3824] text-[#FAF8F0] rounded-xl text-xs font-bold flex items-center justify-center gap-1 shadow-sm transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-[#E5B83F] fill-[#E5B83F]" />
              <span>সরাসরি কিনুন</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
