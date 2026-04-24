import { createContext, useState, useContext, useEffect } from 'react';
import { INITIAL_STUDENTS, INITIAL_MATERIALS, INITIAL_VIDEOS } from '../data/mockData';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('rm_students');
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
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

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('rm_students', JSON.stringify(students));
  }, [students]);

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

  // Student Actions
  const addStudent = (newStudent) => {
    const student = {
      ...newStudent,
      id: Date.now(),
      joinDate: new Date().toISOString().split('T')[0],
      paidFees: Number(newStudent.paidFees) || 0,
      totalFees: Number(newStudent.totalFees) || 0,
    };
    setStudents(prev => [student, ...prev]);
  };

  const removeStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
    // Also cleanup attendance for this student
    const newAttendance = { ...attendance };
    Object.keys(newAttendance).forEach(date => {
      delete newAttendance[date][id];
    });
    setAttendance(newAttendance);
  };

  const editStudentFees = (id, newPaidAmount) => {
    setStudents(prev => prev.map(s => {
      if (s.id === id) {
        const paid = Number(newPaidAmount);
        let status = 'Pending';
        if (paid >= s.totalFees) status = 'Paid';
        if (paid === 0) status = 'Overdue';
        return { ...s, paidFees: paid, feesStatus: status };
      }
      return s;
    }));
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
  };

  return (
    <DataContext.Provider value={{
      students, addStudent, removeStudent, editStudentFees,
      materials, addMaterial, removeMaterial,
      videos, addVideo, removeVideo,
      attendance, markAttendance,
      messages, sendMessage
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
