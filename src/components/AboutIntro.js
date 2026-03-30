import { Camera } from 'lucide-react';

export default function AboutIntro() {
  return (
    <section className="bg-offwhite py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 right-20 w-24 h-24 bg-lime rounded-full"></div>
        <div className="absolute bottom-20 left-20 w-18 h-18 bg-gold rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="animate-slide-in-left">
            <span className="font-jetbrains-mono text-xs uppercase tracking-widest text-rust block mb-2 animate-fade-in-up" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              Who We Are
            </span>
            <h2 className="font-cormorant-garamond text-3xl lg:text-4xl font-bold text-green mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              A Kitchen Built on One Belief: <em className="text-rust">Food is Medicine.</em>
            </h2>
            <p className="text-text text-lg leading-relaxed mb-4 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              Robust Kitchen is not a restaurant. It is a therapeutic nutrition ecosystem — where every meal is clinically designed, every ingredient is clean, and every plate serves a health purpose.
            </p>
            <p className="text-muted leading-relaxed mb-6 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
              Our in-house team of experienced dieticians and trained chefs work under one roof to create meals that address real health conditions — diabetes, PCOD, gut disorders, thyroid — with food that is preservative-free, fresh, and deeply rooted in Indian culinary tradition.
            </p>
            <p className="text-muted leading-relaxed mb-8 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
              Currently serving at <strong className="text-green">Kadicare</strong>, and expanding across Gujarat through our B2B enterprise kitchen model, B2C app, and clean-label product range.
            </p>
            <div className="flex flex-wrap gap-3 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
              <a href="#about" className="bg-lime text-dk font-bold text-sm px-6 py-3 rounded-lg hover:bg-lime/90 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Our Story
              </a>
              <a href="#join" className="text-green border-2 border-green text-sm px-6 py-3 rounded-lg hover:bg-green hover:text-white hover:scale-105 transition-all duration-300">
                Partner With Us
              </a>
            </div>
          </div>

          <div className="animate-slide-in-right">
            <div className="bg-gradient-to-br from-light to-border/70 border-2 border-dashed border-lime rounded-xl flex flex-col items-center justify-center text-mid font-jetbrains-mono text-center p-5 gap-3 h-80 relative group hover:scale-105 transition-transform duration-300 animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-lime/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

              <div className="relative z-10">
                <Camera className="w-12 h-12 mx-auto mb-2 text-mid hover:text-lime transition-colors duration-300" />
                <div className="font-bold text-xs text-green mb-2">IMAGE — Kitchen Team Photo</div>
                <div className="text-xs text-muted leading-relaxed">
                  Chef + Dietician in Robust Kitchen environment<br />
                  Warm lighting · natural backdrop · 800×700px
                </div>
              </div>

              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-xl border-2 border-gold/30 animate-ping opacity-20"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}