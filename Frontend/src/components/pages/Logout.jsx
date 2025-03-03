import React from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await fetch('/logout', {
      method: 'POST',
      credentials: 'include', // Include cookies in the request
    });
    if (response.ok) {
      navigate('/signin'); // Redirect to the login page
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;