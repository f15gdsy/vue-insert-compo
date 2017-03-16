import path from 'path'
import resolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'
import copy from '../src/rollup-plugin-copy'

export default {
  entry: 'src/index.js',
  dest: 'dist/vue-insert-compo.min.js',
  format: 'umd',
  moduleName: "VueInsertCompo",
  exports: 'default',
  external: [
    'vue'
  ],
  globals: {
    vue: 'Vue'
  },
  plugins: [
    resolve(),
    buble(),
    uglify(),
    copy({
      afterBundle: [{
        from: path.join(__dirname, '../dist/vue-insert-compo.min.js'),
        to: path.join(__dirname, '../docs/vue-insert-compo.min.js')
      }]
    })
  ]
}
