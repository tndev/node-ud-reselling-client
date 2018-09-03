const { convertResponse, convertData } = require('./response')
// global storage of the configs, used to avoid the leaking of username and password to logfiles
const configs = new WeakMap()

const get = require('./http').get

class Client {
  constructor (config) {
    configs[this] = config

    var sections = ['domain', 'dns', 'contact']
    sections.forEach(section => {
      this[section] = require('./command/' + section)(this)
    })
  }

  async request (command, params, options) {
    // merge the parameters into one list
    const queryParams = {
      s_login: configs[this].username,
      s_pw: configs[this].password,
      s_format: 'jsonpretty',

      command: command,
      ...params
    }

    // test environment requires s_entitiy=1234 parameter
    if (configs[this].test) {
      queryParams.s_entity = '1234'
    }

    // build the query string and send request to server
    const query = Object.keys(queryParams).map(key => key + '=' + encodeURIComponent(queryParams[key])).join('&')

    let res = await get({
      hostname: 'api.domainreselling.de',
      path: '/api/call.cgi?' + query
    })

    // parse the json response and convert pre process the response

    res = JSON.parse(res.toString('utf8'))
    res = convertResponse(res)

    // throw an error on failure
    if (res.statusCode >= 300) {
      console.dir(res.description)
      throw new Error(res.description)
    }

    // TODO move to convertResponse ??
    // if a body exists then convert it to a real array
    if (res.body) {
      res.body = convertData(res.body)
    }

    // transform the rwa response
    if (options && options.transform) {
      if ('count' in res) {
        // transform the array if multiple entries are returned
        res.body = res.body.map(options.transform)
      } else {
        // transform the body if the result is not a list
        res.body = options.transform(res.body)
      }
    }

    return res
  }
}

module.exports.Client = Client
