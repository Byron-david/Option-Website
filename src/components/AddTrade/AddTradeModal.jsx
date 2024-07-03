import { useState } from 'react'
import Modal from '../Modal/Modal.jsx'
import AddTradeForm from './AddTradeForm.jsx'
import styles from '../Modal/Modal.module.css'; 

function AddTradeModal({ newTrade, addTrade, handleChange }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.modalButtonContainer}>
        <button onClick={() => setIsOpen(true)}>+ Add Trade</button>
        <Modal open={isOpen}>
          <AddTradeForm addTrade={addTrade} handleClickClose={() => setIsOpen(false)} handleChange={handleChange} newTrade={newTrade}/>
        </Modal>
      </div>
    </>
  );
}

export default AddTradeModal
