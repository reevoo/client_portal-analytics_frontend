'use strict'

const Pact = require('pact-consumer-js-dsl')
const like = Pact.Match.somethingLike

const API_URL = require('./config').API_PREFIX

const setup = (mockService) => {
  // GET /tableau/token
  mockService
    .given('a user logged in')
    .uponReceiving('a request to get a tableau token')
    .withRequest({
      method: 'get',
      path: `${API_URL}/tableau/token`,
    })
    .willRespondWith({
      status: 200,
      body: {
        token: like('token1'),
      },
    })
}

module.exports = setup
