'use client';

import React, { useState } from 'react';
import { CartProvider } from '@/context/CartContext';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import CategorySection from '@/components/CategorySection';
import FeaturedProducts from '@/components/FeaturedProducts';
import ProductionProcess from '@/components/ProductionProcess';
import WhyChooseUs from '@/components/WhyChooseUs';
import PromoBanner from '@/components/PromoBanner';
import Testimonials from '@/components/Testimonials';
import Newsletter from '@/components/Newsletter';
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

function MainShopApp() {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F0] selection:bg-[#E5B83F]/30 selection:text-[#244C32]">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. Category Highlights */}
        <CategorySection
          activeCategory={activeCategory}
          onSelectCategory={(slug) => setActiveCategory(slug)}
        />

        {/* 3. Featured Products Grid & Filter */}
        <FeaturedProducts
          selectedCategory={activeCategory}
          onSelectCategory={(slug) => setActiveCategory(slug)}
        />

        {/* 4. Traditional Production Process (Authentic Craftsmanship) */}
        <ProductionProcess />

        {/* 5. Why Choose GramBangla (Quality & Purity Trust) */}
        <WhyChooseUs />

        {/* 6. Promotional Banner with Coupon */}
        <PromoBanner />

        {/* 7. Customer Reviews & Community Trust */}
        <Testimonials />

        {/* 8. Newsletter Section */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Interactive Elements */}
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

export default function Home() {
  return (
    <CartProvider>
      <MainShopApp />
    </CartProvider>
  );
}

