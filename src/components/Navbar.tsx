import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, Calendar, Send, Mail, ChevronDown, Facebook, Instagram, Linkedin, Twitter, MapPin, Youtube } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { cn } from "@/src/lib/utils";
import { servicesData } from "../data/servicesData";
import { psychologistsData } from "../data/psychologistsData";
import { businessData } from "../data/businessData";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTeamOpen, setIsTeamOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isMobileTeamOpen, setIsMobileTeamOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
  const [isMobileContactOpen, setIsMobileContactOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setHasMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/#about" },
    { name: "Services", href: "/#services" },
    { name: "Our Team", href: "/#team" },
    { name: "Events", href: "/events" },
    { name: "Contact", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    if (href === "/") {
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        navigate("/");
      }
    } else if (href.startsWith("/#")) {
      const id = href.substring(2);
      if (location.pathname === "/") {
        const element = document.getElementById(id);
        if (element) {
          const offset = 172; // Offset for the large logo navbar + top banner
          const bodyRect = document.body.getBoundingClientRect().top;
          const elementRect = element.getBoundingClientRect().top;
          const elementPosition = elementRect - bodyRect;
          const offsetPosition = elementPosition - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth"
          });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            const offset = 172;
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
    }
    setIsMobileMenuOpen(false);
  };

  const isPortfolioPage = hasMounted && location.pathname.startsWith("/psychologist/");

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        (isScrolled || isMobileMenuOpen) ? "bg-white shadow-md" : "bg-transparent"
      )}
    >
      <div className="bg-sage-500 text-white text-center py-2 px-4 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] relative z-[61]">
        50% off on your first session
      </div>
      <div className={cn(
        "max-w-7xl mx-auto flex items-center justify-between px-6 py-1 transition-all duration-300",
        (isScrolled || isMobileMenuOpen) ? "py-1" : "py-2"
      )}>
        <button onClick={() => handleNavClick("/")} className="flex items-center">
          <img 
            src="/logo.png" 
            alt="Clearmind Counselling Logo" 
            className="h-28 md:h-36 w-auto object-contain"
            referrerPolicy="no-referrer"
          />
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            if (link.name === "Services") {
              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setIsServicesOpen(true)}
                  onMouseLeave={() => setIsServicesOpen(false)}
                >
                  <button
                    onClick={() => setIsServicesOpen(!isServicesOpen)}
                    className="flex items-center gap-1 text-sm font-medium text-charcoal/70 hover:text-sage-500 transition-colors py-2"
                  >
                    {link.name}
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isServicesOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-white rounded-2xl shadow-xl border border-beige-100 overflow-hidden py-2"
                      >
                        {servicesData.map((service) => (
                          <Link
                            key={service.slug}
                            to={`/service/${service.slug}`}
                            className="flex flex-col px-4 py-2.5 hover:bg-sage-50 transition-colors"
                            onClick={() => setIsServicesOpen(false)}
                          >
                            <span className="text-sm font-medium text-charcoal">{service.title}</span>
                            <span className="text-[10px] text-charcoal/50 uppercase tracking-tight">{service.who}</span>
                          </Link>
                        ))}
                        <div className="border-t border-beige-100 my-1" />
                        <button
                          onClick={() => handleNavClick("/#services")}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-sage-500 hover:bg-sage-50 transition-colors uppercase tracking-wider"
                        >
                          Overview
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            if (link.name === "Our Team") {
              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setIsTeamOpen(true)}
                  onMouseLeave={() => setIsTeamOpen(false)}
                >
                  <button
                    onClick={() => setIsTeamOpen(!isTeamOpen)}
                    className="flex items-center gap-1 text-sm font-medium text-charcoal/70 hover:text-sage-500 transition-colors py-2"
                  >
                    {link.name}
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isTeamOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isTeamOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-56 bg-white rounded-2xl shadow-xl border border-beige-100 overflow-hidden py-2"
                      >
                        {psychologistsData.map((psychologist) => (
                          <Link
                            key={psychologist.slug}
                            to={`/psychologist/${psychologist.slug}`}
                            className="flex flex-col px-4 py-2.5 hover:bg-sage-50 transition-colors"
                            onClick={() => setIsTeamOpen(false)}
                          >
                            <span className="text-sm font-medium text-charcoal">{psychologist.name}</span>
                            <span className="text-xs text-charcoal/50">{psychologist.specialty}</span>
                          </Link>
                        ))}
                        <div className="border-t border-beige-100 my-1" />
                        <button
                          onClick={() => handleNavClick("/#team")}
                          className="w-full text-left px-4 py-2 text-xs font-bold text-sage-500 hover:bg-sage-50 transition-colors uppercase tracking-wider"
                        >
                          View All Team
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            if (link.name === "Contact") {
              return (
                <div
                  key={link.name}
                  className="relative group"
                  onMouseEnter={() => setIsContactOpen(true)}
                  onMouseLeave={() => setIsContactOpen(false)}
                >
                  <button
                    onClick={() => setIsContactOpen(!isContactOpen)}
                    className="flex items-center gap-1 text-sm font-medium text-charcoal/70 hover:text-sage-500 transition-colors py-2"
                  >
                    {link.name}
                    <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", isContactOpen && "rotate-180")} />
                  </button>

                  <AnimatePresence>
                    {isContactOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-48 bg-white rounded-2xl shadow-xl border border-beige-100 overflow-hidden py-2"
                      >
                        <a
                          href={businessData.whatsapp.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal hover:bg-sage-50 transition-colors"
                        >
                          <WhatsAppIcon className="w-4 h-4 text-green-500" />
                          WhatsApp
                        </a>
                        <a
                          href={businessData.googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal hover:bg-sage-50 transition-colors"
                        >
                          <MapPin className="w-4 h-4 text-red-400" />
                          Locate Us
                        </a>
                        <a
                          href={`mailto:${businessData.email}`}
                          className="flex items-center gap-3 px-4 py-2.5 text-sm text-charcoal hover:bg-sage-50 transition-colors"
                        >
                          <Mail className="w-4 h-4 text-sage-400" />
                          Email Us
                        </a>
                        <div className="border-t border-beige-100 my-1 pt-1 px-4 flex justify-between">
                          <a href={businessData.socials.facebook} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-sage-50 text-charcoal/60 hover:text-sage-500 transition-colors">
                            <Facebook className="w-4 h-4" />
                          </a>
                          <a href={businessData.socials.instagram} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-sage-50 text-charcoal/60 hover:text-sage-500 transition-colors">
                            <Instagram className="w-4 h-4" />
                          </a>
                          <a href={businessData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-sage-50 text-charcoal/60 hover:text-sage-500 transition-colors">
                            <Linkedin className="w-4 h-4" />
                          </a>
                          <a href={businessData.socials.twitter} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-sage-50 text-charcoal/60 hover:text-sage-500 transition-colors">
                            <Twitter className="w-4 h-4" />
                          </a>
                          <a href={businessData.socials.youtube} target="_blank" rel="noopener noreferrer" className="p-1.5 rounded-lg hover:bg-sage-50 text-charcoal/60 hover:text-sage-500 transition-colors">
                            <Youtube className="w-4 h-4" />
                          </a>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }
            if (link.href.startsWith("/#") || link.href === "/") {
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-charcoal/70 hover:text-sage-500 transition-colors"
                >
                  {link.name}
                </button>
              );
            }
            return (
              <Link
                key={link.name}
                to={link.href}
                className="text-sm font-medium text-charcoal/70 hover:text-sage-500 transition-colors"
              >
                {link.name}
              </Link>
            );
          })}
          
          <button
            onClick={() => handleNavClick("/#booking")}
            className="bg-sage-500 text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-sage-600 transition-all shadow-sm hover:shadow-md flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Request Appointment
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-charcoal relative z-[60]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-white z-[100] md:hidden flex flex-col overflow-hidden"
          >
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-beige-100">
              <button onClick={() => handleNavClick("/")} className="flex items-center">
                <img 
                  src="/logo.png" 
                  alt="Clearmind Counselling Logo" 
                  className="h-20 w-auto object-contain"
                  referrerPolicy="no-referrer"
                />
              </button>
              <button
                className="p-2 text-charcoal"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-8 h-8" />
              </button>
            </div>

            {/* Mobile Menu Content */}
            <div className="flex-1 overflow-y-auto p-8 flex flex-col gap-8">
              {navLinks.map((link) => {
                if (link.name === "Services") {
                  return (
                    <div key={link.name} className="flex flex-col gap-4">
                      <button
                        onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                        className="flex items-center justify-between text-2xl font-serif font-bold text-charcoal"
                      >
                        {link.name}
                        <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", isMobileServicesOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {isMobileServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-6 pl-4 overflow-hidden"
                          >
                            {servicesData.map((service) => (
                              <Link
                                key={service.slug}
                                to={`/service/${service.slug}`}
                                className="flex flex-col group"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span className="text-lg font-medium text-charcoal group-hover:text-sage-500 transition-colors">{service.title}</span>
                                <span className="text-sm text-charcoal/50">{service.who}</span>
                              </Link>
                            ))}
                            <button
                              onClick={() => handleNavClick("/#services")}
                              className="text-sm font-bold text-sage-500 text-left uppercase tracking-widest"
                            >
                              View All Services
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                if (link.name === "Our Team") {
                  return (
                    <div key={link.name} className="flex flex-col gap-4">
                      <button
                        onClick={() => setIsMobileTeamOpen(!isMobileTeamOpen)}
                        className="flex items-center justify-between text-2xl font-serif font-bold text-charcoal"
                      >
                        {link.name}
                        <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", isMobileTeamOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {isMobileTeamOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-6 pl-4 overflow-hidden"
                          >
                            {psychologistsData.map((psychologist) => (
                              <Link
                                key={psychologist.slug}
                                to={`/psychologist/${psychologist.slug}`}
                                className="flex flex-col group"
                                onClick={() => setIsMobileMenuOpen(false)}
                              >
                                <span className="text-lg font-medium text-charcoal group-hover:text-sage-500 transition-colors">{psychologist.name}</span>
                                <span className="text-sm text-charcoal/50">{psychologist.specialty}</span>
                              </Link>
                            ))}
                            <button
                              onClick={() => handleNavClick("/#team")}
                              className="text-sm font-bold text-sage-500 text-left uppercase tracking-widest"
                            >
                              View All Team
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                if (link.name === "Contact") {
                  return (
                    <div key={link.name} className="flex flex-col gap-4">
                      <button
                        onClick={() => setIsMobileContactOpen(!isMobileContactOpen)}
                        className="flex items-center justify-between text-2xl font-serif font-bold text-charcoal"
                      >
                        {link.name}
                        <ChevronDown className={cn("w-6 h-6 transition-transform duration-300", isMobileContactOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence>
                        {isMobileContactOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="flex flex-col gap-6 pl-4 overflow-hidden"
                          >
                            <a
                              href={businessData.whatsapp.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-4 text-charcoal/80 text-lg"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center">
                                <WhatsAppIcon className="w-5 h-5 text-green-500" />
                              </div>
                              WhatsApp
                            </a>
                            <a
                              href={businessData.googleMapsLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-4 text-charcoal/80 text-lg"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center">
                                <MapPin className="w-5 h-5 text-red-400" />
                              </div>
                              Locate Us
                            </a>
                            <a
                              href={`mailto:${businessData.email}`}
                              className="flex items-center gap-4 text-charcoal/80 text-lg"
                              onClick={() => setIsMobileMenuOpen(false)}
                            >
                              <div className="w-10 h-10 rounded-full bg-sage-50 flex items-center justify-center">
                                <Mail className="w-5 h-5 text-sage-400" />
                              </div>
                              Email Us
                            </a>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                if (link.href.startsWith("/#") || link.href === "/") {
                  return (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link.href)}
                      className="text-2xl font-serif font-bold text-charcoal text-left hover:text-sage-500 transition-colors"
                    >
                      {link.name}
                    </button>
                  );
                }
                return (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-2xl font-serif font-bold text-charcoal hover:text-sage-500 transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                );
              })}
              
              <div className="mt-auto pt-8 border-t border-beige-100 flex flex-col gap-4">
                <button
                  onClick={() => handleNavClick("/#booking")}
                  className="bg-sage-500 text-white px-6 py-4 rounded-2xl text-center font-bold text-lg shadow-lg shadow-sage-200"
                >
                  Request Appointment
                </button>
                <div className="flex justify-center gap-6 py-4">
                  <a href={businessData.socials.facebook} target="_blank" rel="noopener noreferrer"><Facebook className="w-6 h-6 text-charcoal/40 hover:text-sage-500 transition-colors" /></a>
                  <a href={businessData.socials.instagram} target="_blank" rel="noopener noreferrer"><Instagram className="w-6 h-6 text-charcoal/40 hover:text-sage-500 transition-colors" /></a>
                  <a href={businessData.socials.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin className="w-6 h-6 text-charcoal/40 hover:text-sage-500 transition-colors" /></a>
                  <a href={businessData.socials.twitter} target="_blank" rel="noopener noreferrer"><Twitter className="w-6 h-6 text-charcoal/40 hover:text-sage-500 transition-colors" /></a>
                  <a href={businessData.socials.youtube} target="_blank" rel="noopener noreferrer"><Youtube className="w-6 h-6 text-charcoal/40 hover:text-sage-500 transition-colors" /></a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
