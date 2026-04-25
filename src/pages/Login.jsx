import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiArrowLeft, FiLock, FiMail, FiUser, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const roleType = new URLSearchParams(location.search).get('type') || 'student'; // 'admin' or 'student'

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    const result = login(identifier, password, roleType);
    if (result.success) {
      if (result.role === 'admin' || result.role === 'teacher') navigate('/admin');
      if (result.role === 'student') navigate('/student');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-animated-mesh flex items-center justify-center p-6 relative overflow-hidden">
      
      {/* Back button */}
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 soft-brutal-btn flex items-center gap-2 z-50"
      >
        <FiArrowLeft size={18} />
        <span className="hidden sm:inline">Back</span>
      </button>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-panel w-full max-w-md p-8 relative z-10"
      >
        <div className="text-center mb-8">
          <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center text-white font-display font-bold shadow-brutal mb-4 ${roleType === 'admin' ? 'bg-electric-blue' : 'bg-neon-violet'}`}>
            {roleType === 'admin' ? <FiUser size={30} /> : <FiLock size={30} />}
          </div>
          <h2 className="text-3xl font-display font-bold tracking-tight">
            {roleType === 'admin' ? 'Staff Portal' : 'Student Portal'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            {roleType === 'admin' ? 'Login with your Staff Email' : 'Login with your Student ID (RM-ID)'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl text-sm font-semibold text-center border border-red-200 dark:border-red-800/50">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">
              {roleType === 'admin' ? 'Email Address' : 'Student Login ID'}
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                {roleType === 'admin' ? <FiMail size={18} /> : <FiUser size={18} />}
              </div>
              <input 
                type="text" 
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-transparent outline-none transition-all dark:text-white"
                placeholder={roleType === 'admin' ? "e.g. admin@raiseme.com" : "e.g. RM-2026-001"}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">Security Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <FiLock size={18} />
              </div>
              <input 
                type={showPassword ? 'text' : 'password'} 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-11 py-3 bg-white/50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-transparent outline-none transition-all dark:text-white"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-electric-blue transition-colors"
                title={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className={`w-full brutal-btn border-none text-white font-bold py-3 ${roleType === 'admin' ? 'bg-electric-blue hover:bg-blue-600' : 'bg-neon-violet hover:bg-violet-600'}`}>
              Login to Dashboard
            </button>
          </div>
          
          <div className="text-center text-xs text-slate-500 mt-4">
             Admins can view and generate student credentials from the Management Panel.
          </div>
        </form>
      </motion.div>

      {/* Developer Footer */}
      <footer className="absolute bottom-4 w-full text-center z-50">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          Developed by Rishu • <a href="tel:8009880918" className="hover:text-electric-blue transition-colors">8009880918</a>
        </p>
      </footer>

    </div>
  );
}
