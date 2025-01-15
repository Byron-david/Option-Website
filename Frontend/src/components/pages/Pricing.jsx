import LinkButton from '../Button/LinkButton';
import styles from './Pages.module.css'; 
import ButtonStyles from '../Button/Button.module.css'; 
import Monthly from './Monthly';

function Pricing() {
  return (
    <>
      <h1>Pricing</h1>
      <div className="container_xl">
        <div className={styles.flexContainer}>
          <div className={`${styles.textContainer} borderLight ${styles.flex1}`}>
            <h2>Free</h2>
            <p className={styles.pMuted}>The basics to get started</p>
            <Monthly price="0"/>
            <LinkButton to="/signin" text="Join for Free"/>
            <ul>
              <li>Single portfolio</li>
              <li>50 trade strategies</li>
              <li>Strategy analysis</li>
            </ul>
          </div>
          <div className={`${styles.textContainer} borderLight ${styles.flex1}`}>
            <h2>Basic</h2>
            <p className={styles.pMuted}>All you need to be successful</p>
            <Monthly price="5"/>
            <LinkButton to="/signin" text="Join Now" className={ButtonStyles.link}/>
            <ul>
              <li>Everything included in Free, and...</li>
              <li>Multiple portfolios</li>
              <li>Unlimited trade strategies</li>
            </ul>
          </div>
          <div className={`${styles.textContainer} borderLight ${styles.flex1}`}>
            <h2>Pro</h2>
            <p className={styles.pMuted}>If you're looking for the best</p>
            <Monthly price="10"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pricing