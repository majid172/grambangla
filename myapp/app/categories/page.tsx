'use client';

import React from 'react';
import Link from 'next/link';
import { CartProvider, useCart } from '@/context/CartContext';
import { CATEGORIES, PRODUCTS } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import WhatsAppButton from '@/components/WhatsAppButton';
import Toast from '@/components/Toast';
import CartDrawer from '@/components/CartDrawer';
import WishlistDrawer from '@/components/WishlistDrawer';
import SearchModal from '@/components/SearchModal';
import AuthModal from '@/components/AuthModal';
import CheckoutModal from '@/components/CheckoutModal';
import OrderSuccessModal from '@/components/OrderSuccessModal';
import PolicyModal from '@/components/PolicyModal';
import { 
  ChevronRight, 
  Sparkles, 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  Leaf, 
  PhoneCall,
  ShoppingBag
} from 'lucide-react';

function CategoriesContent() {
  const { addToCart } = useCart();

  const categoryDetails = [
    {
      slug: 'mustard-oil',
      origin: 'তাড়াশ ও উল্লাপাড়া, সিরাজগঞ্জ',
      process: 'সনাতন কাঠের ঘানিতে ধীরগতির কোল্ড-প্রেসড পদ্ধতি',
      purityClaim: '১০০% মাঘী সরিষা, জিরো কেমিক্যাল ও কোনো প্রকার সয়াবিন মিশ্রণ নেই',
      iconEmoji: '🌾'
    },
    {
      slug: 'ghee',
      origin: 'চাটমোহর, পাবনা',
      process: 'দেশি গাভীর দুধ থেকে বিলোড়ন মাখন ও মাটির হাঁড়িতে মৃদু আঁচে জ্বাল',
      purityClaim: 'স্বর্গীয় সোনালী সুবাস, শতভাগ প্রাকৃতিক দানা ও ডালডামুক্ত',
      iconEmoji: '🧈'
    },
    {
      slug: 'gur',
      origin: 'খাজুরা ও বাঘারপাড়া, যশোর',
      process: 'শীতের ভোরে তাজা খেজুরের রস লোহার তাওয়ায় জ্বাল দিয়ে কাঠের ছাঁচে তৈরি',
      purityClaim: 'চিনি ও হাইড্রোজ সম্পূর্ণমুক্ত, ঐতিহ্যবাহী গাছিদের হাতে তৈরি',
      iconEmoji: '🍯'
    },
    {
      slug: 'honey',
      origin: 'মুন্সীগঞ্জ ও বুড়িগোয়ালিনী, সুন্দরবন',
      process: 'গভীর অরণ্য থেকে বুনো মৌচাক কেটে প্রাকৃতিক সুতি কাপড়ে ছাঁকা',
      purityClaim: 'কাঁচা, আনপাস্তুরিত, সক্রিয় এনজাইম ও পোলেনযুক্ত শতভাগ বুনো মধু',
      iconEmoji: '🐝'
    },
    {
      slug: 'rice',
      origin: 'বীরগঞ্জ ও কাহারোল, দিনাজপুর',
      process: 'উর্বর মাটির দেশি কালোজিরা ও চিনিগুঁড়া ধান, কোনো পলিশিং ছাড়াই ঝাড়াই',
      purityClaim: 'ইউরিয়া ও কৃত্রিম সুগন্ধিমুক্ত, সহজে ঝরঝরে ও অপূর্ব প্রাকৃতিক সুবাস',
      iconEmoji: '🍚'
    },
    {
      slug: 'spices',
      origin: 'খাগড়াছড়ি, কুষ্টিয়া ও নাটোর',
      process: 'পাহাড়ের জুমের কাঁচা হলুদ ও মরিচ রোদে শুকিয়ে চূর্ণ এবং ঘানিভাঙা তেল',
      purityClaim: 'লেড-ক্রোমেট বা কৃত্রিম ফুড কালার শূন্য, প্রাকৃতিক ভেষজ পুষ্টি',
      iconEmoji: '🌿'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F0]">
      <Navbar />

      <main className="flex-1 pb-20">
        
        {/* Breadcrumb & Header Banner */}
        <section className="bg-gradient-to-r from-[#244C32] via-[#1A3824] to-[#2E5F3F] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#E5B83F]">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-300 mb-3">
              <Link href="/" className="hover:text-white transition-colors">হোম</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#E5B83F]" />
              <span className="text-[#E5B83F] font-bold">পণ্যের ক্যাটাগরিসমূহ</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 bg-[#E5B83F] text-[#244C32] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>বাংলার খাঁটি স্বাদ ও ঐতিহ্য</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                  সকল খাদ্য বিভাগ ও ক্যাটাগরি
                </h1>
                <p className="text-sm sm:text-base text-gray-200 mt-2 max-w-2xl font-normal leading-relaxed">
                  সিরাজগঞ্জের ঘানিভাঙা সরিষার তেল, পাবনার গাওয়া ঘি, সুন্দরবনের মধু ও শীতের খাঁটি খেজুরের গুড়—বাংলাদেশের প্রতিটি অঞ্চলের সেরা ঐতিহ্যবাহী খাদ্য এক নজরে।
                </p>
              </div>

              {/* Quick Call Order CTA */}
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/20 flex items-center gap-3.5 self-start md:self-auto shadow-md">
                <div className="w-11 h-11 rounded-2xl bg-[#E5B83F] text-[#244C32] flex items-center justify-center font-bold">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-gray-200">ফোনে সরাসরি অর্ডার করুন:</div>
                  <a href="tel:+8801700123456" className="text-base font-extrabold text-[#E5B83F] hover:underline">
                    01700-123456
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Quick Anchor Jump Pills */}
        <div className="bg-white border-b border-[#244C32]/10 sticky top-18 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none text-xs font-bold">
            <span className="text-gray-400 shrink-0">দ্রুত জাম্প করুন:</span>
            {CATEGORIES.map((cat) => (
              <a
                key={cat.id}
                href={`#cat-${cat.slug}`}
                className="bg-[#FAF8F0] hover:bg-[#244C32] text-[#244C32] hover:text-white px-3.5 py-1.5 rounded-xl border border-gray-200 transition-colors shrink-0 whitespace-nowrap shadow-2xs"
              >
                {cat.nameBn}
              </a>
            ))}
          </div>
        </div>

        {/* Categories Showcase List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-16">
          {CATEGORIES.map((cat, index) => {
            const meta = categoryDetails.find(d => d.slug === cat.slug) || {
              origin: 'বাংলাদেশ',
              process: 'প্রাকৃতিক ও ঐতিহ্যবাহী পদ্ধতি',
              purityClaim: '১০০% খাঁটি ও নিরাপদ',
              iconEmoji: '🌿'
            };

            const catProducts = PRODUCTS.filter(p => p.category === cat.slug);

            return (
              <div
                key={cat.id}
                id={`cat-${cat.slug}`}
                className="scroll-mt-32 bg-white rounded-3xl p-6 sm:p-8 lg:p-10 border border-[#244C32]/10 shadow-xs hover:shadow-xl transition-all duration-300"
              >
                {/* Category Header Row */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-gray-100 pb-8 mb-8">
                  
                  {/* Left: Category Image */}
                  <div className="lg:col-span-4 relative h-60 sm:h-72 rounded-3xl overflow-hidden shadow-md group">
                    <img
                      src={cat.image}
                      alt={cat.nameBn}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                    
                    {/* Badge */}
                    <span className="absolute top-3 left-3 bg-[#E5B83F] text-[#244C32] text-xs font-black px-3 py-1 rounded-full shadow-md">
                      {cat.tagline}
                    </span>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <div className="flex items-center gap-1.5 text-xs text-[#E5B83F] font-bold mb-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>উৎস: {meta.origin}</span>
                      </div>
                      <h3 className="text-xl font-black">{cat.nameBn}</h3>
                    </div>
                  </div>

                  {/* Right: Heritage Story & Highlights */}
                  <div className="lg:col-span-8 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-bold text-[#8B6E1A] bg-[#E5B83F]/20 px-3 py-1 rounded-full uppercase tracking-wider inline-block mb-1">
                          বিভাগ #{index + 1} • {cat.nameEn}
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#244C32]">
                          {cat.nameBn}
                        </h2>
                      </div>

                      <Link
                        href={`/shop`}
                        className="inline-flex items-center gap-1.5 bg-[#244C32] hover:bg-[#1A3824] text-[#FAF8F0] px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-transform hover:scale-103"
                      >
                        <span>শপে সব দেখুন ({cat.itemCount} টি)</span>
                        <ArrowRight className="w-4 h-4 text-[#E5B83F]" />
                      </Link>
                    </div>

                    <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
                      {cat.descriptionBn}
                    </p>

                    {/* Meta Highlights Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                      <div className="bg-[#FAF8F0] p-3 rounded-2xl border border-[#244C32]/10 space-y-1">
                        <div className="font-bold text-[#244C32] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          <span>প্রস্তুত প্রণালী:</span>
                        </div>
                        <p className="text-gray-600 pl-5 leading-normal">{meta.process}</p>
                      </div>

                      <div className="bg-[#FAF8F0] p-3 rounded-2xl border border-[#244C32]/10 space-y-1">
                        <div className="font-bold text-[#244C32] flex items-center gap-1.5">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>বিশুদ্ধতার প্রতিশ্রুতি:</span>
                        </div>
                        <p className="text-gray-600 pl-5 leading-normal">{meta.purityClaim}</p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Products in this category */}
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <h4 className="text-base sm:text-lg font-extrabold text-[#244C32] flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-[#E5B83F]" />
                      <span>{cat.nameBn} এর জনপ্রিয় পণ্যসমূহ</span>
                    </h4>
                    <span className="text-xs text-gray-500 font-semibold">
                      মোট {catProducts.length} টি পণ্য প্রদর্শিত
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {catProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Purity Statement */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <div className="bg-gradient-to-r from-[#244C32] to-[#1A3824] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-[#E5B83F]/30 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#E5B83F] text-[#244C32] flex items-center justify-center mx-auto text-2xl font-black shadow-lg">
              ১০০%
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-[#FAF8F0]">
              ভেজালমুক্ত ও খাঁটি খাবারের নিশ্চয়তা
            </h3>
            <p className="text-sm sm:text-base text-gray-200 max-w-2xl mx-auto leading-relaxed">
              গ্রামবাংলা কোনো মধ্যস্বত্বভোগী ছাড়া সরাসরি কৃষক ও কারিগরদের থেকে খাদ্যপণ্য সংগ্রহ করে। আমাদের কোনো পণ্য পছন্দ না হলে বা কোয়ালিটিতে ত্রুটি থাকলে তাৎক্ষণিক ফুল রিফান্ড দেওয়া হয়।
            </p>
            <div className="pt-2">
              <Link
                href="/shop"
                className="inline-flex items-center gap-2 bg-[#E5B83F] hover:bg-[#d6a82e] text-[#244C32] px-8 py-3.5 rounded-2xl font-black text-sm shadow-xl transition-transform hover:scale-105"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>সব পণ্য এক সাথে দেখুন</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppButton />
      <Toast />

      {/* Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <SearchModal />
      <AuthModal />
      <CheckoutModal />
      <OrderSuccessModal />
      <PolicyModal />
    </div>
  );
}

export default function CategoriesPage() {
  return (
    <CartProvider>
      <CategoriesContent />
    </CartProvider>
  );
}
