const Client = require('./lib/client').Client

function createClient (config) {
  return new Client(config)
}

module.exports.createClient = createClient
