import Link from 'next/link';
import Logo from './Logo';

export default function Navbar() {
  return (
    <nav className="bg-dk/95 backdrop-blur-md px-10 py-0 flex items-center justify-between sticky top-0 z-50 border-b-2 border-lime/50 h-16 shadow-lg">
      <div className="flex items-center gap-4 animate-fade-in-up">
        <Logo size="small" />
        <div className="font-cormorant-garamond font-bold text-xl text-white">
          Robust <span className="text-lime">Kitchen</span>
          <sup className="text-xs text-gold ml-1">™</sup>
        </div>
      </div>
      <div className="flex gap-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        <Link href="/" className="nav-link active">Home</Link>
        <Link href="/about" className="nav-link">About Us</Link>
        <Link href="/products" className="nav-link">Products</Link>
        <Link href="/community" className="nav-link">Community</Link>
        <Link href="/contact" className="nav-link">Contact</Link>
        <Link href="/contact" className="nav-link cta">Join Now →</Link>
      </div>
    </nav>
  );
}