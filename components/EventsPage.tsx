
import React, { useState } from 'react';
import { 
  Calendar as CalendarIcon, 
  MapPin, 
  Clock, 
  ArrowRight, 
  X, 
  Zap, 
  RotateCcw,
  Sparkles as SparklesIcon,
  CalendarDays,
  ChevronRight,
  Music,
  Trophy,
  Users
} from 'lucide-react';

interface Event {
  id: number;
  title: string;
  category: string;
  type: 'upcoming' | 'deadline' | 'past';
  date: number;
  time: string;
  location: string;
  image: string;
  tag?: string;
}

interface EventsPageProps {
  setActiveTab?: (tab: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({ setActiveTab }) => {
  const [selectedDate, setSelectedDate] = useState(22);
  const [isCalendarOpen, setIsCalendarOpen] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  
  const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const monthDays = Array.from({ length: 31 }, (_, i) => i + 1);
  const startDayOffset = 4; // Jan 2026 starts on Thursday

  const mockEvents: Event[] = [
    { id: 1, title: "Inter-College Tech Fest '26", category: "Mega Event", type: 'upcoming', date: 19, time: "09:00 AM", location: "Main Stadium", image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=800", tag: "FEST" },
    { id: 2, title: "Early Bird: Robot-Wars Registration", category: "Competition", type: 'deadline', date: 20, time: "11:59 PM", location: "Online", image: "https://images.unsplash.com/photo-1561144485-832ad5275967?auto=format&fit=crop&q=80&w=800", tag: "URGENT" },
    { id: 3, title: "Cyber-Security Deep Dive", category: "Workshop", type: 'upcoming', date: 22, time: "01:00 PM", location: "Hall A", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" },
    { id: 4, title: "Cultural Night Auditions", category: "Performances", type: 'upcoming', date: 19, time: "05:00 PM", location: "Auditorium", image: "https://images.unsplash.com/photo-1514525253361-bee1a1373c24?auto=format&fit=crop&q=80&w=800" },
    { id: 5, title: "Hack-a-Thon Project Submission", category: "Deadlines", type: 'deadline', date: 19, time: "03:00 PM", location: "GitHub", image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800" },
    { id: 6, title: "Electronic Music Workshop", category: "Workshop", type: 'upcoming', date: 21, time: "10:00 AM", location: "Music Room", image: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800" },
    { id: 7, title: "Startup Pitch Deck: Last Day", category: "Competition", type: 'deadline', date: 22, time: "06:00 PM", location: "Admin Block", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
    { id: 8, title: "Night Photography Walk", category: "Arts", type: 'upcoming', date: 22, time: "08:30 PM", location: "Campus Gates", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800" }
  ];

  const filteredUpcoming = mockEvents.filter(e => e.type === 'upcoming' && e.date === selectedDate);
  const allDeadlines = mockEvents.filter(e => e.type === 'deadline');

  const handleDateSelect = (date: number) => {
    setIsSyncing(true);
    setSelectedDate(date);
    setTimeout(() => setIsSyncing(false), 300);
  };

  const getFullDateString = (day: number) => {
    const date = new Date(2026, 0, day);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const getDotsForDay = (day: number) => {
    const events = mockEvents.filter(e => e.date === day);
    if (events.length === 0) return null;
    const hasDeadline = events.some(e => e.type === 'deadline');
    return (
      <div className="absolute bottom-1 flex gap-0.5 justify-center">
        <div className={`w-0.5 h-0.5 rounded-full ${hasDeadline ? 'bg-rose-500' : 'bg-blue-500'}`} />
      </div>
    );
  };

  return (
    <div className="h-full flex flex-row overflow-hidden -m-6 animate-in fade-in duration-500 bg-[#fbfcfd]">
      
      {/* Main Content Area - shifts to the left smoothly when calendar opens */}
      <div className={`flex-1 overflow-y-auto p-10 custom-scrollbar transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]`}>
        <div className="max-w-[1000px] mx-auto space-y-12 pb-24">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex items-center space-x-8 group">
              <div className="relative">
                <span className={`text-[80px] font-black leading-none tracking-tighter transition-all duration-500 inline-block ${isSyncing ? 'text-blue-100 scale-95 opacity-50' : 'text-slate-100 group-hover:text-slate-200'}`}>
                  {selectedDate}
                </span>
              </div>
              <div className={`flex flex-col mb-2 transition-all duration-500 ${isSyncing ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100'}`}>
                <span className="text-[10px] font-black text-[#2563eb] uppercase tracking-[0.6em] mb-1 flex items-center">
                  <span className="w-5 h-[2px] bg-blue-600 mr-2"></span>
                  EVENT SCHEDULE
                </span>
                <span className="text-4xl font-black text-slate-900 tracking-tight">
                  {getFullDateString(selectedDate)}
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-3 mb-2">
              <div className="bg-white border border-slate-100 px-4 py-2 rounded-xl shadow-sm flex items-center">
                <SparklesIcon className="w-3.5 h-3.5 text-amber-500 mr-2" />
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">{filteredUpcoming.length} SESSIONS</span>
              </div>
            </div>
          </div>

          {/* Upcomings Section */}
          <section className={`space-y-6 transition-all duration-500 ${isSyncing ? 'opacity-30 blur-sm scale-[0.98]' : 'opacity-100 blur-0 scale-100'}`}>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#0f172a] rounded-xl flex items-center justify-center">
                <CalendarDays className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[18px] font-black text-slate-900 tracking-tight">Today's Fest Events</h2>
                <p className="text-[12px] text-slate-400 font-bold">Key activities for your selected date</p>
              </div>
            </div>

            <div className={`grid gap-6 transition-all duration-500 ${isCalendarOpen ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {filteredUpcoming.length > 0 ? (
                filteredUpcoming.map((event, idx) => (
                  <div key={event.id} className="group bg-white rounded-[24px] border border-slate-100 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-8 flex flex-col" style={{animationDelay: `${idx*80}ms`}}>
                    <div className="h-40 relative overflow-hidden bg-slate-50">
                      <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                      <div className="absolute top-4 left-4 flex space-x-2">
                        {event.tag && (
                          <span className="bg-blue-600 text-white px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">
                            {event.tag}
                          </span>
                        )}
                        <span className="bg-white/95 text-slate-900 px-2 py-1 rounded-lg text-[8px] font-black uppercase tracking-widest">
                          {event.category}
                        </span>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center space-x-4 mb-3 text-[9px] font-black text-slate-400 uppercase tracking-widest">
                        <div className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-blue-500" />{event.time}</div>
                        <div className="flex items-center"><MapPin className="w-3.5 h-3.5 mr-1.5 text-rose-400" />{event.location.split(' ')[0]}</div>
                      </div>
                      <h3 className="text-md font-black text-slate-900 leading-tight mb-5 group-hover:text-blue-600 transition-colors flex-1 line-clamp-2">
                        {event.title}
                      </h3>
                      <button className="w-full py-3 bg-[#0f172a] text-white rounded-[12px] text-[10px] font-black uppercase tracking-widest flex items-center justify-center space-x-2 hover:bg-blue-600 transition-all active:scale-95">
                        <span>Attend</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full py-16 bg-slate-50/50 rounded-[24px] border border-dashed border-slate-200 flex flex-col items-center justify-center text-center">
                  <RotateCcw className="w-8 h-8 text-slate-200 mb-4" />
                  <h3 className="text-md font-black text-slate-400 uppercase tracking-widest">No Events Found</h3>
                  <p className="text-[11px] text-slate-300 font-bold mt-1">Select another day from the timeline</p>
                </div>
              )}
            </div>
          </section>

          {/* Deadlines Section */}
          <section className="space-y-6 pt-10 border-t border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-rose-50 border border-rose-100 rounded-xl flex items-center justify-center">
                <Zap className="w-5 h-5 text-rose-500 fill-current" />
              </div>
              <h2 className="text-[18px] font-black text-slate-900 tracking-tight leading-none">Registration Deadlines</h2>
            </div>

            <div className={`grid gap-6 transition-all duration-500 ${isCalendarOpen ? 'grid-cols-1 md:grid-cols-2' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
              {allDeadlines.map((deadline) => (
                <div key={deadline.id} className="bg-white p-6 rounded-[24px] border border-rose-100 bg-[#fffafa] relative group hover:shadow-md transition-all duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <span className="bg-rose-500 text-white text-[8px] font-black px-2 py-1 rounded-lg uppercase tracking-widest shadow-sm">
                      DEADLINE
                    </span>
                    <span className="text-[9px] font-black text-rose-300 uppercase tracking-widest">URGENT</span>
                  </div>
                  <h3 className="text-md font-black text-slate-900 leading-tight mb-6 line-clamp-2 min-h-[40px]">{deadline.title}</h3>
                  <div className="flex items-center justify-between border-t border-rose-50 pt-4">
                    <div className="flex flex-col">
                      <span className="text-[9px] font-bold text-slate-400 uppercase mb-0.5">Ends</span>
                      <span className="text-[12px] font-black text-slate-800">Jan {deadline.date}th</span>
                    </div>
                    <button className="w-9 h-9 bg-slate-900 text-white rounded-xl flex items-center justify-center hover:bg-rose-500 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* REFINED CALENDAR - Smaller width (300px), more radius, and "Genie Effect" transition */}
      <div 
        className={`flex flex-col h-full shrink-0 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden relative ${
          isCalendarOpen ? 'w-[300px] opacity-100 p-4' : 'w-0 opacity-0 p-0'
        }`}
      >
        <div 
          className={`h-full bg-[#0a0f1c] rounded-[32px] flex flex-col p-6 shadow-2xl border border-white/5 transition-all duration-700 ${
            isCalendarOpen ? 'scale-100 translate-x-0 rotate-0' : 'scale-50 translate-x-full rotate-12'
          }`}
          style={{ transformOrigin: 'bottom right' }}
        >
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-blue-500 uppercase tracking-[0.4em] mb-1">TIMELINE</span>
              <span className="text-xl font-black text-white tracking-tight">January 2026</span>
            </div>
            <button 
              onClick={() => setIsCalendarOpen(false)}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all active:scale-90"
            >
              <ChevronRight className="w-5 h-5 text-white/40" />
            </button>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1 text-center mb-4">
            {daysOfWeek.map((d, i) => (
              <span key={i} className="text-[9px] font-black text-slate-600 uppercase tracking-widest">{d}</span>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-1.5 mb-8">
            {Array.from({ length: startDayOffset }).map((_, i) => <div key={i} />)}
            {monthDays.map(d => (
              <button
                key={d}
                onClick={() => handleDateSelect(d)}
                className={`relative h-8 w-8 rounded-full text-[11px] font-black transition-all flex flex-col items-center justify-center active:scale-90 group/date ${
                  selectedDate === d 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-slate-500 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="relative z-10">{d}</span>
                {getDotsForDay(d)}
              </button>
            ))}
          </div>

          {/* Featured Content Area */}
          <div className="mt-auto space-y-4">
            <div className="bg-[#1a1e2e] p-5 rounded-[24px] border border-white/5 relative overflow-hidden group">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[9px] font-black text-slate-500 uppercase tracking-[0.2em]">FEATURED</span>
                <Music className="w-3.5 h-3.5 text-amber-500" />
              </div>
              <h4 className="text-[14px] font-black text-white mb-2 leading-tight">Fest Auditions</h4>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                Check slots for main stage Jan 19th.
              </p>
            </div>
            
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center space-x-2 text-slate-600">
                <Users className="w-3.5 h-3.5" />
                <span className="text-[8px] font-black uppercase tracking-widest">12K ENROLLED</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <Trophy className="w-3.5 h-3.5" />
                <span className="text-[8px] font-black uppercase tracking-widest">50+ PRIZES</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toggle Button (The Genie Origin) */}
      {!isCalendarOpen && (
        <div className="fixed bottom-10 right-10 z-[100]">
          <button
            onClick={() => setIsCalendarOpen(true)}
            className="w-16 h-16 bg-[#0f172a] hover:bg-blue-600 text-white p-5 rounded-[22px] shadow-2xl flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-90 hover:-translate-y-2 group"
          >
            <CalendarIcon className="w-7 h-7 group-hover:rotate-12 transition-transform" />
            <div className="absolute -top-2 -right-2 w-7 h-7 bg-rose-500 text-white text-[10px] font-black flex items-center justify-center rounded-2xl border-4 border-white shadow-xl animate-bounce">
              3
            </div>
          </button>
        </div>
      )}

      {/* Subtle BG Visuals */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden opacity-5">
        <div className="absolute top-0 left-0 w-[1200px] h-[1200px] bg-blue-500 rounded-full blur-[240px] -ml-[500px] -mt-[500px]" />
      </div>
    </div>
  );
};
