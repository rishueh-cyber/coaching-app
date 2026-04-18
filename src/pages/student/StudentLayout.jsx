import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiHome, FiUser, FiVideo, FiBook, FiBell, FiLogOut, FiMenu, FiX, FiMoon, FiSun } from 'react-icons/fi';
import { useState } from 'react';

export default function StudentLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
    setDarkMode(!darkMode);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navItems = [
    { name: 'Dashboard', path: '/student', icon: <FiHome size={20} />, exact: true },
    { name: 'Profile', path: '/student/profile', icon: <FiUser size={20} /> },
    { name: 'Lectures', path: '/student/lectures', icon: <FiVideo size={20} /> },
    { name: 'Materials', path: '/student/materials', icon: <FiBook size={20} /> },
    { name: 'Reminders', path: '/student/reminders', icon: <FiBell size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-obsidian text-slate-900 dark:text-slate-100 flex transition-colors duration-500">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
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
          <button className="lg:hidden ml-auto text-slate-500" onClick={() => setSidebarOpen(false)}>
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
            <p className="text-xs text-slate-500 capitalize">{user?.role || 'Student'}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              end={item.exact}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all
                ${isActive ? 'bg-electric-blue text-white shadow-md' : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'}
              `}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 dark:border-white/10 space-y-2">
          <button onClick={toggleTheme} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-slate-100 dark:hover:bg-white/5 text-slate-600 dark:text-slate-400 transition-all">
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all hover:shadow-sm">
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
          <Outlet />
        </div>
      </main>
    </div>
  );
}
