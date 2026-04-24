import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';
import { FiMessageSquare, FiSend, FiX, FiMinus } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatBot() {
  const { user } = useAuth();
  const { messages, sendMessage } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const studentMessages = messages.filter(m => m.studentId === user.id);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [studentMessages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = {
      studentId: user.id,
      studentName: user.name,
      text: input,
      sender: 'student',
    };

    sendMessage(newMessage);
    setInput('');

    // Simulate auto-reply from admin for "wow" effect
    if (input.toLowerCase().includes('hello') || input.toLowerCase().includes('hi')) {
      setTimeout(() => {
        sendMessage({
          studentId: user.id,
          studentName: user.name,
          text: `Hello ${user.name}! How can we help you today?`,
          sender: 'admin',
        });
      }, 1000);
    }
  };

  if (!user || user.role !== 'student') return null;

  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white dark:bg-obsidian-light w-[350px] h-[450px] rounded-2xl shadow-2xl border border-slate-200 dark:border-white/10 flex flex-col overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-electric-blue to-neon-violet text-white flex justify-between items-center shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold">
                  A
                </div>
                <div>
                  <h4 className="text-sm font-bold">Admin Support</h4>
                  <p className="text-[10px] opacity-80">Online • Typically replies in minutes</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded transition-colors"><FiMinus size={18} /></button>
              </div>
            </div>

            {/* Messages Area */}
            <div 
              ref={scrollRef}
              className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-obsidian/30 scrollbar-hide"
            >
              {studentMessages.length === 0 && (
                <div className="text-center py-10">
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 text-electric-blue rounded-full mx-auto mb-3 flex items-center justify-center">
                    <FiMessageSquare size={24} />
                  </div>
                  <p className="text-xs text-slate-500 px-6">Hello! Feel free to ask anything about your course, fees, or materials.</p>
                </div>
              )}
              {studentMessages.map((msg) => (
                <div 
                  key={msg.id} 
                  className={`flex ${msg.sender === 'student' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'student' 
                      ? 'bg-electric-blue text-white rounded-tr-none' 
                      : 'bg-white dark:bg-obsidian border border-slate-100 dark:border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text}
                    <div className={`text-[9px] mt-1 opacity-60 ${msg.sender === 'student' ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSend} className="p-3 bg-white dark:bg-obsidian-light border-t border-slate-100 dark:border-white/10 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-slate-50 dark:bg-obsidian border border-slate-200 dark:border-white/10 rounded-full text-sm outline-none focus:border-electric-blue dark:text-white"
              />
              <button 
                type="submit"
                className="w-10 h-10 bg-electric-blue text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
              >
                <FiSend size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-electric-blue to-neon-violet text-white rounded-full flex items-center justify-center shadow-2xl relative"
      >
        {isOpen ? <FiX size={24} /> : <FiMessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-obsidian">
            !
          </span>
        )}
      </motion.button>
    </div>
  );
}
