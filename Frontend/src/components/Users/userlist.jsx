import React, { useState, useEffect } from "react";

const fetchData = async () => {
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  };

const UsersList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchData()
        // axios.get("http://localhost:3000/users") // Adjust API URL if needed
        //     .then(response => setUsers(response.data))
        //     .catch(error => console.error("Error fetching users:", error));
    }, []);



    return (
        <div>
            <h2>Users List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div>
    );
};

export default UsersList;
