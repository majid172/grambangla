'use client';

import React from 'react';
import {
  ShieldCheck,
  PackageCheck,
  Truck,
  Headphones,
  Leaf,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { TRUST_FEATURES } from '@/data/products';

export default function WhyChooseUs() {
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-7 h-7 text-[#244C32]" />,
    PackageCheck: <PackageCheck className="w-7 h-7 text-[#244C32]" />,
    Truck: <Truck className="w-7 h-7 text-[#244C32]" />,
    Headphones: <Headphones className="w-7 h-7 text-[#244C32]" />,
  };

  return (
    <section id="why-us" className="py-20 bg-[#F4F1E6] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#244C32] bg-[#244C32]/10 px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5B83F]" />
            <span>আমাদের প্রতিশ্রুতি</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#244C32] tracking-tight">
            কেন গ্রামবাংলাকে বেছে নেবেন?
          </h2>
          <p className="mt-3 text-base text-gray-700">
            আমরা শুধু খাদ্যপণ্য বিক্রি করি না, প্রতিটি পরিবারের কাছে পৌঁছে দিই বিশুদ্ধতা, নিরাপত্তা এবং বাংলার ঐতিহ্যের আসল স্বাদ।
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_FEATURES.map((feat, index) => (
            <div
              key={index}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#244C32]/10 group transform hover:-translate-y-1 relative overflow-hidden"
            >
              {/* Top Accent Strip */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#244C32] group-hover:bg-[#E5B83F] transition-colors duration-300"></div>

              {/* Icon Container */}
              <div className="w-14 h-14 rounded-2xl bg-[#E5B83F]/20 group-hover:bg-[#E5B83F] flex items-center justify-center mb-5 transition-all duration-300 shadow-inner">
                {iconMap[feat.iconName]}
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-[#244C32] mb-2 leading-tight">
                {feat.titleBn}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {feat.descBn}
              </p>

              {/* Subtle Verified Indicator */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-xs text-[#244C32] font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E5B83F]" />
                <span>যাচাইকৃত শতভাগ খাঁটি</span>
              </div>
            </div>
          ))}
        </div>

        {/* Honest Purity Notice */}
        <div className="mt-12 bg-[#244C32] text-[#FAF8F0] rounded-3xl p-6 sm:p-8 shadow-xl border border-[#E5B83F]/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#E5B83F] text-[#244C32] flex items-center justify-center shrink-0 font-bold">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-white">
                ন্যাচারাল ফুড সেফটি স্ট্যান্ডার্ড
              </h4>
              <p className="text-xs sm:text-sm text-gray-300 mt-0.5">
                আমরা কোনো কাল্পনিক সার্টিফিকেট প্রদর্শন করি না। আমাদের তেল, ঘি এবং মধু সরাসরি কৃষক ও নির্ভরযোগ্য স্থানীয় প্রস্তুতকারকদের থেকে পরীক্ষিত।
              </p>
            </div>
          </div>

          <a
            href="#shop"
            className="shrink-0 bg-[#E5B83F] hover:bg-[#d6a82e] text-[#244C32] font-bold px-6 py-3 rounded-2xl text-sm shadow-md transition-all duration-300 hover:scale-105"
          >
            খাঁটি পণ্য দেখুন
          </a>
        </div>

      </div>
    </section>
  );
}

