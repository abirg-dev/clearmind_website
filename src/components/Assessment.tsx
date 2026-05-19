import { useState, useRef, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { assessments, assessmentFormSchema, AssessmentFormData, AssessmentType } from "../data/assessmentData";
import { ChevronRight, ChevronLeft, CheckCircle2, Loader2, AlertCircle, ArrowRight, ClipboardCheck } from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { businessData } from "../data/businessData";

export default function Assessment() {
  const { type } = useParams<{ type: string }>();
  const assessment = assessments[type as AssessmentType] || assessments.general;
  
  const [step, setStep] = useState<"info" | "user" | "questions" | "result">("info");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof assessment.scoring> | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const scrollToCard = () => {
    if (cardRef.current) {
      cardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    if (step === "questions" || step === "user") {
      scrollToCard();
    }
  }, [currentQuestionIndex, step]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentFormSchema),
    defaultValues: {
      answers: {},
    },
  });

  const answers = watch("answers");

  const handleAnswerSelect = (questionId: string, score: number) => {
    setValue(`answers.${questionId}`, score);
    if (currentQuestionIndex < assessment.questions.length - 1) {
      setTimeout(() => setCurrentQuestionIndex(prev => prev + 1), 300);
    }
  };

  const onSubmit = async (data: AssessmentFormData) => {
    setIsSubmitting(true);
    try {
      const totalScore = Object.values(data.answers).reduce((a, b) => a + b, 0);
      const calculatedResult = assessment.scoring(totalScore);
      
      // Submit to backend
      const response = await fetch("/api/assessment-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          assessmentTitle: assessment.title,
          score: totalScore,
          result: calculatedResult
        }),
      });

      if (!response.ok) throw new Error("Submission failed");
      
      setResult(calculatedResult);
      setStep("result");
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const progress = ((Object.keys(answers || {}).length) / assessment.questions.length) * 100;

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
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-charcoal/5"
              >
                <div className="w-16 h-16 bg-sage-100 rounded-2xl flex items-center justify-center mb-8">
                  <ClipboardCheck className="w-8 h-8 text-sage-600" />
                </div>
                <h1 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">{assessment.title}</h1>
                <p className="text-charcoal/70 text-lg leading-relaxed mb-8">
                  {assessment.description}
                </p>
                <div className="bg-sage-50 border-l-4 border-sage-400 p-4 mb-8">
                  <p className="text-sage-800 text-sm italic">
                    Note: This is a screening tool, not a clinical diagnosis. Please consult with our professionals for a formal assessment.
                  </p>
                </div>
                <button
                  onClick={() => setStep("user")}
                  className="w-full md:w-auto bg-sage-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-sage-600 transition-all flex items-center justify-center gap-2"
                >
                  Start Assessment <ChevronRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {step === "user" && (
              <motion.div
                key="user"
                ref={cardRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-charcoal/5"
              >
                <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">Tell us about yourself</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">Your Full Name</label>
                    <input
                      {...register("name")}
                      className="w-full px-4 py-3 rounded-xl border border-beige-200 focus:ring-2 focus:ring-sage-300 outline-none transition-all"
                      placeholder="John Doe"
                    />
                    {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-charcoal/70 mb-2">Email Address</label>
                    <input
                      {...register("email")}
                      className="w-full px-4 py-3 rounded-xl border border-beige-200 focus:ring-2 focus:ring-sage-300 outline-none transition-all"
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                  </div>
                  <div className="flex gap-4">
                    <button
                      onClick={() => setStep("info")}
                      className="flex-1 border border-beige-200 text-charcoal py-4 rounded-xl font-bold hover:bg-beige-50 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        if (watch("name") && watch("email") && !errors.name && !errors.email) {
                          setStep("questions");
                        }
                      }}
                      className="flex-1 bg-sage-500 text-white py-4 rounded-xl font-bold hover:bg-sage-600 transition-all"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === "questions" && (
              <motion.div
                key="questions"
                ref={cardRef}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-charcoal/5"
              >
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-sage-600 uppercase tracking-wider">Progress</span>
                    <span className="text-xs font-bold text-charcoal/50">{Math.round(progress)}%</span>
                  </div>
                  <div className="h-2 w-full bg-beige-100 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-sage-500"
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="min-h-[300px] flex flex-col">
                  <span className="text-sage-500 font-bold mb-2">Question {currentQuestionIndex + 1} of {assessment.questions.length}</span>
                  <h3 className="text-xl md:text-2xl font-serif font-bold text-charcoal mb-8 leading-tight">
                    {assessment.questions[currentQuestionIndex].text}
                  </h3>

                  <div className="space-y-3 mt-auto">
                    {assessment.questions[currentQuestionIndex].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerSelect(assessment.questions[currentQuestionIndex].id, option.score)}
                        className={`w-full text-left px-6 py-4 rounded-xl border-2 transition-all duration-200 flex items-center justify-between group ${
                          answers[assessment.questions[currentQuestionIndex].id] === option.score
                          ? "border-sage-500 bg-sage-50 text-sage-900"
                          : "border-beige-100 hover:border-sage-200 hover:bg-beige-50"
                        }`}
                      >
                        <span className="font-medium">{option.text}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                          answers[assessment.questions[currentQuestionIndex].id] === option.score
                          ? "border-sage-500 bg-sage-500 text-white"
                          : "border-beige-300 group-hover:border-sage-300"
                        }`}>
                          {answers[assessment.questions[currentQuestionIndex].id] === option.score && <CheckCircle2 className="w-3 h-3" />}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="flex justify-between mt-10">
                    <button
                      disabled={currentQuestionIndex === 0}
                      onClick={() => setCurrentQuestionIndex(prev => prev - 1)}
                      className="flex items-center gap-1 text-charcoal/50 hover:text-charcoal disabled:opacity-0 transition-all font-medium"
                    >
                      <ChevronLeft className="w-5 h-5" /> Previous
                    </button>
                    
                    {currentQuestionIndex === assessment.questions.length - 1 && Object.keys(answers).length === assessment.questions.length ? (
                      <button
                        onClick={handleSubmit(onSubmit)}
                        disabled={isSubmitting}
                        className="bg-sage-500 text-white px-8 py-3 rounded-xl font-bold hover:bg-sage-600 transition-all disabled:opacity-50 flex items-center gap-2"
                      >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : "See Results"}
                      </button>
                    ) : (
                      <button
                        disabled={answers[assessment.questions[currentQuestionIndex].id] === undefined}
                        onClick={() => setCurrentQuestionIndex(prev => prev + 1)}
                        className="flex items-center gap-1 text-charcoal/50 hover:text-charcoal disabled:opacity-30 transition-all font-medium"
                      >
                        Next <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            {step === "result" && result && (
              <motion.div
                key="result"
                ref={cardRef}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-charcoal/5 text-center"
              >
                <div className="w-20 h-20 bg-sage-100 rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle2 className="w-10 h-10 text-sage-600" />
                </div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">Your Assessment Results</h2>
                <div className="bg-beige-50 rounded-2xl p-8 mb-8 text-center border border-beige-100">
                  <h3 className="text-2xl font-bold text-sage-700 mb-2">{result.title}</h3>
                  <p className="text-charcoal/70 leading-relaxed max-w-md mx-auto">{result.description}</p>
                </div>
                
                <div className="text-left bg-white border-2 border-sage-100 p-6 rounded-2xl mb-6 shadow-sm overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sage-50 rounded-bl-full -mr-16 -mt-16 opacity-50" />
                  <div className="flex items-start gap-4 relative z-10">
                    <div className="bg-sage-100 p-3 rounded-xl mt-1">
                      <AlertCircle className="w-6 h-6 text-sage-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-charcoal mb-2">Expert Recommendation</h4>
                      <p className="text-charcoal/70 leading-relaxed font-medium">{result.recommendation}</p>
                    </div>
                  </div>
                </div>

                <div className="text-left bg-white border border-beige-100 p-6 md:p-8 rounded-2xl mb-10">
                  <h4 className="text-charcoal font-serif font-bold text-xl mb-4">Management Tips</h4>
                  <ul className="space-y-4">
                    {result.tips.map((tip, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-sage-400 shrink-0" />
                        <span className="text-charcoal/70 leading-relaxed">{tip}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 pt-6 border-t border-beige-50">
                    <p className="text-sm italic text-charcoal/50">
                      These are general tips. For a personalized management plan, we recommend booking a professional consultation.
                    </p>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row gap-4">
                  <Link
                    to="/#booking"
                    className="flex-1 bg-sage-500 text-white py-4 rounded-xl font-bold hover:bg-sage-600 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sage-200"
                  >
                    Book a Free Consultation <ArrowRight className="w-5 h-5" />
                  </Link>
                  <Link
                    to="/"
                    className="flex-1 border border-beige-200 text-charcoal py-4 rounded-xl font-bold hover:bg-beige-50 transition-all"
                  >
                    Return Home
                  </Link>
                </div>
                
                <p className="mt-8 text-charcoal/40 text-xs">
                  A detailed copy of these results has been sent to your email ({watch("email")}). 
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
