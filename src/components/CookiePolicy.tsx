import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "motion/react";
import { businessData } from "../data/businessData";

export default function CookiePolicy() {
  return (
    <>
      <Navbar />
      <main className="pt-44 md:pt-52 pb-20 px-6 min-h-screen">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal">Cookie Policy</h1>
            <p className="text-charcoal/60">Last Updated: April 29, 2026</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">1. What are Cookies?</h2>
              <p className="text-charcoal/80 leading-relaxed">
                Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">2. Why do we use Cookies?</h2>
              <p className="text-charcoal/80 leading-relaxed">
                We use first party and third party cookies for several reasons. Some cookies are required for technical reasons in order for our website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">3. Types of Cookies we use</h2>
              <ul className="list-disc pl-6 text-charcoal/80 space-y-2">
                <li><strong>Strictly Necessary Cookies:</strong> These cookies are essential for the website to function and cannot be switched off in our systems.</li>
                <li><strong>Performance Cookies:</strong> These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</li>
                <li><strong>Functionality Cookies:</strong> These cookies enable the website to provide enhanced functionality and personalization.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">4. How can I control Cookies?</h2>
              <p className="text-charcoal/80 leading-relaxed">
                You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website though your access to some functionality and areas of our website may be restricted.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">5. Contact Us</h2>
              <p className="text-charcoal/80 leading-relaxed">
                If you have any questions about our use of cookies or other technologies, please email us at {businessData.email}.
              </p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
