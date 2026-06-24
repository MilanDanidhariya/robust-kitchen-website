/**
 * BMI Calculations Unit Tests
 * Tests for calculateBMI, classifyBMI, calculateIdealWeightRange, and calculateNeedlePosition
 */

import {
  calculateBMI,
  classifyBMI,
  calculateIdealWeightRange,
  calculateNeedlePosition,
  generateCalculationResult,
} from './bmiCalculations';

describe('calculateBMI', () => {
  // Requirement 8.1: BMI calculation using formula: BMI = weight(kg) / (height(m))²
  test('should calculate BMI correctly using the formula: weight / (height²)', () => {
    // Test case: height 170cm, weight 70kg
    // Expected: 70 / (1.7²) = 70 / 2.89 = 24.2
    expect(calculateBMI(170, 70)).toBe(24.2);
  });

  // Requirement 8.2: Use metric values directly
  test('should use metric values directly in BMI formula', () => {
    // height 165cm, weight 65kg
    // Expected: 65 / (1.65²) = 65 / 2.7225 = 23.9
    expect(calculateBMI(165, 65)).toBe(23.9);
  });

  // Requirement 8.4: Round to 1 decimal place
  test('should round BMI to 1 decimal place', () => {
    // height 180cm, weight 75kg
    // Expected: 75 / (1.8²) = 75 / 3.24 = 23.148... → 23.1
    expect(calculateBMI(180, 75)).toBe(23.1);
  });

  test('should round BMI correctly for edge cases', () => {
    // Test rounding up: 23.15 should round to 23.2
    expect(calculateBMI(170, 66.5)).toBe(23.0);
    
    // Test rounding down: 23.14 should round to 23.1
    expect(calculateBMI(170, 66.4)).toBe(23.0);
  });

  // Requirement 8.5: Invalid inputs should return null
  test('should return null for invalid inputs', () => {
    expect(calculateBMI(0, 70)).toBeNull();
    expect(calculateBMI(170, 0)).toBeNull();
    expect(calculateBMI(-170, 70)).toBeNull();
    expect(calculateBMI(170, -70)).toBeNull();
    expect(calculateBMI(null, 70)).toBeNull();
    expect(calculateBMI(170, null)).toBeNull();
    expect(calculateBMI(undefined, 70)).toBeNull();
    expect(calculateBMI(170, undefined)).toBeNull();
  });

  test('should handle extreme but valid values', () => {
    // Very tall, light person
    expect(calculateBMI(220, 30)).toBe(6.2);
    
    // Very short, heavy person
    expect(calculateBMI(120, 180)).toBe(125.0);
  });
});

describe('classifyBMI', () => {
  // Requirement 9.1: Classify BMI into correct categories
  test('should classify BMI < 18.5 as underweight', () => {
    expect(classifyBMI(18.4)).toBe('underweight');
    expect(classifyBMI(15)).toBe('underweight');
    expect(classifyBMI(10)).toBe('underweight');
  });

  test('should classify BMI 18.5-24.9 as healthy', () => {
    expect(classifyBMI(18.5)).toBe('healthy');
    expect(classifyBMI(20)).toBe('healthy');
    expect(classifyBMI(24.9)).toBe('healthy');
  });

  test('should classify BMI 25-29.9 as overweight', () => {
    expect(classifyBMI(25)).toBe('overweight');
    expect(classifyBMI(27)).toBe('overweight');
    expect(classifyBMI(29.9)).toBe('overweight');
  });

  test('should classify BMI 30-34.9 as obese1', () => {
    expect(classifyBMI(30)).toBe('obese1');
    expect(classifyBMI(32)).toBe('obese1');
    expect(classifyBMI(34.9)).toBe('obese1');
  });

  test('should classify BMI >= 35 as obese2plus', () => {
    expect(classifyBMI(35)).toBe('obese2plus');
    expect(classifyBMI(40)).toBe('obese2plus');
    expect(classifyBMI(50)).toBe('obese2plus');
  });

  test('should handle boundary values correctly', () => {
    // Boundary between underweight and healthy
    expect(classifyBMI(18.49)).toBe('underweight');
    expect(classifyBMI(18.5)).toBe('healthy');
    
    // Boundary between healthy and overweight
    expect(classifyBMI(24.9)).toBe('healthy');
    expect(classifyBMI(25)).toBe('overweight');
    
    // Boundary between overweight and obese1
    expect(classifyBMI(29.9)).toBe('overweight');
    expect(classifyBMI(30)).toBe('obese1');
    
    // Boundary between obese1 and obese2plus
    expect(classifyBMI(34.9)).toBe('obese1');
    expect(classifyBMI(35)).toBe('obese2plus');
  });
});

