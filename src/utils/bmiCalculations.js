/**
 * BMI Calculator Utility Functions
 * Pure functions for BMI calculations, category classification, and result generation
 */

import { BMI_CATEGORIES, BMI_BOUNDARIES } from './constants';

/**
 * Calculate BMI using the formula: BMI = weight(kg) / (height(m))²
 * @param {number} heightCm - Height in centimeters
 * @param {number} weightKg - Weight in kilograms
 * @returns {number|null} - BMI rounded to 1 decimal place, or null if invalid
 */
export function calculateBMI(heightCm, weightKg) {
  // Validate inputs
  if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
    return null;
  }

  // Convert height to meters
  const heightM = heightCm / 100;

  // Calculate BMI: weight(kg) / (height(m))²
  const bmi = weightKg / (heightM * heightM);

  // Round to 1 decimal place
  return Math.round(bmi * 10) / 10;
}

/**
 * Classify BMI into one of five categories
 * @param {number} bmi - BMI value
 * @returns {string} - Category key: 'underweight', 'healthy', 'overweight', 'obese1', 'obese2plus'
 */
export function classifyBMI(bmi) {
  if (bmi < BMI_BOUNDARIES.UNDERWEIGHT) return 'underweight';
  if (bmi < BMI_BOUNDARIES.HEALTHY_MAX) return 'healthy';
  if (bmi < BMI_BOUNDARIES.OVERWEIGHT_MAX) return 'overweight';
  if (bmi < BMI_BOUNDARIES.OBESE1_MAX) return 'obese1';
  return 'obese2plus';
}

/**
 * Calculate ideal weight range for a given height
 * @param {number} heightCm - Height in centimeters
 * @returns {object} - Object with min and max ideal weight in kg
 */
export function calculateIdealWeightRange(heightCm) {
  if (!heightCm || heightCm <= 0) {
    return { min: null, max: null };
  }

  const heightM = heightCm / 100;

  // BMI 18.5 (minimum healthy)
  const minKg = Math.round(BMI_BOUNDARIES.HEALTHY_MIN * heightM * heightM * 10) / 10;

  // BMI 24.9 (maximum healthy)
  const maxKg = Math.round(BMI_BOUNDARIES.HEALTHY_MAX * heightM * heightM * 10) / 10;

  return { min: minKg, max: maxKg };
}

/**
 * Calculate needle position on the BMI scale (0-100%)
 * Maps BMI value to percentage based on scale zones
 * @param {number} bmi - BMI value
 * @returns {number} - Needle position as percentage (0-100)
 */
export function calculateNeedlePosition(bmi) {
  if (!bmi || bmi < 0) return 0;

  // Scale zones: 0-25% (underweight), 25-50% (healthy), 50-68% (overweight), 68-84% (obese1), 84-100% (obese2+)

  if (bmi < BMI_BOUNDARIES.UNDERWEIGHT) {
    // Underweight: 0-25%
    return Math.max(2, (bmi / BMI_BOUNDARIES.UNDERWEIGHT) * 25);
  } else if (bmi < BMI_BOUNDARIES.HEALTHY_MAX) {
    // Healthy: 25-50%
    return 25 + ((bmi - BMI_BOUNDARIES.HEALTHY_MIN) / (BMI_BOUNDARIES.HEALTHY_MAX - BMI_BOUNDARIES.HEALTHY_MIN)) * 25;
  } else if (bmi < BMI_BOUNDARIES.OVERWEIGHT_MAX) {
    // Overweight: 50-68%
    return 50 + ((bmi - BMI_BOUNDARIES.OVERWEIGHT_MIN) / (BMI_BOUNDARIES.OVERWEIGHT_MAX - BMI_BOUNDARIES.OVERWEIGHT_MIN)) * 18;
  } else if (bmi < BMI_BOUNDARIES.OBESE1_MAX) {
    // Obese I: 68-84%
    return 68 + ((bmi - BMI_BOUNDARIES.OBESE1_MIN) / (BMI_BOUNDARIES.OBESE1_MAX - BMI_BOUNDARIES.OBESE1_MIN)) * 16;
  } else {
    // Obese II+: 84-100%
    return Math.min(97, 84 + ((bmi - BMI_BOUNDARIES.OBESE2PLUS_MIN) / 5) * 13);
  }
}

/**
 * Generate complete calculation result object
 * @param {number} heightCm - Height in centimeters
 * @param {number} weightKg - Weight in kilograms
 * @returns {object|null} - Result object with all calculated values, or null if invalid
 */
export function generateCalculationResult(heightCm, weightKg) {
  // Calculate BMI
  const bmi = calculateBMI(heightCm, weightKg);
  if (bmi === null) {
    return null;
  }

  // Classify BMI
  const categoryKey = classifyBMI(bmi);
  const categoryData = BMI_CATEGORIES[categoryKey];

  // Calculate ideal weight range
  const { min: idealMin, max: idealMax } = calculateIdealWeightRange(heightCm);

  // Calculate needle position
  const needlePosition = calculateNeedlePosition(bmi);

  return {
    bmi,
    category: categoryKey,
    categoryLabel: categoryData.label,
    categoryColor: categoryData.color,
    badgeBg: categoryData.badgeBg,
    badgeColor: categoryData.badgeColor,
    idealWeightMin: idealMin,
    idealWeightMax: idealMax,
    currentWeight: Math.round(weightKg * 10) / 10,
    needlePosition,
    insight: categoryData.insight,
    accentColor: categoryData.accentColor,
  };
}
