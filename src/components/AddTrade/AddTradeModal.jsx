import { useState } from 'react'
import Modal from '../Modal/Modal.jsx'
import AddTradeForm from './AddTradeForm.jsx'
import styles from '../Modal/Modal.module.css'; 

function AddTradeModal({ trades, setTrades, setNewTrade, handleChange, header }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.modalButtonContainer}>
        <button onClick={() => setIsOpen(true)}>+ Add Trade</button>
        <Modal open={isOpen}>
          <AddTradeForm handleClickClose={() => setIsOpen(false)}
          trades={trades}
          setTrades={setTrades}
          header={header}
          />
        </Modal>
      </div>
    </>
  );
}

export default AddTradeModal
