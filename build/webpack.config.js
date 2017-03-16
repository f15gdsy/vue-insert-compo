const path = require('path')
const webpack = require('webpack')
const WebpackShellPlugin = require('webpack-shell-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'vue-insert-compo.min.js',
    path: path.join(__dirname, '../dist'),
    library: 'VueInsertCompo',
    libraryTarget: 'umd'
  },

  externals: {
    'vue': 'vue'
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    })

    // new WebpackShellPlugin({
    //   onBuildEnd: [
    //     'cp dist/vue-insert-compo.min.js docs'
    //   ]
    // })
  ]
}
