'use client';

import React from 'react';
import { ShoppingBag, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function PromoBanner() {
  const { applyCoupon } = useCart();

  return (
    <section className="py-12 bg-[#FAF8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-r from-[#244C32] via-[#1A3824] to-[#2E5F3F] text-white p-8 sm:p-12 border-2 border-[#E5B83F]/40">

          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#E5B83F_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none"></div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

            {/* Left Texts */}
            <div className="lg:col-span-8 space-y-4 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-[#E5B83F] text-[#244C32] px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>সীমিত সময়ের স্পেশাল অফার</span>
              </div>

              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FAF8F0] tracking-tight leading-snug">
                "বাংলার আসল স্বাদ এখন আপনার ঘরে"
              </h2>

              <p className="text-sm sm:text-base text-gray-200 max-w-2xl">
                প্রথম অর্ডারে পান আকর্ষণীয় ১০% ছাড়! ঐতিহ্যবাহী কাঠের ঘানিভাঙা সরিষার তেল ও পাবনার গাওয়া ঘিয়ে সাজিয়ে নিন আপনার রান্নাঘর।
              </p>

              {/* Coupon Copy Pill */}
              <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
                <div className="inline-flex items-center gap-2 bg-black/30 border border-[#E5B83F]/40 px-3.5 py-2 rounded-xl text-xs sm:text-sm">
                  <Tag className="w-4 h-4 text-[#E5B83F]" />
                  <span>কুপন কোড:</span>
                  <code className="font-mono font-bold text-[#E5B83F] bg-white/10 px-2 py-0.5 rounded">
                    Shikor10
                  </code>
                </div>

                <button
                  onClick={() => applyCoupon('Shikor10')}
                  className="text-xs bg-[#E5B83F]/20 hover:bg-[#E5B83F] text-[#FAF8F0] hover:text-[#244C32] font-semibold px-3 py-2 rounded-xl transition-colors border border-[#E5B83F]/40"
                >
                  কুপন প্রয়োগ করুন
                </button>
              </div>
            </div>

            {/* Right CTA */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <a
                href="#shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#E5B83F] hover:bg-[#d6a82e] text-[#244C32] px-8 py-4 rounded-2xl font-black text-base shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                <ShoppingBag className="w-5 h-5" />
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <span className="text-xs text-gray-300 mt-2 font-medium">
                *৳২,০০০ এর অর্ডারে সারা দেশে ডেলিভারি ফ্রি
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
