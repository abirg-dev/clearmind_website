import { motion } from "motion/react";
import { Shield, Heart, Users, Sparkles } from "lucide-react";

const values = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "Compassionate Care",
    description: "We lead with empathy, ensuring you feel heard and understood in every session.",
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: "Confidentiality",
    description: "Your privacy is our priority. We provide a secure space for your healing journey.",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "Evidence-Based",
    description: "Our treatments are grounded in the latest psychological research and proven methods.",
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Inclusive Space",
    description: "We welcome individuals from all backgrounds, cultures, and identities.",
  },
];

export default function About() {
  return (
    <section id="about" className="pt-12 md:pt-16 pb-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-[2rem] overflow-hidden soft-shadow">
              <img
                src="https://images.unsplash.com/photo-1536060316316-2466bda904f1?auto=format&fit=crop&w=800&q=80"
                alt="Supportive Hands"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-sm font-bold tracking-widest text-sage-500 uppercase mb-4">Our Philosophy</h2>
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6 leading-tight">
              A Safe Space for Healing, Growth, and Emotional Wellbeing.
            </h3>
            <p className="text-lg text-charcoal/70 mb-8 leading-relaxed">
              At Clearmind Counselling, we believe that everyone deserves a life of balance and fulfillment. Our practice was founded on the principle that therapy should be accessible, compassionate, and deeply personalized. 
            </p>
            <p className="text-lg text-charcoal/70 mb-10 leading-relaxed">
              We combine traditional therapeutic techniques with modern, evidence-based practices to help you navigate anxiety, depression, trauma, and relationship challenges.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-sage-50 text-sage-500 rounded-2xl flex items-center justify-center">
                    {value.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-charcoal mb-1">{value.title}</h4>
                    <p className="text-sm text-charcoal/60 leading-snug">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
