const config = require('../utils/config')
const { Client } = require("pg");
require('dotenv').config()

const SQL = `
CREATE TABLE IF NOT EXISTS strategies (
  strategyID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  symbol VARCHAR ( 255 ),
  date date,
  strategy text NOT NULL,
  qty int NOT NULL,
  strikes VARCHAR ( 255 ),
  value int,
  expiration date
);

CREATE TABLE IF NOT EXISTS trades (
  tradeID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  symbol VARCHAR ( 255 ),
  date date,
  action text NOT NULL,
  tradeType text NOT NULL,
  qty int NOT NULL,
  price Numeric(10, 2) NOT NULL,
  strikes int,
  value int NOT NULL,
  expiration date,
  strategyID INTEGER REFERENCES strategies(strategyID)
);

do
$$
declare
  new_id integer;
begin
  INSERT INTO strategies (symbol, date, strategy, qty, strikes, value, expiration) 
  VALUES
    ('SPY', (DATE '07/29/2024'), 'Vertical Spread', 1, '150 / 160', 180, (DATE '08/30/2024')) RETURNING strategyID into new_id;

  INSERT INTO trades (symbol, date, action, tradeType, qty, price, strikes, value, expiration, strategyID) 
  VALUES
    ('SPY', (DATE '07/29/2024'), 'SELL', 'PUT', 1, 1.50, 160, 150, (DATE '08/30/2024'), new_id),
    ('SPY', (DATE '07/29/2024'), 'BUY', 'PUT', 1, 1.30, 150, 130, (DATE '08/30/2024'), new_id);
end $$;

do
$$
declare
  new_id integer;
begin
  INSERT INTO strategies (symbol, date, strategy, qty, strikes, value, expiration) 
  VALUES
    ('META', (DATE '07/29/2024'), 'Iron Condor', 1, '405 / 415 / 540 / 550', 350, (DATE '08/30/2024')) RETURNING strategyID into new_id;

  INSERT INTO trades (symbol, date, action, tradeType, qty, price, strikes, value, expiration, strategyID) 
  VALUES
    ('META', (DATE '07/29/2024'), 'SELL', 'CALL', 1, 8.80, 540, 880, (DATE '08/30/2024'), new_id),
    ('META', (DATE '07/29/2024'), 'BUY', 'CALL', 1, -7.10, 550, -710, (DATE '08/30/2024'), new_id),
    ('META', (DATE '07/29/2024'), 'SELL', 'PUT', 1, 7.80, 415, 780, (DATE '08/30/2024'), new_id),
    ('META', (DATE '07/29/2024'), 'BUY', 'PUT', 1, -6.00, 405, -600, (DATE '08/30/2024'), new_id);
end $$;
`;

// SELECT * FROM strategies
// ORDER BY strategyID DESC
// LIMIT 1;



async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
