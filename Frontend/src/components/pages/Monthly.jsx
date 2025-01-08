import styles from './Pages.module.css'; 

function Monthly({ price }) {
  return (
    <>
      <h3 class={styles.header3}>
        <sup>$</sup>
        <span class="text30">{price}</span>
        <span> per Month</span>
      </h3>
    </>
  )
}

export default Monthly