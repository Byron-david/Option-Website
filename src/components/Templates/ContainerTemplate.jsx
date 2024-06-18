import styles from './ContainerTemplate.module.css'; 

function ContainerTemplate({ titleChildren, bodyChildren, footerChildren }) {
  if (!footerChildren) {
    return (
      <>
         <div className={styles.containerTemplate}>
          <div className={styles.titleTemplate}>
            {titleChildren}
          </div>
          <div className={styles.bodyTemplate}>
            {bodyChildren}
          </div>
        </div>   
      </>

    )
  }

  return (
    <>
      <div className={styles.containerTemplate}>
        <div className={styles.titleTemplate}>
          {titleChildren}
        </div>
        <div className={styles.bodyTemplate}>
          {bodyChildren}
        </div>
        <div className={styles.footerTemplate}>
          {footerChildren}
        </div>
      </div>
    </>
  );
}

export default ContainerTemplate
