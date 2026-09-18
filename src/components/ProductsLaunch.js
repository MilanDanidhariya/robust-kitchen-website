import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Zap, Dumbbell, Bell, Leaf, Stethoscope, FlaskConical } from 'lucide-react';
import { buildContactHref } from '@/utils/contactSubjects';

/**
 * ProductsLaunch Component
 * Pre-launch products page — the range is not on sale yet, so every CTA
 * collects interest instead of selling, deep-linking into the contact form
 * with "Product Inquiry" preselected.
 *
 * Products with photography lead the grid; the rest use an icon card until
 * their shots exist. Copy and tags carried over from the original Products.js.
 */

const UPCOMING_PRODUCTS = [
  {
    name: 'Watermelon Multivitamin Jam',
    tagline: 'Naturally enriched with everyday vitamins and minerals.',
    description:
      'A delicious watermelon jam naturally enriched with essential vitamins and minerals to support everyday nutrition. Made without artificial colours or preservatives.',
    image: '/images/products/watermelon-multivitamin-jam.jpeg',
    tags: [
      { label: 'Vitamins A, B1, B3 & E', className: 'bg-red-100 text-red-800' },
      { label: 'Calcium + Iron', className: 'bg-green-100 text-green-800' },
      { label: 'Zinc & Magnesium', className: 'bg-blue-100 text-blue-800' },
      { label: 'No Preservatives', className: 'bg-yellow-100 text-yellow-800' },
    ],
  },
  {
    name: 'Pineapple Multivitamin Jam',
    tagline: 'Tropical flavour, fortified for everyday nutrition.',
    description:
      'A tropical pineapple jam fortified with essential vitamins and minerals, delivering great taste and everyday nutrition without artificial colours or preservatives.',
    image: '/images/products/pineapple-multivitamin-jam.jpeg',
    tags: [
      { label: 'Vitamins A, B1, B3 & E', className: 'bg-yellow-100 text-yellow-800' },
      { label: 'Calcium + Iron', className: 'bg-green-100 text-green-800' },
      { label: 'Zinc & Magnesium', className: 'bg-blue-100 text-blue-800' },
      { label: 'No Preservatives', className: 'bg-orange-100 text-orange-800' },
    ],
  },
  {
    name: '100% Whole Wheat Bread',
    tagline: 'Clean, everyday nutrition without the preservatives.',
    description:
      'Freshly baked whole wheat bread made with simple, wholesome ingredients including whole wheat flour, olive oil, honey, and yeast. Soft, nutritious, and free from artificial preservatives.',
    image: '/images/products/whole-wheat-bread.jpeg',
    tags: [
      { label: '100% Whole Wheat', className: 'bg-amber-100 text-amber-800' },
      { label: 'No Preservatives', className: 'bg-green-100 text-green-800' },
      { label: 'High Fibre', className: 'bg-yellow-100 text-yellow-800' },
      { label: 'Freshly Baked', className: 'bg-orange-100 text-orange-800' },
    ],
  },
  {
    name: 'Fortified Wheat Bread',
    hidden: true, // no photography yet — hidden from the grid, data kept
    tagline: 'Everyday bread, enhanced for your daily needs.',
    description:
      'Enriched with iron, folate, B12, Vitamin D, and zinc — targeting the most common nutritional deficiencies in Indian women and active adults.',
    Icon: ShieldCheck,
    tags: [
      { label: 'Iron + Folate + B12', className: 'bg-green-100 text-green-800' },
      { label: 'PCOD Support', className: 'bg-yellow-100 text-yellow-800' },
      { label: 'Zero Preservatives', className: 'bg-blue-100 text-blue-800' },
    ],
  },
  {
    name: 'Energy Bar',
    hidden: true, // no photography yet — hidden from the grid, data kept
    tagline: 'Sustained energy, without the sugar crash.',
    description:
      'Complex carbs + natural energy sources for sustained, steady energy all day — no blood sugar spike or crash from conventional bars.',
    Icon: Zap,
    tags: [
      { label: 'No Refined Sugar', className: 'bg-green-100 text-green-800' },
      { label: 'Sustained Energy', className: 'bg-yellow-100 text-yellow-800' },
      { label: 'Diabetic Safe', className: 'bg-red-100 text-red-800' },
    ],
  },
  {
    name: 'Protein Bar',
    hidden: true, // no photography yet — hidden from the grid, data kept
    tagline: 'Clinically-informed nutrition, built for active lifestyles.',
    description:
      'High protein, no artificial powder, no hidden sugar. Clean-source protein for muscle recovery, satiety, and metabolic health.',
    Icon: Dumbbell,
    tags: [
      { label: 'High Protein', className: 'bg-green-100 text-green-800' },
      { label: 'No Added Sugar', className: 'bg-yellow-100 text-yellow-800' },
      { label: 'PCOD Friendly', className: 'bg-orange-100 text-orange-800' },
    ],
  },
];

