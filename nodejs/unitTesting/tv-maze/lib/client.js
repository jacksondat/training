/**
 * allows to call tv-maze services
 */
// allows to call web services
var request = require('client-request')
// allows to parser a javascript object to a request uri parameters
var qs = require('querystring')

var Client = function (options) {
  this.options = options || {}
  this.endpoint = this.options.endpoint || 'http://api.tvmaze.com'
}

Client.prototype._request = function (path, method, params, callback) {
  var uri = this.endpoint + path

  if (params) {
    uri += '?' + qs.encode(params)
  }

  request({
    uri: uri,
    method: method,
    json: 'true'
  }, function (err, res, body) {
    if (err) return callback(err)

    if (res.statusCode !== 200) return callback(new Error('an error ocurred in the request'))

    callback(null, body)
  })
}

Client.prototype.shows = function (callback) {
  this._request('/shows', 'GET', null, callback)
}

Client.prototype.search = function (showname, callback) {
  this._request('/search/shows', 'GET', {q: showname}, callback)
}

module.exports = Client
