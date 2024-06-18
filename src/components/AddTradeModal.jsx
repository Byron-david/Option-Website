import { useState } from 'react'
import Modal from './Modal/Modal.jsx'
import AddTrade from './AddTrade.jsx'

function AddTradeModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button onClick={() => setIsOpen(true)}>+ Add Trade</button>
      <Modal open={isOpen}>
        <AddTrade handleClickClose={() => setIsOpen(false)}/>
      </Modal>
    </>
  );
}

export default AddTradeModal
