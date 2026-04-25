import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiPlus, FiTrash2, FiEdit, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSES } from '../../data/mockData';

export default function StudentsManagement() {
  const { students, addStudent, updateStudent, removeStudent, courses } = useData();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [newlyAddedStudent, setNewlyAddedStudent] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCourse, setFilterCourse] = useState('All');

  // Add Form State
  const [formData, setFormData] = useState({
    name: '', phone: '', whatsapp: '', course: courses[0], totalFees: 20000, paidFees: 0
  });

  // Edit Form State
  const [editFormData, setEditFormData] = useState({
    name: '', phone: '', whatsapp: '', course: '', totalFees: 0, paidFees: 0
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const createdStudent = addStudent(formData);
    setNewlyAddedStudent(createdStudent);
    setAddModalOpen(false);
    setSuccessModalOpen(true);
    setFormData({ name: '', phone: '', whatsapp: '', course: courses[0], totalFees: 20000, paidFees: 0 });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (selectedStudent) {
      updateStudent(selectedStudent.id, editFormData);
      setEditModalOpen(false);
    }
  };

  const startEditing = (student) => {
    setSelectedStudent(student);
    setEditFormData({
      name: student.name,
      phone: student.phone,
      whatsapp: student.whatsapp,
      course: student.course,
      totalFees: student.totalFees,
      paidFees: student.paidFees
    });
    setEditModalOpen(true);
  };

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.phone.includes(searchTerm) ||
                          s.loginId?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === 'All' || s.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Students Directory</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Manage enrollments and provide login credentials to students.</p>
        </div>
        <button onClick={() => setAddModalOpen(true)} className="brutal-btn flex items-center gap-2">
          <FiPlus size={20} />
          Add Student
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <input 
            type="text" 
            placeholder="Search by name, ID or phone..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-4 pr-4 py-2 bg-white dark:bg-obsidian-light border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue text-sm"
          />
        </div>
        <select 
          value={filterCourse}
          onChange={(e) => setFilterCourse(e.target.value)}
          className="px-4 py-2 bg-white dark:bg-obsidian-light border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue text-sm"
        >
          <option value="All">All Courses</option>
          {courses.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-500 py-3">
                <th className="p-4 font-semibold">Student & Credentials</th>
                <th className="p-4 font-semibold">Course</th>
                <th className="p-4 font-semibold">Revenue (Fees Paid)</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center font-bold text-xs text-electric-blue">
                        {student.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold">{student.name}</p>
                        <div className="flex gap-2 items-center text-[10px] mt-0.5">
                          <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded font-mono font-bold">ID: {student.loginId || 'N/A'}</span>
                          <span className="px-1.5 py-0.5 bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 rounded font-mono font-bold">PW: {student.password || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
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
                    <button onClick={() => startEditing(student)} className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                      <FiEdit size={18} />
                    </button>
                    <button onClick={() => removeStudent(student.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors">
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No students found matching your criteria.</td>
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
                    {courses.map(c => <option key={c} value={c}>{c}</option>)}
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

        {/* Success Modal */}
        {isSuccessModalOpen && newlyAddedStudent && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-obsidian-light w-full max-w-sm rounded-3xl shadow-2xl border border-emerald-500/30 overflow-hidden text-center p-8">
              <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-500 rounded-full mx-auto flex items-center justify-center mb-6">
                <FiPlus size={40} className="rotate-45" />
              </div>
              <h3 className="text-2xl font-display font-bold mb-2 text-emerald-600">Enrollment Successful!</h3>
              <p className="text-slate-500 text-sm mb-6">Credentials for <strong>{newlyAddedStudent.name}</strong> have been generated.</p>
              
              <div className="bg-slate-50 dark:bg-obsidian p-4 rounded-2xl space-y-3 mb-6 border border-slate-200 dark:border-white/10">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">STUDENT ID</span>
                  <span className="font-mono font-bold text-electric-blue">{newlyAddedStudent.loginId}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-400">PASSWORD</span>
                  <span className="font-mono font-bold text-amber-500">{newlyAddedStudent.password}</span>
                </div>
              </div>

              <button onClick={() => setSuccessModalOpen(false)} className="w-full brutal-btn bg-emerald-600 border-none text-white">
                Done, Back to Directory
              </button>
              <p className="text-[10px] text-slate-400 mt-4 italic">Please share these credentials with the student immediately.</p>
            </motion.div>
          </div>
        )}

        {isEditModalOpen && selectedStudent && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} className="bg-white dark:bg-obsidian-light w-full max-w-lg rounded-2xl shadow-xl border border-slate-200 dark:border-white/10 overflow-hidden">
              <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
                <h3 className="font-display font-bold text-xl">Edit Student Details</h3>
                <button onClick={() => setEditModalOpen(false)} className="text-slate-500 hover:text-slate-800 dark:hover:text-white"><FiX size={24} /></button>
              </div>
              <form onSubmit={handleEditSubmit} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">Full Name</label>
                  <input required type="text" value={editFormData.name} onChange={e => setEditFormData({...editFormData, name: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-sm dark:text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Phone</label>
                    <input required type="tel" value={editFormData.phone} onChange={e => setEditFormData({...editFormData, phone: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-sm dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">WhatsApp</label>
                    <input required type="tel" value={editFormData.whatsapp} onChange={e => setEditFormData({...editFormData, whatsapp: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-sm dark:text-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">Course</label>
                  <select value={editFormData.course} onChange={e => setEditFormData({...editFormData, course: e.target.value})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-sm dark:text-white">
                    {courses.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1">Total Fees (₹)</label>
                    <input required type="number" min="0" value={editFormData.totalFees} onChange={e => setEditFormData({...editFormData, totalFees: Number(e.target.value)})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-sm dark:text-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-1">Fees Paid (₹)</label>
                    <input required type="number" min="0" max={editFormData.totalFees} value={editFormData.paidFees} onChange={e => setEditFormData({...editFormData, paidFees: Number(e.target.value)})} className="w-full px-4 py-2 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-obsidian outline-none focus:border-electric-blue text-sm dark:text-white" />
                  </div>
                </div>
                <button type="submit" className="w-full brutal-btn mt-4">Save Changes</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
