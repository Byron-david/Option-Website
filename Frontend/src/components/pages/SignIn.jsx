import { useState } from 'react'
import TextInput from '../Input/TextInput';
import Button from '../Button/Button';
import styles from './Pages.module.css'; 

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
                  <div class={`${styles.flexColumn} inputContainer`}>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" />
                  </div>
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
