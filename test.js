
const data = [{
    "Date": "2023-12-29T09:43:35-0800",
    "Type": "Trade",
    "Sub Type": "Sell to Open",
    "Action": "SELL_TO_OPEN",
    "Symbol": "SPY   240216P00458000",
    "Instrument Type": "Equity Option",
    "Description": "Sold 1 SPY 02/16/24 Put 458.00 @ 2.94",
    "Value": "294.00",
    "Quantity": "1",
    "Average Price": "294.00",
    "Commissions": "-1.00",
    "Fees": "-0.132",
    "Multiplier": "100",
    "Root Symbol": "SPY",
    "Underlying Symbol": "SPY",
    "Expiration Date": "2/16/24",
    "Strike Price": "458.0",
    "Call or Put": "PUT",
    "Order #": "301342998",
    "Currency": "USD"
},
{
    "Date": "2023-12-29T09:43:35-0800",
    "Type": "Trade",
    "Sub Type": "Buy to Close",
    "Action": "BUY_TO_CLOSE",
    "Symbol": "SPY   240119P00458000",
    "Instrument Type": "Equity Option",
    "Description": "Bought 1 SPY 01/19/24 Put 458.00 @ 0.86",
    "Value": "-86.00",
    "Quantity": "1",
    "Average Price": "-86.00",
    "Commissions": "0.00",
    "Fees": "-0.12",
    "Multiplier": "100",
    "Root Symbol": "SPY",
    "Underlying Symbol": "SPY",
    "Expiration Date": "1/19/24",
    "Strike Price": "458.0",
    "Call or Put": "PUT",
    "Order #": "301342998",
    "Currency": "USD"
}]
const mappedResult = data.map((option) => ({ date: option.Date }));

const tastyMapping = [4, 3, 8, 17, 7, 16, 15, 0, 2]

const rowHeader = [
    "Symbol", 
    "Action", 
    "Qty", 
    "Call/Put", 
    "Value", 
    "Strike",  
    "Exp. Date", 
    "Date", 
    "Open/Close", 
];

const parsedHeader = [
    "Date",
    "Type",
    "Sub Type",
    "Action",
    "Symbol",
    "Instrument Type",
    "Description",
    "Value",
    "Quantity",
    "Average Price",
    "Commissions",
    "Fees",
    "Multiplier",
    "Root Symbol",
    "Underlying Symbol",
    "Expiration Date",
    "Strike Price",
    "Call or Put",
    "Order #",
    "Currency"
]
const newArray = [];

for (let i = 0; i < data.length; i++) {
    const obj = {};
    if (data[i]["Symbol"] === "") {
        continue;
    } 
    else {
        rowHeader.forEach((column, index) => {
            const value = data[i][parsedHeader[tastyMapping[index]]];
            if (column === "Symbol") {
                let splitValue = data[i][column].split(" ")[0];
                obj[column] = splitValue;
            }
            else if (column === "Date") {
                let date = new Date(value);
                let day = date.getDay();
                let month = date.getMonth();
                let year = date.getFullYear().toString();
                let dateString = `${day}/${month}/${year.substring(2)}`;

                obj[column] = dateString;
            }
            else {
                obj[column] = value
            }
        }
        )
            newArray.push(obj)
        }
}
let strArray = [ "q", "w", "w", "w", "e", "i", "i", "u", "r"];
let findDuplicates = arr => arr.filter((item, index) => arr.indexOf(item) !== index)

// console.log(findDuplicates(strArray)) // All duplicates
// console.log([...new Set(findDuplicates(strArray))]) // Unique duplicates


const trades = [
    {
      "id": "4f5f",
      "stock": [
        {
          "symbol": "AAPL",
          "strike": "140",
          "posType": "BUY",
          "tradeValue": "-130",
          "expDate": "",
          "quantity": "1",
          "dateExec": "2024-09-01"
        },
        {
          "symbol": "AAPL",
          "strike": "120",
          "posType": "Sell",
          "tradeValue": "150",
          "expDate": "",
          "quantity": "1",
          "dateExec": "2024-07-12"
        }
      ]
    },
    {
      "id": "3i6d",
      "stock": [
        {
          "symbol": "TSLA",
          "strike": "220",
          "posType": "BUY",
          "tradeValue": "-260",
          "expDate": "",
          "quantity": "1",
          "dateExec": "2024-10-01"
        },
        {
          "symbol": "TSLA",
          "strike": "230",
          "posType": "Sell",
          "tradeValue": "250",
          "expDate": "",
          "quantity": "1",
          "dateExec": "2024-11-12"
        }
      ]
    }
  ]

  const headers = Object.keys(data[0]);
//   const rows = trades.map(item => Object.values(item))
  const rows = trades.map(item => Object.values(item)[1])

//   const result = trades.map(row => {
//     // console.log(row)
//     console.log(row.stock.map((option, index) => option.map(value => value)))
//     // return {[row.symbol]: row.strike}
//   })
  
  const result = rows.map((row, index) => {
    // console.log(row)
    row.map((cell, index) => Object.values(cell).map((value, index) => console.log(`${Object.keys(cell)[index]}: ${value}`)))
    // return {[row.symbol]: row.strike}
  })

result

// console.log(newArray)