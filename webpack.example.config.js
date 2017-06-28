var webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
      'example/dist/bundle': './example/index.js'
  },
  devtool: "source-map",
  output: {
    filename: '[name].js'
  },
  module: {
    rules: [
        {
            test: /\.jsx?$/,
            exclude: [/node_modules/, /dist/],
            loader: "babel-loader",
        }
    ]     
  }
}