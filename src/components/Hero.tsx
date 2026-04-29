import { motion } from "motion/react";
import BookingForm from "./BookingForm";
import { Send, Mail, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

import { businessData } from "../data/businessData";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-40 md:pt-48 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-sage-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-beige-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center z-10 pb-4 md:pb-6">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-100 text-sage-700 rounded-full text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sage-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sage-500"></span>
            </span>
            Accepting New Clients
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-7xl font-serif font-bold text-charcoal leading-[1.1] mb-6">
            Compassionate Therapy for <span className="text-sage-500 italic">Healing</span> & Growth.
          </h1>
          <p className="text-lg md:text-xl text-charcoal/70 mb-8 max-w-lg leading-relaxed">
            A safe, professional space dedicated to your emotional wellbeing. Our expert psychologists help you navigate life's challenges with evidence-based care.
          </p>
 
          <div className="flex flex-nowrap md:flex-wrap gap-1.5 md:gap-4 mb-6 py-1 px-0.5 -mx-0.5 overflow-x-auto scrollbar-hide">
            <a
              href={businessData.whatsapp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-2 px-2 md:px-6 py-2.5 md:py-3 bg-white border border-beige-200 rounded-full text-charcoal text-[10px] sm:text-xs md:text-base font-medium hover:bg-beige-50 transition-all shadow-sm flex-1 md:flex-none justify-center whitespace-nowrap min-w-0"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 md:w-5 md:h-5 text-green-500 shrink-0" />
              <span className="truncate">WhatsApp</span>
            </a>
            <a
              href={businessData.googleMapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 md:gap-2 px-2 md:px-6 py-2.5 md:py-3 bg-white border border-beige-200 rounded-full text-charcoal text-[10px] sm:text-xs md:text-base font-medium hover:bg-beige-50 transition-all shadow-sm flex-1 md:flex-none justify-center whitespace-nowrap min-w-0"
            >
              <MapPin className="w-3.5 h-3.5 md:w-5 md:h-5 text-red-400 shrink-0" />
              <span className="truncate">Locate Us</span>
            </a>
            <a
              href={`mailto:${businessData.email}`}
              className="flex items-center gap-1 md:gap-2 px-2 md:px-6 py-2.5 md:py-3 bg-white border border-beige-200 rounded-full text-charcoal text-[10px] sm:text-xs md:text-base font-medium hover:bg-beige-50 transition-all shadow-sm flex-1 md:flex-none justify-center whitespace-nowrap min-w-0"
            >
              <Mail className="w-3.5 h-3.5 md:w-5 md:h-5 text-beige-400 shrink-0" />
              <span className="truncate">Email Us</span>
            </a>
          </div>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          id="booking"
        >
          <BookingForm />
        </motion.div>
      </div>
    </section>
  );
}
