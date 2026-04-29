import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, ChevronUp, MapPin, Instagram, Linkedin, Mail } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BookingForm from "./BookingForm";
import { psychologistsData } from "../data/psychologistsData";
import { businessData } from "../data/businessData";

export default function PsychologistPortfolio() {
  const { slug } = useParams();
  const psychologist = psychologistsData.find(p => p.slug === slug);
  const [openSection, setOpenSection] = useState<number | null>(null);

  const businessAddressParts = businessData.address.split(',');
  const displayAddress = businessAddressParts.slice(0, 2).join(',');

  if (!psychologist) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif font-bold mb-4">Psychologist not found</h1>
          <Link to="/" className="text-sage-500 hover:underline">Return Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <div className="bg-[#fde2e4] h-56 md:h-72" />

      <main className="pb-20 px-6 -mt-20 lg:-mt-48 relative z-10 overflow-hidden lg:overflow-visible">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start overflow-hidden lg:overflow-visible">
          {/* Main Content: Bio and Accordions */}
          <div className="lg:col-span-8 order-2 lg:order-1 lg:pt-48 space-y-12">
            <div className="space-y-6 text-charcoal/80 leading-relaxed text-lg">
              {psychologist.bio.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Accordions */}
            <div className="border-t border-charcoal/10 pt-4">
              {psychologist.sections.map((section, index) => (
                <div key={index} className="border-b border-charcoal/10">
                  <button
                    onClick={() => setOpenSection(openSection === index ? null : index)}
                    className="w-full py-5 flex items-center justify-between text-left group"
                  >
                    <span className="text-xl font-serif font-medium text-charcoal group-hover:text-sage-500 transition-colors">
                      {section.title}
                    </span>
                    {openSection === index ? (
                      <ChevronUp className="w-5 h-5 text-charcoal/40" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-charcoal/40" />
                    )}
                  </button>
                    <AnimatePresence>
                      {openSection === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pb-8 text-charcoal/70 leading-relaxed text-lg">
                            {Array.isArray(section.content) ? (
                              <ul className="list-disc pl-5 space-y-2">
                                {section.content.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            ) : (
                              section.content
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar: Image and Details */}
          <div className="lg:col-span-4 order-1 lg:order-2 lg:sticky lg:top-44 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-3xl overflow-hidden shadow-xl max-w-sm mx-auto lg:max-w-none group relative"
            >
              <img
                src={psychologist.image}
                alt={psychologist.name}
                className="w-full aspect-square object-cover object-center transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                <div className="flex gap-4">
                  <a 
                    href={psychologist.socials.linkedin} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-charcoal transition-all"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a 
                    href={psychologist.socials.instagram} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-charcoal transition-all"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a 
                    href={psychologist.socials.email} 
                    className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-charcoal transition-all"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </motion.div>

            <div className="bg-white p-8 rounded-3xl shadow-lg border border-charcoal/5">
              <h1 className="text-2xl md:text-3xl font-serif font-bold text-charcoal mb-2 whitespace-nowrap overflow-hidden text-ellipsis">
                {psychologist.name}
              </h1>
              <p className="text-lg text-charcoal/60 mb-4">{psychologist.role}</p>
              
              <div className="flex items-baseline gap-2 mb-2 whitespace-nowrap overflow-hidden">
                <span className="text-charcoal/40 line-through text-sm md:text-lg">{psychologist.originalPrice}</span>
                <span className="text-xl md:text-2xl font-bold text-charcoal">{psychologist.price}</span>
                <span className="text-charcoal/60 text-sm md:text-base">| {psychologist.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-charcoal/60 mb-8">
                <MapPin className="w-4 h-4 text-sage-400" />
                <a 
                  href={businessData.googleMapsLink} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-sage-500 transition-colors underline underline-offset-4 decoration-sage-200"
                >
                  {psychologist.location}
                </a>
              </div>

              <button 
                onClick={() => {
                  const element = document.getElementById('booking');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full bg-[#f08080] hover:bg-[#e9967a] text-white py-4 rounded-xl font-bold transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
              >
                Request Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Booking Section */}
        <div id="booking" className="max-w-3xl mx-auto mt-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-4">Request Appointment with {psychologist.name}</h2>
            <p className="text-charcoal/60">Take the first step towards your emotional wellbeing today.</p>
          </div>
          <BookingForm defaultPsychologist={slug} />
        </div>
      </main>

      {/* WhatsApp Floating Button */}
      <a
        href={businessData.whatsapp.link}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform z-50"
      >
        <WhatsAppIcon className="w-8 h-8 fill-current" />
      </a>

      <Footer />
    </div>
  );
}
