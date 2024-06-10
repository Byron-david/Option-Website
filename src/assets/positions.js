import {promises as fs} from "fs";
import { parse } from "csv-parse/browser/esm/sync";
// import { generate } from 'csv-generate/browser/esm/csv-generate';
// import { transform } from 'csv-transform/browser/esm/stream-transform';

// Create Page
function positionsTable() {
    const div = document.querySelector("#content");
    const container = document.createElement("div");
    const tbl = document.createElement("table");
    let rowHeader = ["Symbol", "Action", "Qty", "Call/Put", "Value", "Strike",  "Exp. Date", "Date", "Open/Close"];
    let tableName = "tasty";

    // Sold 1 SPY 02/16/24 Put 458.00 @ 2.94

    const addContainer = () => {
        container.setAttribute("class", "container")
        div.appendChild(container);
    }

    const addTitle = () => {
        const title = document.createElement("h3");

        title.textContent = "Current Positions"
        container.appendChild(title);
    }

    const addRow = (node, nodeName, headerText) => {
        const tempNode = document.createElement(nodeName);

        tempNode.textContent =  headerText;
        node.appendChild(tempNode);
    }

    const addHeader = (rowHeading) => {
        const thead = document.createElement("thead");
        const tr = document.createElement("tr");
        tbl.appendChild(thead);
        thead.appendChild(tr);

        rowHeading.forEach((row) => addRow(tr, "th", row));
    }

    const addBody = (bodyName) => {
        const table = document.querySelector("table");
        const tbody = document.createElement("tbody");
        const tr = document.createElement("tr");

        tr.setAttribute("id", bodyName);
        table.appendChild(tbody);
        tbody.appendChild(tr);
    }

    const addRowData = (rowArray) => {
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
        

        for (const value of Object.values(tastyMapping)) {
            // Check if Symbol
            if (value === 4) {
                let splitValue = rowArray[value].split(" ")[0];

                addRow(tr, "td", splitValue);
            }
            else if (value === 0) {
                let date = new Date(rowArray[value]);
                let day = date.getDay();
                let month = date.getMonth();
                let year = date.getFullYear().toString();
                let dateString = `${day}/${month}/${year.substring(2)}`;

                addRow(tr, "td", dateString);
            }
            else {
                addRow(tr, "td", rowArray[value]);
            }
        }
    };

    const makeTable = () => {
        addContainer();
        addTitle();
        container.appendChild(tbl);
        addHeader(rowHeader);
        addBody();
    };
    
    return { 
        makeTable,
        addRowData,
        addBody
    }
}

function csvNaming () {
    let csvNames = {};

    const arrayToNumberedObj = (obj) => {
        return Object.assign({}, obj);
    };

    const getCsvNames = (records) => {
        let csvNames = {};
        csvNames = records[0];
        return arrayToNumberedObj(csvNames);
    }

    const printCsvNames = () => {
        console.log(csvNames);
    }

    const getKeyfromVal = (obj, value) => {
        return Object.keys(obj).find(key => obj[key] === value);
    };


    return {
        getCsvNames,
        printCsvNames,
        arrayToNumberedObj,
        getKeyfromVal,
    }
}

function importCSV () {
    const posTable = positionsTable();
    const button = document.createElement("button");
    const input = document.createElement("input");

    const addImportButton = () => {
        const div = document.createElement("div")
        const table = document.querySelector("table");
        let parentTable = table.parentNode;

        div.setAttribute("id", "inputContainer");

        button.setAttribute("onclick", "inputfile.click()");
        button.classList.add("inputbutton");
        button.textContent = "Import CSV";

        input.setAttribute("type", "file");
        input.setAttribute("name", "inputfile");
        input.setAttribute("id", "inputfile");
        
        parentTable.insertBefore(div, table);
        div.appendChild(button);
        div.appendChild(input);
    };

    const addImportEvent= (id) => {
        let inFile = document.getElementById(id);
        const csvNames = csvNaming();

        inFile.addEventListener("change", function () {
            let fr = new FileReader();
            fr.onload = async function () {
              const records = await parse(fr.result, {bom: true});
              let columns = csvNames.getCsvNames(records);
              console.log(columns);
              for (let i = 1; i < records.length; i++) {
                let symbolName = csvNames.getKeyfromVal(columns, "Symbol");
                if (records[i][symbolName] === "") {
                    continue;
                } 
                else {
                    posTable.addRowData(records[i]);
                }
              }
            }
            fr.readAsText(this.files[0]);
        });
    };

    const makeCSVImporter = () => {
        addImportButton();
        addImportEvent("inputfile");
    };

    return {
        makeCSVImporter
    }
}

function positionsPage() {
    const table = positionsTable();
    const csv = importCSV();

    table.makeTable();
    csv.makeCSVImporter();
}


export {
    positionsPage
};
