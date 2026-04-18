import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import Landing from './pages/Landing';
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';
import AdminDashboard from './pages/admin/Dashboard';
import StudentsManagement from './pages/admin/StudentsManagement';
import MaterialsManagement from './pages/admin/MaterialsManagement';
import Settings from './pages/admin/Settings';
import StudentDashboard from './pages/student/Dashboard';
import StudentLayout from './pages/student/StudentLayout';
import LecturesManagement from './pages/admin/LecturesManagement';
import WhatsAppReminders from './pages/admin/WhatsAppReminders';
import Register from './pages/Register';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) return (
    <div className="min-h-screen bg-slate-50 dark:bg-obsidian flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
    </div>
  );
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            
            <Route path="/register" element={<Register />} />
            
            <Route 
              path="/admin" 
              element={
                <ProtectedRoute allowedRoles={['admin', 'teacher']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="students" element={<StudentsManagement />} />
              <Route path="materials" element={<MaterialsManagement />} />
              <Route path="settings" element={<Settings />} />
              <Route path="lectures" element={<LecturesManagement />} />
              <Route path="reminders" element={<WhatsAppReminders />} />
            </Route>

            <Route 
              path="/student" 
              element={
                <ProtectedRoute allowedRoles={['student']}>
                  <StudentLayout />
                </ProtectedRoute>
              } 
            >
              <Route index element={<StudentDashboard />} />
              <Route path="lectures" element={<LecturesManagement />} />
              <Route path="reminders" element={<WhatsAppReminders />} />
              <Route path="materials" element={<MaterialsManagement />} />
              <Route path="profile" element={<Settings />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            
          </Routes>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
