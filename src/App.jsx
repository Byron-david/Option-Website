import { useState } from 'react'
import './App.css'
import AddTrade from './components/AddTrade.jsx'
import Navbar from './components/Navbar/Navbar.jsx'
import Modal from './components/Modal/Modal.jsx'
// import ImportCSV from './components/ImportCSV.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'

function App() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Navbar />
      <div id="mainContainer">
        <main>
          <button onClick={() => setIsOpen(true)}>Open Modal</button>
          <Modal open={isOpen} onClose={() => setIsOpen(false)}>I am Open! </Modal>
          <PositionsTable />
          <AddTrade />

        </main>
      </div>

      {/* <ImportCSV /> */}
      {/* <CsvFileInput /> */}
    </>
  )
}

export default App
