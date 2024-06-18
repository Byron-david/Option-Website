import { useState } from 'react'
import ReactDom from 'react-dom'
import styles from './Modal.module.css'; 

function Modal({ children, open}) {
    
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      <div className={styles.modalContainer}>
        {children}
      </div>
      <div className={styles.modalOverlay}/>
    </>,
    document.getElementById('portal')
  );
}

export default Modal
