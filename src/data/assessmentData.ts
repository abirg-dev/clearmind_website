import { z } from "zod";

export type AssessmentType = "depression" | "anxiety" | "stress" | "relationship" | "general";

export interface AssessmentQuestion {
  id: string;
  text: string;
  options: {
    text: string;
    score: number;
  }[];
}

export interface AssessmentResult {
  title: string;
  description: string;
  recommendation: string;
  tips: string[];
}

export interface Assessment {
  id: AssessmentType;
  title: string;
  description: string;
  questions: AssessmentQuestion[];
  scoring: (totalScore: number) => AssessmentResult;
}

const standardFourOptions = [
  { text: "Not at all", score: 0 },
  { text: "Several days", score: 1 },
  { text: "More than half the days", score: 2 },
  { text: "Nearly every day", score: 3 },
];

export const assessments: Record<AssessmentType, Assessment> = {
  depression: {
    id: "depression",
    title: "Depression Screening (PHQ-9)",
    description: "The Patient Health Questionnaire-9 (PHQ-9) is a standard diagnostic tool used by mental health professionals to monitor the severity of depression.",
    questions: [
      { id: "q1", text: "Little interest or pleasure in doing things", options: standardFourOptions },
      { id: "q2", text: "Feeling down, depressed, or hopeless", options: standardFourOptions },
      { id: "q3", text: "Trouble falling or staying asleep, or sleeping too much", options: standardFourOptions },
      { id: "q4", text: "Feeling tired or having little energy", options: standardFourOptions },
      { id: "q5", text: "Poor appetite or overeating", options: standardFourOptions },
      { id: "q6", text: "Feeling bad about yourself — or that you are a failure or have let yourself or your family down", options: standardFourOptions },
      { id: "q7", text: "Trouble concentrating on things, such as reading the newspaper or watching television", options: standardFourOptions },
      { id: "q8", text: "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual", options: standardFourOptions },
      { id: "q9", text: "Thoughts that you would be better off dead or of hurting yourself in some way", options: standardFourOptions },
    ],
    scoring: (score) => {
      if (score <= 4) return { 
        title: "Minimal Symptoms", 
        description: "Your score suggests minimal or no depression symptoms.", 
        recommendation: "Continue maintaining your mental hygiene. If you feel changes, don't hesitate to reach out.",
        tips: ["Maintain a regular sleep schedule", "Engage in physical activity at least 3 times a week", "Practice gratitude journaling"]
      };
      if (score <= 9) return { 
        title: "Mild Depression", 
        description: "Your score suggests mild depressive symptoms.", 
        recommendation: "Consider speaking with a therapist to prevent symptoms from worsening.",
        tips: ["Identify small, manageable goals for each day", "Stay connected with supportive friends and family", "Limit alcohol and caffeine consumption"]
      };
      if (score <= 14) return { 
        title: "Moderate Depression", 
        description: "Your score suggests moderate depressive symptoms.", 
        recommendation: "We highly recommend booking a consultation with one of our specialists to develop a management plan.",
        tips: ["Establish a predictable daily routine", "Try to spend at least 15 minutes outdoors daily", "Avoid making major life decisions while feeling low"]
      };
      return { 
        title: "Severe Symptoms", 
        description: "Your score suggests severe symptoms that require professional attention.", 
        recommendation: "Please book an immediate appointment with us or contact local emergency services if you feel at risk. Professional support is vital at this stage.",
        tips: ["Reach out to a trusted individual immediately", "Prioritize basic needs like hydration and simple meals", "Follow up with a mental health professional as a priority"]
      };
    },
  },
  anxiety: {
    id: "anxiety",
    title: "Anxiety Screening (GAD-7)",
    description: "The GAD-7 is a sensitive self-reporting tool for screening and severity measuring of generalized anxiety disorder.",
    questions: [
      { id: "q1", text: "Feeling nervous, anxious or on edge", options: standardFourOptions },
      { id: "q2", text: "Not being able to stop or control worrying", options: standardFourOptions },
      { id: "q3", text: "Worrying too much about different things", options: standardFourOptions },
      { id: "q4", text: "Trouble relaxing", options: standardFourOptions },
      { id: "q5", text: "Being so restless that it is hard to sit still", options: standardFourOptions },
      { id: "q6", text: "Becoming easily annoyed or irritable", options: standardFourOptions },
      { id: "q7", text: "Feeling afraid as if something awful might happen", options: standardFourOptions },
    ],
    scoring: (score) => {
      if (score <= 4) return { 
        title: "Minimal Anxiety", 
        description: "Your score suggests minimal anxiety symptoms.", 
        recommendation: "Regular mindfulness practice can help maintain this balance.",
        tips: ["Practice deep breathing exercises", "Maintain a balanced diet and regular exercise", "Practice daily mindfulness or meditation"]
      };
      if (score <= 9) return { 
        title: "Mild Anxiety", 
        description: "Your score suggests mild anxiety.", 
        recommendation: "Consider counseling to learn effective coping strategies to manage occasional worry.",
        tips: ["Designate a specific 'worry time' each day for 15 minutes", "Limit news and social media consumption", "Use a journal to record and challenge anxious thoughts"]
      };
      if (score <= 14) return { 
        title: "Moderate Anxiety", 
        description: "Your score suggests moderate levels of anxiety.", 
        recommendation: "A formal assessment with a psychologist is recommended to prevent symptoms from escalating.",
        tips: ["Learn and practice progressive muscle relaxation", "Identify and avoid common anxiety triggers", "Practice grounding techniques (e.g., the 5-4-3-2-1 method)"]
      };
      return { 
        title: "Severe Anxiety", 
        description: "Your score indicates severe anxiety levels.", 
        recommendation: "Professional clinical intervention is strongly advised. We recommend booking an appointment as soon as possible.",
        tips: ["Follow a structured daily routine to increase sense of control", "Communicate your needs clearly to your support network", "Focus on one small task at a time to avoid feeling overwhelmed"]
      };
    },
  },
  stress: {
    id: "stress",
    title: "Stress Assessment",
    description: "Evaluate your recent stress levels and how they are impacting your daily life.",
    questions: [
      { id: "q1", text: "How often have you been upset because of something that happened unexpectedly?", options: standardFourOptions },
      { id: "q2", text: "How often have you felt that you were unable to control the important things in your life?", options: standardFourOptions },
      { id: "q3", text: "How often have you felt nervous and 'stressed'?", options: standardFourOptions },
      { id: "q4", text: "How often have you felt confident about your ability to handle your personal problems?", options: standardFourOptions.map(o => ({...o, score: 3-o.score})) },
      { id: "q5", text: "How often have you felt that things were going your way?", options: standardFourOptions.map(o => ({...o, score: 3-o.score})) },
      { id: "q6", text: "How often have you found that you could not cope with all the things that you had to do?", options: standardFourOptions },
      { id: "q7", text: "How often have you been able to control irritations in your life?", options: standardFourOptions.map(o => ({...o, score: 3-o.score})) },
    ],
    scoring: (score) => {
      if (score <= 7) return { 
        title: "Low Stress", 
        description: "You seem to be handling current stressors well.", 
        recommendation: "Maintain your self-care routines and healthy boundaries.",
        tips: ["Continue prioritizing your hobbies and interests", "Practice saying 'no' to non-essential commitments", "Regular physical activity to release tension"]
      };
      if (score <= 14) return { 
        title: "Moderate Stress", 
        description: "You are experiencing a significant amount of stress.", 
        recommendation: "Stress management therapy could be very beneficial for you. Consider booking a session to learn tools for better management.",
        tips: ["Practice time management techniques (e.g., Eisenhower Matrix)", "Incorporate brief relaxation breaks throughout your day", "Improve sleep hygiene for better recovery"]
      };
      return { 
        title: "High Stress", 
        description: "Your stress levels are very high and likely impacting your health.", 
        recommendation: "We strongly recommend booking a session to develop a comprehensive stress-reduction plan and prevent burnout.",
        tips: ["Identify major stressors and explore ways to delegate or reduce them", "Ensure you are taking enough time off from work/responsibilities", "Speak with a professional about chronic stress management"]
      };
    },
  },
  relationship: {
    id: "relationship",
    title: "Relationship Satisfaction Scale",
    description: "Briefly assess the health and satisfaction of your current primary relationship.",
    questions: [
      { id: "q1", text: "How well does your partner meet your needs?", options: [{text: "Poorly", score: 0}, {text: "Moderately", score: 1}, {text: "Well", score: 2}, {text: "Perfectly", score: 3}] },
      { id: "q2", text: "In general, how satisfied are you with your relationship?", options: standardFourOptions },
      { id: "q3", text: "How good is your relationship compared to most?", options: standardFourOptions },
      { id: "q4", text: "How often do you wish you hadn't gotten into this relationship?", options: standardFourOptions.map(o => ({...o, score: 3-o.score})) },
      { id: "q5", text: "To what extent has your relationship met your original expectations?", options: standardFourOptions },
    ],
    scoring: (score) => {
      if (score >= 12) return { 
        title: "High Satisfaction", 
        description: "You appear to have a healthy, satisfying relationship.", 
        recommendation: "Couples workshops or enrichment sessions can help deepen your connection even further.",
        tips: ["Continue practicing active listening with your partner", "Schedule regular 'date nights' to maintain priority", "Express appreciation for small gestures daily"]
      };
      if (score >= 7) return { 
        title: "Moderate Satisfaction", 
        description: "There are areas of conflict or dissatisfaction in your relationship.", 
        recommendation: "Couples counseling can help address these communication gaps. We recommend booking a joint session.",
        tips: ["Practice 'I' statements during conflicts to avoid blame", "Set aside time for honest, non-judgmental communication", "Identify shared goals and values to reinforce your bond"]
      };
      return { 
        title: "Low Satisfaction", 
        description: "Your relationship is experiencing significant distress.", 
        recommendation: "Professional relationship mediation or couples therapy is strongly recommended to resolve deep-seated issues.",
        tips: ["Focus on de-escalation techniques during heated arguments", "Consider individual therapy alongside couples sessions", "Evaluate boundaries and respect within the relationship"]
      };
    },
  },
  general: {
    id: "general",
    title: "General Well-being Assessment",
    description: "A quick pulse check on your overall mental and emotional state.",
    questions: [
      { id: "q1", text: "I have felt cheerful and in good spirits", options: standardFourOptions },
      { id: "q2", text: "I have felt calm and relaxed", options: standardFourOptions },
      { id: "q3", text: "I have felt active and vigorous", options: standardFourOptions },
      { id: "q4", text: "I woke up feeling fresh and rested", options: standardFourOptions },
      { id: "q5", text: "My daily life has been filled with things that interest me", options: standardFourOptions },
    ],
    scoring: (score) => {
      if (score >= 12) return { 
        title: "Resilient Well-being", 
        description: "You have a strong sense of well-being.", 
        recommendation: "Keep up the great work with your mental health practices. You might enjoy our community workshops.",
        tips: ["Volunteer or help others to enhance sense of purpose", "Continue to stay physically active", "Keep learning new skills or exploring interests"]
      };
      if (score >= 7) return { 
        title: "Balanced", 
        description: "Your well-being is fairly stable but has room for improvement.", 
        recommendation: "Consider self-growth sessions to reach your full potential and increase your resilience.",
        tips: ["Incorporate more 'joyful' activities into your week", "Practice consistent self-care even when you feel okay", "Ensure you're getting adequate social interaction"]
      };
      return { 
        title: "Struggling", 
        description: "Your general well-being seems low right now.", 
        recommendation: "A supportive therapy session could help you find your footing again. We recommend booking a consultation.",
        tips: ["Start with small, achievable goals each day", "Reach out to your support system", "Reduce pressure on yourself to be 'productive'"]
      };
    },
  }
};

