import { useState } from 'react'
import './App.css'
import AddTrade from './components/AddTrade.jsx'
// import ImportCSV from './components/ImportCSV.jsx'
import PositionsTable from './components/PositionsTable/PositionsTable.jsx'

function App() {

  // const [data, setData] = useState([]);
  // const handleFileLoad = (csvData) => {
  //   setData(csvData);
  // };
  // return (
  //   <div>
  //     <h1>CSV Import in React.js</h1>
  //     <CsvFileInput onFileLoad={handleFileLoad} />
  //     <ul>
  //       {data.map((row, index) => (
  //         <li key={index}>{JSON.stringify(row)}</li>
  //       ))}
  //     </ul>
  //   </div>
  // );
  return (
    // <AddTrade />
    <PositionsTable />
    // <ImportCSV />
    // <CsvFileInput />
  )
}

export default App
