const config = require('../utils/config')
const { Client } = require("pg");
require('dotenv').config()

const SQL = `
CREATE TABLE IF NOT EXISTS trades (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  symbol VARCHAR ( 255 ),
  date time

);

INSERT INTO trades (symbol) 
VALUES
  ('SPY'),
  ('TSLA'),
  ('AAPL');
`;

// action text NOT NULL,
// strategy text NOT NULL,
// qty int NOT NULL,
// price int NOT NULL,
// strikes int NOT NULL,
// value int NOT NULL,
// expiration time



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
