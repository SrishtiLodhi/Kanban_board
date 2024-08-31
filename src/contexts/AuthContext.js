// src/contexts/AuthContext.js

import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Manage user state

  const login = (username, password) => {
    // Simulate login
    if (username && password) {
      setUser({ username });
      return { username };
    }
    throw new Error('Login failed');
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
