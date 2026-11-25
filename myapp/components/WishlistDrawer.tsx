'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

export default function WishlistDrawer() {
  const { 
    wishlist, 
    isWishlistOpen, 
    setIsWishlistOpen, 
    toggleWishlist, 
    addToCart 
  } = useCart();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#244C32]/20">
          
          {/* Header */}
          <div className="p-5 bg-[#FAF8F0] border-b border-[#244C32]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
                <Heart className="w-5 h-5 fill-current" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#244C32]">পছন্দের তালিকা</h3>
                <span className="text-xs text-gray-500 font-medium">({wishlist.length} টি সংরক্ষিত)</span>
              </div>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 transition-colors"
              aria-label="Close Wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlist.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-300">
                  <Heart className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-[#244C32] text-lg">পছন্দের তালিকা খালি</h4>
                <p className="text-xs text-gray-500 max-w-xs">
                  পছন্দের পণ্যের হার্ট আইকনে ক্লিক করে পরবর্তীতে কেনার জন্য সংরক্ষণ করে রাখুন।
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 bg-[#244C32] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-[#1A3824]"
                >
                  পণ্য ব্রাউজ করুন
                </button>
              </div>
            ) : (
              wishlist.map((product) => (
                <div
                  key={product.id}
                  className="flex gap-3 bg-[#FAF8F0] p-3 rounded-2xl border border-gray-100 hover:border-[#244C32]/20 transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.nameBn}
                    className="w-20 h-20 rounded-xl object-cover border border-gray-200 bg-white shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-xs sm:text-sm text-[#244C32] truncate">
                          {product.nameBn}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(product)}
                          className="text-gray-400 hover:text-rose-500 transition-colors p-0.5"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-gray-500 block">
                        {product.unit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm font-black text-[#244C32]">
                        ৳{product.price}
                      </span>

                      <button
                        onClick={() => {
                          addToCart(product, 1);
                          toggleWishlist(product);
                        }}
                        className="bg-[#244C32] hover:bg-[#1A3824] text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1 shadow-sm"
                      >
                        <ShoppingBag className="w-3.5 h-3.5 text-[#E5B83F]" />
                        <span>কার্টে নিন</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlist.length > 0 && (
            <div className="p-4 bg-white border-t border-gray-200">
              <button
                onClick={() => {
                  wishlist.forEach((p) => addToCart(p, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full bg-[#244C32] text-white py-3 rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md"
              >
                <span>সব পণ্য কার্টে যোগ করুন</span>
                <ArrowRight className="w-4 h-4 text-[#E5B83F]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
