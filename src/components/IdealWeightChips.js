'use client';

/**
 * IdealWeightChips Component
 * Displays ideal weight range and current weight in chips
 */

export default function IdealWeightChips({ idealMin, idealMax, currentWeight, unit }) {
  const weightUnit = unit === 'imperial' ? 'lb' : 'kg';

  return (
    <div className="mb-6">
      <div className="text-xs font-bold uppercase tracking-wider text-mid mb-3">
        Ideal Weight Range
      </div>
      <div className="flex gap-3">
        <div className="flex-1 bg-white rounded-lg p-3 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-mid mb-1">
            Min
          </div>
          <div className="text-xl font-bold text-dk font-cormorant">
            {idealMin} <span className="text-xs">{weightUnit}</span>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg p-3 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-mid mb-1">
            Max
          </div>
          <div className="text-xl font-bold text-dk font-cormorant">
            {idealMax} <span className="text-xs">{weightUnit}</span>
          </div>
        </div>
        <div className="flex-1 bg-white rounded-lg p-3 text-center">
          <div className="text-xs font-bold uppercase tracking-wider text-mid mb-1">
            Your Weight
          </div>
          <div className="text-xl font-bold text-dk font-cormorant">
            {currentWeight} <span className="text-xs">{weightUnit}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
