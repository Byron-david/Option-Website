// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from 'react-router-dom';
import LoadingSpinner from '../Loading/LoadingSpinner';
import { useAuth } from '../../hooks/useAuth';

export default function ProtectedRoute({ children }) {
  const location = useLocation();
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}