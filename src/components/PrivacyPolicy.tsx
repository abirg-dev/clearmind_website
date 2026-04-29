import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion } from "motion/react";
import { businessData } from "../data/businessData";

export default function PrivacyPolicy() {
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
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal">Privacy Policy</h1>
            <p className="text-charcoal/60">Last Updated: April 29, 2026</p>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">1. Introduction</h2>
              <p className="text-charcoal/80 leading-relaxed">
                Welcome to {businessData.legalName}. We are committed to protecting your personal information and your right to privacy. If you have any questions or concerns about our policy, or our practices with regards to your personal information, please contact us at {businessData.email}.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">2. Information We Collect</h2>
              <p className="text-charcoal/80 leading-relaxed">
                We collect personal information that you voluntarily provide to us when expressing an interest in obtaining information about us or our services, when participating in activities on the website or otherwise contacting us.
              </p>
              <p className="text-charcoal/80 leading-relaxed">
                The personal information that we collect depends on the context of your interactions with us and the website, the choices you make and the products and features you use. The personal information we collect can include the following:
              </p>
              <ul className="list-disc pl-6 text-charcoal/80 space-y-2">
                <li>Name and Contact Data (such as name, email address, phone number).</li>
                <li>Therapy-related information provided during appointment requests.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">3. How We Use Your Information</h2>
              <p className="text-charcoal/80 leading-relaxed">
                We use personal information collected via our website for a variety of business purposes described below. We process your personal information for these purposes in reliance on our legitimate business interests, in order to enter into or perform a contract with you, with your consent, and/or for compliance with our legal obligations.
              </p>
              <ul className="list-disc pl-6 text-charcoal/80 space-y-2">
                <li>To facilitate account creation and logon process.</li>
                <li>To send administrative information to you.</li>
                <li>To fulfill and manage your appointments.</li>
                <li>To post testimonials with your consent.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">4. Will Your Information Be Shared With Anyone?</h2>
              <p className="text-charcoal/80 leading-relaxed">
                We only share information with your consent, to comply with laws, to provide you with services, to protect your rights, or to fulfill business obligations.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">5. How Long Do We Keep Your Information?</h2>
              <p className="text-charcoal/80 leading-relaxed">
                We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy policy, unless a longer retention period is required or permitted by law.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-serif font-semibold text-charcoal">6. Contact Us</h2>
              <p className="text-charcoal/80 leading-relaxed">
                If you have questions or comments about this policy, you may email us at {businessData.email} or by post to:
              </p>
              <p className="text-charcoal/80 leading-relaxed font-medium">
                {businessData.legalName}<br />
                {businessData.address}
              </p>
            </section>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
