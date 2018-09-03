
const https = require('https')

function get (options) {
  return new Promise((resolve, reject) => {
    var req = https.get(options, (res) => {
      var alldata = []

      res.on('data', data => {
        alldata.push(data)
      })

      res.on('error', error => {
        reject(error)
      })

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(Buffer.concat(alldata))
        } else {
          reject(new Error('Status: ' + res.statusCode))
        }
      })
    })

    req.on('error', error => {
      reject(error)
    })

    req.end()
  })
}

module.exports.get = get
