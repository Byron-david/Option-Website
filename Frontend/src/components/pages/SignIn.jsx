import { useState } from 'react'
import Button from '../Button/Button';
import styles from './Pages.module.css'; 
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import FormTemplate from '../Templates/FormTemplate';

function Login() {
  // State for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  // const { login } = useAuth();
  // const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include cookies in the request
      });
      
      console.log('Login response status:', response.status); // Debug log
    
      const text = await response.text();
      console.log('Raw response:', text); // Debug log
      
      try {
        const data = JSON.parse(text);
        
        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }
        
        console.log('Login successful:', data); // Debug log
        navigate('/dashboard', { replace: true });
      } catch (e) {
        console.error('Failed to parse JSON:', e);
        throw new Error('Invalid server response');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.message);
    }
  };
// const handleLogin = async (e) => {
//   e.preventDefault();
//   setError('');
  
//   try {
//     const success = await login({ email, password });
    
//     if (success) {
//       // Redirect to intended path or dashboard
//       const redirectTo = location.state?.from?.pathname || '/dashboard';
//       navigate(redirectTo, { replace: true });
//     }
//   } catch (err) {
//     setError(err.message || 'Login failed');
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
                {error && <div className="error">{error}</div>}
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

export default Login
