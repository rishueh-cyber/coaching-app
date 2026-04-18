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

  const login = (email, password, roleType) => {
    // Simple mock logic
    const foundUser = Object.values(USERS).find(
      (u) => u.email === email && u.password === password && (roleType === 'admin' ? ['admin', 'teacher'].includes(u.role) : u.role === 'student')
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem('raiseMeUser', JSON.stringify(foundUser));
      return { success: true, role: foundUser.role };
    }
    return { success: false, message: 'Invalid credentials. Please check and try again.' };
  };

  const registerUser = (newUser) => {
    // newUser: {name,email,password,role,avatar}
    const existing = Object.values(USERS).find(u => u.email === newUser.email);
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
