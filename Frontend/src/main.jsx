import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Features from './components/pages/Features.jsx'
import Pricing from './components/pages/Pricing.jsx'
import { createBrowserRouter, RouterProvider, redirect } from "react-router-dom";
import './index.css'
import Dashboard from './components/pages/Dashboard.jsx'
import SignIn from './components/pages/SignIn.jsx'
import SignUp from './components/pages/SignUp.jsx'
import Home from './components/pages/Home.jsx'
import ErrorPage from './components/pages/ErrorPage.jsx'
import TradesTable from './components/TradesTable/TradesTable.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import ProtectedRoute from './components/pages/ProtectedRoute';
import { AuthProvider } from './components/pages/AuthContext';

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
        path: "signin",
        element: <SignIn />,
        loader: async () => {
          try {
            const response = await fetch('/check-auth', {
              credentials: 'include'
            });
            if (response.ok) {
              return redirect('/dashboard');
            }
            return null;
          } catch (error) {
            console.error('Auth check failed:', error);
            return null;
          }
        }
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
        loader: async () => {
          try {
            const response = await fetch('/check-auth', {
              credentials: 'include'
            });
            if (!response.ok) {
              return redirect('/signin');
            }
            return null;
          } catch (error) {
            console.error('Auth check failed:', error);
            return redirect('/signin');
          }
        },
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
