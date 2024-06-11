import { useState } from 'react'
import Papa, { parse } from "papaparse";
import styles from './PositionsTable/PositionsTable.module.css'; 

function CsvData() {
    const parsedRows = [];
    let parsedHeader = [];
    const mappedTrades = [];


    const addParsedRows = (data) => {
        parsedRows.push(data);
    };

    const addParsedHeader = (data) => {
        parsedHeader = Object.keys(data);
    };

    const getParsedHeader = () => parsedHeader;

    const getParsedData = () => parsedRows;

    const printParsedData = () => {
        console.log(parsedRows);
    };

    const mapData = (mapping) => {
        for (let i = 0; i < parsedRows.length; i++) {
            mappedTrades[mapping[i]]
        }
    }

    return {
        addParsedRows,
        addParsedHeader,
        getParsedHeader,
        getParsedData,
        printParsedData
    }
}

function MapTable () {
    const tastyMapping = {
        "Symbol": 4,
        "Action": 3,
        "Quantity": 8,
        "Call or Put": 17,
        "Value": 7,
        "Strike Price": 16,
        "Expiration Date": 15,
        "Date": 0,
        "Sub Type": 2,
    };
    const rowHeader = ["Symbol", 
                        "Action", 
                        "Qty", 
                        "Call/Put", 
                        "Value", 
                        "Strike",  
                        "Exp. Date", 
                        "Date", 
                        "Open/Close", 
                        "Edit/Del"];

    const csvData = CsvData();

    // let count = 0;

    // rowHeader.forEach(function (value, i) {
    //     console.log('%d: %s', i, value);
    // });

    ////
    const data = [{ id: 4, val: "21321" }, { id: 5, val: "435345" }, { id: 6, val: "345345" }],
    result = data.reduce((res, {id, val}) => {
      if(id === 5) {
        return res;
      }
      res.push({id: res.length + 1, val});
      return res;
    }, []);
    console.log(result)
    ////

    // for (const [key, value] of Object.values(tastyMapping)) {
    //     // Check if Symbol
    //     if (key === "Symbol") {
    //         let splitValue = rowHeader[value].split(" ")[0];
    //     }
    //     else if (value === 0) {
    //         let date = new Date(rowHeader[value]);
    //         let day = date.getDay();
    //         let month = date.getMonth();
    //         let year = date.getFullYear().toString();
    //         let dateString = `${day}/${month}/${year.substring(2)}`;

    //         newArray.rowHeader[count] = dateString;
    //     }
    //     else {
    //         newArray.rowHeader[count] = value;
    //     }
    //     count++;
    // }
    // console.log(newArray)
};

// Allowed extensions for input file
const allowedExtensions = ["csv"];

function ImportCSV() {
    const [data, setData] = useState([]);
    const [error, setError] = useState("");
    const [file, setFile] = useState("");

    // This function will be called when
    // the file input changes
    const handleFileChange = (e) => {
        setError("");
 
        // Check if user has entered the file
        if (e.target.files.length) {
            const inputFile = e.target.files[0];
 
            // Check if CSV file
            const fileExtension =
                inputFile?.type.split("/")[1];
            if (
                !allowedExtensions.includes(fileExtension)
            ) {
                setError("Please select .csv file");
                return;
            }
 
            // If input type is correct set the state
            setFile(inputFile);
        }
    };
    const handleParse = () => {
        if (!file) return alert("Add a csv file first");
 
        const reader = new FileReader();
        const csvData = CsvData();
 
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, {
                header: true,
            });
            const parsedData = csv?.data;
            csvData.addParsedHeader(parsedData[0]);

            for (let i = 1; i < parsedData.length; i++) {
                if (parsedData[i]["Symbol"] === "") {
                    continue;
                } 
                else {
                    csvData.addParsedRows(parsedData[i]);
                }
            }
        };
        reader.readAsText(file);
    };
 
    return (
        <div className="App">
            <h3>Read CSV file in React</h3>
            <div className="container">
                <label
                    htmlFor="csvInput"
                    style={{ display: "block" }}
                >
                    Enter CSV File
                </label>
                <input
                    onChange={handleFileChange}
                    id="csvInput"
                    name="file"
                    type="File"
                />
                <div>
                    <button onClick={handleParse}>
                        Parse
                    </button>
                </div>
                <div style={{ marginTop: "3rem" }}>
                    {error
                        ? error
                        : data.map((e, i) => (
                              <div key={i} className="item">
                                  {e[0]}:{e[1]}
                              </div>
                          ))}
                </div>
            </div>
        </div>
    );
}

export default ImportCSV