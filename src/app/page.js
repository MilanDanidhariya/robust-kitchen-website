'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import IntroVideo from '@/components/IntroVideo';
import AboutIntro from '@/components/AboutIntro';
import WhyExclusive from '@/components/WhyExclusive';
import Testimonials from '@/components/Testimonials';
import Products from '@/components/Products';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function Home() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="min-h-screen">
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      {loadingComplete && (
        <>
          <Navbar />
          <Hero />
          <IntroVideo />
          <AboutIntro />
          <WhyExclusive />
          <Testimonials />
          <Products />
          <Footer />
        </>
      )}
    </div>
  );
}
