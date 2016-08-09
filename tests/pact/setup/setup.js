'use strict'

const service = process.argv[2]
const mockService = require('./mock_service.js')(service)
const setupService = require('./' + service + '/setup.js')

// Execute the setup of the service
setupService(mockService)

mockService.setup((error) => {
  if (error) {
    console.warn(`Pact wasn\'t able set up the interactions: \n ${error}\nRetrying...\n`)
    process.exit(1)
  }
}) // Cleans out old interactions and sets up new ones
