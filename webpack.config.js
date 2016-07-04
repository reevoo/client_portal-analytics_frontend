const webpack = require('webpack');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'app/js')
const APP_PATH_ENTRY = APP_PATH + '/app.jsx'
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist')

module.exports = {
  entry: APP_PATH_ENTRY,
  output: {
    path: BUILD_PATH,
    filename: 'analytics.js',
  }
};
