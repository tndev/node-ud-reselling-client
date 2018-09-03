const QueryObject = require('../query-object')

class DomainQuery extends QueryObject {
  setup () {
    this._command = 'QueryDomainList'
  }
}

module.exports = (connection) => ({
  async check (domain) {
    var res = await connection.request('CheckDomain', { DOMAIN: domain })

    // 210 equals to domain found
    return res.statusCode === 210
  },

  async status (domain) {
    var res = await connection.request('StatusDomain', { DOMAIN: domain },
      { transform: require('./domain/status').transform })

    return res.body
  },

  async add (domain, contact, nameserver) {
    var params = {
      DOMAIN: domain,
      OWNERCONTACT0: contact.owner,
      ADMINCONTACT0: contact.admin,
      TECHCONTACT0: contact.tech,
      BILLINGCONTACT0: contact.billing
    }

    nameserver.forEach((item, idx) => {
      params['NAMESERVER' + idx] = item
    })

    var res = await connection.request('AddDomain', params)

    return res
  },

  async createAuthCode (domain) {
    var res = await connection.request('CreateAuthcode', { DOMAIN: domain })

    return res.body
  },

  async delete (domain) {
    await connection.request('DeleteDomain', { DOMAIN: domain })
  },

  find (filter) {
    return new DomainQuery(connection, filter,
      { transform: require('./domain/info').transform })
  }
})
