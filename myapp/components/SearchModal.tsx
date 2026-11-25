'use client';

import React, { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { PRODUCTS } from '@/data/products';
import { Product } from '@/types';
import { Search, X, ShoppingBag, ArrowRight, Star, MapPin } from 'lucide-react';

export default function SearchModal() {
  const { 
    isSearchOpen, 
    setIsSearchOpen, 
    addToCart, 
    setSelectedDetailProduct 
  } = useCart();

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);

  const suggestions = [
    'সরিষার তেল',
    'গাওয়া ঘি',
    'সুন্দরবনের মধু',
    'কালোজিরা চাল',
    'মসুর ডাল',
    'নারিকেল তেল'
  ];

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const q = query.toLowerCase().trim();
    const matched = PRODUCTS.filter((p) =>
      p.nameBn.toLowerCase().includes(q) ||
      p.nameEn.toLowerCase().includes(q) ||
      p.categoryNameBn.toLowerCase().includes(q) ||
      p.sourceLocation.toLowerCase().includes(q) ||
      p.shortDescBn.toLowerCase().includes(q)
    );
    setResults(matched);
  }, [query]);

  if (!isSearchOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 p-4 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-[#244C32]/20 overflow-hidden">
        
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3 bg-[#FAF8F0]">
          <Search className="w-5 h-5 text-[#244C32] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="পণ্য বা অঞ্চলের নাম লিখুন (যেমন: তেল, ঘি, মধু, পাবনা)..."
            className="w-full text-base sm:text-lg bg-transparent border-none focus:outline-none text-[#244C32] font-semibold placeholder-gray-400"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-5 h-5" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="bg-gray-200 text-gray-700 hover:bg-gray-300 px-3 py-1.5 rounded-xl text-xs font-bold transition-colors shrink-0"
          >
            বন্ধ করুন
          </button>
        </div>

        {/* Suggestion Pills */}
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-100 flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-gray-400 font-medium shrink-0">পরামর্শ:</span>
          {suggestions.map((sug, i) => (
            <button
              key={i}
              onClick={() => setQuery(sug)}
              className="bg-white hover:bg-[#244C32] hover:text-white text-[#244C32] border border-gray-200 px-3 py-1 rounded-full font-semibold transition-colors shrink-0 shadow-2xs"
            >
              {sug}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="max-h-96 overflow-y-auto p-4 sm:p-5 space-y-3">
          {query.trim() === '' ? (
            <div className="text-center py-8 text-gray-400 text-xs sm:text-sm">
              আপনার পছন্দের পণ্য বা খাঁটি উপাদান খুঁজে পেতে উপরে টাইপ করুন।
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-8 text-gray-500 text-sm">
              দুঃখিত! "{query}" দিয়ে কোনো পণ্য পাওয়া যায়নি।
            </div>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                onClick={() => {
                  setSelectedDetailProduct(product);
                  setIsSearchOpen(false);
                }}
                className="group flex items-center justify-between gap-4 p-3 rounded-2xl hover:bg-[#FAF8F0] border border-transparent hover:border-[#244C32]/10 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.image}
                    alt={product.nameBn}
                    className="w-14 h-14 rounded-xl object-cover border border-gray-200 shrink-0"
                  />
                  <div className="min-w-0">
                    <h4 className="font-bold text-sm text-[#244C32] group-hover:text-[#8B6E1A] truncate">
                      {product.nameBn}
                    </h4>
                    <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                      <span className="flex items-center gap-0.5 text-[#8B6E1A]">
                        <MapPin className="w-3 h-3" /> {product.sourceLocation}
                      </span>
                      <span>•</span>
                      <span>{product.unit}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <div className="font-black text-sm text-[#244C32]">৳{product.price}</div>
                    {product.originalPrice && (
                      <div className="text-[10px] text-gray-400 line-through">৳{product.originalPrice}</div>
                    )}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(product, 1);
                    }}
                    className="p-2.5 rounded-xl bg-[#244C32] text-white hover:bg-[#1A3824] transition-colors"
                    title="কার্টে যুক্ত করুন"
                  >
                    <ShoppingBag className="w-4 h-4 text-[#E5B83F]" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

      </div>
    </div>
  );
}
