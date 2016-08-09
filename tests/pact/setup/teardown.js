'use strict'

const request = require('request')
const fs = require('fs')
const path = require('path')

const service = process.argv[2]
const mockService = require('./mock_service.js')(service)

const config = require('./config.js')(service)

const PACT_BROKER_URL = config.PACT_BROKER_URL
const CONSUMER = config.CONSUMER
const PROVIDER = config.PROVIDER
const VERSION = config.VERSION

function getPactBrokerUrl () {
  return `${PACT_BROKER_URL}pacts/provider/${encodeURIComponent(PROVIDER)}/consumer/${encodeURIComponent(CONSUMER)}/version/${VERSION}`
}

function toSnakeCase (text) {
  return text.replace(/\ /g, '_').toLowerCase()
}

function publishToPactBroker () {
  const filePath = path.resolve(
    __dirname,
    `../pacts/${toSnakeCase(CONSUMER)}-${toSnakeCase(PROVIDER)}.json`
  )

  // This was the previous way of uploading the file but causes a 400 error in Pact Broker.
  // We should be using the pipe and streams to send the file to avoid problems
  // when it becomes big.
  // const fileReadStream = fs.createReadStream(filePath);
  //
  // fileReadStream.on('error', error =>
  //   console.error('Error reading pact file(s).', error)
  // );
  //
  // fileReadStream.pipe(request.put(getPactBrokerUrl(), (error, message, response) => {
  //   if (error) {
  //     console.error(error);
  //     console.error(response);
  //   } else {
  //     console.log('Upload pact file(s) finished.');
  //   }
  // }));

  fs.readFile(filePath, 'utf-8', (err, data) => {
    if (err) {
      throw err
    }

    const requestOptions = {
      body: JSON.parse(data),
      json: true,
    }

    request
      .put(
        getPactBrokerUrl(),
        requestOptions,
        (error, message, response) => {
          if (error) {
            console.error(error)
            console.error(response)
          } else {
            console.log('Upload pact file(s) finished.')
          }
        }
      )
      .on('error', (err) => console.log('Error uploading', err))
  })
}

// Verify that all the mock calls has been made that was specified in setup.js
// Throw error if tests didn't call the service exactly the same way as specified
// Then write out pact files
mockService.verifyAndWrite((error) => {
  if (error) {
    console.warn('Pact wasn\'t able to verify the interactions: \n' + error)
  } else {
    console.log('Pact verified and written.')
    publishToPactBroker()
  }
})
