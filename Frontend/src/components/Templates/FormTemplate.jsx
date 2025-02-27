import styles from './Templates.module.css'; 

function FormTemplate({ children,
                        className = `${styles.flexContainerCol} ${styles.inputDark} ${styles.borderBoxDark}`, 
                        maxWidth = "30%", 
                        dark = true }) {
  const formStyle = {
    maxWidth: maxWidth,
    padding: `var(${["--padding-normal"]})`,
    margin: `var(${["--margin"]})`,
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
