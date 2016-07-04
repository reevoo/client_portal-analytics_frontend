const webpack = require('webpack');
const path = require('path');

const ROOT_PATH = path.resolve(__dirname)
const APP_PATH = path.resolve(ROOT_PATH, 'app/js')
const APP_PATH_ENTRY = APP_PATH + '/app.jsx'
const BUILD_PATH = path.resolve(ROOT_PATH, 'dist')
const STYLES_PATH = path.resolve(ROOT_PATH, 'app/styles')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const cssExtract = new ExtractTextPlugin('analytics.css')

module.exports = {
  entry: APP_PATH_ENTRY,
  output: {
    path: BUILD_PATH,
    publicPath: "/dist/",
    filename: 'analytics.js',
  },
  module: {
    loaders: [
      { test : /\.jsx?/, include : APP_PATH, loader : 'babel' },
      {
        test: /\.scss$/,
        loader: cssExtract.extract('style-loader', 'css-loader!postcss-loader!sass-loader'),
        include: STYLES_PATH,
      },
    ],
  },
  plugins: [
    cssExtract
  ],
};
