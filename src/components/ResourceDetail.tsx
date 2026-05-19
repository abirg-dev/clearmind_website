
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useSpring } from "motion/react";
import Markdown from "react-markdown";
import { 
  ChevronLeft, 
  Clock, 
  Share2, 
  Bookmark, 
  ArrowRight,
  Info,
  CheckCircle2,
  BookOpen,
  GraduationCap
} from "lucide-react";
import { resourcesData } from "../data/resourcesData";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState, useMemo, useRef } from "react";

export default function ResourceDetail() {
  const { id } = useParams<{ id: string }>();
  const resource = useMemo(() => resourcesData.find(r => r.id === id), [id]);
  const [activeModuleIdx, setActiveModuleIdx] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  if (!resource) return <div>Resource not found</div>;

  return (
    <>
      <Navbar />
      {/* Progress Bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1.5 bg-sage-500 origin-left z-[70]"
        style={{ scaleX }}
      />
      
      <main className="pt-32 md:pt-40 pb-20 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6">
          <Link 
            to="/resources" 
            className="inline-flex items-center gap-2 text-charcoal/50 hover:text-charcoal transition-colors mb-12 mt-8 font-bold uppercase tracking-widest text-xs"
          >
            <ChevronLeft className="w-4 h-4" /> Back to Resources
          </Link>

          <div className="flex flex-col lg:flex-row gap-16">
            {/* Main Content Area */}
            <div className="flex-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-12"
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="px-4 py-1 bg-sage-500 text-white rounded-full text-xs font-bold tracking-widest uppercase">
                    {resource.category}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-charcoal/40 font-bold tracking-widest uppercase">
                    <Clock className="w-3.5 h-3.5" />
                    {resource.readingTime}
                  </div>
                </div>
                
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-charcoal mb-8 leading-tight">
                  {resource.title}
                </h1>
                
                <div className="flex items-center justify-between py-8 border-y border-beige-200 mb-12">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 bg-sage-50 rounded-2xl flex items-center justify-center font-bold text-sage-600 border border-sage-100 uppercase">
                      {resource.author.charAt(resource.author.indexOf(' ') + 1)}
                    </div>
                    <div>
                      <p className="font-serif font-bold text-charcoal text-lg">{resource.author}</p>
                      <p className="text-[10px] text-charcoal/40 uppercase tracking-[0.2em] font-bold">Clinical Contributor • {resource.date}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="p-3 bg-white border border-beige-100 hover:bg-beige-50 rounded-xl transition-all text-charcoal/40 hover:text-charcoal shadow-sm">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button className="p-3 bg-white border border-beige-100 hover:bg-beige-50 rounded-xl transition-all text-charcoal/40 hover:text-charcoal shadow-sm">
                      <Share2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="rounded-[3.5rem] overflow-hidden mb-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] border-8 border-white ring-1 ring-beige-100">
                  <img 
                    src={resource.image} 
                    alt={resource.title}
                    className="w-full h-auto object-cover max-h-[600px]"
                  />
                </div>

                {resource.type === 'course' ? (
                  <div className="space-y-10">
                    {/* Course Navigation */}
                    <div className="bg-white p-2 rounded-2xl border border-beige-100 shadow-sm inline-flex flex-wrap gap-1 mb-6">
                      {resource.modules.map((m, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            setActiveModuleIdx(idx);
                            scrollToContent();
                          }}
                          className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-all ${
                            activeModuleIdx === idx 
                            ? "bg-sage-500 text-white shadow-md shadow-sage-200" 
                            : "text-charcoal/40 hover:bg-beige-50"
                          }`}
                        >
                          Step {idx + 1}
                        </button>
                      ))}
                    </div>

                    <motion.div
                      key={activeModuleIdx}
                      ref={contentRef}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white p-10 md:p-14 lg:p-20 rounded-[4rem] border border-beige-100 shadow-[0_4px_30px_rgba(0,0,0,0.03)]"
                    >
                      <span className="text-sage-500 font-bold text-xs uppercase tracking-[0.3em] mb-4 block">Module {activeModuleIdx + 1} of {resource.modules.length}</span>
                      <h2 className="text-3xl md:text-5xl font-serif font-bold text-charcoal mb-10 leading-tight">
                        {resource.modules[activeModuleIdx].title}
                      </h2>
                      <div className="prose prose-lg md:prose-xl text-charcoal/70 leading-relaxed mb-12 max-w-none font-light markdown-body">
                        <Markdown>{resource.modules[activeModuleIdx].content}</Markdown>
                      </div>
                      
                      {resource.modules[activeModuleIdx].image && (
                        <div className="rounded-3xl overflow-hidden mb-12 ring-1 ring-beige-100 shadow-lg">
                          <img 
                            src={resource.modules[activeModuleIdx].image} 
                            alt="Module Insight" 
                            className="w-full h-auto"
                          />
                        </div>
                      )}

                      {resource.modules[activeModuleIdx].researchNote && (
                        <div className="bg-sage-50/50 p-8 md:p-10 rounded-[2.5rem] border border-sage-100/50 flex flex-col md:flex-row items-start gap-6 mb-12">
                          <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm shrink-0 border border-sage-100">
                            <Info className="w-6 h-6 text-sage-600" />
                          </div>
                          <div>
                            <h4 className="text-[10px] font-bold text-sage-600 uppercase tracking-[0.2em] mb-2">Research Insight</h4>
                            <p className="text-base md:text-lg text-sage-900/80 leading-relaxed font-serif italic">{resource.modules[activeModuleIdx].researchNote}</p>
                          </div>
                        </div>
                      )}

                      <div className="mt-16 pt-12 border-t border-beige-50 flex flex-col sm:flex-row justify-between items-center gap-6">
                        <button
                          disabled={activeModuleIdx === 0}
                          onClick={() => {
                            setActiveModuleIdx(prev => prev - 1);
                            scrollToContent();
                          }}
                          className="font-bold text-charcoal/40 hover:text-charcoal disabled:opacity-0 transition-all flex items-center gap-2 uppercase text-xs tracking-widest order-2 sm:order-1"
                        >
                          <ChevronLeft className="w-5 h-5" /> Previous Stage
                        </button>
                        {activeModuleIdx < resource.modules.length - 1 ? (
                          <button
                            onClick={() => {
                              setActiveModuleIdx(prev => prev + 1);
                              scrollToContent();
                            }}
                            className="w-full sm:w-auto bg-sage-500 text-white px-10 py-5 rounded-2xl font-bold hover:bg-sage-600 transition-all flex items-center justify-center gap-3 shadow-xl shadow-sage-100 order-1 sm:order-2"
                          >
                            Next Module <ArrowRight className="w-5 h-5" />
                          </button>
                        ) : (
                          <Link 
                            to="/#booking"
                            className="w-full sm:w-auto bg-sage-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-sage-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-sage-200 order-1 sm:order-2"
                          >
                            Clinical Consultation <CheckCircle2 className="w-5 h-5" />
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  </div>
                ) : (
                  <div className="space-y-24">
                    {resource.modules.map((module, idx) => (
                      <motion.section 
                        key={idx}
                        className="max-w-none"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                      >
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-8 leading-tight">{module.title}</h2>
                        <div className="text-lg md:text-xl text-charcoal/70 leading-relaxed mb-12 font-light markdown-body">
                          <Markdown>{module.content}</Markdown>
                        </div>
                        {module.researchNote && (
                          <div className="bg-white p-8 md:p-12 rounded-[3rem] border border-beige-100 flex items-start gap-8 shadow-sm">
                            <div className="w-14 h-14 bg-sage-50 rounded-2xl flex items-center justify-center shrink-0 border border-sage-100">
                              <BookOpen className="w-7 h-7 text-sage-600" />
                            </div>
                            <div>
                              <span className="text-[10px] font-bold text-sage-600 uppercase tracking-[0.2em] mb-3 block">Expert Analysis</span>
                              <p className="text-base md:text-lg text-charcoal/70 italic leading-relaxed font-serif">
                                {module.researchNote}
                              </p>
                            </div>
                          </div>
                        )}
                      </motion.section>
                    ))}
                  </div>
                )}
              </motion.div>
            </div>

            {/* Sticky Sidebar */}
            <aside className="lg:w-80 space-y-8">
              <div className="sticky top-32 space-y-8">
                {/* Therapy Recommendation Widget */}
                <div className="bg-charcoal text-white p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-sage-500/10 rounded-full blur-[40px] -mr-16 -mt-16 group-hover:bg-sage-500/20 transition-all" />
                   <h4 className="text-xl font-serif font-bold mb-4 relative z-10">Expand Your Clarity</h4>
                   <p className="text-sm text-white/60 mb-8 relative z-10 leading-relaxed">
                     Reading is the first step. Personal application with a professional psychologist leads to lasting change.
                   </p>
                   <Link 
                    to="/#booking"
                    className="w-full flex items-center justify-center gap-2 py-4 bg-white text-charcoal rounded-2xl font-bold hover:bg-sage-400 hover:text-white transition-all transform hover:scale-[1.02] shadow-lg shadow-black/20"
                   >
                     Book a Session <ArrowRight className="w-4 h-4" />
                   </Link>
                </div>

                <div className="bg-white p-8 rounded-[2.5rem] border border-beige-100 shadow-sm">
                  <h4 className="text-lg font-serif font-bold text-charcoal mb-6 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-sage-500" />
                    Key Takeaways
                  </h4>
                  <ul className="space-y-4">
                    {resource.modules.slice(1, 4).map((m, idx) => (
                      <li key={idx} className="flex gap-3 text-sm text-charcoal/60 leading-relaxed pb-4 border-b border-beige-50 last:border-0 last:pb-0">
                        <CheckCircle2 className="w-4 h-4 text-sage-400 shrink-0 mt-0.5" />
                        {m.title}
                      </li>
                    ))}
                  </ul>
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
