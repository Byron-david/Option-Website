import { useState } from 'react'
import Modal from '../Modal/Modal.jsx'
import AddTradeForm from './AddTradeForm.jsx'
import styles from '../Modal/Modal.module.css'; 

function AddTradeModal({ allTrades, setAllTrades, setNewTrade, handleChange, header }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.modalButtonContainer}>
        <button onClick={() => setIsOpen(true)}>+ Add Trade</button>
        <Modal open={isOpen}>
          <AddTradeForm handleClickClose={() => setIsOpen(false)}
          allTrades={allTrades}
          setAllTrades={setAllTrades}
          header={header}
          />
        </Modal>
      </div>
    </>
  );
}

export default AddTradeModal
