import { useState } from 'react'
import TextInput from '../Input/TextInput';
import Button from '../Button/Button';
import styles from './Pages.module.css'; 
import LinkButton from '../Button/LinkButton';
import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom"

function SignIn() {
  return (
    <>
      <div>
        <h1>Sign In</h1>
        <form action="" method="POST">
          <div className={styles.flexContainer}>
            <div className={`${styles.textContainer} borderLight`}>
              <div className={`${styles.flexColumn} inputContainer`}>
                  <label for="username">Username</label>
                  <input id="username" name="username" placeholder="username" type="text" />
                  <div className={styles.spaceBetween}>
                    <label for="password">Password</label>
                    <Link to="/" className={`textButton text75`}>Forgot Password?</Link>
                  </div>
                    <input id="password" name="password" type="password" />
              </div>
            <Button text="Sign Up"/>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default SignIn
