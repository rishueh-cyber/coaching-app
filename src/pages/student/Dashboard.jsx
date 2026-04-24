import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { FiBook, FiVideo, FiBell, FiDollarSign } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { students, attendance } = useData();
  const navigate = useNavigate();

  // Find this student in the students list
  const studentData = students.find(s => s.email === user.email) || {
    paidFees: 0,
    totalFees: 0,
    feesStatus: 'Pending'
  };

  // Calculate real attendance for this student
  let presentDays = 0;
  let totalDays = 0;
  Object.values(attendance).forEach(day => {
    if (day[studentData.id]) {
      totalDays++;
      if (day[studentData.id] === 'P') presentDays++;
    }
  });

  const attendanceRate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-10">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-8 md:p-10 border-0 bg-gradient-to-br from-electric-blue/10 to-neon-violet/10 dark:from-electric-blue/20 dark:to-neon-violet/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-display font-bold mb-2">Hello, {user?.name}! 👋</h2>
          <p className="text-slate-600 dark:text-slate-300">You are enrolled in <span className="font-semibold text-electric-blue dark:text-blue-400">{user?.course || studentData.course || 'General Program'}</span>. Stay focused and keep learning.</p>
        </div>
        <div className="flex gap-4">
          <div className="shrink-0 bg-white dark:bg-obsidian rounded-2xl p-4 shadow-sm border border-white/50 dark:border-white/10 text-center min-w-[120px]">
            <p className="text-sm font-semibold text-slate-500 mb-1">Attendance</p>
            <p className="text-3xl font-display font-bold text-emerald-500">{attendanceRate}%</p>
          </div>
          <div className="shrink-0 bg-white dark:bg-obsidian rounded-2xl p-4 shadow-sm border border-white/50 dark:border-white/10 text-center min-w-[120px]">
            <p className="text-sm font-semibold text-slate-500 mb-1">Fees Status</p>
            <p className={`text-xl font-display font-bold ${
              studentData.feesStatus === 'Paid' ? 'text-emerald-500' : 
              studentData.feesStatus === 'Overdue' ? 'text-rose-500' : 'text-amber-500'
            }`}>{studentData.feesStatus}</p>
          </div>
        </div>
      </div>

      {/* Quick Access Grids */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => navigate('/student/materials')}
          className="bg-white dark:bg-obsidian-light p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer"
        >
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center mb-4">
            <FiBook size={24} />
          </div>
          <h3 className="text-lg font-bold font-display">Notes & Study Maps</h3>
          <p className="text-sm text-slate-500 mt-2">Access your daily PDF notes and syllabus materials.</p>
        </div>

        <div 
          onClick={() => navigate('/student/lectures')}
          className="bg-white dark:bg-obsidian-light p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer"
        >
          <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 text-neon-violet rounded-xl flex items-center justify-center mb-4">
            <FiVideo size={24} />
          </div>
          <h3 className="text-lg font-bold font-display">Video Lectures</h3>
          <p className="text-sm text-slate-500 mt-2">Watch recorded sessions and live class playbacks.</p>
        </div>

        <div 
          onClick={() => navigate('/student/reminders')}
          className="bg-white dark:bg-obsidian-light p-6 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm hover:-translate-y-1 transition-transform cursor-pointer"
        >
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center mb-4">
            <FiBell size={24} />
          </div>
          <h3 className="text-lg font-bold font-display">Notifications</h3>
          <p className="text-sm text-slate-500 mt-2">View important reminders and exam announcements.</p>
        </div>
      </div>

      {/* Fee Breakdown */}
      <div className="bg-white dark:bg-obsidian-light p-8 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <FiDollarSign size={24} className="text-emerald-500" />
          <h3 className="text-xl font-bold font-display">Fee Summary</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div>
            <p className="text-sm text-slate-500 mb-1">Total Fees</p>
            <p className="text-2xl font-bold font-display">₹{parseFloat(studentData.totalFees || 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Paid Amount</p>
            <p className="text-2xl font-bold font-display text-emerald-600">₹{parseFloat(studentData.paidFees || 0).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-slate-500 mb-1">Due Amount</p>
            <p className="text-2xl font-bold font-display text-rose-600">₹{((studentData.totalFees || 0) - (studentData.paidFees || 0)).toLocaleString()}</p>
          </div>
        </div>
      </div>

    </div>
  );
}
