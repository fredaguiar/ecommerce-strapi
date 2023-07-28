const { merge } = require('webpack-merge');
const webpackConfig = require('./webpack.config.js');
const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = merge(webpackConfig, {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.dev.js',
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'images/[hash][ext][query]'
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [new Dotenv()]
});
