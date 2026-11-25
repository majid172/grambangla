'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send, Leaf } from 'lucide-react';
import { trackContact } from '@/lib/fpixel';

export default function WhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    trackContact('whatsapp', 'floating_widget');
    const encoded = encodeURIComponent(message || 'হ্যালো গ্রামবাংলা, আমি কিছু তথ্য জানতে চাচ্ছি।');
    window.open(`https://wa.me/8801312617206?text=${encoded}`, '_blank');
    setMessage('');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      {/* Live Chat Popup */}
      {isOpen && (
        <div className="mb-3 w-80 sm:w-88 bg-white rounded-2xl shadow-2xl border border-[#244C32]/10 overflow-hidden transform transition-all duration-300">
          <div className="bg-[#244C32] text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#E5B83F] flex items-center justify-center text-[#244C32] font-bold">
                <Leaf className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-semibold text-sm">গ্রামবাংলা কাস্টমার কেয়ার</h4>
                <div className="flex items-center gap-1.5 text-xs text-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  অনলাইন আছেন (সকাল ৯টা - রাত ১০টা)
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-4 bg-[#FAF8F0] space-y-3 max-h-60 overflow-y-auto text-xs">
            <div className="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm text-gray-700 border border-gray-100">
              আসসালামু আলাইকুম! খাঁটি খাবারের গ্রামবাংলায় আপনাকে স্বাগতম। সরিষার তেল, ঘি বা অর্ডার নিয়ে কোনো প্রশ্ন থাকলে এখানে লিখুন।
            </div>
            <div className="bg-emerald-50 text-emerald-800 p-2 rounded-xl text-center font-medium border border-emerald-100">
              দ্রুত রিপ্লাই পেতে সরাসরি হোয়াটসঅ্যাপে যুক্ত হোন
            </div>
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-gray-100 flex items-center gap-2">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="আপনার বার্তাটি লিখুন..."
              className="flex-1 text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:border-[#244C32]"
            />
            <button
              type="submit"
              className="bg-[#244C32] hover:bg-[#1A3824] text-white p-2.5 rounded-xl transition-colors shrink-0"
              title="পাঠান"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white px-4 py-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        aria-label="WhatsApp Support"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 fill-white" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-[#E5B83F] rounded-full border-2 border-[#25D366]"></span>
        </div>

      </button>
    </div>
  );
}
