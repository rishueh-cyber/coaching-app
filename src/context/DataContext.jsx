import { createContext, useState, useContext, useEffect } from 'react';
import { INITIAL_STUDENTS, INITIAL_MATERIALS, INITIAL_VIDEOS, COURSES as MOCK_COURSES } from '../data/mockData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('rm_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem('rm_courses');
    return saved ? JSON.parse(saved) : MOCK_COURSES;
  });

  const [materials, setMaterials] = useState(() => {
    const saved = localStorage.getItem('rm_materials');
    return saved ? JSON.parse(saved) : INITIAL_MATERIALS;
  });

  const [videos, setVideos] = useState(() => {
    const saved = localStorage.getItem('rm_videos');
    return saved ? JSON.parse(saved) : INITIAL_VIDEOS;
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('rm_attendance');
    return saved ? JSON.parse(saved) : {};
  });

  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('rm_messages');
    return saved ? JSON.parse(saved) : [];
  });

  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem('rm_settings');
    return saved ? JSON.parse(saved) : { autoReminders: false, reminderType: 'Fee' };
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('rm_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('rm_courses', JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem('rm_materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('rm_videos', JSON.stringify(videos));
  }, [videos]);

  useEffect(() => {
    localStorage.setItem('rm_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('rm_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('rm_settings', JSON.stringify(settings));
  }, [settings]);

  // Student Actions
  const addStudent = (newStudent) => {
    const year = new Date().getFullYear();
    const count = students.length + 1;
    const loginId = `RM-${year}-${String(count).padStart(3, '0')}`;
    const password = Math.random().toString(36).slice(-8).toUpperCase(); // Random 8-char password

    const student = {
      ...newStudent,
      id: Date.now(),
      loginId,
      password,
      role: 'student',
      joinDate: new Date().toISOString().split('T')[0],
      paidFees: Number(newStudent.paidFees) || 0,
      totalFees: Number(newStudent.totalFees) || 0,
    };

    // Calculate status
    let status = 'Pending';
    if (Number(student.paidFees) >= Number(student.totalFees)) status = 'Paid';
    if (Number(student.paidFees) === 0) status = 'Overdue';
    student.feesStatus = status;

    setStudents(prev => [student, ...prev]);
    return student; // Return to show in UI
  };

  const updateStudent = (id, updatedData) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const merged = { ...s, ...updatedData };
        // Recalculate status
        let status = 'Pending';
        if (Number(merged.paidFees) >= Number(merged.totalFees)) status = 'Paid';
        if (Number(merged.paidFees) === 0) status = 'Overdue';
        return { ...merged, feesStatus: status };
      }
      return s;
    }));
  };

  const removeStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    const newAttendance = { ...attendance };
    Object.keys(newAttendance).forEach(date => {
      newAttendance[date] = { ...newAttendance[date] };
      delete newAttendance[date][id];
    });
    setAttendance(newAttendance);
  };

  const editStudentFees = (id, newPaidAmount) => {
    updateStudent(id, { paidFees: Number(newPaidAmount) });
  };

  // Course Actions
  const addCourse = (name) => {
    if (!courses.includes(name)) {
      setCourses(prev => [...prev, name]);
    }
  };

  const removeCourse = (name) => {
    setCourses(prev => prev.filter(c => c !== name));
  };

  // Material Actions
  const addMaterial = (newMaterial) => {
    const material = {
      ...newMaterial,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    };
    setMaterials(prev => [material, ...prev]);
  };

  const removeMaterial = (id) => {
    setMaterials(prev => prev.filter(m => m.id !== id));
  };

  // Video Actions
  const addVideo = (newVideo) => {
    const video = {
      ...newVideo,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      views: 0,
    };
    setVideos(prev => [video, ...prev]);
  };

  const removeVideo = (id) => {
    setVideos(prev => prev.filter(v => v.id !== id));
  };

  // Attendance Actions
  const markAttendance = (date, attendanceData) => {
    setAttendance(prev => ({
      ...prev,
      [date]: attendanceData
    }));
  };

  // Message Actions
  const sendMessage = (msg) => {
    const message = {
      ...msg,
      id: Date.now(),
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, message]);
    
    // Direct WhatsApp Integration
    if (msg.whatsapp && msg.text) {
      const phone = msg.whatsapp.replace(/\D/g, '');
      const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg.text)}`;
      window.open(url, '_blank');
    }
  };

  const updateSettings = (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  return (
    <DataContext.Provider value={{
      students, addStudent, updateStudent, removeStudent, editStudentFees,
      courses, addCourse, removeCourse,
      materials, addMaterial, removeMaterial,
      videos, addVideo, removeVideo,
      attendance, markAttendance,
      messages, sendMessage,
      settings, updateSettings
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
