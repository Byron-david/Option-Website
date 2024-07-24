import { useState } from 'react'
import styles from './MainContent.module.css'; 
import AddTradeModal from './AddTrade/AddTradeModal.jsx'
import ImportCsvModal from './ImportCsvModal.jsx'
import PositionsTable from './PositionsTable/PositionsTable.jsx';

function MainContent() {
  return (
    <>
      <div id={styles.mainContainer}>
        <main>
          <AddTradeModal />
          <ImportCsvModal />
          <PositionsTable />
        </main>
      </div>
    </>
  )
}

export default MainContent
