import { Play } from 'lucide-react';

export default function IntroVideo() {
  return (
    <section className="bg-cream py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-lime rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-gold rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-rust rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-10 relative">
        <div className="text-center mb-7 animate-fade-in-up">
          <span className="font-jetbrains-mono text-xs uppercase tracking-widest text-rust block mb-2 animate-slide-in-left" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            See It Live
          </span>
          <h2 className="font-cormorant-garamond text-3xl lg:text-4xl font-bold text-green mb-3 animate-slide-in-right" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            A Day Inside Robust Kitchen at Kadji care
          </h2>
          <p className="text-muted max-w-lg mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            Watch how our dieticians and chefs work together to create therapeutic meals that are changing how Gujarat eats.
          </p>
        </div>

        <div className="bg-gradient-to-br from-dk to-green/80 border-2 border-dashed border-gold rounded-xl flex flex-col items-center justify-center text-gold font-jetbrains-mono text-center p-5 gap-3 max-w-3xl mx-auto h-96 relative group hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
          {/* Hover effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-lime/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

          <div className="relative z-10">
            <Play className="w-16 h-16 mx-auto mb-4 text-gold hover:text-lime transition-colors duration-300" />
            <div className="font-bold text-xs mb-2">EMBED VIDEO — Kadji care Kitchen Brand Film</div>
            <div className="text-xs text-gold/60 leading-relaxed">
              90–120 sec brand video: kitchen, dietician, chef, fresh meals, Kadji care facility<br />
              YouTube iframe or Vimeo embed · Autoplay OFF · 16:9 · Subtitles recommended
            </div>
          </div>

          {/* Animated border effect */}
          <div className="absolute inset-0 rounded-xl border-2 border-lime/30 animate-ping opacity-20"></div>
        </div>
      </div>
    </section>
  );
}