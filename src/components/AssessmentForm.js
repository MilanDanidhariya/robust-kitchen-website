'use client';

import React, { useState, useRef } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, ClipboardList, Info, Lightbulb } from 'lucide-react';

const BRAND = '#2D6A2D';
const BRAND_LIGHT = '#E8F5E9';
const BRAND_MID = '#4CAF50';

const FLAG_COLORS = {
  green: { bg: '#E8F5E9', border: '#4CAF50', text: '#1B5E20' },
  yellow: { bg: '#FFFDE7', border: '#F9A825', text: '#7d6000' },
  orange: { bg: '#FFF3E0', border: '#F57C00', text: '#6D3000' },
  red: { bg: '#FFEBEE', border: '#E53935', text: '#7f0000' },
};

const QUESTIONS = [
  {
    id: 'q1',
    section: 'BMI & Nutritional Risk',
    label: 'BMI',
    note: 'Auto-calculated from your height and weight above.',
    computed: true,
    options: [
      { score: 3, label: 'Normal (18.5–24.9)', flag: 'green', msg: 'Healthy body weight', alert: 'Your BMI is in the healthy range — great foundation for your nutrition goals.' },
      { score: 2, label: 'Mild Underweight (17–18.4) or Overweight (25–29.9)', flag: 'yellow', msg: 'Slight deviation', alert: 'Your weight is slightly outside the healthy range. No major concern now, but worth addressing with a structured plan.' },
      { score: 1, label: 'Moderate Underweight (16–16.9) or Obese (30–34.9)', flag: 'orange', msg: 'Weight imbalance', alert: 'Your BMI indicates an imbalanced zone. A structured diet plan is recommended.' },
      { score: 0, label: 'Severe Underweight (<16) or Severe Obesity (≥35)', flag: 'red', msg: 'High nutritional risk', alert: 'Your BMI is in the danger zone. Immediate dietary intervention is required — your body is under significant stress.' },
    ],
  },
  {
    id: 'q2',
    section: 'BMI & Nutritional Risk',
    label: 'Weight Change in Last 3 Months',
    sub: true,
    subQuestion: 'Did your weight change in the last 3 months?',
    subOptions: ['No change (stable)', 'I lost weight', 'I gained weight'],
    lossOptions: [
      { score: 3, label: 'No weight loss', flag: 'green', msg: 'Weight is stable', alert: 'Your weight is stable — a good sign.' },
      { score: 2, label: 'Less than 5% loss', flag: 'yellow', msg: 'Minor weight loss', alert: 'Some weight change occurred. Monitor to ensure it\'s not a continuing trend.' },
      { score: 1, label: '5–10% loss', flag: 'orange', msg: 'Moderate weight loss', alert: '5–10% weight loss indicates moderate risk. Muscle loss may be affecting your nutritional status.' },
      { score: 0, label: 'More than 10% loss', flag: 'red', msg: 'Significant weight loss', alert: 'More than 10% weight loss is a serious clinical sign. Immediate evaluation is necessary.' },
    ],
    gainOptions: [
      { score: 3, label: 'No weight gain', flag: 'green', msg: 'Weight is stable', alert: 'Your weight is stable — a good sign.' },
      { score: 2, label: 'Less than 5% gain', flag: 'yellow', msg: 'Slight weight gain', alert: 'Some weight gain occurred. Monitor to ensure it\'s not a continuing trend.' },
      { score: 1, label: '5–10% gain', flag: 'orange', msg: 'Excess weight gain', alert: '5–10% weight gain indicates moderate risk. Fat accumulation may be affecting your nutritional status.' },
      { score: 0, label: 'More than 10% gain', flag: 'red', msg: 'Rapid weight gain', alert: 'More than 10% weight gain is a serious clinical sign. Immediate evaluation is necessary.' },
    ],
  },
  {
    id: 'q3',
    section: 'Appetite & Food Intake',
    label: 'Current Food Intake',
    options: [
      { score: 3, label: 'Normal solid food', flag: 'green', msg: 'Normal diet', alert: 'You\'re eating normally — this is the foundation for good nutrition.' },
      { score: 2, label: 'Soft diet', flag: 'yellow', msg: 'Diet slightly restricted', alert: 'A soft diet limits certain nutrients — fibre, protein, and some vitamins are slightly compromised.' },
      { score: 1, label: 'Liquid diet', flag: 'orange', msg: 'Limited food intake', alert: 'Relying solely on a liquid diet cannot provide adequate calories and protein. This leads to muscle loss over time.' },
      { score: 0, label: 'Tube feeding / NPO (nothing by mouth)', flag: 'red', msg: 'No adequate oral intake', alert: 'Tube feeding or NPO is a medical-level nutritional emergency. The body is entirely deprived of normal nutrients.' },
    ],
  },
  {
    id: 'q4',
    section: 'Appetite & Food Intake',
    label: 'Diet Pattern Followed',
    options: [
      { score: 3, label: 'Balanced meal (carbs + protein + fats + vegetables)', flag: 'green', msg: 'Balanced eating pattern', alert: 'Excellent — a balanced diet is the cornerstone of good health.' },
      { score: 2, label: 'No unnecessary restriction — mostly appropriate', flag: 'yellow', msg: 'Diet mostly appropriate', alert: 'Good overall, but a truly balanced diet has not yet been fully achieved.' },
      { score: 1, label: 'Occasional dieting / fasting', flag: 'orange', msg: 'Irregular dietary pattern', alert: 'Occasional fasting slows metabolism and causes your body to miss essential nutrients on those days.' },
      { score: 0, label: 'Extreme dieting / keto / very restrictive plans', flag: 'red', msg: 'Unhealthy restrictive diet', alert: 'Extreme dieting without medical supervision can damage the heart, kidneys, and bones over time.' },
    ],
  },
  {
    id: 'q5',
    section: 'Meal Pattern',
    label: 'Meals per Day',
    options: [
      { score: 3, label: '3 meals daily', flag: 'green', msg: 'Adequate meal frequency', alert: 'Great — 3 meals a day keeps blood sugar stable and metabolism active.' },
      { score: 2, label: '2 meals daily', flag: 'yellow', msg: 'Slightly reduced meals', alert: 'Two meals per day is below what is needed to maintain energy and meet nutrient requirements.' },
      { score: 1, label: '1 meal daily', flag: 'orange', msg: 'Low meal frequency', alert: 'One meal a day leads to blood sugar crashes, chronic fatigue, and progressive nutrient deficiency.' },
      { score: 0, label: 'Irregular / skip meals', flag: 'red', msg: 'Poor eating pattern', alert: 'Irregular or skipped meals damage both metabolism and gut health over time.' },
    ],
  },
  {
    id: 'q6',
    section: 'Meal Pattern',
    label: 'Breakfast Habit',
    options: [
      { score: 3, label: 'Daily', flag: 'green', msg: 'Healthy breakfast habit', alert: 'Eating breakfast daily is excellent — it sets the tone for the rest of the day.' },
      { score: 2, label: '3–4 days per week', flag: 'yellow', msg: 'Moderate consistency', alert: 'Skipping breakfast a few days a week can affect blood sugar control, focus, and morning energy.' },
      { score: 1, label: 'Rarely', flag: 'orange', msg: 'Irregular habit', alert: 'Frequently skipping breakfast can lead to long-term weight gain, acidity, and low energy levels.' },
      { score: 0, label: 'Never', flag: 'red', msg: 'Skipping breakfast regularly', alert: 'Never eating breakfast slows metabolism, increases acidity, and leaves daily nutrient intake chronically inadequate.' },
    ],
  },
  {
    id: 'q7',
    section: 'Daily Nutrient Intake',
    label: 'Main Energy Source',
    options: [
      { score: 3, label: 'Balanced diet (carbs + protein + fats)', flag: 'green', msg: 'Balanced nutrient intake', alert: 'Excellent — your body is receiving all three macronutrients it needs.' },
      { score: 2, label: 'Mostly carbohydrates (roti, rice)', flag: 'yellow', msg: 'Slight carb dominance', alert: 'Mostly carb-based diet — protein and healthy fats are slightly insufficient. This can lead to muscle loss over time.' },
      { score: 1, label: 'High carbohydrate intake (carb-heavy meals)', flag: 'orange', msg: 'Imbalanced diet', alert: 'A carb-heavy diet causes blood sugar spikes and crashes, low sustained energy, and inadequate protein intake.' },
      { score: 0, label: 'Very high carbs, very low protein', flag: 'red', msg: 'Poor nutrient balance', alert: 'This directly causes muscle wasting, weakened immunity, and metabolic complications.' },
    ],
  },
  {
    id: 'q8',
    section: 'Daily Nutrient Intake',
    label: 'Protein Intake Frequency',
    hasChecklist: true,
    checklistLabel: 'Which protein sources do you consume? (tick all that apply)',
    checklistItems: ['Pulses / Beans', 'Milk / Curd', 'Paneer / Soya', 'Egg', 'Chicken / Fish'],
    options: [
      { score: 3, label: 'Daily', flag: 'green', msg: 'Adequate protein intake', alert: 'Great — you\'re meeting your daily protein needs for muscle repair and immunity.' },
      { score: 2, label: '4–5 days per week', flag: 'yellow', msg: 'Slightly low protein', alert: '4–5 days is not enough — your body needs protein daily for ongoing repair, especially as we age.' },
      { score: 1, label: '2–3 days per week', flag: 'orange', msg: 'Low protein intake', alert: 'Protein only 2–3 days a week leads to muscle weakness, slow healing, and reduced immunity.' },
      { score: 0, label: 'Rarely / Never', flag: 'red', msg: 'Protein deficiency risk', alert: 'Rarely consuming protein is a serious nutritional deficiency causing muscle loss, weak bones, hair fall, and poor immunity.' },
    ],
  },
  {
    id: 'q9',
    section: 'Daily Nutrient Intake',
    label: 'Milk & Dairy Intake',
    sublabel: '(milk, curd, paneer, buttermilk, etc.)',
    options: [
      { score: 3, label: 'Daily (1–2 servings or more)', flag: 'green', msg: 'Good calcium intake', alert: 'Daily dairy intake ensures adequate calcium, Vitamin D, and B12.' },
      { score: 2, label: '4–5 days per week', flag: 'yellow', msg: 'Moderate intake', alert: 'Slightly below requirement. Calcium is needed daily as the body cannot store it adequately for extended periods.' },
      { score: 1, label: '2–3 days per week', flag: 'orange', msg: 'Low calcium intake', alert: 'Very limited calcium. This significantly increases the risk of osteoporosis and Vitamin B12 deficiency over time.' },
      { score: 0, label: 'Rarely / Never', flag: 'red', msg: 'Very low calcium intake', alert: 'This is a major risk for calcium and Vitamin B12 deficiency — affecting bones, nerves, and blood health.' },
    ],
  },
  {
    id: 'q10',
    section: 'Daily Nutrient Intake',
    label: 'Vegetable Intake',
    options: [
      { score: 3, label: '2–3 servings per day', flag: 'green', msg: 'Adequate vegetable intake', alert: 'Excellent vegetable intake — you\'re meeting your fibre and micronutrient needs.' },
      { score: 2, label: '1 serving per day', flag: 'yellow', msg: 'Acceptable intake', alert: 'One serving per day is below the recommended 2–3 servings. Fibre and micronutrient requirements are not fully met.' },
      { score: 1, label: '3–4 days per week (not daily)', flag: 'orange', msg: 'Low intake', alert: 'Eating vegetables only 3–4 days a week negatively impacts gut health, immunity, and skin health.' },
      { score: 0, label: 'Rarely / Never', flag: 'red', msg: 'Poor fibre & micronutrient intake', alert: 'Not eating vegetables leads to constipation, low immunity, vitamin deficiencies, and increased risk of chronic disease.' },
    ],
  },
  {
    id: 'q11',
    section: 'Daily Nutrient Intake',
    label: 'Fruit Intake',
    options: [
      { score: 3, label: 'Daily', flag: 'green', msg: 'Good fruit intake', alert: 'Daily fruit intake supports immunity, skin health, and healthy digestion.' },
      { score: 2, label: '3–4 days per week', flag: 'yellow', msg: 'Acceptable intake', alert: '3–4 days a week is slightly below ideal — aim for at least one fruit daily to meet vitamin and antioxidant needs.' },
      { score: 1, label: 'Rarely (1–2 days per week)', flag: 'orange', msg: 'Low intake', alert: 'Rarely eating fruit leads to insufficient Vitamin C and antioxidant intake, weakening immunity.' },
      { score: 0, label: 'Never', flag: 'red', msg: 'Very low micronutrient intake', alert: 'Never eating fruit is a direct risk for Vitamin C deficiency, poor immunity, and increased oxidative stress.' },
    ],
  },
  {
    id: 'q12',
    section: 'Sleep Quality',
    label: 'Sleep Duration & Quality',
    sleepNote: true,
    options: [
      { score: 3, label: '7–9 hours, restful sleep', flag: 'green', msg: 'Healthy sleep — supports good metabolism', alert: 'Great sleep habits — your body is recovering and regulating hormones effectively.' },
      { score: 2, label: '6–7 hours, mostly restful', flag: 'yellow', msg: 'Slightly low — minor impact on energy', alert: '6–7 hours is slightly below optimal — mild fatigue, mood changes, and appetite disruption may occur.' },
      { score: 1, label: 'Less than 6 hours or very disturbed sleep', flag: 'orange', msg: 'Poor sleep affecting appetite & recovery', alert: 'Poor sleep throws hunger hormones out of balance, increasing cravings and leading to poor food choices.' },
      { score: 0, label: 'Less than 4 hours or chronic insomnia', flag: 'red', msg: 'Severely impacting nutritional health', alert: 'Chronic sleep deprivation completely disrupts the body\'s repair mechanisms — seriously impacting nutrient absorption and immunity.' },
    ],
  },
  {
    id: 'q13',
    section: 'Junk Food & Sugar',
    label: 'Fried / Fast Food / Outside Food',
    options: [
      { score: 3, label: 'Rarely (once a month or less)', flag: 'green', msg: 'Healthy eating habit', alert: 'Excellent — minimal exposure to trans fats, excess sodium, and empty calories.' },
      { score: 2, label: '1–2 times per week', flag: 'yellow', msg: 'Controlled intake', alert: 'Within control — but ensure this does not become a daily habit, as calories and sodium quietly accumulate.' },
      { score: 1, label: '3–4 times per week', flag: 'orange', msg: 'Frequent junk food intake', alert: 'This level of intake raises LDL cholesterol, blood pressure, and body weight significantly over time.' },
      { score: 0, label: 'Daily', flag: 'red', msg: 'Excess junk food — high risk', alert: 'Daily fried or outside food is a direct contributor to heart disease, obesity, and fatty liver disease.' },
    ],
  },
  {
    id: 'q14',
    section: 'Junk Food & Sugar',
    label: 'Sugary Drinks & Sweets',
    options: [
      { score: 3, label: 'Rarely (once a month or less)', flag: 'green', msg: 'Low sugar intake', alert: 'Excellent — minimal sugar means better blood glucose control and reduced inflammation.' },
      { score: 2, label: '1–2 times per week', flag: 'yellow', msg: 'Moderate intake', alert: 'Manageable — but be mindful of hidden sugars in tea, packaged juices, and biscuits.' },
      { score: 1, label: '3–4 times per week', flag: 'orange', msg: 'High sugar intake', alert: 'Excessive sugar intake. Blood sugar control and weight management are both being actively compromised.' },
      { score: 0, label: 'Daily', flag: 'red', msg: 'Excess sugar — diabetes risk', alert: 'Daily sugary food and drinks cause continuous blood glucose spikes — posing a direct risk of diabetes and progressive weight gain.' },
    ],
  },
  {
    id: 'q15',
    section: 'Water & Digestion',
    label: 'Water Intake per Day',
    options: [
      { score: 3, label: 'More than 8 glasses', flag: 'green', msg: 'Excellent hydration', alert: 'Excellent hydration — your body is well equipped to flush toxins and support kidney function.' },
      { score: 2, label: '6–8 glasses', flag: 'yellow', msg: 'Adequate hydration', alert: '6–8 glasses is acceptable, but 8+ should be the daily target. Mild dehydration quietly affects energy and digestion.' },
      { score: 1, label: 'Less than 6 glasses or don\'t know', flag: 'orange', msg: 'Low / uncertain hydration', alert: 'Risk of kidney stones, constipation, UTIs, and fatigue increases significantly at this intake level.' },
      { score: 0, label: 'Barely drinks water (1–2 glasses)', flag: 'red', msg: 'Severely dehydrated — high risk', alert: 'Severe dehydration poses direct risks of blood pressure drops, kidney stress, toxin buildup, and extreme fatigue.' },
    ],
  },
  {
    id: 'q16',
    section: 'Water & Digestion',
    label: 'Appetite',
    hasDigestive: true,
    digestiveLabel: 'Digestive issues (tick all that apply)',
    digestiveItems: ['Gas / Bloating', 'Acidity / Heartburn', 'Constipation', 'Diarrhea', 'Nausea / Vomiting', 'Indigestion'],
    options: [
      { score: 3, label: 'Normal', flag: 'green', msg: 'Healthy appetite', alert: 'Normal appetite — your body\'s hunger signals are functioning well.' },
      { score: 2, label: 'Reduced', flag: 'yellow', msg: 'Slight reduction in appetite', alert: 'Slightly reduced appetite may be related to stress, poor sleep, or a mild gut issue. Monitor and address early.' },
      { score: 1, label: 'Poor', flag: 'orange', msg: 'Low appetite', alert: 'Poor appetite means the body is consistently eating less than it needs — leading to weakness and nutrient deficiencies.' },
      { score: 0, label: 'Not eating', flag: 'red', msg: 'Very poor intake — high risk', alert: 'Not eating at all is a serious medical concern — immediate clinical evaluation is necessary.' },
    ],
  },
  {
    id: 'q17',
    section: 'Mobility, Weakness & Activity',
    label: 'Mobility',
    options: [
      { score: 3, label: 'Normal — fully independent', flag: 'green', msg: 'Independent mobility', alert: 'Full independent mobility is excellent — your musculoskeletal health supports normal nutritional activity.' },
      { score: 2, label: 'Walks with support', flag: 'yellow', msg: 'Mild limitation', alert: 'Needing support to walk indicates mild limitation — muscle strengthening through diet and activity is important.' },
      { score: 1, label: 'Sits independently but cannot walk', flag: 'orange', msg: 'Restricted mobility', alert: 'Restricted mobility significantly affects both nutritional intake and quality of life.' },
      { score: 0, label: 'Bedridden', flag: 'red', msg: 'Severe limitation', alert: 'Being bedridden is a high-risk state — maximum risk of pressure sores, rapid muscle wasting, and severe nutritional deficiency.' },
    ],
  },
  {
    id: 'q18',
    section: 'Mobility, Weakness & Activity',
    label: 'Weakness / Fatigue',
    options: [
      { score: 3, label: 'No weakness or fatigue', flag: 'green', msg: 'Good energy levels', alert: 'Good energy levels — your body is meeting its basic nutritional demands.' },
      { score: 2, label: 'Mild fatigue', flag: 'yellow', msg: 'Minor tiredness', alert: 'Mild fatigue — daily tasks are manageable but energy is not optimal. Check iron, Vitamin B12, and sleep quality.' },
      { score: 1, label: 'Moderate fatigue', flag: 'orange', msg: 'Reduced energy', alert: 'Moderate fatigue is affecting daily activities — a nutritional deficiency or underlying health issue is likely.' },
      { score: 0, label: 'Severe weakness / fatigue', flag: 'red', msg: 'High fatigue — intervention needed', alert: 'Severe weakness indicates critically depleted body reserves. Urgent assessment of protein and micronutrient levels is required.' },
    ],
  },
  {
    id: 'q19',
    section: 'Mobility, Weakness & Activity',
    label: 'Physical Activity',
    options: [
      { score: 3, label: 'Regular exercise (≥30 min/day, ≥5 days/week)', flag: 'green', msg: 'Active lifestyle', alert: 'Excellent — regular exercise maximises the effectiveness of your nutrition and supports long-term health.' },
      { score: 2, label: 'Light activity (walking, household work)', flag: 'yellow', msg: 'Moderate activity', alert: 'Light activity is a good start — but adding structured exercise will help nutrition goals be achieved more effectively.' },
      { score: 1, label: 'Mostly sedentary (desk job, minimal movement)', flag: 'orange', msg: 'Low activity', alert: 'Mostly sedentary behaviour significantly increases risk of muscle loss, poor circulation, and blood sugar dysregulation.' },
      { score: 0, label: 'Completely inactive / bedridden', flag: 'red', msg: 'No activity', alert: 'Complete inactivity accelerates muscle wasting, increases insulin resistance, and places overall health at serious long-term risk.' },
    ],
  },
  {
    id: 'q20',
    section: 'Lifestyle Risk',
    label: 'Tobacco / Alcohol Use',
    options: [
      { score: 3, label: 'Never', flag: 'green', msg: 'Healthy lifestyle', alert: 'No tobacco or alcohol — your liver, lungs, and nutrient absorption are not being compromised.' },
      { score: 2, label: 'Occasionally (1–2 times per month)', flag: 'yellow', msg: 'Minimal risk', alert: 'Occasional use carries low risk — but it should not become a habit as tolerance builds quickly.' },
      { score: 1, label: 'Weekly', flag: 'orange', msg: 'Moderate risk', alert: 'Weekly use begins to visibly affect nutrient absorption, liver function, and immune response.' },
      { score: 0, label: 'Daily', flag: 'red', msg: 'High-risk habit', alert: 'Daily tobacco or alcohol use severely impairs nutritional health — causing vitamin depletion and progressive liver damage.' },
    ],
  },
  {
    id: 'q21',
    section: '24-Hour Dietary Recall',
    label: 'Overall Meal Quality Yesterday',
    options: [
      { score: 3, label: 'Balanced meals (carb + protein + vegetables in most meals)', flag: 'green', msg: 'Balanced diet recalled', alert: 'Yesterday reflected a well-balanced dietary pattern — well done.' },
      { score: 2, label: 'Slightly imbalanced (missing one food group)', flag: 'yellow', msg: 'Minor nutritional gap', alert: 'One food group was missing yesterday — a minor imbalance. Consistency across all meals is important.' },
      { score: 1, label: 'Mostly one type (only carbs / very low protein)', flag: 'orange', msg: 'Poor dietary balance', alert: 'Yesterday\'s meals were mostly one type of food. If this is a regular pattern, deficiencies will develop.' },
      { score: 0, label: 'Very poor / skipped multiple meals', flag: 'red', msg: 'Very poor intake recalled', alert: 'Very poor intake or skipped meals reflects an underlying pattern that is affecting your nutritional status.' },
    ],
  },
];

