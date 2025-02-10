import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Features from './components/pages/Features.jsx'
import Pricing from './components/pages/Pricing.jsx'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './index.css'
import Dashboard from './components/pages/Dashboard.jsx'
import SignIn from './components/pages/SignIn.jsx'
import SignUp from './components/pages/SignUp.jsx'
import Home from './components/pages/Home.jsx'
import ErrorPage from './components/pages/ErrorPage.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'
import Navbar from './components/Navbar/Navbar.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
        element: <SignIn />
      },
      {
        path: "signup",
        element: <SignUp />
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          { path: "trades", element: <PositionsTable /> },
          { path: "trades/:id", element: <PositionsTable /> }
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
