import { useState } from 'react'
import Button from '../Button/Button';
import styles from './Pages.module.css'; 
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"

const create = async newObject => {
  try {
    const response = await fetch("http://localhost:3000/signin", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newObject),
      }
    );

    const data = await response.json();

    return data

  } catch (error) {
    console.error('Error adding trades:', error);
  }
}

function SignIn() {
  // State for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create the payload
    const payload = {
      username,
      password,
    };

    // Send the POST request
    const response = await create(payload);

    // Handle the response (e.g., show success/error message, redirect, etc.)
    if (response) {
      console.log('Sign-in successful:', response);
      // You can redirect the user or update the UI here
    } else {
      console.error('Sign-in failed');
    }
  };
  
  return (
    <>
      <div>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} method="POST">
          <div className={styles.flexContainer}>
            <div className={`${styles.textContainer} borderLight`}>
              <div className={`${styles.flexColumn} inputContainer`}>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  placeholder="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <div className={styles.spaceBetween}>
                  <label htmlFor="password">Password</label>
                  <Link to="/" className={`textButton text75`}>
                    Forgot Password?
                  </Link>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button type="submit" text="Sign In" />
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignIn
