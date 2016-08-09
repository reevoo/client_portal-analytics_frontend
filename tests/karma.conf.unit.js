const getKarmaConf = require('./karma.conf.js')

module.exports = function (config) {
  config.set(getKarmaConf(config, 'unit'))
}
