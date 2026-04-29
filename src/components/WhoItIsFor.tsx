import { motion } from "motion/react";
import { User, Users, Baby, GraduationCap, Briefcase, Heart } from "lucide-react";

const segments = [
  {
    icon: <User className="w-10 h-10" />,
    title: "Adults",
    description: "Individual therapy for navigating life's complexities, transitions, and personal growth.",
  },
  {
    icon: <Heart className="w-10 h-10" />,
    title: "Couples",
    description: "Strengthening bonds, improving communication, and resolving conflict in partnerships.",
  },
  {
    icon: <Baby className="w-10 h-10" />,
    title: "Children",
    description: "Specialized support for emotional regulation and behavioral challenges in young children.",
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: "Families",
    description: "Healing family dynamics and building stronger connections between all members.",
  },
  {
    icon: <Briefcase className="w-10 h-10" />,
    title: "Professionals",
    description: "Managing workplace stress, burnout, and executive performance challenges.",
  },
  {
    icon: <GraduationCap className="w-10 h-10" />,
    title: "Students",
    description: "Support for academic pressure, social anxiety, and the transition to adulthood.",
  },
];

export default function WhoItIsFor() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-sage-500 uppercase mb-4">Who This Is For</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">Support for Every Stage of Life</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {segments.map((segment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col items-center text-center p-10 rounded-[2.5rem] bg-beige-50 border border-beige-100 hover:bg-beige-100 transition-all"
            >
              <div className="text-sage-500 mb-6">
                {segment.icon}
              </div>
              <h4 className="text-2xl font-serif font-bold text-charcoal mb-4">{segment.title}</h4>
              <p className="text-charcoal/60 leading-relaxed">
                {segment.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
