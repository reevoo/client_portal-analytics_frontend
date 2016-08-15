'use strict'

const Pact = require('pact-consumer-js-dsl')
const like = Pact.Match.somethingLike
const eachLike = Pact.Match.eachLike

const API_URL = require('./config').API_PREFIX

const setup = (mockService) => {
  // GET /workbooks/:id
  mockService
    .given('a list of workbooks with ids 11111111-2222-3333-4444-0000000000 exists')
    .uponReceiving('a request to get the workbooks details')
    .withRequest({
      method: 'get',
      path: `${API_URL}/workbooks/`,
      query: {
        'ids[]': ['11111111-2222-3333-4444-0000000000'],
      },
    })
    .willRespondWith({
      status: 200,
      body: eachLike({
        id: like('11111111-2222-3333-4444-0000000000'),
        name: like('test4'),
        views: eachLike('test4/Dashboard1'),
      }, {min: 1}),
    })
}

module.exports = setup
