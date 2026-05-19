
import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  BookOpen, 
  GraduationCap, 
  Clock, 
  ArrowRight, 
  ChevronRight,
  Sparkles,
  Search
} from "lucide-react";
import { resourcesData } from "../data/resourcesData";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export default function Resources() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialType = (searchParams.get('type') as 'blog' | 'course') || 'all';
  const [activeTab, setActiveTab] = useState<'all' | 'blog' | 'course'>(initialType);

  useEffect(() => {
    const type = searchParams.get('type') as 'blog' | 'course' | null;
    if (type) {
      setActiveTab(type);
    } else {
      setActiveTab('all');
    }
  }, [searchParams]);

  const handleTabChange = (tab: 'all' | 'blog' | 'course') => {
    setActiveTab(tab);
    if (tab === 'all') {
      searchParams.delete('type');
    } else {
      searchParams.set('type', tab);
    }
    setSearchParams(searchParams);
  };

  const filteredResources = activeTab === 'all' 
    ? resourcesData 
    : resourcesData.filter(r => r.type === activeTab);

  return (
    <>
      <Navbar />
      <main className="pt-40 md:pt-48 pb-20 px-6 min-h-screen bg-beige-50">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 rounded-full text-sage-600 text-xs font-bold uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Learning Hub
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6"
            >
              Resources for Your journey
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-charcoal/60 text-base md:text-lg max-w-2xl mx-auto leading-relaxed"
            >
              Explore our collection of research-backed blogs and mini-courses designed to provide clarity and support your mental well-being.
            </motion.p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-12">
            {[
              { id: 'all', label: 'All Resources', icon: Search },
              { id: 'blog', label: 'Articles & Blogs', icon: BookOpen },
              { id: 'course', label: 'Mini Courses', icon: GraduationCap }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => handleTabChange(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                  activeTab === tab.id 
                  ? "bg-sage-500 text-white shadow-lg shadow-sage-200" 
                  : "bg-white text-charcoal/60 hover:bg-beige-100 border border-beige-100"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 md:gap-8 lg:gap-10">
            {filteredResources.map((resource, idx) => (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[2.5rem] overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.1)] transition-all duration-500 border border-beige-100 flex flex-col h-full"
              >
                <Link to={`/resources/${resource.id}`} className="flex flex-col md:flex-row h-full">
                  <div className="relative md:w-2/5 shrink-0 overflow-hidden">
                    <img 
                      src={resource.image} 
                      alt={resource.title}
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur-md text-charcoal px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.15em] shadow-sm">
                        {resource.category}
                      </span>
                    </div>
                    {resource.type === 'course' && (
                      <div className="absolute top-4 right-4">
                        <div className="bg-sage-500 text-white p-2 rounded-lg shadow-lg">
                          <GraduationCap className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-[9px] font-bold text-charcoal/30 uppercase tracking-[0.2em] mb-4">
                        <span className="flex items-center gap-1.5 text-sage-600">
                          <Clock className="w-3.5 h-3.5" />
                          {resource.readingTime}
                        </span>
                        <span className="w-1 h-1 bg-beige-200 rounded-full" />
                        <span>{resource.date}</span>
                      </div>
                      
                      <h3 className="text-xl md:text-2xl font-serif font-bold text-charcoal mb-3 group-hover:text-sage-600 transition-colors leading-tight">
                        {resource.title}
                      </h3>
                      
                      <p className="text-charcoal/60 text-sm leading-relaxed line-clamp-2">
                        {resource.description}
                      </p>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-beige-50 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-sage-50 flex items-center justify-center text-[10px] font-bold text-sage-600 border border-sage-100 uppercase">
                          {resource.author.charAt(resource.author.indexOf(' ') + 1)}
                        </div>
                        <span className="text-[10px] font-bold text-charcoal/40 uppercase tracking-widest">{resource.author}</span>
                      </div>
                      <div className="inline-flex items-center gap-1 text-sage-600 font-bold text-xs group-hover:gap-2 transition-all">
                        Study <ChevronRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Therapy CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-24 md:mt-32 bg-charcoal text-white rounded-[3rem] md:rounded-[4rem] p-10 md:p-20 text-center relative overflow-hidden ring-1 ring-white/10"
          >
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-sage-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-sage-400/10 rounded-full blur-[100px]" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sage-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-8 ring-1 ring-white/10">
                Next Steps
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-8 leading-tight">Deepen your understanding through therapy.</h2>
              <p className="text-white/60 text-base md:text-lg mb-12 leading-relaxed font-light">
                Intellectual knowledge is the foundation, but clinical integration leads to transformation. Our psychologists help you apply these research insights to your unique life story.
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <Link 
                  to="/#booking"
                  className="bg-sage-400 text-white px-10 py-5 rounded-2xl font-bold hover:bg-sage-500 transition-all shadow-2xl shadow-black/20 flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Request Appointment <ArrowRight className="w-5 h-5" />
                </Link>
                <Link 
                  to="/mental-health-checkin"
                  className="bg-white/5 backdrop-blur-md text-white border border-white/10 px-10 py-5 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Self-Assessment <ChevronRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
