import { useState, useEffect } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  FiHome, FiUsers, FiBook, FiVideo, FiBell, FiSettings, 
  FiLogOut, FiMenu, FiX, FiMoon, FiSun, FiCheck, FiDollarSign, FiMessageSquare, FiYoutube
} from 'react-icons/fi';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('rm_theme');
    if (saved) return saved === 'dark';
    return document.documentElement.classList.contains('dark');
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('rm_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('rm_theme', 'light');
    }
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: <FiHome size={20} />, exact: true },
    { name: 'Students', path: '/admin/students', icon: <FiUsers size={20} /> },
    { name: 'Attendance', path: '/admin/attendance', icon: <FiCheck size={20} /> },
    { name: 'Fees Tracking', path: '/admin/fees', icon: <FiDollarSign size={20} /> },
    { name: 'Messages', path: '/admin/messages', icon: <FiMessageSquare size={20} /> },
    { name: 'Materials', path: '/admin/materials', icon: <FiBook size={20} /> },
    { name: 'Lectures', path: '/admin/lectures', icon: <FiVideo size={20} /> },
    { name: 'YouTube Channel', path: '/admin/youtube', icon: <FiYoutube size={20} /> },
    { name: 'Reminders', path: '/admin/reminders', icon: <FiBell size={20} /> },
    { name: 'Settings', path: '/admin/settings', icon: <FiSettings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-obsidian text-slate-900 dark:text-slate-100 flex transition-colors duration-500">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-72 bg-white dark:bg-obsidian-light border-r border-slate-200 dark:border-white/10
        transform transition-transform duration-300 ease-in-out flex flex-col
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Logo area */}
        <div className="h-20 flex items-center gap-3 px-8 border-b border-slate-200 dark:border-white/10">
          <div className="w-10 h-10 bg-electric-blue rounded-xl flex items-center justify-center text-white font-display font-bold shadow-brutal-sm">
            RM
          </div>
          <span className="font-display font-bold text-lg whitespace-nowrap overflow-hidden text-ellipsis">RAISE ME COACHING CENTRE</span>
          <button 
            className="lg:hidden ml-auto text-slate-500" 
            onClick={() => setSidebarOpen(false)}
          >
            <FiX size={24} />
          </button>
        </div>

        {/* User Profile Summary */}
        <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 font-bold flex items-center justify-center text-lg">
            {user?.avatar || 'U'}
          </div>
          <div>
            <p className="font-bold">{user?.name || 'User'}</p>
            <p className="text-xs text-slate-500 capitalize">{user?.role || 'Staff'}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                ${isActive 
                  ? 'bg-electric-blue text-white shadow-md' 
                  : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-white/10 space-y-2">
          <button 
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-all"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all hover:shadow-sm"
          >
            <FiLogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="lg:hidden h-20 bg-white dark:bg-obsidian-light border-b border-slate-200 dark:border-white/10 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-electric-blue rounded-xl flex items-center justify-center text-white font-display font-bold">
              RM
            </div>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="text-slate-600 dark:text-slate-300">
            <FiMenu size={28} />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 lg:p-10 relative">
          <div className="absolute top-0 right-0 p-32 bg-blue-500/5 dark:bg-blue-500/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 p-32 bg-purple-500/5 dark:bg-purple-500/10 blur-[100px] rounded-full -z-10 pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto h-full">
            <Outlet />
          </div>
        </div>
      </main>

    </div>
  );
}
