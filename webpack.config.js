var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
      'dist/bundle': './src/index.js', 
  },
  output: {
    filename: '[name].js',
    library: 'TextEllipsis',
    libraryTarget: 'umd',
  },
  module: {
    rules: [
        {
            enforce: "pre",
            test: /\.jsx?$/,
            exclude: [/node_modules/, /example/, /dist/], //disable linter for example proj
            loader: "eslint-loader",
            options: {
                formatter: require("eslint-friendly-formatter")
            }
        },
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        }
    ]     
  }
}