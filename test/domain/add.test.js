/* global  describe,it,beforeAll,expect,afterAll */

describe('domain', function () {
  let client

  var domainUserA

  beforeAll(async function () {
    require('dotenv').config()
    client = await require('../..').createClient({
      username: process.env.UD_RESELLING_USERNAME,
      password: process.env.UD_RESELLING_PASSWORD,
      test: true
    })

    domainUserA = await client.contact.insert({
      'contactTitle': 'Herr',
      'contactFirstName': 'Heinz',
      'contactLastName': 'Mustermann',
      'contactOrganization': 'org',
      'contactStreet': 'street 1',
      'contactZip': '12345',
      'contactCity': 'a city',
      'contactState': '',
      'contactCountry': 'DE',
      'contactPhone': '+49.123456789',
      'contactFax': '+49.123456789',
      'contactEmail': 'info@tn-dev.com'
    })

    await client.domain.add('2e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com', {
      owner: domainUserA,
      admin: domainUserA,
      tech: domainUserA,
      billing: domainUserA
    }, ['ns1a.dodns.net', 'ns2a.dodns.net'])
  })

  it('should be possible register add a free domain ', async function () {
    await client.domain.add('1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com', {
      owner: domainUserA,
      admin: domainUserA,
      tech: domainUserA,
      billing: domainUserA
    }, ['ns1a.dodns.net', 'ns2a.dodns.net'])

    await client.domain.delete('1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com')
  })

  it('should fail to add a domain that is already registered', async function () {
    await expect(client.domain.add('2e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com', {
      owner: domainUserA,
      admin: domainUserA,
      tech: domainUserA,
      billing: domainUserA
    }, ['ns1a.dodns.net', 'ns2a.dodns.net'])).rejects.toThrow('Authorization failed; domain already exists')
  })

  it('should fail to add a domain that is already registered', async function () {
    await expect(client.domain.add('tn-dev.com', {
      owner: domainUserA,
      admin: domainUserA,
      tech: domainUserA,
      billing: domainUserA
    }, ['ns1a.dodns.net', 'ns2a.dodns.net'])).rejects.toThrow('Command failed; domain is not available for registration')
  })

  it('should return domain status', async function () {
    await client.domain.status('2e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com')
  })

  it('should return new auth code', async function () {
    await client.domain.createAuthCode('2e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com')
  })

  it.skip('should return all domains', () => {})

  afterAll(async () => {
    try {
      await client.domain.delete('1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com')
    } catch (_) {}

    try {
      await client.domain.delete('2e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com')
    } catch (_) {}

    try {
      await client.contact.delete(domainUserA)
    } catch (_) {}
  })
})
