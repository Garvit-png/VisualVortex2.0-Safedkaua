
import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  Clock, 
  Maximize2,
  Calendar as CalendarIcon,
  Trophy,
  Code,
  Music,
  ArrowRight,
  Globe,
  Sparkles
} from 'lucide-react';

interface Event {
  id: number;
  date: number;
  month: number;
  year: number;
  title: string;
  category: 'Tech' | 'Hackathon' | 'Culture' | 'Social';
  time: string;
  location: string;
}

const mockEvents: Event[] = [
  { id: 1, date: 5, month: 0, year: 2026, title: "Algo-Trade Workshop", category: "Tech", time: "10:00 AM", location: "Hall 1" },
  { id: 2, date: 12, month: 0, year: 2026, title: "Winter Code Jam", category: "Hackathon", time: "09:00 AM", location: "Innovation Hub" },
  { id: 3, date: 19, month: 0, year: 2026, title: "Global AI Hackathon", category: "Hackathon", time: "09:00 AM", location: "Main Hall" },
  { id: 4, date: 19, month: 0, year: 2026, title: "System Design Sync", category: "Tech", time: "02:00 PM", location: "Room 302" },
  { id: 5, date: 22, month: 0, year: 2026, title: "Jazz Night", category: "Culture", time: "07:00 PM", location: "Campus Plaza" },
  { id: 6, date: 28, month: 0, year: 2026, title: "Founder Meetup", category: "Social", time: "06:00 PM", location: "Sky Lounge" },
  { id: 7, date: 19, month: 0, year: 2026, title: "Network Security Lab", category: "Tech", time: "04:30 PM", location: "Lab 04" },
  { id: 8, date: 14, month: 1, year: 2026, title: "Valentine's Tech mixer", category: "Social", time: "05:00 PM", location: "Hub 2" },
];

