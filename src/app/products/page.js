'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import ProductsLaunch from '@/components/ProductsLaunch';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

// The pre-launch page replaced the old catalogue hero; the original markup is
// preserved below so nothing written by hand is lost.
const SHOW_LEGACY_HERO = false;

export default function ProductsPage() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="min-h-screen">
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      {loadingComplete && (
        <>
          <Navbar />

          {/* Pre-launch hero + sections live in ProductsLaunch */}
          <ProductsLaunch />

          {/* Previous "Our Products" hero — kept, not rendered.
              Flip SHOW_LEGACY_HERO to true to bring it back. */}
          {SHOW_LEGACY_HERO && (
          <section className="relative bg-gradient-to-br from-lime/10 via-cream to-gold/10 py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-6xl font-cormorant font-bold text-dk mb-6">
                Our Products
              </h1>
              {/* <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Discover our range of therapeutic meals, carefully crafted to support your health journey
                with nutrition that nourishes and heals.
              </p> */}
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Every product is developed with input from our in-house clinical dieticians, so you get food that's not just delicious 
                — it's designed around what your body actually needs.
              </p>
            </div>
          </section>
          )}

          <Footer />
        </>
      )}
    </div>
  );
}