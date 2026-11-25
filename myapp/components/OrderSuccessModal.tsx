'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, MessageCircle, ShoppingBag, Truck, Calendar, MapPin, Sparkles } from 'lucide-react';

export default function OrderSuccessModal() {
  const { completedOrder, setCompletedOrder } = useCart();

  if (!completedOrder) return null;

  const handleWhatsAppInquiry = () => {
    const text = encodeURIComponent(
      `হ্যালো গ্রামবাংলা, আমার অর্ডার আইডি ${completedOrder.orderId}। মোট প্রদেয় ৳${completedOrder.total}। আমি ডেলিভারি স্ট্যাটাস জানতে চাই।`
    );
    window.open(`https://wa.me/8801312617206?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-[#244C32]/20 overflow-hidden text-center p-6 sm:p-8">

        {/* Celebration Header */}
        <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-4 animate-bounce">
          <CheckCircle2 className="w-12 h-12" />
        </div>

        <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8B6E1A] bg-[#E5B83F]/20 px-3 py-1 rounded-full mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>অর্ডার সফলভাবে গৃহীত হয়েছে</span>
        </div>

        <h2 className="text-2xl font-extrabold text-[#244C32]">
          ধন্যবাদ, {completedOrder.customerName}!
        </h2>

        <p className="text-xs sm:text-sm text-gray-600 mt-1 max-w-sm mx-auto">
          আপনার অর্ডারটি নিশ্চিত করা হয়েছে। খুব শীঘ্রই আমাদের প্রতিনিধি আপনার দেওয়া নম্বরে কল করে নিশ্চিত করবেন।
        </p>

        {/* Order Details Card */}
        <div className="mt-6 bg-[#FAF8F0] p-4 rounded-2xl border border-gray-200 text-left space-y-2 text-xs">
          <div className="flex justify-between border-b pb-2">
            <span className="text-gray-500">অর্ডার নম্বর:</span>
            <span className="font-mono font-bold text-[#244C32]">{completedOrder.orderId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">তারিখ:</span>
            <span className="font-semibold text-gray-800">{completedOrder.orderDate}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">ডেলিভারি ঠিকানা:</span>
            <span className="font-semibold text-gray-800 truncate max-w-[200px]">{completedOrder.address}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">পেমেন্ট মেথড:</span>
            <span className="font-bold text-[#244C32] uppercase">{completedOrder.paymentMethod}</span>
          </div>

          <div className="flex justify-between border-t pt-2 text-sm font-black text-[#244C32]">
            <span>মোট প্রদেয়:</span>
            <span>৳{completedOrder.total}</span>
          </div>
        </div>

        {/* Delivery Guarantee Info */}
        <div className="mt-4 p-3 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center gap-3 text-xs text-emerald-800 text-left">
          <Truck className="w-5 h-5 shrink-0 text-emerald-600" />
          <span>আনুমানিক ডেলিভারি সময়: ঢাকা সিটিতে ২৪-৪৮ ঘণ্টা, ঢাকার বাইরে ২-৩ কার্যদিবস।</span>
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleWhatsAppInquiry}
            className="flex-1 bg-[#25D366] hover:bg-[#20ba59] text-white py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
            <span>হোয়াটসঅ্যাপে আপডেট নিন</span>
          </button>

          <button
            onClick={() => setCompletedOrder(null)}
            className="flex-1 bg-[#244C32] hover:bg-[#1A3824] text-white py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-colors shadow-md"
          >
            <ShoppingBag className="w-4 h-4 text-[#E5B83F]" />
            <span>আরও কেনাকাটা করুন</span>
          </button>
        </div>

      </div>
    </div>
  );
}
