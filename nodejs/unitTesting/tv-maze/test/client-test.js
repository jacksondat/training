/**
 * Allows to test tv-maze api
 */

// 'tape' module is the test runner
var test = require('tape')
// imports the module tv-maze
var tvmaze = require('../')
// imports Client lib
var Client = require('../lib/client')
// allows to simulate business logic like a Mock
var nock = require('nock')
// endpoint test
var endpoint = 'http://api.tvmaze.test'

test('should create a client', function (t) {
  t.ok(tvmaze.createClient, 'should exist')
  t.equals(typeof tvmaze.createClient, 'function', 'should be a function')

  var client = tvmaze.createClient()
  t.ok(client instanceof Client, 'should be an instance of Client')
  t.end()
})

test('should list shows', function (t) {
  var client = tvmaze.createClient()
  t.ok(client.shows, 'should exist')
  t.equals(typeof client.shows, 'function', 'should be a function')

  nock(endpoint)
    .get('/shows')
    .reply(200, [])

  client.shows(function (err, shows) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(shows), 'should be an array')
    t.end()
  })
})

test('should search shows', function (t) {
  var client = tvmaze.createClient()
  t.ok(client.search, 'should exist')
  t.equals(typeof client.search, 'function', 'should be a function')

  nock(endpoint)
    .get('/search/shows')
    .query({ q: 'limitless' })
    .reply(200, [])

  client.search('limitless', function (err, shows) {
    t.error(err, 'should not be an error')
    t.ok(Array.isArray(shows), 'should be an array')
    t.equals(shows[0].show.name, 'Limitless', 'should retrieve Limitless show')
    t.end()
  })
})

test('should fail with unknown endpoint', function (t) {
  var client = tvmaze.createClient({ endpoint: endpoint })

  nock(endpoint)
    .get('/foo')
    .reply(404)

  client._request('/foo', 'GET', null, function (err, body) {
    t.ok(err, 'should fail the request')
    t.end()
  })
})

test('should fail with unknown endpoint', function (t) {
  var client = tvmaze.createClient()

  nock(endpoint)
    .get('/search/shows')
    .query(null)
    .reply(404, {
      code: 0,
      message: 'Missing required parameters: q',
      name: 'Bad request',
      status: 400
    })

  client._request('/search/shows', 'GET', null, function (err, body) {
    t.ok(err, 'bad request error')
    t.notOk(body, 'reply should be null')
    t.end()
  })
})

