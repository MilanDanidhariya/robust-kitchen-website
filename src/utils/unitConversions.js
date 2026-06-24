/**
 * Unit Conversion Utility Functions
 * Converts between metric and imperial units with proper rounding
 */

import { CONVERSIONS } from './constants';

/**
 * Convert centimeters to feet and inches
 * @param {number} cm - Height in centimeters
 * @returns {object} - Object with ft and in properties
 */
export function cmToFeetInches(cm) {
  if (cm === undefined || cm === null || cm <= 0) {
    return { ft: 0, in: 0 };
  }

  const totalInches = cm / CONVERSIONS.INCHES_TO_CM;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round((totalInches % 12) * 10) / 10;

  return { ft: feet, in: inches };
}

/**
 * Convert feet and inches to centimeters
 * @param {number} feet - Height in feet
 * @param {number} inches - Height in inches
 * @returns {number} - Height in centimeters, rounded to 1 decimal place
 */
export function feetInchesToCm(feet, inches) {
  if (feet === undefined || feet === null || feet <= 0 || inches === undefined || inches === null || inches < 0) {
    return 0;
  }

  const totalInches = feet * 12 + inches;
  const cm = totalInches * CONVERSIONS.INCHES_TO_CM;

  return Math.round(cm * 10) / 10;
}

/**
 * Convert kilograms to pounds
 * @param {number} kg - Weight in kilograms
 * @returns {number} - Weight in pounds, rounded to 1 decimal place
 */
export function kgToLb(kg) {
  if (kg === undefined || kg === null || kg <= 0) {
    return 0;
  }

  return Math.round(kg * CONVERSIONS.KG_TO_LB * 10) / 10;
}

/**
 * Convert pounds to kilograms
 * @param {number} lb - Weight in pounds
 * @returns {number} - Weight in kilograms, rounded to 1 decimal place
 */
export function lbToKg(lb) {
  if (lb === undefined || lb === null || lb <= 0) {
    return 0;
  }

  return Math.round(lb * CONVERSIONS.LB_TO_KG * 10) / 10;
}

/**
 * Convert height from metric to imperial
 * @param {number} heightCm - Height in centimeters
 * @returns {object} - Object with ft and in properties
 */
export function convertHeightMetricToImperial(heightCm) {
  return cmToFeetInches(heightCm);
}

/**
 * Convert height from imperial to metric
 * @param {number} feet - Height in feet
 * @param {number} inches - Height in inches
 * @returns {number} - Height in centimeters
 */
export function convertHeightImperialToMetric(feet, inches) {
  return feetInchesToCm(feet, inches);
}

/**
 * Convert weight from metric to imperial
 * @param {number} kg - Weight in kilograms
 * @returns {number} - Weight in pounds
 */
export function convertWeightMetricToImperial(kg) {
  return kgToLb(kg);
}

/**
 * Convert weight from imperial to metric
 * @param {number} lb - Weight in pounds
 * @returns {number} - Weight in kilograms
 */
export function convertWeightImperialToMetric(lb) {
  return lbToKg(lb);
}
