'use client';

/**
 * HeroBanner Component
 * Hero section for the BMI Calculator page
 */

export default function HeroBanner() {
  return (
    <section className="relative bg-dk py-20 overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-customSalmon/15 -mr-24 -mt-24" />
      <div className="absolute bottom-0 left-1/5 w-32 h-32 rounded-full bg-teal-400/10 -mb-16" />

      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        {/* Tag */}
        <div className="inline-flex items-center gap-1.5 bg-customSalmon/20 border border-customSalmon/40 text-customSalmon text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-4">
          🌿 Eatrobust Tool
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold font-cormorant text-cream mb-4 leading-tight">
          Know Your <em className="italic text-yellow-300">Body</em>
          <br />
          BMI Calculator
        </h1>

        {/* Description */}
        <p className="text-lg text-light max-w-2xl mx-auto leading-relaxed">
          Get your Body Mass Index instantly — and understand what it means for your nutrition journey.
        </p>
      </div>
    </section>
  );
}
