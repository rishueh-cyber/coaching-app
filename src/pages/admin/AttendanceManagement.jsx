import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiCheck, FiX, FiCalendar, FiSave } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AttendanceManagement() {
  const { students, attendance, markAttendance } = useData();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [currentAttendance, setCurrentAttendance] = useState(attendance[selectedDate] || {});
  const [isSaved, setIsSaved] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setCurrentAttendance(attendance[date] || {});
    setIsSaved(false);
  };

  const toggleAttendance = (studentId) => {
    setCurrentAttendance(prev => ({
      ...prev,
      [studentId]: prev[studentId] === 'P' ? 'A' : 'P'
    }));
    setIsSaved(false);
  };

  const saveAttendance = () => {
    // Fill in missing students as Absent by default if marking for the first time
    const updatedAttendance = { ...currentAttendance };
    students.forEach(s => {
      if (!updatedAttendance[s.id]) {
        updatedAttendance[s.id] = 'A';
      }
    });
    markAttendance(selectedDate, updatedAttendance);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const presentCount = Object.values(currentAttendance).filter(v => v === 'P').length;
  const totalCount = students.length;

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Attendance</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Track daily student presence and generate reports.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => handleDateChange(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white dark:bg-obsidian-light border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue text-sm font-semibold"
            />
          </div>
          <button 
            onClick={saveAttendance}
            className={`brutal-btn flex items-center gap-2 ${isSaved ? 'bg-emerald-500 text-white border-emerald-600' : ''}`}
          >
            <FiSave size={18} />
            {isSaved ? 'Saved!' : 'Save Attendance'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-500 py-3">
                  <th className="p-4 font-semibold">Student Name</th>
                  <th className="p-4 font-semibold">Course</th>
                  <th className="p-4 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {students.map((student) => (
                  <tr key={student.id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{student.name}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{student.course}</td>
                    <td className="p-4 text-center">
                      <button 
                        onClick={() => toggleAttendance(student.id)}
                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all border-2 ${
                          currentAttendance[student.id] === 'P' 
                            ? 'bg-emerald-100 border-emerald-500 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' 
                            : 'bg-rose-100 border-rose-500 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400'
                        }`}
                      >
                        {currentAttendance[student.id] === 'P' ? <FiCheck size={20} /> : <FiX size={20} />}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-obsidian-light p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
            <h3 className="font-bold font-display mb-4">Daily Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Present</span>
                <span className="font-bold text-emerald-600">{presentCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 text-sm">Absent</span>
                <span className="font-bold text-rose-600">{totalCount - presentCount}</span>
              </div>
              <div className="pt-4 border-t border-slate-100 dark:border-white/5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-semibold">Attendance Rate</span>
                  <span className="text-sm font-bold">{totalCount > 0 ? Math.round((presentCount / totalCount) * 100) : 0}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-white/5 rounded-full h-2">
                  <div 
                    className="bg-electric-blue h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${totalCount > 0 ? (presentCount / totalCount) * 100 : 0}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-indigo-600 to-electric-blue p-6 rounded-2xl text-white shadow-lg">
            <h3 className="font-bold font-display mb-2">Pro Tip 💡</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Marking attendance daily helps you identify students who might need extra support or are losing interest in the course.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
