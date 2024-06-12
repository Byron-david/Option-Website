import CsvFileInput from './CsvFileInput.jsx'

const tableHeadNames = [
  "Symbol", 
  "Action", 
  "Qty", 
  "Call/Put", 
  "Value", 
  "Strike",  
  "Exp. Date", 
  "Date", 
  "Open/Close", 
  "Edit/Remove"
];

const tastyMapping = [
  "Symbol",
  "Action",
  "Quantity",
  "Call or Put",
  "Value",
  "Strike Price",
  "Expiration Date",
  "Date",
  "Sub Type",
];

const Remap = (data, mapping) => {
  const newArray = [];

  for (let i = 0; i < data.length; i++) {
      const obj = {};

      if (data[i]["Symbol"] === null) {
          continue;
      } 
      else {
          for (const key of mapping) {
              const value = data[i][key];
              if (key === "Symbol") {
                  let splitValue = data[i][key].split(" ")[0];
                  obj[key] = splitValue;
              }
              else if (key === "Date") {
                  let date = new Date(value);
                  let day = date.getDay();
                  let month = date.getMonth();
                  let year = date.getFullYear().toString();
                  let dateString = `${day}/${month}/${year.substring(2)}`;
  
                  obj[key] = dateString;
              }
              else {
                  obj[key] = value
              }
          }
              newArray.push(obj)
          }
  }
  return (
    newArray
  )
}

const RemapData = ({ onFileLoad }) => {
  const handleFileLoad = (csvData) => {
    onFileLoad(Remap(csvData, tastyMapping));
  }

    return (
      <CsvFileInput onFileLoad={handleFileLoad} />
    );
  };
  export default RemapData;