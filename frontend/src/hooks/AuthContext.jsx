import React, { createContext, useContext, useState } from 'react';

// Create a central context node bridging components that require state awareness
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Lazily evaluate user memory inside localStorage to avoid state cascading hooks
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('parkEasyUser');
    if (stored) {
      try {
        // Attempt to parse existing payload if JSON hasn't been mangled
        return JSON.parse(stored);
      } catch {
        // Drop bad data immediately
        localStorage.removeItem('parkEasyUser');
      }
    }
    return null; // Enforce logged-out shape
  });

  // Overwrites memory with authenticated data and synchronizes state locally
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('parkEasyUser', JSON.stringify(userData));
  };

  // Erases the session footprint out of memory
  const logout = () => {
    setUser(null);
    localStorage.removeItem('parkEasyUser');
  };

  return (
    // Supply tree-wide login state checks using dual-not (!!) coercion
    <AuthContext.Provider value={{ user, login, logout, isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom wrapper hook providing concise consuming points across routes
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  // Throw errors to stop logic from flowing if Context boundaries are breached
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
