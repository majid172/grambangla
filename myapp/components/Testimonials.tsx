'use client';

import React from 'react';
import { DEMO_REVIEWS } from '@/data/products';
import { Star, Quote, CheckCircle, Sparkles } from 'lucide-react';

export default function Testimonials() {
  return (
    <section id="reviews" className="py-20 bg-[#FAF8F0] border-t border-[#244C32]/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#244C32] bg-[#244C32]/10 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5B83F]" />
            <span>গ্রাহক সন্তুষ্টি</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#244C32] tracking-tight">
            গ্রাহকদের মিষ্টি অভিজ্ঞতা
          </h2>
          <p className="mt-2 text-base text-gray-600">
            হাজারো পরিবার প্রতিদিন আমাদের বিশুদ্ধ খাদ্যের স্বাদে তৃপ্ত
          </p>
          <div className="mt-3 inline-block bg-[#E5B83F]/20 text-[#244C32] text-xs font-semibold px-3 py-1 rounded-full border border-[#E5B83F]/30">
            ℹ️ নমুনা গ্রাহক রিভিউ (ডেমো কন্টেন্ট হিসেবে সংরক্ষিত)
          </div>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DEMO_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#244C32]/10 flex flex-col justify-between relative group transform hover:-translate-y-1"
            >
              {/* Top Quote Icon */}
              <div className="absolute top-4 right-4 text-[#E5B83F]/20 group-hover:text-[#E5B83F]/40 transition-colors">
                <Quote className="w-10 h-10 transform rotate-180" />
              </div>

              <div>
                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#E5B83F] text-[#E5B83F]" />
                  ))}
                </div>

                {/* Comment */}
                <p className="text-sm text-gray-700 leading-relaxed italic relative z-10">
                  "{rev.commentBn}"
                </p>
              </div>

              {/* Reviewer Meta */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.nameBn}
                  className="w-11 h-11 rounded-full object-cover border-2 border-[#244C32]/20"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1">
                    <h4 className="font-bold text-xs sm:text-sm text-[#244C32] truncate">
                      {rev.nameBn}
                    </h4>
                    {rev.verifiedBuyer && (
                      <span title="ভেরিফায়েড ক্রেতা">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      </span>
                    )}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {rev.locationBn}
                  </div>
                  <div className="text-[10px] text-[#8B6E1A] font-medium truncate mt-0.5">
                    ক্রয়কৃত: {rev.purchasedProduct}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
