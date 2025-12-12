import { createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import App from './App';
import Home from './components/pages/Home';
import Features from './components/pages/Features';
import Pricing from './components/pages/Pricing';
import Login from './components/pages/Login';
import SignUp from './components/pages/SignUp';
import Dashboard from './components/pages/Dashboard';
import TradesTable from './components/TradesTable/TradesTable';
import ErrorPage from './components/pages/ErrorPage';
import ProtectedRoute from './components/pages/ProtectedRoute';
import LoadingSpinner from './components/Loading/LoadingSpinner';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <App />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: 'features', element: <Features /> },
      { path: 'pricing', element: <Pricing /> },
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      {
        path: 'dashboard',
        element: (
          // <ProtectedRoute>
            <Dashboard />
          // </ProtectedRoute>
        ),
        children: [
          { path: 'trades', element: <TradesTable /> },
          { path: 'trades/:id', element: <TradesTable /> },
        ],
      },
    ],
  },
]);

export default router;