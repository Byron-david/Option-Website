import styles from './Pages.module.css'; 

function Pricing() {
  return (
    <>
      <h1>PRICING</h1>
      <div class="container_xl">
        <div class={styles.flexContainer}>
          <div class={`${styles.textContainer} borderLight`}>
            <h2>Free</h2>
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