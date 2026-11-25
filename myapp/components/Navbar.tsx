'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import {
  Search,
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  PhoneCall,
  Truck,
  ShieldCheck,
  Leaf,
  Sparkles,
  ChevronRight
} from 'lucide-react';

export default function Navbar() {
  const {
    cartCount,
    wishlistCount,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsSearchOpen,
    setIsAuthOpen
  } = useCart();

  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'হোম', href: '/' },
    { name: 'শপ', href: '/shop' },
    { name: 'ক্যাটাগরি', href: '/categories' },
    { name: 'কেন শিকড়', href: '/#why-us' },
    { name: 'গ্রাহক মতামত', href: '/#reviews' },
    { name: 'যোগাযোগ', href: '/contact' },
  ];

  return (
    <header className="w-full sticky top-0 z-40 transition-all duration-300">
      {/* Top Announcement Bar */}
      <div className="bg-[#244C32] text-[#FAF8F0] text-xs py-2 px-4 border-b border-[#E5B83F]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center gap-1 bg-[#E5B83F] text-[#244C32] px-2 py-0.5 rounded-full text-[11px] font-bold">
              <Sparkles className="w-3 h-3" /> অফার
            </span>
            <span>কুপন <strong className="text-[#E5B83F] tracking-wide">Shikor10</strong> দিয়ে পান যেকোনো অর্ডারে ১০% ছাড়!</span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-gray-200">
            <span className="flex items-center gap-1.5 hover:text-[#E5B83F] transition-colors">
              <Truck className="w-3.5 h-3.5 text-[#E5B83F]" /> সারা বাংলাদেশে হোম ডেলিভারি
            </span>
            <span className="flex items-center gap-1.5 hover:text-[#E5B83F] transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-[#E5B83F]" /> ১০০% খাঁটি পণ্যের নিশ্চয়তা
            </span>
            <a
              href="tel:+8801312617206"
              className="flex items-center gap-1.5 font-semibold text-[#E5B83F] hover:underline"
            >
              <PhoneCall className="w-3.5 h-3.5" /> 01312617206
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        className={`w-full transition-all duration-300 ${isScrolled
          ? 'bg-[#FAF8F0]/95 backdrop-blur-md shadow-md py-3 border-b border-[#244C32]/10'
          : 'bg-[#FAF8F0] py-4 border-b border-[#244C32]/5'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#244C32] flex items-center justify-center text-[#E5B83F] shadow-md group-hover:scale-105 transition-transform duration-300">
                <Leaf className="w-6 h-6 transform -rotate-12" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-2xl sm:text-2xl tracking-tight text-[#244C32]">
                    শিকড়
                  </span>
                  <span className="text-xs bg-[#E5B83F]/30 text-[#244C32] font-bold px-1.5 py-0.5 rounded">
                    অর্গানিক
                  </span>
                </div>
                <span className="text-[11px] text-[#252B25]/80 font-medium tracking-wide">
                  খাঁটি খাবার, বাংলার স্বাদ
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-sm font-semibold text-[#252B25] hover:text-[#244C32] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#E5B83F] hover:after:w-full after:transition-all after:duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Right Action Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2.5 rounded-full hover:bg-[#244C32]/10 text-[#244C32] transition-colors"
                title="পণ্য খুঁজুন"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2.5 rounded-full hover:bg-[#244C32]/10 text-[#244C32] transition-colors"
                title="পছন্দের তালিকা"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlistCount > 0 && (
                  <span className="absolute 1 top-1 right-1 w-4 h-4 bg-[#E5B83F] text-[#244C32] text-[10px] font-bold rounded-full flex items-center justify-center shadow-sm">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* User Account Button */}
              <button
                onClick={() => setIsAuthOpen(true)}
                className="p-2.5 rounded-full hover:bg-[#244C32]/10 text-[#244C32] transition-colors"
                title="আমার একাউন্ট"
                aria-label="Account"
              >
                <User className="w-5 h-5" />
              </button>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2.5 rounded-full bg-[#244C32]/10 hover:bg-[#244C32] text-[#244C32] hover:text-[#FAF8F0] transition-all duration-300"
                title="শপিং ব্যাগ"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#E5B83F] text-[#244C32] text-xs font-black rounded-full flex items-center justify-center shadow-md animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Prominent Shop Now CTA */}
              <Link
                href="/shop"
                className="hidden sm:inline-flex items-center gap-1.5 bg-[#244C32] hover:bg-[#1A3824] text-[#FAF8F0] px-4 py-2 rounded-xl text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>অর্ডার করুন</span>
                <ChevronRight className="w-4 h-4 text-[#E5B83F]" />
              </Link>

              {/* Mobile Menu Hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl hover:bg-[#244C32]/10 text-[#244C32] transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Slide-down Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F0] border-t border-[#244C32]/10 px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <div className="space-y-1 py-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 rounded-xl text-base font-semibold text-[#252B25] hover:bg-[#244C32]/10 hover:text-[#244C32] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-[#244C32]/10 flex flex-col gap-3">
              <Link
                href="/shop"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-[#244C32] text-[#FAF8F0] py-3 rounded-xl font-bold shadow-md flex items-center justify-center gap-2"
              >
                <span>সব পণ্য দেখুন</span>
                <ChevronRight className="w-4 h-4 text-[#E5B83F]" />
              </Link>
              <div className="text-center text-xs text-gray-500">
                জরুরি প্রয়োজনে কল করুন: <a href="tel:+8801312617206" className="text-[#244C32] font-bold">01312617206</a>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
