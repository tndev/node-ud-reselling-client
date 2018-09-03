async function getDomains () {
  const client = await require('../index').createClient(require('./config'))

  /* const res = await client.domain
    .find()
    .limit(10)
    .wide(1)
    .exec() */

  let res = await client.domain.status('9pw83ebp9aznsad.com')
  console.dir(res)

  /* try {
    const res = await client.domain
                      .check('test.de')
    console.dir(res)
  } catch(e ) {
    console.error(e)
  } */
}

getDomains()
