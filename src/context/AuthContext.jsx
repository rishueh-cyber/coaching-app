import { createContext, useState, useEffect, useContext } from 'react';
import { USERS } from '../data/mockData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is stored in local storage
    const storedUser = localStorage.getItem('raiseMeUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = (identifier, password, roleType) => {
    // Simple mock logic
    // Merge mock users with persistent users from localStorage
    const persistentUsers = JSON.parse(localStorage.getItem('rm_users') || '[]');
    const allUsers = { ...USERS };
    persistentUsers.forEach(u => {
      allUsers[u.email] = u;
    });

    let foundUser = null;

    if (roleType === 'admin') {
      foundUser = Object.values(allUsers).find(
        (u) => u.email === identifier && u.password === password && ['admin', 'teacher'].includes(u.role)
      );
    } else {
      // Check students list in localStorage
      const students = JSON.parse(localStorage.getItem('rm_students') || '[]');
      foundUser = students.find(
        (s) => (s.loginId === identifier || s.email === identifier) && s.password === password
      );
    }

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('raiseMeUser', JSON.stringify(foundUser));
      return { success: true, role: foundUser.role };
    }
    return { success: false, message: 'Invalid credentials. Please check and try again.' };
  };

  const registerUser = (newUser) => {
    // newUser: {name,email,password,role,avatar}
    const persistentUsers = JSON.parse(localStorage.getItem('rm_users') || '[]');
    const allUsers = { ...USERS };
    persistentUsers.forEach(u => {
      allUsers[u.email] = u;
    });
    const existing = Object.values(allUsers).find(u => u.email === newUser.email);
    if (existing) {
      return { success: false, message: 'Email already registered' };
    }
    const id = `user-${Date.now()}`;
    const userObj = { id, ...newUser };
    // Persist in localStorage for demo
    const stored = JSON.parse(localStorage.getItem('rm_users') || '[]');
    stored.push(userObj);
    localStorage.setItem('rm_users', JSON.stringify(stored));
    // Also add to in‑memory USERS map for immediate login
    USERS[userObj.email] = userObj;
    return { success: true };
  };

  const updateUser = (name, email) => {
    if (user) {
      const updatedUser = { ...user, name, email };
      setUser(updatedUser);
      localStorage.setItem('raiseMeUser', JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('raiseMeUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser, registerUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
