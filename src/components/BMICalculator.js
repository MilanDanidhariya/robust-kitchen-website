'use client';

import { useState, useEffect } from 'react';
import UnitToggle from '@/components/UnitToggle';
import GenderSelector from './GenderSelector';
import AgeSlider from './AgeSlider';
import HeightInput from './HeightInput';
import WeightInput from './WeightInput';
import CalculateButton from './CalculateButton';
import ResultPanel from './ResultPanel';
import CTASection from './CTASection';
import { DEFAULTS } from '@/utils/constants';
import { generateCalculationResult } from '@/utils/bmiCalculations';
import { convertHeightImperialToMetric, convertWeightImperialToMetric } from '@/utils/unitConversions';

/**
 * BMICalculator Component
 * Main calculator component managing all state and logic
 */

export default function BMICalculator() {
  const [unit, setUnit] = useState(DEFAULTS.unit);
  const [gender, setGender] = useState(DEFAULTS.gender);
  const [age, setAge] = useState(DEFAULTS.age);
  const [height, setHeight] = useState(DEFAULTS.height);
  const [weight, setWeight] = useState(DEFAULTS.weight);
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Handle unit conversion
  const handleUnitChange = (newUnit) => {
    setUnit(newUnit);
    // Reset results when unit changes
    setShowResults(false);
  };

  // Handle height change
  const handleHeightChange = (newHeight) => {
    setHeight(newHeight);
    setShowResults(false);
  };

  // Handle weight change
  const handleWeightChange = (newWeight) => {
    setWeight(newWeight);
    setShowResults(false);
  };

  // Handle calculation
  const handleCalculate = () => {
    // Convert to metric if needed
    let heightCm = height.metric;
    let weightKg = weight.metric;

    if (unit === 'imperial') {
      heightCm = convertHeightImperialToMetric(height.imperial.ft, height.imperial.in);
      weightKg = convertWeightImperialToMetric(weight.imperial);
    }

    // Validate inputs
    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
      alert('Please enter valid measurements');
      return;
    }

    // Generate results
    const calculationResult = generateCalculationResult(heightCm, weightKg);
    if (calculationResult) {
      setResults(calculationResult);
      setShowResults(true);
    }
  };

  // Handle Enter key from any input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        handleCalculate();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
      {/* Hero Banner */}
      <div className="bg-dk px-11 py-9 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-customSalmon/15 -mr-24 -mt-24" />
        <div className="absolute bottom-0 left-1/5 w-32 h-32 rounded-full bg-teal-400/10 -mb-16" />

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-customSalmon/20 border border-customSalmon/40 text-customSalmon text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full mb-3">
            🌿 Eatrobust Tool
          </div>
          <h2 className="text-3xl font-bold font-cormorant text-cream mb-2 leading-tight">
            Know Your <em className="italic text-yellow-300">Body</em>
            <br />
            BMI Calculator
          </h2>
          <p className="text-light text-sm leading-relaxed max-w-lg">
            Get your Body Mass Index instantly — and understand what it means for your nutrition journey.
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="px-11 py-9 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
        {/* Left Column: Inputs */}
        <div>
          {/* Unit Toggle */}
          <UnitToggle unit={unit} onUnitChange={handleUnitChange} />

          {/* Gender Selector */}
          <GenderSelector gender={gender} onGenderChange={setGender} />

          {/* Age Slider */}
          <AgeSlider age={age} onAgeChange={setAge} />

          {/* Height Input */}
          <HeightInput unit={unit} height={height} onHeightChange={handleHeightChange} />

          {/* Weight Input */}
          <WeightInput unit={unit} weight={weight} onWeightChange={handleWeightChange} />

          {/* Calculate Button */}
          <CalculateButton onClick={handleCalculate} />
        </div>

        {/* Right Column: Results */}
        <div>
          <ResultPanel results={results} unit={unit} showResults={showResults} />
        </div>
      </div>

      {/* CTA Section */}
      <CTASection showResults={showResults} />
    </div>
  );
}
