import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiPlus, FiTrash2, FiEdit, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSES } from '../../data/mockData';

export default function StudentsManagement() {
  const { students, addStudent, removeStudent, editStudentFees } = useData();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Add Form State
  const [formData, setFormData] = useState({
    name: '', phone: '', whatsapp: '', course: COURSES[0], totalFees: 20000, paidFees: 0, feesStatus: 'Pending'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    let status = 'Pending';
    if (formData.paidFees >= formData.totalFees) status = 'Paid';
    if (formData.paidFees === 0) status = 'Overdue';
    
    addStudent({ ...formData, feesStatus: status });
    setAddModalOpen(false);
    setFormData({ name: '', phone: '', whatsapp: '', course: COURSES[0], totalFees: 20000, paidFees: 0, feesStatus: 'Pending' });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (selectedStudent) {
      editStudentFees(selectedStudent.id, selectedStudent.paidFees);
      setEditModalOpen(false);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Students Directory</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage enrollments, update details, and track fees.</p>
        </div>
        <button onClick={() => setAddModalOpen(true)} className="brutal-btn flex items-center gap-2">
          <FiPlus size={20} />
          Add Student
        </button>
      </div>

      <div className="bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-500 py-3">
                <th className="p-4 font-semibold">Name & Contact</th>
                <th className="p-4 font-semibold">Course</th>
                <th className="p-4 font-semibold">Revenue (Fees Paid)</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {students.map((student) => (
                <tr key={student.id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <p className="font-bold">{student.name}</p>
                    <p className="text-xs text-slate-500">📞 {student.phone}</p>
                  </td>
                  <td className="p-4 font-medium text-slate-600 dark:text-slate-300">{student.course}</td>
                  <td className="p-4">
                    <p className="font-bold text-emerald-600 dark:text-emerald-400">₹{parseFloat(student.paidFees).toLocaleString()}</p>
                    <p className="text-xs text-slate-500">of ₹{parseFloat(student.totalFees).toLocaleString()}</p>
                  </td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      student.feesStatus === 'Paid' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                      student.feesStatus === 'Pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                      'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                    }`}>
                      {student.feesStatus}
                    </span>
                  </td>
                  <td className="p-4 flex items-center justify-end gap-2">
                    <button onClick={() => { setSelectedStudent(student); setEditModalOpen(true); }} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      <FiEdit size={18} />
                    </button>
                    <button onClick={() => removeStudent(student.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {students.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No students found. Add one!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-obsidian-light w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                <h3 className="font-display font-bold text-xl">Enroll New Student</h3>
                <button onClick={() => setAddModalOpen(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white"><FiX size={24} /></button>
              </div>
              <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Full Name</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-sm dark:text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Phone</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-sm dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">WhatsApp</label>
                    <input required type="tel" value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-sm dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Course</label>
                  <select value={formData.course} onChange={e => setFormData({...formData, course: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-sm dark:text-white">
                    {COURSES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Total Fees (₹)</label>
                    <input required type="number" min="0" value={formData.totalFees} onChange={e => setFormData({...formData, totalFees: Number(e.target.value)})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-sm dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Advanced Payment (₹)</label>
                    <input required type="number" min="0" value={formData.paidFees} onChange={e => setFormData({...formData, paidFees: Number(e.target.value)})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-sm dark:text-white" />
                  </div>
                </div>
                <button type="submit" className="w-full brutal-btn mt-4">Save Student</button>
              </form>
            </motion.div>
          </div>
        )}

        {isEditModalOpen && selectedStudent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-obsidian-light w-full max-w-sm rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                <h3 className="font-display font-bold text-lg">Update Fees</h3>
                <button onClick={() => setEditModalOpen(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white"><FiX size={20} /></button>
              </div>
              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <p className="text-sm text-slate-500">Updating revenue generated by <strong className="text-slate-800 dark:text-white">{selectedStudent.name}</strong>.</p>
                <div>
                  <label className="block text-sm font-semibold mb-1">Paid Amount (₹)</label>
                  <input required type="number" min="0" max={selectedStudent.totalFees} value={selectedStudent.paidFees} onChange={e => setSelectedStudent({...selectedStudent, paidFees: Number(e.target.value)})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-lg font-bold dark:text-white" />
                </div>
                <button type="submit" className="w-full brutal-btn">Update Revenue</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
