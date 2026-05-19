import { businessData } from "./businessData";

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  image: string;
  attendees: number;
  category: string;
  joiningLink?: string;
}

export const eventsData: Event[] = [
  {
    id: 1,
    title: "Dialectical Behavioural Therapy Workshop 101",
    description: "An engaging online DBT Skills Workshop led by experienced psychologist Janhavi More, designed to help individuals understand Borderline Personality Disorder (BPD) and develop practical skills for emotional balance, healthier relationships, mindfulness, and mental well-being. Ideal for psychology students, early career therapists, and anyone seeking personal growth and emotional resilience.",
    date: "2026-05-30",
    time: "19:00",
    location: "Online (Google Meet)",
    type: "Webinar",
    image: "https://iili.io/Byqcpf4.jpg",
    attendees: 12,
    category: "Educational",
    joiningLink: "https://meet.google.com/txb-grmz-zxj"
  },
  {
    id: 2,
    title: "The Power Within: A Journey Into Hypnotherapy",
    description: "Discover the power of your subsconcious and create lasting positive change from within. This workshop offers practical tools and insights to help reduce stress, break limiting patterns and live a more empowered and fulfilled life.",
    date: "2026-06-28",
    time: "23:00",
    location: "Online (Google Meet)",
    type: "Workshop",
    image: "https://iili.io/Byqcy0l.jpg",
    attendees: 8,
    category: "Personal Growth",
    joiningLink: "https://meet.google.com/kxe-jcmf-yck"
  }
];
