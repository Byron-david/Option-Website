import { useState } from 'react'
import Modal from '../Modal/Modal.jsx'
import AddTradeForm from './AddTradeForm.jsx'
import styles from '../Modal/Modal.module.css'; 
import Button from '../Button/Button.jsx'
import { useTradeFormLogic } from '../../hooks/useTradeFormLogic.js'
import { generateRandomTrade } from '../../utils/randomTradeGenerator.js'

function AddTradeModal({ allTrades, setAllTrades, header }) {
  const [isOpen, setIsOpen] = useState(false);

  const { setNewTrade, setPreset, setStockVisible } = useTradeFormLogic();

  const handleRandomTrade = () => {
    // 1. Generate Data
    const { newTrade, preset, stockVisible } = generateRandomTrade();

    // 2. Update Context State
    setNewTrade(newTrade);
    setPreset(preset);
    setStockVisible(stockVisible);

    // 3. Open Modal
    setIsOpen(true);
  };

  return (
    <>
      <div className={styles.modalButtonContainer}>
        <Button handleClick={() => setIsOpen(true)} text="+ Add Trade" className={styles.addTrade}/>

        <Button 
            handleClick={handleRandomTrade} 
            text="Generate Random Trade" 
            backgroundColor="var(--color-orange)"
            className={styles.addTrade}
        />
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
