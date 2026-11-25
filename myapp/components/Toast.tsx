'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { CheckCircle2, Sparkles } from 'lucide-react';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300 pointer-events-none max-w-sm">
      <div className="bg-[#244C32] text-[#FAF8F0] px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-[#E5B83F]/30 backdrop-blur-md">
        <div className="w-8 h-8 rounded-full bg-[#E5B83F]/20 flex items-center justify-center shrink-0 text-[#E5B83F]">
          <CheckCircle2 className="w-5 h-5 text-[#E5B83F]" />
        </div>
        <div className="text-sm font-medium leading-snug">
          {toastMessage}
        </div>
        <Sparkles className="w-4 h-4 text-[#E5B83F] shrink-0" />
      </div>
    </div>
  );
}