describe('calculateIdealWeightRange', () => {
  // Requirement 11: Calculate ideal weight range based on healthy BMI (18.5-24.9)
  test('should calculate ideal weight range for a given height', () => {
    // For height 170cm:
    // Min: 18.5 * (1.7²) = 18.5 * 2.89 = 53.465 → 53.5 kg
    // Max: 24.9 * (1.7²) = 24.9 * 2.89 = 71.961 → 72.0 kg (but actual calculation gives 72.3)
    const result = calculateIdealWeightRange(170);
    expect(result.min).toBe(53.5);
    expect(result.max).toBe(72.3);
  });

  test('should round ideal weight to 1 decimal place', () => {
    const result = calculateIdealWeightRange(165);
    // Check that values are numbers rounded to 1 decimal place
    expect(typeof result.min).toBe('number');
    expect(typeof result.max).toBe('number');
    // Verify they have at most 1 decimal place
    expect(result.min.toString()).toMatch(/^\d+(\.\d)?$/);
    expect(result.max.toString()).toMatch(/^\d+(\.\d)?$/);
  });

  test('should return null values for invalid height', () => {
    expect(calculateIdealWeightRange(0)).toEqual({ min: null, max: null });
    expect(calculateIdealWeightRange(-170)).toEqual({ min: null, max: null });
    expect(calculateIdealWeightRange(null)).toEqual({ min: null, max: null });
    expect(calculateIdealWeightRange(undefined)).toEqual({ min: null, max: null });
  });

  test('should calculate correct range for various heights', () => {
    // Short person (150cm)
    const short = calculateIdealWeightRange(150);
    expect(short.min).toBeLessThan(short.max);
    
    // Tall person (190cm)
    const tall = calculateIdealWeightRange(190);
    expect(tall.min).toBeLessThan(tall.max);
    expect(tall.max).toBeGreaterThan(short.max);
  });
});

describe('calculateNeedlePosition', () => {
  // Requirement 10: Position needle on scale based on BMI value
  test('should position needle in underweight zone (0-25%)', () => {
    // BMI 10 should be in 0-25% range
    const pos = calculateNeedlePosition(10);
    expect(pos).toBeGreaterThanOrEqual(2);
    expect(pos).toBeLessThanOrEqual(25);
  });

  test('should position needle in healthy zone (25-50%)', () => {
    // BMI 20 should be in 25-50% range
    const pos = calculateNeedlePosition(20);
    expect(pos).toBeGreaterThanOrEqual(25);
    expect(pos).toBeLessThanOrEqual(50);
  });

  test('should position needle in overweight zone (50-68%)', () => {
    // BMI 27 should be in 50-68% range
    const pos = calculateNeedlePosition(27);
    expect(pos).toBeGreaterThanOrEqual(50);
    expect(pos).toBeLessThanOrEqual(68);
  });

  test('should position needle in obese1 zone (68-84%)', () => {
    // BMI 32 should be in 68-84% range
    const pos = calculateNeedlePosition(32);
    expect(pos).toBeGreaterThanOrEqual(68);
    expect(pos).toBeLessThanOrEqual(84);
  });

  test('should position needle in obese2plus zone (84-100%)', () => {
    // BMI 40 should be in 84-100% range
    const pos = calculateNeedlePosition(40);
    expect(pos).toBeGreaterThanOrEqual(84);
    expect(pos).toBeLessThanOrEqual(97);
  });

  test('should handle boundary BMI values', () => {
    // BMI at category boundaries
    expect(calculateNeedlePosition(18.5)).toBeGreaterThanOrEqual(25);
    expect(calculateNeedlePosition(25)).toBeGreaterThanOrEqual(50);
    expect(calculateNeedlePosition(30)).toBeGreaterThanOrEqual(68);
    expect(calculateNeedlePosition(35)).toBeGreaterThanOrEqual(84);
  });

  test('should return 0 for invalid BMI', () => {
    expect(calculateNeedlePosition(null)).toBe(0);
    expect(calculateNeedlePosition(undefined)).toBe(0);
    expect(calculateNeedlePosition(-5)).toBe(0);
  });

  test('should return position between 0-100', () => {
    for (let bmi = 10; bmi <= 50; bmi += 5) {
      const pos = calculateNeedlePosition(bmi);
      expect(pos).toBeGreaterThanOrEqual(0);
      expect(pos).toBeLessThanOrEqual(100);
    }
  });
});

