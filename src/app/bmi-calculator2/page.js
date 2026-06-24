'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const LIMITS = {
  age: { min: 10, max: 100 },
  cm: { min: 120, max: 220 },
  kg: { min: 30, max: 180 },
  ft: { min: 3, max: 7 },
  inch: { min: 0, max: 11 },
  lb: { min: 60, max: 400 },
};

const CATEGORY_META = {
  underweight: {
    label: 'Underweight',
    textClass: 'text-blue-700',
    chipClass: 'bg-blue-50 text-blue-800 border-blue-200',
    insight: 'Focus on nutrient-dense, calorie-rich whole foods and regular meal timing.',
  },
  healthy: {
    label: 'Healthy Weight',
    textClass: 'text-green-700',
    chipClass: 'bg-green-50 text-green-800 border-green-200',
    insight: 'Great range. Keep consistency with balanced meals, sleep, hydration, and activity.',
  },
  overweight: {
    label: 'Overweight',
    textClass: 'text-yellow-700',
    chipClass: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    insight: 'Small and consistent nutrition changes can create strong progress over time.',
  },
  obese1: {
    label: 'Obese I',
    textClass: 'text-orange-700',
    chipClass: 'bg-orange-50 text-orange-800 border-orange-200',
    insight: 'A structured food plan with regular follow-up can improve outcomes safely.',
  },
  obese2: {
    label: 'Obese II+',
    textClass: 'text-red-700',
    chipClass: 'bg-red-50 text-red-800 border-red-200',
    insight: 'Please consult a clinician and dietician together for a supervised plan.',
  },
};

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function round1(n) {
  return Math.round(n * 10) / 10;
}

function cmToImperial(cm) {
  const totalInches = cm / 2.54;
  const ft = clamp(Math.floor(totalInches / 12), LIMITS.ft.min, LIMITS.ft.max);
  const inch = clamp(Math.round(totalInches - ft * 12), LIMITS.inch.min, LIMITS.inch.max);
  return { ft, inch };
}

function imperialToCm(ft, inch) {
  return round1((ft * 12 + inch) * 2.54);
}

function kgToLb(kg) {
  return round1(kg * 2.20462);
}

function lbToKg(lb) {
  return round1(lb / 2.20462);
}

function getCategoryKey(bmi) {
  if (bmi < 18.5) return 'underweight';
  if (bmi < 25) return 'healthy';
  if (bmi < 30) return 'overweight';
  if (bmi < 35) return 'obese1';
  return 'obese2';
}

function getNeedlePosition(bmi) {
  if (!bmi || bmi <= 0) return 5;
  if (bmi < 18.5) return Math.max(4, (bmi / 18.5) * 24);
  if (bmi < 25) return 25 + ((bmi - 18.5) / 6.5) * 25;
  if (bmi < 30) return 50 + ((bmi - 25) / 5) * 18;
  if (bmi < 35) return 68 + ((bmi - 30) / 5) * 16;
  return Math.min(96, 84 + ((bmi - 35) / 6) * 12);
}

