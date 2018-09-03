class Zone {}

function split (str, separator, limit) {
  str = str.split(separator)

  if (str.length > limit) {
    var ret = str.splice(0, limit)
    ret.push(str.join(separator))

    return ret
  }

  return str
}

function convertItem (rrRecords) {
  let res = new Zone()
  let records = []

  rrRecords.forEach(record => {
    var tmp = split(record.RR, ' ', 4) // use limit because TXT can contain spaces too

    if (tmp[3] === 'SOA') {
      tmp = [...tmp.slice(0, -1), ...tmp[4].split(' ')]

      res.name = tmp[0].toLowerCase()
      res.ttl = Number(tmp[1])
      // IN
      // SOA
      res.mname = tmp[4]
      res.rname = tmp[5]
      res.serial = tmp[6]
      res.refresh = Number(tmp[7])
      res.retry = Number(tmp[8])
      res.expire = Number(tmp[9])
      res.minimumttl = Number(tmp[10])
    } else {
      var tmpName = tmp[0].toLowerCase()
      tmpName = tmpName.replace(res.name, '') || '@' // replace the domain name in the entry and us @ if empty
      tmpName = tmpName.replace(/\.$/, '') // replace tailing .

      records.push({ name: tmpName, ttl: Number(tmp[1]), /* IN, */ type: tmp[3], value: tmp[4] })
    }
  })

  res.records = records

  return res
}

module.exports.transform = convertItem
