'use client';

import React from 'react';

/**
 * GenderSelector Component
 * Allows users to select their gender (Male/Female)
 */

export default function GenderSelector({ gender, onGenderChange }) {
  return (
    <div className="mb-6">
      <label className="block text-xs font-bold uppercase tracking-wider text-mid mb-3">
        Gender
      </label>
      <div className="flex gap-3">
        <button
          onClick={() => onGenderChange('male')}
          className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold text-sm transition-all flex flex-col items-center gap-2 ${
            gender === 'male'
              ? 'bg-dk text-cream border-dk shadow-md'
              : 'bg-gray-50 text-mid border-gray-300 hover:border-dk'
          }`}
          aria-pressed={gender === 'male'}
          role="radio"
          aria-label="Select Male"
        >
          <span className="text-2xl">♂</span>
          Male
        </button>
        <button
          onClick={() => onGenderChange('female')}
          className={`flex-1 py-3 px-4 rounded-lg border-2 font-semibold text-sm transition-all flex flex-col items-center gap-2 ${
            gender === 'female'
              ? 'bg-dk text-cream border-dk shadow-md'
              : 'bg-gray-50 text-mid border-gray-300 hover:border-dk'
          }`}
          aria-pressed={gender === 'female'}
          role="radio"
          aria-label="Select Female"
        >
          <span className="text-2xl">♀</span>
          Female
        </button>
      </div>
    </div>
  );
}
