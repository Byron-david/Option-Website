const { Pool } = require("pg");
const config = require('../utils/config')

// Again, this should be read from an environment variable
module.exports = new Pool({
  connectionString: config.DATABASE_URL,
  ssl: {
      rejectUnauthorized: false,
    },
});
