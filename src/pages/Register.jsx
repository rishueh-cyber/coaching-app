import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FiArrowLeft, FiUser, FiMail, FiLock } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Register() {
  const { registerUser } = useAuth();
  const navigate = useNavigate();
  const [roleType, setRoleType] = useState('student');
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    const newUser = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: roleType,
      avatar: formData.name.charAt(0).toUpperCase()
    };
    
    if (roleType === 'student') newUser.course = 'General Program';
    if (roleType === 'teacher') newUser.subject = 'General Subjects';

    const result = registerUser(newUser);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate(`/login?type=${roleType === 'student' ? 'student' : 'admin'}`), 2000);
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-animated-mesh flex items-center justify-center p-6 relative overflow-hidden">
      
      <button onClick={() => navigate('/')} className="absolute top-6 left-6 soft-brutal-btn flex items-center gap-2 z-50">
        <FiArrowLeft size={18} />
        <span className="hidden sm:inline">Back</span>
      </button>

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass-panel w-full max-w-md p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-electric-blue rounded-xl mx-auto flex items-center justify-center text-white font-display font-bold shadow-brutal-sm mb-4">RM</div>
          <h2 className="text-3xl font-display font-bold tracking-tight">Create Account</h2>
          <p className="text-slate-600 dark:text-slate-400 mt-2">Join RAISE ME COACHING CENTRE</p>
        </div>

        {/* Role Toggle */}
        <div className="flex bg-slate-100 dark:bg-obsidian/50 p-1 rounded-xl mb-6">
          <button 
            type="button"
            onClick={() => setRoleType('student')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${roleType === 'student' ? 'bg-white dark:bg-electric-blue text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
          >
            Student
          </button>
          <button 
            type="button"
            onClick={() => setRoleType('teacher')}
            className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-colors ${roleType === 'teacher' ? 'bg-white dark:bg-electric-blue text-slate-900 dark:text-white shadow-sm' : 'text-slate-500'}`}
          >
            Teacher
          </button>
        </div>

        {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl text-sm font-semibold text-center">{error}</div>}
        {success && <div className="mb-4 p-3 bg-emerald-100 text-emerald-700 rounded-xl text-sm font-semibold text-center">Account created! Redirecting to login...</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><FiUser size={18} /></div>
              <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue" placeholder="John Doe" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><FiMail size={18} /></div>
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue" placeholder="john@example.com" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-2 ml-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400"><FiLock size={18} /></div>
              <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full pl-11 pr-4 py-3 bg-white/50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue" placeholder="Create a password" />
            </div>
          </div>
          <button type="submit" className="brutal-btn w-full mt-2">Sign Up</button>
        </form>
        <div className="mt-6 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
          Already have an account? <span onClick={() => navigate('/login')} className="text-electric-blue cursor-pointer hover:underline">Log in</span>
        </div>
      </motion.div>
    </div>
  );
}
