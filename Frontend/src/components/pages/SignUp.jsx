import { useState } from 'react';
import Button from '../Button/Button';
import styles from './Pages.module.css';
import { Link } from 'react-router-dom';
import FormTemplate from '../Templates/FormTemplate';

// API call to create a new user
const createUser = async (newUser) => {
  try {
    const response = await fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    });

    if (!response.ok) {
      throw new Error('Sign-up failed');
    }

    return await response.json();
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

function SignUp() {
  // State for form inputs and error handling
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Password validation rules
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long.';
    }
    if (!hasUpperCase) {
      return 'Password must contain at least one uppercase letter.';
    }
    if (!hasLowerCase) {
      return 'Password must contain at least one lowercase letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least one number.';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least one special character.';
    }
    return '';
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Clear previous errors
    setError('');

    // Validate password
    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    // Create the payload
    const payload = { email, password };

    setIsLoading(true); // Start loading

    try {
      const response = await createUser(payload);

      if (response) {
        console.log('Sign-up successful:', response);
        setError(''); // Clear any previous errors
        // Redirect or update UI here (e.g., navigate to a new page)
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className={styles.panelContainer}>
      <div className={styles.panelLeft}>
        <form onSubmit={handleSubmit} method="POST">
          {/* <div className={`${styles.flexContainer30} inputLight`}> */}
          <FormTemplate dark={false}>
            <h3 className="textDark">Sign Up</h3>

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
            </div>

            {/* Confirm Password Input */}
            <div>
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
            </div>

            {/* Error Message */}
            {error && <p className={styles.errorMessage}>{error}</p>}

            {/* Submit Button */}
            <Button
              className={styles.signupButton}
              type="submit"
              text={isLoading ? 'Creating Account...' : 'Create Account'}
              disabled={isLoading}
            />
          </FormTemplate>
          {/* </div> */}

          {/* Link to Sign In */}
          <div className={styles.textContainer}>
            Already have an account?{' '}
            <Link to="/signin" className="textButton">
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