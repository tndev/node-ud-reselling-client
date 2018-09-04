class Response {
  forEach (callback) {
    this.body.forEach(callback)
  }

  toArray () {
    return this.body
  }
}

function convertResponse (rawResponse) {
  var response = new Response()
  response.statusCode = parseInt(rawResponse.CODE, 10)
  response.description = rawResponse.DESCRIPTION
  response.queuetime = parseFloat(rawResponse.QUEUETIME)
  response.runtime = parseFloat(rawResponse.RUNTIME)

  if (rawResponse.PROPERTY && rawResponse.PROPERTY.TOTAL) {
    response.total = Number(rawResponse.PROPERTY.TOTAL[0])
    response.count = Number(rawResponse.PROPERTY.COUNT[0])
    response.first = Number(rawResponse.PROPERTY.FIRST[0])
    response.limit = Number(rawResponse.PROPERTY.LIMIT[0])
    response.last = Number(rawResponse.PROPERTY.LAST[0])

    delete rawResponse.PROPERTY.TOTAL
    delete rawResponse.PROPERTY.COUNT
    delete rawResponse.PROPERTY.FIRST
    delete rawResponse.PROPERTY.LIMIT
    delete rawResponse.PROPERTY.LAST
  }

  Object.defineProperty(response, 'body', {
    value: rawResponse.PROPERTY,
    enumerable: false,
    writable: true,
    iterable: false
  })

  return response
}

function convertData (data) {
  var keys = Object.keys(data)
  var result = []
  if (keys.length) {
    result = data[keys[0]].map((val, idx) => {
      var item = {}

      keys.forEach(key => {
        item[key] = data[key][idx]
      })

      return item
    })
  }

  return result
}

module.exports.convertResponse = convertResponse
module.exports.convertData = convertData
