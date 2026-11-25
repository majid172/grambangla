'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { X, ShieldCheck, FileText, RotateCcw } from 'lucide-react';

export default function PolicyModal() {
  const { policyModal, setPolicyModal } = useCart();

  if (!policyModal) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#244C32]/20 p-6 sm:p-8">
        
        {/* Close Button */}
        <button
          onClick={() => setPolicyModal(null)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content based on policy */}
        {policyModal === 'privacy' && (
          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div className="flex items-center gap-3 text-[#244C32] border-b pb-3">
              <ShieldCheck className="w-6 h-6 text-[#E5B83F]" />
              <h3 className="text-xl font-bold">গোপনীয়তা নীতি (Privacy Policy)</h3>
            </div>
            <p>
              গ্রামবাংলা (GramBangla) আমাদের গ্রাহকদের তথ্যের গোপনীয়তাকে সর্বোচ্চ গুরুত্ব দিয়ে থাকে। আপনার নাম, মোবাইল নম্বর এবং ডেলিভারি ঠিকানা শুধুমাত্র আপনার কাছে পণ্য সঠিকভাবে পৌঁছে দেওয়ার উদ্দেশ্যে সংরক্ষিত ও ব্যবহৃত হয়।
            </p>
            <h4 className="font-bold text-[#244C32]">আমরা কী কী তথ্য সংগ্রহ করি:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>অর্ডারের জন্য প্রয়োজনীয় নাম, ফোন নম্বর ও পূর্ণ ডেলিভারি ঠিকানা।</li>
              <li>পেমেন্ট সংক্রান্ত তথ্য (বিকাশ/নগদ রেফারেন্স বা লেনদেন আইডি)।</li>
              <li>গ্রাহকের স্বেচ্ছায় দেওয়া রিভিউ ও মতামত।</li>
            </ul>
            <p>
              আমরা কোনো অবস্থাতেই আপনার ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বিক্রি বা শেয়ার করি না।
            </p>
          </div>
        )}

        {policyModal === 'terms' && (
          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div className="flex items-center gap-3 text-[#244C32] border-b pb-3">
              <FileText className="w-6 h-6 text-[#E5B83F]" />
              <h3 className="text-xl font-bold">ব্যবহারের শর্তাবলী (Terms & Conditions)</h3>
            </div>
            <p>
              গ্রামবাংলা ওয়েবসাইট থেকে যেকোনো পণ্য অর্ডার করার মাধ্যমে আপনি আমাদের শর্তাবলীর সাথে সম্মত হন।
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li><strong>মূল্য ও স্টক:</strong> ওয়েবসাইটের সকল মূল্য টাকায় (৳) প্রদর্শিত। পণ্যের স্টক ও অঞ্চলভিত্তিক প্রাপ্যতা অনুসারে যেকোনো সময় আপডেট হতে পারে।</li>
              <li><strong>অর্ডার যাচাই:</strong> প্রতিটি অর্ডার প্রক্রিয়াজাতকরণের পূর্বে আমাদের কাস্টমার প্রতিনিধি ফোনে কল করে যাচাই করতে পারেন।</li>
              <li><strong>ডেলিভারি সময়সীমা:</strong> ঢাকা শহরের ভেতরে সাধারণত ২৪-৪৮ ঘণ্টার মধ্যে এবং ঢাকার বাইরে ২-৩ কার্যদিবসের মধ্যে ডেলিভারি সম্পন্ন হয়।</li>
            </ul>
          </div>
        )}

        {policyModal === 'refund' && (
          <div className="space-y-4 text-xs sm:text-sm text-gray-700 leading-relaxed">
            <div className="flex items-center gap-3 text-[#244C32] border-b pb-3">
              <RotateCcw className="w-6 h-6 text-[#E5B83F]" />
              <h3 className="text-xl font-bold">রিটার্ন ও রিফান্ড নীতি (Return & Refund)</h3>
            </div>
            <p>
              আমাদের প্রতিশ্রুতি শতভাগ খাঁটি ও নিখুঁত পণ্য। তবুও যদি পণ্য ক্ষতিগ্রস্ত বা ভুল হয়ে থাকে:
            </p>
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 font-semibold text-emerald-900">
              ✓ ডেলিভারি ম্যানের উপস্থিতিতে পণ্য পরীক্ষা করে নিন। কোনো ত্রুটি থাকলে অনস্পট ফেরত দিন অথবা আমাদের হেল্পলাইনে জানান।
            </div>
            <ul className="list-disc pl-5 space-y-2">
              <li>প্যাকেজ গ্রহণের ৭ দিনের মধ্যে কোনো কোয়ালিটি ত্রুটি পাওয়া গেলে সম্পূর্ণ বিনামূল্যে প্রতিস্থাপন বা পূর্ণ রিফান্ড প্রদান করা হবে।</li>
              <li>অনলাইন পেমেন্ট করা থাকলে রিফান্ড রিকোয়েস্ট অনুমোদনের ৩ কার্যদিবসের মধ্যে আপনার বিকাশ/নগদ নম্বরে টাকা ফেরত পাঠানো হবে।</li>
            </ul>
          </div>
        )}

        <div className="mt-6 pt-4 border-t flex justify-end">
          <button
            onClick={() => setPolicyModal(null)}
            className="bg-[#244C32] text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-[#1A3824]"
          >
            বুঝেছি, বন্ধ করুন
          </button>
        </div>

      </div>
    </div>
  );
}
