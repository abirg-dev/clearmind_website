import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "motion/react";
import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { psychologistsData } from "../data/psychologistsData";

const countryCodes = [
  { code: "+91", country: "IN" },
  { code: "+1", country: "US" },
  { code: "+44", country: "GB" },
  { code: "+971", country: "AE" },
  { code: "+65", country: "SG" },
  { code: "+61", country: "AU" },
  { code: "+1", country: "CA" },
  { code: "+49", country: "DE" },
  { code: "+33", country: "FR" },
  { code: "+81", country: "JP" },
];

const formSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  countryCode: z.string().min(1, "Country code is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  psychologist: z.string().optional(),
  message: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

interface BookingFormProps {
  defaultPsychologist?: string;
}

export default function BookingForm({ defaultPsychologist }: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      psychologist: defaultPsychologist || "auto",
      countryCode: "+91",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      const result = await response.json();
      
      if (response.ok && result.success) {
        setIsSuccess(true);
        reset();
      } else {
        setErrorMessage(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      setErrorMessage("Failed to connect to the server. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-sage-100 flex flex-col items-center text-center gap-4"
      >
        <div className="w-16 h-16 bg-sage-100 rounded-full flex items-center justify-center text-sage-500">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <h3 className="text-2xl font-serif font-semibold text-charcoal">Request Received</h3>
        <p className="text-charcoal/70">
          Thank you for reaching out. A member of our team will contact you within 24 hours to confirm your appointment.
        </p>
        <button
          onClick={() => setIsSuccess(false)}
          className="mt-4 text-sage-500 font-medium hover:underline"
        >
          Request another appointment
        </button>
      </motion.div>
    );
  }

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl shadow-xl border border-sage-100">
      <h3 className="text-2xl font-serif font-semibold text-charcoal mb-4">Request Appointment</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-1">Full Name *</label>
          <input
            {...register("name")}
            className="w-full px-4 py-3 rounded-xl border border-beige-200 focus:outline-none focus:ring-2 focus:ring-sage-300 transition-all"
            placeholder="Jane Doe"
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">Email Address *</label>
            <input
              {...register("email")}
              className="w-full px-4 py-3 rounded-xl border border-beige-200 focus:outline-none focus:ring-2 focus:ring-sage-300 transition-all"
              placeholder="jane@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-charcoal/70 mb-1">Phone Number *</label>
            <div className="flex gap-2 min-w-0">
              <select
                {...register("countryCode")}
                className="w-20 md:w-24 flex-shrink-0 px-2 py-3 rounded-xl border border-beige-200 focus:outline-none focus:ring-2 focus:ring-sage-300 transition-all bg-white text-xs md:text-sm"
              >
                {countryCodes.map((c, index) => (
                  <option key={`${c.country}-${c.code}-${index}`} value={c.code}>
                    {c.country} ({c.code})
                  </option>
                ))}
              </select>
              <input
                {...register("phone")}
                className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-beige-200 focus:outline-none focus:ring-2 focus:ring-sage-300 transition-all"
                placeholder="12345 67890"
              />
            </div>
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-1">Preferred Psychologist</label>
          <select
            {...register("psychologist")}
            className="w-full px-4 py-3 rounded-xl border border-beige-200 focus:outline-none focus:ring-2 focus:ring-sage-300 transition-all bg-white"
          >
            <option value="auto">Assign best available</option>
            {psychologistsData.map((psychologist) => (
              <option key={psychologist.slug} value={psychologist.slug}>
                {psychologist.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-charcoal/70 mb-1">Concerns (Optional)</label>
          <textarea
            {...register("message")}
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-beige-200 focus:outline-none focus:ring-2 focus:ring-sage-300 transition-all"
            placeholder="Briefly describe what you'd like to discuss..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-beige-400 text-white py-4 rounded-xl font-semibold hover:bg-beige-500 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-70"
        >
          {isSubmitting ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            "Request Appointment"
          )}
        </button>
        {errorMessage && (
          <p className="text-red-500 text-sm text-center mt-2 bg-red-50 p-2 rounded-lg border border-red-100">
            {errorMessage}
          </p>
        )}
        <p className="text-[10px] text-center text-charcoal/50 mt-2">
          By submitting, you agree to our privacy policy and terms of service.
        </p>
      </form>
    </div>
  );
}
