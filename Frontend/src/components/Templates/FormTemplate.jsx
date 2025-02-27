import styles from './Templates.module.css'; 

function FormTemplate({ children,
                        className = `${styles.flexContainerCol} ${styles.inputDark}`, 
                        maxWidth = "30%", 
                        padding,
                        dark = true }) {
  const formStyle = {
    maxWidth: maxWidth,
    padding: `var(${["--padding-normal"]})`,
  }

  if (!dark)
    className = `${styles.flexContainerCol} ${styles.inputLight}`

  return (
    <>
      {/* <div className={`${styles.flexContainer30} inputLight`}></div> */}
      <div style={formStyle} className={className}>
        {children}
      </div>   
    </>
  );
  }

export default FormTemplate
