'use client';

/**
 * InsightBox Component
 * Displays personalized health insight based on BMI category
 */

export default function InsightBox({ insight, accentColor }) {
  return (
    <div
      className="bg-white rounded-lg p-4 border-l-4 transition-colors"
      style={{ borderLeftColor: accentColor }}
    >
      <div className="text-xs font-bold uppercase tracking-wider text-mid mb-2">
        🌿 Eatrobust Insight
      </div>
      <p className="text-sm leading-relaxed text-dk">{insight}</p>
    </div>
  );
}
