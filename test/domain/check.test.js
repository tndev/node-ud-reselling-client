/* global  describe,it,beforeAll,expect */

describe('domain', function () {
  let client
  let randomPrefix = '1e8f3fd6c4dc1998e801a89ef6bf3b68c4861331'

  beforeAll(async function () {
    require('dotenv').config()
    client = await require('../..').createClient({
      username: process.env.UD_RESELLING_USERNAME,
      password: process.env.UD_RESELLING_PASSWORD,
      test: true
    })
  })

  it('should return false for registered domain', async function () {
    const res = await client.domain.check('ud-reselling.com')
    expect(res).toEqual(false)
  })

  it('should return true not registered domain', async function () {
    const res = await client.domain.check(randomPrefix + '-tn-dev.com')
    expect(res).toEqual(true)
  })
})
