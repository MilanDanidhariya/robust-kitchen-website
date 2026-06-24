/**
 * Unit Conversion Tests
 * Tests for metric/imperial conversion functions
 */

import {
  cmToFeetInches,
  feetInchesToCm,
  kgToLb,
  lbToKg,
  convertHeightMetricToImperial,
  convertHeightImperialToMetric,
  convertWeightMetricToImperial,
  convertWeightImperialToMetric,
} from './unitConversions';

describe('cmToFeetInches', () => {
  test('should convert 170cm to approximately 5 feet 7 inches', () => {
    const result = cmToFeetInches(170);
    expect(result.ft).toBe(5);
    expect(result.in).toBeCloseTo(6.9, 1);
  });

  test('should return {ft: 0, in: 0} for invalid inputs', () => {
    expect(cmToFeetInches(null)).toEqual({ ft: 0, in: 0 });
    expect(cmToFeetInches(undefined)).toEqual({ ft: 0, in: 0 });
    expect(cmToFeetInches(-10)).toEqual({ ft: 0, in: 0 });
    expect(cmToFeetInches(0)).toEqual({ ft: 0, in: 0 });
  });

  test('should convert 180cm correctly', () => {
    const result = cmToFeetInches(180);
    expect(result.ft).toBe(5);
    expect(result.in).toBeCloseTo(10.9, 1);
  });

  test('should convert 160cm correctly', () => {
    const result = cmToFeetInches(160);
    expect(result.ft).toBe(5);
    expect(result.in).toBeCloseTo(3, 0);
  });
});

describe('feetInchesToCm', () => {
  test('should convert 5 feet 7 inches to approximately 170cm', () => {
    const result = feetInchesToCm(5, 7);
    expect(result).toBeCloseTo(170, 0);
  });

  test('should return 0 for invalid inputs', () => {
    expect(feetInchesToCm(null, 5)).toBe(0);
    expect(feetInchesToCm(5, null)).toBe(0);
    expect(feetInchesToCm(undefined, 5)).toBe(0);
    expect(feetInchesToCm(5, undefined)).toBe(0);
    expect(feetInchesToCm(0, 5)).toBe(0);
    expect(feetInchesToCm(5, -1)).toBe(0);
  });

  test('should handle 0 inches correctly', () => {
    const result = feetInchesToCm(5, 0);
    expect(result).toBeCloseTo(152.4, 1);
  });

  test('should convert 6 feet 0 inches correctly', () => {
    const result = feetInchesToCm(6, 0);
    expect(result).toBeCloseTo(182.9, 1);
  });

  test('should convert 5 feet 11 inches correctly', () => {
    const result = feetInchesToCm(5, 11);
    expect(result).toBeCloseTo(180.3, 1);
  });
});

describe('kgToLb', () => {
  test('should convert 70kg to approximately 154.3 lb', () => {
    const result = kgToLb(70);
    expect(result).toBeCloseTo(154.3, 1);
  });

  test('should return 0 for invalid inputs', () => {
    expect(kgToLb(null)).toBe(0);
    expect(kgToLb(undefined)).toBe(0);
    expect(kgToLb(-10)).toBe(0);
    expect(kgToLb(0)).toBe(0);
  });

  test('should convert 65kg correctly', () => {
    const result = kgToLb(65);
    expect(result).toBeCloseTo(143.3, 1);
  });

  test('should convert 80kg correctly', () => {
    const result = kgToLb(80);
    expect(result).toBeCloseTo(176.4, 1);
  });

  test('should round to 1 decimal place', () => {
    const result = kgToLb(75.55);
    expect(result.toString()).toMatch(/^\d+\.\d$/);
  });
});

