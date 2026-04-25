import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FiMessageCircle, FiSend, FiUser, FiDollarSign } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function WhatsAppReminders() {
  const { user } = useAuth();
  const { students, sendMessage, courses } = useData();
  const [message, setMessage] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('All');
  const [sentStatus, setSentStatus] = useState(null);

  // Student specific data - match by loginId, id, or email
  const studentProfile = students.find(s => 
    s.loginId === user.loginId || 
    s.id === user.id || 
    (user.email && s.email === user.email)
  );


  if (user.role === 'student') {
    return (
      <div className="space-y-8 pb-10 max-w-4xl">
        <div className="bg-gradient-to-br from-electric-blue to-neon-violet p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-display font-bold mb-2">Help & Support</h1>
            <p className="opacity-90">Need help with your course or have questions about fees? Contact us directly.</p>
          </div>
          <div className="absolute top-0 right-0 p-20 bg-white/10 blur-3xl rounded-full -mr-20 -mt-20"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-obsidian-light p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="font-bold font-display text-lg mb-4">Direct WhatsApp Support</h3>
            <p className="text-sm text-slate-500 mb-6">Click below to chat with our administrative team regarding any queries.</p>
            <button 
              onClick={() => window.open('https://wa.me/918009880918?text=Hello%20Admin,%20I%20need%20help%20with%20my%20course.', '_blank')}
              className="brutal-btn w-full flex justify-center items-center gap-2 bg-[#25D366] text-white hover:bg-[#128C7E] border-none py-3"
            >
              <FiMessageCircle size={20} />
              Chat with Admin
            </button>
          </div>

          <div className="bg-white dark:bg-obsidian-light p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="font-bold font-display text-lg mb-4">Your Fee Reminder</h3>
            {studentProfile?.feesStatus === 'Paid' ? (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 rounded-xl border border-emerald-100 dark:border-emerald-800/50">
                <p className="font-bold text-sm">All clear! ✅</p>
                <p className="text-xs mt-1">Your fees are fully paid. Thank you!</p>
              </div>
            ) : (
              <div className="p-4 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-xl border border-rose-100 dark:border-rose-800/50">
                <p className="font-bold text-sm">Pending Fees: ₹{(studentProfile?.totalFees - studentProfile?.paidFees).toLocaleString()}</p>
                <p className="text-xs mt-1">Please clear your dues by the end of this month.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  const allCourses = ['All', ...courses];
  
  const pendingStudents = students.filter(s => s.feesStatus !== 'Paid');

  const handleSendToStudent = (student, customMsg) => {
    const text = customMsg || `Hello ${student.name}, this is a reminder from Raise Me Coaching Centre regarding your pending fees of ₹${student.totalFees - student.paidFees}. Please clear it at the earliest.`;
    
    sendMessage({
      studentId: student.id,
      studentName: student.name,
      whatsapp: student.whatsapp,
      text: text,
      sender: 'admin',
    });
  };

  const handleBulkSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const targets = students.filter(s => selectedCourse === 'All' || s.course === selectedCourse);
    
    setSentStatus(`Preparing ${targets.length} messages...`);
    
    // In a real app, we'd use a server-side API. 
    // Here we'll open the first one and notify user.
    if (targets.length > 0) {
      handleSendToStudent(targets[0], message);
    }

    setTimeout(() => {
      setSentStatus('Process started! Please allow popups to send to all.');
      setMessage('');
      setTimeout(() => setSentStatus(null), 5000);
    }, 1500);
  };

  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">WhatsApp Reminders</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Directly message students or send automated fee alerts.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Bulk Sender */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col md:flex-row">
            <form onSubmit={handleBulkSend} className="flex-1 p-6 space-y-6 border-r border-slate-200 dark:border-white/10">
              {sentStatus && (
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-xl text-sm font-semibold border border-blue-200">
                  ℹ️ {sentStatus}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-semibold mb-2">Target Audience</label>
                <select 
                  value={selectedCourse} 
                  onChange={e => setSelectedCourse(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue text-sm"
                >
                  {allCourses.map(c => <option key={c} value={c}>{c === 'All' ? 'All Students' : c}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 flex justify-between">
                  Announcement Message
                  <span className="font-normal text-xs text-slate-400">Personalized via wa.me</span>
                </label>
                <textarea 
                  rows={5}
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  placeholder="Type your announcement here..."
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-obsidian/30 border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue text-sm dark:text-white resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="brutal-btn w-full flex justify-center items-center gap-2 bg-[#25D366] text-white hover:bg-[#128C7E] border-none"
              >
                <FiSend size={18} />
                Send via Direct WhatsApp
              </button>
            </form>

            <div className="flex-1 bg-[#E1E0DC] dark:bg-[#0B141A] p-6 relative flex flex-col justify-end min-h-[300px]">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'url("https://web.whatsapp.com/img/bg-chat-tile-dark_a4be512e7195b6b733d9110b408f075d.png")' }}></div>
              <div className="relative z-10 w-full max-w-[85%] self-end bg-[#D9FDD3] dark:bg-[#005C4B] p-3 rounded-2xl rounded-tr-none shadow-sm text-sm text-slate-800 dark:text-slate-100 whitespace-pre-wrap word-break">
                {message || "Preview of your message..."}
                <div className="text-[10px] text-right text-slate-500 dark:text-slate-300 mt-1 opacity-70">
                  Just now ✓✓
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Quick Reminders List */}
        <div className="bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 font-bold font-display flex items-center gap-2">
            <FiDollarSign className="text-amber-500" />
            Pending Fee Reminders
          </div>
          <div className="flex-1 overflow-y-auto max-h-[600px]">
            {pendingStudents.length === 0 ? (
              <div className="p-8 text-center text-slate-400 italic text-sm">
                No pending fees! High five! ✋
              </div>
            ) : (
              <div className="divide-y divide-slate-100 dark:divide-white/5">
                {pendingStudents.map(student => (
                  <div key={student.id} className="p-4 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors group">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-bold text-sm">{student.name}</p>
                        <p className="text-xs text-slate-500">{student.course}</p>
                      </div>
                      <p className="text-xs font-bold text-rose-500">₹{(student.totalFees - student.paidFees).toLocaleString()}</p>
                    </div>
                    <button 
                      onClick={() => handleSendToStudent(student)}
                      className="w-full mt-2 py-1.5 bg-[#25D366]/10 hover:bg-[#25D366] text-[#128C7E] hover:text-white text-xs font-bold rounded-lg border border-[#25D366]/20 transition-all flex items-center justify-center gap-2"
                    >
                      <FiMessageCircle size={14} />
                      Send Reminder
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
