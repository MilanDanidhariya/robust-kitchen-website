'use client';

import BMIScale from './BMIScale';
import IdealWeightChips from './IdealWeightChips';
import InsightBox from './InsightBox';
import { kgToLb } from '@/utils/unitConversions';

/**
 * ResultPanel Component
 * Displays BMI calculation results or empty state
 */

export default function ResultPanel({ results, unit, showResults }) {
  if (!showResults) {
    return (
      <div className="bg-gray-50 rounded-2xl p-7 flex flex-col gap-5">
        <div className="text-center py-8">
          <div className="text-5xl mb-4">⚖️</div>
          <p className="text-sm leading-relaxed text-mid">
            Enter your details and tap <strong>Calculate</strong> to see your BMI and personalised insights.
          </p>
        </div>
      </div>
    );
  }

  if (!results) {
    return null;
  }

  // Convert ideal weight to current unit if needed
  const displayIdealMin = unit === 'imperial' ? kgToLb(results.idealWeightMin) : results.idealWeightMin;
  const displayIdealMax = unit === 'imperial' ? kgToLb(results.idealWeightMax) : results.idealWeightMax;
  const displayCurrentWeight = unit === 'imperial' ? kgToLb(results.currentWeight) : results.currentWeight;

  return (
    <div
      className="bg-gray-50 rounded-2xl p-7 flex flex-col gap-5 opacity-0 transform translate-y-2.5 transition-all duration-400"
      style={{
        opacity: showResults ? 1 : 0,
        transform: showResults ? 'translateY(0)' : 'translateY(10px)',
      }}
    >
      {/* BMI Number and Category Badge */}
      <div className="flex items-center justify-between">
        <div className="text-6xl font-bold font-cormorant" style={{ color: results.categoryColor }}>
          {results.bmi}
        </div>
        <div
          className="px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wider"
          style={{
            background: results.badgeBg,
            color: results.badgeColor,
            border: `1.5px solid ${results.categoryColor}44`,
          }}
        >
          {results.categoryLabel}
        </div>
      </div>

      {/* BMI Scale */}
      <BMIScale needlePosition={results.needlePosition} />

      {/* Ideal Weight Range */}
      <IdealWeightChips
        idealMin={displayIdealMin}
        idealMax={displayIdealMax}
        currentWeight={displayCurrentWeight}
        unit={unit}
      />

      {/* Insight Box */}
      <InsightBox insight={results.insight} accentColor={results.accentColor} />
    </div>
  );
}
