class QueryObject {
  constructor (connection, filter, options) {
    this.connection = connection
    this.filter = filter
    this._options = options
  }

  wide (wide) {
    this._wide = 2
    return this
  }

  limit (limit) {
    this._limit = limit
    return this
  }

  offset (offset) {
    this._offset = offset
    return this
  }

  orderBy (field) {
    this._orderBy = field
    return this
  }

  buildFilters () {}

  _exec () {

  }

  async exec () {
    this.setup()
    // get orderby value name

    var query = {}

    // build filters
    query = { ...this.buildFilters() || {}, ...query }

    if (this._limit) {
      query.limit = this._limit
    }

    if (this._offset) {
      query.first = this._offset
    }

    if (this._wide) {
      query.wide = this._wide
    }

    var res = await this.connection.request(this._command, query, this._options)

    if (res.count) {
      if (this.convertItem) {
        res.body = res.body.map(item => this.convertItem(item))
      }
    }

    return res
  }
}

module.exports = QueryObject
