export const checkAuth = async () => {
    try {
      const response = await fetch('http://localhost:3000/check-auth', {
        credentials: 'include', // Include cookies in the request
      });
      if (response.ok) {
        const data = await response.json();
        return data.authenticated;
      }
      return false;
    } catch (error) {
      console.error('Error checking authentication:', error);
      return false;
    }
  };