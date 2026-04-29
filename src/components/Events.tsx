import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { motion, AnimatePresence } from "motion/react";
import { 
  Calendar as CalendarIcon, 
  List, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Video
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { 
  format, 
  addMonths, 
  subMonths, 
  startOfMonth, 
  endOfMonth, 
  startOfWeek, 
  endOfWeek, 
  isSameMonth, 
  isSameDay, 
  addDays, 
  parseISO 
} from "date-fns";
import { cn } from "../lib/utils";
import { businessData } from "../data/businessData";

// Mock Event Data
const eventsData = [
  {
    id: 1,
    title: "Safe Haven: Listening Circle",
    description: "A gentle group session focusing on active listening and shared empathy. A safe space to express and be heard without judgment.",
    date: "2026-05-15",
    time: "18:00 - 19:30",
    location: "Online (Zoom)",
    type: "Group Session",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&q=80&w=1200",
    attendees: 12,
    category: "Emotional Support"
  },
  {
    id: 2,
    title: "Colors of the Mind: Art Therapy",
    description: "Express your emotions through art. This workshop uses creative processes to improve physical, mental, and emotional well-being.",
    date: "2026-05-22",
    time: "15:00 - 17:00",
    location: "South Mumbai Studio",
    type: "Workshop",
    image: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=1200",
    attendees: 8,
    category: "Art Therapy"
  },
  {
    id: 3,
    title: "Mindful Morning: Group Meditation",
    description: "Start your weekend with clarity. A led group meditation session followed by a short discussion on mindfulness in daily life.",
    date: "2026-05-24",
    time: "08:00 - 09:00",
    location: "Online",
    type: "Meditation",
    image: "https://images.unsplash.com/photo-1499728603263-13726abce5fd?auto=format&fit=crop&q=80&w=1200",
    attendees: 25,
    category: "Mindfulness"
  },
  {
    id: 4,
    title: "Building Resilience Workshop",
    description: "Practical psychological tools to help you bounce back from life's challenges. Led by our senior psychologist Vikas Kamble.",
    date: "2026-06-05",
    time: "11:00 - 13:00",
    location: businessData.address,
    type: "Educational",
    image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?auto=format&fit=crop&q=80&w=1200",
    attendees: 15,
    category: "Personal Growth"
  },
  {
    id: 5,
    title: "Child Psychology Q&A for Parents",
    description: "An interactive session for parents to discuss child behavior, development, and emotional needs in a supportive environment.",
    date: "2026-06-12",
    time: "17:00 - 18:30",
    location: "Online",
    type: "Webinar",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&q=80&w=1200",
    attendees: 40,
    category: "Parenting"
  }
];

export default function Events() {
  const [viewMode, setViewMode] = useState<'list' | 'calendar'>('list');
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 4, 1)); // May 2026

  const renderHeader = () => {
    return (
      <header className="pt-36 pb-12 bg-beige-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-charcoal mb-4">
                  Community <span className="text-sage-500 italic">Events</span>
                </h1>
                <p className="text-base md:text-lg text-charcoal/70 max-w-2xl">
                  Join our therapeutic circles, workshops, and mindful sessions. Together, we create a safe space for healing, growth, and connection.
                </p>
              </motion.div>
            </div>
            
            <div className="flex items-center p-1 bg-beige-200 rounded-xl">
              <button
                onClick={() => setViewMode('list')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  viewMode === 'list' ? "bg-white text-sage-600 shadow-sm" : "text-charcoal/50 hover:text-charcoal"
                )}
              >
                <List className="w-4 h-4" />
                List View
              </button>
              <button
                onClick={() => setViewMode('calendar')}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  viewMode === 'calendar' ? "bg-white text-sage-600 shadow-sm" : "text-charcoal/50 hover:text-charcoal"
                )}
              >
                <CalendarIcon className="w-4 h-4" />
                Calendar
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  };

  const renderListView = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
        {eventsData.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-beige-100"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={event.image} 
                alt={event.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-sage-600">
                {event.category}
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-center gap-2 text-sage-500 text-sm font-semibold mb-2">
                <CalendarIcon className="w-4 h-4" />
                {format(parseISO(event.date), "MMMM d, yyyy")}
              </div>
              <h3 className="text-xl font-serif font-bold text-charcoal mb-3 group-hover:text-sage-600 transition-colors">
                {event.title}
              </h3>
              <p className="text-charcoal/60 text-sm mb-6 line-clamp-2">
                {event.description}
              </p>
              
              <div className="space-y-3 pt-4 border-t border-beige-100">
                <div className="flex items-center gap-3 text-sm text-charcoal/70">
                  <Clock className="w-4 h-4 text-beige-300" />
                  {event.time}
                </div>
                <div className="flex items-center gap-3 text-sm text-charcoal/70">
                  {event.location.includes("Online") ? (
                    <>
                      <Video className="w-4 h-4 text-sage-300" />
                      {event.location}
                    </>
                  ) : (
                    <>
                      <MapPin className="w-4 h-4 text-sage-300" />
                      <a 
                        href={businessData.googleMapsLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:text-sage-500 transition-colors"
                      >
                        {event.location}
                      </a>
                    </>
                  )}
                </div>
              </div>
              
              <a 
                href={`https://api.whatsapp.com/send?phone=${businessData.whatsapp.number}&text=Hello%20Clearmind%20Counselling%2C%20I%20am%20interested%20in%20registering%20for%20the%20event%3A%20${encodeURIComponent(event.title)}.%20Can%20you%20share%20more%20details%3F`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full mt-6 py-3 bg-beige-50 text-charcoal font-semibold rounded-xl hover:bg-sage-500 hover:text-white transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
                Register Now
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);
  const selectedEvent = eventsData.find(e => e.id === selectedEventId);

  const renderCalendarView = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows = [];
    let days = [];
    let day = startDate;

    const allDays = [];
    while (day <= endDate) {
      allDays.push(day);
      day = addDays(day, 1);
    }

    // Prepare rows for desktop
    for (let i = 0; i < allDays.length; i += 7) {
      const week = allDays.slice(i, i + 7);
      rows.push(
        <div className="grid grid-cols-7" key={week[0].toString()}>
          {week.map(d => {
            const dayEvents = eventsData.filter(e => isSameDay(parseISO(e.date), d));
            return (
              <div
                key={d.toString()}
                className={cn(
                  "relative h-40 md:h-56 border-r border-b border-beige-100 p-3 transition-colors",
                  !isSameMonth(d, monthStart) ? "bg-beige-50/50" : "bg-white",
                  isSameDay(d, new Date()) && "bg-sage-50/30"
                )}
              >
                <span className={cn(
                  "text-xs md:text-sm font-bold",
                  !isSameMonth(d, monthStart) ? "text-charcoal/20" : "text-charcoal/40"
                )}>
                  {format(d, "d")}
                </span>
                
                <div className="mt-2 flex flex-col gap-2 h-full max-h-[calc(100%-2.5rem)] overflow-y-auto">
                  {dayEvents.map(event => (
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={event.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEventId(event.id);
                      }}
                      className={cn(
                        "rounded-lg border-l-4 truncate cursor-pointer transition-all shadow-sm flex flex-col justify-center",
                        dayEvents.length === 1 ? "p-4 min-h-[80px] text-sm md:text-base font-semibold" : 
                        dayEvents.length === 2 ? "p-3 min-h-[60px] text-[12px] md:text-sm" :
                        "p-2 min-h-[40px] text-[11px] md:text-xs",
                        
                        selectedEventId === event.id 
                          ? "bg-sage-600 text-white border-sage-800 scale-[1.02]" 
                          : "bg-sage-50 text-sage-800 border-sage-500 hover:bg-sage-100 hover:scale-[1.02]"
                      )}
                      title={event.title}
                    >
                      <span className="truncate">{event.title}</span>
                      {dayEvents.length <= 2 && (
                        <span className={cn(
                          "text-[10px] md:text-[11px] mt-1 opacity-70",
                          selectedEventId === event.id ? "text-white" : "text-sage-600"
                        )}>
                          {event.time}
                        </span>
                      )}
                    </motion.div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    return (
      <div className="py-12">
        {/* Desktop View */}
        <div className="hidden md:block">
          <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-beige-100">
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between px-8 py-6 gap-4 border-b border-beige-100">
              <h2 className="text-2xl font-serif font-bold text-charcoal">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                  className="p-2 hover:bg-beige-50 rounded-full transition-colors border border-beige-100"
                >
                  <ChevronLeft className="w-5 h-5 text-charcoal" />
                </button>
                <button 
                  onClick={() => setCurrentMonth(new Date())}
                  className="px-4 py-2 text-sm font-medium text-sage-600 hover:bg-sage-50 rounded-full transition-colors border border-beige-100"
                >
                  Today
                </button>
                <button 
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                  className="p-2 hover:bg-beige-50 rounded-full transition-colors border border-beige-100"
                >
                  <ChevronRight className="w-5 h-5 text-charcoal" />
                </button>
              </div>
            </div>

            {/* Days Header */}
            <div className="grid grid-cols-7 bg-beige-50/50 border-b border-beige-100">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(d => (
                <div key={d} className="py-4 text-center text-xs font-bold text-charcoal/40 uppercase tracking-widest">
                  {d}
                </div>
              ))}
            </div>

            {/* Table Body */}
            <div className="overflow-hidden">
              {rows}
            </div>
          </div>
        </div>

        {/* Mobile View: Vertical Agenda Calendar */}
        <div className="md:hidden space-y-6">
          <div className="flex items-center justify-between bg-white p-6 rounded-3xl shadow-sm border border-beige-100">
            <h2 className="text-xl font-serif font-bold text-charcoal">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <div className="flex items-center gap-1">
              <button 
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                className="p-2 hover:bg-beige-50 rounded-full transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-charcoal" />
              </button>
              <button 
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                className="p-2 hover:bg-beige-50 rounded-full transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-charcoal" />
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {allDays.filter(d => isSameMonth(d, monthStart)).map(d => {
              const dayEvents = eventsData.filter(e => isSameDay(parseISO(e.date), d));
              const isToday = isSameDay(d, new Date());
              
              return (
                <div key={d.toString()} className={cn(
                  "flex gap-4 p-5 rounded-3xl border transition-all",
                  dayEvents.length > 0 
                    ? "bg-white border-sage-200 shadow-md ring-1 ring-sage-50" 
                    : "bg-white/40 border-beige-100 opacity-60"
                )}>
                  <div className={cn(
                    "flex flex-col items-center justify-center min-w-[50px] border-r border-beige-100 pr-4",
                    isToday && "text-sage-600"
                  )}>
                    <span className="text-[10px] font-bold uppercase tracking-tighter opacity-60">{format(d, "EEE")}</span>
                    <span className="text-2xl font-serif font-bold">{format(d, "d")}</span>
                  </div>
                  <div className="flex-1">
                    {dayEvents.length > 0 ? (
                      <div className="space-y-4">
                        {dayEvents.map(event => (
                          <motion.div 
                            key={event.id} 
                            onClick={() => setSelectedEventId(event.id)} 
                            className="group cursor-pointer"
                            whileTap={{ scale: 0.98 }}
                          >
                            <h4 className="text-base font-bold text-charcoal group-hover:text-sage-600 transition-colors leading-tight">
                              {event.title}
                            </h4>
                            <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
                              <div className="flex items-center gap-1.5 text-[11px] text-charcoal/60">
                                <Clock className="w-3.5 h-3.5 text-sage-400" />
                                {event.time}
                              </div>
                              <div className="flex items-center gap-1.5 text-[11px] text-charcoal/60">
                                {event.location.includes("Online") ? (
                                  <Video className="w-3.5 h-3.5 text-sage-400" />
                                ) : (
                                  <MapPin className="w-3.5 h-3.5 text-sage-400" />
                                )}
                                {event.location}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="h-full flex items-center">
                        <span className="text-xs text-charcoal/30 italic">No events scheduled</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Selected Event Details (Calendar View Only) */}
        <AnimatePresence>
          {selectedEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="mt-8 bg-white rounded-3xl p-8 border border-sage-100 shadow-lg flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="w-full md:w-1/3 h-48 rounded-2xl overflow-hidden">
                <img 
                  src={selectedEvent.image} 
                  alt={selectedEvent.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 text-sage-500 text-sm font-semibold mb-2">
                  <CalendarIcon className="w-4 h-4" />
                  {format(parseISO(selectedEvent.date), "MMMM d, yyyy")}
                </div>
                <h3 className="text-2xl font-serif font-bold text-charcoal mb-4">{selectedEvent.title}</h3>
                <p className="text-charcoal/70 mb-6">{selectedEvent.description}</p>
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-charcoal/60">
                   <div className="flex items-center gap-2">
                     <Clock className="w-4 h-4 text-sage-300" />
                     {selectedEvent.time}
                   </div>
                   <div className="flex items-center gap-2">
                     {selectedEvent.location.includes("Online") ? (
                       <>
                         <Video className="w-4 h-4 text-sage-300" />
                         {selectedEvent.location}
                       </>
                     ) : (
                       <>
                         <MapPin className="w-4 h-4 text-sage-300" />
                         <a 
                           href={businessData.googleMapsLink} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="hover:text-sage-500 transition-colors underline decoration-sage-200 underline-offset-4"
                         >
                           {selectedEvent.location}
                         </a>
                       </>
                     )}
                   </div>
                </div>
                <a 
                  href={`https://api.whatsapp.com/send?phone=${businessData.whatsapp.number}&text=Hello%20Clearmind%20Counselling%2C%20I%20am%20interested%20in%20registering%20for%20the%20event%3A%20${encodeURIComponent(selectedEvent.title)}.%20Can%20you%20share%20more%20details%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-sage-500 text-white px-8 py-3 rounded-full font-bold hover:bg-sage-600 transition-all shadow-md"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Register for this Event
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-beige-50/30">
      <Navbar />
      
      {renderHeader()}

      <main className="max-w-7xl mx-auto px-6 pb-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'list' ? renderListView() : renderCalendarView()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
