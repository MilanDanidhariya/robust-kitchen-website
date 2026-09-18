'use client';

import { useEffect, useRef, useState } from 'react';
import { Sunrise, Sunset, Activity } from 'lucide-react';

/**
 * MealsServedCounter
 * Live running total of items served at Kadji care.
 *
 * The count is derived, not stored: every item on the daily menu is listed below,
 * so the arithmetic is auditable and stays correct if the menu changes.
 *
 *   morning (8) + afternoon (8) + RT feeds (8) = 24 items per day
 *   24 x 30  =    720 per month
 *   720 x 12 =  8,640 per year
 *   8,640 x 2 = 17,280 over two years
 *
 * Because it counts from SERVICE_START_DATE to right now, it keeps climbing on
 * its own — one item per hour — with no one having to update a number by hand.
 */

// ---------------------------------------------------------------------------
// PLACEHOLDER DATE — change this one line when the real first-service date is known.
// Set to 27 Sep 2024 so the counter reads 17,280 on 17 Sep 2026, matching the
// 720-service-day figure. Everything else recalculates from it automatically.
// ---------------------------------------------------------------------------
const SERVICE_START_DATE = '2024-09-27T00:00:00';

const DAILY_MENU = [
  {
    key: 'morning',
    title: 'Morning & Lunch',
    Icon: Sunrise,
    items: ['Tea', 'Coffee', 'Morning snack', 'Fruits', 'Subji', 'Dal', 'Roti', 'Rice'],
  },
  {
    key: 'afternoon',
    title: 'Afternoon & Evening',
    Icon: Sunset,
    items: ['Afternoon tea', 'Coffee', 'Snacks', 'Juice / Soup', 'Subji', 'Dal', 'Khichdi', 'Roti'],
  },
];

const RT_FEEDS_PER_DAY = 8;

export const ITEMS_PER_DAY =
  DAILY_MENU.reduce((total, group) => total + group.items.length, 0) + RT_FEEDS_PER_DAY;

const MS_PER_DAY = 24 * 60 * 60 * 1000;
const COUNT_UP_MS = 1800;

/** Items served from the start date up to `now`. Advances one per hour. */
export function mealsServedAt(now, startDate = SERVICE_START_DATE) {
  const elapsedMs = now - new Date(startDate).getTime();
  if (!Number.isFinite(elapsedMs) || elapsedMs <= 0) return 0;

  return Math.floor((elapsedMs / MS_PER_DAY) * ITEMS_PER_DAY);
}

export default function MealsServedCounter() {
  // Starts at null so the server-rendered markup and the first client render
  // agree; the real figure lands once we are safely on the client.
  const [target, setTarget] = useState(null);
  const [displayed, setDisplayed] = useState(0);
  const frameRef = useRef(null);

  // Keep the target honest while the page stays open.
  useEffect(() => {
    const sync = () => setTarget(mealsServedAt(Date.now()));
    sync();

    const interval = setInterval(sync, 30000);
    return () => clearInterval(interval);
  }, []);

  // Count up to the target on first reveal, then track it exactly.
  useEffect(() => {
    if (target === null) return undefined;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || displayed > 0) {
      setDisplayed(target);
      return undefined;
    }

    const from = 0;
    const startedAt = performance.now();

    const tick = (timestamp) => {
      const progress = Math.min((timestamp - startedAt) / COUNT_UP_MS, 1);
      // easeOutCubic — fast first, settling onto the final figure
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(from + (target - from) * eased));

      if (progress < 1) frameRef.current = requestAnimationFrame(tick);
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
    // Only re-runs when the target changes; `displayed` is read, not tracked.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target]);

  return (
    <section className="bg-offwhite py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_20%,rgba(240,120,108,0.08),transparent_28%),radial-gradient(circle_at_88%_78%,rgba(252,228,84,0.14),transparent_30%)]"></div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 relative">
        <div className="text-center mb-12">
          <span className="font-jetbrains-mono text-xs uppercase tracking-[0.3em] text-hero-rose block mb-3">
            Live Count
          </span>
          <h2 className="font-cormorant-garamond text-3xl md:text-4xl font-bold text-dk leading-tight">
            Meals Served, and Still Counting.
          </h2>
        </div>

        <div className="bg-dk rounded-3xl px-8 py-12 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-56 h-56 rounded-full bg-hero-coral/10 -mr-28 -mt-28"></div>
          <div className="absolute bottom-0 left-1/5 w-36 h-36 rounded-full bg-hero-yellow/10 -mb-20"></div>

          <div className="relative">
            <div className="inline-flex items-center gap-2 text-hero-yellow text-xs font-bold uppercase tracking-[0.2em] mb-5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-hero-yellow opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-hero-yellow"></span>
              </span>
              Serving now at Kadji care
            </div>

            <div
              className="font-cormorant-garamond font-bold text-cream leading-none text-6xl md:text-8xl tabular-nums"
              aria-live="polite"
            >
              {target === null ? '—' : displayed.toLocaleString('en-IN')}
            </div>

            <p className="text-hero-yellow font-semibold tracking-wide uppercase text-sm mt-4">
              Meals &amp; items served
            </p>
            <p className="text-light/60 text-sm leading-relaxed max-w-xl mx-auto mt-3">
              Counted from {ITEMS_PER_DAY} items served every single day — every tea, every roti,
              every tube feed — since we started at Kadji care.
            </p>
          </div>
        </div>

        {/* The arithmetic, made visible */}
        <div className="grid md:grid-cols-3 gap-5 mt-6">
          {DAILY_MENU.map(({ key, title, Icon, items }) => (
            <div key={key} className="bg-white rounded-2xl border border-hero-border p-6 shadow-sm">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-9 h-9 rounded-lg bg-hero-coral/12 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-hero-coral" strokeWidth={1.8} />
                </div>
                <h3 className="font-semibold text-dk text-sm">{title}</h3>
                <span className="ml-auto font-cormorant-garamond text-2xl font-bold text-hero-coral">
                  {items.length}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {items.map((item, index) => (
                  <span
                    key={`${item}-${index}`}
                    className="bg-cream text-muted text-xs px-2.5 py-1 rounded-full"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}

          <div className="bg-white rounded-2xl border border-hero-border p-6 shadow-sm">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg bg-hero-coral/12 flex items-center justify-center">
                <Activity className="w-5 h-5 text-hero-coral" strokeWidth={1.8} />
              </div>
              <h3 className="font-semibold text-dk text-sm">Tube Feeds</h3>
              <span className="ml-auto font-cormorant-garamond text-2xl font-bold text-hero-coral">
                {RT_FEEDS_PER_DAY}
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              RT feeds prepared and delivered {RT_FEEDS_PER_DAY} times a day for patients who cannot
              eat by mouth.
            </p>
            <div className="mt-4 pt-4 border-t border-hero-border text-sm">
              <span className="text-muted">Total each day</span>
              <span className="float-right font-bold text-dk">{ITEMS_PER_DAY} items</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
