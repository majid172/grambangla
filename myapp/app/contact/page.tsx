'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
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
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageCircle, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle, 
  ChevronDown,
  Sparkles,
  Building
} from 'lucide-react';

function ContactContent() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: 'সাধারণ জিজ্ঞাসা',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.message) return;
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: 'সাধারণ জিজ্ঞাসা',
        message: ''
      });
    }, 6000);
  };

  const faqs = [
    {
      q: 'ডেলিভারি পেতে কতদিন সময় লাগে?',
      a: 'ঢাকা মেট্রোপলিটন সিটির ভেতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি সম্পন্ন হয়। ঢাকার বাইরে সমগ্র বাংলাদেশের যেকোনো জেলা বা উপজেলায় ২ থেকে ৩ কার্যদিবসের মধ্যে নির্ভরযোগ্য কুরিয়ারে হোম ডেলিভারি পৌঁছে দেওয়া হয়।'
    },
    {
      q: 'ক্যাশ অন ডেলিভারি (পণ্য দেখে মূল্য পরিশোধ) কি পাওয়া যাবে?',
      a: 'হ্যাঁ! সারা বাংলাদেশের যেকোনো প্রান্ত থেকে ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারবেন। ডেলিভারি ম্যানের সামনে পণ্য দেখে ও নিশ্চিত হয়ে টাকা পরিশোধ করতে পারবেন।'
    },
    {
      q: 'পণ্য পছন্দ না হলে বা ক্ষতিগ্রস্ত হলে রিটার্নের নিয়ম কী?',
      a: 'আমাদের রয়েছে ৭ দিনের শর্তহীন রিটার্ন ও রিফান্ড নীতি। ডেলিভারির সময় বা পণ্য ব্যবহারের ৭ দিনের মধ্যে কোনো কোয়ালিটি ত্রুটি পাওয়া গেলে সম্পূর্ণ ফ্রিতে রিপ্লেসমেন্ট অথবা সম্পূর্ণ মূল্য ফেরত দেওয়া হবে।'
    },
    {
      q: 'কুপন কোড কীভাবে ব্যবহার করব?',
      a: 'কার্ট ড্রয়ার বা চেকআউট পেজে কুপন বক্সে "GRAMBANGLA10" লিখে "প্রয়োগ" বাটনে ক্লিক করলেই আপনার অর্ডারে তাৎক্ষণিক ১০% মূল্য ছাড় যুক্ত হয়ে যাবে।'
    },
    {
      q: 'পাইকারি বা কর্পোরেট অর্ডারের সুযোগ আছে কি?',
      a: 'হ্যাঁ, বিভিন্ন অফিস, প্রতিষ্ঠান ও রিসেলারদের জন্য আমাদের বিশেষ কর্পোরেট প্যাকেজ রয়েছে। সরাসরি আমাদের হটলাইনে (01700-123456) কল করে পাইকারি মূল্যের বিষয়ে কথা বলতে পারেন।'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F0]">
      <Navbar />

      <main className="flex-1 pb-16">
        
        {/* Header Banner */}
        <section className="bg-gradient-to-r from-[#244C32] via-[#1A3824] to-[#2E5F3F] text-white py-12 px-4 sm:px-6 lg:px-8 border-b-4 border-[#E5B83F]">
          <div className="max-w-7xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs text-gray-300 mb-3">
              <Link href="/" className="hover:text-white transition-colors">হোম</Link>
              <ChevronRight className="w-3.5 h-3.5 text-[#E5B83F]" />
              <span className="text-[#E5B83F] font-bold">যোগাযোগ</span>
            </nav>

            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 bg-[#E5B83F] text-[#244C32] text-xs font-black px-3.5 py-1 rounded-full uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>২৪/৭ কাস্টমার সাপোর্ট</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
                যোগাযোগ ও কাস্টমার কেয়ার
              </h1>
              <p className="text-sm sm:text-base text-gray-200 mt-2 font-normal leading-relaxed">
                আমরা আপনার সেবায় নিয়োজিত। অর্ডার, পণ্য সম্পর্কে তথ্য, পাইকারি ক্রয় কিংবা যেকোনো মতামতের জন্য সরাসরি আমাদের সাথে যুক্ত হোন।
              </p>
            </div>
          </div>
        </section>

        {/* 4 Direct Contact Channel Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Hotline Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#244C32]/10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E5B83F]/20 text-[#244C32] flex items-center justify-center mb-4 group-hover:bg-[#E5B83F] transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-[#244C32]">সরাসরি হটলাইন কল</h3>
                <p className="text-xs text-gray-500 mt-1">প্রতিদিন সকাল ৯টা - রাত ১০টা</p>
                <div className="mt-3 space-y-1">
                  <a href="tel:+8801700123456" className="block text-sm font-extrabold text-[#244C32] hover:text-[#8B6E1A]">
                    +880 1700-123456
                  </a>
                  <a href="tel:+8801800654321" className="block text-xs font-bold text-gray-600 hover:text-[#244C32]">
                    +880 1800-654321
                  </a>
                </div>
              </div>
              <a 
                href="tel:+8801700123456"
                className="mt-4 text-xs font-bold text-[#8B6E1A] hover:underline flex items-center gap-1"
              >
                <span>এখনই কল করুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* WhatsApp Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#244C32]/10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-[#25D366] group-hover:text-white transition-colors">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-[#244C32]">হোয়াটসঅ্যাপ সাপোর্ট</h3>
                <p className="text-xs text-gray-500 mt-1">দ্রুত রিপ্লাই ও সরাসরি চ্যাট</p>
                <div className="mt-3">
                  <span className="text-sm font-extrabold text-emerald-700 block">+880 1700-123456</span>
                  <span className="text-xs text-gray-500">অনলাইন আছেন</span>
                </div>
              </div>
              <a 
                href="https://wa.me/8801700123456?text=%E0%A6%B9%E0%A7%8D%E0%A6%AF%E0%A6%BE%E0%A6%B2%E0%A7%8B%20%E0%A6%97%E0%A7%8D%E0%A6%B0%E0%A6%BE%E0%A6%AE%E0%A6%AC%E0%A6%BE%E0%A6%82%E0%A6%B2%E0%A6%BE%2C%20%E0%A6%86%E0%A6%AE%E0%A6%BF%20%E0%A6%95%E0%A6%BF%E0%A6%9B%E0%A7%81%20%E0%A6%A4%E0%A6%A5%E0%A7%8D%E0%A6%AF%20%E0%A6%9C%E0%A6%BE%E0%A6%A8%E0%A6%A4%E0%A7%87%20%E0%A6%9A%E0%A6%BE%E0%A6%87"
                target="_blank"
                rel="noreferrer"
                className="mt-4 text-xs font-bold text-emerald-700 hover:underline flex items-center gap-1"
              >
                <span>চ্যাট শুরু করুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#244C32]/10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4 group-hover:bg-[#E5B83F] group-hover:text-[#244C32] transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-[#244C32]">ইমেইল সাপোর্ট</h3>
                <p className="text-xs text-gray-500 mt-1">যেকোনো সময় ইমেইল পাঠান</p>
                <div className="mt-3 space-y-1">
                  <a href="mailto:support@grambangla.com" className="block text-xs sm:text-sm font-extrabold text-[#244C32] hover:underline truncate">
                    support@grambangla.com
                  </a>
                  <a href="mailto:orders@grambangla.com" className="block text-xs font-bold text-gray-600 hover:underline truncate">
                    orders@grambangla.com
                  </a>
                </div>
              </div>
              <a 
                href="mailto:support@grambangla.com"
                className="mt-4 text-xs font-bold text-[#8B6E1A] hover:underline flex items-center gap-1"
              >
                <span>ইমেইল লিখুন</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Office Hub Card */}
            <div className="bg-white rounded-3xl p-6 border border-[#244C32]/10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4 group-hover:bg-[#244C32] group-hover:text-white transition-colors">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-base text-[#244C32]">কর্পোরেট ও ডিস্ট্রিবিউশন হাব</h3>
                <p className="text-xs text-gray-500 mt-1">ঢাকা প্রধান কার্যালয়</p>
                <p className="mt-3 text-xs text-gray-700 leading-relaxed font-medium">
                  হাউজ #৪২, রোড #১১, ধানমন্ডি, ঢাকা - ১২০৯, বাংলাদেশ
                </p>
              </div>
              <span className="mt-4 text-xs font-bold text-gray-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> শনি - বৃহস্পতি (১০টা - ৭টা)
              </span>
            </div>

          </div>
        </div>

        {/* Main Content: Form & Map Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left: Contact Form (7 cols) */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-[#244C32]/10 shadow-xs">
              <div className="mb-6">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#244C32] bg-[#244C32]/10 px-3 py-1 rounded-full mb-2">
                  <Send className="w-3.5 h-3.5 text-[#E5B83F]" />
                  <span>বার্তা পাঠান</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#244C32]">
                  আমাদের কাছে লিখুন
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  নিচের ফর্মটি পূরণ করে পাঠান। আমাদের কাস্টমার প্রতিনিধি খুব দ্রুত আপনার সাথে যোগাযোগ করবেন।
                </p>
              </div>

              {submitted ? (
                <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center space-y-3 animate-fadeIn">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold text-[#244C32]">ধন্যবাদ, আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!</h3>
                  <p className="text-xs text-gray-600 max-w-sm mx-auto">
                    আমরা আপনার দেওয়া নম্বরে দ্রুত যোগাযোগ করব। যেকোনো জরুরি প্রয়োজনে আমাদের হটলাইনে কল করতে পারেন।
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        আপনার পূর্ণ নাম <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="যেমন: মোঃ তানভীর আহমেদ"
                        className="w-full text-xs sm:text-sm bg-[#FAF8F0] border border-gray-200 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#244C32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        মোবাইল নম্বর <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="017XXXXXXXX"
                        className="w-full text-xs sm:text-sm bg-[#FAF8F0] border border-gray-200 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#244C32]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        ইমেইল অ্যাড্রেস (ঐচ্ছিক)
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="name@example.com"
                        className="w-full text-xs sm:text-sm bg-[#FAF8F0] border border-gray-200 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#244C32]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1.5">
                        বিষয়ের ধরন
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full text-xs sm:text-sm bg-[#FAF8F0] border border-gray-200 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#244C32] font-semibold text-[#244C32]"
                      >
                        <option value="সাধারণ জিজ্ঞাসা">সাধারণ জিজ্ঞাসা</option>
                        <option value="অর্ডার ও ডেলিভারি তথ্য">অর্ডার ও ডেলিভারি তথ্য</option>
                        <option value="পাইকারি ও কর্পোরেট ক্রয়">পাইকারি ও কর্পোরেট ক্রয়</option>
                        <option value="পণ্য পরিবর্তন বা রিটার্ন">পণ্য পরিবর্তন বা রিটার্ন</option>
                        <option value="অভিযোগ বা পরামর্শ">অভিযোগ বা পরামর্শ</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1.5">
                      আপনার বার্তা বা বিস্তারিত তথ্য <span className="text-rose-500">*</span>
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="আপনি কী জানতে বা জানাতে চান বিস্তারিত লিখুন..."
                      className="w-full text-xs sm:text-sm bg-[#FAF8F0] border border-gray-200 rounded-xl px-3.5 py-3 focus:outline-none focus:border-[#244C32]"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto bg-[#244C32] hover:bg-[#1A3824] text-[#FAF8F0] px-8 py-3.5 rounded-2xl text-sm font-bold shadow-md hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <span>বার্তা পাঠান</span>
                    <Send className="w-4 h-4 text-[#E5B83F]" />
                  </button>
                </form>
              )}
            </div>

            {/* Right: Map & Office Info (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Map Container */}
              <div className="bg-white rounded-3xl p-5 border border-[#244C32]/10 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-extrabold text-sm text-[#244C32] flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-[#E5B83F]" />
                    <span>আমাদের প্রধান কার্যালয়ের লোকেশন</span>
                  </h3>
                  <span className="text-[11px] text-gray-500">ধানমন্ডি, ঢাকা</span>
                </div>

                <div className="h-64 sm:h-72 w-full rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                  <iframe
                    title="GramBangla Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14608.036944850388!2d90.3671072!3d23.7470487!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b8b33cffc3fb%3A0x4a826f475fd312af!2sDhanmondi%2C%20Dhaka%201209!5e0!3m2!1sen!2sbd!4v1700000000000!5m2!1sen!2sbd"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                  ></iframe>
                </div>

                <div className="p-3 bg-[#FAF8F0] rounded-xl border border-gray-200 text-xs text-gray-600 space-y-1">
                  <div className="font-bold text-[#244C32]">অফিস পরিদর্শন সময়:</div>
                  <p>শনিবার থেকে বৃহস্পতিবার, সকাল ১০:০০ টা থেকে সন্ধ্যা ৭:০০ টা পর্যন্ত। পার্কিং সুবিধা বিদ্যমান।</p>
                </div>
              </div>

              {/* Purity Guarantee Trust Badge */}
              <div className="bg-gradient-to-br from-[#244C32] to-[#1A3824] text-white p-6 rounded-3xl shadow-md space-y-3 text-xs">
                <div className="flex items-center gap-2 text-[#E5B83F] font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>শতভাগ খাঁটি ও ফ্রেশ পণ্যের অঙ্গীকার</span>
                </div>
                <p className="text-gray-200 leading-relaxed font-normal">
                  আমাদের কাছে গ্রাহকের স্বাস্থ্য ও বিশ্বাস সবার আগে। পণ্যের গুণমান ও বিশুদ্ধতা নিশ্চিত করতে আমরা প্রতিনিয়ত কাজ করছি।
                </p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-[#E5B83F] border-t border-white/10">
                  <span>হটলাইন: 01700-123456</span>
                  <span>সারা দেশে হোম ডেলিভারি</span>
                </div>
              </div>

            </div>

          </div>
        </div>

        {/* FAQ Accordion Section */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#244C32] bg-[#244C32]/10 px-3.5 py-1 rounded-full mb-2">
              <HelpCircle className="w-3.5 h-3.5 text-[#E5B83F]" />
              <span>সাধারণ প্রশ্নোত্তর</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#244C32]">
              গ্রাহকদের সচরাচর জিজ্ঞাসা (FAQ)
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              অর্ডার ও ডেলিভারি সম্পর্কিত সর্বাধিক জিজ্ঞাসিত প্রশ্নাবলীর উত্তর নিচে দেওয়া হলো।
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-[#244C32]/10 overflow-hidden shadow-2xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#244C32] hover:bg-[#FAF8F0] transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#8B6E1A] transition-transform duration-300 shrink-0 ${isOpen ? 'transform rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-3 bg-[#FAF8F0]/50 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
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

export default function ContactPage() {
  return (
    <CartProvider>
      <ContactContent />
    </CartProvider>
  );
}
