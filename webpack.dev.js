const fs = require('fs');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    compress: true,
    contentBase: path.resolve(__dirname, './dist'),
    disableHostCheck: true,
    port: 8080,
  },
});