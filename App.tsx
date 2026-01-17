
import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { MainDashboard } from './components/MainDashboard';
import { RightPanel } from './components/RightPanel';
import { EventsPage } from './components/EventsPage';
import { FullCalendarPage } from './components/FullCalendarPage';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('Home');

  const renderContent = () => {
    switch (activeTab) {
      case 'Events':
        return <EventsPage setActiveTab={setActiveTab} />;
      case 'Calendar':
        return <FullCalendarPage />;
      default:
        return <MainDashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8f9fa] overflow-hidden text-slate-700">
      {/* Sidebar - Fixed Left */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Right side container */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto p-6 min-w-0">
            {renderContent()}
          </main>
          
          {/* Right Sidebar - Fixed Info Panel - Only shown on Home */}
          {activeTab === 'Home' && <RightPanel setActiveTab={setActiveTab} />}
        </div>
      </div>
    </div>
  );
};

export default App;