const SECTIONS = [...new Set(QUESTIONS.map(q => q.section))];

function classify(score, red, orange, yellow) {
  if (score < 32 || (red >= 4 && orange >= 3)) return { label: 'Poor Nutritional Status', flag: 'red', case: 4 };
  if (score <= 47 || red > 2 || orange >= 5) return { label: 'Moderate Nutritional Risk', flag: 'orange', case: 3 };
  if (red >= 1 || orange >= 2 || yellow >= 10) return { label: 'Good but At Risk', flag: 'yellow', case: 2 };
  return { label: 'Good Nutritional Status', flag: 'green', case: 1 };
}

function calcBMI(heightCm, weightKg) {
  if (!heightCm || !weightKg) return null;
  const h = parseFloat(heightCm) / 100;
  const w = parseFloat(weightKg);
  if (!h || !w) return null;
  return w / (h * h);
}

function getBMIScore(bmi, age) {
  if (!bmi) return null;
  const isElderly = parseInt(age) > 60;
  const normalMin = isElderly ? 22 : 18.5;
  const normalMax = isElderly ? 27 : 24.9;
  if (bmi >= normalMin && bmi <= normalMax) return 3;
  if ((bmi >= 17 && bmi < normalMin) || (bmi > normalMax && bmi <= 29.9)) return 2;
  if ((bmi >= 16 && bmi < 17) || (bmi >= 30 && bmi <= 34.9)) return 1;
  return 0;
}

