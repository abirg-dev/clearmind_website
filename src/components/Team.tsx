import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Instagram, Linkedin, Mail } from "lucide-react";
import { psychologistsData } from "../data/psychologistsData";

export default function Team() {
  const navigate = useNavigate();

  return (
    <section id="team" className="py-24 bg-beige-100">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-sage-500 uppercase mb-4">Meet the Team</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">Our Expert Psychologists</h3>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
            A diverse group of compassionate professionals dedicated to providing the highest standard of evidence-based care.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          {psychologistsData.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => navigate(`/psychologist/${member.slug}`)}
            >
              <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-6 soft-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-8">
                  <div className="flex gap-4" onClick={(e) => e.stopPropagation()}>
                    <a 
                      href={member.socials.linkedin} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-charcoal transition-all"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                    <a 
                      href={member.socials.instagram} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-charcoal transition-all"
                    >
                      <Instagram className="w-5 h-5" />
                    </a>
                    <a 
                      href={member.socials.email} 
                      className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-charcoal transition-all"
                    >
                      <Mail className="w-5 h-5" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <h4 className="text-2xl font-serif font-bold text-charcoal mb-1">{member.name}</h4>
                <p className="text-sm font-medium text-sage-500 mb-2">{member.credentials}</p>
                <p className="text-sm text-charcoal/60">{member.specialty}</p>
                <p className="text-xs text-charcoal/40 mt-1">{member.experience} Experience</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
