import { motion } from "motion/react";
import { Quote, Star } from "lucide-react";
import { cn } from "../lib/utils";

const testimonials = [
  {
    text: "ClearMind Counseling stands out because of their personalized approach.",
    author: "Anonymous Client",
    role: "Verified User",
    rating: 5,
  },
  {
    text: "I was going through a very difficult phase with anxiety and overthinking. Janhavi created such a safe and non-judgmental space for me that I could finally open up. The techniques she suggested were practical and actually worked in my daily life. I genuinely feel more in control of my thoughts now. Highly recommend ClearMind Counseling.",
    author: "Anonymous Client",
    role: "Verified User",
    rating: 5,
  },
  {
    text: "Vikas sir helped me during one of the lowest points of my life. I was struggling with self-doubt and stress related to work. His calm approach and structured sessions made things feel manageable. I appreciated how he listened patiently without rushing to conclusions. ClearMind Counseling is doing meaningful work.",
    author: "Anonymous Client",
    role: "Verified User",
    rating: 4,
  },
  {
    text: "Great experience with ClearMind Counseling. Professional and empathetic team. I've seen real improvement in my emotional well-being.",
    author: "Anonymous Client",
    role: "Verified User",
    rating: 5,
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-sage-500 uppercase mb-4">Testimonials</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">Stories of Healing & Hope</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative bg-beige-50 p-10 rounded-[2.5rem] border border-beige-100 h-full flex flex-col justify-between"
            >
              <div>
                <Quote className="absolute top-8 right-8 w-12 h-12 text-sage-100" />
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={cn(
                        "w-4 h-4",
                        i < testimonial.rating ? "fill-beige-400 text-beige-400" : "text-beige-200"
                      )} 
                    />
                  ))}
                </div>
                <p className="text-lg text-charcoal/80 italic mb-8 leading-relaxed">
                  "{testimonial.text}"
                </p>
              </div>
              <div>
                <p className="font-bold text-charcoal">{testimonial.author}</p>
                <p className="text-sm text-charcoal/50">{testimonial.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
