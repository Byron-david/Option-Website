require('dotenv').config()
const { Client } = require("pg");

const SQL = `
-- Drop tables in correct order to respect foreign key constraints
DROP TABLE IF EXISTS trades, strategies, users;

-- Create users table with your complete schema
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Create strategies table with user reference
CREATE TABLE IF NOT EXISTS strategies (
  strategyID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  strategy text NOT NULL
);

-- Create trades table (unchanged from your original)
CREATE TABLE IF NOT EXISTS trades (
  tradeID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  symbol VARCHAR ( 255 ),
  date date,
  action text NOT NULL,
  sub_action text NOT NULL,
  trade_type text NOT NULL,
  qty int NOT NULL,
  price Numeric(10, 2) NOT NULL,
  strikes int,
  value int NOT NULL,
  expdate date,
  strategyID INTEGER REFERENCES strategies(strategyID)
);

-- Create test user and sample data
do
$$
declare
  user_id integer;
  strategy_id integer;
begin
  -- First strategy with trades
  INSERT INTO strategies (strategy, user_id) 
  VALUES ('Vertical Spread', user_id) RETURNING strategyID INTO strategy_id;

  INSERT INTO trades (symbol, date, action, sub_action, trade_type, qty, price, strikes, value, expdate, strategyID) 
  VALUES
    ('SPY', (DATE '07/29/2024'), 'SELL', 'OPEN', 'PUT', 1, 1.50, 160, 150, (DATE '08/30/2024'), strategy_id),
    ('SPY', (DATE '07/29/2024'), 'BUY', 'OPEN', 'PUT', 1, -1.30, 150, 130, (DATE '08/30/2024'), strategy_id);

  -- Second strategy with trades
  INSERT INTO strategies (strategy, user_id) 
  VALUES ('Iron Condor', user_id) RETURNING strategyID INTO strategy_id;

  INSERT INTO trades (symbol, date, action, sub_action, trade_type, qty, price, strikes, value, expdate, strategyID) 
  VALUES
    ('META', (DATE '07/29/2024'), 'SELL', 'OPEN', 'CALL', 1, 8.80, 540, 880, (DATE '08/30/2024'), strategy_id),
    ('META', (DATE '07/29/2024'), 'BUY', 'OPEN', 'CALL', 1, -7.10, 550, -710, (DATE '08/30/2024'), strategy_id),
    ('META', (DATE '07/29/2024'), 'SELL', 'OPEN', 'PUT', 1, 7.80, 415, 780, (DATE '08/30/2024'), strategy_id),
    ('META', (DATE '07/29/2024'), 'BUY', 'OPEN', 'PUT', 1, -6.00, 405, -600, (DATE '08/30/2024'), strategy_id);
end $$;
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  
  try {
    await client.connect();
    await client.query(SQL);
    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error during seeding:", error);
  } finally {
    await client.end();
  }
}

main();