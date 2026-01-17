
import React from 'react';
import { ChevronDown, Bell, UserPlus, Search } from 'lucide-react';

export const TopBar: React.FC = () => {
  return (
    <header className="h-14 border-b border-slate-200 bg-white px-6 flex items-center justify-between shrink-0 sticky top-0 z-30">
      <div className="flex items-center space-x-4">
        {/* Branch Selector */}
        <button className="flex items-center bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-100 transition-colors">
          <div className="w-5 h-5 bg-blue-600 rounded flex items-center justify-center mr-2">
            <span className="text-[10px] text-white font-bold">N</span>
          </div>
          <span className="text-sm font-semibold text-slate-700">NST'25 CS+AI RU</span>
          <ChevronDown className="w-4 h-4 ml-2 text-slate-400" />
        </button>

        {/* Athena Banner */}
        <div className="hidden lg:flex items-center bg-orange-50 px-4 py-1 rounded-full border border-orange-100">
          <span className="text-xs text-orange-800 font-medium mr-2">Download the latest version of Athena.</span>
          <button className="bg-orange-500 hover:bg-orange-600 text-white text-[10px] font-bold px-3 py-0.5 rounded-full transition-colors">
            Download
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-6">
        {/* XP Tracker */}
        <div className="flex items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <span className="text-xs font-bold text-slate-500 mr-1.5 uppercase tracking-wide">Total XP</span>
          <div className="flex items-center bg-white px-2 py-0.5 rounded-full shadow-sm border border-slate-100">
            <div className="w-4 h-4 bg-orange-400 rounded-full flex items-center justify-center mr-1.5">
              <Zap className="w-2.5 h-2.5 text-white fill-white" />
            </div>
            <span className="text-sm font-bold text-slate-800 tracking-tight">2,366</span>
          </div>
        </div>

        {/* Icons and Profile */}
        <div className="flex items-center space-x-4">
          <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 relative">
            <UserPlus className="w-5 h-5" />
          </button>
          <button className="text-slate-400 hover:text-slate-600 transition-colors p-1 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
          <div className="flex items-center space-x-2 pl-4 border-l border-slate-200 cursor-pointer group">
            <img 
              src="https://picsum.photos/id/64/32/32" 
              alt="User" 
              className="w-8 h-8 rounded-full object-cover border-2 border-slate-100 group-hover:border-blue-400 transition-colors"
            />
            <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
          </div>
        </div>
      </div>
    </header>
  );
};

import { Zap } from 'lucide-react';
