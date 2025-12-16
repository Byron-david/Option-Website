import { v4 as uuid } from 'uuid';
import { defaultStock, defaultLeg, strategyOptions } from '../templates/tradeDefaults';

const SYMBOLS = ['AAPL', 'TSLA', 'MSFT', 'GOOGL', 'AMZN', 'NVDA', 'SPY', 'IWM'];

const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getRandomDate = () => {
    const start = new Date(2023, 0, 1);
    const end = new Date();
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    return date.toISOString().split('T')[0];
};

const getExpDate = (startDate) => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + getRandomInt(7, 45)); // Expire 7-45 days later
    return date.toISOString().split('T')[0];
};

export const generateRandomTrade = () => {
    // 1. Basic Info
    const symbol = getRandomItem(SYMBOLS);
    const date = getRandomDate();
    const expDate = getExpDate(date);
    const currentPrice = getRandomInt(50, 400); // Random stock price
    
    // 2. Pick Strategy (exclude "Custom" or empty if any)
    const validStrategies = strategyOptions.filter(s => s.quantity > 0);
    const strategyConfig = getRandomItem(validStrategies);
    const strategy = strategyConfig.value;

    const trades = [];

    // 3. Add Stock Leg (if applicable)
    if (strategy === "Stock" || strategy === "Covered Call") {
        trades.push({
            ...defaultStock,
            symbol,
            date,
            price: currentPrice,
            qty: 100,
            value: (currentPrice * 100).toFixed(2)
        });
    }

    // 4. Generate Option Legs
    if (strategyConfig.quantity > 0 && strategy !== "Stock") {
        // Base strike logic
        let baseStrike = Math.round(currentPrice / 5) * 5; 
        
        for (let i = 0; i < strategyConfig.quantity; i++) {
            const leg = { ...defaultLeg, symbol, date, exp: expDate };
            
            // --- Strategy Specific Logic ---
            
            if (strategy === "Option") {
                 // Random Call or Put
                 leg.trade_type = Math.random() > 0.5 ? "CALL" : "PUT";
                 leg.strikes = baseStrike;
                 leg.price = getRandomInt(1, 10);
            }
            
            else if (strategy === "Covered Call") {
                leg.action = "SELL";
                leg.trade_type = "CALL";
                leg.strikes = baseStrike + 5; // OTM
                leg.price = getRandomInt(2, 8);
            }
            
            else if (strategy === "Vertical Spread") {
                // Example: Debit Call Spread
                leg.trade_type = "CALL";
                if (i === 0) {
                    leg.action = "BUY";
                    leg.strikes = baseStrike;
                    leg.price = 5.50;
                } else {
                    leg.action = "SELL";
                    leg.strikes = baseStrike + 5;
                    leg.price = 2.50;
                }
            }
            
            else if (strategy === "Iron Condor") {
                // Leg 0: Buy Put (Low)
                // Leg 1: Sell Put (Mid-Low)
                // Leg 2: Sell Call (Mid-High)
                // Leg 3: Buy Call (High)
                const width = 5;
                if (i === 0) { leg.trade_type = "PUT"; leg.action = "BUY"; leg.strikes = baseStrike - width - width; leg.price = 0.50; }
                if (i === 1) { leg.trade_type = "PUT"; leg.action = "SELL"; leg.strikes = baseStrike - width; leg.price = 1.50; }
                if (i === 2) { leg.trade_type = "CALL"; leg.action = "SELL"; leg.strikes = baseStrike + width; leg.price = 1.50; }
                if (i === 3) { leg.trade_type = "CALL"; leg.action = "BUY"; leg.strikes = baseStrike + width + width; leg.price = 0.50; }
            }

            else if (strategy === "Strangle") {
                leg.action = "SELL";
                if (i === 0) { leg.trade_type = "PUT"; leg.strikes = baseStrike - 10; }
                if (i === 1) { leg.trade_type = "CALL"; leg.strikes = baseStrike + 10; }
                leg.price = getRandomInt(1, 5);
            }

            else if (strategy === "Butterfly") {
                leg.trade_type = "CALL";
                if (i === 0) { leg.action = "BUY"; leg.strikes = baseStrike - 5; }
                if (i === 1) { leg.action = "SELL"; leg.strikes = baseStrike; leg.qty = 2; }
                if (i === 2) { leg.action = "BUY"; leg.strikes = baseStrike + 5; }
                leg.price = getRandomInt(1, 5);
            }

            leg.value = (leg.price * 100 * leg.qty).toFixed(2);
            trades.push(leg);
        }
    }

    return {
        newTrade: {
            symbol,
            date,
            strategy,
            trades
        },
        preset: strategy,
        stockVisible: (strategy === "Stock" || strategy === "Covered Call") ? 1 : 0
    };
};