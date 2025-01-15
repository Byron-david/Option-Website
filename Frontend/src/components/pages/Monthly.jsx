import styles from './Pages.module.css'; 

function Monthly({ price }) {
  return (
    <>
      <h3 className={styles.header3}>
        <sup>$</sup>
        <span className="text30">{price}</span>
        <span> per Month</span>
      </h3>
    </>
  )
}

export default Monthly