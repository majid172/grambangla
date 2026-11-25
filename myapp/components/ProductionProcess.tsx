'use client';

import React from 'react';
import { Sprout, Hammer, Filter, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';

export default function ProductionProcess() {
  const steps = [
    {
      stepNumber: '০১',
      title: 'মাঠ থেকে সরাসরি বাছাই',
      subtitle: 'বিশ্বস্ত কৃষকের হাত থেকে সংগ্রহ',
      desc: 'সিরাজগঞ্জের মাঘী সরিষা, পাবনার চারণভূমির গাভীর দুধ আর সুন্দরবনের বুনো মৌচাক—আমরা মধ্যস্বত্বভোগী ছাড়া সরাসরি তৃণমূল থেকে সেরা কাঁচামাল সংগ্রহ করি।',
      icon: <Sprout className="w-6 h-6 text-[#244C32]" />,
      badge: 'তাজা ও ভেজালহীন'
    },
    {
      stepNumber: '০২',
      title: 'ঐতিহ্যবাহী কাঠের ঘানি',
      subtitle: 'সনাতন কোল্ড-প্রেস পদ্ধতি',
      desc: 'আধুনিক স্টিল মেশিনের অতিরিক্ত তাপে তেলের প্রাকৃতিক পুষ্টি নষ্ট হয়ে যায়। তাই আমরা ব্যবহার করি ধীরগতির সনাতন কাঠের ঘানি, যাতে আসল ঝাঁঝ ও ভিটামিন অটুট থাকে।',
      icon: <Hammer className="w-6 h-6 text-[#244C32]" />,
      badge: 'জিরো কেমিক্যাল'
    },
    {
      stepNumber: '০৩',
      title: 'মাটির হাঁড়িতে মৃদু আঁচে জ্বাল',
      subtitle: 'খাঁটি গাওয়া ঘির সোনালী দানা',
      desc: 'দুধের সর থেকে সনাতন বিলোড়ন পদ্ধতিতে মাখন তোলা হয়। সেই মাখন মাটির পাত্রে মৃদু তাপে জ্বাল দিয়ে তৈরি হয় মন মাতানো সুবাস ও অপূর্ব দানাদার খাঁটি গাওয়া ঘি।',
      icon: <Filter className="w-6 h-6 text-[#244C32]" />,
      badge: 'শতভাগ ন্যাচারাল'
    },
    {
      stepNumber: '০৪',
      title: 'ফুডগ্রেড কাঁচের বয়ামে সিল',
      subtitle: 'সুরক্ষিত হোম ডেলিভারি',
      desc: 'ক্ষতিকর প্লাস্টিক সম্পূর্ণ বর্জন করে খাদ্যমান অক্ষুণ্ণ রাখতে ফুডগ্রেড কাঁচের জার ও সুরক্ষিত কাঠের ছিপিতে সিল করে সরাসরি আপনার রান্নাঘরে পৌঁছে দিই।',
      icon: <ShieldCheck className="w-6 h-6 text-[#244C32]" />,
      badge: 'হাই-গ্রেড প্যাকেজিং'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-[#FAF8F0] via-[#F5F1E4] to-[#FAF8F0] border-y border-[#244C32]/10 relative overflow-hidden">
      {/* Decorative Rural Silhouette Accents */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-[#244C32]/10 text-[#244C32] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#E5B83F]" />
            <span>আমাদের সনাতন ঐতিহ্য ও সততা</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#244C32] tracking-tight">
            কীভাবে তৈরি হয় গ্রামবাংলার খাঁটি খাবার?
          </h2>
          <p className="mt-3 text-base text-gray-700 leading-relaxed font-normal">
            আমরা কারখানার কৃত্রিম উপায়ে তৈরি কোনো পণ্য দিই না। প্রাচীন বাংলার ঐতিহ্য, সততা এবং সম্পূর্ণ প্রাকৃতিক নিয়মে প্রস্তুত প্রতিটি ফোঁটা তেল ও দানা ঘি।
          </p>
        </div>

        {/* 4 Steps Timeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((item, index) => (
            <div
              key={index}
              className="bg-white/90 backdrop-blur-sm rounded-3xl p-6 sm:p-7 shadow-sm hover:shadow-xl transition-all duration-300 border border-[#244C32]/10 flex flex-col justify-between group transform hover:-translate-y-1 relative"
            >
              {/* Step Number Watermark */}
              <div className="absolute top-4 right-5 text-4xl font-black text-[#244C32]/10 font-mono select-none">
                {item.stepNumber}
              </div>

              <div>
                {/* Icon Circle */}
                <div className="w-13 h-13 rounded-2xl bg-[#E5B83F]/25 group-hover:bg-[#E5B83F] flex items-center justify-center mb-5 transition-colors shadow-inner">
                  {item.icon}
                </div>

                <span className="text-[11px] font-bold text-[#8B6E1A] bg-[#E5B83F]/20 px-2.5 py-0.5 rounded-md inline-block mb-2">
                  {item.badge}
                </span>

                <h3 className="text-lg font-bold text-[#244C32] leading-tight mb-1">
                  {item.title}
                </h3>
                <p className="text-xs font-semibold text-gray-500 mb-3">
                  {item.subtitle}
                </p>

                <p className="text-xs text-gray-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-gray-100 flex items-center gap-1.5 text-[11px] text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>যাচাইকৃত প্রাকৃতিক নিয়ম</span>
              </div>
            </div>
          ))}
        </div>

        {/* Purity Guarantee Callout Banner */}
        <div className="mt-14 bg-[#244C32] text-white rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-[#E5B83F]/30 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#E5B83F] text-[#244C32] flex items-center justify-center shrink-0 font-extrabold text-2xl shadow-md">
              ১০×
            </div>
            <div>
              <h4 className="text-lg sm:text-xl font-extrabold text-[#FAF8F0]">
                ভেজাল প্রমাণে ১০ গুণ মূল্য ফেরত গ্যারান্টি!
              </h4>
              <p className="text-xs sm:text-sm text-gray-200 mt-0.5">
                আমাদের সরিষার তেল, ঘি বা মধুতে কোনো প্রকার ভেজাল বা রাসায়নিক প্রমাণিত হলে তৎক্ষণাৎ সম্পূর্ণ মূল্য ফেরত দেওয়া হবে।
              </p>
            </div>
          </div>

          <a
            href="tel:+8801700123456"
            className="shrink-0 bg-[#E5B83F] hover:bg-[#d6a82e] text-[#244C32] px-6 py-3.5 rounded-2xl font-black text-sm shadow-lg transition-transform hover:scale-105"
          >
            সরাসরি ম্যানেজারের সাথে কথা বলুন
          </a>
        </div>

      </div>
    </section>
  );
}
