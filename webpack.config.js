const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: {
      'dist/bundle': './src/index.js',
  },
  output: {
    filename: '[name].js',
    library: 'TextEllipsis',
    libraryTarget: 'umd',
    publicPath: '/dist/',
    umdNamedDefine: true,
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
            },
        },
        {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: "babel-loader",
        },
    ],
  },
  resolve: {
    alias: {
        'react': path.resolve(__dirname, './node_modules/react'),
        'react-dom': path.resolve(__dirname, './node_modules/react-dom'),
    },
  },
    externals: {
        react: {
            commonjs: "react",
            commonjs2: "react",
            amd: "React",
            root: "React",
        },
        "react-dom": {
            commonjs: "react-dom",
            commonjs2: "react-dom",
            amd: "ReactDOM",
            root: "ReactDOM",
        },
    },
};