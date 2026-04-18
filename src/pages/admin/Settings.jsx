import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiSave, FiUser, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Settings() {
  const { user, updateUser } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUser(name, email);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 pb-10 max-w-2xl">
      <div>
        <h1 className="text-3xl font-display font-bold">{user?.role === 'admin' ? 'Admin Profile' : 'Profile Settings'}</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Update your account details and contact information.</p>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden"
      >
        <div className="p-6 border-b border-slate-200 dark:border-white/10 flex items-center gap-6">
          <div className="w-20 h-20 bg-electric-blue rounded-full text-white flex items-center justify-center text-3xl font-bold">
            {user?.avatar || 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold font-display">{user?.name}</h2>
            <p className="text-slate-500 capitalize">{user?.role} Account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {isSaved && (
            <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm font-semibold border border-emerald-200 dark:border-emerald-800/50">
              Profile updated successfully!
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <FiUser size={18} />
              </div>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-transparent outline-none transition-all dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <FiMail size={18} />
              </div>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-slate-50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-transparent outline-none transition-all dark:text-white"
                required
              />
            </div>
          </div>

          <button type="submit" className="brutal-btn flex items-center gap-2">
            <FiSave size={18} />
            Save Changes
          </button>
        </form>
      </motion.div>
    </div>
  );
}
