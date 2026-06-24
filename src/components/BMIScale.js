'use client';

/**
 * BMIScale Component
 * Displays a color-coded BMI scale with animated needle indicator
 */

export default function BMIScale({ needlePosition }) {
  return (
    <div className="mb-6">
      <div className="text-xs font-bold uppercase tracking-wider text-mid mb-3">
        BMI Scale
      </div>
      <div className="relative">
        {/* Scale bar with color zones */}
        <div className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 via-green-600 via-yellow-500 via-orange-500 to-red-900 relative mb-2">
          {/* Needle indicator */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 transition-all"
            style={{
              left: `${needlePosition}%`,
              transitionDuration: '0.6s',
              transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            <div className="w-5 h-5 bg-dk rounded-full border-4 border-white shadow-lg" />
          </div>
        </div>

        {/* Scale labels */}
        <div className="flex justify-between text-xs text-mid font-medium mt-2">
          <div className="text-center">
            <div>Underweight</div>
            <div className="text-xs">&lt;18.5</div>
          </div>
          <div className="text-center">
            <div>Normal</div>
            <div className="text-xs">18.5–24.9</div>
          </div>
          <div className="text-center">
            <div>Overweight</div>
            <div className="text-xs">25–29.9</div>
          </div>
          <div className="text-center">
            <div>Obese</div>
            <div className="text-xs">&gt;30</div>
          </div>
        </div>
      </div>
    </div>
  );
}
