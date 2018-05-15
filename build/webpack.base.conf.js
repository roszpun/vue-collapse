const path = require('path');
const config = require('../config/prod.env');

const resolve = (dir) => path.join(__dirname, '..', dir);

module.exports = {
  entry: {
    app: config.prod.entry
  },
  output: {
    filename: config.prod.lib,
    publicPath: '/'
  },
  resolve: {
    extensions: config.prod.extensions,
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
      options: {
        extractCSS: process.env.NODE_ENV === 'production'
      }}, {
      test: /\.js$/,
      loader: 'babel-loader',
      include: [resolve('src')]
    }]
  }
};
