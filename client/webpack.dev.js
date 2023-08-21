const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');
const Dotenv = require('dotenv-webpack');
const path = require('path');

/**
 * Fix routing issues where the router returns 404 on refresh/reload when
 * there is a path http://localhost:8080/path/to/somewhere
 *  publicPath: '/'
 *  historyApiFallback: true
 */

module.exports = merge(webpackConfig, {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.dev.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]',
    publicPath: '/'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [new Dotenv()]
});
