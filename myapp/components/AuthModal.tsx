'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Lock, Phone, Mail, User, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function AuthModal() {
  const { isAuthOpen, setIsAuthOpen, showToast } = useCart();
  const [tab, setTab] = useState<'login' | 'register'>('login');

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Register form state
  const [regName, setRegName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);

  if (!isAuthOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier) return;
    setLoggedInUser(loginIdentifier);
    showToast('সফলভাবে লগইন হয়েছে! স্বাগতম শিকড়য়।');
    setTimeout(() => {
      setIsAuthOpen(false);
    }, 1000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!regPhone || !regName) return;
    setLoggedInUser(regName);
    showToast('আপনার একাউন্ট সফলভাবে তৈরি হয়েছে! 🎉');
    setTimeout(() => {
      setIsAuthOpen(false);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn">
      <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-[#244C32]/20 overflow-hidden">

        {/* Close Button */}
        <button
          onClick={() => setIsAuthOpen(false)}
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Tabs */}
        <div className="bg-[#FAF8F0] p-6 pb-4 border-b border-gray-100 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#244C32] text-[#E5B83F] flex items-center justify-center mx-auto mb-3 shadow-md">
            <User className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#244C32]">আমার একাউন্ট</h3>
          <p className="text-xs text-gray-500 mt-1">অর্ডার ট্র্যাক ও স্পেশাল অফার পেতে লগইন করুন</p>

          <div className="flex bg-white rounded-xl p-1 border border-gray-200 mt-5">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'login' ? 'bg-[#244C32] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              লগইন করুন
            </button>
            <button
              onClick={() => setTab('register')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${tab === 'register' ? 'bg-[#244C32] text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              নতুন রেজিস্ট্রেশন
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {tab === 'login' ? (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1.5">
                  ফোন নম্বর অথবা ইমেইল
                </label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="017XXXXXXXX বা ইমেইল"
                    className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#244C32]"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-bold text-gray-700">পাসওয়ার্ড</label>
                  <button type="button" className="text-[11px] text-[#8B6E1A] hover:underline">
                    পাসওয়ার্ড ভুলে গেছেন?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-[#244C32]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#244C32] hover:bg-[#1A3824] text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-colors"
              >
                লগইন করুন
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">আপনার পূর্ণ নাম</label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="উদা: আরিফুল ইসলাম"
                  className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">মোবাইল নম্বর</label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="017XXXXXXXX"
                  className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">ইমেইল (ঐচ্ছিক)</label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">পাসওয়ার্ড নির্ধারণ করুন</label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="কমপক্ষে ৬ অক্ষর"
                  className="w-full text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 focus:outline-none focus:border-[#244C32]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#244C32] hover:bg-[#1A3824] text-white py-3.5 rounded-xl text-sm font-bold shadow-md transition-colors mt-2"
              >
                একাউন্ট তৈরি করুন
              </button>
            </form>
          )}

          {/* Social / Demo Button */}
          <div className="mt-6 pt-5 border-t border-gray-100 text-center">
            <span className="text-xs text-gray-400 block mb-3">অথবা ওয়ান-ক্লিকে প্রবেশ করুন</span>
            <button
              onClick={() => {
                setLoggedInUser('ডেমো গ্রাহক');
                showToast('ডেমো একাউন্টে লগইন সম্পন্ন!');
                setIsAuthOpen(false);
              }}
              className="w-full border border-gray-300 hover:bg-gray-50 py-2.5 rounded-xl text-xs font-bold text-gray-700 flex items-center justify-center gap-2 transition-colors"
            >
              <Sparkles className="w-4 h-4 text-[#E5B83F]" />
              <span>গেস্ট হিসেবে চালিয়ে যান (ডেমো লগইন)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