// Products without photography are hidden for now — flip `hidden` to show them again.
const VISIBLE_PRODUCTS = UPCOMING_PRODUCTS.filter((product) => !product.hidden);

const DIFFERENTIATORS = [
  {
    Icon: Stethoscope,
    title: 'Clinical expertise first',
    body: 'Formulations start with our in-house dieticians, not with a flavour brief.',
  },
  {
    Icon: Leaf,
    title: 'Ingredients you can read',
    body: 'No preservatives, no filler chemistry — just food you can pronounce.',
  },
  {
    Icon: FlaskConical,
    title: 'Built for real outcomes',
    body: 'Designed to support your everyday nutrition, not just satisfy hunger.',
  },
];

function ProductCard({ product, index }) {
  const { name, tagline, description, image, Icon, tags } = product;

  return (
    <div
      className="bg-white rounded-xl overflow-hidden border border-border transition-all hover:shadow-xl hover:-translate-y-2 duration-300 animate-fade-in-up group flex h-full flex-col"
      style={{ animationDelay: `${0.4 + index * 0.1}s`, animationFillMode: 'both' }}
    >
      {image ? (
        // Natural height: the label fills the card width edge to edge with no side
        // gaps and nothing cropped, so every nutrition callout stays readable.
        <div className="overflow-hidden bg-white">
          <Image
            src={image}
            alt={name}
            width={500}
            height={500}
            priority={index === 0}
            className="w-full h-auto transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      ) : (
        // No photography for this one yet — a branded icon card stands in.
        <div className="h-56 bg-gradient-to-br from-cream to-light flex flex-col items-center justify-center gap-3 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-hero-coral/10 to-hero-yellow/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="w-16 h-16 rounded-2xl bg-white/80 flex items-center justify-center shadow-sm relative z-10">
            <Icon className="w-8 h-8 text-hero-coral" strokeWidth={1.7} />
          </div>
          <span className="font-jetbrains-mono text-[10px] uppercase tracking-[0.2em] text-muted relative z-10">
            Photo coming soon
          </span>
        </div>
      )}

      <div className="p-5 flex flex-1 flex-col">
        <h3 className="font-cormorant-garamond text-xl font-bold text-green mb-1">{name}</h3>
        <p className="text-hero-coral text-sm font-semibold mb-2">{tagline}</p>
        <p className="text-sm text-muted leading-relaxed mb-3">{description}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag) => (
            <span key={tag.label} className={`${tag.className} text-xs px-2 py-1 rounded-full`}>
              {tag.label}
            </span>
          ))}
        </div>

        <Link
          href={buildContactHref('product', name)}
          className="mt-auto text-center bg-customSalmon text-white font-bold text-sm px-4 py-2.5 rounded w-full hover:bg-customSalmon/90 hover:scale-105 transition-all duration-300 shadow-lg"
        >
          I&apos;m Interested
        </Link>
      </div>
    </div>
  );
}

