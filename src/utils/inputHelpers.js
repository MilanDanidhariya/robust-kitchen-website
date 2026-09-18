/**
 * Input Helper Functions
 * Shared helpers for the numeric inputs used by the BMI calculator
 */

/**
 * Clamp a raw input value into an allowed range.
 * Intended for use on blur — clamping while the user is still typing rewrites
 * half-finished numbers (typing "150" one key at a time would become "400").
 * @param {string|number} rawValue - Value straight from the input
 * @param {object} range - Object with min and max properties
 * @param {number} [fallback] - Value to use when the input is empty or not a number
 * @returns {number} - Value clamped to the range
 */
export function clampToRange(rawValue, range, fallback = range.min) {
  const parsed = parseInt(rawValue, 10);

  if (Number.isNaN(parsed)) {
    return fallback;
  }

  return Math.max(range.min, Math.min(range.max, parsed));
}

/**
 * Decide whether a half-typed value should be allowed into the field at all.
 *
 * The `max` attribute on a number input does not stop anyone typing past it, and
 * clamping every keystroke mangles normal typing ("150" becomes "400"). So instead
 * we reject only the keystrokes that can never lead anywhere valid:
 *
 *   weight, 60-400 lb : "1" ok (heading for 150) · "45" rejected · "500" rejected
 *   height, 3-7 ft    : "5" ok · "1" rejected (10-19 are all too tall) · "9" rejected
 *
 * A value still below the minimum is allowed through while another digit could
 * still rescue it; `clampToRange` on blur catches anything left short.
 *
 * @param {string} rawValue - Value straight from the input
 * @param {object} range - Object with min and max properties
 * @returns {boolean} - true when the value may be typed
 */
export function isAcceptableWhileTyping(rawValue, range) {
  if (rawValue === '') return true;
  if (!/^\d+$/.test(rawValue)) return false;

  const parsed = parseInt(rawValue, 10);
  if (Number.isNaN(parsed)) return false;

  if (parsed >= range.min && parsed <= range.max) return true;

  // Too small yet, but appending a digit could still land inside the range.
  return parsed < range.min && parsed * 10 <= range.max;
}

/**
 * Keys that a number input accepts but that never belong in a measurement.
 * Used with onKeyDown so "e", "+", "-" and "." cannot be typed at all.
 * @param {object} event - React keyboard event
 */
export function blockNonNumericKeys(event) {
  if (['e', 'E', '+', '-', '.'].includes(event.key)) {
    event.preventDefault();
  }
}

/**
 * Parse a raw input value while the user is typing, without clamping.
 * Keeps an empty field empty so the user can clear it and start over.
 * @param {string} rawValue - Value straight from the input
 * @returns {number|string} - Parsed number, or '' for an empty field
 */
export function parseWhileTyping(rawValue) {
  if (rawValue === '') {
    return '';
  }

  const parsed = parseInt(rawValue, 10);

  return Number.isNaN(parsed) ? '' : parsed;
}
