const webpack = require('webpack');
const copyWebpack = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  context: path.join(__dirname, 'src'),
  entry: {
    client: "./js/index.js",
  },
  output: {
    filename: "[name].js",
    path: path.join(__dirname, '/public'),
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new copyWebpack([
      { from: './assets/*', to: __dirname + '/public' },
      { from: './html/*', to: __dirname + '/public' },
      { from: './css/*', to: __dirname + '/public' },
    ], {
        ignore: [
          // No ignore file specified
        ],
        copyUnmodified: true
      })
  ],
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: /node_modules/,
    poll: 1000
  },
};