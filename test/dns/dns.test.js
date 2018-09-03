/* global  describe,it,expect,beforeAll */

describe('dns', function () {
  let client

  beforeAll(async function () {
    require('dotenv').config()
    client = await require('../..').createClient({
      username: process.env.UD_RESELLING_USERNAME,
      password: process.env.UD_RESELLING_PASSWORD,
      test: true
    })
  })

  it.skip('should have zero records at the beginning of the test', () => {})

  it('insert a dns record', async () => {
    var res

    var origData = {
      name: '1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.',
      ttl: 3600,
      mname: 'ns1.1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.',
      rname: 'hostmaster.1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.',
      refresh: 86400,
      retry: 10800,
      expire: 3600000,
      minimumttl: 172800,
      records:
      [ { name: 'test', ttl: 3600, type: 'A', value: '127.0.0.1' },
        { name: '@', ttl: 3600, type: 'AAAA', value: '2a00:a8e0:1::110' },
        { name: '@', ttl: 3600, type: 'MX', value: '10 mail.domainname.com.' },
        { name: '@', ttl: 3600, type: 'NS', value: 'ns1a.dodns.net.' },
        { name: '@', ttl: 3600, type: 'NS', value: 'ns2a.dodns.net.' },
        { name: 'test', ttl: 3600, type: 'TXT', value: 'v=spf1 a mx -all' } ] }

    res = await client.dns.insert('1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.', origData)

    res = await client.dns.get('1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.')

    expect(res).toMatchObject(origData)

    await client.dns.delete('1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.')
  })

  it('update a dns record', async () => {
    var res

    var origData = {
      name: '1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.',
      ttl: 3600,
      mname: 'ns1.1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.',
      rname: 'hostmaster.1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.',
      refresh: 86400,
      retry: 10800,
      expire: 3600000,
      minimumttl: 172800,
      records:
      [ { name: 'test', ttl: 3600, type: 'A', value: '127.0.0.1' },
        { name: '@', ttl: 3600, type: 'AAAA', value: '2a00:a8e0:1::110' },
        { name: '@', ttl: 3600, type: 'MX', value: '10 mail.domainname.com.' },
        { name: '@', ttl: 3600, type: 'NS', value: 'ns1a.dodns.net.' },
        { name: '@', ttl: 3600, type: 'NS', value: 'ns2a.dodns.net.' },
        { name: 'test', ttl: 3600, type: 'TXT', value: 'v=spf1 a mx -all' } ] }

    // TODO should sort recorts for testing
    res = await client.dns.insert('1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.', origData)

    origData.retry = 3000
    origData.expire = 3000
    origData.rname = 'hostmaster2.1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.'
    origData.records.push({ name: 'test2', ttl: 3600, type: 'TXT', value: 'v=spf1 a mx -all' })

    res = await client.dns.update('1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.', origData)

    res = await client.dns.get('1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.')

    expect(res).toMatchObject(origData)

    await client.dns.delete('1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.')
  })

  it.skip('query all dns zones', () => {})
})
