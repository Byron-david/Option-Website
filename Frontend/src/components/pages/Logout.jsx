import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch('http://127.0.0.1:3000/api/logout', {
      method: 'POST',
      credentials: 'include', // Include cookies in the request
    });
    if (response.ok) {
      navigate('http://127.0.0.1:3000/api/login'); // Redirect to the login page
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;