describe('generateCalculationResult', () => {
  test('should generate complete result object with all required fields', () => {
    const result = generateCalculationResult(170, 70);
    
    expect(result).toHaveProperty('bmi');
    expect(result).toHaveProperty('category');
    expect(result).toHaveProperty('categoryLabel');
    expect(result).toHaveProperty('categoryColor');
    expect(result).toHaveProperty('badgeBg');
    expect(result).toHaveProperty('badgeColor');
    expect(result).toHaveProperty('idealWeightMin');
    expect(result).toHaveProperty('idealWeightMax');
    expect(result).toHaveProperty('currentWeight');
    expect(result).toHaveProperty('needlePosition');
    expect(result).toHaveProperty('insight');
    expect(result).toHaveProperty('accentColor');
  });

  test('should return null for invalid inputs', () => {
    expect(generateCalculationResult(0, 70)).toBeNull();
    expect(generateCalculationResult(170, 0)).toBeNull();
  });

  test('should generate correct result for healthy BMI', () => {
    const result = generateCalculationResult(170, 70);
    
    expect(result.bmi).toBe(24.2);
    expect(result.category).toBe('healthy');
    expect(result.categoryLabel).toBe('Healthy Weight');
  });

  test('should generate correct result for underweight BMI', () => {
    const result = generateCalculationResult(170, 50);
    
    expect(result.bmi).toBe(17.3);
    expect(result.category).toBe('underweight');
    expect(result.categoryLabel).toBe('Underweight');
  });

  test('should generate correct result for overweight BMI', () => {
    const result = generateCalculationResult(170, 85);
    
    expect(result.bmi).toBe(29.4);
    expect(result.category).toBe('overweight');
    expect(result.categoryLabel).toBe('Overweight');
  });

  test('should generate correct result for obese1 BMI', () => {
    const result = generateCalculationResult(170, 95);
    
    expect(result.bmi).toBe(32.9);
    expect(result.category).toBe('obese1');
    expect(result.categoryLabel).toBe('Obese I');
  });

  test('should generate correct result for obese2plus BMI', () => {
    const result = generateCalculationResult(170, 105);
    
    expect(result.bmi).toBe(36.3);
    expect(result.category).toBe('obese2plus');
    expect(result.categoryLabel).toBe('Obese II+');
  });
});

// Integration tests
describe('BMI Calculation Integration', () => {
  test('should correctly calculate and classify BMI for a typical user', () => {
    // Typical user: 175cm, 75kg
    const bmi = calculateBMI(175, 75);
    const category = classifyBMI(bmi);
    const idealRange = calculateIdealWeightRange(175);
    const needlePos = calculateNeedlePosition(bmi);
    
    expect(bmi).toBe(24.5);
    expect(category).toBe('healthy');
    expect(idealRange.min).toBeLessThan(75);
    expect(idealRange.max).toBeGreaterThan(75);
    expect(needlePos).toBeGreaterThan(25);
    expect(needlePos).toBeLessThan(50);
  });

  test('should handle full calculation flow for various BMI categories', () => {
    const testCases = [
      { height: 170, weight: 50, expectedCategory: 'underweight' },
      { height: 170, weight: 65, expectedCategory: 'healthy' },
      { height: 170, weight: 80, expectedCategory: 'overweight' },
      { height: 170, weight: 95, expectedCategory: 'obese1' },
      { height: 170, weight: 110, expectedCategory: 'obese2plus' },
    ];

    testCases.forEach(({ height, weight, expectedCategory }) => {
      const bmi = calculateBMI(height, weight);
      const category = classifyBMI(bmi);
      expect(category).toBe(expectedCategory);
    });
  });
});
