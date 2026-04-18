// Mock data for the Raise Me Coaching Centre App

export const USERS = {
  admin: { id: 'admin-1', name: 'Admin Singh', email: 'admin@raiseme.com', password: 'admin123', role: 'admin', avatar: 'AS' },
  teacher1: { id: 'teacher-1', name: 'Priya Sharma', email: 'priya@raiseme.com', password: 'teacher123', role: 'teacher', avatar: 'PS', subject: 'Mathematics' },
  teacher2: { id: 'teacher-2', name: 'Rahul Verma', email: 'rahul@raiseme.com', password: 'teacher123', role: 'teacher', avatar: 'RV', subject: 'Physics' },
  student1: { id: 'student-1', name: 'Amit Kumar', email: 'amit@student.com', password: 'student123', role: 'student', avatar: 'AK', course: 'JEE Preparation' },
  student2: { id: 'student-2', name: 'Sneha Patel', email: 'sneha@student.com', password: 'student123', role: 'student', avatar: 'SP', course: 'NEET Preparation' },
};

export const INITIAL_STUDENTS = [
  { id: 1, name: 'Amit Kumar', phone: '9876543210', whatsapp: '9876543210', course: 'JEE Preparation', feesStatus: 'Paid', totalFees: 25000, paidFees: 25000, joinDate: '2026-01-15' },
  { id: 2, name: 'Sneha Patel', phone: '9876543211', whatsapp: '9876543211', course: 'NEET Preparation', feesStatus: 'Pending', totalFees: 30000, paidFees: 15000, joinDate: '2026-01-20' },
  { id: 3, name: 'Rohit Mehra', phone: '9876543212', whatsapp: '9876543212', course: 'JEE Preparation', feesStatus: 'Paid', totalFees: 25000, paidFees: 25000, joinDate: '2026-02-01' },
  { id: 4, name: 'Kavita Joshi', phone: '9876543213', whatsapp: '9876543213', course: 'Foundation Course', feesStatus: 'Overdue', totalFees: 20000, paidFees: 5000, joinDate: '2025-11-10' },
  { id: 5, name: 'Deepak Singh', phone: '9876543214', whatsapp: '9876543214', course: 'NEET Preparation', feesStatus: 'Paid', totalFees: 30000, paidFees: 30000, joinDate: '2026-03-01' },
  { id: 6, name: 'Neha Gupta', phone: '9876543215', whatsapp: '9876543215', course: 'JEE Preparation', feesStatus: 'Pending', totalFees: 25000, paidFees: 10000, joinDate: '2026-02-15' },
  { id: 7, name: 'Vikram Rao', phone: '9876543216', whatsapp: '9876543216', course: 'Foundation Course', feesStatus: 'Paid', totalFees: 20000, paidFees: 20000, joinDate: '2026-01-05' },
  { id: 8, name: 'Ananya Das', phone: '9876543217', whatsapp: '9876543217', course: 'NEET Preparation', feesStatus: 'Pending', totalFees: 30000, paidFees: 20000, joinDate: '2026-03-10' },
];

export const INITIAL_MATERIALS = [
  { id: 1, title: 'Physics Chapter 1 — Mechanics', type: 'PDF', subject: 'Physics', uploadedBy: 'Rahul Verma', date: '2026-04-10', size: '2.4 MB' },
  { id: 2, title: 'Mathematics — Integration Notes', type: 'PDF', subject: 'Mathematics', uploadedBy: 'Priya Sharma', date: '2026-04-08', size: '1.8 MB' },
  { id: 3, title: 'Chemistry — Organic Reactions', type: 'DOC', subject: 'Chemistry', uploadedBy: 'Admin Singh', date: '2026-04-05', size: '3.1 MB' },
  { id: 4, title: 'Biology — Cell Division Notes', type: 'PDF', subject: 'Biology', uploadedBy: 'Admin Singh', date: '2026-04-02', size: '4.2 MB' },
  { id: 5, title: 'JEE 2026 Syllabus Overview', type: 'PDF', subject: 'General', uploadedBy: 'Admin Singh', date: '2026-03-28', size: '0.5 MB' },
];

export const INITIAL_VIDEOS = [
  { id: 1, title: 'Introduction to Calculus', subject: 'Mathematics', duration: '45 min', uploadedBy: 'Priya Sharma', date: '2026-04-12', views: 128, thumbnail: '🎓' },
  { id: 2, title: 'Newton\'s Laws of Motion', subject: 'Physics', duration: '38 min', uploadedBy: 'Rahul Verma', date: '2026-04-10', views: 95, thumbnail: '🔬' },
  { id: 3, title: 'Organic Chemistry Basics', subject: 'Chemistry', duration: '52 min', uploadedBy: 'Admin Singh', date: '2026-04-08', views: 76, thumbnail: '⚗️' },
  { id: 4, title: 'Trigonometry Masterclass', subject: 'Mathematics', duration: '60 min', uploadedBy: 'Priya Sharma', date: '2026-04-05', views: 210, thumbnail: '📐' },
  { id: 5, title: 'Electromagnetic Waves', subject: 'Physics', duration: '42 min', uploadedBy: 'Rahul Verma', date: '2026-04-01', views: 64, thumbnail: '📡' },
  { id: 6, title: 'Human Anatomy Overview', subject: 'Biology', duration: '55 min', uploadedBy: 'Admin Singh', date: '2026-03-28', views: 143, thumbnail: '🧬' },
];

export const INITIAL_NOTIFICATIONS = [
  { id: 1, title: 'JEE Mock Test Schedule', message: 'Mock test for JEE batch will be held on 20th April 2026. All students must report by 9:00 AM.', type: 'exam', date: '2026-04-15', read: false },
  { id: 2, title: 'Fee Payment Reminder', message: 'Last date for April fee payment is 25th April. Late fees of ₹500 will be applicable.', type: 'fee', date: '2026-04-14', read: false },
  { id: 3, title: 'New Physics Notes Uploaded', message: 'Chapter 5 — Electromagnetic Induction notes have been uploaded. Check Materials section.', type: 'material', date: '2026-04-12', read: true },
  { id: 4, title: 'Holiday Notice', message: 'Centre will remain closed on 21st April (Sunday). Regular classes resume on Monday.', type: 'general', date: '2026-04-10', read: true },
  { id: 5, title: 'NEET Batch — Extra Classes', message: 'Extra revision classes for NEET batch from 22nd-26th April, 4 PM to 6 PM daily.', type: 'exam', date: '2026-04-08', read: true },
];

export const INITIAL_ATTENDANCE = [
  { id: 1, studentName: 'Amit Kumar', course: 'JEE Preparation', date: '2026-04-16', status: 'present' },
  { id: 2, studentName: 'Sneha Patel', course: 'NEET Preparation', date: '2026-04-16', status: 'present' },
  { id: 3, studentName: 'Rohit Mehra', course: 'JEE Preparation', date: '2026-04-16', status: 'absent' },
  { id: 4, studentName: 'Kavita Joshi', course: 'Foundation Course', date: '2026-04-16', status: 'present' },
  { id: 5, studentName: 'Deepak Singh', course: 'NEET Preparation', date: '2026-04-16', status: 'present' },
  { id: 6, studentName: 'Neha Gupta', course: 'JEE Preparation', date: '2026-04-16', status: 'absent' },
  { id: 7, studentName: 'Vikram Rao', course: 'Foundation Course', date: '2026-04-16', status: 'present' },
  { id: 8, studentName: 'Ananya Das', course: 'NEET Preparation', date: '2026-04-16', status: 'present' },
];

export const COURSES = ['JEE Preparation', 'NEET Preparation', 'Foundation Course'];
