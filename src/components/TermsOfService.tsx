import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "motion/react";
import { businessData } from "../data/businessData";

export default function TermsOfService() {
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal">Terms of Service</h1>
            <p className="text-charcoal/60">Last Updated: April 29, 2026</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">1. Agreement to Terms</h2>
              <p className="text-charcoal/80 leading-relaxed">
                These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity ("you") and {businessData.legalName} ("we," "us" or "our"), concerning your access to and use of our website as well as any other media form, media channel, mobile website or mobile application related, linked, or otherwise connected thereto.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">2. Intellectual Property Rights</h2>
              <p className="text-charcoal/80 leading-relaxed">
                Unless otherwise indicated, the Site is our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site and the trademarks, service marks, and logos contained therein are owned or controlled by us or licensed to us.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">3. User Representations</h2>
              <p className="text-charcoal/80 leading-relaxed">
                By using the Site, you represent and warrant that: (1) you have the legal capacity and you agree to comply with these Terms of Service; (2) you are not a minor in the jurisdiction in which you reside; (3) you will not access the Site through automated or non-human means, whether through a bot, script or otherwise; (4) you will not use the Site for any illegal or unauthorized purpose.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">4. Professional Ethics and Therapy</h2>
              <p className="text-charcoal/80 leading-relaxed">
                While this website provides information about mental health and therapy, the content provided is for informational purposes only. Booking an appointment through this site does not constitute a therapist-client relationship until formal intake procedures are completed.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">5. Limitation of Liability</h2>
              <p className="text-charcoal/80 leading-relaxed">
                In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">6. Contact Us</h2>
              <p className="text-charcoal/80 leading-relaxed">
                In order to resolve a complaint regarding the Site or to receive further information regarding use of the Site, please contact us at:
              </p>
              <p className="text-charcoal/80 leading-relaxed font-medium">
                {businessData.legalName}<br />
                {businessData.address}<br />
                {businessData.email}
              </p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
