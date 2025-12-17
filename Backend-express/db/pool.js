const { Pool } = require("pg");
const config = require('../utils/config')

// Again, this should be read from an environment variable
const poolConfig = {
  connectionString: config.DATABASE_URL,
};

// Add SSL for production (Render/Neon)
if (process.env.NODE_ENV === 'production') {
  poolConfig.ssl = {
    rejectUnauthorized: false, // Required for Neon
  };
}

module.exports = new Pool(poolConfig);