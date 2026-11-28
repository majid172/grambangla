'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Send, Sparkles } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setSubscribed(false);
    }, 6000);
  };

  return (
    <section className="py-16 bg-[#244C32] text-white relative overflow-hidden">
      {/* Decorative Blur Circles */}
      <div className="absolute top-0 right-1/4 w-80 h-80 bg-[#E5B83F]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

        <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#E5B83F] bg-white/10 px-3.5 py-1 rounded-full mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>নিউজলেটার সাবস্ক্রিপশন</span>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#FAF8F0] tracking-tight">
          নতুন অফার ও আপডেট পেতে যুক্ত থাকুন
        </h2>

        <p className="mt-3 text-sm sm:text-base text-gray-200 max-w-xl mx-auto">
          গ্রামবাংলার নতুন পণ্যের আগমন, বিশেষ ডিসকাউন্ট কুপন ও স্বাস্থ্যকর খাদ্য বিষয়ক টিপস সবার আগে পেতে আপনার ইমেইল দিয়ে সাবস্ক্রাইব করুন।
        </p>

        {subscribed ? (
          <div className="mt-8 max-w-md mx-auto bg-white/15 border border-[#E5B83F]/50 rounded-2xl p-4 flex items-center justify-center gap-3 text-sm text-[#E5B83F] font-bold animate-fadeIn">
            <CheckCircle2 className="w-6 h-6 shrink-0" />
            <span>ধন্যবাদ! আপনি সফলভাবে গ্রামবাংলার নিউজলেটারে যুক্ত হয়েছেন।</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 max-w-md mx-auto flex flex-col sm:flex-row items-center gap-2">
            <div className="relative w-full">
              <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল অ্যাড্রেস লিখুন..."
                className="w-full bg-white text-[#252B25] text-sm rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:ring-2 focus:ring-[#E5B83F] placeholder-gray-400 font-medium"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto shrink-0 bg-[#E5B83F] hover:bg-[#d6a82e] text-[#244C32] px-7 py-3.5 rounded-2xl font-black text-sm shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>সাবস্ক্রাইব</span>
              <Send className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="mt-4 text-xs text-gray-300">
          🔒 আমরা কোনো স্প্যাম পাঠাই না। আপনি যেকোনো সময় আনসাবস্ক্রাইব করতে পারবেন।
        </div>

      </div>
    </section>
  );
}

