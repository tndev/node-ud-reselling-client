/*
COMMAND=AddContact
TITLE=Her
FIRSTNAME=William
LASTNAME=Tang
ORGANIZATION=
STREET=Hedemannstasse 64
ZIP=79541
CITY=Lörrach Tüllingen
STATE=
COUNTRY=DE
PHONE=+49.123456789
FAX=+49.123456789
EMAIL=info@tn-dev.com

[RESPONSE]
code = 200
description = Command completed successfully
property[contact][0] = P-WLT153579652780
property[status][0] = ACTIVE
*/

const { stringToDate } = require('../utils')

const mapper = {
  PARENTUSER: 'parentUser',
  CONTACTCREATEDBY: 'contactCreatedBy',
  USER: 'user',

  COMMENT: 'comment',
  VERIFICATIONDATE: 'verificationDate',
  VERIFIED: 'verified',
  CONTACT: 'contact',

  CONTACTEMAIL: 'contactEmail',
  CONTACTLASTNAME: 'contactLastName',
  CONTACTREPOSITORY: 'contactRepository',

  CONTACTORGANIZATION: 'contactOrganization',
  CONTACTFAX: 'contactFax',
  CONTACTSTREET: 'contactStreet',
  CONTACTCOUNTRY: 'contactCountry',
  CONTACTAUTH: 'contactAuth',
  CONTACTFIRSTNAME: 'contactFirstName',

  CONTACTUPDATEDBY: 'contactUpdatedBy',
  CONTACTTITLE: 'contactTitle',
  CONTACTCREATEDDATE: 'contactCreatedDate',
  CONTACTCITY: 'contactCity',
  CONTACTSTATUS: 'contactStatus',
  CONTACTUPDATEDDATE: 'contactUpdatedDate',
  CONTACTPHONE: 'contactPhone',
  CONTACTNAME: 'contactName',
  CONTACTMIDDLENAME: 'contactMiddleName',
  CONTACTZIP: 'contactZip',
  CONTACTSTATE: 'contactState',
  CONTACTID: 'contactID'
}

const editableFields = [
  'contactTitle',
  'contactFirstName',
  'contactLastName',
  'contactOrganization',
  'contactStreet',
  'contactZip',
  'contactCity',
  'contactState',
  'contactCountry',
  'contactPhone',
  'contactFax',
  'contactEmail'
]

const dateProperties = ['verificationDate', 'contactCreatedDate', 'contactUpdatedDate']

function contactTransform (item) {
  var res = {}

  Object.keys(item).forEach(key => {
    if (mapper[key]) {
      res[mapper[key]] = item[key]
      if (dateProperties.includes(mapper[key])) {
        res[mapper[key]] = stringToDate(res[mapper[key]])
      }
    } else /* if (!ignore.includes(key)) */ {
      console.warn('unhandled key: ' + key)
    }
  })

  res.verified = res.verified === '1'

  return res
}

const QueryObject = require('../query-object')

class ContactQuery extends QueryObject {
  setup () {
    this._command = 'QueryContactList'
  }

  buildFilters () {
    var res = {}

    if (this.filter && this.filter.contact) {
      res.contact = this.filter.contact
    }

    if (this.filter && this.filter.firstName) {
      res.firstname = this.filter.firstName
    }

    return res
  }
}

module.exports = (connection) => ({

  async insert (data) {
    var props = {}

    editableFields.forEach(key => {
      var newKey = key.replace(/^contact/, '').toUpperCase()
      if (data[key]) {
        props[newKey] = data[key]
      }
    })

    var res = await connection.request('AddContact', props)

    if (res.statusCode === 200) {
      return res.body[0].CONTACT
    }
  },

  async update (id, data) {
    var del = 0
    var props = {}
    props.CONTACT = id
    editableFields.forEach(key => {
      var newKey = key.replace(/^contact/, '').toUpperCase()
      if (!data[key]) {
        props['DELETE' + (del++)] = newKey
      } else {
        props[newKey] = data[key]
      }
    })

    await connection.request('ModifyContact', props)
  },

  async delete (contact) {
    await connection.request('DeleteContact', {
      contact: contact
    })

    return true
  },

  async get (id) {
    var res = await this.find({ contact: id })
      .limit(1)
      .wide(1)
      .exec()

    res = res.toArray()[0]

    if (!res && res.contactID !== id) {
      throw new Error('not found')
    }

    return res
  },

  find (filter) {
    return new ContactQuery(connection, filter, { transform: contactTransform })
  }
})
