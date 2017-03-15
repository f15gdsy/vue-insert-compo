import test from 'ava'
import Vue from 'vue/dist/vue.min.js'
import utils from '../../src/utils'

const res = Vue.compile('<span id="compo" v-if="enable">{{ message }}</span>')

const Compo = {
  data: {
    message: 'hello world',
    enable: true
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
}

const CompoNoEnable = {
  data: {
    message: 'hello world'
  },
  render: res.render,
  staticRenderFns: res.staticRenderFns
}

//
// Tests - API
//

test('hideEl(el) hides the element', t => {
  const el = document.createElement('div')
  utils.hideEl(el)

  t.is(el.style.visibility, 'hidden')
  t.is(el.style.height, '0px')
  t.is(el.style.overflow, 'hidden')
})


test('show(el) shows the element', t => {
  const el = document.createElement('div')
  utils.showEl(el)

  t.is(el.style.visibility, 'visible')
  t.is(el.style.height, 'auto')
  t.is(el.style.overflow, 'inherit')
})


test('checkCompo(Compo) requires the Compo to have enable in data', t => {
  t.throws(() => {
    utils.checkCompo(CompoNoEnable)
  }, TypeError)
  t.true(utils.checkCompo(Compo))
})