export default function AssessmentForm() {
  const [step, setStep] = useState('intro');
  const [basics, setBasics] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    occupation: '',
    community: '',
    foodPref: '',
    lifestyle: '',
    conditions: [],
  });
  const [answers, setAnswers] = useState({});
  const [q2Sub, setQ2Sub] = useState('');
  const [proteinSources, setProteinSources] = useState([]);
  const [digestive, setDigestive] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [results, setResults] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const topRef = useRef(null);

  const bmi = calcBMI(basics.height, basics.weight);
  const bmiScore = getBMIScore(bmi, basics.age);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: 'smooth' });

  const handleBasicChange = (field, val) => setBasics(prev => ({ ...prev, [field]: val }));
  const toggleCondition = c =>
    setBasics(prev => {
      const has = prev.conditions.includes(c);
      return { ...prev, conditions: has ? prev.conditions.filter(x => x !== c) : [...prev.conditions, c] };
    });
  const toggleProtein = p => setProteinSources(prev => (prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]));
  const toggleDigestive = d => setDigestive(prev => (prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]));

  const currentQuestion = QUESTIONS[currentQ];
  const totalQ = QUESTIONS.length;

  const progressPct = step === 'questions' ? Math.round((currentQ / totalQ) * 100) : step === 'results' ? 100 : 0;

  const canProceedBasics = basics.name && basics.age && basics.gender && basics.height && basics.weight && basics.foodPref && basics.lifestyle;

  const getQ2Options = () => {
    if (q2Sub === 'No change (stable)') {
      return [{ score: 3, label: 'Weight is stable', flag: 'green', msg: 'Good — no concerning change' }];
    }
    if (q2Sub === 'I lost weight') return QUESTIONS[1].lossOptions;
    if (q2Sub === 'I gained weight') return QUESTIONS[1].gainOptions;
    return null;
  };

  const isCurrentAnswered = () => {
    const q = currentQuestion;
    if (q.computed) return bmiScore !== null;
    if (q.sub) {
      if (!q2Sub) return false;
      const opts = getQ2Options();
      return opts && answers[q.id] !== undefined;
    }
    return answers[q.id] !== undefined;
  };

  const computeResults = () => {
    let score = 0;
    const flagMap = {};
    const extraAlerts = [];

    QUESTIONS.forEach(q => {
      const selectedScore = q.computed ? bmiScore : answers[q.id];
      if (q.computed) {
        const selectedOption = q.options.find(option => option.score === selectedScore);
        if (selectedOption) {
          score += selectedOption.score;
          flagMap[q.id] = { flag: selectedOption.flag, msg: selectedOption.msg, label: q.label, alert: selectedOption.alert };
        }
      } else if (q.sub) {
        const opts = getQ2Options();
        const selectedOption = opts?.find(option => option.score === selectedScore);
        if (selectedOption) {
          score += selectedOption.score;
          flagMap[q.id] = { flag: selectedOption.flag, msg: selectedOption.msg, label: q.label, alert: selectedOption.alert };
        }
      } else {
        const selectedOption = q.options.find(option => option.score === selectedScore);
        if (selectedOption) {
          score += selectedOption.score;
          flagMap[q.id] = { flag: selectedOption.flag, msg: selectedOption.msg, label: q.label, alert: selectedOption.alert };
        }
      }
    });

    let crossAlerts = [];

    if (answers.q8 === 3 && proteinSources.length === 0) {
      crossAlerts.push({
        flag: 'red',
        text: 'You claim daily protein intake, but no protein sources are selected. Please review your diet.',
      });
    }

    if (basics.foodPref === 'Vegetarian' && (proteinSources.includes('Egg') || proteinSources.includes('Chicken / Fish'))) {
      crossAlerts.push({
        flag: 'orange',
        text: 'Your diet preference is vegetarian, but non-vegetarian protein sources are selected. Please clarify.',
      });
    }

    if (basics.lifestyle === 'Active' && (answers.q19 === 0 || answers.q19 === 1)) {
      crossAlerts.push({
        flag: 'yellow',
        text: 'You claim active lifestyle, but physical activity level is low. Consider increasing exercise.',
      });
    }

    if (digestive.length >= 3) {
      crossAlerts.push({
        flag: 'orange',
        text: 'You have 3+ digestive issues. This suggests potential gut dysbiosis or food intolerance. Consult a dietician.',
      });
    }

    const flags = Object.values(flagMap);
    const greenCount = flags.filter(f => f.flag === 'green').length;
    const yellowCount = flags.filter(f => f.flag === 'yellow').length;
    const orangeCount = flags.filter(f => f.flag === 'orange').length + (digestive.length >= 3 ? 1 : 0);
    const redCount = flags.filter(f => f.flag === 'red').length;

    const classification = classify(score, redCount, orangeCount + (digestive.length >= 3 ? 1 : 0), yellowCount);

    const redAlerts = flags.filter(f => f.flag === 'red');
    const orangeAlerts = flags.filter(f => f.flag === 'orange');
    const yellowAlerts = yellowCount >= 10 ? flags.filter(f => f.flag === 'yellow').slice(0, 3) : [];
    const greenItems = flags.filter(f => f.flag === 'green');

    setResults({
      score,
      bmi: bmi ? bmi.toFixed(1) : 'N/A',
      classification,
      redAlerts,
      orangeAlerts,
      yellowAlerts,
      greenItems,
      crossAlerts,
      proteinSources,
      digestive,
    });
    setAlerts([...redAlerts, ...orangeAlerts, ...yellowAlerts, ...crossAlerts]);
  };

  const nextQ = () => {
    if (!isCurrentAnswered()) return;
    if (currentQ < totalQ - 1) {
      setCurrentQ(currentQ + 1);
      scrollTop();
    } else {
      computeResults();
      setStep('results');
      scrollTop();
    }
  };

  const prevQ = () => {
    if (currentQ > 0) {
      setCurrentQ(currentQ - 1);
      scrollTop();
    }
  };

  const restart = () => {
    setStep('intro');
    setBasics({
      name: '',
      age: '',
      gender: '',
      height: '',
      weight: '',
      occupation: '',
      community: '',
      foodPref: '',
      lifestyle: '',
      conditions: [],
    });
    setAnswers({});
    setQ2Sub('');
    setProteinSources([]);
    setDigestive([]);
    setCurrentQ(0);
    setResults(null);
    scrollTop();
  };

  const sectionGroups = SECTIONS.map(s => ({
    name: s,
    qs: QUESTIONS.filter(q => q.section === s),
  }));

  const sectionOfCurrent = currentQuestion?.section;
  const sectionIdx = SECTIONS.indexOf(sectionOfCurrent);

  const styles = {
    wrap: { fontFamily: "'DM Sans', 'Segoe UI', sans-serif", maxWidth: 720, margin: '0 auto', padding: '0 16px 80px' },
    header: { background: BRAND, borderRadius: 16, padding: '32px 28px', marginBottom: 28, color: '#fff' },
    headerTitle: { fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: -0.5 },
    headerSub: { fontSize: 14, opacity: 0.85, marginTop: 6 },
    progressBar: { background: 'rgba(255,255,255,0.25)', borderRadius: 99, height: 6, marginTop: 20 },
    progressFill: { background: '#fff', borderRadius: 99, height: 6, transition: 'width 0.4s ease', width: progressPct + '%' },
    card: { background: '#fff', border: '1.5px solid #E8F0E8', borderRadius: 16, padding: '24px 24px', marginBottom: 20, boxShadow: '0 2px 12px rgba(45,106,45,0.06)' },
    sectionPill: { display: 'inline-block', background: BRAND_LIGHT, color: BRAND, fontSize: 11, fontWeight: 600, padding: '4px 12px', borderRadius: 99, marginBottom: 14, letterSpacing: 0.4, textTransform: 'uppercase' },
    qLabel: { fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 4, lineHeight: 1.4 },
    qSublabel: { fontSize: 13, color: '#666', marginBottom: 16 },
    optionBtn: (selected, flag) => ({
      display: 'block',
      width: '100%',
      textAlign: 'left',
      padding: '14px 18px',
      marginBottom: 10,
      borderRadius: 12,
      cursor: 'pointer',
      transition: 'all 0.15s',
      border: selected ? `2px solid ${FLAG_COLORS[flag].border}` : '1.5px solid #e0e0e0',
      background: selected ? FLAG_COLORS[flag].bg : '#fafafa',
      color: selected ? FLAG_COLORS[flag].text : '#333',
      fontWeight: selected ? 600 : 400,
      fontSize: 15,
    }),
    optionMeta: { display: 'flex', alignItems: 'center', gap: 8, marginTop: 4, fontSize: 12, color: '#888' },
    navRow: { display: 'flex', gap: 12, marginTop: 24 },
    btnPrimary: { flex: 1, padding: '14px', background: BRAND, color: '#fff', border: 'none', borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: 'pointer' },
    btnSecondary: { padding: '14px 20px', background: 'transparent', color: BRAND, border: `1.5px solid ${BRAND}`, borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: 'pointer' },
    inputField: { width: '100%', padding: '12px 14px', border: '1.5px solid #ccc', borderRadius: 10, fontSize: 15, boxSizing: 'border-box', outline: 'none', background: '#fff', color: '#1a1a1a' },
    label: { display: 'block', fontSize: 13, fontWeight: 600, color: '#444', marginBottom: 6, marginTop: 16 },
    radioGroup: { display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 4 },
    radioBtn: sel => ({ padding: '9px 18px', border: sel ? `2px solid ${BRAND}` : '1.5px solid #ddd', borderRadius: 99, background: sel ? BRAND_LIGHT : '#fafafa', color: sel ? BRAND : '#555', fontWeight: sel ? 600 : 400, cursor: 'pointer', fontSize: 14 }),
    checkChip: sel => ({ padding: '8px 14px', border: sel ? `2px solid ${BRAND}` : '1.5px solid #ddd', borderRadius: 8, background: sel ? BRAND_LIGHT : '#fafafa', color: sel ? BRAND : '#555', fontWeight: sel ? 600 : 400, cursor: 'pointer', fontSize: 13 }),
    resultScore: { textAlign: 'center', padding: '32px 24px', background: BRAND, borderRadius: 16, color: '#fff', marginBottom: 20 },
    resultScoreNum: { fontSize: 56, fontWeight: 800, lineHeight: 1 },
    resultLabel: flag => ({ display: 'inline-block', padding: '8px 20px', borderRadius: 99, background: FLAG_COLORS[flag].bg, color: FLAG_COLORS[flag].text, fontWeight: 700, fontSize: 16, border: `2px solid ${FLAG_COLORS[flag].border}`, marginTop: 14 }),
    alertItem: flag => ({ display: 'flex', alignItems: 'flex-start', gap: 12, padding: '14px 16px', borderRadius: 12, marginBottom: 10, background: FLAG_COLORS[flag].bg, border: `1px solid ${FLAG_COLORS[flag].border}` }),
    alertText: flag => ({ fontSize: 14, color: FLAG_COLORS[flag].text, lineHeight: 1.5, flex: 1 }),
    greenItem: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid #eee', fontSize: 14, color: '#2D6A2D' },
    sectionNav: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 },
    sectionDot: (active, done) => ({ padding: '4px 12px', borderRadius: 99, fontSize: 12, fontWeight: 600, background: done ? BRAND : active ? BRAND_LIGHT : '#f0f0f0', color: done ? '#fff' : active ? BRAND : '#999', cursor: 'default' }),
    bmiChip: { display: 'inline-block', padding: '6px 16px', borderRadius: 99, background: '#E8F5E9', color: BRAND, fontWeight: 700, fontSize: 14, marginTop: 8, border: '1px solid #A5D6A7' },
    divider: { height: 1, background: '#eee', margin: '20px 0' },
  };

  if (step === 'intro') {
    return (
      <div style={styles.wrap} ref={topRef}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Nutritional Health Assessment</h1>
          <p style={styles.headerSub}>Discover your nutritional status and personalized recommendations</p>
        </div>
        <div style={styles.card}>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: '#333', marginBottom: 20 }}>
            This comprehensive assessment evaluates your nutritional health across 21 key areas — from BMI and meal patterns to micronutrient intake, sleep quality, and lifestyle habits.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: '#333', marginBottom: 20 }}>
            The assessment takes <strong>5–7 minutes</strong> to complete. Your responses are confidential and used only to generate a personalized assessment report.
          </p>
          <p style={{ fontSize: 16, lineHeight: 1.6, color: '#333' }}>
            <strong>Note:</strong> This assessment is informational and not a replacement for professional medical advice. Please consult a healthcare provider for personalized guidance.
          </p>
        </div>
        <button style={styles.btnPrimary} onClick={() => setStep('basics')}>
          Start Assessment →
        </button>
      </div>
    );
  }

  if (step === 'basics') {
    return (
      <div style={styles.wrap} ref={topRef}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Your Basic Information</h1>
          <p style={styles.headerSub}>These details help personalize your assessment</p>
        </div>
        <div style={styles.card}>
          <label style={styles.label}>Full Name *</label>
          <input style={styles.inputField} type="text" placeholder="e.g., Priya Sharma" value={basics.name} onChange={e => handleBasicChange('name', e.target.value)} />

          <label style={styles.label}>Age (years) *</label>
          <input style={styles.inputField} type="number" placeholder="e.g., 35" value={basics.age} onChange={e => handleBasicChange('age', e.target.value)} />

          <label style={styles.label}>Gender *</label>
          <div style={styles.radioGroup}>
            {['Male', 'Female', 'Other'].map(g => (
              <button key={g} style={styles.radioBtn(basics.gender === g)} onClick={() => handleBasicChange('gender', g)}>
                {g}
              </button>
            ))}
          </div>

          <label style={styles.label}>Height (cm) *</label>
          <input style={styles.inputField} type="number" placeholder="e.g., 165" value={basics.height} onChange={e => handleBasicChange('height', e.target.value)} />

          <label style={styles.label}>Weight (kg) *</label>
          <input style={styles.inputField} type="number" placeholder="e.g., 65" value={basics.weight} onChange={e => handleBasicChange('weight', e.target.value)} />

          {bmi && (
            <div style={styles.bmiChip}>
              BMI: {bmi.toFixed(1)}
            </div>
          )}

          <label style={styles.label}>Occupation</label>
          <input style={styles.inputField} type="text" placeholder="e.g., Software Engineer" value={basics.occupation} onChange={e => handleBasicChange('occupation', e.target.value)} />

          <label style={styles.label}>Community / Ethnicity</label>
          <input style={styles.inputField} type="text" placeholder="e.g., Gujarati" value={basics.community} onChange={e => handleBasicChange('community', e.target.value)} />

          <label style={styles.label}>Food Preference *</label>
          <div style={styles.radioGroup}>
            {['Vegetarian', 'Non-Vegetarian', 'Vegan'].map(f => (
              <button key={f} style={styles.radioBtn(basics.foodPref === f)} onClick={() => handleBasicChange('foodPref', f)}>
                {f}
              </button>
            ))}
          </div>

          <label style={styles.label}>Lifestyle *</label>
          <div style={styles.radioGroup}>
            {['Sedentary', 'Light', 'Active'].map(l => (
              <button key={l} style={styles.radioBtn(basics.lifestyle === l)} onClick={() => handleBasicChange('lifestyle', l)}>
                {l}
              </button>
            ))}
          </div>

          <label style={styles.label}>Any known health conditions? (tick all that apply)</label>
          <div style={styles.radioGroup}>
            {['Diabetes', 'PCOD', 'Thyroid', 'Hypertension', 'Heart Disease', 'None'].map(c => (
              <button key={c} style={styles.checkChip(basics.conditions.includes(c))} onClick={() => toggleCondition(c)}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div style={styles.navRow}>
          <button style={styles.btnSecondary} onClick={() => setStep('intro')}>
            ← Back
          </button>
          <button style={{ ...styles.btnPrimary, opacity: canProceedBasics ? 1 : 0.5, cursor: canProceedBasics ? 'pointer' : 'not-allowed' }} onClick={() => {
            if (canProceedBasics) {
              setStep('questions');
              scrollTop();
            }
          }}>
            Continue →
          </button>
        </div>
      </div>
    );
  }

  if (step === 'questions') {
    return (
      <div style={styles.wrap} ref={topRef}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Assessment Questions</h1>
          <p style={styles.headerSub}>
            {sectionIdx + 1} of {SECTIONS.length} sections • Question {currentQ + 1} of {totalQ}
          </p>
          <div style={styles.progressBar}>
            <div style={styles.progressFill} />
          </div>
        </div>

        <div style={styles.sectionNav}>
          {SECTIONS.map((s, idx) => {
            const done = sectionGroups[idx].qs.every(q => answers[q.id] !== undefined || q.computed);
            const active = s === sectionOfCurrent;
            return (
              <button key={s} style={styles.sectionDot(active, done)} disabled>
                {s.split(' ')[0]}
              </button>
            );
          })}
        </div>

        <div style={styles.card}>
          <div style={styles.sectionPill}>{currentQuestion?.section}</div>
          <h2 style={styles.qLabel}>
            {currentQuestion?.label}
          </h2>
          {currentQuestion?.sublabel && <p style={styles.qSublabel}>{currentQuestion.sublabel}</p>}
          {currentQuestion?.note && <p style={{fontSize: 13, color: '#666', marginBottom: 16, fontStyle: 'italic'}}>{currentQuestion.note}</p>}

          {currentQuestion?.computed && bmi && (
            <div style={{ background: BRAND_LIGHT, border: `2px solid ${BRAND}`, borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <p style={{ margin: 0, fontSize: 14, color: BRAND, fontWeight: 600 }}>
                Your BMI: <strong>{bmi.toFixed(1)}</strong>
              </p>
            </div>
          )}

          {currentQuestion?.sub && (
            <>
              <label style={styles.label}>{currentQuestion.subQuestion}</label>
              <div style={styles.radioGroup}>
                {currentQuestion.subOptions.map(opt => (
                  <button key={opt} style={styles.radioBtn(q2Sub === opt)} onClick={() => setQ2Sub(opt)}>
                    {opt}
                  </button>
                ))}
              </div>
              {q2Sub && (
                <>
                  <div style={styles.divider} />
                  <label style={styles.label}>Select option:</label>
                  {getQ2Options()?.map(opt => (
                    <button key={opt.score} style={styles.optionBtn(answers[currentQuestion.id] === opt.score, opt.flag)} onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: opt.score }))}>
                      <strong>{opt.label}</strong>
                      <div style={styles.optionMeta}>
                        <span>{opt.msg}</span>
                      </div>
                    </button>
                  ))}
                </>
              )}
            </>
          )}

          {!currentQuestion?.computed && !currentQuestion?.sub && (
            <>
              {currentQuestion?.options?.map(opt => (
                <button key={opt.score} style={styles.optionBtn(answers[currentQuestion.id] === opt.score, opt.flag)} onClick={() => setAnswers(prev => ({ ...prev, [currentQuestion.id]: opt.score }))}>
                  <strong>{opt.label}</strong>
                  <div style={styles.optionMeta}>
                    <span>{opt.msg}</span>
                  </div>
                </button>
              ))}
            </>
          )}

          {currentQuestion?.hasChecklist && (
            <>
              <div style={styles.divider} />
              <label style={styles.label}>{currentQuestion.checklistLabel}</label>
              <div style={styles.radioGroup}>
                {currentQuestion.checklistItems.map(item => (
                  <button key={item} style={styles.checkChip(proteinSources.includes(item))} onClick={() => toggleProtein(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}

          {currentQuestion?.hasDigestive && (
            <>
              <div style={styles.divider} />
              <label style={styles.label}>{currentQuestion.digestiveLabel}</label>
              <div style={styles.radioGroup}>
                {currentQuestion.digestiveItems.map(item => (
                  <button key={item} style={styles.checkChip(digestive.includes(item))} onClick={() => toggleDigestive(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div style={styles.navRow}>
          <button style={styles.btnSecondary} onClick={prevQ} disabled={currentQ === 0}>
            ← Previous
          </button>
          <button style={{ ...styles.btnPrimary, opacity: isCurrentAnswered() ? 1 : 0.5, cursor: isCurrentAnswered() ? 'pointer' : 'not-allowed' }} onClick={nextQ} disabled={!isCurrentAnswered()}>
            {currentQ === totalQ - 1 ? 'See Results' : 'Next'} →
          </button>
        </div>
      </div>
    );
  }

  if (step === 'results' && results) {
    return (
      <div style={styles.wrap} ref={topRef}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Your Assessment Results</h1>
          <p style={styles.headerSub}>Personalized Nutritional Health Report for {basics.name}</p>
        </div>

        <div style={styles.resultScore}>
          <div style={{ fontSize: 14, opacity: 0.9, marginBottom: 8 }}>NUTRITIONAL HEALTH SCORE</div>
          <div style={styles.resultScoreNum}>{results.score}</div>
          <div style={{ fontSize: 13, opacity: 0.85, marginTop: 8 }}>(out of {QUESTIONS.length * 3})</div>
          <div style={styles.resultLabel(results.classification.flag)}>{results.classification.label}</div>
        </div>

        {results.redAlerts.length > 0 && (
          <>
            <div style={{ fontSize: 14, fontWeight: 700, color: FLAG_COLORS.red.text, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertCircle size={20} strokeWidth={2} />
              Critical Concerns
            </div>
            {results.redAlerts.map((alert, idx) => (
              <div key={idx} style={styles.alertItem('red')}>
                <AlertCircle size={20} strokeWidth={2} style={{ flexShrink: 0 }} />
                <div style={styles.alertText('red')}>
                  <strong>{alert.label}:</strong> {alert.alert || alert.msg}
                </div>
              </div>
            ))}
          </>
        )}

        {results.orangeAlerts.length > 0 && (
          <>
            <div style={{ fontSize: 14, fontWeight: 700, color: FLAG_COLORS.orange.text, marginBottom: 12, marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={20} strokeWidth={2} />
              Areas of Concern
            </div>
            {results.orangeAlerts.map((alert, idx) => (
              <div key={idx} style={styles.alertItem('orange')}>
                <AlertTriangle size={20} strokeWidth={2} style={{ flexShrink: 0 }} />
                <div style={styles.alertText('orange')}>
                  <strong>{alert.label}:</strong> {alert.alert || alert.msg}
                </div>
              </div>
            ))}
          </>
        )}

        {results.crossAlerts.length > 0 && (
          <>
            <div style={{ fontSize: 14, fontWeight: 700, color: FLAG_COLORS.orange.text, marginBottom: 12, marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <Info size={20} strokeWidth={2} />
              Inconsistencies Detected
            </div>
            {results.crossAlerts.map((a, idx) => (
              <div key={idx} style={styles.alertItem(a.flag)}>
                {a.flag === 'red' && <AlertCircle size={20} strokeWidth={2} style={{ flexShrink: 0 }} />}
                {a.flag === 'orange' && <AlertTriangle size={20} strokeWidth={2} style={{ flexShrink: 0 }} />}
                {a.flag === 'yellow' && <Info size={20} strokeWidth={2} style={{ flexShrink: 0 }} />}
                <div style={styles.alertText(a.flag)}>{a.text}</div>
              </div>
            ))}
          </>
        )}

        {results.greenItems.length > 0 && (
          <>
            <div style={{ fontSize: 14, fontWeight: 700, color: FLAG_COLORS.green.text, marginBottom: 12, marginTop: 20, display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={20} strokeWidth={2} />
              Strengths
            </div>
            {results.greenItems.map((item, idx) => (
              <div key={idx} style={styles.greenItem}>
                <CheckCircle size={18} strokeWidth={2} style={{ flexShrink: 0 }} />
                <strong>{item.label}:</strong> {item.msg}
              </div>
            ))}
          </>
        )}

        <div style={{ background: BRAND_LIGHT, border: `2px solid ${BRAND}`, borderRadius: 12, padding: 20, marginTop: 24, marginBottom: 24 }}>
          <h3 style={{ margin: '0 0 12px', color: BRAND, fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <ClipboardList size={20} strokeWidth={2} aria-hidden="true" />
            Key Metrics
          </h3>
          <p style={{ margin: '8px 0', fontSize: 14, color: '#333' }}>
            <strong>Name:</strong> {basics.name}
          </p>
          <p style={{ margin: '8px 0', fontSize: 14, color: '#333' }}>
            <strong>Age:</strong> {basics.age} years
          </p>
          <p style={{ margin: '8px 0', fontSize: 14, color: '#333' }}>
            <strong>BMI:</strong> {results.bmi}
          </p>
          <p style={{ margin: '8px 0', fontSize: 14, color: '#333' }}>
            <strong>Diet Preference:</strong> {basics.foodPref}
          </p>
          <p style={{ margin: '8px 0', fontSize: 14, color: '#333' }}>
            <strong>Protein Sources:</strong> {results.proteinSources.length ? results.proteinSources.join(', ') : 'None selected'}
          </p>
          {results.digestive.length > 0 && (
            <p style={{ margin: '8px 0', fontSize: 14, color: '#333' }}>
              <strong>Digestive Issues:</strong> {results.digestive.join(', ')}
            </p>
          )}
        </div>

        <div style={{ background: '#E8F5E9', border: '2px solid #2D6A2D', borderRadius: 12, padding: 20, marginBottom: 24 }}>
          <h3 style={{ margin: '0 0 12px', color: '#2D6A2D', fontSize: 16, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
            <Lightbulb size={20} strokeWidth={2} aria-hidden="true" />
            Next Steps
          </h3>
          <ul style={{ margin: 0, paddingLeft: 20, color: '#333', lineHeight: 1.8, fontSize: 14 }}>
            <li>Share this report with your healthcare provider or dietician.</li>
            <li>Focus on addressing red and orange flagged areas first.</li>
            <li>Consider dietary modifications based on your assessment results.</li>
            <li>Re-take this assessment in 3 months to track progress.</li>
          </ul>
        </div>

        <div style={styles.navRow}>
          <button style={styles.btnSecondary} onClick={restart}>
            ← Retake Assessment
          </button>
          <button style={styles.btnPrimary} onClick={() => window.print()}>
            Print Report →
          </button>
        </div>
      </div>
    );
  }

  return null;
}
