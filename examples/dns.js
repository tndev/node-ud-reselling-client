
async function getDomains () {
  const client = await require('../index').createClient(require('./config'))

  var res = await client.dns.get('1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.')

  res = await client.dns.update('1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.', {
    name: '1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.',
    ttl: 3600,
    mname: 'ns1.1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.',
    rname: 'hostmaster.1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331.com.',
    serial: '2',
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
      { name: 'test', ttl: 3600, type: 'TXT', value: 'v=spf1 a mx -all' } ] })
  console.log('============')
  console.dir(res)

  /* var tmp = res.body.map(entry => convertRR(entry.RR));
  res.body = {}

  tmp.forEach(() => {

  }) */
}

getDomains()
