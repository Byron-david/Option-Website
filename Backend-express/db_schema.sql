CREATE TABLE IF NOT EXISTS strategies (
  strategyID INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
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
  strikes int,
  value int NOT NULL,
  expdate date,
  strategyID INTEGER REFERENCES strategies(strategyID)
);

ALTER TABLE strategies ADD COLUMN IF NOT EXISTS id INTEGER REFERENCES users(id) ON DELETE CASCADE;