'use client';

import { useRef, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import {
  AlertCircle,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  CheckCircle,
  ClipboardCheck,
  ClipboardList,
  Download,
  Moon,
  RotateCcw,
  Target,
  Timer,
  Utensils,
} from 'lucide-react';
import { useRouter } from 'next/navigation';



const BRAND = "#2D6A2D";
const BRAND_LIGHT = "#E8F5E9";
const BRAND_MID = "#4CAF50";

const FLAG_COLORS = {
  green:  { bg: "#E8F5E9", border: "#4CAF50", text: "#1B5E20" },
  yellow: { bg: "#FFFDE7", border: "#F9A825", text: "#7d6000" },
  orange: { bg: "#FFF3E0", border: "#F57C00", text: "#6D3000" },
  red:    { bg: "#FFEBEE", border: "#E53935", text: "#7f0000" },
};

const FLAG_ICONS = {
  green: CheckCircle,
  yellow: AlertTriangle,
  orange: AlertTriangle,
  red: AlertCircle,
};

function FlagIcon({ flag, size = 16 }) {
  const Icon = FLAG_ICONS[flag] || AlertCircle;
  const color = FLAG_COLORS[flag]?.border || BRAND;

  return <Icon size={size} strokeWidth={2.2} color={color} aria-hidden="true" />;
}

const QUESTIONS = [
  {
    id: "q1", section: "BMI & Nutritional Risk", label: "BMI",
    note: "Auto-calculated from your height and weight above.",
    computed: true,
    options: [
      { score: 3, label: "Normal (18.5–24.9)", flag: "green", msg: "Healthy body weight",
        alert: "Your BMI is in the healthy range — great foundation for your nutrition goals." },
      { score: 2, label: "Mild Underweight (17–18.4) or Overweight (25–29.9)", flag: "yellow", msg: "Slight deviation",
        alert: "Your weight is slightly outside the healthy range. No major concern now, but worth addressing with a structured plan." },
      { score: 1, label: "Moderate Underweight (16–16.9) or Obese (30–34.9)", flag: "orange", msg: "Weight imbalance",
        alert: "Your BMI indicates an imbalanced zone. A structured diet plan is recommended." },
      { score: 0, label: "Severe Underweight (<16) or Severe Obesity (≥35)", flag: "red", msg: "High nutritional risk",
        alert: "Your BMI is in the danger zone. Immediate dietary intervention is required — your body is under significant stress." },
    ]
  },
  {
    id: "q2", section: "BMI & Nutritional Risk", label: "Weight Change in Last 3 Months",
    sub: true,
    subQuestion: "Did your weight change in the last 3 months?",
    subOptions: ["No change (stable)", "I lost weight", "I gained weight"],
    lossOptions: [
      { score: 3, label: "No weight loss", flag: "green", msg: "Weight is stable", alert: "Your weight is stable — a good sign." },
      { score: 2, label: "Less than 5% loss", flag: "yellow", msg: "Minor weight loss", alert: "Some weight change occurred. Monitor to ensure it's not a continuing trend." },
      { score: 1, label: "5–10% loss", flag: "orange", msg: "Moderate weight loss", alert: "5–10% weight loss indicates moderate risk. Muscle loss may be affecting your nutritional status." },
      { score: 0, label: "More than 10% loss", flag: "red", msg: "Significant weight loss", alert: "More than 10% weight loss is a serious clinical sign. Immediate evaluation is necessary." },
    ],
    gainOptions: [
      { score: 3, label: "No weight gain", flag: "green", msg: "Weight is stable", alert: "Your weight is stable — a good sign." },
      { score: 2, label: "Less than 5% gain", flag: "yellow", msg: "Slight weight gain", alert: "Some weight gain occurred. Monitor to ensure it's not a continuing trend." },
      { score: 1, label: "5–10% gain", flag: "orange", msg: "Excess weight gain", alert: "5–10% weight gain indicates moderate risk. Fat accumulation may be affecting your nutritional status." },
      { score: 0, label: "More than 10% gain", flag: "red", msg: "Rapid weight gain", alert: "More than 10% weight gain is a serious clinical sign. Immediate evaluation is necessary." },
    ],
  },
  {
    id: "q3", section: "Appetite & Food Intake", label: "Current Food Intake",
    options: [
      { score: 3, label: "Normal solid food", flag: "green", msg: "Normal diet", alert: "You're eating normally — this is the foundation for good nutrition." },
      { score: 2, label: "Soft diet", flag: "yellow", msg: "Diet slightly restricted", alert: "A soft diet limits certain nutrients — fibre, protein, and some vitamins are slightly compromised." },
      { score: 1, label: "Liquid diet", flag: "orange", msg: "Limited food intake", alert: "Relying solely on a liquid diet cannot provide adequate calories and protein. This leads to muscle loss over time." },
      { score: 0, label: "Tube feeding / NPO (nothing by mouth)", flag: "red", msg: "No adequate oral intake", alert: "Tube feeding or NPO is a medical-level nutritional emergency. The body is entirely deprived of normal nutrients." },
    ]
  },
  {
    id: "q4", section: "Appetite & Food Intake", label: "Diet Pattern Followed",
    options: [
      { score: 3, label: "Balanced meal (carbs + protein + fats + vegetables)", flag: "green", msg: "Balanced eating pattern", alert: "Excellent — a balanced diet is the cornerstone of good health." },
      { score: 2, label: "No unnecessary restriction — mostly appropriate", flag: "yellow", msg: "Diet mostly appropriate", alert: "Good overall, but a truly balanced diet has not yet been fully achieved." },
      { score: 1, label: "Occasional dieting / fasting", flag: "orange", msg: "Irregular dietary pattern", alert: "Occasional fasting slows metabolism and causes your body to miss essential nutrients on those days." },
      { score: 0, label: "Extreme dieting / keto / very restrictive plans", flag: "red", msg: "Unhealthy restrictive diet", alert: "Extreme dieting without medical supervision can damage the heart, kidneys, and bones over time." },
    ]
  },
  {
    id: "q5", section: "Meal Pattern", label: "Meals per Day",
    options: [
      { score: 3, label: "3 meals daily", flag: "green", msg: "Adequate meal frequency", alert: "Great — 3 meals a day keeps blood sugar stable and metabolism active." },
      { score: 2, label: "2 meals daily", flag: "yellow", msg: "Slightly reduced meals", alert: "Two meals per day is below what is needed to maintain energy and meet nutrient requirements." },
      { score: 1, label: "1 meal daily", flag: "orange", msg: "Low meal frequency", alert: "One meal a day leads to blood sugar crashes, chronic fatigue, and progressive nutrient deficiency." },
      { score: 0, label: "Irregular / skip meals", flag: "red", msg: "Poor eating pattern", alert: "Irregular or skipped meals damage both metabolism and gut health over time." },
    ]
  },
  {
    id: "q6", section: "Meal Pattern", label: "Breakfast Habit",
    options: [
      { score: 3, label: "Daily", flag: "green", msg: "Healthy breakfast habit", alert: "Eating breakfast daily is excellent — it sets the tone for the rest of the day." },
      { score: 2, label: "3–4 days per week", flag: "yellow", msg: "Moderate consistency", alert: "Skipping breakfast a few days a week can affect blood sugar control, focus, and morning energy." },
      { score: 1, label: "Rarely", flag: "orange", msg: "Irregular habit", alert: "Frequently skipping breakfast can lead to long-term weight gain, acidity, and low energy levels." },
      { score: 0, label: "Never", flag: "red", msg: "Skipping breakfast regularly", alert: "Never eating breakfast slows metabolism, increases acidity, and leaves daily nutrient intake chronically inadequate." },
    ]
  },
  {
    id: "q7", section: "Meal Pattern", label: "Religious / Cultural Food Restrictions",
    options: [
      { score: 3, label: "No major nutrient restriction", flag: "green", msg: "No major dietary limitation", alert: "No major dietary restrictions — a full range of nutrients is accessible to you." },
      { score: 2, label: "Restriction only during fasts / special occasions", flag: "yellow", msg: "Temporary restriction", alert: "Occasional fasting restrictions are acceptable — ensure nutrients are compensated on other days." },
      { score: 1, label: "Moderate restriction affecting some nutrients", flag: "orange", msg: "Restriction affecting nutrition", alert: "If certain nutrients are regularly avoided, deficiencies can develop. Suitable alternatives should be included daily." },
      { score: 0, label: "Severe restriction affecting overall nutrition", flag: "red", msg: "Severe restriction", alert: "Very strict restrictions eliminating entire food groups can lead to serious and progressive nutritional deficiencies." },
    ]
  },
  {
    id: "q8", section: "Daily Nutrient Intake", label: "Main Energy Source",
    options: [
      { score: 3, label: "Balanced diet (carbs + protein + fats)", flag: "green", msg: "Balanced nutrient intake", alert: "Excellent — your body is receiving all three macronutrients it needs." },
      { score: 2, label: "Mostly carbohydrates (roti, rice)", flag: "yellow", msg: "Slight carb dominance", alert: "Mostly carb-based diet — protein and healthy fats are slightly insufficient. This can lead to muscle loss over time." },
      { score: 1, label: "High carbohydrate intake (carb-heavy meals)", flag: "orange", msg: "Imbalanced diet", alert: "A carb-heavy diet causes blood sugar spikes and crashes, low sustained energy, and inadequate protein intake." },
      { score: 0, label: "Very high carbs, very low protein", flag: "red", msg: "Poor nutrient balance", alert: "This directly causes muscle wasting, weakened immunity, and metabolic complications." },
    ]
  },
  {
    id: "q9", section: "Daily Nutrient Intake", label: "Protein Intake Frequency",
    hasChecklist: true,
    checklistLabel: "Which protein sources do you consume? (tick all that apply)",
    checklistItems: ["Pulses / Beans", "Milk / Curd", "Paneer / Soya", "Egg", "Chicken / Fish"],
    options: [
      { score: 3, label: "Daily", flag: "green", msg: "Adequate protein intake", alert: "Great — you're meeting your daily protein needs for muscle repair and immunity." },
      { score: 2, label: "4–5 days per week", flag: "yellow", msg: "Slightly low protein", alert: "4–5 days is not enough — your body needs protein daily for ongoing repair, especially as we age." },
      { score: 1, label: "2–3 days per week", flag: "orange", msg: "Low protein intake", alert: "Protein only 2–3 days a week leads to muscle weakness, slow healing, and reduced immunity." },
      { score: 0, label: "Rarely / Never", flag: "red", msg: "Protein deficiency risk", alert: "Rarely consuming protein is a serious nutritional deficiency causing muscle loss, weak bones, hair fall, and poor immunity." },
    ]
  },
  {
    id: "q10", section: "Daily Nutrient Intake", label: "Milk & Dairy Intake",
    sublabel: "(milk, curd, paneer, buttermilk, etc.)",
    options: [
      { score: 3, label: "Daily (1–2 servings or more)", flag: "green", msg: "Good calcium intake", alert: "Daily dairy intake ensures adequate calcium, Vitamin D, and B12." },
      { score: 2, label: "4–5 days per week", flag: "yellow", msg: "Moderate intake", alert: "Slightly below requirement. Calcium is needed daily as the body cannot store it adequately for extended periods." },
      { score: 1, label: "2–3 days per week", flag: "orange", msg: "Low calcium intake", alert: "Very limited calcium. This significantly increases the risk of osteoporosis and Vitamin B12 deficiency over time." },
      { score: 0, label: "Rarely / Never", flag: "red", msg: "Very low calcium intake", alert: "This is a major risk for calcium and Vitamin B12 deficiency — affecting bones, nerves, and blood health." },
    ]
  },
  {
    id: "q11", section: "Daily Nutrient Intake", label: "Vegetable Intake",
    options: [
      { score: 3, label: "2–3 servings per day", flag: "green", msg: "Adequate vegetable intake", alert: "Excellent vegetable intake — you're meeting your fibre and micronutrient needs." },
      { score: 2, label: "1 serving per day", flag: "yellow", msg: "Acceptable intake", alert: "One serving per day is below the recommended 2–3 servings. Fibre and micronutrient requirements are not fully met." },
      { score: 1, label: "3–4 days per week (not daily)", flag: "orange", msg: "Low intake", alert: "Eating vegetables only 3–4 days a week negatively impacts gut health, immunity, and skin health." },
      { score: 0, label: "Rarely / Never", flag: "red", msg: "Poor fibre & micronutrient intake", alert: "Not eating vegetables leads to constipation, low immunity, vitamin deficiencies, and increased risk of chronic disease." },
    ]
  },
  {
    id: "q12", section: "Daily Nutrient Intake", label: "Fruit Intake",
    options: [
      { score: 3, label: "Daily", flag: "green", msg: "Good fruit intake", alert: "Daily fruit intake supports immunity, skin health, and healthy digestion." },
      { score: 2, label: "3–4 days per week", flag: "yellow", msg: "Acceptable intake", alert: "3–4 days a week is slightly below ideal — aim for at least one fruit daily to meet vitamin and antioxidant needs." },
      { score: 1, label: "Rarely (1–2 days per week)", flag: "orange", msg: "Low intake", alert: "Rarely eating fruit leads to insufficient Vitamin C and antioxidant intake, weakening immunity." },
      { score: 0, label: "Never", flag: "red", msg: "Very low micronutrient intake", alert: "Never eating fruit is a direct risk for Vitamin C deficiency, poor immunity, and increased oxidative stress." },
    ]
  },
  {
    id: "q13", section: "Sleep Quality", label: "Sleep Duration & Quality",
    sleepNote: true,
    options: [
      { score: 3, label: "7–9 hours, restful sleep", flag: "green", msg: "Healthy sleep — supports good metabolism", alert: "Great sleep habits — your body is recovering and regulating hormones effectively." },
      { score: 2, label: "6–7 hours, mostly restful", flag: "yellow", msg: "Slightly low — minor impact on energy", alert: "6–7 hours is slightly below optimal — mild fatigue, mood changes, and appetite disruption may occur." },
      { score: 1, label: "Less than 6 hours or very disturbed sleep", flag: "orange", msg: "Poor sleep affecting appetite & recovery", alert: "Poor sleep throws hunger hormones out of balance, increasing cravings and leading to poor food choices." },
      { score: 0, label: "Less than 4 hours or chronic insomnia", flag: "red", msg: "Severely impacting nutritional health", alert: "Chronic sleep deprivation completely disrupts the body's repair mechanisms — seriously impacting nutrient absorption and immunity." },
    ]
  },
  {
    id: "q14", section: "Junk Food & Sugar", label: "Fried / Fast Food / Outside Food",
    options: [
      { score: 3, label: "Rarely (once a month or less)", flag: "green", msg: "Healthy eating habit", alert: "Excellent — minimal exposure to trans fats, excess sodium, and empty calories." },
      { score: 2, label: "1–2 times per week", flag: "yellow", msg: "Controlled intake", alert: "Within control — but ensure this does not become a daily habit, as calories and sodium quietly accumulate." },
      { score: 1, label: "3–4 times per week", flag: "orange", msg: "Frequent junk food intake", alert: "This level of intake raises LDL cholesterol, blood pressure, and body weight significantly over time." },
      { score: 0, label: "Daily", flag: "red", msg: "Excess junk food — high risk", alert: "Daily fried or outside food is a direct contributor to heart disease, obesity, and fatty liver disease." },
    ]
  },
  {
    id: "q15", section: "Junk Food & Sugar", label: "Sugary Drinks & Sweets",
    options: [
      { score: 3, label: "Rarely (once a month or less)", flag: "green", msg: "Low sugar intake", alert: "Excellent — minimal sugar means better blood glucose control and reduced inflammation." },
      { score: 2, label: "1–2 times per week", flag: "yellow", msg: "Moderate intake", alert: "Manageable — but be mindful of hidden sugars in tea, packaged juices, and biscuits." },
      { score: 1, label: "3–4 times per week", flag: "orange", msg: "High sugar intake", alert: "Excessive sugar intake. Blood sugar control and weight management are both being actively compromised." },
      { score: 0, label: "Daily", flag: "red", msg: "Excess sugar — diabetes risk", alert: "Daily sugary food and drinks cause continuous blood glucose spikes — posing a direct risk of diabetes and progressive weight gain." },
    ]
  },
  {
    id: "q16", section: "Water & Digestion", label: "Water Intake per Day",
    options: [
      { score: 3, label: "More than 8 glasses", flag: "green", msg: "Excellent hydration", alert: "Excellent hydration — your body is well equipped to flush toxins and support kidney function." },
      { score: 2, label: "6–8 glasses", flag: "yellow", msg: "Adequate hydration", alert: "6–8 glasses is acceptable, but 8+ should be the daily target. Mild dehydration quietly affects energy and digestion." },
      { score: 1, label: "Less than 6 glasses or don't know", flag: "orange", msg: "Low / uncertain hydration", alert: "Risk of kidney stones, constipation, UTIs, and fatigue increases significantly at this intake level." },
      { score: 0, label: "Barely drinks water (1–2 glasses)", flag: "red", msg: "Severely dehydrated — high risk", alert: "Severe dehydration poses direct risks of blood pressure drops, kidney stress, toxin buildup, and extreme fatigue." },
    ]
  },
  {
    id: "q17", section: "Water & Digestion", label: "Appetite",
    hasDigestive: true,
    digestiveLabel: "Digestive issues (tick all that apply)",
    digestiveItems: ["Gas / Bloating", "Acidity / Heartburn", "Constipation", "Diarrhea", "Nausea / Vomiting", "Indigestion"],
    options: [
      { score: 3, label: "Normal", flag: "green", msg: "Healthy appetite", alert: "Normal appetite — your body's hunger signals are functioning well." },
      { score: 2, label: "Reduced", flag: "yellow", msg: "Slight reduction in appetite", alert: "Slightly reduced appetite may be related to stress, poor sleep, or a mild gut issue. Monitor and address early." },
      { score: 1, label: "Poor", flag: "orange", msg: "Low appetite", alert: "Poor appetite means the body is consistently eating less than it needs — leading to weakness and nutrient deficiencies." },
      { score: 0, label: "Not eating", flag: "red", msg: "Very poor intake — high risk", alert: "Not eating at all is a serious medical concern — immediate clinical evaluation is necessary." },
    ]
  },
  {
    id: "q18", section: "Mobility, Weakness & Activity", label: "Mobility",
    options: [
      { score: 3, label: "Normal — fully independent", flag: "green", msg: "Independent mobility", alert: "Full independent mobility is excellent — your musculoskeletal health supports normal nutritional activity." },
      { score: 2, label: "Walks with support", flag: "yellow", msg: "Mild limitation", alert: "Needing support to walk indicates mild limitation — muscle strengthening through diet and activity is important." },
      { score: 1, label: "Sits independently but cannot walk", flag: "orange", msg: "Restricted mobility", alert: "Restricted mobility significantly affects both nutritional intake and quality of life." },
      { score: 0, label: "Bedridden", flag: "red", msg: "Severe limitation", alert: "Being bedridden is a high-risk state — maximum risk of pressure sores, rapid muscle wasting, and severe nutritional deficiency." },
    ]
  },
  {
    id: "q19", section: "Mobility, Weakness & Activity", label: "Weakness / Fatigue",
    options: [
      { score: 3, label: "No weakness or fatigue", flag: "green", msg: "Good energy levels", alert: "Good energy levels — your body is meeting its basic nutritional demands." },
      { score: 2, label: "Mild fatigue", flag: "yellow", msg: "Minor tiredness", alert: "Mild fatigue — daily tasks are manageable but energy is not optimal. Check iron, Vitamin B12, and sleep quality." },
      { score: 1, label: "Moderate fatigue", flag: "orange", msg: "Reduced energy", alert: "Moderate fatigue is affecting daily activities — a nutritional deficiency or underlying health issue is likely." },
      { score: 0, label: "Severe weakness / fatigue", flag: "red", msg: "High fatigue — intervention needed", alert: "Severe weakness indicates critically depleted body reserves. Urgent assessment of protein and micronutrient levels is required." },
    ]
  },
  {
    id: "q20", section: "Mobility, Weakness & Activity", label: "Physical Activity",
    options: [
      { score: 3, label: "Regular exercise (≥30 min/day, ≥5 days/week)", flag: "green", msg: "Active lifestyle", alert: "Excellent — regular exercise maximises the effectiveness of your nutrition and supports long-term health." },
      { score: 2, label: "Light activity (walking, household work)", flag: "yellow", msg: "Moderate activity", alert: "Light activity is a good start — but adding structured exercise will help nutrition goals be achieved more effectively." },
      { score: 1, label: "Mostly sedentary (desk job, minimal movement)", flag: "orange", msg: "Low activity", alert: "Mostly sedentary behaviour significantly increases risk of muscle loss, poor circulation, and blood sugar dysregulation." },
      { score: 0, label: "Completely inactive / bedridden", flag: "red", msg: "No activity", alert: "Complete inactivity accelerates muscle wasting, increases insulin resistance, and places overall health at serious long-term risk." },
    ]
  },
  {
    id: "q21", section: "Lifestyle Risk", label: "Tobacco / Alcohol Use",
    options: [
      { score: 3, label: "Never", flag: "green", msg: "Healthy lifestyle", alert: "No tobacco or alcohol — your liver, lungs, and nutrient absorption are not being compromised." },
      { score: 2, label: "Occasionally (1–2 times per month)", flag: "yellow", msg: "Minimal risk", alert: "Occasional use carries low risk — but it should not become a habit as tolerance builds quickly." },
      { score: 1, label: "Weekly", flag: "orange", msg: "Moderate risk", alert: "Weekly use begins to visibly affect nutrient absorption, liver function, and immune response." },
      { score: 0, label: "Daily", flag: "red", msg: "High-risk habit", alert: "Daily tobacco or alcohol use severely impairs nutritional health — causing vitamin depletion and progressive liver damage." },
    ]
  },
  {
    id: "q22", section: "24-Hour Dietary Recall", label: "Overall Meal Quality Yesterday",
    options: [
      { score: 3, label: "Balanced meals (carb + protein + vegetables in most meals)", flag: "green", msg: "Balanced diet recalled", alert: "Yesterday reflected a well-balanced dietary pattern — well done." },
      { score: 2, label: "Slightly imbalanced (missing one food group)", flag: "yellow", msg: "Minor nutritional gap", alert: "One food group was missing yesterday — a minor imbalance. Consistency across all meals is important." },
      { score: 1, label: "Mostly one type (only carbs / very low protein)", flag: "orange", msg: "Poor dietary balance", alert: "Yesterday's meals were mostly one type of food. If this is a regular pattern, deficiencies will develop." },
      { score: 0, label: "Very poor / skipped multiple meals", flag: "red", msg: "Very poor intake recalled", alert: "Very poor intake or skipped meals reflects an underlying pattern that is affecting your nutritional status." },
    ]
  },
];

const SECTIONS = [...new Set(QUESTIONS.map(q => q.section))];

function classify(score, red, orange, yellow) {
  if (score < 32 || (red >= 4 && orange >= 3)) return { label: "Poor Nutritional Status", flag: "red", case: 4 };
  if (score <= 47 || red > 2 || orange >= 5) return { label: "Moderate Nutritional Risk", flag: "orange", case: 3 };
  if (red >= 1 || orange >= 2 || yellow >= 10) return { label: "Good but At Risk", flag: "yellow", case: 2 };
  return { label: "Good Nutritional Status", flag: "green", case: 1 };
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



export default function AssessmentPage() {
  const router = useRouter();
  const [loadingComplete, setLoadingComplete] = useState(false);

  // 
  const [step, setStep] = useState("intro"); // intro, basics, questions, results
  const [basics, setBasics] = useState({ name: "", age: "", gender: "", height: "", weight: "", occupation: "", community: "", foodPref: "", lifestyle: "", conditions: [] });
  const [answers, setAnswers] = useState({});
  const [q2Sub, setQ2Sub] = useState("");
  const [proteinSources, setProteinSources] = useState([]);
  const [digestive, setDigestive] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [results, setResults] = useState(null);
  const topRef = useRef(null);

  const bmi = calcBMI(basics.height, basics.weight);
  const bmiScore = getBMIScore(bmi, basics.age);

  const scrollTop = () => topRef.current?.scrollIntoView({ behavior: "smooth" });

  const handleBasicChange = (field, val) => setBasics(prev => ({ ...prev, [field]: val }));
  const toggleCondition = (c) => setBasics(prev => {
    const has = prev.conditions.includes(c);
    return { ...prev, conditions: has ? prev.conditions.filter(x => x !== c) : [...prev.conditions, c] };
  });
  const toggleProtein = (p) => setProteinSources(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  const toggleDigestive = (d) => setDigestive(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d]);

  const currentQuestion = QUESTIONS[currentQ];
  const totalQ = QUESTIONS.length;

  const progressPct = step === "questions" ? Math.round((currentQ / totalQ) * 100) : step === "results" ? 100 : 0;

  const canProceedBasics = basics.name && basics.age && basics.gender && basics.height && basics.weight && basics.foodPref && basics.lifestyle;

  const getQ2Options = () => {
    if (q2Sub === "I lost weight") return currentQuestion.lossOptions;
    if (q2Sub === "I gained weight") return currentQuestion.gainOptions;
    return null;
  };

  const isCurrentAnswered = () => {
    const q = currentQuestion;
    if (q.computed) return bmiScore !== null;
    if (q.sub) {
      if (!q2Sub) return false;
      if (q2Sub === "No change (stable)") return true;
      return answers[q.id] !== undefined;
    }
    return answers[q.id] !== undefined;
  };

  const computeResults = () => {
    let score = 0;
    const flagMap = {};
    const extraAlerts = [];

    QUESTIONS.forEach(q => {
      let options = q.options;
      if (q.sub) {
        if (q2Sub === "No change (stable)") {
          score += 3;
          flagMap[q.id] = { flag: "green", msg: "Weight is stable" };
          return;
        }
        options = q2Sub === "I lost weight" ? q.lossOptions : q.gainOptions;
      }
      const chosen = q.computed ? bmiScore : answers[q.id];
      if (chosen !== undefined && options) {
        const opt = options.find(o => o.score === chosen);
        if (opt) {
          score += opt.score;
          flagMap[q.id] = { flag: opt.flag, msg: opt.msg, alert: opt.alert, label: q.label };
        }
      }
    });

    let crossAlerts = [];

    // Cross-check: protein claim vs no sources
    if (answers.q9 === 3 && proteinSources.length === 0) {
      flagMap.q9 = { ...flagMap.q9, flag: "orange" };
      crossAlerts.push("You said you consume protein daily but have not selected any protein source. Please recheck.");
    }

    // Cross-check: vegetarian + non-veg sources
    if (basics.foodPref === "Vegetarian" && (proteinSources.includes("Egg") || proteinSources.includes("Chicken / Fish"))) {
      crossAlerts.push("Food preference conflict — you selected Vegetarian but ticked Egg / Chicken / Fish. Please recheck.");
    }

    // Cross-check: active lifestyle + sedentary activity
    if (basics.lifestyle === "Active" && (answers.q20 === 0 || answers.q20 === 1)) {
      flagMap.q20 = { ...flagMap.q20, flag: "orange" };
      crossAlerts.push("Activity level conflict — you selected 'Active' lifestyle but reported low/no physical activity. Please review.");
    }

    // Cross-check: digestive issues >= 3
    if (digestive.length >= 3) {
      extraAlerts.push({ flag: "orange", msg: "Multiple digestive issues detected — this may affect nutrient absorption." });
    }

    const flags = Object.values(flagMap);
    const greenCount = flags.filter(f => f.flag === "green").length;
    const yellowCount = flags.filter(f => f.flag === "yellow").length;
    const orangeCount = flags.filter(f => f.flag === "orange").length + (digestive.length >= 3 ? 1 : 0);
    const redCount = flags.filter(f => f.flag === "red").length;

    const classification = classify(score, redCount, orangeCount + (digestive.length >= 3 ? 1 : 0), yellowCount);

    const redAlerts = flags.filter(f => f.flag === "red");
    const orangeAlerts = flags.filter(f => f.flag === "orange");
    const yellowAlerts = yellowCount >= 10 ? flags.filter(f => f.flag === "yellow").slice(0, 3) : [];
    const greenItems = flags.filter(f => f.flag === "green");

    const sleepAlert = (answers.q13 === 0 || answers.q13 === 1)
      ? "Inadequate sleep can increase hunger hormones and affect your nutrition goals. Consider improving sleep hygiene habits."
      : null;

    setResults({ score, classification, redAlerts, orangeAlerts, yellowAlerts, greenItems, extraAlerts, crossAlerts, sleepAlert, flagMap, greenCount, yellowCount, orangeCount, redCount });
    setStep("results");
    setTimeout(scrollTop, 100);
  };

  const nextQ = () => {
    if (currentQ < totalQ - 1) {
      setCurrentQ(c => c + 1);
      setTimeout(scrollTop, 50);
    } else {
      computeResults();
    }
  };

  const prevQ = () => {
    if (currentQ > 0) {
      setCurrentQ(c => c - 1);
      setTimeout(scrollTop, 50);
    }
  };

  const restart = () => {
    setStep("intro");
    setAnswers({});
    setQ2Sub("");
    setProteinSources([]);
    setDigestive([]);
    setCurrentQ(0);
    setResults(null);
    setBasics({ name: "", age: "", gender: "", height: "", weight: "", occupation: "", community: "", foodPref: "", lifestyle: "", conditions: [] });
    setTimeout(scrollTop, 50);
  };

  const sectionGroups = SECTIONS.map(s => ({
    name: s,
    qs: QUESTIONS.filter(q => q.section === s),
  }));

  const sectionOfCurrent = currentQuestion?.section;
  const sectionIdx = SECTIONS.indexOf(sectionOfCurrent);

  const styles = {
    wrap: { fontFamily: "'DM Sans', 'Segoe UI', sans-serif", maxWidth: 720, margin: "0 auto", padding: "0 16px 80px" },
    header: { background: BRAND, borderRadius: 16, padding: "32px 28px", marginBottom: 28, color: "#fff" },
    headerTitle: { fontSize: 26, fontWeight: 700, margin: 0, letterSpacing: -0.5 },
    headerSub: { fontSize: 14, opacity: 0.85, marginTop: 6 },
    progressBar: { background: "rgba(255,255,255,0.25)", borderRadius: 99, height: 6, marginTop: 20 },
    progressFill: { background: "#fff", borderRadius: 99, height: 6, transition: "width 0.4s ease", width: progressPct + "%" },
    card: { background: "#fff", border: "1.5px solid #E8F0E8", borderRadius: 16, padding: "24px 24px", marginBottom: 20, boxShadow: "0 2px 12px rgba(45,106,45,0.06)" },
    sectionPill: { display: "inline-block", background: BRAND_LIGHT, color: BRAND, fontSize: 11, fontWeight: 600, padding: "4px 12px", borderRadius: 99, marginBottom: 14, letterSpacing: 0.4, textTransform: "uppercase" },
    qLabel: { fontSize: 18, fontWeight: 600, color: "#1a1a1a", marginBottom: 4, lineHeight: 1.4 },
    qSublabel: { fontSize: 13, color: "#666", marginBottom: 16 },
    optionBtn: (selected, flag) => ({
      display: "block", width: "100%", textAlign: "left", padding: "14px 18px", marginBottom: 10,
      borderRadius: 12, cursor: "pointer", transition: "all 0.15s",
      border: selected ? `2px solid ${FLAG_COLORS[flag].border}` : "1.5px solid #e0e0e0",
      background: selected ? FLAG_COLORS[flag].bg : "#fafafa",
      color: selected ? FLAG_COLORS[flag].text : "#333",
      fontWeight: selected ? 600 : 400,
      fontSize: 15,
    }),
    optionMeta: { display: "flex", alignItems: "center", gap: 8, marginTop: 4, fontSize: 12, color: "#888" },
    navRow: { display: "flex", gap: 12, marginTop: 24 },
    btnPrimary: { flex: 1, padding: "14px", background: BRAND, color: "#fff", border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 },
    btnSecondary: { padding: "14px 20px", background: "transparent", color: BRAND, border: `1.5px solid ${BRAND}`, borderRadius: 12, fontSize: 15, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 },
    inputField: { width: "100%", padding: "12px 14px", border: "1.5px solid #ddd", borderRadius: 10, fontSize: 15, boxSizing: "border-box", outline: "none", background: "#fafafa" },
    label: { display: "block", fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 6, marginTop: 16 },
    radioGroup: { display: "flex", flexWrap: "wrap", gap: 10, marginTop: 4 },
    radioBtn: (sel) => ({ padding: "9px 18px", border: sel ? `2px solid ${BRAND}` : "1.5px solid #ddd", borderRadius: 99, background: sel ? BRAND_LIGHT : "#fafafa", color: sel ? BRAND : "#555", fontWeight: sel ? 600 : 400, cursor: "pointer", fontSize: 14 }),
    checkChip: (sel) => ({ padding: "8px 14px", border: sel ? `2px solid ${BRAND}` : "1.5px solid #ddd", borderRadius: 8, background: sel ? BRAND_LIGHT : "#fafafa", color: sel ? BRAND : "#555", fontWeight: sel ? 600 : 400, cursor: "pointer", fontSize: 13 }),
    resultScore: { textAlign: "center", padding: "32px 24px", background: BRAND, borderRadius: 16, color: "#fff", marginBottom: 20 },
    resultScoreNum: { fontSize: 56, fontWeight: 800, lineHeight: 1 },
    resultLabel: (flag) => ({ display: "inline-block", padding: "8px 20px", borderRadius: 99, background: FLAG_COLORS[flag].bg, color: FLAG_COLORS[flag].text, fontWeight: 700, fontSize: 16, border: `2px solid ${FLAG_COLORS[flag].border}`, marginTop: 14 }),
    alertItem: (flag) => ({ display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px", borderRadius: 12, marginBottom: 10, background: FLAG_COLORS[flag].bg, border: `1px solid ${FLAG_COLORS[flag].border}` }),
    alertText: (flag) => ({ fontSize: 14, color: FLAG_COLORS[flag].text, lineHeight: 1.5, flex: 1 }),
    greenItem: { display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #eee", fontSize: 14, color: "#2D6A2D" },
    sectionNav: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 },
    sectionDot: (active, done) => ({ padding: "4px 12px", borderRadius: 99, fontSize: 12, fontWeight: 600, background: done ? BRAND : active ? BRAND_LIGHT : "#f0f0f0", color: done ? "#fff" : active ? BRAND : "#999", cursor: "default", display: "inline-flex", alignItems: "center", gap: 4 }),
    bmiChip: { display: "inline-block", padding: "6px 16px", borderRadius: 99, background: "#E8F5E9", color: BRAND, fontWeight: 700, fontSize: 14, marginTop: 8, border: "1px solid #A5D6A7" },
    divider: { height: 1, background: "#eee", margin: "20px 0" },
  };

  return (
    <div className="min-h-screen">
      <LoadingScreen onComplete={() => setLoadingComplete(true)} />
      {loadingComplete && (
        <>
          <Navbar />

          <section className="relative bg-gradient-to-br from-lime/10 via-cream to-gold/10 py-16">
            <div className="max-w-6xl mx-auto px-4 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-lime/20 text-lime">
                <ClipboardCheck size={34} strokeWidth={2.2} aria-hidden="true" />
              </div>
              <h1 className="text-5xl md:text-6xl font-cormorant font-bold text-dk mb-4">
                Nutritional Health Assessment
              </h1>
              <p className="text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
                Comprehensive assessment of your nutritional status, meal patterns, and lifestyle habits. Get personalized insights in 5-7 minutes.
              </p>
            </div>
          </section>

          {/* Assessment Section */}
          <section className="py-16 bg-cream">
            <div className="max-w-6xl mx-auto px-4">
              {(() => {
  if (step === "intro") {
    return (
      <div style={styles.wrap} ref={topRef}>
        <div style={{ ...styles.header, textAlign: "center" }}>
          <div style={{ marginBottom: 8, display: "flex", justifyContent: "center", color: BRAND }}>
            <Utensils size={42} strokeWidth={2.2} aria-hidden="true" />
          </div>
          <h1 style={styles.headerTitle}>Free Nutrition Assessment</h1>
          <p style={{ ...styles.headerSub, maxWidth: 420, margin: "8px auto 0" }}>A clinician-designed, 22-question assessment to understand your nutritional health and get personalised guidance.</p>
        </div>
        <div style={styles.card}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 20 }}>
            {[[ClipboardList, "22 Questions", "10 health sections"], [Timer, "~5 minutes", "Quick & easy"], [Target, "Personalised", "Actionable results"]].map(([Icon, t, s]) => (
              <div key={t} style={{ textAlign: "center", padding: "16px 8px", background: BRAND_LIGHT, borderRadius: 12, alignItems: "center" }}>
                {/* <Icon size={24} strokeWidth={2.2} color={BRAND} aria-hidden="true" /> */}
                <div style={{display: "flex", justifyContent: "center", width: "100%"}}>
                  <Icon size={24} strokeWidth={2.2} color={BRAND} />
                </div>
                <div style={{ fontWeight: 700, fontSize: 14, color: BRAND, marginTop: 4 }}>{t}</div>
                <div style={{ fontSize: 12, color: "#666", marginTop: 2 }}>{s}</div>
              </div>
            ))}
          </div>
          <p style={{ fontSize: 14, color: "#555", lineHeight: 1.7, marginBottom: 20 }}>
            This assessment covers BMI, meal patterns, nutrient intake, sleep, hydration, activity, and lifestyle risk. Your answers generate a personalised score and flag any areas that need attention.
          </p>
          <button style={styles.btnPrimary} onClick={() => { setStep("basics"); scrollTop(); }}>
            <span>Start Assessment</span>
            <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
          </button>
        </div>
      </div>
    );
  }

  if (step === "basics") {
    const conditions = ["Diabetes", "High BP", "Kidney Disease", "Heart Disease", "Cancer", "TB", "Post-surgery", "ICU", "None"];
    return (
      <div style={styles.wrap} ref={topRef}>
        <div style={styles.header}>
          <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1 }}>Step 1 of 2</div>
          <h1 style={{ ...styles.headerTitle, fontSize: 22, marginTop: 4 }}>Basic Details</h1>
          <p style={{ ...styles.headerSub }}>Used for personalised recommendations — does not affect your score.</p>
        </div>
        <div style={styles.card}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={styles.label}>Full Name *</label>
              <input className="w-full px-4 py-3 border border-gray-300 rounded-lg text-dk placeholder-gray-500 focus:ring-2 focus:ring-lime focus:border-transparent" style={styles.inputField} placeholder="Your name" value={basics.name} onChange={e => handleBasicChange("name", e.target.value)} />
            </div>
            <div>
              <label style={styles.label}>Age *</label>
              <input className="w-full px-4 py-3 border border-gray-300 rounded-lg text-dk placeholder-gray-500 focus:ring-2 focus:ring-lime focus:border-transparent" style={styles.inputField} type="number" placeholder="Years" value={basics.age} onChange={e => handleBasicChange("age", e.target.value)} />
            </div>
            <div>
              <label style={styles.label}>Height (cm) *</label>
              <input className="w-full px-4 py-3 border border-gray-300 rounded-lg text-dk placeholder-gray-500 focus:ring-2 focus:ring-lime focus:border-transparent" style={styles.inputField} type="number" placeholder="e.g. 165" value={basics.height} onChange={e => handleBasicChange("height", e.target.value)} />
            </div>
            <div>
              <label style={styles.label}>Weight (kg) *</label>
              <input className="w-full px-4 py-3 border border-gray-300 rounded-lg text-dk placeholder-gray-500 focus:ring-2 focus:ring-lime focus:border-transparent" style={styles.inputField} type="number" placeholder="e.g. 65" value={basics.weight} onChange={e => handleBasicChange("weight", e.target.value)} />
            </div>
          </div>

          {bmi && (
            <div style={{ marginTop: 12, padding: "12px 16px", background: BRAND_LIGHT, borderRadius: 10 }}>
              <span style={{ fontSize: 13, color: "#555" }}>Your BMI: </span>
              <strong style={{ fontSize: 16, color: BRAND }}>{bmi.toFixed(1)}</strong>
              <span style={{ fontSize: 13, color: "#555", marginLeft: 8, display: "inline-flex", alignItems: "center", gap: 4 }}>
                {parseInt(basics.age) > 60
                  ? (bmi >= 22 && bmi <= 27
                    ? <><CheckCircle size={15} color={FLAG_COLORS.green.border} aria-hidden="true" /> Normal (age-adjusted)</>
                    : <><AlertTriangle size={15} color={FLAG_COLORS.yellow.border} aria-hidden="true" /> Outside normal range</>)
                  : (bmi >= 18.5 && bmi <= 24.9
                    ? <><CheckCircle size={15} color={FLAG_COLORS.green.border} aria-hidden="true" /> Normal</>
                    : bmi < 18.5
                      ? <><AlertTriangle size={15} color={FLAG_COLORS.yellow.border} aria-hidden="true" /> Underweight</>
                      : <><AlertTriangle size={15} color={FLAG_COLORS.yellow.border} aria-hidden="true" /> Overweight</>)}
              </span>
            </div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 4 }}>
            <div>
              <label style={styles.label}>Occupation</label>
              <input className="w-full px-4 py-3 border border-gray-300 rounded-lg text-dk placeholder-gray-500 focus:ring-2 focus:ring-lime focus:border-transparent" style={styles.inputField} placeholder="e.g. Teacher" value={basics.occupation} onChange={e => handleBasicChange("occupation", e.target.value)} />
            </div>
            <div>
              <label style={styles.label}>Community</label>
              <input className="w-full px-4 py-3 border border-gray-300 rounded-lg text-dk placeholder-gray-500 focus:ring-2 focus:ring-lime focus:border-transparent" style={styles.inputField} placeholder="e.g. Gujarati" value={basics.community} onChange={e => handleBasicChange("community", e.target.value)} />
            </div>
          </div>

          <label style={styles.label}>Gender *</label>
          <div style={styles.radioGroup}>
            {["Male", "Female", "Other"].map(g => (
              <button key={g} style={styles.radioBtn(basics.gender === g)} onClick={() => handleBasicChange("gender", g)}>{g}</button>
            ))}
          </div>

          <label style={styles.label}>Food Preference *</label>
          <div style={styles.radioGroup}>
            {["Vegetarian", "Non-Vegetarian", "Eggetarian"].map(f => (
              <button key={f} style={styles.radioBtn(basics.foodPref === f)} onClick={() => handleBasicChange("foodPref", f)}>{f}</button>
            ))}
          </div>

          <label style={styles.label}>Lifestyle Pattern *</label>
          <div style={styles.radioGroup}>
            {["Active", "Moderate", "Sedentary"].map(l => (
              <button key={l} style={styles.radioBtn(basics.lifestyle === l)} onClick={() => handleBasicChange("lifestyle", l)}>{l}</button>
            ))}
          </div>

          <label style={styles.label}>Medical Conditions (tick all that apply)</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 4 }}>
            {conditions.map(c => (
              <button key={c} style={styles.checkChip(basics.conditions.includes(c))} onClick={() => toggleCondition(c)}>{c}</button>
            ))}
          </div>

          <div style={{ ...styles.navRow, marginTop: 28 }}>
            <button style={styles.btnSecondary} onClick={() => { setStep("intro"); scrollTop(); }}>
              <ArrowLeft size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>Back</span>
            </button>
            <button style={{ ...styles.btnPrimary, opacity: canProceedBasics ? 1 : 0.5 }} disabled={!canProceedBasics} onClick={() => { setStep("questions"); setCurrentQ(0); scrollTop(); }}>
              <span>Start Questions</span>
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "questions") {
    const q = currentQuestion;
    const completedSections = SECTIONS.slice(0, sectionIdx);

    return (
      <div style={styles.wrap} ref={topRef}>
        <div style={styles.header}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontSize: 13, opacity: 0.85 }}>Question {currentQ + 1} of {totalQ}</div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>{progressPct}% complete</div>
          </div>
          <div style={styles.progressBar}><div style={styles.progressFill}></div></div>
          <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8, textTransform: "uppercase", letterSpacing: 0.6, fontWeight: 600 }}>{sectionOfCurrent}</div>
        </div>

        <div style={styles.sectionNav}>
          {SECTIONS.map((s, i) => (
            <div key={s} style={styles.sectionDot(i === sectionIdx, i < sectionIdx)}>
              {i < sectionIdx && <CheckCircle size={12} strokeWidth={2.2} aria-hidden="true" />} {s.split(" ")[0]}
            </div>
          ))}
        </div>

        <div style={styles.card}>
          <div style={styles.sectionPill}>{q.section}</div>
          <div style={styles.qLabel}>{q.label}</div>
          {q.sublabel && <div style={styles.qSublabel}>{q.sublabel}</div>}

          {q.computed && bmi && (
            <div style={{ padding: "12px 16px", background: BRAND_LIGHT, borderRadius: 10, marginBottom: 16, fontSize: 14, color: BRAND, fontWeight: 600 }}>
              Your calculated BMI: {bmi.toFixed(1)}
              {parseInt(basics.age) > 60 && <span style={{ fontWeight: 400, color: "#555" }}> (using age-adjusted range for 60+)</span>}
            </div>
          )}

          {q.sub && (
            <>
              <div style={{ fontSize: 15, color: "#444", marginBottom: 12, fontWeight: 500 }}>{q.subQuestion}</div>
              <div style={styles.radioGroup}>
                {q.subOptions.map(opt => (
                  <button key={opt} style={styles.radioBtn(q2Sub === opt)} onClick={() => { setQ2Sub(opt); if (opt === "No change (stable)") setAnswers(prev => ({ ...prev, q2: 3 })); }}>{opt}</button>
                ))}
              </div>
              {q2Sub && q2Sub !== "No change (stable)" && (
                <div style={{ marginTop: 20 }}>
                  <div style={{ fontSize: 14, color: "#666", marginBottom: 12 }}>By approximately how much?</div>
                  {getQ2Options().map(opt => (
                    <button key={opt.score} style={styles.optionBtn(answers.q2 === opt.score, opt.flag)} onClick={() => setAnswers(prev => ({ ...prev, q2: opt.score }))}>
                      {opt.label}
                      <div style={styles.optionMeta}><FlagIcon flag={opt.flag} /><span>{opt.msg}</span></div>
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {!q.sub && !q.computed && q.options.map(opt => (
            <button key={opt.score} style={styles.optionBtn(answers[q.id] === opt.score, opt.flag)} onClick={() => setAnswers(prev => ({ ...prev, [q.id]: opt.score }))}>
              {opt.label}
              <div style={styles.optionMeta}><FlagIcon flag={opt.flag} /><span>{opt.msg}</span></div>
            </button>
          ))}

          {q.computed && q.options.map(opt => (
            <button key={opt.score} style={{ ...styles.optionBtn(bmiScore === opt.score, opt.flag), opacity: bmiScore === opt.score ? 1 : 0.5, cursor: "default" }}>
              {opt.label}
              <div style={styles.optionMeta}><FlagIcon flag={opt.flag} /><span>{opt.msg}</span></div>
            </button>
          ))}

          {q.hasChecklist && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#444", marginBottom: 10 }}>{q.checklistLabel}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {q.checklistItems.map(item => (
                  <button key={item} style={styles.checkChip(proteinSources.includes(item))} onClick={() => toggleProtein(item)}>{item}</button>
                ))}
              </div>
            </div>
          )}

          {q.hasDigestive && (
            <div style={{ marginTop: 20 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#444", marginBottom: 10 }}>{q.digestiveLabel}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {q.digestiveItems.map(item => (
                  <button key={item} style={styles.checkChip(digestive.includes(item))} onClick={() => toggleDigestive(item)}>{item}</button>
                ))}
              </div>
            </div>
          )}

          <div style={styles.navRow}>
            <button style={styles.btnSecondary} onClick={prevQ}>
              <ArrowLeft size={18} strokeWidth={2.2} aria-hidden="true" />
              <span>Back</span>
            </button>
            <button style={{ ...styles.btnPrimary, opacity: isCurrentAnswered() ? 1 : 0.45 }} disabled={!isCurrentAnswered()} onClick={nextQ}>
              <span>{currentQ === totalQ - 1 ? "See My Results" : "Next"}</span>
              <ArrowRight size={18} strokeWidth={2.2} aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === "results" && results) {
    const r = results;
    const hasAlerts = r.redAlerts.length > 0 || r.orangeAlerts.length > 0 || r.yellowAlerts.length > 0 || r.extraAlerts.length > 0;

    return (
      <div style={styles.wrap} ref={topRef}>
        <div style={{ ...styles.resultScore }}>
          <div style={{ fontSize: 13, opacity: 0.8, fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Your Nutrition Score</div>
          <div style={styles.resultScoreNum}>{r.score}<span style={{ fontSize: 28, fontWeight: 400, opacity: 0.7 }}>/66</span></div>
          <div style={{ marginTop: 6, opacity: 0.8, fontSize: 13 }}>{basics.name && `Hi ${basics.name} — `}here are your results</div>
          <div style={{ ...styles.resultLabel(r.classification.flag), display: "inline-flex", alignItems: "center", gap: 8 }}>
            <FlagIcon flag={r.classification.flag} size={18} />
            {r.classification.label}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 20, flexWrap: "wrap" }}>
            {[["red", r.redAlerts.length, "Red flags"], ["orange", r.orangeAlerts.length, "Orange flags"], ["yellow", results.yellowCount, "Yellow flags"], ["green", r.greenItems.length, "Green flags"]].map(([flag, n, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
                  <FlagIcon flag={flag} size={18} />
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: "#fff" }}>{n}</div>
                <div style={{ fontSize: 11, opacity: 0.75 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {r.crossAlerts.length > 0 && (
          <div style={{ ...styles.card, border: "1.5px solid #F57C00", background: "#FFF8F0" }}>
            <div style={{ fontWeight: 700, color: "#E65100", marginBottom: 10, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
              <AlertTriangle size={18} strokeWidth={2.2} aria-hidden="true" />
              Validation Alerts
            </div>
            {r.crossAlerts.map((a, i) => <div key={i} style={{ fontSize: 13, color: "#6D3000", marginBottom: 6, lineHeight: 1.5 }}>{a}</div>)}
          </div>
        )}

        {hasAlerts && (
          <div style={styles.card}>
            <div style={{ fontWeight: 700, fontSize: 16, color: "#1a1a1a", marginBottom: 16 }}>Key Alerts</div>
            {r.redAlerts.map((a, i) => (
              <div key={i} style={styles.alertItem("red")}>
                <AlertCircle size={18} strokeWidth={2.2} color={FLAG_COLORS.red.border} aria-hidden="true" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: FLAG_COLORS.red.text }}>{a.label}</div>
                  <div style={styles.alertText("red")}>{a.alert}</div>
                </div>
              </div>
            ))}
            {r.orangeAlerts.map((a, i) => (
              <div key={i} style={styles.alertItem("orange")}>
                <AlertTriangle size={18} strokeWidth={2.2} color={FLAG_COLORS.orange.border} aria-hidden="true" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: FLAG_COLORS.orange.text }}>{a.label}</div>
                  <div style={styles.alertText("orange")}>{a.alert}</div>
                </div>
              </div>
            ))}
            {r.extraAlerts.map((a, i) => (
              <div key={i} style={styles.alertItem("orange")}>
                <AlertTriangle size={18} strokeWidth={2.2} color={FLAG_COLORS.orange.border} aria-hidden="true" />
                <div style={styles.alertText("orange")}>{a.msg}</div>
              </div>
            ))}
            {r.yellowAlerts.map((a, i) => (
              <div key={i} style={styles.alertItem("yellow")}>
                <AlertTriangle size={18} strokeWidth={2.2} color={FLAG_COLORS.yellow.border} aria-hidden="true" />
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: FLAG_COLORS.yellow.text }}>{a.label}</div>
                  <div style={styles.alertText("yellow")}>{a.alert}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {r.sleepAlert && (
          <div style={{ ...styles.alertItem("yellow"), borderRadius: 12, padding: "14px 16px", marginBottom: 16 }}>
            <Moon size={18} strokeWidth={2.2} color={FLAG_COLORS.yellow.border} aria-hidden="true" />
            <div style={styles.alertText("yellow")}>{r.sleepAlert}</div>
          </div>
        )}

        {r.greenItems.length > 0 && (
          <div style={styles.card}>
            <div style={{ fontWeight: 700, fontSize: 16, color: BRAND, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}>
              <CheckCircle size={18} strokeWidth={2.2} aria-hidden="true" />
              What you are doing well
            </div>
            {r.greenItems.map((g, i) => (
              <div key={i} style={styles.greenItem}>
                <CheckCircle size={16} strokeWidth={2.2} color={FLAG_COLORS.green.border} aria-hidden="true" />
                <span style={{ fontWeight: 500 }}>{g.label}</span>
                <span style={{ color: "#555", fontSize: 13 }}>— {g.msg}</span>
              </div>
            ))}
          </div>
        )}

        <div style={{ ...styles.card, background: BRAND_LIGHT, border: `1.5px solid #A5D6A7` }}>
          <div style={{ fontWeight: 700, fontSize: 15, color: BRAND, marginBottom: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <ClipboardList size={18} strokeWidth={2.2} aria-hidden="true" />
            Recommendation
          </div>
          <div style={{ fontSize: 14, color: "#2D6A2D", lineHeight: 1.8 }}>
            {r.classification.case === 4 && "Your nutritional status requires immediate attention. Please consult a dietician as soon as possible. Focus on restoring balanced meals with adequate protein, fruits, vegetables, and proper hydration."}
            {r.classification.case === 3 && "Your nutritional health needs focused improvement. Prioritise daily protein intake, increase vegetable and fruit consumption, and address any highlighted red and orange flags with a structured plan."}
            {r.classification.case === 2 && "You have a good foundation but some areas need attention. Address the flagged concerns — particularly around diet consistency, sleep, and hydration — to elevate your nutritional health further."}
            {r.classification.case === 1 && "Excellent nutritional status! Keep maintaining your healthy habits. Continue your balanced diet, regular activity, and good sleep to sustain this over the long term."}
            {r.sleepAlert && " " + r.sleepAlert}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <button style={{ ...styles.btnPrimary, padding: "16px" }} onClick={() => router.push("/contact")}>
            <Calendar size={18} strokeWidth={2.2} aria-hidden="true" />
            <span>Book Consultation</span>
          </button>
          <button style={{ ...styles.btnSecondary, padding: "16px", flex: "none" }} onClick={() => window.print()}>
            <Download size={18} strokeWidth={2.2} aria-hidden="true" />
            <span>Download Meal Plan</span>
          </button>
        </div>

        <button style={{ ...styles.btnSecondary, width: "100%", marginTop: 12, padding: "12px" }} onClick={restart}>
          <RotateCcw size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>Retake Assessment</span>
        </button>

        <div style={{ textAlign: "center", marginTop: 24, fontSize: 12, color: "#999" }}>
          Robust Kitchen · Therapeutic Meals by Dieticians
        </div>
      </div>
    );
  }

  return null;
              })()}
            </div>
          </section>

          <Footer />
        </>
      )}
    </div>
  );
}
