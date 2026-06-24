'use client';

import { INPUT_RANGES } from '@/utils/constants';

/**
 * WeightInput Component
 * Displays weight input based on unit system (metric slider or imperial number input)
 */

export default function WeightInput({ unit, weight, onWeightChange }) {
  if (unit === 'metric') {
    const percentage = ((weight.metric - INPUT_RANGES.WEIGHT_METRIC.min) / (INPUT_RANGES.WEIGHT_METRIC.max - INPUT_RANGES.WEIGHT_METRIC.min)) * 100;

    return (
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-mid mb-3">
          Weight
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={INPUT_RANGES.WEIGHT_METRIC.min}
            max={INPUT_RANGES.WEIGHT_METRIC.max}
            value={weight.metric}
            onChange={(e) => onWeightChange({ metric: parseInt(e.target.value), imperial: weight.imperial })}
            className="flex-1 h-1.5 bg-gray-300 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #0b1a0f 0%, #0b1a0f ${percentage}%, #dde8e2 ${percentage}%, #dde8e2 100%)`,
            }}
            aria-label="Weight in kilograms"
            aria-valuemin={INPUT_RANGES.WEIGHT_METRIC.min}
            aria-valuemax={INPUT_RANGES.WEIGHT_METRIC.max}
            aria-valuenow={weight.metric}
            aria-valuetext={`${weight.metric} kilograms`}
          />
          <div className="text-right min-w-fit">
            <div className="text-2xl font-bold text-dk font-cormorant">{weight.metric}</div>
            <div className="text-xs text-mid font-semibold">kg</div>
          </div>
        </div>
        <style jsx>{`
          input[type='range']::-webkit-slider-thumb {
            appearance: none;
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #0b1a0f;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(11, 26, 15, 0.35);
            cursor: pointer;
            transition: transform 0.15s;
          }

          input[type='range']::-webkit-slider-thumb:hover {
            transform: scale(1.2);
          }

          input[type='range']::-moz-range-thumb {
            width: 22px;
            height: 22px;
            border-radius: 50%;
            background: #0b1a0f;
            border: 3px solid white;
            box-shadow: 0 2px 8px rgba(11, 26, 15, 0.35);
            cursor: pointer;
            transition: transform 0.15s;
          }

          input[type='range']::-moz-range-thumb:hover {
            transform: scale(1.2);
          }
        `}</style>
      </div>
    );
  }

  // Imperial variant
  return (
    <div className="mb-6">
      <label className="block text-xs font-bold uppercase tracking-wider text-mid mb-3">
        Weight
      </label>
      <div className="relative">
        <input
          type="number"
          min={INPUT_RANGES.WEIGHT_IMPERIAL.min}
          max={INPUT_RANGES.WEIGHT_IMPERIAL.max}
          value={weight.imperial}
          onChange={(e) => {
            const lb = Math.max(INPUT_RANGES.WEIGHT_IMPERIAL.min, Math.min(INPUT_RANGES.WEIGHT_IMPERIAL.max, parseInt(e.target.value) || 0));
            onWeightChange({ metric: weight.metric, imperial: lb });
          }}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-cormorant text-2xl text-dk bg-gray-50 focus:border-dk focus:bg-white focus:outline-none transition-colors"
          placeholder="143"
          aria-label="Weight in pounds"
        />
        <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-mid uppercase">lb</span>
      </div>
    </div>
  );
}
