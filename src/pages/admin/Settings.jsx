import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FiSave, FiUser, FiMail, FiBook, FiPlus, FiTrash2, FiBell } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Settings() {
  const { user, updateUser } = useAuth();
  const { courses, addCourse, removeCourse, settings, updateSettings } = useData();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [newCourse, setNewCourse] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(name, email);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleAddCourse = (e) => {
    e.preventDefault();
    if (newCourse.trim()) {
      addCourse(newCourse.trim());
      setNewCourse('');
    }
  };

  return (
    <div className="space-y-10 pb-10 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold">{user?.role === 'admin' ? 'Admin Control Center' : 'Profile Settings'}</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Manage courses, automation settings, and your personal profile.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Profile Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 dark:border-white/10 font-bold font-display flex items-center gap-2">
            <FiUser className="text-electric-blue" />
            Profile Details
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {isSaved && (
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm font-semibold border border-emerald-200">
                Profile updated successfully!
              </div>
            )}
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-obsidian border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue" required />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1 ml-1">Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2.5 bg-slate-50 dark:bg-obsidian border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue" required />
            </div>
            <button type="submit" className="brutal-btn w-full mt-2 py-2.5">Save Profile</button>
          </form>
        </motion.div>

        {/* Automation Settings */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden"
        >
          <div className="p-6 border-b border-slate-200 dark:border-white/10 font-bold font-display flex items-center gap-2">
            <FiBell className="text-amber-500" />
            Automation & Alerts
          </div>
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-bold text-sm">Auto-Send Fee Reminders</p>
                <p className="text-xs text-slate-500">Automatically send WhatsApp alerts to students with pending fees.</p>
              </div>
              <button 
                onClick={() => updateSettings({ autoReminders: !settings.autoReminders })}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoReminders ? 'bg-emerald-500' : 'bg-slate-300'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.autoReminders ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            
            <div className="pt-4 border-t border-slate-100 dark:border-white/5">
              <p className="font-bold text-sm mb-3">Reminder Frequency</p>
              <div className="flex gap-2">
                {['Weekly', 'Monthly', 'Before Exams'].map(f => (
                  <button key={f} className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:border-electric-blue transition-colors">
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Course Management */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden md:col-span-2"
        >
          <div className="p-6 border-b border-slate-200 dark:border-white/10 font-bold font-display flex items-center gap-2">
            <FiBook className="text-neon-violet" />
            Course Management
          </div>
          <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-sm font-semibold mb-3">Active Courses</p>
              <div className="flex flex-wrap gap-2">
                {courses.map(course => (
                  <div key={course} className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-xl text-sm border border-blue-100 dark:border-blue-800/50">
                    {course}
                    <button onClick={() => removeCourse(course)} className="hover:text-red-500 transition-colors">
                      <FiTrash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3">Add New Course</p>
              <form onSubmit={handleAddCourse} className="flex gap-2">
                <input 
                  type="text" 
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  placeholder="e.g. Physics Masters"
                  className="flex-1 px-4 py-2 bg-slate-50 dark:bg-obsidian border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue text-sm"
                />
                <button type="submit" className="soft-brutal-btn py-2 flex items-center gap-2">
                  <FiPlus />
                  Add
                </button>
              </form>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
