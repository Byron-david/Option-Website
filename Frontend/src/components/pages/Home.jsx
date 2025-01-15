import styles from './Pages.module.css'; 
import { Link } from "react-router-dom"
function Home() {
  return (
    <>
      <h1 className={styles.header1}>Stock and Option Spread Tracking. <br />
      Made. Simple.</h1>
      <h2 className={styles.header2}>Track all your complex option spreads easily</h2>
      <div className={styles.linkContainer}>
        <Link to="/signin" className={styles.linkButton}>Get Started</Link>
      </div>
    </>
  )
}

export default Home
