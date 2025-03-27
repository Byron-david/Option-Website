// AuthContext.jsx
import { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/auth', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setIsAuthenticated(data.authenticated);
        }
      } catch (error) {
        console.error('Auth check failed:', error);
      }
    }
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}