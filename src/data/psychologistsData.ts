import { businessData } from "./businessData";

export interface Socials {
  linkedin: string;
  instagram: string;
  email: string;
}

export interface Section {
  title: string;
  content: string | string[];
}

export interface Psychologist {
  name: string;
  slug: string;
  role: string;
  credentials: string;
  specialty: string;
  experience: string;
  price: string;
  originalPrice: string;
  duration: string;
  location: string;
  image: string;
  socials: Socials;
  bio: string[];
  sections: Section[];
}

export const psychologistsData: Psychologist[] = [
  {
    name: "Janhavi More",
    slug: "janhavi-more",
    role: "Psychologist",
    credentials: "Masters, Clinical Psychology",
    specialty: "Anxiety & Trauma",
    experience: "3+ Years",
    price: "₹1200.00",
    originalPrice: "₹2000.00",
    duration: "50 min",
    location: businessData.address,
    image: "/janhavi_dp.jpeg",
    socials: { 
      linkedin: "https://www.linkedin.com/in/janhavi-more-3070471b7/", 
      instagram: "https://www.instagram.com/janhavimore_psy/", 
      email: `mailto:${businessData.email}` 
    },
    bio: [
      "Hi! I'm Janhavi More, a passionate and experienced psychologist with a Master's degree in Clinical Psychology and over 3 years of experience. I believe that seeking help is a courageous step, and I'm here to support you on your journey toward better mental health.",
      "Life can be overwhelming at times, and it's perfectly okay to not have it all figured out. My approach is focused on understanding your concerns, helping you gain clarity, and working together to find practical solutions.",
      "Whether you're facing stress, anxiety, or other challenges, I provide a safe, non-judgmental space where you can explore your thoughts and feelings freely. Let's focus on progress, not perfection, and build a path toward a more balanced and fulfilling life.",
      "Book a session with me today, and let's take that first step together!",
      "If you are booking a session with me I would appreciate it if you book a slot at least 2 hours prior to your appointment. Thankyou:)"
    ],
    sections: [
      {
        title: "Concerns I help with",
        content: [
          "I feel lost",
          "I feel misunderstood ",
          "I struggle with loving myself",
          "I feel anxious/depressed",
          "I feel low"
        ]
      },
      {
        title: "Approaches I follow",
        content: [
          "Cognitive Behavioural Therapy", 
          "Dialectical Behavioural Therapy", 
          "Rational-Emotive and Behavioural Therapy",
          "Narrative Therapy",
          "Client-centred and Solution Focused",
          "Eclectic Approach" 
        ]
      },
      {
        title: "Terms and Conditions",
        content: [
          "Please arrive 10 minutes before the session.",
          "Ensure you are seated in a quiet space with a reliable internet connection.",
          "Once booked, sessions cannot be cancelled or refunded. In the event of an emergency, sessions may be rescheduled with prior notice",
          "Cancelletions from expert's end may be fully refunded within 3-4 working days"
        ]
      },
      {
        title: "Qualifications & Certifications",
        content: [
          "M.A Clinical Psychology, Mumbai University",
          "B.A Psychology HONS, Mumbai University",
          "Certified CBT Practitioner", 
        ]
      },
      {
        title: "Languages Known",
        content: ["English", "Hindi", "Marathi", "Gujrati"]
      }
    ]
  },
  {
    name: "Vikas Kamble",
    slug: "vikas-kamble",
    role: "Psychologist",
    credentials: "Masters, Clinical Psychology",
    specialty: "Personal Growth and Emotional Regulation",
    experience: "3+ Years",
    price: "₹1200.00",
    originalPrice: "₹2000.00",
    duration: "50 min",
    location: businessData.address,
    image: "/vikas_dp.jpeg",
    socials: { 
      linkedin: "https://www.linkedin.com/in/vk-psychologist/", 
      instagram: "https://www.instagram.com/vikas.listens/", 
      email: `mailto:${businessData.email}` 
    },
    bio: [
      "Hello! I'm Vikas Kamble, a Counseling Psychologist and Co-Founder of ClearMind Counseling. My journey into psychology began not just in textbooks, but from a deeply personal place. Growing up, I experienced the challenges of low self-esteem and witnessed the struggles of Mental Health closely. These experiences ignited a passion in me to understand the human mind and dedicate my life to helping others find their path to well-being. With a Master's in Clinical Psychology and over three years of diverse experience, I've had the privilege of supporting individuals through various life stages, from tele-counseling at Veda Rehab and Wellness (LetsGetHappi) to guiding students, parents, and teachers as a school psychologist. Now, at ClearMind Counseling, I'm committed to creating a space where healing and growth flourish."
    ],
    sections: [
      {
        title: "What I Do: Guiding You Towards Inner Clarity and Strength",
        content: "I believe that everyone deserves to live a life free from the weight of being \"stuck.\" My approach to counseling is integrative and compassionate, drawing from evidence-based techniques like Cognitive Behavioral Therapy (CBT), Rational Emotive Behavior Therapy (REBT), and hypnotherapy, alongside expressive techniques. I don't just offer strategies; I offer a partnership in your journey. Whether you're grappling with overwhelming thoughts, navigating difficult emotions, or seeking to build healthier relationships, I'm here to equip you with the tools and insights to reclaim your inner peace and potential."
      },
      {
        title: "Who I Work With: Empowering Individuals to Thrive",
        content: [
          "I work with individuals who are ready to explore their inner world and make meaningful changes. My clients often seek support for:",
          "Feeling Stuck & Procrastination: Breaking free from cycles that hold you back.",
          "Low Self-Esteem & Body Image Issues: Cultivating self-acceptance and confidence.",
          "Anxiety & Overthinking: Learning to manage racing thoughts and find calm.",
          "Emotional Regulation: Developing healthier ways to process and express emotions.",
          "Relationship Challenges: Improving communication and connection with others.",
          "Personal Growth: Unlocking your potential and living a more fulfilling life."
        ]
      },
      {
        title: "Why Me: Your Journey, My Dedicated Support",
        content: "Choosing a psychologist is a deeply personal decision. With me, you’ll find a therapist who understands the nuances of human struggle, not just academically, but empathetically. My personal journey has instilled in me a profound sense of empathy and a commitment to creating a truly safe, non-judgmental space for you. I combine clinical expertise with a human-centered approach, focusing on your unique story and strengths. As a co-founder of ClearMind Counseling, my mission is to build a supportive community where you feel heard, valued, and empowered to achieve lasting change. Let's work together to cultivate a clearer mind and a more vibrant life."
      },
      {
        title: "Qualifications & Certifications",
        content: [
          "Masters in Clinical Psychology",
          "Post Graduate diploma in Psychotherapies",
          "Over 3 years of clinical experience"
        ]
      },
      {
        title: "Terms & Conditions",
        content: [
          "Please arrive 10 minutes before the session.",
          "Ensure you are seated in a quiet space with a reliable internet connection.",
          "Once booked, sessions cannot be cancelled or refunded. In the event of an emergency, sessions may be rescheduled with prior notice",
          "Cancelletions from expert's end may be fully refunded within 3-4 working days"
        ]
      },
      {
        title: "Languages Known",
        content: ["English", "Hindi", "Marathi", "Kannada"]
      }
    ]
  }
];
