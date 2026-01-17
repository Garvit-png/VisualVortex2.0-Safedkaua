
import React from 'react';
import { 
  Home, 
  GitBranch, 
  Users, 
  Calendar, 
  Zap, 
  Trophy, 
  HelpCircle, 
  Flag,
  PartyPopper,
  BookOpen,
  Layout
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const subjects = [
    'DSA - D',
    'DSA Lab 1 - D',
    'Maths II - D',
    'Maths II Tut 1 - D',
    'WAP - D',
    'WAP Lab 1 - D',
  ];

  const menuItems = [
    { name: 'My Timeline', icon: GitBranch },
    { name: 'Expert Sessions', icon: Users },
    { name: 'Calendar', icon: Calendar },
    { name: 'Arena', icon: Zap },
    { name: 'Leaderboard', icon: Trophy },
    { name: 'Question of the Day', icon: BookOpen },
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-full shrink-0 z-40">
      <div className="p-6 border-b border-slate-100">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Layout className="w-5 h-5 text-white" />
          </div>
          <span className="font-black text-slate-900 tracking-tight">ATHENA</span>
        </div>
        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-800">S2'25 CS+AI RU</span>
          <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full w-fit mt-1.5 uppercase tracking-widest border border-blue-100">
            Enrolled
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1 custom-scrollbar">
        <button 
          onClick={() => setActiveTab('Home')}
          className={`flex items-center w-full px-4 py-3 rounded-2xl transition-all duration-300 ${
            activeTab === 'Home' 
              ? 'bg-slate-900 text-white shadow-xl shadow-slate-200 font-bold' 
              : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'
          }`}
        >
          <Home className={`w-5 h-5 mr-3 transition-colors ${activeTab === 'Home' ? 'text-white' : 'text-slate-400'}`} />
          <span className="text-sm">Home Dashboard</span>
        </button>

        <div className="mt-8 mb-2">
          <div className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Learning</div>
        </div>
        <div className="space-y-1">
          {subjects.map(subject => (
            <button 
              key={subject}
              className="flex items-center w-full px-4 py-2 text-sm font-semibold text-slate-500 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all group"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-slate-200 mr-4 group-hover:bg-blue-400 transition-colors" />
              {subject}
            </button>
          ))}
        </div>

        <div className="mt-8 mb-2">
          <div className="px-4 text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Activity Hub</div>
          {menuItems.map(item => (
            <button 
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`group flex items-center justify-between w-full px-4 py-3 rounded-2xl transition-all ${
                activeTab === item.name 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 font-bold' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <div className="flex items-center">
                <item.icon className={`w-5 h-5 mr-3 transition-colors ${activeTab === item.name ? 'text-white' : 'text-slate-400 group-hover:text-slate-600'}`} />
                <span className="text-sm">{item.name}</span>
              </div>
            </button>
          ))}
        </div>

        {/* EVENT Section - At the bottom of main nav */}
        <div className="mt-10 mb-2">
          <div className="px-4 text-[10px] font-black text-[#2563eb] uppercase tracking-[0.3em]">Events & Rewards</div>
        </div>
        <button 
          onClick={() => setActiveTab('Events')}
          className={`group flex items-center justify-between w-full px-4 py-3 rounded-2xl transition-all duration-300 relative overflow-hidden ${
            activeTab === 'Events' 
              ? 'bg-[#2563eb] text-white shadow-xl shadow-blue-200 font-bold' 
              : 'text-slate-500 hover:bg-blue-50 hover:text-[#2563eb]'
          }`}
        >
          <div className="flex items-center relative z-10">
            <PartyPopper className={`w-5 h-5 mr-3 transition-colors ${activeTab === 'Events' ? 'text-white' : 'text-slate-400 group-hover:text-[#2563eb]'}`} />
            <span className="text-sm tracking-tight">Events Arena</span>
          </div>
          <div className={`text-[9px] font-black px-1.5 py-0.5 rounded-lg uppercase tracking-wider relative z-10 ${
            activeTab === 'Events' ? 'bg-white/20 text-white' : 'bg-orange-100 text-orange-600'
          }`}>New</div>
        </button>
      </div>

      <div className="p-4 border-t border-slate-100 space-y-2 bg-slate-50/50">
        <button className="flex items-center w-full px-4 py-2.5 text-emerald-600 bg-white border border-emerald-100 hover:bg-emerald-50 rounded-xl transition-all text-xs font-bold shadow-sm">
          <Flag className="w-4 h-4 mr-3" />
          Report Issue
        </button>
      </div>
    </aside>
  );
};
