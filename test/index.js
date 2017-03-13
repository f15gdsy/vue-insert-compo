import Vue from 'vue/dist/vue.min.js'
import VueRuntime from 'vue'
import test from 'ava'
import InsertCompo from '../dist/vue-insert-compo.min.js'

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

const body = document.querySelector('body')

// Vue.nextTick Required for Vue rendering
function timeout(func) {
  return new Promise(resolve => {
    Vue.nextTick(() => {
      resolve()
    })
  })
}

test.afterEach.always('cleanup', t => {
  t.context.insert ? t.context.insert.destroy() : (() => {})()

  for (let i = body.childNodes.length - 1; i >= 0; i--) {
    body.removeChild(body.childNodes[i])
  }

  console.log()
})

//
// Tests - API
//
test.serial('new InsertCompo(Compo) wont insert compo yet', async t => {
  const insert = new InsertCompo(Compo)
  t.context.insert = insert

  return timeout()
    .then(() => {
      const el = document.querySelector('#compo')

      t.is(el, null)
      t.false(insert.instance.enable)
    })
})

test.serial('new InsertCompo(Compo) require the Compo to have enable in data', t => {
  t.throws(() => {
    new InsertCompo(CompoNoEnable)
  }, TypeError)
})

test.serial('.enable() can insert the Vue component', async t => {
  const insert = new InsertCompo(Compo)
  t.context.insert = insert

  await insert.enable()

  const el = document.querySelector('#compo')

  t.not(el, null)
  t.true(insert.instance.enable)
})


test.serial('.disable() can hide the Vue component', async t => {
  const insert = new InsertCompo(Compo)
  t.context.insert = insert

  await insert.enable()

  let el = document.querySelector('#compo')

  t.not(el, null)
  t.true(insert.instance.enable)

  await insert.disable()

  el = document.querySelector('#compo')

  t.is(el, null)
  t.false(insert.instance.enable)
})


test.serial('.toggle() can toggle the Vue component', async t => {
  const insert = new InsertCompo(Compo)
  t.context.insert = insert

  await insert.toggle()

  let el = document.querySelector('#compo')
  t.not(el, null)
  t.true(insert.instance.enable)

  await insert.toggle()

  el = document.querySelector('#compo')

  t.is(el, null)
  t.false(insert.instance.enable)
})


test.serial('.destroy() correctly destroys the Vue component and the DOM', async t => {
  const insert = new InsertCompo(Compo)
  t.context.insert = insert

  await insert.enable()

  insert.destroy()

  const el = document.querySelector('#compo')

  t.is(el, null)
  t.is(insert.$instance, null)
})


//
// Tests - Opts
//
test.serial('{ hideEl: selector } will hide the element when insert.enable()', async t => {
  const app = document.createElement('div')
  app.setAttribute('id', 'app')
  body.appendChild(app)

  const insert = new InsertCompo(Compo, {
    hideEl: '#app'
  })
  t.context.insert = insert

  t.not(document.querySelector('#app'), null, '#app mounted')

  await await insert.enable()

  t.is(app.style.visibility, 'hidden')
  t.is(app.style.height, '0px')
  t.is(app.style.overflow, 'hidden')
})

test.serial('{ hideEl: el } will hide the element when insert.enable()', async t => {
  const app = document.createElement('div')
  app.setAttribute('id', 'app')
  body.appendChild(app)

  const insert = new InsertCompo(Compo, { hideEl: app })
  t.context.insert = insert

  t.not(document.querySelector('#app'), null, '#app mounted')

  await await insert.enable()

  t.is(app.style.visibility, 'hidden')
  t.is(app.style.height, '0px')
  t.is(app.style.overflow, 'hidden')
})

test.serial('{ hideEl: invalid } will raise an error', async t => {
  t.throws(() => {
    new InsertCompo(Compo, { hideEl: true })
  }, TypeError)
})
