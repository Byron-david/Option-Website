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

function SignUp() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Basic validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Create the payload
    const payload = {
      email,
      password,
    };

    try {
      // Send the POST request
      const response = await create(payload);

      // Handle the response
      if (response) {
        console.log('Sign-up successful:', response);
        setError(''); // Clear any previous errors
        // You can redirect the user or update the UI here
      } else {
        setError('Sign-up failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };
  
  return (
    <>
      <div className={styles.panelContainer}>
        <div className={styles.panelLeft}>
          <h2 className="textDark">Sign Up</h2>
          <form onSubmit={handleSubmit} method="POST">
            <div className={styles.flexContainer}>
                <div className={`${styles.flexColumn} inputContainer`}>
                  <label htmlFor="email"
                        className="textDark"
                        >Email
                  </label>
                  <input
                    className="inputLight"
                    id="email"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div className={styles.spaceBetween}>
                  <label htmlFor="password"
                          className="textDark"
                  >Password</label>
                  </div>
                  <input
                    className="inputLight"
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                <label htmlFor="confirmPassword"
                      className="textDark">
                      Confirm Password
                </label>
                <input
                  className="inputLight"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                {error && <p className={styles.errorMessage}>{error}</p>}
                <Button className={styles.signupButton} type="submit" text="Create Account" />
                </div>
            </div>
          </form>
        </div>
        <div className={styles.panelRight}>RIGHT PANEL</div>

      </div>
    </>
  )
}

export default SignUp
