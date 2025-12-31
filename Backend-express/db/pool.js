const { Pool } = require("pg");
const config = require('../utils/config');

const poolConfig = {
  connectionString: config.DATABASE_URL,
  max: 1,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 30000,
};

// Add SSL for production (Render/Neon)
if (process.env.NODE_ENV === 'production') {
  poolConfig.ssl = {
    rejectUnauthorized: false, // Required for Neon
  };
}

// 1. Create the pool instance FIRST
const pool = new Pool(poolConfig);

// 2. NOW you can attach the event listener to it
pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

// 3. Finally, export the instance
module.exports = pool;