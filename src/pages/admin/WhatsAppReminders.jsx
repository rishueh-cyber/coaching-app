import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiMessageCircle, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function WhatsAppReminders() {
  const { students } = useData();
  const [message, setMessage] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [sentStatus, setSentStatus] = useState(null);

  const courses = ['All', ...new Set(students.map(s => s.course))];

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Simulate API Call sending messages to WhatsApp
    setSentStatus('Sending...');
    setTimeout(() => {
      setSentStatus('Messages sent successfully!');
      setMessage('');
      setTimeout(() => setSentStatus(null), 3000);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-10 max-w-4xl">
      <div>
        <h1 className="text-3xl font-display font-bold">WhatsApp Reminders</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Send bulk notifications or fee reminders directly to student WhatsApp numbers.</p>
      </div>

      <div className="bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col md:flex-row">
        
        {/* Left Side: Form */}
        <form onSubmit={handleSend} className="flex-1 p-6 space-y-6 border-r border-slate-200 dark:border-white/10">
          {sentStatus === 'Messages sent successfully!' && (
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-xl text-sm font-semibold border border-emerald-200">
              ✔️ {sentStatus}
            </div>
          )}
          
          <div>
            <label className="block text-sm font-semibold mb-2">Target Audience</label>
            <select 
              value={selectedCourse} 
              onChange={e => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-3 bg-slate-50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue text-sm"
            >
              {courses.map(c => <option key={c} value={c}>{c === 'All' ? 'All Students' : c}</option>)}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2 flex justify-between">
              Message Content
              <span className="font-normal text-xs text-slate-400">Basic Markdown / Emojis supported</span>
            </label>
            <textarea 
              rows={6}
              value={message}
              onChange={e => setMessage(e.target.value)}
              placeholder="e.g. Dear Student, gentle reminder regarding tomorrow's test at 9AM... 📚"
              className="w-full px-4 py-3 bg-slate-50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue text-sm dark:text-white resize-none"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            disabled={sentStatus === 'Sending...'}
            className="brutal-btn w-full flex justify-center items-center gap-2 bg-[#25D366] text-white hover:bg-[#128C7E] border-none"
          >
            {sentStatus === 'Sending...' ? (
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
            ) : (
              <>
                <FiSend size={18} />
                Send via WhatsApp API
              </>
            )}
          </button>
        </form>

        {/* Right Side: Preview */}
        <div className="flex-1 bg-[#E1E0DC] dark:bg-[#0B141A] p-6 relative flex flex-col justify-end min-h-[400px]">
          <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png")' }}></div>
          
          <div className="relative z-10 w-full max-w-[85%] self-end bg-[#D9FDD3] dark:bg-[#005C4B] p-3 rounded-2xl rounded-tr-none shadow-sm text-sm text-slate-800 dark:text-slate-100 whitespace-pre-wrap word-break">
            {message || "Your message preview will appear here in WhatsApp style..."}
            <div className="text-[10px] text-right text-slate-500 dark:text-slate-300 mt-1 opacity-70">
              Just now ✓✓
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
