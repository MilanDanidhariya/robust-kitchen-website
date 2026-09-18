import Link from 'next/link';
import { CalendarCheck, ClipboardCheck } from 'lucide-react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './SocialIcons';

// Public profiles. Leave a value empty and that entry is simply not rendered,
// so the footer never ships a link that goes nowhere.
const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/916351096511',
  instagram: 'https://instagram.com/eatrobust',
  facebook: 'https://facebook.com/eatrobust',
};

const NAVIGATE_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/products', label: 'Products' },
  { href: '/community', label: 'Community' },
  { href: '/assessment', label: 'Assessment' },
  { href: '/contact', label: 'Join Us' },
];

const PRODUCT_LINKS = [
  { href: '/products', label: '100% Wheat Bread' },
  { href: '/products', label: 'Fortified Wheat Bread' },
  { href: '/products', label: 'Energy Bar' },
  { href: '/products', label: 'Protein Bar' },
];

const CONNECT_LINKS = [
  { href: SOCIAL_LINKS.whatsapp, label: 'WhatsApp Us', external: true, Icon: WhatsAppIcon },
  { href: SOCIAL_LINKS.instagram, label: 'Instagram', external: true, Icon: InstagramIcon },
  { href: SOCIAL_LINKS.facebook, label: 'Facebook', external: true, Icon: FacebookIcon },
  { href: '/contact', label: 'Book Consultation', Icon: CalendarCheck },
  { href: '/assessment', label: 'Free Assessment', Icon: ClipboardCheck },
].filter((link) => link.href);

const linkClass =
  'flex items-center gap-2 text-white/60 text-sm mb-2 hover:text-lime hover:translate-x-1 transition-all duration-300';

function FooterLink({ href, label, external, Icon }) {
  const content = (
    <>
      {Icon && <Icon className="w-4 h-4 shrink-0" />}
      <span>{label}</span>
    </>
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={linkClass}>
      {content}
    </Link>
  );
}

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
              An Eatrobust Brand. Therapeutic meals designed by in-house dieticians, prepared by trained chefs, and served with one mission — to unleash the best in every person through nutrition. Now serving at Kadji care.
            </p>
            <p className="text-white/40 text-xs font-jetbrains-mono animate-fade-in-up" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
              9, Vitthal Nagar society, karelibaug, Vadodara, Gujarat 390018
            </p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
            <div className="text-lime text-xs uppercase tracking-wider font-bold mb-3">Navigate</div>
            {NAVIGATE_LINKS.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s', animationFillMode: 'both' }}>
            <div className="text-lime text-xs uppercase tracking-wider font-bold mb-3">Products</div>
            {PRODUCT_LINKS.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            <div className="text-lime text-xs uppercase tracking-wider font-bold mb-3">Connect</div>
            {CONNECT_LINKS.map((link) => (
              <FooterLink key={link.label} {...link} />
            ))}
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