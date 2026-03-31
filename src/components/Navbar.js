'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from './Logo';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/products', label: 'Products' },
    { href: '/community', label: 'Community' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href) => {
    if (href === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="bg-dk/95 backdrop-blur-md px-4 md:px-10 py-0 flex items-center justify-between sticky top-0 z-50 border-b-2 border-lime/50 h-16 shadow-lg">
      {/* Logo Section - Clickable */}
      <Link href="/" className="flex items-center gap-4 animate-fade-in-up cursor-pointer hover:opacity-80 transition-opacity">
        <Logo size="small" />
        <div className="font-cormorant-garamond font-bold text-xl text-white">
          Robust <span className="text-lime">Kitchen</span>
          <sup className="text-xs text-gold ml-1">™</sup>
        </div>
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex gap-0 animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
          >
            {item.label}
          </Link>
        ))}
        <Link href="/contact" className="nav-link cta">Join Now →</Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="md:hidden text-white p-2 animate-fade-in-up"
        style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        aria-label="Toggle menu"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {isMenuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-dk/98 backdrop-blur-md border-b-2 border-lime/50 md:hidden shadow-lg">
          <div className="flex flex-col py-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-6 py-3 text-white hover:bg-lime/10 transition-colors border-l-4 ${
                  isActive(item.href)
                    ? 'border-lime bg-lime/10 text-lime'
                    : 'border-transparent hover:border-lime/50'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="mx-6 mt-4 bg-lime text-dk px-6 py-3 rounded-lg font-semibold text-center hover:bg-lime/90 transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Now →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}