'use client';

import { useState } from 'react';

export default function Hero() {
  const [calculatorData, setCalculatorData] = useState({
    healthGoal: 'Weight Loss',
    activityLevel: 'Sedentary (desk job)',
    age: '',
    weight: ''
  });
  const [calorieResult, setCalorieResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleInputChange = (field, value) => {
    setCalculatorData(prev => ({
      ...prev,
      [field]: value
    }));
    // Hide result when user changes inputs
    if (showResult) {
      setShowResult(false);
    }
  };

  const calculateCalories = () => {
    const { healthGoal, activityLevel, age, weight } = calculatorData;

    if (!age || !weight || age <= 0 || weight <= 0) {
      alert('Please enter valid age and weight values.');
      return;
    }

    // Base Metabolic Rate calculation using Mifflin-St Jeor Equation
    // For simplicity, using approximate values. In real app, this would be more sophisticated
    let bmr = 10 * weight + 6.25 * age - 5; // Simplified for males, would need gender input for accuracy

    // Activity level multiplier
    const activityMultipliers = {
      'Sedentary (desk job)': 1.2,
      'Lightly Active': 1.375,
      'Moderately Active': 1.55,
      'Very Active': 1.725
    };

    const tdee = bmr * activityMultipliers[activityLevel];

    // Adjust based on health goal
    let targetCalories;
    switch (healthGoal) {
      case 'Weight Loss':
        targetCalories = tdee - 500; // 500 calorie deficit for ~0.5kg/week loss
        break;
      case 'Diabetes Management':
        targetCalories = tdee - 300; // Moderate deficit for blood sugar control
        break;
      case 'PCOD / PCOS':
        targetCalories = tdee - 400; // Balanced approach for hormonal health
        break;
      case 'Gut Health':
        targetCalories = tdee - 200; // Gentle deficit for digestive health
        break;
      case 'General Wellness':
        targetCalories = tdee; // Maintenance calories
        break;
      default:
        targetCalories = tdee;
    }

    // Ensure minimum safe calorie intake (1200 for women, 1500 for men - using 1300 as safe minimum)
    targetCalories = Math.max(targetCalories, 1300);

    setCalorieResult(Math.round(targetCalories));
    setShowResult(true);
  };
  return (
    <section id="home" className="bg-hero-ivory py-20 px-0 relative overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(240,120,108,0.08),transparent_28%),radial-gradient(circle_at_80%_82%,rgba(252,228,84,0.14),transparent_30%)]"></div>
      <div className="max-w-6xl mx-auto px-8 md:px-10 relative w-full">
        <div className="max-w-2xl">
          <div className="animate-fade-in-up">
            <div className="mb-8 flex items-center gap-4">
              <span className="h-px w-12 bg-hero-coral"></span>
              <span className="font-jetbrains-mono text-xs uppercase tracking-[0.45em] text-hero-rose">India&apos;s Therapeutic Kitchen</span>
            </div>
            <h1 className="font-cormorant-garamond text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.9] mb-6 text-hero-ink">
              <span className="text-hero-coral">Unleash</span> the Best<br />
              Within You<br />
              Through<br />
              {/* <span className="text-gold animate-pulse">Nutrition</span> */}
              Nutrition
            </h1>
            <div className="h-1.5 w-72 max-w-full bg-hero-yellow mb-7"></div>
            <p className="text-hero-stone text-xl md:text-2xl leading-relaxed mb-11 max-w-xl">
              Robust Kitchen is India&apos;s most personalised therapeutic meal brand — powered by in-house dieticians, run by trained chefs, and built on one promise: food that genuinely heals.
            </p>
            <div className="flex flex-wrap gap-3 mb-10">
              <span className="bg-transparent border border-hero-coral/25 text-hero-coral text-sm px-6 py-3 rounded-full font-semibold tracking-wide">
                Zero Preservatives
              </span>
              <span className="bg-transparent border border-hero-stone/35 text-hero-ink text-sm px-6 py-3 rounded-full font-semibold tracking-wide">
                Dietician Designed
              </span>
              <span className="bg-hero-yellow border border-hero-yellow text-hero-ink text-sm px-6 py-3 rounded-full font-semibold tracking-wide">
                Clean Label
              </span>
              <span className="hidden">
                Now at Kadji care
              </span>
              <span className="hidden">
                Diabetes · PCOD · Gut Health
              </span>
            </div>
            <div className="flex flex-wrap gap-4">
              <a href="/contact#join" className="bg-hero-coral text-hero-ink font-bold text-sm px-8 py-4 rounded-lg transition-all hover:bg-hero-coral/90 hover:scale-105 hover:shadow-lg transform">
                Start My Meal Plan
              </a>
              {/* <a href="#tracker" className="text-white/90 border-2 border-white/30 text-sm px-8 py-4 rounded-lg transition-all hover:bg-white/10 hover:border-white/50 hover:scale-105 transform">
                Free Health Assessment
              </a> */}
              {/* <a
                href="/assessment"
                className="text-hero-coral border-2 border-hero-coral/30 text-sm px-8 py-4 rounded-lg transition-all hover:bg-hero-coral/10 hover:border-hero-coral/50 hover:scale-105 transform"
              >
                Free Health Assessment
              </a> */}
               <a
                href="/bmi-calculator"
                className="text-hero-coral border-2 border-hero-coral/30 text-sm px-8 py-4 rounded-lg transition-all hover:bg-hero-coral/10 hover:border-hero-coral/50 hover:scale-105 transform"
              >
                Check Your BMI
              </a>
            </div>
            <div className="hidden">
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s', animationFillMode: 'both' }}>
                <div className="font-cormorant-garamond text-4xl font-bold text-lime mb-2">100%</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Preservative Free</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s', animationFillMode: 'both' }}>
                <div className="font-cormorant-garamond text-4xl font-bold text-lime mb-2">3+</div>
                <div className="text-xs uppercase tracking-wider text-white/60">In-House Dieticians</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
                <div className="font-cormorant-garamond text-4xl font-bold text-lime mb-2">4</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Clean Products</div>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.8s', animationFillMode: 'both' }}>
                <div className="font-cormorant-garamond text-4xl font-bold text-lime mb-2">1</div>
                <div className="text-xs uppercase tracking-wider text-white/60">Mission</div>
              </div>
            </div>
          </div>
          <div className="hidden">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all hover:scale-105 transform">
              <div className="bg-gradient-to-br from-light to-border/70 border-2 border-dashed border-lime rounded-xl flex flex-col items-center justify-center text-mid font-jetbrains-mono text-center p-6 h-64">
                <div className="text-3xl mb-2">📸</div>
                <div className="font-bold text-sm text-green">HERO IMAGE — Kadji care Kitchen / Meal Spread</div>
                <div className="text-xs text-muted leading-relaxed mt-2">
                  Overhead shot of fresh therapeutic meal spread at Kadji care<br />
                  1400×900px · WebP · warm natural lighting
                </div>
              </div>
            </div>
            {/* Meal Calculator */}
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-6 border border-white/20 shadow-2xl hover:shadow-3xl transition-all hidden">
              <div className="font-bold text-lg text-green mb-6">🥗 Live Meal Calorie Calculator — Kadji care</div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-bold text-mid mb-2 uppercase tracking-wide">Health Goal</label>
                  <select
                    value={calculatorData.healthGoal}
                    onChange={(e) => handleInputChange('healthGoal', e.target.value)}
                    className="w-full p-3 border-2 border-border rounded-lg text-sm bg-offwhite font-outfit text-dk focus:border-lime focus:outline-none transition-all hover:border-lime/50"
                  >
                    <option>Weight Loss</option>
                    <option>Diabetes Management</option>
                    <option>PCOD / PCOS</option>
                    <option>Gut Health</option>
                    <option>General Wellness</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-mid mb-2 uppercase tracking-wide">Activity Level</label>
                  <select
                    value={calculatorData.activityLevel}
                    onChange={(e) => handleInputChange('activityLevel', e.target.value)}
                    className="w-full p-3 border-2 border-border rounded-lg text-sm bg-offwhite font-outfit text-dk focus:border-lime focus:outline-none transition-all hover:border-lime/50"
                  >
                    <option>Sedentary (desk job)</option>
                    <option>Lightly Active</option>
                    <option>Moderately Active</option>
                    <option>Very Active</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-mid mb-2 uppercase tracking-wide">Age</label>
                  <input
                    type="number"
                    placeholder="e.g. 32"
                    value={calculatorData.age}
                    onChange={(e) => handleInputChange('age', e.target.value)}
                    className="w-full p-3 border-2 border-border rounded-lg text-sm bg-offwhite font-outfit text-dk placeholder-dk/60 focus:border-lime focus:outline-none transition-all hover:border-lime/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-mid mb-2 uppercase tracking-wide">Weight (kg)</label>
                  <input
                    type="number"
                    placeholder="e.g. 70"
                    value={calculatorData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    className="w-full p-3 border-2 border-border rounded-lg text-sm bg-offwhite font-outfit text-dk placeholder-dk/60 focus:border-lime focus:outline-none transition-all hover:border-lime/50"
                  />
                </div>
              </div>
              <button
                onClick={calculateCalories}
                className="bg-lime text-dk font-bold text-sm px-6 py-3 rounded-lg w-full hover:bg-lime/90 hover:scale-105 transition-all transform shadow-lg"
              >
                Calculate My Therapeutic Target →
              </button>
              {showResult && calorieResult && (
                <div className="bg-gradient-to-r from-lime/20 to-gold/20 rounded-lg p-6 mt-4 border-l-4 border-lime animate-fade-in-up">
                  <div className="text-center">
                    <div className="text-3xl font-cormorant font-bold text-dk mb-2">{calorieResult}</div>
                    <div className="text-sm font-semibold text-green mb-1">CALORIES PER DAY</div>
                    <div className="text-xs text-mid">
                      Based on your {calculatorData.healthGoal.toLowerCase()} goal and {calculatorData.activityLevel.toLowerCase()} lifestyle
                    </div>
                    <div className="mt-4 pt-4 border-t border-lime/30">
                      <p className="text-xs text-muted">
                        This is a personalized therapeutic target. Consult with our dieticians for a complete meal plan.
                      </p>
                    </div>
                  </div>
                </div>
              )}
              {!showResult && (
                <div className="bg-light rounded-lg p-4 mt-4 text-sm text-green font-semibold border-l-4 border-lime">
                  Fill in your details above to get your personalised calorie target.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
