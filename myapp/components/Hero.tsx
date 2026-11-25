'use client';

import React from 'react';
import {
  ShoppingBag,
  ArrowRight,
  PhoneCall,
  Sparkles,
  CheckCircle,
  Leaf,
  Clock,
  ShieldAlert
} from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAF8F0] via-[#FAF7EE] to-[#F3EEE0] pt-6 pb-16 lg:pt-14 lg:pb-24 border-b border-[#244C32]/10">

      {/* Subtle Warm Decorative Sunlight Radial */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E5B83F]/15 rounded-full blur-3xl pointer-events-none -mr-32 -mt-32"></div>
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#244C32]/8 rounded-full blur-3xl pointer-events-none -ml-32 -mb-32"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column - Copy & Trust Elements */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">

            {/* Fresh Batch Ticker Badge */}
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2 bg-[#244C32]/10 border border-[#244C32]/20 text-[#244C32] px-4 py-2 rounded-full text-xs sm:text-sm font-bold shadow-xs">
              <span className="flex items-center gap-1.5 text-emerald-800">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                আজকের তাজা ব্যাচ প্রস্তুত
              </span>
              <span className="text-[#8B6E1A]">•</span>
              <span className="text-[#8B6E1A] font-semibold">সিরাজগঞ্জের কাঠের ঘানি ও পাবনার ঘি</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#244C32] tracking-tight leading-[1.25]">
              প্রকৃতির বিশুদ্ধতা, <br className="hidden sm:inline" />
              <span className="relative inline-block text-[#252B25] mt-1">
                আপনার পরিবারের জন্য
                {/* Mustard yellow hand-drawn stroke */}
                <svg
                  className="absolute left-0 -bottom-2 w-full h-3 text-[#E5B83F]"
                  viewBox="0 0 320 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C55 3 95 11 160 6C225 1 260 10 317 6"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-2xl mx-auto lg:mx-0 font-normal">
              সরিষার তেল, খাঁটি ঘি ও দেশীয় খাবারের আসল স্বাদ পৌঁছে দিচ্ছি আপনার ঘরে। কোনো হিটিং, কেমিক্যাল প্রিজারভেটিভ বা সয়াবিন মিশ্রণ ছাড়াই শতভাগ খাঁটি নিশ্চয়তা।
            </p>

            {/* Authentic Bangladeshi Trust Checklist */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-bold text-[#244C32]">
              <div className="bg-white/80 p-2.5 rounded-2xl border border-[#244C32]/10 flex items-center justify-center lg:justify-start gap-2 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-[#E5B83F] shrink-0" />
                <span>কাঠের ঘানিভাঙা তেল</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-2xl border border-[#244C32]/10 flex items-center justify-center lg:justify-start gap-2 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-[#E5B83F] shrink-0" />
                <span>পাবনার খাঁটি গাওয়া ঘি</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-2xl border border-[#244C32]/10 flex items-center justify-center lg:justify-start gap-2 shadow-2xs">
                <CheckCircle className="w-4 h-4 text-[#E5B83F] shrink-0" />
                <span>সুন্দরবনের কাঁচা মধু</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-3">
              <a
                href="#shop"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#244C32] hover:bg-[#1A3824] text-[#FAF8F0] px-8 py-4 rounded-2xl text-base font-extrabold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5"
              >
                <ShoppingBag className="w-5 h-5 text-[#E5B83F]" />
                <span>এখনই কিনুন</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="tel:+8801312617206"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-white hover:bg-gray-50 text-[#244C32] border-2 border-[#244C32]/20 hover:border-[#244C32] px-6 py-3.5 rounded-2xl text-sm font-bold shadow-sm transition-colors"
              >
                <PhoneCall className="w-4 h-4 text-[#E5B83F]" />
                <span>ফোনে সরাসরি অর্ডার (01312617206)</span>
              </a>
            </div>

            {/* Real Social Proof Avatar Stack */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-xs text-gray-600">
              <div className="flex -space-x-2">
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Customer" />
                <img className="w-8 h-8 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Customer" />
              </div>
              <div className="font-semibold text-gray-800">
                <strong className="text-[#244C32] font-black">১২,৫০০+ পরিবার</strong> ঢাকা ও সারা দেশে নিয়মিত গ্রামবাংলার খাদ্যপণ্য গ্রহণ করছেন।
              </div>
            </div>

          </div>

          {/* Right Column - Authentic Product Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">

              {/* Warm Amber Backing */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E5B83F]/30 via-[#244C32]/20 to-transparent rounded-3xl transform rotate-2 scale-103 filter blur-sm"></div>

              {/* Main Showcase Card */}
              <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-2xl border border-[#244C32]/10 overflow-hidden">
                <div className="relative h-80 sm:h-96 md:h-[430px] rounded-2xl overflow-hidden group">
                  <img
                    src="https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1200&q=85"
                    alt="গ্রামবাংলা খাঁটি সরিষার তেল ও গ্রামীণ ঐতিহ্য"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />

                  {/* Subtle Natural Shadow Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>

                  {/* Card Bottom Banner */}
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-[#E5B83F] text-[#244C32] text-[11px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        কাঠের ঘানিভাঙা
                      </span>
                      <span className="bg-black/40 backdrop-blur-md text-white text-[11px] font-medium px-2 py-0.5 rounded-full">
                        সিরাজগঞ্জের মাঘী সরিষা
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black leading-tight">
                      আসল সরিষার ঝাঁঝ ও মাটির হাঁড়ির গাওয়া ঘি
                    </h3>

                    <p className="text-xs text-gray-200 mt-1 line-clamp-1">
                      পাবনা, সিরাজগঞ্জ ও সুন্দরবনের খাঁটি স্বাদে সাজিয়ে নিন আপনার রান্নাঘর
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Seal 1 - Top Left */}
              <div className="absolute -top-3 -left-3 sm:-left-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-[#244C32]/15 flex items-center gap-2.5 animate-float hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-[#244C32] text-[#E5B83F] flex items-center justify-center font-bold">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#244C32]">১০০% ভেজালমুক্ত গ্যারান্টি</div>
                  <div className="text-[10px] text-gray-500">কোনো প্রিজারভেটিভ নেই</div>
                </div>
              </div>

              {/* Floating Seal 2 - Bottom Right */}
              <div className="absolute -bottom-4 -right-3 sm:-right-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-[#244C32]/15 flex items-center gap-2.5 hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-[#E5B83F] text-[#244C32] flex items-center justify-center font-bold">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-bold text-[#244C32]">২৪-৪৮ ঘণ্টায় ডেলিভারি</div>
                  <div className="text-[10px] text-gray-500">পণ্য দেখে ক্যাশ অন ডেলিভারি</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
