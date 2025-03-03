require('dotenv').config()

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const SESSION_SECRET = process.env.SESSION_SECRET

// const DATABASE_URL = process.env.NODE_ENV === 'test' 
//   ? process.env.TEST_DATABASE_URL
//   : process.env.DATABASE_URL

module.exports = {
  DATABASE_URL,
  PORT,
  SESSION_SECRET
}