import { useState } from 'react'
import styles from './MainContent.module.css'; 
import AddTradeModal from './AddTrade/AddTradeModal.jsx'
import ImportCsvModal from './ImportCsvModal.jsx'
import TradesTable from './TradesTable/TradesTable.jsx';

function MainContent() {
  return (
    <>
      <div id={styles.mainContainer}>
        <main>
          <AddTradeModal />
          <ImportCsvModal />
          <TradesTable />
        </main>
      </div>
    </>
  )
}

export default MainContent
