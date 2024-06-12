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
  const mappingKeys = Object.keys(mapping);

  for (let i = 0; i < data.length; i++) {
    const obj = {};
    const dataValues = Object.values(data[i])

    if (data[i]["Symbol"] === null) {
        continue;
    } 
    else {
      tableHeadNames.forEach((name, index) => (
        // console.log(dataValues[mappingValues[index]])
        obj[name] = dataValues[mappingValues[index]]
      // { [name]: dataValues[mappingValues[index]] }
      ))
      newArray.push(obj)
      // for (const element of tableHeadNames) {
      //   obj[element] = dataValues[]
      // const result = dataValues.map((option) => (
      //   tableHeadNames.forEach((name, index) => (
      //       // console.log(mappingValues[index])
      //     { name: [dataValues[mappingKeys[index]]]}
      //   )
        
      //   )))

      }
      // else {
      //     for (const key of mapping) {
      //         const value = data[i][key];
      //         if (key === "Symbol") {
      //             let splitValue = value.split(" ")[0];
      //             obj[key] = splitValue;
      //         }
      //         else if (key === "Date") {
      //             let date = new Date(value);
      //             let day = date.getDay();
      //             let month = date.getMonth();
      //             let year = date.getFullYear().toString();
      //             let dateString = `${day}/${month}/${year.substring(2)}`;
  
      //             obj[key] = dateString;
      //         }
      //         else if (key === "Sub Type") {
      //           if (value !== null) {
      //             obj[key] = actionValue
                  
      //           }
      //           else {
      //             obj[key] = value
      //           }
      //         }
      //         else {
      //             obj[key] = value
      //         }
      //     }
      //         newArray.push(obj)
      //     }
      // newArray["Edit/Remove"] = "";
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