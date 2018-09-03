async function getContacts () {
  const client = await require('../index').createClient(require('./config'))

  var res = await client.contact.get('P-HAM153596359076')
  console.dir(res)
}

getContacts()