export default function ProductsLaunch() {
  return (
    <>
      {/* Section 1 — Hero */}
      <section className="relative overflow-hidden bg-hero-ivory py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(240,120,108,0.10),transparent_30%),radial-gradient(circle_at_82%_80%,rgba(252,228,84,0.16),transparent_32%)]"></div>

        <div className="max-w-5xl mx-auto px-6 md:px-10 relative text-center">
          <div className="inline-flex items-center gap-2 bg-hero-coral/12 border border-hero-coral/35 text-hero-coral text-xs font-bold uppercase tracking-[0.25em] px-4 py-2 rounded-full mb-7 animate-fade-in-up">
            <Bell className="w-3.5 h-3.5" />
            Launching Soon
          </div>

          <h1
            className="font-cormorant-garamond text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] text-hero-ink mb-6 animate-fade-in-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            Something Healthier<br />
            Is <span className="text-hero-coral">Coming.</span>
          </h1>

          <div
            className="h-1.5 w-56 max-w-full bg-hero-yellow mx-auto mb-8 animate-fade-in-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          ></div>

          <p
            className="text-hero-stone text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 animate-fade-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            Robust Kitchen is launching clinical dietician-formulated, preservative-free foods —
            built to support your everyday nutrition and wellness. Be the first to know when we launch.
          </p>

          <Link
            href={buildContactHref('product')}
            className="inline-flex items-center gap-2 bg-hero-coral text-white font-bold text-sm px-8 py-4 rounded-lg transition-all hover:bg-hero-coral/90 hover:scale-105 hover:shadow-lg transform animate-fade-in-up"
            style={{ animationDelay: '0.4s', animationFillMode: 'both' }}
          >
            <Bell className="w-4 h-4" />
            Notify Me When We Launch
          </Link>
        </div>
      </section>

      {/* Section 2 — What's Coming */}
      <section className="bg-cream py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 right-10 w-24 h-24 bg-lime rounded-full"></div>
          <div className="absolute bottom-10 left-10 w-20 h-20 bg-gold rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
          <div className="text-center mb-14">
            <span className="font-jetbrains-mono text-xs uppercase tracking-[0.3em] text-hero-rose block mb-3">
              What&apos;s Coming
            </span>
            <h2 className="font-cormorant-garamond text-4xl md:text-5xl font-bold text-dk leading-tight">
              Food You Can Trust.<br className="hidden sm:block" /> Ingredients You Can Read.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VISIBLE_PRODUCTS.map((product, index) => (
              <ProductCard key={product.name} product={product} index={index} />
            ))}
          </div>

          {/* Our Promise */}
          <div
            className="bg-dk rounded-xl p-8 mt-12 border-l-4 border-lime animate-fade-in-up relative overflow-hidden"
            style={{ animationDelay: '0.9s', animationFillMode: 'both' }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-lime/5 to-transparent animate-shimmer"></div>

            <div className="relative z-10">
              <h3 className="font-cormorant-garamond text-xl font-bold text-lime mb-3">
                Our Promise on Every Product
              </h3>
              <p className="text-white/70 leading-relaxed">
                No preservatives — ever. No artificial colours, flavours, or additives. Every product
                is dietician-formulated and made in our clean Robust Kitchen. What you see on the
                label is exactly what is inside.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 — Why It's Different */}
      <section className="bg-dk py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-hero-coral/10 -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-1/4 w-40 h-40 rounded-full bg-hero-yellow/10 -mb-20"></div>

        <div className="max-w-5xl mx-auto px-6 md:px-10 relative">
          <div className="text-center mb-14">
            <span className="font-jetbrains-mono text-xs uppercase tracking-[0.3em] text-hero-yellow block mb-3">
              Why It&apos;s Different
            </span>
            <h2 className="font-cormorant-garamond text-4xl md:text-5xl font-bold text-cream leading-tight mb-6">
              Formulated by Dieticians,<br className="hidden sm:block" /> Not Just Food Scientists.
            </h2>
            <p className="text-light/80 text-lg leading-relaxed max-w-3xl mx-auto">
              Every Robust Kitchen product is designed with clinical nutrition expertise — built to
              support your everyday nutrition, not just satisfy hunger. Real science, real
              ingredients, real results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {DIFFERENTIATORS.map(({ Icon, title, body }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 rounded-full bg-hero-yellow/15 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-hero-yellow" strokeWidth={1.8} />
                </div>
                <h3 className="text-cream font-semibold mb-2">{title}</h3>
                <p className="text-light/60 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 4 — Second CTA */}
      <section className="bg-offwhite py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-10">
          <div className="rounded-3xl bg-gradient-to-br from-hero-coral to-hero-yellow p-[2px]">
            <div className="rounded-[calc(1.5rem-1px)] bg-white px-8 py-12 text-center">
              <h2 className="font-cormorant-garamond text-4xl md:text-5xl font-bold text-dk mb-4">
                Don&apos;t Miss the Launch.
              </h2>
              <p className="text-muted text-lg leading-relaxed max-w-xl mx-auto mb-8">
                Get early access, launch offers, and updates straight to your inbox.
              </p>
              <Link
                href={buildContactHref('product')}
                className="inline-flex items-center gap-2 bg-dk text-cream font-bold text-sm px-8 py-4 rounded-lg transition-all hover:bg-hero-coral hover:text-white hover:scale-105 active:scale-95 transform"
              >
                <Bell className="w-4 h-4" />
                Notify Me When We Launch
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
