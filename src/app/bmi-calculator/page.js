'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import BMICalculator from '../../components/BMICalculator';

/**
 * BMI Calculator Page
 * Main page component for the BMI calculator feature
 */

export default function BMICalculatorPage() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="min-h-screen">
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      {loadingComplete && (
        <>
          <Navbar />
          
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-lime/10 via-cream to-gold/10 py-20">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-6xl font-cormorant font-bold text-dk mb-6">
                BMI Calculator
              </h1>
              <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Discover your Body Mass Index and get personalized health insights from Eatrobust.
              </p>
            </div>
          </section>

          {/* Calculator Section */}
          <section className="py-20 bg-cream">
            <div className="max-w-4xl mx-auto px-4">
              <BMICalculator />
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}
