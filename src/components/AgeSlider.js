'use client';

import { INPUT_RANGES } from '@/utils/constants';

/**
 * AgeSlider Component
 * Allows users to select their age using a slider (10-100 years)
 */

export default function AgeSlider({ age, onAgeChange }) {
  const percentage = ((age - INPUT_RANGES.AGE.min) / (INPUT_RANGES.AGE.max - INPUT_RANGES.AGE.min)) * 100;

  return (
    <div className="mb-6">
      <label className="block text-xs font-bold uppercase tracking-wider text-mid mb-3">
        Age
      </label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min={INPUT_RANGES.AGE.min}
          max={INPUT_RANGES.AGE.max}
          value={age}
          onChange={(e) => onAgeChange(parseInt(e.target.value))}
          className="flex-1 h-1.5 bg-gray-300 rounded-full appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #0b1a0f 0%, #0b1a0f ${percentage}%, #dde8e2 ${percentage}%, #dde8e2 100%)`,
          }}
          aria-label="Age in years"
          aria-valuemin={INPUT_RANGES.AGE.min}
          aria-valuemax={INPUT_RANGES.AGE.max}
          aria-valuenow={age}
          aria-valuetext={`${age} years`}
        />
        <div className="text-right min-w-fit">
          <div className="text-2xl font-bold text-dk font-cormorant">{age}</div>
          <div className="text-xs text-mid font-semibold">yrs</div>
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
