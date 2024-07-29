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
  tradesID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  symbol VARCHAR ( 255 ),
  date date,
  action text NOT NULL,
  strategy text NOT NULL,
  qty int NOT NULL,
  price Numeric(10, 2) NOT NULL,
  strikes int,
  value int NOT NULL,
  expiration date,
  groupID INTEGER REFERENCES strategies(strategyID)
);

INSERT INTO strategies (symbol, date, strategy, qty, strikes, value, expiration) 
VALUES
  ('SPY', to_date('07/29/2024', 'MM/DD/YYYY'), 'Vertical Spread', 1, '150 / 160', 180, to_date('08/30/2024', 'MM/DD/YYYY')),
  ('TSLA', to_date('07/29/2024', 'MM/DD/YYYY'), 'Vertical Spread', 1, '240 / 250', 600, to_date('08/30/2024', 'MM/DD/YYYY'));

INSERT INTO trades (symbol, date, action, strategy, qty, price, strikes, value, expiration) 
VALUES
  ('SPY', to_date('07/29/2024', 'MM/DD/YYYY'), 'SELL', 'PUT', 1, 1.50, 160, 150, to_date('08/30/2024', 'MM/DD/YYYY')),
  ('SPY', to_date('07/29/2024', 'MM/DD/YYYY'), 'BUY', 'PUT', 1, 1.30, 150, 130, to_date('08/30/2024', 'MM/DD/YYYY')),
  ('TSLA', to_date('07/29/2024', 'MM/DD/YYYY'), 'SELL', 'CALL', 1, 3.10, 240, 310, to_date('08/30/2024', 'MM/DD/YYYY')),
  ('TSLA', to_date('07/29/2024', 'MM/DD/YYYY'), 'BUY', 'CALL', 1, 2.90, 250, 290, to_date('08/30/2024', 'MM/DD/YYYY'));
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
