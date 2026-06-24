'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import AssessmentForm from '@/components/AssessmentForm';

export default function AssessmentPageOLD() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="min-h-screen">
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      {loadingComplete && (
        <>
          <Navbar />
          
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-lime/10 via-cream to-gold/10 py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <h1 className="text-5xl md:text-6xl font-cormorant font-bold text-dk mb-4">
                Nutritional Health Assessment
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Comprehensive assessment of your nutritional status, meal patterns, and lifestyle habits. Get personalized insights in 5–7 minutes.
              </p>
            </div>
          </section>

          {/* Assessment Section */}
          <section className="py-16 bg-cream">
            <div className="max-w-6xl mx-auto px-4">
              <AssessmentForm />
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}
