import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Features from './components/pages/Features.jsx'
import Pricing from './components/pages/Pricing.jsx'
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import './index.css'
import Dashboard from './components/pages/Dashboard.jsx'
import Login from './components/pages/Login.jsx'
import SignUp from './components/pages/SignUp.jsx'
import Home from './components/pages/Home.jsx'
import ErrorPage from './components/pages/ErrorPage.jsx'
import TradesTable from './components/TradesTable/TradesTable.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import ProtectedRoute from './components/pages/ProtectedRoute';
import { AuthProvider } from './components/pages/AuthContext';

function authLoader(requireAuth) {
  return async () => {
    try {
      const response = await fetch('/auth', { credentials: 'include' });
      if (!response.ok) throw new Error('Auth failed');
      
      const data = await response.json();
      if (requireAuth && !data.authenticated) return redirect('/login');
      if (!requireAuth && data.authenticated) return redirect('/dashboard');
      
      return null;
    } catch (error) {
      console.error('Auth check failed:', error);
      return requireAuth ? redirect('/login') : null;
    }
  };
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AuthProvider>
        <App />
      </AuthProvider>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "features",
        element: <Features />,
      },
      {
        path: "pricing",
        element: <Pricing />,
      },
      {
        path: "login",
        element: <Login />,
        loader: authLoader(true), // Redirect if not authenticated
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        loader: authLoader(true), // Redirect if not authenticated
        children: [
          { path: "trades", 
            element: <TradesTable /> 
          },
          { path: "trades/:id", 
            element: <TradesTable /> 
          }
        ]
      },
    ]
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <RouterProvider router={router} />
  </React.StrictMode>,
)
