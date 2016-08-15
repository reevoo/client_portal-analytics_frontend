/* global expect */
'use strict'

const Pact = require('pact-consumer-js-dsl')

const getMockService = (service) => {
  const config = require('./config.js')(service)

  return Pact.mockService({
    consumer: config.CONSUMER,
    provider: config.PROVIDER,
    port: config.PORT,
    done: (error) => expect(error).toBe(null),
  })
}

module.exports = getMockService
