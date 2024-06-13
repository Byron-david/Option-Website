import CsvFileInput from './CsvFileInput.jsx'

const tableHeadNames = [
  "Symbol", 
  "Qty", 
  "Type", 
  "Value", 
  "Strike",  
  "Exp. Date", 
  "Date", 
  "Open/Close", 
];

const tastyMapping = {
  "Symbol": 4,
  "Quantity": 8,
  "Call or Put": 17,
  "Value": 7,
  "Strike Price": 16,
  "Expiration Date": 15,
  "Date": 0,
  "Sub Type": 2,
};

const Remap = (data, mapping) => {
  const newArray = [];
  const mappingValues = Object.values(mapping);

  for (let i = 0; i < data.length; i++) {
    const obj = {};
    const dataValues = Object.values(data[i])

    if (data[i]["Symbol"] === null) {
        continue;
    } 
    else {
      tableHeadNames.forEach((name, index) => {
        if (name === "Symbol") {
            let splitValue = value.split(" ")[0];
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
        else if (key === "Sub Type") {
          if (value !== null) {
            obj[key] = actionValue
            
          }
          else {
            obj[key] = value
          }
        }
        obj[name] = dataValues[mappingValues[index]]
    })
      newArray.push(obj);
      }
  }
  console.log(newArray)
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