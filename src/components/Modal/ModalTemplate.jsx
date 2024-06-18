import { useState } from 'react'
import Button from '../Button/Button.jsx'
import Modal from './Modal.jsx'
import styles from './ModalTemplate.module.css'; 

function ModalTemplate({ titleText, buttonText, childrenBody, childrenFooter }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <>
      <button onClick={() => setIsOpen(true)}>{buttonText}</button>
      <Modal open={isOpen}>
        {/* <AddTrade handleClickClose={() => setIsOpen(false)}/> */}
        <div id="ModalTemplate">
          <div id={styles.modalTitle}>{titleText}</div>
          <div id={styles.modalBody}>
            {childrenBody}
          </div>
          <div id={styles.modalFooter}>
            {childrenFooter}
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ModalTemplate
