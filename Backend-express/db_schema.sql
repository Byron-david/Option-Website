DROP TABLE IF EXISTS trades;
DROP TABLE IF EXISTS strategies;
DROP TABLE IF EXISTS users;

-- 2. SCHEMA DEFINITION

-- Create users table
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_active BOOLEAN DEFAULT TRUE
);

-- Create strategies table with user reference
CREATE TABLE IF NOT EXISTS strategies (
  strategyID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  strategy text NOT NULL
);

-- Create trades table with strategy reference
CREATE TABLE IF NOT EXISTS trades (
  tradeID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  symbol VARCHAR ( 255 ),
  date date,
  action text NOT NULL,
  sub_action text NOT NULL,
  trade_type text NOT NULL,
  qty int NOT NULL,
  price Numeric(10, 2) NOT NULL,
  strikes Numeric(10, 2),
  value Numeric(10, 2) NOT NULL,
  expdate date,
  strategyID INTEGER REFERENCES strategies(strategyID) ON DELETE CASCADE NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_trades_strategyID ON trades(strategyID);
CREATE INDEX IF NOT EXISTS idx_strategies_user_id ON strategies(user_id);