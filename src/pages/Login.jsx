import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiArrowLeft, FiLock, FiMail } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const roleType = new URLSearchParams(location.search).get('type') || 'student'; // 'admin' or 'student'

  const [email, setEmail] = useState(roleType === 'admin' ? 'admin@raiseme.com' : 'amit@student.com');
  const [password, setPassword] = useState(roleType === 'admin' ? 'admin123' : 'student123');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    const result = login(email, password, roleType);
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
          <div className="w-12 h-12 bg-electric-blue rounded-xl mx-auto flex items-center justify-center text-white font-display font-bold shadow-brutal-sm mb-4">
            RM
          </div>
          <h2 className="text-3xl font-display font-bold tracking-tight">
            {roleType === 'admin' ? 'Staff Login' : 'Student Login'}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Welcome back to Raise Me
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-xl text-sm font-semibold text-center border border-red-200 dark:border-red-800/50">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
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
                className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-transparent outline-none transition-all dark:text-white"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                <FiLock size={18} />
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl focus:ring-2 focus:ring-electric-blue focus:border-transparent outline-none transition-all dark:text-white"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <div className="pt-2">
            <button type="submit" className="brutal-btn w-full">
              Sign In
            </button>
          </div>
          
          <div className="text-center text-xs text-slate-500 mt-4 h-10">
             Try using the prepopulated credentials for the demo.
          </div>
          <div className="text-center text-sm font-medium mt-2">
            Don't have an account? <span onClick={() => navigate('/register')} className="text-electric-blue cursor-pointer hover:underline">Sign Up</span>
          </div>
        </form>
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
