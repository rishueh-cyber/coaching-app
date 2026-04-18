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

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('rm_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('rm_materials', JSON.stringify(materials));
  }, [materials]);

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

  return (
    <DataContext.Provider value={{
      students, addStudent, removeStudent, editStudentFees,
      materials, addMaterial, removeMaterial,
      videos: INITIAL_VIDEOS
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
