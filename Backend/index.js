const app = require("./app.js");
const config = require('./utils/config')
const logger = require('./utils/logger')

// app.listen(config.PORT, () => {
//   logger.info(`Server running on port ${config.PORT}`)
// })

// Run the server!
app.listen({ port: config.PORT }, function (err, address) {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})