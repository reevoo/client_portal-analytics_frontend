const ENV = process.env.NODE_ENV || 'development'
const TARGET = process.env.npm_lifecycle_event
require('dotenv').config({path: `.env.${ENV}`}) // Load .env

const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const HtmlwebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'app/js')
const APP_PATH_ENTRY = APP_PATH + '/app.jsx'
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
const STYLES_PATH = path.resolve(ROOT_PATH, 'app/styles')
const TEMPLATES_PATH = path.resolve(ROOT_PATH, 'app/views')

const cssExtract = new ExtractTextPlugin('analytics.css')

const CLIENT_PORTAL_ASSETS_PATH = path.resolve(ROOT_PATH, 'node_modules/client_portal-assets')

// Config object with values read from .env file
const envConfig = require('./envConfig.js').envConfig

const common = {
  entry: ['whatwg-fetch', APP_PATH_ENTRY],
  output: {
    path: BUILD_PATH,
    publicPath: process.env.PUBLIC_PATH_URL,
    filename: 'analytics.js',
  },
  module: {
    preLoaders: [
      { test: /\.jsx?$/, loaders: ['eslint'], include: APP_PATH },
    ],
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.jsx?/, include: APP_PATH, loader: 'babel' },
      {
        test: /\.scss$/,
        loader: cssExtract.extract('style-loader', 'css-loader!postcss-loader!resolve-url-loader!sass-loader?sourceMap'),
        include: [APP_PATH, STYLES_PATH, CLIENT_PORTAL_ASSETS_PATH],
      },
      { test: /\.(jpe?g|png|gif)$/, loader: 'url-loader?limit=1', include: CLIENT_PORTAL_ASSETS_PATH },
      { test: /\.(woff|ttf|eot|svg)$/, loader: 'file-loader', include: CLIENT_PORTAL_ASSETS_PATH },
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

let webpackConfig = {}

if (TARGET === 'start' || !TARGET) {
  webpackConfig = merge(common, {
    devtool: 'eval-source-map',
  })
} else {
  webpackConfig = merge(common, {
    devtool: 'source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
    ],
  })
}

module.exports = webpackConfig
