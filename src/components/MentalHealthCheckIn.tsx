import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  assessments, 
  assessmentFormSchema, 
  AssessmentFormData, 
  AssessmentType, 
  checkInQuestions,
  AssessmentResult
} from "../data/assessmentData";
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  Loader2, 
  AlertCircle, 
  ArrowRight, 
  HeartPulse,
  LayoutDashboard,
  ClipboardList,
  Sparkles,
  RefreshCcw,
  Mail
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";

type CheckInStep = "info" | "checkin" | "suggestions" | "assessment" | "summary";

interface ConsolidatedResult {
  category: AssessmentType;
  title: string;
  result: AssessmentResult;
}

export default function MentalHealthCheckIn() {
  const [step, setStep] = useState<CheckInStep>("info");
  const [checkInAnswers, setCheckInAnswers] = useState<Record<string, number>>({});
  const [suggestedCategories, setSuggestedCategories] = useState<AssessmentType[]>([]);
  const [activeCategory, setActiveCategory] = useState<AssessmentType | null>(null);
  const [assessmentResults, setAssessmentResults] = useState<ConsolidatedResult[]>([]);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const scrollToCard = () => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (step === "checkin" || step === "assessment" || step === "suggestions") {
      scrollToCard();
    }
  }, [currentQuestionIdx, step, activeCategory]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues: { answers: {} }
  });

  const userName = watch("name");
  const userEmail = watch("email");

  const startCheckIn = () => {
    if (userName && userEmail) {
      setStep("checkin");
      setCurrentQuestionIdx(0);
    }
  };

  const handleCheckInAnswer = (questionId: string, score: number) => {
    const newAnswers = { ...checkInAnswers, [questionId]: score };
    setCheckInAnswers(newAnswers);
    
    if (currentQuestionIdx < checkInQuestions.length - 1) {
      setTimeout(() => setCurrentQuestionIdx(idx => idx + 1), 300);
    } else {
      // Process suggestions
      const suggestions: AssessmentType[] = [];
      checkInQuestions.forEach(q => {
        if (newAnswers[q.id] >= 2) {
          suggestions.push(q.category);
        }
      });
      // If no high scores, suggest 'general'
      if (suggestions.length === 0) suggestions.push("general");
      
      setSuggestedCategories(suggestions);
      setTimeout(() => setStep("suggestions"), 500);
    }
  };

  const startAssessment = (category: AssessmentType) => {
    setActiveCategory(category);
    setCurrentQuestionIdx(0);
    setStep("assessment");
  };

  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});

  const handleAssessmentAnswer = (questionId: string, score: number) => {
    const newAnswers = { ...assessmentAnswers, [questionId]: score };
    setAssessmentAnswers(newAnswers);
    
    const assessment = assessments[activeCategory!];
    if (currentQuestionIdx < assessment.questions.length - 1) {
      setTimeout(() => setCurrentQuestionIdx(idx => idx + 1), 300);
    }
  };

  const finishAssessment = () => {
    const assessment = assessments[activeCategory!];
    const totalScore = Object.values(assessmentAnswers).reduce((a: number, b: number) => a + b, 0);
    const result = assessment.scoring(totalScore);
    
    const newResult: ConsolidatedResult = {
      category: activeCategory!,
      title: assessment.title,
      result
    };
    
    setAssessmentResults([...assessmentResults, newResult]);
    setAssessmentAnswers({});
    setStep("suggestions");
    
    // Remove from suggested categories after completion
    setSuggestedCategories(suggestedCategories.filter(c => c !== activeCategory));
    setActiveCategory(null);
  };

  const submitFinalResults = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/checkin-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: userName,
          email: userEmail,
          results: assessmentResults,
        }),
      });
      
      if (response.ok) {
        setEmailSent(true);
      }
      setStep("summary");
    } catch (error) {
      console.error("Error submitting check-in:", error);
      alert("Submission failed, but your results are shown below.");
      setStep("summary");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-40 md:pt-48 pb-20 px-6 min-h-screen bg-beige-50">
        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {step === "info" && (
              <motion.div
                key="info"
                ref={cardRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-charcoal/5"
              >
                <div className="w-16 h-16 bg-sage-500 rounded-3xl flex items-center justify-center mb-8 shadow-lg shadow-sage-200">
                  <HeartPulse className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">Mental Health Check-in</h1>
                <p className="text-charcoal/70 text-lg leading-relaxed mb-8">
                  Begin your wellness journey with a personalized pulse check. This process helps us identify the areas where you might need the most support.
                </p>
                <div className="space-y-6 mb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-charcoal/50 uppercase tracking-widest mb-2 px-1">Your Name</label>
                      <input
                        {...register("name")}
                        className="w-full px-5 py-4 rounded-2xl bg-beige-50 border-2 border-transparent focus:border-sage-300 focus:bg-white outline-none transition-all"
                        placeholder="John Doe"
                      />
                      {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-charcoal/50 uppercase tracking-widest mb-2 px-1">Email Address</label>
                      <input
                        {...register("email")}
                        className="w-full px-5 py-4 rounded-2xl bg-beige-50 border-2 border-transparent focus:border-sage-300 focus:bg-white outline-none transition-all"
                        placeholder="john@example.com"
                      />
                      {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                    </div>
                  </div>
                </div>
                <button
                  onClick={startCheckIn}
                  className="w-full bg-sage-500 text-white px-8 py-5 rounded-2xl font-bold hover:bg-sage-600 transition-all flex items-center justify-center gap-2 transform active:scale-95"
                >
                  Start Check-in <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === "checkin" && (
              <motion.div
                key="checkin"
                ref={cardRef}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-charcoal/5"
              >
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-sage-600">Step 1: Initial Discovery</span>
                    <span className="text-sm text-charcoal/40">{currentQuestionIdx + 1} / {checkInQuestions.length}</span>
                  </div>
                  <div className="h-1.5 w-full bg-beige-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-sage-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIdx + 1) / checkInQuestions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h2 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-8 leading-tight">
                  {checkInQuestions[currentQuestionIdx].text}
                </h2>

                <div className="space-y-3">
                  {checkInQuestions[currentQuestionIdx].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleCheckInAnswer(checkInQuestions[currentQuestionIdx].id, option.score)}
                      className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                        checkInAnswers[checkInQuestions[currentQuestionIdx].id] === option.score
                        ? "border-sage-500 bg-sage-50 text-sage-900"
                        : "border-beige-100 hover:border-sage-200 hover:bg-beige-50"
                      }`}
                    >
                      <span className="font-medium">{option.text}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        checkInAnswers[checkInQuestions[currentQuestionIdx].id] === option.score
                        ? "border-sage-500 bg-sage-500 text-white"
                        : "border-beige-300 group-hover:border-sage-300"
                      }`}>
                        {checkInAnswers[checkInQuestions[currentQuestionIdx].id] === option.score && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {step === "suggestions" && (
              <motion.div
                key="suggestions"
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-charcoal/5"
              >
                <div className="text-center mb-10">
                  <div className="w-16 h-16 bg-sage-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="w-8 h-8 text-sage-500" />
                  </div>
                  <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Personalized Recommendations</h2>
                  <p className="text-charcoal/70">Based on your shared feelings, we recommend completing the following detailed assessments for better clarity.</p>
                </div>

                <div className="space-y-4 mb-10">
                  {/* Show already completed */}
                  {assessmentResults.map((res, idx) => (
                    <div key={`comp-${idx}`} className="flex items-center justify-between p-6 bg-sage-50 border-2 border-sage-100 rounded-2xl">
                      <div className="flex items-center gap-4">
                        <CheckCircle2 className="w-6 h-6 text-sage-500" />
                        <div>
                          <p className="font-bold text-charcoal">{res.title}</p>
                          <p className="text-xs text-sage-600 font-bold uppercase tracking-wider">Completed</p>
                        </div>
                      </div>
                      <span className="text-sage-700 font-bold text-sm bg-white px-3 py-1 rounded-full">{res.result.title}</span>
                    </div>
                  ))}

                  {/* Show pending suggestions */}
                  {suggestedCategories.map((cat, idx) => (
                    <button
                      key={`sug-${idx}`}
                      onClick={() => startAssessment(cat)}
                      className="w-full flex items-center justify-between p-6 bg-white border-2 border-beige-100 hover:border-sage-500 hover:bg-sage-50/30 rounded-2xl transition-all group"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-beige-50 rounded-xl flex items-center justify-center group-hover:bg-sage-100 transition-colors">
                          <ClipboardList className="w-5 h-5 text-charcoal/40 group-hover:text-sage-600" />
                        </div>
                        <div className="text-left">
                          <p className="font-bold text-charcoal">{assessments[cat].title}</p>
                          <p className="text-xs text-charcoal/40">{assessments[cat].questions.length} Questions • Approx. 3 mins</p>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-charcoal/20 group-hover:text-sage-500" />
                    </button>
                  ))}
                </div>

                <div className="flex flex-col md:flex-row gap-4 pt-6 border-t border-beige-100">
                  <button
                    disabled={assessmentResults.length === 0}
                    onClick={submitFinalResults}
                    className="flex-1 bg-charcoal text-white py-5 rounded-2xl font-bold hover:bg-black transition-all disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Finish & See Summary <LayoutDashboard className="w-5 h-5" /></>}
                  </button>
                  {suggestedCategories.length === 0 && (
                    <button
                      onClick={() => setStep("info")}
                      className="flex-1 border-2 border-beige-100 text-charcoal py-5 rounded-2xl font-bold hover:bg-beige-50 transition-all flex items-center justify-center gap-2"
                    >
                      Restart Check-in <RefreshCcw className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {step === "assessment" && activeCategory && (
              <motion.div
                key="assessment"
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-charcoal/5"
              >
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm font-bold text-sage-600 uppercase tracking-[0.1em]">{assessments[activeCategory].title}</span>
                    <span className="text-sm text-charcoal/40">{currentQuestionIdx + 1} / {assessments[activeCategory].questions.length}</span>
                  </div>
                  <div className="h-1.5 w-full bg-beige-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-sage-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIdx + 1) / assessments[activeCategory].questions.length) * 100}%` }}
                    />
                  </div>
                </div>

                <h2 className="text-2xl font-serif font-bold text-charcoal mb-8 leading-tight min-h-[80px]">
                  {assessments[activeCategory].questions[currentQuestionIdx].text}
                </h2>

                <div className="space-y-3">
                  {assessments[activeCategory].questions[currentQuestionIdx].options.map((option, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleAssessmentAnswer(assessments[activeCategory!].questions[currentQuestionIdx].id, option.score)}
                      className={`w-full text-left px-6 py-4 rounded-2xl border-2 transition-all flex items-center justify-between group ${
                        assessmentAnswers[assessments[activeCategory!].questions[currentQuestionIdx].id] === option.score
                        ? "border-sage-500 bg-sage-50 text-sage-900"
                        : "border-beige-100 hover:border-sage-200 hover:bg-beige-50"
                      }`}
                    >
                      <span className="font-medium">{option.text}</span>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        assessmentAnswers[assessments[activeCategory!].questions[currentQuestionIdx].id] === option.score
                        ? "border-sage-500 bg-sage-500 text-white"
                        : "border-beige-300 group-hover:border-sage-300"
                      }`}>
                        {assessmentAnswers[assessments[activeCategory!].questions[currentQuestionIdx].id] === option.score && <CheckCircle2 className="w-3 h-3" />}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="flex justify-between mt-10">
                  <button
                    disabled={currentQuestionIdx === 0}
                    onClick={() => setCurrentQuestionIdx(idx => idx - 1)}
                    className="text-charcoal/40 hover:text-charcoal transition-colors font-bold disabled:opacity-0"
                  >
                    Back
                  </button>
                  {currentQuestionIdx === assessments[activeCategory].questions.length - 1 && assessmentAnswers[assessments[activeCategory].questions[currentQuestionIdx].id] !== undefined ? (
                    <button
                      onClick={finishAssessment}
                      className="bg-sage-500 text-white px-10 py-3 rounded-2xl font-bold hover:bg-sage-600 transition-all shadow-lg shadow-sage-200"
                    >
                      Continue
                    </button>
                  ) : (
                    <button
                      disabled={assessmentAnswers[assessments[activeCategory].questions[currentQuestionIdx].id] === undefined}
                      onClick={() => setCurrentQuestionIdx(idx => idx + 1)}
                      className="text-charcoal/40 hover:text-charcoal transition-colors font-bold disabled:opacity-10"
                    >
                      Next
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {step === "summary" && (
              <motion.div
                key="summary"
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 md:p-12 rounded-[3rem] shadow-xl border border-charcoal/5"
              >
                <div className="text-center mb-10">
                  <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-8">
                    <Sparkles className="w-10 h-10 text-sage-600" />
                  </div>
                  <h2 className="text-4xl font-serif font-bold text-charcoal mb-4">Wellness Summary</h2>
                  <p className="text-charcoal/60 max-w-md mx-auto">Great job completing your check-in, {userName}. Here is a consolidated look at your current state.</p>
                </div>

                <div className="space-y-8 mb-12">
                  {assessmentResults.map((res, idx) => (
                    <div key={idx} className="bg-beige-50/50 rounded-3xl p-8 border border-beige-100">
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-xl font-serif font-bold text-charcoal">{res.title}</h3>
                        <span className="bg-sage-500 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">{res.result.title}</span>
                      </div>
                      <p className="text-charcoal/70 mb-4 italic">"{res.result.description}"</p>
                      
                      <div className="bg-white p-6 rounded-2xl shadow-sm border border-beige-100 mb-6">
                        <h4 className="font-bold text-sage-700 mb-2 flex items-center gap-2">
                          <Sparkles className="w-4 h-4" /> Key Recommendation
                        </h4>
                        <p className="text-charcoal/70 text-sm leading-relaxed">{res.result.recommendation}</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {res.result.tips.slice(0, 2).map((tip, tIdx) => (
                          <div key={tIdx} className="flex items-center gap-3 bg-white/60 p-3 rounded-xl border border-beige-100/50">
                            <CheckCircle2 className="w-4 h-4 text-sage-400 shrink-0" />
                            <span className="text-xs text-charcoal/60 leading-tight">{tip}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {emailSent && (
                  <div className="bg-sage-50 p-4 rounded-2xl flex items-center gap-4 mb-10 border border-sage-100">
                    <Mail className="w-6 h-6 text-sage-600" />
                    <p className="text-sm text-sage-800 font-medium">A copy of this summary has been sent to <strong>{userEmail}</strong></p>
                  </div>
                )}

                <div className="flex flex-col md:flex-row gap-4">
                  <Link
                    to="/#booking"
                    className="flex-1 bg-sage-500 text-white py-5 rounded-2xl font-bold hover:bg-sage-600 transition-all flex items-center justify-center gap-2 transform active:scale-95 shadow-xl shadow-sage-200"
                  >
                    Book Your Session <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/"
                    className="flex-1 border-2 border-beige-100 text-charcoal py-5 rounded-2xl font-bold hover:bg-beige-50 transition-all text-center"
                  >
                    Return Home
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
