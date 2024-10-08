import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem('loggedInUser'));
  });
  const navigate = useNavigate();

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
    navigate('/contacts');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loggedInUser');
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
