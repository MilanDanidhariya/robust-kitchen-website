import { Wheat, Sandwich, Zap, Dumbbell, Play } from 'lucide-react';

export default function Products() {
  return (
    <section id="products" className="bg-cream py-20 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 right-10 w-24 h-24 bg-lime rounded-full"></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 bg-gold rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-rust rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-10 relative">
        <div className="text-center mb-12 animate-fade-in-up">
          <span className="font-jetbrains-mono text-xs uppercase tracking-widest text-rust block mb-2 animate-slide-in-left" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
            Our Products
          </span>
          <h2 className="font-cormorant-garamond text-3xl lg:text-4xl font-bold text-green mb-4 animate-slide-in-right" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
            Food You Can Trust. <em className="text-rust">Ingredients You Can Read.</em>
          </h2>
          <p className="text-muted max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            Every Robust Kitchen product is preservative-free, dietician-formulated, and designed for people managing diabetes, PCOD, gut health, and daily wellness. Available online.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl overflow-hidden border border-border transition-all hover:shadow-xl hover:-translate-y-2 hover:scale-105 duration-300 animate-fade-in-up group" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="h-48 bg-gradient-to-br from-light to-border/70 border-2 border-dashed border-lime rounded-t-xl flex flex-col items-center justify-center text-mid font-jetbrains-mono text-center p-4 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-lime/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
              <Wheat className="w-12 h-12 mx-auto mb-2 text-mid hover:text-lime transition-colors duration-300" />
              <div className="font-bold text-xs text-green mt-2 relative z-10">100% Wheat Bread</div>
              <div className="text-xs text-muted leading-relaxed mt-1 relative z-10">
                500×400px · WebP
              </div>
            </div>
            <div className="p-5">
              <div className="font-cormorant-garamond text-lg font-bold text-green mb-2">100% Wheat Bread</div>
              <div className="text-sm text-muted leading-relaxed mb-3">
                Pure whole wheat, slow-fermented for better gut digestibility and lower glycaemic impact. No maida, no preservatives — ever.
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="bg-tag-bg text-green text-xs px-2 py-1 rounded-full">Zero Preservatives</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Low GI</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Diabetic Friendly</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Gut Friendly</span>
              </div>
              {/* <button className="bg-lime text-dk font-bold text-sm px-4 py-2 rounded w-full hover:bg-lime/90 hover:scale-105 transition-all duration-300 shadow-lg"> */}
              <button className="bg-customSalmon text-white font-bold text-sm px-4 py-2 rounded w-full hover:bg-customSalmon/90 hover:scale-105 transition-all duration-300 shadow-lg">
                Order Now
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-border transition-all hover:shadow-xl hover:-translate-y-2 hover:scale-105 duration-300 animate-fade-in-up group" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <div className="h-48 bg-gradient-to-br from-light to-border/70 border-2 border-dashed border-lime rounded-t-xl flex flex-col items-center justify-center text-mid font-jetbrains-mono text-center p-4 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-lime/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
              <Sandwich className="w-12 h-12 mx-auto mb-2 text-mid hover:text-lime transition-colors duration-300" />
              <div className="font-bold text-xs text-green mt-2 relative z-10">Fortified Bread</div>
              <div className="text-xs text-muted leading-relaxed mt-1 relative z-10">
                500×400px · WebP
              </div>
            </div>
            <div className="p-5">
              <div className="font-cormorant-garamond text-lg font-bold text-green mb-2">Fortified Bread</div>
              <div className="text-sm text-muted leading-relaxed mb-3">
                Enriched with iron, folate, B12, Vitamin D, and zinc — targeting the most common nutritional deficiencies in Indian women and active adults.
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="bg-tag-bg text-green text-xs px-2 py-1 rounded-full">Iron + Folate + B12</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">PCOD Support</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Zero Preservatives</span>
              </div>
              <button className="bg-customSalmon text-white font-bold text-sm px-4 py-2 rounded w-full hover:bg-customSalmon/90 hover:scale-105 transition-all duration-300 shadow-lg">
                Order Now
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-border transition-all hover:shadow-xl hover:-translate-y-2 hover:scale-105 duration-300 animate-fade-in-up group" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <div className="h-48 bg-gradient-to-br from-light to-border/70 border-2 border-dashed border-lime rounded-t-xl flex flex-col items-center justify-center text-mid font-jetbrains-mono text-center p-4 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-lime/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
              <Zap className="w-12 h-12 mx-auto mb-2 text-mid hover:text-lime transition-colors duration-300" />
              <div className="font-bold text-xs text-green mt-2 relative z-10">Energy Bar</div>
              <div className="text-xs text-muted leading-relaxed mt-1 relative z-10">
                500×400px · WebP
              </div>
            </div>
            <div className="p-5">
              <div className="font-cormorant-garamond text-lg font-bold text-green mb-2">Energy Bar</div>
              <div className="text-sm text-muted leading-relaxed mb-3">
                Complex carbs + natural energy sources for sustained, steady energy all day — no blood sugar spike or crash from conventional bars.
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">No Refined Sugar</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Sustained Energy</span>
                <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">Diabetic Safe</span>
              </div>
              <button className="bg-customSalmon text-white font-bold text-sm px-4 py-2 rounded w-full hover:bg-customSalmon/90 hover:scale-105 transition-all duration-300 shadow-lg">
                Order Now
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl overflow-hidden border border-border transition-all hover:shadow-xl hover:-translate-y-2 hover:scale-105 duration-300 animate-fade-in-up group" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
            <div className="h-48 bg-gradient-to-br from-light to-border/70 border-2 border-dashed border-lime rounded-t-xl flex flex-col items-center justify-center text-mid font-jetbrains-mono text-center p-4 relative">
              <div className="absolute inset-0 bg-gradient-to-br from-lime/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-xl"></div>
              <Dumbbell className="w-12 h-12 mx-auto mb-2 text-mid hover:text-lime transition-colors duration-300" />
              <div className="font-bold text-xs text-green mt-2 relative z-10">Protein Bar</div>
              <div className="text-xs text-muted leading-relaxed mt-1 relative z-10">
                500×400px · WebP
              </div>
            </div>
            <div className="p-5">
              <div className="font-cormorant-garamond text-lg font-bold text-green mb-2">Protein Bar</div>
              <div className="text-sm text-muted leading-relaxed mb-3">
                High protein, no artificial powder, no hidden sugar. Clean-source protein for muscle recovery, satiety, and metabolic health.
              </div>
              <div className="flex flex-wrap gap-1 mb-4">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">High Protein</span>
                <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">No Added Sugar</span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">PCOD Friendly</span>
              </div>
              <button className="bg-customSalmon text-white font-bold text-sm px-4 py-2 rounded w-full hover:bg-customSalmon/90 hover:scale-105 transition-all duration-300 shadow-lg">
                Order Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
          <div className="bg-gradient-to-br from-dk to-green/80 border-2 border-dashed border-gold rounded-xl flex flex-col items-center justify-center text-gold font-jetbrains-mono text-center p-8 max-w-2xl mx-auto relative group hover:scale-105 transition-transform duration-300">
            {/* Hover effect overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-lime/10 to-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>

            <div className="relative z-10">
              <Play className="w-16 h-16 mx-auto mb-4 text-gold hover:text-lime transition-colors duration-300" />
              <div className="font-bold text-xs mt-2">VIDEO — Product Range Showcase</div>
              <div className="text-xs text-gold/60 leading-relaxed mt-1">
                60 sec showing all 4 products · ingredients in frame · "Made in our clean kitchen" theme<br />
                No background music that drowns the visual · Subtitles on
              </div>
            </div>

            {/* Animated border effect */}
            <div className="absolute inset-0 rounded-xl border-2 border-lime/30 animate-ping opacity-20"></div>
          </div>
        </div>

        <div className="bg-dk rounded-xl p-8 mt-12 border-l-4 border-lime animate-fade-in-up relative overflow-hidden" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
          {/* Background shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-lime/5 to-transparent animate-shimmer"></div>

          <div className="relative z-10">
            <h3 className="font-cormorant-garamond text-xl font-bold text-lime mb-3">Our Promise on Every Product</h3>
            <p className="text-white/70 leading-relaxed">
              No preservatives — ever. No artificial colours, flavours, or additives. Every product is dietician-formulated and made in our clean Robust Kitchen. What you see on the label is exactly what is inside.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}