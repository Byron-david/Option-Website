import { useState } from 'react'
import Modal from '../Modal/Modal.jsx'
import AddTradeForm from './AddTradeForm.jsx'
import styles from '../Modal/Modal.module.css'; 
import Button from '../Button/Button.jsx'

function AddTradeModal({ allTrades, setAllTrades, setNewTrade, handleChange, header }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className={styles.modalButtonContainer}>
        <Button handleClick={() => setIsOpen(true)} text="+ Add Trade" className={styles.addTrade}/>
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
