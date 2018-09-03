const QueryObject = require('../query-object')

class DNSQuery extends QueryObject {
  setup () {
    this._command = 'QueryDNSZoneList'
  }
}

function convertRRInfo (_, info) {
  const soaNameMapping = {
    name: 'dnszone',
    ttl: 'soattl',
    mname: 'soamname',
    rname: 'soarname',
    serial: 'soaserial',
    refresh: 'soarefresh',
    retry: 'soaretry',
    expire: 'soaexpire',
    minimumttl: 'soaminttl'
  }

  var params = {}

  Object.keys(soaNameMapping).forEach(key => {
    if (key in info) {
      params[soaNameMapping[key]] = info[key]
    }
  })

  delete params.soaserial

  for (let i = 0; i < info.records.length; i++) {
    params['rr' + i] = info.records[i].name + ' ' + info.records[i].ttl + ' IN ' + info.records[i].type + ' ' + info.records[i].value
  }

  return params
}

module.exports = (connection) => ({
  async get (dnszone) {
    var res = await connection.request('QueryDNSZoneRRList', {
      dnszone: dnszone
    }, { transform: require('./dns/rr').transform })

    return res.body
  },

  async insert (name, info) {
    var params = convertRRInfo(name, info)

    await connection.request('CreateDNSZone', params)

    return true
  },

  async update (name, info) {
    var params = convertRRInfo(name, info)

    await connection.request('UpdateDNSZone', params)

    return true
  },

  async delete (dnszone) {
    await connection.request('DeleteDNSZone', {
      dnszone: dnszone
    })

    return true
  },

  find (filter) {
    return new DNSQuery(connection, filter)
  }
})
