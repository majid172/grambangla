'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { OrderDetails } from '@/types';
import { trackPurchase } from '@/lib/fpixel';
import { 
  X, 
  Truck, 
  CreditCard, 
  ShieldCheck, 
  MapPin, 
  Phone, 
  User, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function CheckoutModal() {
  const { 
    cart, 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    cartTotal, 
    discountAmount, 
    finalTotal, 
    appliedCoupon, 
    clearCart, 
    setCompletedOrder 
  } = useCart();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [cityArea, setCityArea] = useState<'dhaka' | 'outside'>('dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad'>('cod');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  // Delivery fee: 70 for Dhaka, 130 for outside Dhaka. Free if total >= 2000
  const deliveryFee = cartTotal >= 2000 ? 0 : (cityArea === 'dhaka' ? 70 : 130);
  const grandTotal = finalTotal + deliveryFee;

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !address) return;

    setIsSubmitting(true);

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const newOrder: OrderDetails = {
      orderId: `GB-2026-${randomNum}`,
      customerName: name,
      phone,
      email: email || 'তথ্য দেওয়া হয়নি',
      address,
      city: cityArea === 'dhaka' ? 'ঢাকা মেট্রো' : 'ঢাকার বাইরে',
      deliveryMethod: 'regular',
      paymentMethod,
      items: [...cart],
      subtotal: cartTotal,
      deliveryFee,
      discount: discountAmount,
      total: grandTotal,
      status: 'Confirmed',
      orderDate: new Date().toLocaleDateString('bn-BD', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      })
    };

    setTimeout(() => {
      // Meta Pixel: Track completed purchase
      trackPurchase({
        orderId: newOrder.orderId,
        items: cart.map((i) => ({
          id: i.product.id,
          price: i.product.price,
          quantity: i.quantity,
        })),
        total: grandTotal,
      });

      clearCart();
      setCompletedOrder(newOrder);
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-[#244C32]/20">
        
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#FAF8F0] p-4 sm:p-6 border-b border-gray-200 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#244C32] text-[#E5B83F] flex items-center justify-center font-bold">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-extrabold text-[#244C32]">চেকআউট ও ডেলিভারি তথ্য</h3>
              <p className="text-xs text-gray-500">ক্যাশ অন ডেলিভারি অথবা অনলাইন পেমেন্টে অর্ডার করুন</p>
            </div>
          </div>

          <button
            onClick={() => setIsCheckoutOpen(false)}
            className="w-9 h-9 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Checkout Form & Summary Grid */}
        <form onSubmit={handleSubmitOrder} className="p-5 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Form: 7 cols */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Customer Details */}
            <div className="bg-[#FAF8F0] p-5 rounded-2xl border border-gray-100 space-y-4">
              <h4 className="font-bold text-sm text-[#244C32] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#244C32] text-white text-xs flex items-center justify-center font-bold">১</span>
                <span>আপনার তথ্য</span>
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    আপনার পূর্ণ নাম <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="যেমন: মোঃ রফিকুল ইসলাম"
                    className="w-full text-xs sm:text-sm bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      মোবাইল নম্বর <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="017XXXXXXXX"
                      className="w-full text-xs sm:text-sm bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      ইমেইল অ্যাড্রেস (ঐচ্ছিক)
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full text-xs sm:text-sm bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    সম্পূর্ণ ডেলিভারি ঠিকানা <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="বাসা নং, রোড নং, এলাকা, থানা ও জেলা উল্লেখ করুন..."
                    className="w-full text-xs sm:text-sm bg-white border border-gray-300 rounded-xl px-3.5 py-2 focus:outline-none focus:border-[#244C32]"
                  ></textarea>
                </div>
              </div>
            </div>

            {/* Step 2: Delivery Area */}
            <div className="bg-[#FAF8F0] p-5 rounded-2xl border border-gray-100 space-y-3">
              <h4 className="font-bold text-sm text-[#244C32] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#244C32] text-white text-xs flex items-center justify-center font-bold">২</span>
                <span>ডেলিভারি এরিয়া নির্বাচন করুন</span>
              </h4>

              <div className="grid grid-cols-2 gap-3">
                <label className={`cursor-pointer p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                  cityArea === 'dhaka' ? 'border-[#244C32] bg-white ring-2 ring-[#244C32]/20' : 'border-gray-200 bg-white/60'
                }`}>
                  <input
                    type="radio"
                    name="cityArea"
                    checked={cityArea === 'dhaka'}
                    onChange={() => setCityArea('dhaka')}
                    className="hidden"
                  />
                  <div className="font-bold text-xs sm:text-sm text-[#244C32]">ঢাকা সিটির ভেতরে</div>
                  <div className="text-xs text-gray-500 mt-1">চার্জ: ৳৭০ (২৪-৪৮ ঘণ্টা)</div>
                </label>

                <label className={`cursor-pointer p-3.5 rounded-xl border flex flex-col justify-between transition-all ${
                  cityArea === 'outside' ? 'border-[#244C32] bg-white ring-2 ring-[#244C32]/20' : 'border-gray-200 bg-white/60'
                }`}>
                  <input
                    type="radio"
                    name="cityArea"
                    checked={cityArea === 'outside'}
                    onChange={() => setCityArea('outside')}
                    className="hidden"
                  />
                  <div className="font-bold text-xs sm:text-sm text-[#244C32]">ঢাকার বাইরে (সারা দেশ)</div>
                  <div className="text-xs text-gray-500 mt-1">চার্জ: ৳১৩০ (২-৩ দিন)</div>
                </label>
              </div>

              {cartTotal >= 2000 && (
                <div className="text-xs font-bold text-emerald-800 bg-emerald-100/70 p-2 rounded-lg flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>৳২০০০+ শপিংয়ে আপনার ডেলিভারি চার্জ সম্পূর্ণ ফ্রি!</span>
                </div>
              )}
            </div>

            {/* Step 3: Payment Method */}
            <div className="bg-[#FAF8F0] p-5 rounded-2xl border border-gray-100 space-y-3">
              <h4 className="font-bold text-sm text-[#244C32] flex items-center gap-2">
                <span className="w-5 h-5 rounded-full bg-[#244C32] text-white text-xs flex items-center justify-center font-bold">৩</span>
                <span>পেমেন্ট পদ্ধতি</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <label className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'cod' ? 'border-[#244C32] bg-white ring-2 ring-[#244C32]/20 font-bold' : 'border-gray-200 bg-white/60 text-gray-700'
                }`}>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="hidden"
                  />
                  <span className="text-xs block">ক্যাশ অন ডেলিভারি</span>
                  <span className="text-[10px] text-gray-500">পণ্য পেয়ে টাকা দিন</span>
                </label>

                <label className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'bkash' ? 'border-[#E2136E] bg-white ring-2 ring-[#E2136E]/20 font-bold text-[#E2136E]' : 'border-gray-200 bg-white/60 text-gray-700'
                }`}>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'bkash'}
                    onChange={() => setPaymentMethod('bkash')}
                    className="hidden"
                  />
                  <span className="text-xs block">বিকাশ (bKash)</span>
                  <span className="text-[10px] text-gray-500">ম্যানুয়াল/মার্চেন্ট পে</span>
                </label>

                <label className={`cursor-pointer p-3 rounded-xl border text-center transition-all ${
                  paymentMethod === 'nagad' ? 'border-[#F7941D] bg-white ring-2 ring-[#F7941D]/20 font-bold text-[#F7941D]' : 'border-gray-200 bg-white/60 text-gray-700'
                }`}>
                  <input
                    type="radio"
                    name="payMethod"
                    checked={paymentMethod === 'nagad'}
                    onChange={() => setPaymentMethod('nagad')}
                    className="hidden"
                  />
                  <span className="text-xs block">নগদ (Nagad)</span>
                  <span className="text-[10px] text-gray-500">সহজ পেমেন্ট</span>
                </label>
              </div>
            </div>

          </div>

          {/* Right Summary: 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4 shadow-sm">
              <h4 className="font-extrabold text-sm text-[#244C32] border-b pb-3">
                অর্ডার সারাংশ ({cart.length} টি আইটেম)
              </h4>

              {/* Items List */}
              <div className="max-h-60 overflow-y-auto space-y-3 pr-1 text-xs">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between gap-2 border-b border-gray-100 pb-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <img src={item.product.image} alt={item.product.nameBn} className="w-10 h-10 rounded-lg object-cover shrink-0" />
                      <div className="min-w-0">
                        <p className="font-bold text-gray-800 truncate">{item.product.nameBn}</p>
                        <p className="text-[11px] text-gray-500">{item.product.unit} × {item.quantity}</p>
                      </div>
                    </div>
                    <span className="font-bold text-[#244C32] shrink-0">
                      ৳{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Calculation */}
              <div className="space-y-2 text-xs pt-2">
                <div className="flex justify-between text-gray-600">
                  <span>সাবটোটাল:</span>
                  <span className="font-bold text-gray-900">৳{cartTotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>কুপন ছাড় ({appliedCoupon?.code}):</span>
                    <span>-৳{discountAmount}</span>
                  </div>
                )}

                <div className="flex justify-between text-gray-600">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-bold text-gray-900">
                    {deliveryFee === 0 ? 'ফ্রি' : `৳${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-lg font-black text-[#244C32] pt-3 border-t border-gray-200">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span>৳{grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="space-y-3">
              <button
                type="submit"
                disabled={isSubmitting || cart.length === 0}
                className="w-full bg-[#244C32] hover:bg-[#1A3824] disabled:bg-gray-400 text-[#FAF8F0] py-4 rounded-2xl font-black text-base shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <span>অর্ডার প্রসেস হচ্ছে...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-[#E5B83F]" />
                    <span>অর্ডার নিশ্চিত করুন (৳{grandTotal})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>আপনার সকল তথ্য সম্পূর্ণ নিরাপদ ও সুরক্ষিত</span>
              </div>
            </div>

          </div>

        </form>

      </div>
    </div>
  );
}
