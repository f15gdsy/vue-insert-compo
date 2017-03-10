const path = require('path');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'vue-insert-compo.min.js',
    path: path.join(__dirname, 'dist'),
    library: 'VueInsertCompo',
    libraryTarget: 'umd'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  }
};
