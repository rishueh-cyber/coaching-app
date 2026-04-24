import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiSend, FiUser, FiMessageSquare } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AdminMessages() {
  const { messages, sendMessage, students } = useData();
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [reply, setReply] = useState('');

  // Group messages by student
  const studentsWithMessages = [...new Set(messages.map(m => m.studentId))].map(id => {
    return students.find(s => s.id === id) || { id, name: 'Unknown Student' };
  });

  const selectedStudentMessages = messages.filter(m => m.studentId === selectedStudentId);

  const handleReply = (e) => {
    e.preventDefault();
    if (!reply.trim() || !selectedStudentId) return;

    sendMessage({
      studentId: selectedStudentId,
      studentName: studentsWithMessages.find(s => s.id === selectedStudentId)?.name || 'Student',
      text: reply,
      sender: 'admin',
    });
    setReply('');
  };

  return (
    <div className="h-[calc(100vh-180px)] flex flex-col md:flex-row gap-6">
      
      {/* Students List */}
      <div className="w-full md:w-80 bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
        <div className="p-4 border-b border-slate-200 dark:border-white/10 font-bold font-display">
          Conversations
        </div>
        <div className="flex-1 overflow-y-auto">
          {studentsWithMessages.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-sm italic">
              No messages yet.
            </div>
          )}
          {studentsWithMessages.map((student) => {
            const lastMsg = messages.filter(m => m.studentId === student.id).slice(-1)[0];
            return (
              <button 
                key={student.id}
                onClick={() => setSelectedStudentId(student.id)}
                className={`w-full p-4 flex items-center gap-3 border-b border-slate-50 dark:border-white/5 transition-colors text-left
                  ${selectedStudentId === student.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-4 border-l-electric-blue' : 'hover:bg-slate-50 dark:hover:bg-white/5'}
                `}
              >
                <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center font-bold">
                  {student.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm truncate">{student.name}</p>
                  <p className="text-xs text-slate-500 truncate">{lastMsg?.text}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden flex flex-col">
        {selectedStudentId ? (
          <>
            <div className="p-4 border-b border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-white/5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-electric-blue text-white flex items-center justify-center font-bold">
                {studentsWithMessages.find(s => s.id === selectedStudentId)?.name[0]}
              </div>
              <h3 className="font-bold">Chatting with {studentsWithMessages.find(s => s.id === selectedStudentId)?.name}</h3>
            </div>
            
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30 dark:bg-obsidian/20">
              {selectedStudentMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] p-3 rounded-2xl text-sm shadow-sm ${
                    msg.sender === 'admin' 
                      ? 'bg-electric-blue text-white rounded-tr-none' 
                      : 'bg-white dark:bg-obsidian border border-slate-100 dark:border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text}
                    <div className={`text-[9px] mt-1 opacity-60 ${msg.sender === 'admin' ? 'text-right' : 'text-left'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleReply} className="p-4 bg-white dark:bg-obsidian-light border-t border-slate-100 dark:border-white/10 flex gap-3">
              <input 
                type="text" 
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Type your reply..."
                className="flex-1 px-4 py-3 bg-slate-50 dark:bg-obsidian border border-slate-200 dark:border-white/10 rounded-xl text-sm outline-none focus:border-electric-blue dark:text-white"
              />
              <button 
                type="submit"
                className="brutal-btn px-6 flex items-center gap-2"
              >
                <FiSend size={18} />
                Reply
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 p-10 text-center">
            <div className="w-20 h-20 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
              <FiMessageSquare size={40} />
            </div>
            <h3 className="text-xl font-bold font-display text-slate-600 dark:text-slate-300">No student selected</h3>
            <p className="text-sm max-w-xs mt-2">Select a student from the left sidebar to start messaging and solving their queries.</p>
          </div>
        )}
      </div>

    </div>
  );
}
