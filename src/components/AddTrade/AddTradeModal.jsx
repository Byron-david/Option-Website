import { useState } from 'react'
import Modal from '../Modal/Modal.jsx'
import AddTradeForm from './AddTradeForm.jsx'
import styles from '../Modal/Modal.module.css'; 

function AddTradeModal({ setNewTrade, handleChange }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.modalButtonContainer}>
        <button onClick={() => setIsOpen(true)}>+ Add Trade</button>
        <Modal open={isOpen}>
          <AddTradeForm handleClickClose={() => setIsOpen(false)} setNewTrade={setNewTrade}/>
        </Modal>
      </div>
    </>
  );
}

export default AddTradeModal
