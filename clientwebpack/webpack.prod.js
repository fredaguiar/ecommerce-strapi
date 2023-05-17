const path = require('path');
const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');

module.exports = merge(webpackConfig, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '/dist'),
    filename: 'bundle.js'
  }
});
