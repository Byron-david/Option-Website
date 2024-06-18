import { useState } from 'react'
import ReactDom from 'react-dom'
import styles from './Modal.module.css'; 

function Modal({ children, open}) {
    
  if (!open) return null;

  return ReactDom.createPortal(
    <>
    <dialog className={styles.modalContainer}>
        {children}
    </dialog>
      <div className={styles.modalOverlay}/>
    </>,
    document.getElementById('portal')
  );
}

export default Modal
