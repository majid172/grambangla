'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  Leaf,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

export default function Footer() {
  const { setPolicyModal } = useCart();

  return (
    <footer className="bg-[#1A3824] text-[#FAF8F0] pt-16 pb-8 border-t-4 border-[#E5B83F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#E5B83F] flex items-center justify-center text-[#244C32] shadow-md">
                <Leaf className="w-6 h-6 transform -rotate-12" />
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white">
                  গ্রামবাংলা
                </span>
                <p className="text-xs text-[#E5B83F] font-medium">
                  খাঁটি খাবার, বাংলার স্বাদ
                </p>
              </div>
            </Link>

            <p className="text-sm text-gray-300 leading-relaxed pr-4">
              গ্রামবাংলা বাংলাদেশের প্রতিটি ঘরে পৌঁছে দিচ্ছে খাঁটি কাঠের ঘানিভাঙা সরিষার তেল, পাবনার গাওয়া ঘি, সুন্দরবনের প্রাকৃতিক কাঁচা মধু এবং দেশীয় কৃষকদের হাতে উৎপাদিত বিষমুক্ত নিরাপদ খাদ্যশস্য। আমাদের প্রতিশ্রুতি—আপসবিহীন খাঁটি স্বাদ ও সুস্থ জীবন।
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E5B83F] hover:text-[#244C32] flex items-center justify-center transition-all duration-300"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E5B83F] hover:text-[#244C32] flex items-center justify-center transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#E5B83F] hover:text-[#244C32] flex items-center justify-center transition-all duration-300"
                aria-label="YouTube"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-bold text-[#E5B83F] mb-4 tracking-wide">
              প্রয়োজনীয় লিংক
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5B83F]" /> হোম
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5B83F]" /> শপ কালেকশন
                </a>
              </li>
              <li>
                <a href="#categories" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5B83F]" /> ক্যাটাগরিসমূহ
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5B83F]" /> কেন গ্রামবাংলা
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5B83F]" /> গ্রাহক রিভিউ
                </a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-base font-bold text-[#E5B83F] mb-4 tracking-wide">
              জনপ্রিয় ক্যাটাগরি
            </h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li>
                <a href="#shop" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5B83F]" /> খাঁটি সরিষার তেল
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5B83F]" /> পাবনার গাওয়া ঘি
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5B83F]" /> সুন্দরবনের কাঁচা মধু
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5B83F]" /> সুগন্ধি কালোজিরা চাল
                </a>
              </li>
              <li>
                <a href="#shop" className="hover:text-white flex items-center gap-1.5 transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 text-[#E5B83F]" /> অর্গানিক ডাল ও শস্য
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div id="contact">
            <h4 className="text-base font-bold text-[#E5B83F] mb-4 tracking-wide">
              যোগাযোগের ঠিকানা
            </h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E5B83F] shrink-0 mt-1" />
                <span>হাউজ #৪২, রোড #১১, ধানমন্ডি, ঢাকা - ১২০৯, বাংলাদেশ</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E5B83F] shrink-0" />
                <a href="tel:+8801312617206" className="hover:text-white">
                  +880 1700-123456 (হটলাইন)
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E5B83F] shrink-0" />
                <a href="mailto:support@GramBangla.com" className="hover:text-white">
                  support@GramBangla.com
                </a>
              </li>
              <li className="pt-2">
                <div className="bg-white/10 rounded-xl p-3 border border-white/10 text-xs">
                  <span className="text-[#E5B83F] font-semibold block mb-1">অর্ডার ও হেল্পলাইন সময়:</span>
                  প্রতিদিন সকাল ৯:০০ টা থেকে রাত ১০:০০ টা পর্যন্ত
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment & Security Row */}
        <div className="py-6 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#E5B83F]" />
            <span>১০০% নিরাপদ লেনদেন ও ক্যাশ অন ডেলিভারি সুবিধা</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-gray-300 mr-2">পরিশোধের মাধ্যম:</span>
            <span className="px-2.5 py-1 bg-white/10 rounded font-semibold text-white">বিকাশ (bKash)</span>
            <span className="px-2.5 py-1 bg-white/10 rounded font-semibold text-white">নগদ (Nagad)</span>
            <span className="px-2.5 py-1 bg-white/10 rounded font-semibold text-white">রকেট (Rocket)</span>
            <span className="px-2.5 py-1 bg-white/10 rounded font-semibold text-white">ক্যাশ অন ডেলিভারি</span>
            <span className="px-2.5 py-1 bg-white/10 rounded font-semibold text-white flex items-center gap-1">
              <CreditCard className="w-3.5 h-3.5" /> কার্ড
            </span>
          </div>
        </div>

        {/* Bottom Bar & Policies */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p suppressHydrationWarning>© 2026 গ্রামবাংলা (GramBangla). সর্বস্বত্ব সংরক্ষিত।</p>

          <div className="flex flex-wrap items-center gap-4 text-gray-300">
            <Link
              href="/admin"
              className="text-[#E5B83F] font-bold hover:underline"
            >
              অ্যাডমিন পোর্টাল
            </Link>
            <span>•</span>
            <button
              onClick={() => setPolicyModal('privacy')}
              className="hover:text-[#E5B83F] transition-colors"
            >
              গোপনীয়তা নীতি (Privacy Policy)
            </button>
            <span>•</span>
            <button
              onClick={() => setPolicyModal('terms')}
              className="hover:text-[#E5B83F] transition-colors"
            >
              ব্যবহারের শর্তাবলী (Terms & Conditions)
            </button>
            <span>•</span>
            <button
              onClick={() => setPolicyModal('refund')}
              className="hover:text-[#E5B83F] transition-colors"
            >
              রিটার্ন ও রিফান্ড নীতি (Return & Refund)
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

