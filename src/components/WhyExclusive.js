import { Stethoscope, Leaf, Target, Building2, Smartphone, Heart } from 'lucide-react';

export default function WhyExclusive() {
  return (
    <section className="bg-dk py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-lime/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gold/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 bg-lime/10 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-6xl mx-auto px-10 relative">
        <div className="text-center mb-10 animate-fade-in-up">
          <span className="font-jetbrains-mono text-xs uppercase tracking-widest text-lime block mb-2 animate-slide-in-left" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            Our Difference
          </span>
          <h2 className="font-cormorant-garamond text-3xl lg:text-4xl font-bold text-white mb-4 animate-slide-in-right" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Why Robust Kitchen is Exclusive for a Healthy Life
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            We are a complete replacement for the unhealthy lifestyle that is silently damaging your health every day.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-dk/50 border border-lime/20 rounded-xl p-6 text-center group hover:scale-105 hover:border-lime/40 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <Stethoscope className="w-12 h-12 mx-auto mb-3 text-lime group-hover:animate-bounce" />
            <h3 className="font-outfit font-bold text-lime mb-2">In-House Dieticians</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Experienced dieticians customise every meal plan for individuals and organisations. Real clinical expertise, not generic advice.
            </p>
          </div>

          <div className="bg-dk/50 border border-lime/20 rounded-xl p-6 text-center group hover:scale-105 hover:border-lime/40 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <Leaf className="w-12 h-12 mx-auto mb-3 text-lime group-hover:animate-bounce" />
            <h3 className="font-outfit font-bold text-lime mb-2">100% Clean Kitchen</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Zero preservatives. Zero artificial additives. Every ingredient is traceable and chosen for its therapeutic value.
            </p>
          </div>

          <div className="bg-dk/50 border border-lime/20 rounded-xl p-6 text-center group hover:scale-105 hover:border-lime/40 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <Target className="w-12 h-12 mx-auto mb-3 text-lime group-hover:animate-bounce" />
            <h3 className="font-outfit font-bold text-lime mb-2">Built for Your Condition</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Diabetes, PCOD, gut health, thyroid — every meal is mapped to your specific health condition, not just calories.
            </p>
          </div>

          <div className="bg-dk/50 border border-lime/20 rounded-xl p-6 text-center group hover:scale-105 hover:border-lime/40 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            <Building2 className="w-12 h-12 mx-auto mb-3 text-lime group-hover:animate-bounce" />
            <h3 className="font-outfit font-bold text-lime mb-2">Enterprise Kitchen Model</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              We deploy and manage therapeutic kitchens inside your organisation. You run your business. We handle nutrition.
            </p>
          </div>

          <div className="bg-dk/50 border border-lime/20 rounded-xl p-6 text-center group hover:scale-105 hover:border-lime/40 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
            <Smartphone className="w-12 h-12 mx-auto mb-3 text-lime group-hover:animate-bounce" />
            <h3 className="font-outfit font-bold text-lime mb-2">Personal B2C App</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              Dietician recommendations, meal tracking, health updates, and ordering — all in one smart app for individuals.
            </p>
          </div>

          <div className="bg-dk/50 border border-lime/20 rounded-xl p-6 text-center group hover:scale-105 hover:border-lime/40 transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
            <Heart className="w-12 h-12 mx-auto mb-3 text-lime group-hover:animate-bounce" />
            <h3 className="font-outfit font-bold text-lime mb-2">Indian Food, Elevated</h3>
            <p className="text-white/70 text-sm leading-relaxed">
              We do not abandon Indian flavours. We make them therapeutically powerful — warm, familiar, and clinically right.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}