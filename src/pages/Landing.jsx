import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMoon as Moon, FiSun as Sun, FiArrowRight as ArrowRight, FiUser as UserCircle, FiBook as GraduationCap, FiVideo as Video, FiFileText as FileText, FiBell as Bell } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Landing() {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setDarkMode(!darkMode);
  };

  return (
    <div className="min-h-screen bg-animated-mesh flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Navbar overlay */}
      <nav className="fixed top-0 w-full p-6 flex justify-between items-center z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-electric-blue rounded-xl flex items-center justify-center text-white font-display font-bold shadow-brutal-sm">
            RM
          </div>
          <span className="font-display font-bold text-xl tracking-tight hidden sm:block">RAISE ME COACHING CENTRE</span>
        </div>

        <button 
          onClick={toggleTheme}
          className="soft-brutal-btn flex items-center gap-2 cursor-pointer"
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          <span className="hidden sm:inline">{darkMode ? 'Light' : 'Dark'}</span>
        </button>
      </nav>

      {/* Main glass central panel */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="glass-panel max-w-5xl w-full p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-8 items-center"
      >
        <div className="flex-1 space-y-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-block px-4 py-1.5 rounded-full bg-electric-blue/10 dark:bg-electric-blue/20 text-electric-blue dark:text-blue-300 font-semibold text-sm border border-electric-blue/20"
          >
            v2.0 Beta Preview
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-display font-black tracking-tight leading-tight">
            Manage your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-blue to-neon-violet">
              Coaching Center
            </span>
            <br/> with brutal efficiency.
          </h1>
          
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-lg">
            Say goodbye to messy spreadsheets. Track fees, distribute syllabus, and share video lectures all in one beautiful platform.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => navigate('/login?type=admin')} 
              className="brutal-btn flex items-center gap-2 group cursor-pointer"
            >
              Login as Admin
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => navigate('/login?type=student')} 
              className="soft-brutal-btn flex items-center gap-2 cursor-pointer"
            >
              <UserCircle size={20} />
              Student Portal
            </button>
            <button 
              onClick={() => navigate('/register')} 
              className="px-6 py-2.5 rounded-xl border-2 border-slate-200 dark:border-white/10 font-bold hover:bg-slate-100 dark:hover:bg-white/5 transition-all cursor-pointer"
            >
              Sign Up
            </button>
          </div>
        </div>

        {/* Floating preview cards */}
        <div className="flex-1 w-full max-w-md relative grid grid-cols-2 gap-4">
          <motion.div 
            animate={{ y: [0, -10, 0] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel p-6 aspect-square flex flex-col items-center justify-center gap-4 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 text-electric-blue flex items-center justify-center">
              <GraduationCap size={32} />
            </div>
            <span className="font-bold font-display">Students</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="glass-panel p-6 aspect-square flex flex-col items-center justify-center gap-4 text-center mt-8"
          >
            <div className="w-16 h-16 rounded-full bg-purple-100 dark:bg-purple-900/30 text-neon-violet flex items-center justify-center">
              <Video size={32} />
            </div>
            <span className="font-bold font-display">Lectures</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, -8, 0] }} 
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="glass-panel p-6 aspect-square flex flex-col items-center justify-center gap-4 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 flex items-center justify-center">
              <Bell size={32} />
            </div>
            <span className="font-bold font-display">Reminders</span>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 12, 0] }} 
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="glass-panel p-6 aspect-square flex flex-col items-center justify-center gap-4 text-center mt-8"
          >
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 flex items-center justify-center">
              <FileText size={32} />
            </div>
            <span className="font-bold font-display">Materials</span>
          </motion.div>

        </div>
      </motion.div>

      {/* Developer Footer */}
      <footer className="absolute bottom-4 w-full text-center z-50">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Developed by Rishu • <a href="tel:8009880918" className="hover:text-electric-blue transition-colors">8009880918</a> • <a href="mailto:rishueh@gmail.com" className="hover:text-electric-blue transition-colors">rishueh@gmail.com</a>
        </p>
      </footer>

    </div>
  );
}
