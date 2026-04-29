import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Send, Loader2, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        setIsSuccess(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-sage-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-white/10 backdrop-blur-md rounded-[3rem] p-12 md:p-20 border border-white/20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
              Insights for a Healthier Mind.
            </h3>
            <p className="text-white/80 text-lg max-w-md">
              Subscribe to our newsletter for mental wellness tips, psychologist updates, and exclusive resources.
            </p>
          </div>

          <div className="flex-1 w-full max-w-md">
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-3xl text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-sage-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-charcoal mb-2">You're Subscribed!</h4>
                <p className="text-charcoal/60">Thank you for joining our community.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/30 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-sage-500 py-4 rounded-2xl font-bold hover:bg-beige-50 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      Subscribe Now
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
                <p className="text-white/50 text-xs text-center">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