describe('lbToKg', () => {
  test('should convert 154.3 lb to approximately 70kg', () => {
    const result = lbToKg(154.3);
    expect(result).toBeCloseTo(70, 0);
  });

  test('should return 0 for invalid inputs', () => {
    expect(lbToKg(null)).toBe(0);
    expect(lbToKg(undefined)).toBe(0);
    expect(lbToKg(-10)).toBe(0);
    expect(lbToKg(0)).toBe(0);
  });

  test('should convert 143.3 lb correctly', () => {
    const result = lbToKg(143.3);
    expect(result).toBeCloseTo(65, 0);
  });

  test('should convert 200 lb correctly', () => {
    const result = lbToKg(200);
    expect(result).toBeCloseTo(90.7, 1);
  });

  test('should round to 1 decimal place', () => {
    const result = lbToKg(150.5);
    expect(result.toString()).toMatch(/^\d+\.\d$/);
  });
});

describe('convertHeightMetricToImperial', () => {
  test('should call cmToFeetInches and return feet/inches object', () => {
    const result = convertHeightMetricToImperial(170);
    expect(result).toHaveProperty('ft');
    expect(result).toHaveProperty('in');
  });

  test('should convert 170cm to approximately 5 feet 7 inches', () => {
    const result = convertHeightMetricToImperial(170);
    expect(result.ft).toBe(5);
    expect(result.in).toBeCloseTo(6.9, 1);
  });
});

describe('convertHeightImperialToMetric', () => {
  test('should call feetInchesToCm and return centimeters', () => {
    const result = convertHeightImperialToMetric(5, 7);
    expect(typeof result).toBe('number');
  });

  test('should convert 5 feet 7 inches to approximately 170cm', () => {
    const result = convertHeightImperialToMetric(5, 7);
    expect(result).toBeCloseTo(170, 0);
  });
});

describe('convertWeightMetricToImperial', () => {
  test('should call kgToLb and return pounds', () => {
    const result = convertWeightMetricToImperial(70);
    expect(typeof result).toBe('number');
  });

  test('should convert 70kg to approximately 154.3 lb', () => {
    const result = convertWeightMetricToImperial(70);
    expect(result).toBeCloseTo(154.3, 1);
  });
});

describe('convertWeightImperialToMetric', () => {
  test('should call lbToKg and return kilograms', () => {
    const result = convertWeightImperialToMetric(154.3);
    expect(typeof result).toBe('number');
  });

  test('should convert 154.3 lb to approximately 70kg', () => {
    const result = convertWeightImperialToMetric(154.3);
    expect(result).toBeCloseTo(70, 0);
  });
});

describe('Round-trip conversions', () => {
  test('should convert cm -> ft/in -> cm with minimal loss', () => {
    const originalCm = 175;
    const ftIn = cmToFeetInches(originalCm);
    const backToCm = feetInchesToCm(ftIn.ft, ftIn.in);
    expect(backToCm).toBeCloseTo(originalCm, 0);
  });

  test('should convert kg -> lb -> kg with minimal loss', () => {
    const originalKg = 72.5;
    const lb = kgToLb(originalKg);
    const backToKg = lbToKg(lb);
    expect(backToKg).toBeCloseTo(originalKg, 1);
  });
});

describe('Edge cases', () => {
  test('should handle very small valid values', () => {
    expect(cmToFeetInches(100).ft).toBe(3);
    expect(feetInchesToCm(3, 0)).toBeCloseTo(91.4, 1);
    expect(kgToLb(1)).toBeCloseTo(2.2, 1);
    expect(lbToKg(1)).toBeCloseTo(0.5, 1);
  });

  test('should handle large valid values', () => {
    const tallCm = 220;
    const result = cmToFeetInches(tallCm);
    expect(result.ft).toBe(7);
    expect(result.in).toBeCloseTo(2.6, 1);

    const heavyKg = 150;
    expect(kgToLb(heavyKg)).toBeCloseTo(330.7, 1);
  });

  test('should handle inches boundary (11.9 inches)', () => {
    const result = feetInchesToCm(5, 11.9);
    expect(result).toBeGreaterThan(180);
  });
});
