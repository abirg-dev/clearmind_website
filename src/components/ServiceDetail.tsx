import { useParams, Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ChevronLeft, CheckCircle2, UserCircle2, Target, Calendar } from "lucide-react";
import { servicesData } from "../data/servicesData";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find(s => s.slug === slug);
  const location = useLocation();
  const navigate = useNavigate();

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

                <div className="bg-white p-8 rounded-[2.5rem] border border-beige-100 shadow-sm">
                  <h4 className="text-lg font-serif font-bold text-charcoal mb-6">Quick Facts</h4>
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
