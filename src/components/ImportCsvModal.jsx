import { useState } from 'react'
import Modal from './Modal/Modal.jsx'
import RemapData from './PositionsTable/RemapData.jsx'
import ContainerTemplate from './Templates/ContainerTemplate.jsx'
import Button from './Button/Button.jsx'
import styles from './Modal/Modal.module.css'; 
import templateStyles from './Templates/Templates.module.css'; 
import DropdownInput from './Input/DropdownInput.jsx'
import { v4 as uuidv4 } from 'uuid';
import TitleTemplate from './Templates/TitleTemplate.jsx'
import BodyTemplate from './Templates/BodyTemplate.jsx'
import FooterTemplate from './Templates/FooterTemplate.jsx'

const brokerageNames = [
    { id: uuidv4(), value: "tastytrade", text: "Tastytrade" },
    { id: uuidv4(), value: "schwab", text: "Charles Schwab" },
    { id: uuidv4(), value: "fidelity", text: "Fidelity" },
    { id: uuidv4(), value: "ib", text: "Interactive Brokers" },
    { id: uuidv4(), value: "etrade", text: "ETrade" },
]

function ImportCsvModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState("Tastytrade");

  return (
    <>
      <div className={styles.modalButtonContainer}>
        <button onClick={() => setIsOpen(true)}>Import CSV</button>
        <Modal open={isOpen}>
            <ContainerTemplate>
                <TitleTemplate>Import CSV</TitleTemplate>
                <BodyTemplate>
                    <DropdownInput 
                        value={value} 
                        items={brokerageNames} 
                        onChange={e => setValue(e.target.value)} 
                        htmlFor="strategyInput" 
                        name="strategyInput" 
                        id="strategyInput" 
                        text="Strategy:" />
                    <RemapData />
                </BodyTemplate>
                <FooterTemplate>
                    <Button text="Cancel" backgroundColor="var(--background-color-button-red)" handleClick={() => setIsOpen(false)} />
                    <Button text="Save" className="buttonAdd" handleClick={console.log("Saving...")} />
                </FooterTemplate>
            </ContainerTemplate>
        </Modal>
      </div>
    </>
  );
}

export default ImportCsvModal
