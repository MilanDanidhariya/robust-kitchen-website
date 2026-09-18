'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import DieticianTeam from '@/components/DieticianTeam';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';

export default function DieticianPage() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <div className="min-h-screen">
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      {loadingComplete && (
        <>
          <Navbar />
          {/* Hero + team + star of the month + CTA all live in DieticianTeam */}
          <DieticianTeam />
          <Footer />
        </>
      )}
    </div>
  );
}
