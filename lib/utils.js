function stringToDate (date) {
  if (date === '0000-00-00 00:00:00') {
    return null
  }

  // split date and time
  date = date.split(' ')

  // add 00:00:00 if if date has no time
  date[1] = date[1] || '00:00:00'

  // faltten the two arrays into one
  date = [...date[0].split('-'), ...date[1].split(':')]

  // month starts with 0
  date[1]--

  return new Date(Date.UTC.apply(Date, date))
}

module.exports.stringToDate = stringToDate
