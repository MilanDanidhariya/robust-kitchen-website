'use client';

import { useState, useEffect } from 'react';
import Logo from './Logo';
import { Loader2 } from 'lucide-react';

export default function LoadingScreen({ onComplete }) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsVisible(false);
            onComplete();
          }, 500);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-dk via-green/20 to-dk z-50 flex items-center justify-center">
      <div className="text-center relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-lime/10 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-gold/10 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-lime/5 rounded-full animate-bounce" style={{ animationDelay: '0.5s' }}></div>
        </div>

        <div className="animate-bounce mb-8 flex justify-center items-center">
          <Logo size="xl" animated={true} />
        </div>

        <div className="font-cormorant-garamond text-3xl font-bold text-lime mb-4 animate-fade-in-up">
          Robust Kitchen
        </div>
        <div className="text-white/70 text-lg mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
          Therapeutic Meals by Dieticians
        </div>

        {/* Progress bar */}
        <div className="w-64 mx-auto mb-6">
          <div className="bg-white/20 rounded-full h-2 overflow-hidden">
            <div
              className="bg-gradient-to-r from-lime to-gold h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="text-white/60 text-sm mt-2 font-jetbrains-mono">{progress}%</div>
        </div>

        <div className="flex justify-center">
          <Loader2 className="w-8 h-8 text-lime animate-spin" />
        </div>
      </div>
    </div>
  );
}