export const assessmentFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  answers: z.record(z.string(), z.number()),
});

export type AssessmentFormData = z.infer<typeof assessmentFormSchema>;

export interface CheckInQuestion {
  id: string;
  category: AssessmentType;
  text: string;
  options: {
    text: string;
    score: number;
  }[];
}

const basicScale = [
  { text: "Very Low / Not at all", score: 0 },
  { text: "Low / Occasionally", score: 1 },
  { text: "Moderate / Some days", score: 2 },
  { text: "High / Most days", score: 3 },
  { text: "Very High / Always", score: 4 },
];

export const checkInQuestions: CheckInQuestion[] = [
  { id: "mood", category: "depression", text: "How would you describe your overall mood and spirit recently?", options: basicScale },
  { id: "worry", category: "anxiety", text: "How much have you been feeling anxious or worrying about various things?", options: basicScale },
  { id: "stress", category: "stress", text: "How overwhelmed do you feel by your current daily responsibilities?", options: basicScale },
  { id: "connection", category: "relationship", text: "How satisfied are you with your social connections and relationships?", options: basicScale.map(o => ({...o, score: 4-o.score})) },
  { id: "coping", category: "general", text: "How well are you coping with life's day-to-day challenges?", options: basicScale.map(o => ({...o, score: 4-o.score})) },
];
