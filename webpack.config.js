const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve('dist'),
    filename: 'index_bundle.js'
  },
  module: {
    rules: [
        {
            enforce: "pre",
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "eslint-loader",
            options: {
                formatter: require("eslint-friendly-formatter")
            }
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        }
    ]     
  }
}