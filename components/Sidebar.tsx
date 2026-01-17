
import React from 'react';
import { 
  Home, 
  GitBranch, 
  Users, 
  Calendar, 
  Zap, 
  Trophy, 
  HelpCircle, 
  MessageCircle, 
  Flag,
  PartyPopper,
  BookOpen
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const menuItems = [
    { name: 'My Timeline', icon: GitBranch },
    { name: 'Expert Sessions', icon: Users },
    { name: 'Calendar', icon: Calendar },
    { name: 'Arena', icon: Zap },
    { name: 'Leaderboard', icon: Trophy },
    { name: 'Events', icon: PartyPopper, isNew: true }, // Requested Section
    { name: 'Question of the Day', icon: BookOpen },
  ];

  const subjects = [
    'DSA - D',
    'DSA Lab 1 - D',
    'Maths II - D',
    'Maths II Tut 1 - D',
    'WAP - D',
    'WAP Lab 1 - D',
  ];

  return (
    <aside className="w-64 border-r border-slate-200 bg-white flex flex-col h-full shrink-0">
      {/* Top Section - App Context */}
      <div className="p-4 border-b border-slate-100 mb-2">
        <div className="flex flex-col">
          <span className="text-sm font-bold text-slate-800">S2'25 CS+AI RU</span>
          <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded w-fit mt-1 uppercase tracking-wider">
            Enrolled
          </span>
        </div>
      </div>

      {/* Primary Navigation */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <button 
          onClick={() => setActiveTab('Home')}
          className={`flex items-center w-full px-4 py-2.5 rounded-xl transition-all ${
            activeTab === 'Home' 
              ? 'bg-blue-50 text-blue-600 font-semibold' 
              : 'text-slate-500 hover:bg-slate-50'
          }`}
        >
          <Home className="w-5 h-5 mr-3" />
          <span className="text-sm">Home</span>
        </button>

        {/* Subjects List */}
        <div className="mt-6">
          <div className="px-4 py-2 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Subjects</div>
          <div className="space-y-0.5 mt-1">
            {subjects.map(subject => (
              <button 
                key={subject}
                className="flex items-center w-full px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg transition-colors"
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Tools and Sections */}
        <div className="mt-6 border-t border-slate-100 pt-4">
          {menuItems.map(item => (
            <button 
              key={item.name}
              onClick={() => setActiveTab(item.name)}
              className={`group flex items-center justify-between w-full px-4 py-2.5 rounded-xl transition-all ${
                activeTab === item.name 
                  ? 'bg-blue-50 text-blue-600 font-semibold' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center">
                <item.icon className="w-5 h-5 mr-3" />
                <span className="text-sm">{item.name}</span>
              </div>
              {item.isNew && (
                <span className="text-[10px] bg-orange-100 text-orange-600 font-bold px-1.5 py-0.5 rounded uppercase">New</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Footer Support Actions */}
      <div className="p-3 border-t border-slate-100 space-y-1">
        <button className="flex items-center w-full px-4 py-2 text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-xl transition-colors font-medium">
          <Flag className="w-4 h-4 mr-3" />
          <span className="text-sm">Share a Concern</span>
        </button>
        <button className="flex items-center w-full px-4 py-2 text-slate-500 hover:bg-slate-50 rounded-xl transition-colors">
          <HelpCircle className="w-4 h-4 mr-3" />
          <span className="text-sm">Help & Support</span>
        </button>
      </div>
    </aside>
  );
};
