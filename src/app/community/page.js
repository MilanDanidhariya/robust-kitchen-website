'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Testimonials from '@/components/Testimonials';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function Community() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="min-h-screen">
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      {loadingComplete && (
        <>
          <Navbar />
          {/* Hero section for Community page */}
          <section className="relative bg-gradient-to-br from-lime/10 via-cream to-gold/10 py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-6xl font-cormorant font-bold text-dk mb-6">
                Our Community
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Join thousands of health-conscious individuals who have transformed their lives
                with Robust Kitchen's therapeutic nutrition solutions.
              </p>
            </div>
          </section>

          {/* Community stats section */}
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <div className="grid md:grid-cols-4 gap-8 text-center">
                <div className="p-6">
                  <div className="text-4xl font-cormorant font-bold text-lime mb-2">10,000+</div>
                  <div className="text-gray-600">Happy Customers</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-cormorant font-bold text-lime mb-2">50+</div>
                  <div className="text-gray-600">Therapeutic Meals</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-cormorant font-bold text-lime mb-2">98%</div>
                  <div className="text-gray-600">Satisfaction Rate</div>
                </div>
                <div className="p-6">
                  <div className="text-4xl font-cormorant font-bold text-lime mb-2">24/7</div>
                  <div className="text-gray-600">Nutrition Support</div>
                </div>
              </div>
            </div>
          </section>

          <Testimonials />

          {/* Community engagement section */}
          <section className="py-20 bg-gradient-to-br from-cream via-white to-cream">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-4xl font-cormorant font-bold text-dk mb-8">
                Join Our Health Revolution
              </h2>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Be part of India's growing community of health-conscious individuals.
                Share your journey, get nutrition advice, and connect with like-minded people.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-lime text-white px-8 py-3 rounded-lg font-semibold hover:bg-lime/90 transition-colors">
                  Start Your Journey
                </button>
                <button className="border-2 border-lime text-lime px-8 py-3 rounded-lg font-semibold hover:bg-lime hover:text-white transition-colors">
                  Share Your Story
                </button>
              </div>
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}