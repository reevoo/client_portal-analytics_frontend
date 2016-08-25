const AWS = require('aws-sdk')
const chalk = require('chalk')

const logError = (text) => console.log(chalk.red(`[ERROR]: ${text}`))
const logInfo = (text) => console.log(chalk.blue(`[INFO]: ${text}`))
const logSuccess = (text) => console.log(chalk.green(`[SUCCESS]: ${text}`))

const stage = process.env.NODE_ENV

if (stage === 'staging' || stage === 'production') {
  const paths = [
    '/analytics/index.html',
    '/analytics/analytics.js',
    '/analytics/analytics.js.map',
    '/analytics/analytics.css',
    '/analytics/analytics.css.map',
    '/analytics/',
  ]

  const stageMap = {
    staging: 'E3AUR9ALDYI683',
    production: 'EB2ZQZBEFJADJ',
  }

  const params = {
    DistributionId: stageMap[stage],
    InvalidationBatch: {
      Paths: {
        Quantity: paths.length,
        Items: paths,
      },
      CallerReference: (new Date().toISOString()),
    },
  }

  const cloudfront = new AWS.CloudFront()
  cloudfront.createInvalidation(params, function (err, data) {
    if (err) {
      logError(err)
      console.log(err.stack)
    } else {
      logInfo(`Invalidation id: ${data.Invalidation.Id}`)

      const waitForInvalidation = function () {
        cloudfront.getInvalidation({DistributionId: stageMap[stage], Id: data.Invalidation.Id}, function (err, data) {
          if (err) {
            logError(err)
            console.log(err.stack)
          } else {
            if (data.Invalidation.Status === 'InProgress') {
              process.stdout.write('.')
              setTimeout(waitForInvalidation, 5000)
            } else if (data.Invalidation.Status === 'Completed') {
              logSuccess('Finished!')
            } else {
              logSuccess(`Finished with unknown status: ${data.Invalidation.Status}`)
            }
          }
        })
      }
      logInfo('Waiting for invalidation to complete')
      waitForInvalidation()
    }
  })
} else {
  logInfo('[INFO] You have to provide a valid NODE_ENV (staging, production).')
}
