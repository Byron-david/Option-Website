import LinkButton from '../Button/LinkButton';
import styles from './Pages.module.css'; 

function Pricing() {
  return (
    <>
      <h1>Pricing</h1>
      <div class="container_xl">
        <div class={styles.flexContainer}>
          <div class={`${styles.textContainer} borderLight`}>
            <h2>Free</h2>
            <p class={styles.pMuted}>The basics to get started</p>
            <h3 class={styles.header3}>
              <sup>$</sup>
              <span class="text30">0</span>
              <span> per Month</span>
            </h3>
            <LinkButton to="/signin" text="Join for Free"/>
          </div>
          <div class={`${styles.textContainer} borderLight`}>
            <h2>Basic</h2>
          </div>
          <div class={`${styles.textContainer} borderLight`}>
            <h2>Pro</h2>
          </div>
        </div>
      </div>
    </>
  )
}

export default Pricing