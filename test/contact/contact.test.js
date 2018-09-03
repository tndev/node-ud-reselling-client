/* global  describe,it,beforeAll,expect */

describe('contact', function () {
  var client

  beforeAll(async function () {
    require('dotenv').config()
    client = await require('../..').createClient({
      username: process.env.UD_RESELLING_USERNAME,
      password: process.env.UD_RESELLING_PASSWORD,
      test: true
    })
  })

  it('should have a count of 0', async function () {
    var list = await client.contact.find()
      .wide(1)
      .limit(10)
      .exec()

    expect(list.count).toEqual(0)
  })

  it('delete a not existing contact should fail', async function () {
    await expect(client.contact.delete('TEST-1234567')).rejects.toThrow('Authorization failed')
  })

  it('return the same data for an inserted contact', async function () {
    var dataA = {
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
      'contactEmail': process.env.TEST_EMAIL_ADDRESS_1
    }

    var id = await client.contact.insert(dataA)
    var dataB = await client.contact.get(id)

    expect(dataB).toMatchObject(dataA)
    expect(dataB.contactID).toEqual(id)

    await client.contact.delete(id)
  })

  it.skip('deleting used contact should fail', () => {})
  it.skip('status should be partial equal to get', () => {})
  it.skip('should list all contacts created', () => {})
  it.skip('should allow filtering', () => {})

  beforeAll(async function () {
    var list = await client.contact.find()
      .wide(1)
      .exec()

    for (let contact of list.toArray()) {
      await client.contact.delete(contact.contactID)
    }
  })
})
