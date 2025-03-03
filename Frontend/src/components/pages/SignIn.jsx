import { useState } from 'react'
import Button from '../Button/Button';
import styles from './Pages.module.css'; 
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import FormTemplate from '../Templates/FormTemplate';

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
    console.error('Error fetching user:', error);
  }
}

function SignIn() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include', // Include cookies in the request
    });
    if (response.ok) {
      navigate('/dashboard'); // Redirect to the protected route
    } else {
      alert('Login failed');
    }
  };

  // Form submission handler
  // const handleSubmit = async (e) => {
  //   e.preventDefault(); // Prevent default form submission behavior

  //   // Create the payload
  //   const payload = {
  //     email,
  //     password,
  //   };

  //   // Send the POST request
  //   const response = await create(payload);

  //   // Handle the response (e.g., show success/error message, redirect, etc.)
  //   if (response) {
  //     console.log('Sign-in successful:', response);
  //     // You can redirect the user or update the UI here
  //   } else {
  //     console.error('Sign-in failed');
  //   }
  // };
  
  return (
    <>
      <div>
        <h2>Sign In</h2>
        <div className={`${styles.flexColumnStretch} width20`}>
          <form onSubmit={handleLogin} method="POST">
            <div className={`${styles.textContainer} darkBoxA`}>
              <div className={`${styles.flexColumn} inputDark`}>
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
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
                  required
                />
                <Button className={styles.signupButton} type="submit" text="Sign In" />
              </div>
            </div>
          </form>
          <div className={`${styles.textContainer} ${styles.flexStretch} darkBoxB`}>
            Don't have an account yet?
            <Link to="/signup" className={`textButton`}> Create an account</Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
