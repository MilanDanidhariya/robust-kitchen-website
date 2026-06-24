'use client';

import { INPUT_RANGES } from '@/utils/constants';

/**
 * HeightInput Component
 * Displays height input based on unit system (metric slider or imperial ft/in)
 */

export default function HeightInput({ unit, height, onHeightChange }) {
  if (unit === 'metric') {
    const percentage = ((height.metric - INPUT_RANGES.HEIGHT_METRIC.min) / (INPUT_RANGES.HEIGHT_METRIC.max - INPUT_RANGES.HEIGHT_METRIC.min)) * 100;

    return (
      <div className="mb-6">
        <label className="block text-xs font-bold uppercase tracking-wider text-mid mb-3">
          Height
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={INPUT_RANGES.HEIGHT_METRIC.min}
            max={INPUT_RANGES.HEIGHT_METRIC.max}
            value={height.metric}
            onChange={(e) => onHeightChange({ metric: parseInt(e.target.value), imperial: height.imperial })}
            className="flex-1 h-1.5 bg-gray-300 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #0b1a0f 0%, #0b1a0f ${percentage}%, #dde8e2 ${percentage}%, #dde8e2 100%)`,
            }}
            aria-label="Height in centimeters"
            aria-valuemin={INPUT_RANGES.HEIGHT_METRIC.min}
            aria-valuemax={INPUT_RANGES.HEIGHT_METRIC.max}
            aria-valuenow={height.metric}
            aria-valuetext={`${height.metric} centimeters`}
          />
          <div className="text-right min-w-fit">
            <div className="text-2xl font-bold text-dk font-cormorant">{height.metric}</div>
            <div className="text-xs text-mid font-semibold">cm</div>
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
        Height
      </label>
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <input
            type="number"
            min={INPUT_RANGES.HEIGHT_IMPERIAL_FT.min}
            max={INPUT_RANGES.HEIGHT_IMPERIAL_FT.max}
            value={height.imperial.ft}
            onChange={(e) => {
              const ft = Math.max(INPUT_RANGES.HEIGHT_IMPERIAL_FT.min, Math.min(INPUT_RANGES.HEIGHT_IMPERIAL_FT.max, parseInt(e.target.value) || 0));
              onHeightChange({ metric: height.metric, imperial: { ...height.imperial, ft } });
            }}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-cormorant text-2xl text-dk bg-gray-50 focus:border-dk focus:bg-white focus:outline-none transition-colors"
            placeholder="5"
            aria-label="Height in feet"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-mid uppercase">ft</span>
        </div>
        <div className="flex-1 relative">
          <input
            type="number"
            min={INPUT_RANGES.HEIGHT_IMPERIAL_IN.min}
            max={INPUT_RANGES.HEIGHT_IMPERIAL_IN.max}
            value={height.imperial.in}
            onChange={(e) => {
              const in_val = Math.max(INPUT_RANGES.HEIGHT_IMPERIAL_IN.min, Math.min(INPUT_RANGES.HEIGHT_IMPERIAL_IN.max, parseInt(e.target.value) || 0));
              onHeightChange({ metric: height.metric, imperial: { ...height.imperial, in: in_val } });
            }}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-cormorant text-2xl text-dk bg-gray-50 focus:border-dk focus:bg-white focus:outline-none transition-colors"
            placeholder="5"
            aria-label="Height in inches"
          />
          <span className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xs font-semibold text-mid uppercase">in</span>
        </div>
      </div>
    </div>
  );
}