export const FullCalendarPage: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(0); // 0 = Jan
  const [currentYear, setCurrentYear] = useState(2026);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [filter, setFilter] = useState('All');
  
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const monthDays = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handlePrevMonth = () => {
    setSelectedDate(null);
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedDate(null);
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const categories = ['All', 'Tech', 'Hackathon', 'Culture', 'Social'];

  const filteredEvents = mockEvents.filter(e => 
    (filter === 'All' || e.category === (filter === 'Hackathon' ? 'Hackathon' : filter)) && 
    e.month === currentMonth && 
    e.year === currentYear
  );
  
  const selectedDateEvents = selectedDate ? filteredEvents.filter(e => e.date === selectedDate) : [];

  const getDotsForDate = (day: number) => {
    const eventsOnDay = filteredEvents.filter(e => e.date === day);
    if (eventsOnDay.length === 0) return null;
    
    return (
      <div className="flex flex-wrap justify-center gap-1.5 mt-2 px-1 max-w-[55px]">
        {eventsOnDay.map(e => {
          const colorClass = 
            e.category === 'Hackathon' ? 'bg-purple-500 shadow-[0_0_10px_rgba(147,51,234,0.4)]' : 
            e.category === 'Tech' ? 'bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.4)]' : 
            e.category === 'Culture' ? 'bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.4)]' : 
            'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]';
          
          return (
            <div 
              key={e.id} 
              className={`w-2.5 h-2.5 rounded-full border border-white ring-1 ring-black/5 transition-transform group-hover:scale-125 ${colorClass}`}
              title={e.title}
            />
          );
        })}
      </div>
    );
  };

  const legendItems = [
    { label: 'Hackathons', color: 'bg-purple-500', icon: Trophy },
    { label: 'Tech Workshops', color: 'bg-blue-500', icon: Code },
    { label: 'Culture', color: 'bg-orange-500', icon: Music },
    { label: 'Social', color: 'bg-emerald-500', icon: Globe }
  ];

  return (
    <div className="max-w-full h-full flex flex-col space-y-4 animate-in fade-in duration-500">
      
      {/* Top Bar: Navigation + Slim Legend */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-white p-3 rounded-[20px] border border-slate-100 shadow-sm">
        {/* Month Selector */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-slate-50 border border-slate-200 rounded-full p-0.5">
            <button 
              onClick={handlePrevMonth}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-full transition-all text-slate-500 active:scale-90"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-4 text-sm font-bold text-slate-800 min-w-[140px] text-center">
              {monthNames[currentMonth]} {currentYear}
            </span>
            <button 
              onClick={handleNextMonth}
              className="p-1.5 hover:bg-white hover:shadow-sm rounded-full transition-all text-slate-500 active:scale-90"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
          
          {/* Quick Filter */}
          <div className="hidden sm:flex items-center space-x-1 bg-slate-50 p-0.5 rounded-full border border-slate-200">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${
                  filter === cat ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Legend - Compacted */}
        <div className="flex items-center space-x-5 px-2">
          {legendItems.map(item => (
            <div key={item.label} className="flex items-center space-x-2 group cursor-default">
              <div className={`w-5 h-5 rounded-md ${item.color} flex items-center justify-center text-white transition-transform group-hover:scale-110`}>
                <item.icon className="w-3 h-3" />
              </div>
              <span className="text-[11px] font-bold text-slate-500 whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Grid and Timeline Split */}
      <div className="flex-1 flex flex-col xl:flex-row gap-6 min-h-0">
        {/* Calendar Grid */}
        <div className="flex-[2] bg-white border border-slate-100 rounded-[28px] shadow-sm flex flex-col overflow-hidden">
          <div className="grid grid-cols-7 border-b border-slate-50">
            {daysOfWeek.map(day => (
              <div key={day} className="py-2.5 text-center border-r border-slate-50 last:border-r-0">
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{day.slice(0, 3)}</span>
              </div>
            ))}
          </div>

          <div className="flex-1 grid grid-cols-7 grid-rows-5 h-full">
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`offset-${i}`} className="border-r border-b border-slate-50 bg-slate-50/20" />
            ))}
            
            {monthDays.map(day => {
              const isActive = selectedDate === day;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`relative flex flex-col items-center justify-start py-4 border-r border-b border-slate-50 last:border-r-0 hover:bg-slate-50/50 transition-all group ${
                    isActive ? 'bg-blue-50/40' : ''
                  }`}
                >
                  <span className={`text-xs font-bold transition-all ${isActive ? 'text-blue-600 scale-125 font-black' : 'text-slate-700'}`}>
                    {day}
                  </span>
                  {getDotsForDate(day)}
                  {isActive && <div className="absolute bottom-1 w-1 h-1 bg-blue-600 rounded-full"></div>}
                </button>
              );
            })}
            
            {Array.from({ length: (firstDayOfMonth + daysInMonth > 35 ? 42 : 35) - (daysInMonth + firstDayOfMonth) }).map((_, i) => (
              <div key={`fill-${i}`} className="border-r border-b border-slate-50 bg-slate-50/20 last:border-r-0" />
            ))}
          </div>
        </div>

        {/* Timeline Sidebar - Conditional */}
        <div className="flex-1 flex flex-col min-w-[360px]">
          {selectedDate ? (
            <div className="bg-[#0a0f1c] text-white rounded-[32px] p-8 shadow-2xl h-full flex flex-col animate-in slide-in-from-right-8 fade-in duration-500">
              <div className="flex justify-between items-start mb-8 shrink-0">
                <div className="space-y-1">
                  <span className="text-[11px] font-black uppercase tracking-[0.25em] text-[#4d79ff]">TIMELINE</span>
                  <h2 className="text-4xl font-bold tracking-tight text-white">{selectedDate} {monthNames[currentMonth].slice(0, 3)} {currentYear}</h2>
                </div>
                <button className="p-3 bg-[#1e2330] hover:bg-[#2b3142] rounded-2xl transition-all hover:scale-110 active:scale-95">
                  <Maximize2 className="w-5 h-5 text-white/80" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto pr-3 space-y-5 scrollbar-thin scrollbar-thumb-white/10">
                {selectedDateEvents.length > 0 ? (
                  selectedDateEvents.map(event => (
                    <div key={event.id} className="bg-[#1e2330] hover:bg-[#252b3a] border border-white/5 p-6 rounded-[24px] transition-all group cursor-pointer active:scale-[0.98] animate-in fade-in slide-in-from-bottom-4 duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl ${
                          event.category === 'Hackathon' ? 'bg-purple-600 text-white' : 
                          event.category === 'Tech' ? 'bg-blue-600 text-white' :
                          event.category === 'Culture' ? 'bg-orange-600 text-white' : 'bg-emerald-600 text-white'
                        }`}>
                          {event.category === 'Hackathon' ? 'HACKATHON' : event.category.toUpperCase()}
                        </span>
                        <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
                      </div>
                      
                      <h3 className="text-xl font-bold text-white mb-5 leading-tight group-hover:text-blue-400 transition-colors">
                        {event.title}
                      </h3>
                      
                      <div className="flex items-center space-x-6 text-[13px] font-medium text-slate-400">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2.5 text-slate-500" /> 
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-2.5 text-slate-500" /> 
                          {event.location}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="h-full flex flex-col items-center justify-center space-y-4 border-2 border-dashed border-white/5 rounded-[32px] py-16">
                    <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-2">
                      <Sparkles className="w-8 h-8 text-white/10" />
                    </div>
                    <p className="text-[12px] font-bold text-white/20 uppercase tracking-[0.2em]">No events for this day</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center space-y-6 border-2 border-dashed border-slate-100 rounded-[32px] bg-slate-50/30 p-12 text-center animate-in fade-in duration-700">
              <div className="w-20 h-20 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-center justify-center">
                <CalendarIcon className="w-10 h-10 text-slate-200" />
              </div>
              <div className="max-w-[200px]">
                <p className="text-[14px] font-bold text-slate-400 uppercase tracking-widest mb-2">Detailed Timeline</p>
                <p className="text-[12px] text-slate-300 font-medium leading-relaxed">Select a date from the calendar to view scheduled sessions and events.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
