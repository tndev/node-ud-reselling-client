const { stringToDate } = require('../../utils')

class DomainInfo {}

const mapper = {
  DOMAIN: 'domain',
  IDNDOMAIN: 'idnDomain',

  USER: 'user',

  NAMESERVER0: 'nameserver.0',
  NAMESERVER1: 'nameserver.1',
  NAMESERVER2: 'nameserver.2',

  COMMENT: 'comment',

  DOMAINADMINCONTACT: 'domainAdminContact',
  DOMAINOWNERCONTACT: 'domainOwnerContact',
  DOMAINBILLINGCONTACT: 'domainBillingContact',
  DOMAINTECHCONTACT: 'domainTechContact',

  DOMAINEXPIRATIONDATE: 'domainExpirationDate',
  DOMAINREGISTRATIONEXPIRATIONDATE: 'domainRegistrationExpirationDate',
  DOMAINFINALIZATIONDATE: 'domainFinalizationDate',
  DOMAINPAIDUNTILDATE: 'domainPaidUntilDate',
  DOMAINACCOUNTINGDATE: 'domainAccountingDate',
  DOMAINUPDATEDDATE: 'domainUpdatedDate',
  DOMAINFAILUREDATE: 'domainFailureDate',
  DOMAINNEXTACTIONDATE: 'domainNextActionDate',
  DOMAINCREATEDDATE: 'domainCreatedDate',

  DOMAINRENEWALMODE: 'domainRenewalMode',
  DOMAINNEXTACTION: 'domainNextAction',

  DOMAINREPOSITORY: 'domainRepository',
  DOMAINSUBCLASS: 'domainSubClass',

  DOMAINSTATUS: 'domainStatus',
  DOMAINAUTH: 'domainAuth',

  DOMAINCREATEDBY: 'domainCreatedBy',
  DOMAINUPDATEDBY: 'domainUpdatedBy'
}

const ignore = ['NAMESERVER', 'ADMINCONTACT', 'OWNERCONTACT', 'BILLINGCONTACT', 'TECHCONTACT'] // legacy properties

const dateProperties = ['domainExpirationDate', 'domainRegistrationExpirationDate', 'domainFinalizationDate',
  'domainPaidUntilDate', 'domainAccountingDate', 'domainUpdatedDate', 'domainFailureDate',
  'domainNextActionDate', 'domainCreatedDate']

function transform (item) {
  var res = new DomainInfo()

  Object.keys(item).forEach(key => {
    if (mapper[key]) {
      res[mapper[key]] = item[key]
      if (dateProperties.includes(mapper[key])) {
        res[mapper[key]] = stringToDate(res[mapper[key]])
      }
    } else if (!ignore.includes(key)) {
      console.warn('unhandled key: ' + key)
    }
  })
  return res
}

module.exports.transform = transform
