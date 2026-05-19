import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronLeft, CheckCircle2, UserCircle2, Target, Calendar, ClipboardCheck, ArrowRight } from "lucide-react";
import { servicesData } from "../data/servicesData";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AssessmentType } from "../data/assessmentData";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find(s => s.slug === slug);
  const location = useLocation();
  const navigate = useNavigate();

  const getAssessmentType = (slug: string | undefined): AssessmentType => {
    if (!slug) return "general";
    if (slug.includes("stress") || slug.includes("anxiety")) return "anxiety";
    if (slug.includes("depression")) return "depression";
    if (slug.includes("couples") || slug.includes("relationship")) return "relationship";
    if (slug.includes("stress-management")) return "stress";
    return "general";
  };

  const assessmentType = getAssessmentType(slug);

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.substring(2);
      navigate("/");
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const offset = 140; 
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      }, 100);
    }
  };

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <h1 className="text-4xl font-serif font-bold text-charcoal mb-4">Service Not Found</h1>
          <Link to="/" className="text-sage-600 hover:underline flex items-center justify-center gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-36 pb-24 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-beige-100"
              >
                <div className="w-20 h-20 bg-sage-50 text-sage-500 rounded-[2rem] flex items-center justify-center mb-8">
                  {service.icon}
                </div>
                
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">{service.title}</h1>
                <p className="text-xl text-charcoal/70 mb-12 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-12">
                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <Target className="w-6 h-6 text-sage-500" />
                      <h2 className="text-2xl font-serif font-bold text-charcoal">What it Covers</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {service.covers.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-4 bg-beige-50 rounded-2xl border border-beige-100">
                          <CheckCircle2 className="w-5 h-5 text-sage-400 mt-0.5 shrink-0" />
                          <span className="text-charcoal/80 text-sm md:text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <UserCircle2 className="w-6 h-6 text-sage-500" />
                      <h2 className="text-2xl font-serif font-bold text-charcoal">Who is it Suitable For?</h2>
                    </div>
                    <ul className="space-y-4">
                      {service.suitableFor.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 text-charcoal/70 leading-relaxed">
                          <div className="w-1.5 h-1.5 rounded-full bg-sage-300 mt-2.5 shrink-0" />
                          <span className="text-sm md:text-base">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </section>

                  <section>
                    <div className="flex items-center gap-3 mb-6">
                      <CheckCircle2 className="w-6 h-6 text-sage-500" />
                      <h2 className="text-2xl font-serif font-bold text-charcoal">Expected Results</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {service.results.map((item, i) => (
                        <div key={i} className="p-6 bg-sage-50/50 rounded-3xl border border-sage-100 italic text-charcoal/80 text-sm md:text-base">
                          "{item}"
                        </div>
                      ))}
                    </div>
                  </section>
                </div>
              </motion.div>

              {/* Assessment Section at Bottom */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mt-12 bg-charcoal text-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
              >
                <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-sage-500/20 rounded-full blur-[100px]" />
                <div className="relative z-10">
                  <div className="bg-sage-500/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                    <ClipboardCheck className="w-8 h-8 text-sage-300" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">Take a Preliminary Self-Assessment</h2>
                  <p className="text-white/70 text-lg mb-8 max-w-2xl leading-relaxed">
                    Not sure where to start? Our research-backed screening tools provide instant clarity on your emotional well-being.
                  </p>
                  <Link 
                    to={`/assessment/${assessmentType}`}
                    className="inline-flex items-center gap-2 bg-sage-500 text-white px-8 py-4 rounded-2xl font-bold hover:bg-sage-600 transition-all shadow-lg shadow-charcoal/30 group"
                  >
                    Start Assessment <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            </div>

            {/* Sidebar Sticky */}
            <aside className="lg:col-span-4">
              <div className="sticky top-32 space-y-6">
                <div className="bg-sage-600 text-white p-8 rounded-[2.5rem] shadow-xl shadow-sage-200">
                  <h3 className="text-2xl font-serif font-bold mb-4">Start Your Journey</h3>
                  <p className="text-sage-100 mb-8 leading-relaxed">
                    Ready to take the first step towards {service.title.toLowerCase()}? Request an initial consultation with our experts.
                  </p>
                  <button 
                    onClick={() => handleNavClick("/#booking")}
                    className="w-full bg-white text-sage-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-beige-50 transition-colors text-center"
                  >
                    <Calendar className="w-5 h-5" />
                    Request Appointment
                  </button>
                </div>

                {/* Sidebar Assessment CTA */}
                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-sage-100 shadow-sm relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sage-50 rounded-bl-full -mr-8 -mt-8 transition-all group-hover:scale-110" />
                  <h4 className="text-lg font-serif font-bold text-charcoal mb-4 relative z-10">Mental Check-in</h4>
                  <p className="text-sm text-charcoal/60 mb-6 relative z-10">
                    Get instant insights with our professional screening tool.
                  </p>
                  <Link 
                    to={`/assessment/${assessmentType}`}
                    className="text-sage-600 font-bold text-sm flex items-center gap-2 hover:gap-3 transition-all relative z-10"
                  >
                    Take the Assessment <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-beige-100 shadow-sm text-charcoal">
                  <h4 className="text-lg font-serif font-bold mb-6">Quick Facts</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-beige-50">
                      <span className="text-sm text-charcoal/50">Primary Focus</span>
                      <span className="text-sm font-medium text-charcoal">{service.who}</span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-beige-50">
                      <span className="text-sm text-charcoal/50">Session Time</span>
                      <span className="text-sm font-medium text-charcoal">50 mins</span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-sm text-charcoal/50">Approach</span>
                      <span className="text-sm font-medium text-charcoal">Evidence-Based</span>
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
