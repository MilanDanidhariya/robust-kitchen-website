export default function Hero() {
  return (
    <section id="home" className="bg-dk py-20 px-0 relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-radial-gradient from-lime/10 to-transparent animate-pulse"></div>
      <div className="max-w-6xl mx-auto px-10 relative w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-in-up">
            <span className="font-jetbrains-mono text-xs uppercase tracking-widest text-lime block mb-4 animate-bounce">India's Therapeutic Kitchen</span>
            <h1 className="font-cormorant-garamond text-5xl lg:text-7xl font-bold leading-tight mb-8 text-white">
              <span className="text-lime animate-pulse">Unleash</span> the Best<br />
              Within You Through<br />
              <span className="text-gold animate-pulse">Nutrition</span>
            </h1>
            <p className="text-white/80 text-lg leading-relaxed mb-8 max-w-lg">
              Robust Kitchen is India's most personalised therapeutic meal brand — powered by in-house dieticians, run by trained chefs, and built on one promise: food that genuinely heals.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm px-4 py-2 rounded-full font-jetbrains-mono hover:bg-white/20 transition-all hover:scale-105 transform cursor-pointer">
                Zero Preservatives
              </span>
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm px-4 py-2 rounded-full font-jetbrains-mono hover:bg-white/20 transition-all hover:scale-105 transform cursor-pointer">
                Dietician Designed
              </span>
              <span className="bg-lime/20 backdrop-blur-sm border border-lime/30 text-lime text-sm px-4 py-2 rounded-full font-jetbrains-mono hover:bg-lime/30 transition-all hover:scale-105 transform cursor-pointer">
                Clean Label
              </span>
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm px-4 py-2 rounded-full font-jetbrains-mono hover:bg-white/20 transition-all hover:scale-105 transform cursor-pointer">
                Now at Kadicare
              </span>
              <span className="bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm px-4 py-2 rounded-full font-jetbrains-mono hover:bg-white/20 transition-all hover:scale-105 transform cursor-pointer">
                Diabetes · PCOD · Gut Health
              </span>
            </div>
            <div className="flex flex-wrap gap-4 mb-12">
              <a href="#join" className="bg-lime text-dk font-bold text-sm px-8 py-4 rounded-lg transition-all hover:bg-lime/90 hover:scale-105 hover:shadow-lg transform animate-pulse shadow-lime/50">
                Start My Meal Plan
              </a>
              <a href="#tracker" className="text-white/90 border-2 border-white/30 text-sm px-8 py-4 rounded-lg transition-all hover:bg-white/10 hover:border-white/50 hover:scale-105 transform">
                Free Health Assessment
              </a>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="font-cormorant-garamond text-4xl font-bold text-lime mb-2">100%</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Preservative Free</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <div className="font-cormorant-garamond text-4xl font-bold text-lime mb-2">3+</div>
                <div className="text-xs uppercase tracking-wider text-white/60">In-House Dieticians</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                <div className="font-cormorant-garamond text-4xl font-bold text-lime mb-2">4</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Clean Products</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
                <div className="font-cormorant-garamond text-4xl font-bold text-lime mb-2">1</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Mission</div>
              </div>
            </div>
          </div>
          <div className="animate-slide-in-right space-y-6">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 transform">
              <div className="bg-gradient-to-br from-light to-border/70 border-2 border-dashed border-lime rounded-xl flex flex-col items-center justify-center text-mid font-jetbrains-mono text-center p-6 h-64">
                <div className="text-3xl mb-2">📸</div>
                <div className="font-bold text-sm text-green">HERO IMAGE — Kadicare Kitchen / Meal Spread</div>
                <div className="text-xs text-muted leading-relaxed mt-2">
                  Overhead shot of fresh therapeutic meal spread at Kadicare<br />
                  1400×900px · WebP · warm natural lighting
                </div>
              </div>
            </div>
            {/* Meal Calculator */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all">
              <div className="font-bold text-lg text-green mb-6">🥗 Live Meal Calorie Calculator — Kadicare</div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-mid mb-2 uppercase tracking-wide">Health Goal</label>
                  <select className="w-full p-3 border-2 border-border rounded-lg text-sm bg-offwhite font-outfit focus:border-lime focus:outline-none transition-all hover:border-lime/50">
                    <option>Weight Loss</option>
                    <option>Diabetes Management</option>
                    <option>PCOD / PCOS</option>
                    <option>Gut Health</option>
                    <option>General Wellness</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-mid mb-2 uppercase tracking-wide">Activity Level</label>
                  <select className="w-full p-3 border-2 border-border rounded-lg text-sm bg-offwhite font-outfit focus:border-lime focus:outline-none transition-all hover:border-lime/50">
                    <option>Sedentary (desk job)</option>
                    <option>Lightly Active</option>
                    <option>Moderately Active</option>
                    <option>Very Active</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-mid mb-2 uppercase tracking-wide">Age</label>
                  <input type="number" placeholder="e.g. 32" className="w-full p-3 border-2 border-border rounded-lg text-sm bg-offwhite font-outfit focus:border-lime focus:outline-none transition-all hover:border-lime/50" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-mid mb-2 uppercase tracking-wide">Weight (kg)</label>
                  <input type="number" placeholder="e.g. 70" className="w-full p-3 border-2 border-border rounded-lg text-sm bg-offwhite font-outfit focus:border-lime focus:outline-none transition-all hover:border-lime/50" />
                </div>
              </div>
              <button className="bg-lime text-dk font-bold text-sm px-6 py-3 rounded-lg w-full hover:bg-lime/90 hover:scale-105 transition-all transform shadow-lg">
                Calculate My Therapeutic Target →
              </button>
              <div className="bg-light rounded-lg p-4 mt-4 text-sm text-green font-semibold border-l-4 border-lime">
                Fill in your details above to get your personalised calorie target.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}