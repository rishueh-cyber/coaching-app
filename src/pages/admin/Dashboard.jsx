import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FiUsers, FiDollarSign, FiBook, FiVideo, FiTrendingUp } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const { user } = useAuth();
  const { students, materials, videos } = useData();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalRevenue: 0,
    pendingFees: 0,
    totalMaterials: 0,
    totalVideos: 0
  });

  useEffect(() => {
    const totalStudents = students.length;
    let totalRevenue = 0;
    let pendingFees = 0;
    
    students.forEach(s => {
      totalRevenue += s.paidFees;
      pendingFees += (s.totalFees - s.paidFees);
    });

    setStats({
      totalStudents,
      totalRevenue,
      pendingFees,
      totalMaterials: materials.length,
      totalVideos: videos.length
    });
  }, [students, materials, videos]);

  const statCards = [
    { title: 'Total Students', value: stats.totalStudents, icon: <FiUsers size={24} />, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { title: 'Total Revenue', value: `₹${stats.totalRevenue.toLocaleString()}`, icon: <FiTrendingUp size={24} />, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-100 dark:bg-emerald-900/30' },
    { title: 'Pending Fees', value: `₹${stats.pendingFees.toLocaleString()}`, icon: <FiDollarSign size={24} />, color: 'text-rose-600 dark:text-rose-400', bg: 'bg-rose-100 dark:bg-rose-900/30' },
    { title: 'Materials Uploaded', value: stats.totalMaterials, icon: <FiBook size={24} />, color: 'text-amber-600 dark:text-amber-400', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  ];

  return (
    <div className="space-y-8 pb-10">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-display font-bold">Welcome back, {user?.name}!</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">Here's an overview of your coaching centre today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, index) => (
          <motion.div 
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-obsidian-light p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{stat.title}</p>
              <h3 className="text-2xl font-bold font-display">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Students Table */}
        <div className="lg:col-span-2 bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-200 dark:border-white/10 flex justify-between items-center">
            <h2 className="text-lg font-bold font-display">Recently Joined Students</h2>
            <button className="text-sm text-electric-blue font-semibold hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-500 py-3">
                  <th className="p-4 font-semibold">Name</th>
                  <th className="p-4 font-semibold">Course</th>
                  <th className="p-4 font-semibold">Fees Status</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {students.slice(0, 5).map((student) => (
                  <tr key={student.id} className="border-b border-slate-200 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                    <td className="p-4 font-medium">{student.name}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{student.course}</td>
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
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Uploads */}
        <div className="bg-white dark:bg-obsidian-light rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm flex flex-col">
          <div className="p-6 border-b border-slate-200 dark:border-white/10">
            <h2 className="text-lg font-bold font-display">Recent Materials</h2>
          </div>
          <div className="p-6 flex-1 flex flex-col gap-4">
            {materials.slice(0, 4).map((mat) => (
              <div key={mat.id} className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-electric-blue flex items-center justify-center shrink-0">
                  <FiBook size={18} />
                </div>
                <div>
                  <h4 className="font-semibold text-sm line-clamp-1">{mat.title}</h4>
                  <p className="text-xs text-slate-500 mt-1">{mat.subject} • {mat.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
