import { useAuth } from '../../context/AuthContext';
import { FiLogOut, FiMoon, FiSun, FiBook, FiVideo, FiBell } from 'react-icons/fi';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const { user } = useAuth();

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-8 md:p-10 border-0 bg-gradient-to-br from-electric-blue/10 to-neon-violet/10 dark:from-electric-blue/20 dark:to-neon-violet/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold mb-2">Hello, {user?.name}! 👋</h2>
          <p className="text-slate-600 dark:text-slate-300">You are enrolled in <span className="font-semibold text-electric-blue dark:text-blue-400">{user?.course || 'General Program'}</span>. Stay focused and keep learning.</p>
        </div>
        <div className="shrink-0 bg-white dark:bg-obsidian rounded-2xl p-4 shadow-sm border border-white/50 dark:border-white/10 text-center min-w-[150px]">
          <p className="text-sm font-semibold text-slate-500 mb-1">Attendance</p>
          <p className="text-3xl font-display font-bold text-emerald-500">92%</p>
        </div>
      </div>

      {/* Quick Access Grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-obsidian-light p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
            <FiBook size={24} />
          </div>
          <h3 className="text-lg font-bold font-display">Notes & Study Maps</h3>
          <p className="text-sm text-slate-500 mt-2">Access your daily PDF notes and syllabus materials.</p>
        </div>

        <div className="bg-white dark:bg-obsidian-light p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-neon-violet rounded-xl flex items-center justify-center mb-4">
            <FiVideo size={24} />
          </div>
          <h3 className="text-lg font-bold font-display">Video Lectures</h3>
          <p className="text-sm text-slate-500 mt-2">Watch recorded sessions and live class playbacks.</p>
        </div>

        <div className="bg-white dark:bg-obsidian-light p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-4">
            <FiBell size={24} />
          </div>
          <h3 className="text-lg font-bold font-display">Notifications</h3>
          <p className="text-sm text-slate-500 mt-2">View important reminders and exam announcements.</p>
        </div>
      </div>

    </div>
  );
}
