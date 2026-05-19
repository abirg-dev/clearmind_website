import { Link, useLocation, useNavigate } from "react-router-dom";
import { Instagram, Linkedin, Twitter, Mail, Phone, MapPin, Youtube, Facebook } from "lucide-react";
import { businessData } from "../data/businessData";

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (href: string) => {
    if (href.startsWith("#")) {
      const id = href.substring(1);
      if (location.pathname === "/") {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      }
    }
  };

  return (
    <footer className="bg-charcoal text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div className="col-span-1 lg:col-span-1">
          <Link to="/" className="flex items-center mb-2">
            <img 
              src={businessData.logo} 
              alt="Clearmind Counselling Logo" 
              className="h-40 md:h-56 w-auto object-contain"
              referrerPolicy="no-referrer"
            />
          </Link>
          <p className="text-white/60 mb-8 leading-relaxed">
            {businessData.tagline}
          </p>
          <div className="flex gap-4">
            <a href={businessData.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sage-500 transition-all">
              <Instagram className="w-5 h-5" />
            </a>
            <a href={businessData.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sage-500 transition-all">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href={businessData.socials.twitter} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sage-500 transition-all">
              <Twitter className="w-5 h-5" />
            </a>
            <a href={businessData.socials.youtube} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sage-500 transition-all">
              <Youtube className="w-5 h-5" />
            </a>
            <a href={businessData.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-sage-500 transition-all">
              <Facebook className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-serif text-xl font-bold mb-6">Quick Links</h4>
          <ul className="space-y-4 text-white/60">
            <li><button onClick={() => handleNavClick("#about")} className="hover:text-sage-300 transition-colors">About Us</button></li>
            <li><button onClick={() => handleNavClick("#services")} className="hover:text-sage-300 transition-colors">Our Services</button></li>
            <li><button onClick={() => handleNavClick("#team")} className="hover:text-sage-300 transition-colors">Meet the Team</button></li>
            <li><Link to="/resources" className="hover:text-sage-300 transition-colors">Resources & Blogs</Link></li>
            <li><button onClick={() => handleNavClick("#booking")} className="hover:text-sage-300 transition-colors">Request Appointment</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl font-bold mb-6">Services</h4>
          <ul className="space-y-4 text-white/60">
            <li><Link to="/service/anxiety-therapy" className="hover:text-sage-300 transition-colors">Anxiety Therapy</Link></li>
            <li><Link to="/service/depression-counseling" className="hover:text-sage-300 transition-colors">Depression Counseling</Link></li>
            <li><Link to="/service/trauma-recovery" className="hover:text-sage-300 transition-colors">Trauma Recovery</Link></li>
            <li><Link to="/service/couples-therapy" className="hover:text-sage-300 transition-colors">Couples Therapy</Link></li>
            <li><Link to="/service/child-psychology" className="hover:text-sage-300 transition-colors">Child Psychology</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-xl font-bold mb-6">Contact Us</h4>
          <ul className="space-y-6 text-white/60">
            <li className="flex gap-4">
              <MapPin className="w-6 h-6 text-sage-300 shrink-0" />
              <a 
                href={businessData.googleMapsLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-sage-300 transition-colors"
              >
                {businessData.address}
              </a>
            </li>
            <li className="flex gap-4">
              <Phone className="w-6 h-6 text-sage-300 shrink-0" />
              <a href={`tel:${businessData.phone}`} className="hover:text-sage-300 transition-colors">{businessData.phone}</a>
            </li>
            <li className="flex gap-4">
              <Mail className="w-6 h-6 text-sage-300 shrink-0" />
              <a href={`mailto:${businessData.email}`} className="hover:text-sage-300 transition-colors">{businessData.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-white/40">
        <p>© 2026 {businessData.legalName}. All rights reserved.</p>
        <div className="flex gap-8">
          <Link to="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          <Link to="/cookie-policy" className="hover:text-white transition-colors">Cookie Policy</Link>
          <Link to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}
