require('dotenv').config();
const { Client } = require("pg");
const bcrypt = require('bcrypt');

const createSeedData = async () => {
  const saltRounds = 10;
  const plainPassword = 'abcd1234'; // Your chosen default password
  // Ensure bcrypt hashing happens correctly
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds).catch(err => {
      console.error("Error hashing password during seed prep:", err);
      throw err; // Stop seeding if password hashing fails
  });

  // Escape single quotes in the hashed password for SQL insertion, although parameterized queries are safer
  // For a DO block, embedding might be necessary, but be cautious. Using E'' syntax is often safer.
  // Let's try embedding directly first, as pg might handle it. If not, use E'' or parameterized approach if possible.
  const safeHashedPassword = hashedPassword.replace(/'/g, "''"); // Basic escaping for single quotes

  return `
-- Drop tables in correct order to respect foreign key constraints
DROP TABLE IF EXISTS trades;
DROP TABLE IF EXISTS strategies;
DROP TABLE IF EXISTS users; -- Drop users last

-- Create users table with your complete schema
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL, -- Added UNIQUE constraint to email
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Create strategies table with user reference
CREATE TABLE IF NOT EXISTS strategies (
  strategyID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL, -- Made user_id NOT NULL
  strategy text NOT NULL
  -- Optional: Add constraint to ensure strategy name is unique per user
  -- CONSTRAINT unique_strategy_per_user UNIQUE (user_id, strategy)
);

-- Create trades table WITH user_id reference
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
  -- Add user_id column referencing users table
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL, -- Added user_id
  -- Existing strategyID reference (made consistent)
  strategyID INTEGER REFERENCES strategies(strategyID) ON DELETE CASCADE NOT NULL -- Added NOT NULL and CASCADE
);

-- Optional but Recommended Indexes
CREATE INDEX IF NOT EXISTS idx_trades_user_id ON trades(user_id);
CREATE INDEX IF NOT EXISTS idx_trades_strategyID ON trades(strategyID);
CREATE INDEX IF NOT EXISTS idx_strategies_user_id ON strategies(user_id);


-- Create test user and sample data
DO
$$
DECLARE
  test_user_id integer;     -- Renamed variable for clarity
  current_strategy_id integer; -- Renamed variable for clarity
BEGIN
  -- Insert default user with properly hashed password
  INSERT INTO users (username, email, password_hash)
  VALUES ('test', 'test@example.com', '${safeHashedPassword}') -- Used escaped hash
  RETURNING id INTO test_user_id; -- Capture the generated user ID

  -- First strategy with trades
  INSERT INTO strategies (strategy, user_id)
  VALUES ('Vertical Spread', test_user_id) -- Use the captured user ID
  RETURNING strategyID INTO current_strategy_id; -- Capture the strategy ID

  INSERT INTO trades (symbol, date, action, sub_action, trade_type, qty, price, strikes, value, expdate, strategyID, user_id)
  VALUES
    ('SPY', '2024-07-29', 'SELL', 'OPEN', 'PUT', 1, 1.50, 160, 150, '2024-08-30', current_strategy_id, test_user_id),
    ('SPY', '2024-07-29', 'BUY', 'OPEN', 'PUT', 1, -1.30, 150, 130, '2024-08-30', current_strategy_id, test_user_id);

  -- Second strategy with trades
  INSERT INTO strategies (strategy, user_id)
  VALUES ('Iron Condor', test_user_id) -- Use the captured user ID
  RETURNING strategyID INTO current_strategy_id; -- Capture the new strategy ID

  INSERT INTO trades (symbol, date, action, sub_action, trade_type, qty, price, strikes, value, expdate, strategyID, user_id)
  VALUES
    ('META', '2024-07-29', 'SELL', 'OPEN', 'CALL', 1, 8.80, 540, 880, '2024-08-30', current_strategy_id, test_user_id),
    ('META', '2024-07-29', 'BUY', 'OPEN', 'CALL', 1, -7.10, 550, -710, '2024-08-30', current_strategy_id, test_user_id),
    ('META', '2024-07-29', 'SELL', 'OPEN', 'PUT', 1, 7.80, 415, 780, '2024-08-30', current_strategy_id, test_user_id),
    ('META', '2024-07-29', 'BUY', 'OPEN', 'PUT', 1, -6.00, 405, -600, '2024-08-30', current_strategy_id, test_user_id);

END $$;
`;
}

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log("Generating seed SQL...");
    const SQL = await createSeedData(); // Ensure async function is awaited
    console.log("Executing seed SQL...");
    await client.query(SQL);
    console.log("Seeding completed successfully");
  } catch (error) {
    console.error("Error during seeding:", error);
    // Log the SQL that caused the error if possible (be careful with sensitive data)
    // console.error("Failed SQL (check for sensitive data before logging):\n", SQL);
  } finally {
    await client.end();
    console.log("Database connection closed.");
  }
}

main();