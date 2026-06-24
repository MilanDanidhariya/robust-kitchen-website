/**
 * BMI Calculator Constants
 * Defines BMI categories, conversion factors, input ranges, and default values
 */

export const BMI_CATEGORIES = {
  underweight: {
    range: [0, 18.5],
    label: 'Underweight',
    color: '#5B8DB5',
    badgeBg: '#EBF3FC',
    badgeColor: '#2B5EA0',
    scaleStart: 0,
    scaleEnd: 25,
    insight: 'Your BMI indicates you may be underweight. Focus on nutrient-dense, calorie-rich whole foods. Eatrobust\'s therapeutic meal plans can help you build a healthy weight with balanced nutrition.',
    accentColor: '#5B8DB5',
  },
  healthy: {
    range: [18.5, 25],
    label: 'Healthy Weight',
    color: '#2A6A40',
    badgeBg: '#E8F4EA',
    badgeColor: '#2A6A40',
    scaleStart: 25,
    scaleEnd: 50,
    insight: 'Great news — your BMI is in the healthy range! Keep it up with balanced meals and consistent habits. Eatrobust\'s therapeutic meals can help you maintain this with ease and great taste.',
    accentColor: '#4A7C5F',
  },
  overweight: {
    range: [25, 30],
    label: 'Overweight',
    color: '#A0680A',
    badgeBg: '#FDF3E2',
    badgeColor: '#A0680A',
    scaleStart: 50,
    scaleEnd: 68,
    insight: 'Your BMI suggests you are slightly above the healthy range. Small, consistent dietary changes can make a big difference. Eatrobust\'s portion-controlled therapeutic meals are designed exactly for this.',
    accentColor: '#FAE053',
  },
  obese1: {
    range: [30, 35],
    label: 'Obese I',
    color: '#B85C38',
    badgeBg: '#FDE8E2',
    badgeColor: '#B85C38',
    scaleStart: 68,
    scaleEnd: 84,
    insight: 'Your BMI falls in the Obese Class I range. We recommend speaking with a nutrition professional. Eatrobust\'s dietician-formulated meals can support sustainable weight management with real food.',
    accentColor: '#ED7E6D',
  },
  obese2plus: {
    range: [35, Infinity],
    label: 'Obese II+',
    color: '#8B2E10',
    badgeBg: '#FCE0D8',
    badgeColor: '#8B2E10',
    scaleStart: 84,
    scaleEnd: 100,
    insight: 'Your BMI indicates a higher risk range. We strongly recommend consulting a healthcare professional alongside dietary changes. Eatrobust\'s therapeutic nutrition program is designed to support your journey.',
    accentColor: '#B85C38',
  },
};

export const CONVERSIONS = {
  // Height conversions
  CM_TO_INCHES: 1 / 2.54,
  INCHES_TO_CM: 2.54,
  FEET_TO_CM: 30.48,
  
  // Weight conversions
  KG_TO_LB: 2.20462,
  LB_TO_KG: 1 / 2.20462,
};

export const INPUT_RANGES = {
  HEIGHT_METRIC: { min: 120, max: 220 },      // cm
  HEIGHT_IMPERIAL_FT: { min: 3, max: 7 },     // feet
  HEIGHT_IMPERIAL_IN: { min: 0, max: 11 },    // inches
  WEIGHT_METRIC: { min: 30, max: 180 },       // kg
  WEIGHT_IMPERIAL: { min: 60, max: 400 },     // lb
  AGE: { min: 10, max: 100 },                 // years
};

export const DEFAULTS = {
  unit: 'metric',
  gender: 'male',
  age: 27,
  height: {
    metric: 165,                    // cm
    imperial: { ft: 5, in: 5 },
  },
  weight: {
    metric: 65,                     // kg
    imperial: 143,                  // lb
  },
};

export const BMI_BOUNDARIES = {
  UNDERWEIGHT: 18.5,
  HEALTHY_MIN: 18.5,
  HEALTHY_MAX: 25,
  OVERWEIGHT_MIN: 25,
  OVERWEIGHT_MAX: 30,
  OBESE1_MIN: 30,
  OBESE1_MAX: 35,
  OBESE2PLUS_MIN: 35,
};
