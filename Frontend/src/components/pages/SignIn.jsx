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
          <div class={styles.flexContainer}>
            <div class={`${styles.textContainer} borderLight`}>
              <div class={`${styles.flexColumn} inputContainer`}>
                  <label for="username">Username</label>
                  <input id="username" name="username" placeholder="username" type="text" />
                  <div class={styles.spaceBetween}>
                    <label for="password">Password</label>
                    <Link to="/" class={`textButton text75`}>Forgot Password?</Link>
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