export default function BMICalculator2Page() {
  const [unit, setUnit] = useState('metric');
  const [gender, setGender] = useState('male');
  const [age, setAge] = useState(27);

  const [metricHeight, setMetricHeight] = useState(165);
  const [metricWeight, setMetricWeight] = useState(65);

  const defaultImperial = cmToImperial(165);
  const [imperialHeight, setImperialHeight] = useState({ ft: defaultImperial.ft, inch: defaultImperial.inch });
  const [imperialWeight, setImperialWeight] = useState(143);

  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const meterHeight = useMemo(() => {
    if (unit === 'metric') return metricHeight / 100;
    return imperialToCm(imperialHeight.ft, imperialHeight.inch) / 100;
  }, [unit, metricHeight, imperialHeight]);

  const bmiPreview = useMemo(() => {
    const currentKg = unit === 'metric' ? metricWeight : lbToKg(imperialWeight);
    if (!meterHeight || !currentKg || meterHeight <= 0 || currentKg <= 0) return null;
    return round1(currentKg / (meterHeight * meterHeight));
  }, [meterHeight, metricWeight, imperialWeight, unit]);

  const changeUnit = (nextUnit) => {
    if (nextUnit === unit) return;

    if (nextUnit === 'imperial') {
      const convertedHeight = cmToImperial(metricHeight);
      setImperialHeight(convertedHeight);
      setImperialWeight(clamp(Math.round(kgToLb(metricWeight)), LIMITS.lb.min, LIMITS.lb.max));
    } else {
      const nextCm = clamp(imperialToCm(imperialHeight.ft, imperialHeight.inch), LIMITS.cm.min, LIMITS.cm.max);
      const nextKg = clamp(lbToKg(imperialWeight), LIMITS.kg.min, LIMITS.kg.max);
      setMetricHeight(Math.round(nextCm));
      setMetricWeight(round1(nextKg));
    }

    setUnit(nextUnit);
    setResult(null);
    setError('');
  };

  const calculate = () => {
    setError('');

    let heightCm;
    let weightKg;

    if (unit === 'metric') {
      heightCm = metricHeight;
      weightKg = metricWeight;
    } else {
      const ft = clamp(Number(imperialHeight.ft) || 0, LIMITS.ft.min, LIMITS.ft.max);
      const inch = clamp(Number(imperialHeight.inch) || 0, LIMITS.inch.min, LIMITS.inch.max);
      const lb = clamp(Number(imperialWeight) || 0, LIMITS.lb.min, LIMITS.lb.max);
      heightCm = imperialToCm(ft, inch);
      weightKg = lbToKg(lb);
    }

    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
      setError('Please enter valid measurements.');
      return;
    }

    const bmi = round1(weightKg / ((heightCm / 100) * (heightCm / 100)));
    const categoryKey = getCategoryKey(bmi);
    const idealMin = round1(18.5 * (heightCm / 100) * (heightCm / 100));
    const idealMax = round1(24.9 * (heightCm / 100) * (heightCm / 100));

    setResult({
      bmi,
      categoryKey,
      idealMin,
      idealMax,
      currentKg: round1(weightKg),
      needle: getNeedlePosition(bmi),
    });
  };

  const sliderClass = 'w-full accent-lime';

  return (
    <div className="min-h-screen bg-offwhite">
      <Navbar />

      <section className="relative overflow-hidden bg-gradient-to-br from-dk via-green to-dk py-14 md:py-16">
        <div className="absolute -top-24 -right-20 h-72 w-72 rounded-full bg-lime/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 h-72 w-72 rounded-full bg-gold/15 blur-3xl" />

        <div className="relative mx-auto max-w-6xl px-4 md:px-8">
          <p className="font-jetbrains-mono text-xs uppercase tracking-[0.28em] text-lime">Health Tool</p>
          <h1 className="mt-3 font-cormorant-garamond text-4xl font-bold leading-tight text-white md:text-6xl">
            BMI Calculator
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/75 md:text-base">
            Calculate your body mass index instantly and understand your ideal range with a cleaner,
            condition-aware nutrition perspective.
          </p>
        </div>
      </section>

      <section className="-mt-8 pb-14 md:-mt-10 md:pb-16">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="rounded-2xl border border-border bg-white shadow-[0_18px_40px_rgba(11,26,15,0.12)] md:rounded-3xl">
            <div className="grid grid-cols-1 gap-0 lg:grid-cols-[1.05fr_0.95fr]">
              <div className="border-b border-border p-5 md:p-7 lg:border-b-0 lg:border-r">
                <p className="font-jetbrains-mono text-xs uppercase tracking-[0.2em] text-mid">Input Details</p>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => changeUnit('metric')}
                    className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition ${
                      unit === 'metric' ? 'border-dk bg-dk text-cream' : 'border-gray-200 bg-gray-50 text-mid hover:border-mid'
                    }`}
                  >
                    Metric (kg / cm)
                  </button>
                  <button
                    type="button"
                    onClick={() => changeUnit('imperial')}
                    className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition ${
                      unit === 'imperial' ? 'border-dk bg-dk text-cream' : 'border-gray-200 bg-gray-50 text-mid hover:border-mid'
                    }`}
                  >
                    Imperial (lb / ft)
                  </button>
                </div>

                <div className="mt-6">
                  <label className="block font-jetbrains-mono text-xs uppercase tracking-[0.18em] text-mid">Gender</label>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setGender('male')}
                      className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition ${
                        gender === 'male' ? 'border-dk bg-dk text-cream' : 'border-gray-200 bg-white text-mid hover:border-mid'
                      }`}
                    >
                      Male
                    </button>
                    <button
                      type="button"
                      onClick={() => setGender('female')}
                      className={`rounded-xl border-2 px-4 py-3 text-sm font-semibold transition ${
                        gender === 'female' ? 'border-dk bg-dk text-cream' : 'border-gray-200 bg-white text-mid hover:border-mid'
                      }`}
                    >
                      Female
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <label className="font-jetbrains-mono text-xs uppercase tracking-[0.18em] text-mid">Age</label>
                    <span className="text-sm font-semibold text-dk">{age} yrs</span>
                  </div>
                  <input
                    type="range"
                    min={LIMITS.age.min}
                    max={LIMITS.age.max}
                    value={age}
                    onChange={(e) => {
                      setAge(Number(e.target.value));
                      setResult(null);
                    }}
                    className={`${sliderClass} mt-2`}
                  />
                </div>

                {unit === 'metric' ? (
                  <>
                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <label className="font-jetbrains-mono text-xs uppercase tracking-[0.18em] text-mid">Height</label>
                        <span className="text-sm font-semibold text-dk">{metricHeight} cm</span>
                      </div>
                      <input
                        type="range"
                        min={LIMITS.cm.min}
                        max={LIMITS.cm.max}
                        value={metricHeight}
                        onChange={(e) => {
                          setMetricHeight(Number(e.target.value));
                          setResult(null);
                        }}
                        className={`${sliderClass} mt-2`}
                      />
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between">
                        <label className="font-jetbrains-mono text-xs uppercase tracking-[0.18em] text-mid">Weight</label>
                        <span className="text-sm font-semibold text-dk">{metricWeight} kg</span>
                      </div>
                      <input
                        type="range"
                        min={LIMITS.kg.min}
                        max={LIMITS.kg.max}
                        step="0.5"
                        value={metricWeight}
                        onChange={(e) => {
                          setMetricWeight(Number(e.target.value));
                          setResult(null);
                        }}
                        className={`${sliderClass} mt-2`}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="mt-6">
                      <label className="font-jetbrains-mono text-xs uppercase tracking-[0.18em] text-mid">Height (ft / in)</label>
                      <div className="mt-2 grid grid-cols-2 gap-3">
                        <input
                          type="number"
                          min={LIMITS.ft.min}
                          max={LIMITS.ft.max}
                          value={imperialHeight.ft}
                          onChange={(e) => {
                            setImperialHeight((prev) => ({
                              ...prev,
                              ft: clamp(Number(e.target.value) || LIMITS.ft.min, LIMITS.ft.min, LIMITS.ft.max),
                            }));
                            setResult(null);
                          }}
                          className="rounded-xl border border-border px-3 py-2 text-dk focus:border-lime focus:outline-none"
                        />
                        <input
                          type="number"
                          min={LIMITS.inch.min}
                          max={LIMITS.inch.max}
                          value={imperialHeight.inch}
                          onChange={(e) => {
                            setImperialHeight((prev) => ({
                              ...prev,
                              inch: clamp(Number(e.target.value) || LIMITS.inch.min, LIMITS.inch.min, LIMITS.inch.max),
                            }));
                            setResult(null);
                          }}
                          className="rounded-xl border border-border px-3 py-2 text-dk focus:border-lime focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="mt-6">
                      <label className="font-jetbrains-mono text-xs uppercase tracking-[0.18em] text-mid">Weight (lb)</label>
                      <input
                        type="number"
                        min={LIMITS.lb.min}
                        max={LIMITS.lb.max}
                        value={imperialWeight}
                        onChange={(e) => {
                          setImperialWeight(clamp(Number(e.target.value) || LIMITS.lb.min, LIMITS.lb.min, LIMITS.lb.max));
                          setResult(null);
                        }}
                        className="mt-2 w-full rounded-xl border border-border px-3 py-2 text-dk focus:border-lime focus:outline-none"
                      />
                    </div>
                  </>
                )}

                {error ? <p className="mt-4 text-sm font-medium text-rust">{error}</p> : null}

                <button
                  type="button"
                  onClick={calculate}
                  className="mt-6 w-full rounded-xl bg-customSalmon px-5 py-3 text-sm font-bold text-white transition hover:scale-[1.01] hover:bg-customSalmon/90"
                >
                  Calculate My BMI
                </button>
              </div>

              <div className="p-5 md:p-7">
                {!result ? (
                  <div className="flex h-full min-h-[380px] flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-gray-50 text-center">
                    <p className="font-cormorant-garamond text-5xl font-bold text-mid">BMI</p>
                    <p className="mt-3 max-w-xs text-sm text-muted">
                      Fill your details and calculate to view BMI category, ideal range, and insight.
                    </p>
                    {bmiPreview ? (
                      <p className="mt-3 text-xs font-semibold uppercase tracking-[0.14em] text-green">
                        Live Preview: {bmiPreview}
                      </p>
                    ) : null}
                  </div>
                ) : (
                  <div className="rounded-2xl border border-border bg-gray-50 p-5 md:p-6">
                    <p className="font-jetbrains-mono text-xs uppercase tracking-[0.2em] text-mid">Your Result</p>

                    <div className="mt-3 flex items-end justify-between gap-3">
                      <p className="font-cormorant-garamond text-6xl font-bold leading-none text-dk">{result.bmi}</p>
                      <span
                        className={`rounded-full border px-3 py-1 text-xs font-semibold ${CATEGORY_META[result.categoryKey].chipClass}`}
                      >
                        {CATEGORY_META[result.categoryKey].label}
                      </span>
                    </div>

                    <div className="mt-5">
                      <div className="relative h-3 rounded-full bg-gradient-to-r from-blue-500 via-green-600 via-yellow-500 via-orange-500 to-red-800" />
                      <div
                        className="-mt-[10px] h-5 w-5 rounded-full border-2 border-white bg-dk shadow-md transition-all duration-500"
                        style={{ marginLeft: `calc(${result.needle}% - 10px)` }}
                      />
                      <div className="mt-2 flex justify-between text-[11px] text-muted">
                        <span>Under</span>
                        <span>Healthy</span>
                        <span>Over</span>
                        <span>High</span>
                      </div>
                    </div>

                    <div className="mt-5 rounded-xl border border-border bg-white p-4">
                      <p className="font-jetbrains-mono text-xs uppercase tracking-[0.18em] text-mid">Ideal Weight Range</p>
                      <p className="mt-2 text-sm font-semibold text-dk">
                        {unit === 'metric'
                          ? `${result.idealMin} kg - ${result.idealMax} kg`
                          : `${kgToLb(result.idealMin)} lb - ${kgToLb(result.idealMax)} lb`}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        Current: {unit === 'metric' ? `${result.currentKg} kg` : `${kgToLb(result.currentKg)} lb`}
                      </p>
                    </div>

                    <div className="mt-4 rounded-xl border-l-4 border-lime bg-light p-4">
                      <p className="font-jetbrains-mono text-xs uppercase tracking-[0.18em] text-mid">Eatrobust Insight</p>
                      <p className="mt-2 text-sm leading-relaxed text-text">{CATEGORY_META[result.categoryKey].insight}</p>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-xl bg-dk px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-green"
                      >
                        Talk to a Dietician
                      </Link>
                      <button
                        type="button"
                        onClick={() => setResult(null)}
                        className="rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-mid transition hover:bg-gray-50"
                      >
                        Recalculate
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-white p-5 md:p-7">
            <p className="font-jetbrains-mono text-xs uppercase tracking-[0.2em] text-rust">Next Step</p>
            <h3 className="mt-2 font-cormorant-garamond text-3xl font-bold text-dk">Need a personalized meal plan?</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
              Our in-house dieticians can translate your body composition into a practical therapeutic meal roadmap.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link href="/contact" className="rounded-xl bg-lime px-5 py-2.5 text-sm font-bold text-dk transition hover:bg-lime/90">
                Book Free Consultation
              </Link>
              <Link href="/products" className="rounded-xl border border-border px-5 py-2.5 text-sm font-semibold text-mid transition hover:bg-gray-50">
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
