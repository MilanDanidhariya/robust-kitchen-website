'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import IntroVideo from '@/components/IntroVideo';
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
          {/* Call-to-action section for other pages */}
          <section className="py-20 bg-gradient-to-br from-cream via-white to-cream">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-cormorant font-bold text-dk mb-8">
                Discover More About Robust Kitchen
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-lime rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-cormorant font-semibold text-dk mb-2">Our Story</h3>
                  <p className="text-gray-600 mb-4">Learn about our mission to revolutionize therapeutic nutrition in India.</p>
                  <a href="/about" className="text-lime hover:text-gold font-semibold transition-colors">Learn More →</a>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-lime rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-cormorant font-semibold text-dk mb-2">Our Products</h3>
                  <p className="text-gray-600 mb-4">Explore our range of therapeutic meal solutions.</p>
                  <a href="/products" className="text-lime hover:text-gold font-semibold transition-colors">View Products →</a>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-lime rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  {/* <h3 className="text-xl font-cormorant font-semibold text-dk mb-2">Community</h3> */}
                  <h3 className="text-xl font-cormorant font-semibold text-dk mb-2">Eatrobust</h3>
                  <p className="text-gray-600 mb-4">Join our community of health-conscious individuals.</p>
                  <a href="/community" className="text-lime hover:text-gold font-semibold transition-colors">Join Community →</a>
                </div>
              </div>
            </div>
          </section>
          <Footer />
        </>
      )}
    </div>
  );
}
