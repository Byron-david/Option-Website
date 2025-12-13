import { useState } from 'react'
import Button from '../Button/Button';
import styles from './Pages.module.css'; 
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

function Login() {
  // State for form inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e) => {
      e.preventDefault();
      try {
        await login({ username, password });
        
        navigate('/dashboard/trades', { replace: true });
        
      } catch (error) {
        console.error('Login error:', error);
        setError(error.message || "Login failed");
      }
    };

  return (
    <>
      <div>
        <h2>Log In</h2>
        <div className={`${styles.flexColumnStretch} width20`}>
          <form onSubmit={handleLogin} method="POST">
            <div className={`${styles.textContainer} darkBoxA`}>
              <div className={`${styles.flexColumn} inputDark`}>
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  name="username"
                  placeholder="username"
                  type="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
