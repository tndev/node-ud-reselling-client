const { stringToDate } = require('../../utils')
class DomainStatus {}

const mapper = {
  SUBCLASS: 'subclass',
  ID: 'id',
  DOMAIN: 'domain',
  BILLINGCONTACT: 'billingContact',
  UPDATEDBY: 'updatedBy',
  PEERUSER: 'peerUser',
  RENEWALCURRENCY: 'renewalCurrency',
  RENEWALPERIOD: 'renewalPeriod',
  AUTHEXPIRATIONDATE: 'authExpirationDate',
  TRANSFERLOCK: 'transferLock',
  ADMINCONTACT: 'adminContact',
  REGISTRATIONEXPIRATIONDATE: 'registrationExpirationDate',
  ROID: 'roid',
  UPDATEDDATE: 'updatedDate',
  CLASS: 'class',
  FAILUREDATE: 'failureDate',
  IDNDOMAIN: 'idnDomain',
  USER: 'user',
  NEXTACTION: 'nextAction',
  OWNERCONTACT: 'ownerContact',
  RENEWALGRACEPERIOD: 'renewalGracePeriod',
  RENEWALMODE: 'renewalMode',
  PENDINGVALIDATION: 'pendingValidation',
  ACCOUNT: 'account',
  TRANSFERPROHIBITEDRELASEDATE: 'transferProhibitedRelaseDate',
  ACCOUNTINGDATE: 'accountingDate',
  RENEWALPRICE: 'renewalPrice',
  FINALIZATIONDATE: 'finalizationDate',
  TECHCONTACT: 'techContact',
  NEXTACTIONDATE: 'nextActionDate',
  AUTH: 'auth',
  STATUS: 'status',
  CREATEDDATE: 'createdDate',
  PAIDUNTILDATE: 'paiduntilDate',
  NAMESERVER: 'nameserver',
  HOSTTYPE: 'hostType',
  EXPIRATIONDATE: 'expirationDate',
  REPOSITORY: 'repository',
  CREATEDBY: 'createdBy'
  /* 'X-DE-AUTHINFO1-EXPIRATIONDATE': '2018-09-30', */
}

const dateProperties = ['authExpirationDate', 'registrationExpirationDate', 'updatedDate',
  'failureDate', 'transferProhibitedRelaseDate', 'accountingDate', 'finalizationDate', 'nextActionDate',
  'createdDate', 'paiduntilDate', 'expirationDate']

function transform (item) {
  var res = new DomainStatus()

  Object.keys(item[0]).forEach(key => {
    if (mapper[key]) {
      res[mapper[key]] = item[0][key]
      if (dateProperties.includes(mapper[key])) {
        res[mapper[key]] = stringToDate(res[mapper[key]])
      }
    } else {
      res[key.toLowerCase()] = item[0][key]
    }
  })

  res.transferLock = res.transferLock === 1
  res.pendingValidation = res.pendingValidation === 1
  return res
}

module.exports.transform = transform
