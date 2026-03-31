export default function Footer() {
  return (
    <footer className="bg-dk py-14 px-0 border-t border-lime/18 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-lime rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-16 h-16 bg-gold rounded-full"></div>
      </div>

      <div className="max-w-6xl mx-auto px-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9 mb-10">
          <div className="animate-fade-in-up">
            <div className="font-cormorant-garamond font-bold text-xl text-white mb-2 animate-slide-in-left" style={{ animationDelay: '0.1s', animationFillMode: 'both' }}>
              Robust <span className="text-lime">Kitchen</span>
              <sup className="text-xs text-gold ml-1">™</sup>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
              An Eatrobust Brand. Therapeutic meals designed by in-house dieticians, prepared by trained chefs, and served with one mission — to unleash the best in every person through nutrition. Now serving at Kadicare.
            </p>
            <p className="text-white/40 text-xs font-jetbrains-mono animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              3rd Floor, Shop No. 370, Emerald One Building, Jetalpur Rd, Vadodara, Gujarat 390020
            </p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="text-lime text-xs uppercase tracking-wider font-bold mb-3">Navigate</div>
            <a href="#home" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">Home</a>
            <a href="#about" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">About Us</a>
            <a href="#products" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">Products</a>
            <a href="#community" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">Community</a>
            <a href="#tracker" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">Assessment</a>
            <a href="#join" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">Join Us</a>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <div className="text-lime text-xs uppercase tracking-wider font-bold mb-3">Products</div>
            <a href="#products" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">100% Wheat Bread</a>
            <a href="#products" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">Fortified Bread</a>
            <a href="#products" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">Energy Bar</a>
            <a href="#products" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">Protein Bar</a>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <div className="text-lime text-xs uppercase tracking-wider font-bold mb-3">Connect</div>
            <a href="#" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">WhatsApp Us</a>
            <a href="#" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">Instagram</a>
            <a href="#" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">Facebook</a>
            <a href="#join" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">Book Consultation</a>
            <a href="#tracker" className="block text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300">Free Assessment</a>
          </div>
        </div>

        <div className="border-t border-white/10 pt-4 flex justify-between items-center flex-wrap gap-2 animate-fade-in-up" style={{ animationDelay: '0.7s', animationFillMode: 'both' }}>
          <div className="text-white/40 text-xs font-jetbrains-mono">
            © 2025 Robust Kitchen · An Eatrobust Brand · Gujarat, India · All Rights Reserved
          </div>
          <div className="text-white/40 text-xs font-jetbrains-mono">
            Privacy Policy · Terms of Use · Refund Policy
          </div>
        </div>
      </div>
    </footer>
  );
}