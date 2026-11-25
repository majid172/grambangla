'use client';

import React, { useState, useMemo } from 'react';
import { PRODUCTS } from '@/data/products';
import ProductCard from './ProductCard';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  PhoneCall
} from 'lucide-react';

interface FeaturedProductsProps {
  selectedCategory: string;
  onSelectCategory: (categorySlug: string) => void;
}

export default function FeaturedProducts({ selectedCategory, onSelectCategory }: FeaturedProductsProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const filterTabs = [
    { label: 'সব পণ্য (All)', slug: 'all' },
    { label: 'সরিষার তেল', slug: 'mustard-oil' },
    { label: 'গাওয়া ঘি', slug: 'ghee' },
    { label: 'খেজুরের গুড়', slug: 'gur' },
    { label: 'প্রাকৃতিক মধু', slug: 'honey' },
    { label: 'সুগন্ধি চাল', slug: 'rice' },
    { label: 'পাহাড়ি মসলা', slug: 'spices' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q ||
        product.nameBn.toLowerCase().includes(q) ||
        product.nameEn.toLowerCase().includes(q) ||
        product.shortDescBn.toLowerCase().includes(q) ||
        product.sourceLocation.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
    });
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="shop" className="py-20 bg-[#FAF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Heading & Support Callout */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#244C32] bg-[#244C32]/10 px-3.5 py-1 rounded-full mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#E5B83F]" />
              <span>আমাদের অর্গানিক স্টোর</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#244C32] tracking-tight">
              শতভাগ বিশুদ্ধ খাদ্য পণ্যের সমাহার
            </h2>
            <p className="mt-2 text-base text-gray-600 max-w-xl">
              কাঠের ঘানিভাঙা তেল, পাবনার খাঁটি গাওয়া ঘি, যশোরের পাটালি গুড় ও সুন্দরবনের আনপ্রসেসড মধুর আসল স্বাদ উপভোগ করুন।
            </p>
          </div>

          {/* Quick Hotline Pill */}
          <div className="bg-white p-3.5 rounded-2xl border border-[#244C32]/10 shadow-xs flex items-center gap-3 self-start md:self-auto">
            <div className="w-10 h-10 rounded-xl bg-[#244C32] text-[#E5B83F] flex items-center justify-center font-bold">
              <PhoneCall className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[11px] text-gray-500 font-medium">যেকোনো প্রশ্ন বা ফোনে অর্ডারে:</div>
              <a href="tel:+8801312617206" className="text-sm font-extrabold text-[#244C32] hover:text-[#8B6E1A]">
                01312617206 (হটলাইন)
              </a>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-xs border border-[#244C32]/10 mb-8 space-y-4">

          {/* Top Row: Search & Sort */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

            {/* Search Input */}
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="পণ্য বা জেলার নাম লিখুন (যেমন: তেল, পাবনা, গুড়)..."
                className="w-full bg-[#FAF8F0] border border-gray-200 rounded-2xl pl-10 pr-9 py-2.5 text-xs sm:text-sm text-[#252B25] focus:outline-none focus:border-[#244C32]"
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

            {/* Sorting Dropdown */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <div className="flex items-center gap-1.5 text-xs font-bold text-gray-600">
                <SlidersHorizontal className="w-4 h-4 text-[#244C32]" />
                <span>সাজান:</span>
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="সাজানোর ক্রম নির্বাচন করুন"
                className="bg-[#FAF8F0] border border-gray-200 text-[#244C32] text-xs sm:text-sm rounded-xl px-3 py-2 font-bold focus:outline-none focus:border-[#244C32]"
              >
                <option value="featured">ফিচার্ড ও সেরা বিক্রয়</option>
                <option value="price-low">মূল্য: কম থেকে বেশি</option>
                <option value="price-high">মূল্য: বেশি থেকে কম</option>
                <option value="rating">সর্বোচ্চ রেটিং</option>
              </select>
            </div>
          </div>

          {/* Bottom Row: Category Pill Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none pt-2 border-t border-gray-100">
            {filterTabs.map((tab) => {
              const active = selectedCategory === tab.slug;
              return (
                <button
                  key={tab.slug}
                  onClick={() => onSelectCategory(tab.slug)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-300 ${active
                    ? 'bg-[#244C32] text-[#FAF8F0] shadow-md scale-102'
                    : 'bg-[#FAF8F0] hover:bg-[#244C32]/10 text-gray-700'
                    }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center max-w-md mx-auto border border-gray-200 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#FAF8F0] flex items-center justify-center mx-auto mb-4 text-gray-400">
              <Search className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#244C32]">কোন খাদ্যপণ্য পাওয়া যায়নি</h3>
            <p className="text-xs text-gray-500 mt-1 mb-6">
              আপনার অনুসন্ধানের সাথে মিলে এমন কোনো পণ্য মেলেনি।
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="bg-[#244C32] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-[#1A3824]"
            >
              সব পণ্য রিসেট করুন
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
