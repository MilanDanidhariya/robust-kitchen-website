'use client';

import Link from 'next/link';

/**
 * CTASection Component
 * Call-to-action section to contact a dietician
 */

export default function CTASection({ showResults }) {
  return (
    // While hidden this block is faded out but still occupies its slot, so it must
    // also be taken out of the tab order and the accessibility tree — otherwise
    // keyboard and screen reader users reach a CTA nobody can see.
    <div
      inert={!showResults}
      aria-hidden={!showResults}
      className="bg-dk rounded-2xl p-6 flex items-center justify-between gap-5 mx-11 mb-9 opacity-0 transform translate-y-2 transition-all duration-400"
      style={{
        opacity: showResults ? 1 : 0,
        visibility: showResults ? 'visible' : 'hidden',
        pointerEvents: showResults ? 'auto' : 'none',
        transform: showResults ? 'translateY(0)' : 'translateY(8px)',
        transitionProperty: 'opacity, transform, visibility',
        transitionDelay: showResults ? '0.2s' : '0s',
      }}
    >
      <div>
        <h3 className="text-lg font-bold font-cormorant text-cream mb-1">
          Want a personalised meal plan?
        </h3>
        <p className="text-sm text-light leading-relaxed">
          Our dieticians at Eatrobust craft therapeutic meals tailored to your body composition.
        </p>
      </div>
      <Link
        href="/contact"
        className="bg-customSalmon text-white px-6 py-3 rounded-lg font-bold text-sm whitespace-nowrap hover:bg-customSalmon/90 active:scale-95 transition-all"
      >
        Talk to a Dietician →
      </Link>
    </div>
  );
}
