import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, ArrowRight, HeartPulse } from "lucide-react";

export default function CheckInPromo() {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-charcoal rounded-[3rem] p-8 md:p-16 text-white group"
        >
          {/* Background pattern */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
            <svg width="400" height="400" viewBox="0 0 400 400" fill="none">
              <circle cx="200" cy="200" r="150" stroke="currentColor" strokeWidth="20" />
              <circle cx="350" cy="50" r="80" stroke="currentColor" strokeWidth="10" />
            </svg>
          </div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
                <Sparkles className="w-4 h-4 text-sage-400" />
                Newly Launched
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                Not sure where to start? <br />
                Try our <span className="text-sage-400">Mental Wellness Check-in</span>.
              </h2>
              <p className="text-lg text-white/70 mb-10 max-w-lg leading-relaxed">
                Take a brief 2-minute check-in to get a personalized pulse on your emotional state. We'll suggest the right assessments and help you find the best path forward.
              </p>
              <Link 
                to="/mental-health-checkin"
                className="inline-flex items-center gap-3 bg-white text-charcoal px-10 py-5 rounded-2xl font-bold hover:bg-sage-400 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-black/20"
              >
                Start My Check-in <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            
            <div className="hidden lg:flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 bg-sage-500 rounded-full flex items-center justify-center animate-pulse-slow">
                  <HeartPulse className="w-32 h-32 text-white" />
                </div>
                {/* Floating badges */}
                <motion.div 
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -top-4 -right-4 bg-white text-charcoal px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
                >
                  Quick Pulse
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                  className="absolute -bottom-4 -left-4 bg-sage-400 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg"
                >
                  Expert Insight
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
