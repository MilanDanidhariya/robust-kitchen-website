'use client';

import React from 'react';

/**
 * UnitToggle Component
 * Allows users to switch between metric and imperial units
 * 
 * Props:
 *   - unit: 'metric' | 'imperial' - Current selected unit system
 *   - onUnitChange: (unit: string) => void - Callback when unit is changed
 * 
 * Validates: Requirements 1.1, 1.2, 1.3, 28.1, 28.2, 28.3
 */

export default function UnitToggle({ unit, onUnitChange }) {
  return (
    <div className="flex gap-3 mb-7">
      {/* Metric Button */}
      <button
        onClick={() => onUnitChange('metric')}
        className={`flex-1 py-3 px-4 rounded-[12px] font-semibold text-sm transition-all duration-200 ${
          unit === 'metric'
            ? 'bg-dk text-cream shadow-md hover:shadow-lg'
            : 'bg-gray-50 text-mid border-2 border-gray-200 hover:border-dk hover:text-dk'
        }`}
        aria-pressed={unit === 'metric'}
        role="radio"
        aria-label="Select Metric units (kg / cm)"
      >
        Metric (kg / cm)
      </button>

      {/* Imperial Button */}
      <button
        onClick={() => onUnitChange('imperial')}
        className={`flex-1 py-3 px-4 rounded-[12px] font-semibold text-sm transition-all duration-200 ${
          unit === 'imperial'
            ? 'bg-dk text-cream shadow-md hover:shadow-lg'
            : 'bg-gray-50 text-mid border-2 border-gray-200 hover:border-dk hover:text-dk'
        }`}
        aria-pressed={unit === 'imperial'}
        role="radio"
        aria-label="Select Imperial units (lb / ft)"
      >
        Imperial (lb / ft)
      </button>
    </div>
  );
}
