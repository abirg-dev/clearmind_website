import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { servicesData } from "../data/servicesData";

export default function Services() {
  return (
    <section id="services" className="py-24 bg-beige-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-sm font-bold tracking-widest text-sage-500 uppercase mb-4">Our Services</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">Specialized Care for Your Needs</h3>
          <p className="text-lg text-charcoal/60 max-w-2xl mx-auto">
            We offer a wide range of therapeutic services tailored to help you overcome life's obstacles and achieve emotional wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => (
            <Link 
              to={`/service/${service.slug}`}
              key={service.slug}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-8 rounded-[2rem] border border-beige-100 hover:border-sage-200 hover:shadow-xl transition-all group soft-shadow h-full flex flex-col"
              >
                <div className="w-16 h-16 bg-sage-50 text-sage-500 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-sage-500 group-hover:text-white transition-colors">
                  {service.icon}
                </div>
                <h4 className="text-xl font-serif font-bold text-charcoal mb-3 group-hover:text-sage-600 transition-colors">{service.title}</h4>
                <p className="text-sm text-charcoal/60 mb-6 leading-relaxed flex-grow">
                  {service.description}
                </p>
                <div className="mt-auto">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sage-500 bg-sage-50 px-3 py-1 rounded-full group-hover:bg-sage-100 transition-colors">
                    For: {service.who}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
