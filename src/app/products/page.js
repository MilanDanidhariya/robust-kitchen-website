'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Products from '@/components/Products';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function ProductsPage() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="min-h-screen">
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      {loadingComplete && (
        <>
          <Navbar />
          {/* Hero section for Products page */}
          <section className="relative bg-gradient-to-br from-lime/10 via-cream to-gold/10 py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-6xl font-cormorant font-bold text-dk mb-6">
                Our Products
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Discover our range of therapeutic meals, carefully crafted to support your health journey
                with nutrition that nourishes and heals.
              </p>
            </div>
          </section>
          <Products />
          <Footer />
        </>
      )}
    </div>
  );
}