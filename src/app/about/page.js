'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import AboutIntro from '@/components/AboutIntro';
import WhyExclusive from '@/components/WhyExclusive';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function About() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="min-h-screen">
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      {loadingComplete && (
        <>
          <Navbar />
          {/* Hero section for About page */}
          <section className="relative bg-gradient-to-br from-lime/10 via-cream to-gold/10 py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-6xl font-cormorant font-bold text-dk mb-6">
                About Robust Kitchen
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                India's pioneering therapeutic meal brand, revolutionizing nutrition through
                science-backed, chef-crafted meals that heal from within.
              </p>
            </div>
          </section>
          <AboutIntro />
          <WhyExclusive />
          <Footer />
        </>
      )}
    </div>
  );
}