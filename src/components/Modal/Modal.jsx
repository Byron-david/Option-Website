import { useState } from 'react'
import ReactDom from 'react-dom'
import styles from './Modal.module.css'; 

function Modal({ children, open}) {
    
  if (!open) return null;

  return ReactDom.createPortal(
    <>
      {children}
      {/* <button onClick={onClose}>CLOSE ME</button> */}
    </>,
    document.getElementById('portal')
  );
}

export default Modal
