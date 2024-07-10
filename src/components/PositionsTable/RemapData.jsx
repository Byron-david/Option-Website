import CsvFileInput from '../Input/CsvFileInput.jsx'

const tableHeadNames = [
  "Symbol", 
  "Action", 
  "Type", 
  "Qty", 
  "Value", 
  "Strike",  
  "Exp. Date", 
  "Date",
  "Time"
];

const tastyMapping = {
  "Symbol": 4,
  "Sub Type": 2,
  "Call or Put": 17,
  "Quantity": 8,
  "Value": 7,
  "Strike Price": 16,
  "Expiration Date": 15,
  "Date": 0,
  "Time": 0
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
        const value = dataValues[mappingValues[index]];
        if (name === "Symbol" || name === "Action") {
            const splitValue = value.split(" ")[0];
            obj[name] = splitValue;
        }
        else if (name === "Date") {
          const date = new Date(value);
          const day = date.getDay();
          const month = date.getMonth();
          const year = date.getFullYear().toString();
          const dateString = `${day}/${month}/${year.substring(2)}`;

          obj[name] = dateString;
        }
        else if (name === "Time") {
          const date = new Date(value);
          const hour = date.getHours();
          let min = date.getMinutes();
          if (min < 10) {
            min = `0${min}`;
          }
          const time = `${hour}:${min}`;

          obj[name] = time;
        }
        // Check if stock or option
        else if (name === "Type" && data[i]["Instrument Type"] === "Equity") {
          obj[name] = "Stock";
        }
        else {
          obj[name] = value;
        }
    })
      newArray.push(obj);
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