import { useState } from 'react'
import Button from '../Button/Button';
import styles from './Pages.module.css'; 
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"

const create = async newObject => {
  try {
    const response = await fetch("http://localhost:3000/signup", {
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
    console.error('Error creating user:', error);
  }
}

function SignIn() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Create the payload
    const payload = {
      email,
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
      <div className={styles.panelContainer}>
        <div className={styles.panelLeft}>
          <h1>Sign Up</h1>
          <form onSubmit={handleSubmit} method="POST">
            <div className={styles.flexContainer}>
              <div className={`${styles.textContainer} borderLight`}>
                <div className={`${styles.flexColumn} inputContainer`}>
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    placeholder="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className={styles.spaceBetween}>
                    <label htmlFor="password">Password</label>

                  </div>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" text="Create Account" />
              </div>
            </div>
          </form>
        </div>
        <div className={styles.panelRight}>RIGHT PANEL</div>

      </div>
    </>
  )
}

export default SignIn
