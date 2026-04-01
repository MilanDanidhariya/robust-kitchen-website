import { Star } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="bg-offwhite py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-16 h-16 bg-lime rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-20 h-20 bg-gold rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-10 relative">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="font-jetbrains-mono text-xs uppercase tracking-widest text-rust block mb-2 animate-slide-in-left" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            Client Stories
          </span>
          <h2 className="font-cormorant-garamond text-3xl lg:text-4xl font-bold text-green mb-6 animate-slide-in-right" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Real People. Real Transformations.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 border border-border group hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold fill-current animate-pulse" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <div className="text-text text-sm italic leading-relaxed mb-3">
              "[Add real client testimonial — 2–3 sentences on health improvement at Kadji care. E.g. diabetes managed, PCOD improved, energy up.]"
            </div>
            <div className="text-green font-bold text-sm">[Client Name]</div>
            <div className="text-muted text-xs">[Condition · City]</div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-border group hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold fill-current animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.1}s` }} />
              ))}
            </div>
            <div className="text-text text-sm italic leading-relaxed mb-3">
              "[Corporate client testimonial — improved employee health and productivity with Robust Kitchen B2B model.]"
            </div>
            <div className="text-green font-bold text-sm">[Organisation Name]</div>
            <div className="text-muted text-xs">[HR / CEO · Company]</div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-border group hover:shadow-lg hover:scale-105 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <div className="flex justify-center mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-gold fill-current animate-pulse" style={{ animationDelay: `${i * 0.1 + 0.2}s` }} />
              ))}
            </div>
            <div className="text-text text-sm italic leading-relaxed mb-3">
              "[Kadji care patient or staff testimonial — quality of food and how it supports daily health and recovery.]"
            </div>
            <div className="text-green font-bold text-sm">[Name]</div>
            <div className="text-muted text-xs">[Patient / Staff · Kadji care]</div>
          </div>
        </div>
      </div>
    </section>
  );
}