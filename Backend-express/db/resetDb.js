const pool = require("./pool");
const bcrypt = require('bcryptjs');

const resetDatabase = async () => {
  console.log("Starting database reset...");
  
  const saltRounds = 10;
  const userOnePw = 'abcd1234'; 
  const userTwoPw = 'abcd1234'; 

  try {
    const userOne = await bcrypt.hash(userOnePw, saltRounds);
    const userTwo = await bcrypt.hash(userTwoPw, saltRounds);

    // Escape single quotes for SQL safety
    const userOneSafePw = userOne.replace(/'/g, "''");
    const userTwoSafePw = userTwo.replace(/'/g, "''");

    const SQL = `
      -- Drop tables in correct order
      DROP TABLE IF EXISTS trades;
      DROP TABLE IF EXISTS strategies;
      DROP TABLE IF EXISTS users;

      -- Recreate Tables
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        is_active BOOLEAN DEFAULT TRUE
      );

      CREATE TABLE IF NOT EXISTS strategies (
        strategyID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
        strategy text NOT NULL
      );

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

      -- Indexes
      CREATE INDEX IF NOT EXISTS idx_trades_strategyID ON trades(strategyID);
      CREATE INDEX IF NOT EXISTS idx_strategies_user_id ON strategies(user_id);

      -- Seed Data
      DO
      $$
      DECLARE
        test_user_id integer;
        current_strategy_id integer;
      BEGIN
        -- User 1
        INSERT INTO users (username, email, password_hash)
        VALUES ('test', 'test@example.com', '${userOneSafePw}')
        RETURNING id INTO test_user_id;

        -- Strategy 1
        INSERT INTO strategies (strategy, user_id)
        VALUES ('Vertical Spread', test_user_id)
        RETURNING strategyID INTO current_strategy_id;

        INSERT INTO trades (symbol, date, action, sub_action, trade_type, qty, price, strikes, value, expdate, strategyID)
        VALUES
          ('SPY', '2024-07-29', 'SELL', 'OPEN', 'PUT', 1, 1.50, 160, 150, '2024-08-30', current_strategy_id),
          ('SPY', '2024-07-29', 'BUY', 'OPEN', 'PUT', 1, -1.30, 150, 130, '2024-08-30', current_strategy_id);

        -- Strategy 2
        INSERT INTO strategies (strategy, user_id)
        VALUES ('Iron Condor', test_user_id)
        RETURNING strategyID INTO current_strategy_id;

        INSERT INTO trades (symbol, date, action, sub_action, trade_type, qty, price, strikes, value, expdate, strategyID)
        VALUES
          ('META', '2024-07-29', 'SELL', 'OPEN', 'CALL', 1, 8.80, 540, 880, '2024-08-30', current_strategy_id),
          ('META', '2024-07-29', 'BUY', 'OPEN', 'CALL', 1, -7.10, 550, -710, '2024-08-30', current_strategy_id),
          ('META', '2024-07-29', 'SELL', 'OPEN', 'PUT', 1, 7.80, 415, 780, '2024-08-30', current_strategy_id),
          ('META', '2024-07-29', 'BUY', 'OPEN', 'PUT', 1, -6.00, 405, -600, '2024-08-30', current_strategy_id);

        -- User 2
        INSERT INTO users (username, email, password_hash)
        VALUES ('test2', 'test2@example.com', '${userTwoSafePw}')
        RETURNING id INTO test_user_id;

        -- Strategy 3
        INSERT INTO strategies (strategy, user_id)
        VALUES ('Vertical Spread', test_user_id)
        RETURNING strategyID INTO current_strategy_id;

        INSERT INTO trades (symbol, date, action, sub_action, trade_type, qty, price, strikes, value, expdate, strategyID)
        VALUES
          ('AAPL', '2024-02-05', 'SELL', 'OPEN', 'PUT', 1, 1.50, 160, 150, '2025-03-30', current_strategy_id),
          ('AAPL', '2025-02-05', 'BUY', 'OPEN', 'PUT', 1, -1.30, 150, 130, '2025-03-30', current_strategy_id);

        -- Strategy 4
        INSERT INTO strategies (strategy, user_id)
        VALUES ('Iron Condor', test_user_id)
        RETURNING strategyID INTO current_strategy_id;

        INSERT INTO trades (symbol, date, action, sub_action, trade_type, qty, price, strikes, value, expdate, strategyID)
        VALUES
          ('TSLA', '2025-01-29', 'SELL', 'OPEN', 'CALL', 1, 8.80, 540, 880, '2025-03-30', current_strategy_id),
          ('TSLA', '2025-01-29', 'BUY', 'OPEN', 'CALL', 1, -7.10, 550, -710, '2025-03-30', current_strategy_id),
          ('TSLA', '2025-01-29', 'SELL', 'OPEN', 'PUT', 1, 7.80, 415, 780, '2025-03-30', current_strategy_id),
          ('TSLA', '2025-01-29', 'BUY', 'OPEN', 'PUT', 1, -6.00, 405, -600, '2025-03-30', current_strategy_id);
      END $$;
    `;

    await pool.query(SQL);
    console.log("Database reset completed successfully.");
  } catch (error) {
    console.error("Error resetting database:", error);
  }
};

module.exports = { resetDatabase };