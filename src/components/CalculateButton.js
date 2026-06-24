'use client';

/**
 * CalculateButton Component
 * Button to trigger BMI calculation
 */

export default function CalculateButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full bg-customSalmon text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-customSalmon/90 active:scale-95 transition-all shadow-md hover:shadow-lg mt-2"
      aria-label="Calculate BMI"
    >
      Calculate My BMI →
    </button>
  );
}
