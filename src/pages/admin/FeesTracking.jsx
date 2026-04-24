import { useState } from 'react';
import { useData } from '../../context/DataContext';
import { FiDownload, FiSearch, FiFilter } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function FeesTracking() {
  const { students } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || s.feesStatus === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const totalRevenue = students.reduce((acc, s) => acc + (Number(s.paidFees) || 0), 0);
  const totalPending = students.reduce((acc, s) => acc + (Number(s.totalFees) - Number(s.paidFees)), 0);

  const exportCSV = () => {
    const headers = ['Student Name', 'Course', 'Total Fees', 'Paid Fees', 'Remaining', 'Status'];
    const data = filteredStudents.map(s => [
      s.name,
      s.course,
      s.totalFees,
      s.paidFees,
      s.totalFees - s.paidFees,
      s.feesStatus
    ]);
    
    const csvContent = [headers, ...data].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `fees_report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Fees Tracking</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">Monitor revenue, pending payments, and export financial reports.</p>
        </div>
        <button onClick={exportCSV} className="brutal-btn flex items-center gap-2">
          <FiDownload size={20} />
          Export Report (CSV)
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-emerald-50 dark:bg-emerald-900/10 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-500/20">
          <p className="text-emerald-600 dark:text-emerald-400 text-sm font-semibold mb-1">Total Revenue Collected</p>
          <h3 className="text-4xl font-bold font-display text-emerald-700 dark:text-emerald-300">₹{totalRevenue.toLocaleString()}</h3>
        </div>
        <div className="bg-rose-50 dark:bg-rose-900/10 p-6 rounded-2xl border border-rose-100 dark:border-rose-500/20">
          <p className="text-rose-600 dark:text-rose-400 text-sm font-semibold mb-1">Total Outstanding Dues</p>
          <h3 className="text-4xl font-bold font-display text-rose-700 dark:text-rose-300">₹{totalPending.toLocaleString()}</h3>
        </div>
      </div>

      <div className="bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden mt-8">
        <div className="p-4 border-b border-slate-200 dark:border-white/10 flex flex-col md:flex-row gap-4 items-center justify-between bg-slate-50/50 dark:bg-white/5">
          <div className="relative w-full md:w-96">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search student name..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-obsidian border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue text-sm"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <FiFilter className="text-slate-400" />
            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 bg-white dark:bg-obsidian border border-slate-200 dark:border-white/10 rounded-xl outline-none focus:border-electric-blue text-sm"
            >
              <option value="All">All Status</option>
              <option value="Paid">Paid</option>
              <option value="Pending">Pending</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-500 py-3">
                <th className="p-4 font-semibold">Student Name</th>
                <th className="p-4 font-semibold">Total Fees</th>
                <th className="p-4 font-semibold">Paid</th>
                <th className="p-4 font-semibold">Remaining</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredStudents.map((student) => (
                <tr key={student.id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold">{student.name}</td>
                  <td className="p-4 font-medium text-slate-600 dark:text-slate-300">₹{parseFloat(student.totalFees).toLocaleString()}</td>
                  <td className="p-4 font-bold text-emerald-600 dark:text-emerald-400">₹{parseFloat(student.paidFees).toLocaleString()}</td>
                  <td className="p-4 font-bold text-rose-600 dark:text-rose-400">₹{(student.totalFees - student.paidFees).toLocaleString()}</td>
                  <td className="p-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                      student.feesStatus === 'Paid' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' :
                      student.feesStatus === 'Pending' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400' :
                      'bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400'
                    }`}>
                      {student.feesStatus}
                    </span>
                  </td>
                </tr>
              ))}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">No matching records found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
