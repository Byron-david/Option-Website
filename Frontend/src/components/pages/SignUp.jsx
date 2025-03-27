import { useState } from 'react';
import Button from '../Button/Button';
import styles from './Pages.module.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  // State for form inputs and error handling
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Password validation rules
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 6 characters long.';
    }
    // if (!hasUpperCase) {
    //   return 'Password must contain at least one uppercase letter.';
    // }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    // if (!hasSpecialChar) {
    //   return 'Password must contain at least one special character.';
    // }
    return '';
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
  
    // Basic validation
    if (!username || !email || !password) {
      setError('All fields are required');
      setIsLoading(false);
      return;
    }

    // Password validation
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setIsLoading(false);
      return;
    }

    try {
      // First check if username exists
      const usernameCheck = await fetch('http://localhost:3000/api/check-username', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });
  
      const usernameData = await usernameCheck.json();
      
      if (usernameData.exists) {
        setError('Username already taken');
        setIsLoading(false);
        return;
      }
  
      // Then check if email exists
      const emailCheck = await fetch('http://localhost:3000/api/check-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
  
      const emailData = await emailCheck.json();
      
      if (emailData.exists) {
        setError('Email already registered');
        setIsLoading(false);
        return;
      }
  
      // If checks pass, proceed with signup
      const response = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (response.ok) {
        navigate('/login'); // Redirect to login page
      } else {
        const data = await response.json();
        setError(data.message || 'Signup failed');
      }
    } catch (err) {
      setError('Error during signup');
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.panelContainer}>
      <div className={styles.panelLeft}>
        <form onSubmit={handleSignup} method="POST">
          <div className={`${styles.flexContainer30} inputLight`}>
          {/* <FormTemplate dark={false}> */}
            <h3 className="textDark">Sign Up</h3>

            <div>
              <label htmlFor="username">Username</label>
              <input
                id="username"
                name="username"
                placeholder="Username"
                type="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            {/* Email Input */}
            <div>
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
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name="password"
                placeholder="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <p>Must be at least 6 characters including a number and lowercase letter</p>
            </div>

            {/* Confirm Password Input */}
            {/* <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Confirm Password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div> */}

            {/* Error Message */}
            {error && <p className={styles.errorMessage}>{error}</p>}

            {/* Submit Button */}
            <Button
              className={styles.signupButton}
              type="submit"
              text={isLoading ? 'Creating Account...' : 'Create Account'}
              disabled={isLoading}
            />
          {/* </FormTemplate>  */}
          </div>

          {/* Link to Sign In */}
          <div className={styles.textContainer}>
            Already have an account?{' '}
            <Link to="/api/login" className="textButton">
              Sign in
            </Link>
          </div>
        </form>
      </div>

      {/* Right Panel (Placeholder) */}
      <div className={styles.panelRight}>
        <h2>Option Insight</h2>

      </div>
    </div>
  );
}

export default SignUp;