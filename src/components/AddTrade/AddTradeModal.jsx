import { useState } from 'react'
import Modal from '../Modal/Modal.jsx'
import AddTrade from './AddTrade.jsx'
import styles from '../Modal/Modal.module.css'; 

function AddTradeModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.modalButtonContainer}>
        <button onClick={() => setIsOpen(true)}>+ Add Trade</button>
        <Modal open={isOpen}>
          <AddTrade handleClickClose={() => setIsOpen(false)}/>
        </Modal>
      </div>
    </>
  );
}

export default AddTradeModal
