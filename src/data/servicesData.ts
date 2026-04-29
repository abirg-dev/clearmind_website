import { Brain, Heart, Users, ShieldAlert, Baby, UserCheck, Zap, Smile } from "lucide-react";
import React from "react";

export interface ServiceDetail {
  slug: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  who: string;
  covers: string[];
  suitableFor: string[];
  results: string[];
}

export const servicesData: ServiceDetail[] = [
  {
    slug: "anxiety-therapy",
    icon: React.createElement(Brain, { className: "w-8 h-8" }),
    title: "Anxiety Therapy",
    description: "Learn to manage intrusive thoughts and physical symptoms of anxiety using CBT and mindfulness.",
    who: "Adults & Teens",
    covers: [
      "Generalized Anxiety Disorder (GAD)",
      "Social Anxiety & Phobias",
      "Panic Disorder & Panic Attacks",
      "Obsessive-Compulsive Tendencies",
      "Mindfulness-Based Stress Reduction",
      "Cognitive Behavioral Therapy (CBT) for worry management"
    ],
    suitableFor: [
      "Individuals feeling constantly 'on edge' or restless",
      "Those experiencing physical symptoms like racing heart or shallow breathing due to stress",
      "People avoiding social or public situations due to fear",
      "High-achievers struggling with performance anxiety"
    ],
    results: [
      "Significant reduction in physical anxiety symptoms",
      "Greater emotional regulation and 'grounding' abilities",
      "Confidence to face previously avoided situations",
      "Clear techniques to manage 'what-if' thinking patterns"
    ]
  },
  {
    slug: "depression-counseling",
    icon: React.createElement(Smile, { className: "w-8 h-8" }),
    title: "Depression Counseling",
    description: "Find your way back to joy and motivation with compassionate, evidence-based support.",
    who: "Individuals",
    covers: [
      "Clinical Depression & Persistent Low Mood",
      "Postpartum Depression",
      "Mood Regulation Techniques",
      "Behavioral Activation (re-engaging with life)",
      "Identifying & challenging negative core beliefs",
      "Building a sustainable self-care framework"
    ],
    suitableFor: [
      "Those feeling 'stuck', hopeless, or emotionally numb",
      "Individuals struggling with low motivation and fatigue",
      "People experiencing changes in sleep or appetite due to mood",
      "Anyone finding it hard to find joy in previously loved activities"
    ],
    results: [
      "Improved energy and daily motivation levels",
      "Clearer perspective and more balanced thinking",
      "Renewed sense of purpose and self-worth",
      "Effective tools to manage depressive episodes"
    ]
  },
  {
    slug: "trauma-recovery",
    icon: React.createElement(ShieldAlert, { className: "w-8 h-8" }),
    title: "Trauma Recovery",
    description: "Specialized care for PTSD and complex trauma using EMDR and trauma-focused therapy.",
    who: "Survivors",
    covers: [
      "Post-Traumatic Stress Disorder (PTSD)",
      "Childhood & Developmental Trauma",
      "Somatic Awareness (connecting mind and body)",
      "Grounding techniques for flashbacks",
      "Safety planning and emotional stabilization",
      "Inner child work and healing"
    ],
    suitableFor: [
      "Survivors of abuse, accidents, or significant life events",
      "Those experiencing flashbacks or intrusive memories",
      "Individuals feeling disconnected from their bodies",
      "People with a heightened 'startle response' or hyper-vigilance"
    ],
    results: [
      "Reduced emotional reactivity to triggers",
      "Integration of traumatic memories into a cohesive narrative",
      "Regained sense of safety and bodily autonomy",
      "Improved ability to trust oneself and others"
    ]
  },
  {
    slug: "couples-therapy",
    icon: React.createElement(Users, { className: "w-8 h-8" }),
    title: "Couples Therapy",
    description: "Improve communication and rebuild trust with your partner in a neutral, safe environment.",
    who: "Couples",
    covers: [
      "Communication patterns and 'The Four Horsemen'",
      "Conflict resolution and de-escalation",
      "Intimacy and emotional connection",
      "Navigating life transitions together",
      "Parenting alignment and extended family boundaries",
      "Infidelity recovery and trust-building"
    ],
    suitableFor: [
      "Partners feeling stuck in repetitive, circular arguments",
      "Couples experiencing a 'roommate' dynamic or disconnection",
      "Those wanting to strengthen an already healthy relationship",
      "Partners navigating significant transitions (engagement, baby, relocation)"
    ],
    results: [
      "Constructive communication tools for difficult topics",
      "Deeper emotional and physical intimacy",
      "Shared goals and a renewed sense of partnership",
      "Effective ways to repair after a disagreement"
    ]
  },
  {
    slug: "child-psychology",
    icon: React.createElement(Baby, { className: "w-8 h-8" }),
    title: "Child Psychology",
    description: "Helping children navigate emotions, behavior, and social challenges through play and talk.",
    who: "Children 4-12",
    covers: [
      "Emotional expression through play therapy",
      "ADHD and neurodiversity support",
      "Social skills and peer interaction",
      "Navigating school anxiety and school-related stress",
      "Behavioral management for parents",
      "Emotional regulation for kids"
    ],
    suitableFor: [
      "Children struggling with big emotions or outbursts",
      "Kids having difficulty adjusting to family changes (divorce, move)",
      "Children who are excessively shy or struggling socially",
      "Parents looking for effective ways to support their child's development"
    ],
    results: [
      "Improved emotional vocabulary and expression in children",
      "Better behavioral regulation at home and school",
      "Enhanced social confidence and problem-solving skills",
      "Stronger, more communicative parent-child relationships"
    ]
  },
  {
    slug: "burnout-stress",
    icon: React.createElement(Zap, { className: "w-8 h-8" }),
    title: "Burnout & Stress",
    description: "Strategies for professionals and students to manage high-pressure environments and recover.",
    who: "Professionals",
    covers: [
      "Work-life balance and integration",
      "Boundary setting in professional and personal life",
      "Managing perfectionism and 'imposter syndrome'",
      "Practical stress-relief and relaxation techniques",
      "Time management and energy preservation",
      "Career transition and clarity coaching"
    ],
    suitableFor: [
      "Corporate professionals feeling overwhelmed by demand",
      "Healthcare workers and caregivers experiencing exhaustion",
      "Students facing high academic pressure",
      "Entrepreneurs struggling to 'switch off'"
    ],
    results: [
      "Sustainable productivity without constant exhaustion",
      "Ability to set clear boundaries without guilt",
      "Restored energy and passion for one's work",
      "Clear system for managing daily pressure"
    ]
  },
  {
    slug: "self-esteem-coaching",
    icon: React.createElement(UserCheck, { className: "w-8 h-8" }),
    title: "Self-Esteem Coaching",
    description: "Build a healthier relationship with yourself and develop lasting confidence.",
    who: "Individuals",
    covers: [
      "Challenging the 'Inner Critic'",
      "Developing self-compassion and kindness",
      "Assertive communication and needs expression",
      "Identifying core values and authentic living",
      "Body image and self-acceptance",
      "Overcoming people-pleasing tendencies"
    ],
    suitableFor: [
      "Those who feel 'not good enough' despite achievements",
      "Individuals who struggle to say no or set boundaries",
      "People battling constant self-doubt and comparison",
      "Anyone wanting to live more authentically"
    ],
    results: [
      "Solid foundation of self-worth and confidence",
      "Ability to advocate for one's own needs and desires",
      "Reduced reliance on external validation",
      "Genuine self-acceptance and reduced self-criticism"
    ]
  },
  {
    slug: "grief-counseling",
    icon: React.createElement(Heart, { className: "w-8 h-8" }),
    title: "Grief Counseling",
    description: "Support through the difficult journey of loss, helping you find a path forward at your own pace.",
    who: "Grieving Individuals",
    covers: [
      "Processing the loss of a loved one",
      "Navigating life transitions (divorce, health changes)",
      "Unresolved or 'complicated' grief",
      "Finding meaningful ways to honor memories",
      "Managing the 'secondary losses' (identity, routine)",
      "Building a 'new normal' step-by-step"
    ],
    suitableFor: [
      "Anyone struggling to navigate life after a significant loss",
      "Individuals feeling 'stuck' in their grieving process",
      "People wanting a safe space to process complex emotions",
      "Those facing life-altering changes (career, relocation, health)"
    ],
    results: [
      "Healthy integration of the loss into one's life story",
      "Ability to engage with the present while honoring the past",
      "Reduction in overwhelming feelings of isolation",
      "Personal growth through the experience of loss"
    ]
  },
];
