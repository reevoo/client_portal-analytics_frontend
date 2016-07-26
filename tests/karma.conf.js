require('dotenv').config({path: '.env.test'}) // Load .env

const path = require('path')
const webpack = require('webpack')

// Config object with values read from .env file
const envConfig = require('../envConfig.js').envConfig

module.exports = function (config) {
  const ROOT_PATH = path.parse(path.resolve(__dirname)).dir
  const APP_PATH = path.resolve(ROOT_PATH, 'app')
  const NODE_MODULES_PATH = path.resolve(ROOT_PATH, 'node_modules')
  const TESTS_PATH = path.resolve(ROOT_PATH, 'tests')
  const STYLES_PATH = path.resolve(ROOT_PATH, 'app/styles')

  config.set({
    basePath: '../',

    frameworks: ['jasmine-ajax', 'jasmine'],

    files: [
      'tests/unit/**/*.js',
    ],

    preprocessors: {
      ['tests/unit/**/*.js']: ['webpack', 'sourcemap'],
    },
    webpack: {
      devtool: 'inline-source-map',

      module: {
        loaders: [
          { test: /\.json$/, loader: 'json-loader' },
          {
            test: /\.jsx?$/,
            loader: 'babel?plugins=babel-plugin-rewire',
            exclude: [
              NODE_MODULES_PATH,
            ],
          },
          { test: /\.(jpe?g|png|gif|svg)$/, loader: 'url-loader?limit=10000' },
          {
            test: /\.scss$/,
            loader: 'css-loader!postcss-loader!sass-loader',
            include: [STYLES_PATH, APP_PATH],
          },
          { test: /\.(woff|ttf|eot|svg)$/, loader: 'file-loader', include: STYLES_PATH },
        ],
      },
      plugins: [
        new webpack.DefinePlugin({
          CONFIG: envConfig,
        }),
      ],
      resolve: {
        alias: {
          app: APP_PATH,
          tests: TESTS_PATH,
        },
        extensions: ['', '.js', '.jsx'],
        modulesDirectories: ['node_modules'],
      },
    },

    webpackServer: {
      noInfo: true,
    },

    reporters: ['dots'],

    logLevel: config.LOG_INFO,
    autoWatch: false,
    browsers: ['PhantomJS'],
    singleRun: true,
  })
}
