
import React from 'react';
import { TaskCard } from './TaskCard';
import { Task } from '../types';
import { History, Clock, ChevronLeft, ChevronRight } from 'lucide-react';

export const MainDashboard: React.FC = () => {
  const latestReleased: Task[] = [
    {
      id: '1',
      subject: 'DSA - D',
      type: 'Post Class',
      title: 'RAM Model, Time and Space Complexity, Order of Growth, Big O...',
      deadline: 'Jan 20th 2026, 1:35 pm',
      xpValue: 80,
      solved: 0,
      total: 2,
    },
    {
      id: '2',
      subject: 'WAP Lab 1 - D',
      type: 'In Class',
      title: 'JavaScript Functions, JavaScript Function Expression, JavaScript...',
      deadline: 'Jan 20th 2026, 1:24 pm',
      xpValue: 80,
      solved: 3,
      total: 3,
    },
    {
      id: '3',
      subject: 'WAP - D',
      type: 'Post Class',
      title: 'JavaScript Functions, JavaScript Function Expression, JavaScript...',
      deadline: 'Jan 19th 2026, 1:05 pm',
      xpValue: 160,
      solved: 0,
      total: 4,
    }
  ];

  const upcomingDeadlines: Task[] = [
    {
      id: '4',
      subject: 'DSA - D',
      type: 'Post Class',
      title: 'Brute Force Implementation, Brute Force - Post Class',
      deadline: 'Jan 18th 2026, 1:00 pm',
      xpValue: 60,
      solved: 0,
      total: 2,
      isDueTomorrow: true
    },
    {
      id: '5',
      subject: 'DSA Lab 1 - D',
      type: 'In Class',
      title: 'Problem Solving and Implementation - In Class',
      deadline: 'Jan 19th 2026, 10:41 am',
      xpValue: 80,
      solved: 1,
      total: 2,
      isDueTomorrow: true
    },
    {
      id: '6',
      subject: 'WAP - D',
      type: 'Post Class',
      title: 'JavaScript Functions, JavaScript Function Expression, JavaScript...',
      deadline: 'Jan 19th 2026, 1:05 pm',
      xpValue: 160,
      solved: 0,
      total: 4,
    }
  ];

  const renderSection = (title: string, sub: string, tasks: Task[], Icon: any) => (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white border border-slate-100 rounded-xl flex items-center justify-center mr-4 shadow-sm">
            <Icon className="w-5 h-5 text-slate-500" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">{title}</h2>
            <p className="text-xs text-slate-400 font-medium">{sub}</p>
          </div>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 border border-slate-100 rounded-lg bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button className="p-2 border border-slate-100 rounded-lg bg-white text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="flex space-x-5 overflow-x-auto pb-4 scrollbar-hide">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </section>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {renderSection("Latest Released", "All your tasks released recently", latestReleased, History)}
      {renderSection("Upcoming Deadlines", "Tasks that are due", upcomingDeadlines, Clock)}
    </div>
  );
};
