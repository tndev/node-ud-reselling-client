/* global  describe,it,expect */
const { stringToDate } = require('../lib/utils')
describe('date utils', function () {
  it('should return the correct date for date time', async function () {
    expect(stringToDate('2018-10-10 08:00:00')).toEqual(new Date('2018-10-10T08:00:00.000Z'))
  })

  it('should return the correct date for date only', async function () {
    expect(stringToDate('2018-10-10')).toEqual(new Date('2018-10-10T00:00:00.000Z'))
  })
})
