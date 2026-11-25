'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { trackInitiateCheckout } from '@/lib/fpixel';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Sparkles, 
  Truck, 
  Tag, 
  CheckCircle2 
} from 'lucide-react';

export default function CartDrawer() {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    updateQuantity, 
    removeFromCart, 
    cartTotal, 
    discountAmount, 
    finalTotal, 
    appliedCoupon, 
    applyCoupon, 
    removeCoupon,
    setIsCheckoutOpen
  } = useCart();

  const [couponCode, setCouponCode] = useState('');

  if (!isCartOpen) return null;

  const FREE_SHIPPING_THRESHOLD = 2000;
  const progressPercent = Math.min(100, Math.round((cartTotal / FREE_SHIPPING_THRESHOLD) * 100));
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartTotal);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode) return;
    if (applyCoupon(couponCode)) {
      setCouponCode('');
    }
  };

  const handleProceedToCheckout = () => {
    // Meta Pixel: Track checkout initiation
    trackInitiateCheckout(
      cart.map((item) => ({
        id: item.product.id,
        price: item.product.price,
        quantity: item.quantity,
      })),
      finalTotal
    );

    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-[#244C32]/20">
          
          {/* Header */}
          <div className="p-5 bg-[#FAF8F0] border-b border-[#244C32]/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-[#244C32] text-[#E5B83F] flex items-center justify-center font-bold">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-base text-[#244C32]">আপনার শপিং ব্যাগ</h3>
                <span className="text-xs text-gray-500 font-medium">({cart.length} টি পণ্য নির্বাচিত)</span>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-200/50 transition-colors"
              aria-label="Close Cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-4 bg-emerald-50 border-b border-emerald-100 text-xs">
            {remainingForFreeShipping > 0 ? (
              <div className="space-y-1.5">
                <div className="flex items-center justify-between font-semibold text-emerald-900">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    ফ্রি ডেলিভারির জন্য আরও ৳{remainingForFreeShipping} এর পণ্য যোগ করুন
                  </span>
                  <span>{progressPercent}%</span>
                </div>
                <div className="w-full bg-emerald-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#244C32] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-emerald-800 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>অভিনন্দন! আপনার অর্ডারে সারা দেশে ডেলিভারি সম্পূর্ণ ফ্রি! 🎉</span>
              </div>
            )}
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#FAF8F0] flex items-center justify-center text-gray-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-[#244C32] text-lg">আপনার ব্যাগ খালি</h4>
                <p className="text-xs text-gray-500 max-w-xs">
                  গ্রামবাংলার খাঁটি সরিষার তেল, ঘি বা মধু যুক্ত করে আপনার সুস্থ জীবনের যাত্রা শুরু করুন।
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 bg-[#244C32] text-white px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:bg-[#1A3824]"
                >
                  শপিং শুরু করুন
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3 bg-[#FAF8F0] p-3 rounded-2xl border border-gray-100 hover:border-[#244C32]/20 transition-colors"
                >
                  {/* Thumbnail */}
                  <Link 
                    href={`/details/${item.product.slug}`}
                    onClick={() => setIsCartOpen(false)}
                    className="shrink-0"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.nameBn}
                      className="w-20 h-20 rounded-xl object-cover border border-gray-200 bg-white hover:opacity-90 transition-opacity"
                    />
                  </Link>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <Link 
                          href={`/details/${item.product.slug}`}
                          onClick={() => setIsCartOpen(false)}
                          className="font-bold text-xs sm:text-sm text-[#244C32] hover:text-[#8B6E1A] truncate transition-colors"
                        >
                          {item.product.nameBn}
                        </Link>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-gray-400 hover:text-rose-500 transition-colors p-0.5"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[10px] text-gray-500 block">
                        {item.product.unit}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="text-sm font-black text-[#244C32]">
                        ৳{item.product.price * item.quantity}
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg bg-white overflow-hidden text-xs">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 font-bold text-[#244C32]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-2 py-1 hover:bg-gray-100 text-gray-600"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Area */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-gray-200 space-y-4 shadow-lg">
              {/* Coupon Input */}
              {appliedCoupon ? (
                <div className="bg-[#E5B83F]/15 border border-[#E5B83F]/40 p-2.5 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-[#244C32]">
                    <Tag className="w-4 h-4 text-[#8B6E1A]" />
                    <span>কুপন কোড '{appliedCoupon.code}' প্রয়োগ হয়েছে ({appliedCoupon.discountPercent}% ছাড়)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-rose-600 font-bold hover:underline"
                  >
                    বাতিল
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApply} className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="কুপন কোড লিখুন (যেমন GRAMBANGLA10)"
                    className="flex-1 text-xs bg-gray-50 border border-gray-300 rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#244C32] font-semibold uppercase"
                  />
                  <button
                    type="submit"
                    className="bg-[#244C32] hover:bg-[#1A3824] text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors shrink-0"
                  >
                    প্রয়োগ
                  </button>
                </form>
              )}

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-gray-600 pt-1">
                <div className="flex justify-between">
                  <span>সাবটোটাল:</span>
                  <span className="font-bold text-[#244C32]">৳{cartTotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>কুপন ডিসকাউন্ট:</span>
                    <span>-৳{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-medium text-gray-500">
                    {remainingForFreeShipping === 0 ? 'ফ্রি' : 'চেকআউটে নির্ধারিত হবে'}
                  </span>
                </div>

                <div className="flex justify-between text-base font-black text-[#244C32] pt-2 border-t border-gray-100">
                  <span>মোট প্রদেয়:</span>
                  <span>৳{finalTotal}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full h-12 bg-[#244C32] hover:bg-[#1B3B26] active:bg-[#142C1D] text-white border border-[#1B3B26] rounded-xl text-sm font-bold flex items-center justify-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-[0.99] cursor-pointer"
              >
                <span>অর্ডার সম্পন্ন করতে এগিয়ে যান</span>
                <ArrowRight className="w-4 h-4 text-[#E5B83F]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
