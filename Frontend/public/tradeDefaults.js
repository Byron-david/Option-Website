const defaultTrade = { 
    symbol: '', 
    date: ''
 }

const defaultStock = {
    action: 'BUY', 
    sub_action: 'OPEN', 
    trade_type: 'STOCK', 
    qty: '', 
    price: '', 
    value: '', 
    exp: null, 
}

const defaultLeg = { 
    action: 'BUY',
    sub_action: 'OPEN', 
    trade_type: 'CALL', 
    qty: 1, 
    strikes: '', 
    value: '', 
    exp: '', 
}

const strategyOptions = [
    // { id: 0, value: "None", text: "None", quantity: 0 },
    { id: 0, value: "Stock", text: "Stock", quantity: 0 },
    { id: 1, value: "Option", text: "Single Option", quantity: 1 },
    { id: 2, value: "Covered Call", text: "Covered Call", quantity: 1 },
    { id: 3, value: "Vertical Spread", text: "Vertical Spread", quantity: 2 },
    { id: 4, value: "Strangle", text: "Strangle", quantity: 2 },
    { id: 6, value: "Butterfly", text: "Butterfly", quantity: 3 },
    { id: 5, value: "Iron Condor", text: "Iron Condor", quantity: 4 },
    // { id: 0, value: "ratioSpread", text: "Ratio Spread", quantity: 3 },
    // { id: uuid(), value: "custom", text: "Custom", quantity: 0 }
  ]

const action = [
    { id: 0, value: "BUY", text: "Buy" },
    { id: 1, value: "SELL", text: "Sell" },
]

const subAction = [
    { id: 0, value: "OPEN", text: "Open" },
    { id: 1, value: "CLOSE", text: "Close" },
]

const posType = [
    { id: 0, value: "PUT", text: "Put" },
    { id: 1, value: "CALL", text: "Call" },
]

// base are defaults for each trade
const defaultNewTrade = {
  base: {
    symbol: '',
    date: ''
  },
  stock: {
    action: 'BUY', 
    sub_action: 'OPEN', 
    trade_type: 'STOCK', 
    qty: '', 
    price: '', 
    value: '', 
    exp: null, 
  },
  legs: []
}

export { 
    defaultNewTrade,
    defaultTrade,
    defaultStock,
    defaultLeg,
    strategyOptions,
    action,
    subAction,
    posType
}