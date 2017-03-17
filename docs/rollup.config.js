import resolve from 'rollup-plugin-node-resolve'
import buble from 'rollup-plugin-buble'
import uglify from 'rollup-plugin-uglify'

export default {
  entry: 'docs/index.js',
  dest: 'docs/index.min.js',
  format: 'iife',
  external: [
    'vue'
  ],
  globals: {
    vue: 'Vue'
  },
  plugins: [
    resolve(),
    buble(),
    uglify()
  ]
}
