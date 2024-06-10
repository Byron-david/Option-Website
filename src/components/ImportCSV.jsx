import { useState } from 'react'
import Papa, { parse } from "papaparse";
import styles from './PositionsTable/PositionsTable.module.css'; 

function CsvData() {
    const parsedArray = [];
    const mappedTrades = [];


    const addParsedData = (data) => {
        parsedArray.push(data)
    };

    const getParsedData = () => parsedArray;

    const printParsedData = () => {
        console.log(parsedArray);
    };

    // const mapData = (mapping) => {
    //     parsedArray.forEach((obj) => )
    // }

    return {
        addParsedData,
        getParsedData,
        printParsedData
    }
}

function MapTable () {
    let newArray = {};
    const tastyMapping = {
        symbol: 4,
        action: 3,
        qty: 8,
        call_put: 17,
        value: 7,
        strike: 16,
        exp_date: 15,
        date: 0,
        open_close: 2,
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

    let count = 0;

    for (const value of Object.values(tastyMapping)) {
        // Check if Symbol
        if (value === 4) {
            let splitValue = rowHeader[value].split(" ")[0];
            colName = rowHeader[count];
            newArray.colName = splitValue;
        }
        else if (value === 0) {
            let date = new Date(rowHeader[value]);
            let day = date.getDay();
            let month = date.getMonth();
            let year = date.getFullYear().toString();
            let dateString = `${day}/${month}/${year.substring(2)}`;

            newArray.rowHeader[count] = dateString;
        }
        else {
            newArray.rowHeader[count] = value;
        }
        count++;
    }
    console.log(newArray)
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
        const dataArray = []
 
        // loads, we parse it and set the data.
        reader.onload = async ({ target }) => {
            const csv = Papa.parse(target.result, {
                header: true,
            });
            const parsedData = csv?.data;

            for (let i = 1; i < parsedData.length; i++) {
                csvData.addParsedData(parsedData[i]);
            }
        };
        reader.readAsText(file);
        MapTable()
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