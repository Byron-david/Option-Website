// ProtectedRoute.jsx
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../Loading/LoadingSpinner';

export default function ProtectedRoute({ children }) {
  const [authStatus, setAuthStatus] = useState('checking');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/check-auth', {
          credentials: 'include', // MUST include credentials
          headers: {
            'Content-Type': 'application/json',
          }
        });

        console.log('Auth check response:', response); // Debug log
        
        if (!response.ok) {
          throw new Error('Not authenticated');
        }
        
        const data = await response.json();
        setAuthStatus(data.authenticated ? 'authenticated' : 'unauthenticated');
      } catch (error) {
        console.error('Auth check failed:', error);
        setAuthStatus('unauthenticated');
      }
    };

    checkAuth();
  }, []);

  if (authStatus === 'checking') {
    return <LoadingSpinner />;
  }

  if (authStatus === 'unauthenticated') {
    return <Navigate to="/signin" replace />;
  }

  return children;
}