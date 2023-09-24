const path = require("path");
const { merge } = require("webpack-merge");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const webpackConfig = require("./webpack.config.js");
const Dotenv = require("dotenv-webpack");

module.exports = merge(webpackConfig, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    assetModuleFilename: "images/[hash][ext][query]",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    // creates a separate style.css file instead of adding the styles to the bundle.js
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].[hash].css",
    }),
    new CopyPlugin({
      patterns: [{ from: path.resolve(__dirname, "src", "server.js") }],
      options: {
        concurrency: 100,
      },
    }),
    new Dotenv({ path: "./.env.prod" }),
  ],
});
