import { useState, useEffect } from 'react'
import TextInput from '../Input/TextInput';
import Button from '../Button/Button';
import styles from './Pages.module.css'; 
import LinkButton from '../Button/LinkButton';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"

// TEMPORARY
const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:3000/signin");
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error fetching trades:', error);
    }
  };

  function SignIn() {
    const [users, setUsers] = useState([]);
  
    useEffect(() => {
      fetchData().then(setUsers);
    }, []);


  return (
    <>
      <div>
        <h1>Sign In</h1>
        <form action="" method="POST">
          <div className={styles.flexContainer}>
            <div className={`${styles.textContainer} borderLight`}>
              <div className={`${styles.flexColumn} inputContainer`}>
                  <label htmlFor="username">Username</label>
                  <input id="username" name="username" placeholder="username" type="text" />
                  <div className={styles.spaceBetween}>
                    <label htmlFor="password">Password</label>
                    <Link to="/" className={`textButton text75`}>Forgot Password?</Link>
                  </div>
                    <input id="password" name="password" type="password" />
              </div>
            <Button text="Sign Up"/>
            </div>
          </div>
        </form>
        {/* <div>
            <h2>Users List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.username}</li>
                ))}
            </ul>
        </div> */}
      </div>
    </>
  )
}

export default SignIn
