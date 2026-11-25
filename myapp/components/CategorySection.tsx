'use client';

import React from 'react';
import { CATEGORIES } from '@/data/products';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface CategorySectionProps {
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string;
}

export default function CategorySection({ onSelectCategory, activeCategory }: CategorySectionProps) {
  return (
    <section id="categories" className="py-16 bg-[#FAF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#244C32] bg-[#244C32]/10 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5B83F]" />
            <span>আমাদের সমাহার</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#244C32] tracking-tight">
            জনপ্রিয় পণ্যের ক্যাটাগরি
          </h2>
          <p className="mt-3 text-base text-gray-600">
            বাংলার বিভিন্ন অঞ্চলের সুপরিচিত ও সেরা প্রাকৃতিক খাদ্যসামগ্রী সরাসরি আপনার দোরগোড়ায়
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {CATEGORIES.map((cat) => {
            const isSelected = activeCategory === cat.slug;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.slug);
                  // Smooth scroll to shop
                  const el = document.getElementById('shop');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`group cursor-pointer rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-1.5 ${
                  isSelected
                    ? 'ring-2 ring-[#244C32] shadow-xl bg-white scale-[1.02]'
                    : 'bg-white shadow-sm hover:shadow-xl border border-[#244C32]/10'
                }`}
              >
                {/* Image Container */}
                <div className="relative h-36 sm:h-44 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.nameBn}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                  
                  {/* Badge */}
                  <span className="absolute top-2.5 right-2.5 bg-white/90 text-[#244C32] text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
                    {cat.itemCount}+ পণ্য
                  </span>

                  {/* Corner Arrow Icon */}
                  <div className="absolute bottom-2.5 right-2.5 w-6 h-6 rounded-full bg-[#E5B83F] text-[#244C32] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-3 text-center">
                  <h3 className="font-bold text-sm sm:text-base text-[#244C32] group-hover:text-[#8B6E1A] transition-colors leading-snug">
                    {cat.nameBn}
                  </h3>
                  <p className="text-[11px] text-gray-500 mt-0.5 line-clamp-1">
                    {cat.tagline}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
