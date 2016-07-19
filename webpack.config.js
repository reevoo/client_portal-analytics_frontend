const REEVOO_ENV = process.env.REEVOO_ENV || 'development'
require('dotenv').config({path: `.env.${REEVOO_ENV}`}) // Load .env

const webpack = require('webpack')
const path = require('path')

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'app/js')
const APP_PATH_ENTRY = APP_PATH + '/app.jsx'
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
const STYLES_PATH = path.resolve(ROOT_PATH, 'app/styles')

const HtmlwebpackPlugin = require('html-webpack-plugin')
const TEMPLATES_PATH = path.resolve(ROOT_PATH, 'app/views')

const ExtractTextPlugin = require('extract-text-webpack-plugin')
const cssExtract = new ExtractTextPlugin('analytics.css')

const CLIENT_PORTAL_ASSETS_PATH = path.resolve(ROOT_PATH, 'node_modules/client_portal-assets')

// Config object with values read from .env file
const envConfig = require('./envConfig.js').envConfig

module.exports = {
  entry: APP_PATH_ENTRY,
  output: {
    path: BUILD_PATH,
    publicPath: 'http://localhost:8080/',
    filename: 'analytics.js',
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, loaders: ['eslint'], include: APP_PATH },
    ],
    loaders: [
      { test: /\.jsx?/, include: APP_PATH, loader: 'babel' },
      {
        test: /\.scss$/,
        loader: cssExtract.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
        include: [APP_PATH, STYLES_PATH],
      },
      { test: /\.(jpe?g|png|gif)$/, loader: 'url-loader?limit=1', include: CLIENT_PORTAL_ASSETS_PATH },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      CONFIG: envConfig,
    }),
    cssExtract,
    new HtmlwebpackPlugin({
      filename: 'index.html',
      title: 'Awesome Analytics app',
      template: TEMPLATES_PATH + '/index.html',
    }),
  ],
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
}
