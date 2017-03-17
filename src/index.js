import Vue from 'vue'
import utils from './utils'

const DEFAULT_OPTS = {
  hideEl: null,
  wrapperEl: null
}

export default class InsertCompo {
  constructor(Compo, userOpts) {
    console.assert(typeof Promise !== 'undefined', `Vue Insert Compo: requires a Promise polyfill in this browser.`)

    utils.checkCompo(Compo)

    this.Compo = Compo
    this.$instance = null
    this.$update(userOpts)
  }

  $update(val) {
    this.opts = {
      hideEl: val ? val.hideEl : DEFAULT_OPTS.hideEl,
      wrapperEl: val ? val.wrapperEl : DEFAULT_OPTS.wrapperEl
    }

    const elToHide = this.opts.hideEl

    /* istanbul ignore else */
    if (elToHide) {
      if (typeof elToHide === 'string') {
        this.hideEl = document.querySelector(elToHide)
      } else if (elToHide.tagName) {
        this.hideEl = elToHide
      } else {
        throw new TypeError('Vue Insert Compo: invalid hideEl')
      }
    }

    const wrapperEl = this.opts.wrapperEl

    if (wrapperEl) {
      if (typeof wrapperEl === 'string') {
        this.wrapperEl = document.querySelector(wrapperEl)
      } else if (wrapperEl.tagName) {
        this.wrapperEl = wrapperEl
      } else {
        throw new TypeError('Vue Insert Compo: invalid wrapperEl')
      }
    } else {
      this.wrapperEl = document.querySelector('body')
    }
  }

  enable() {
    this.instance.enable = true

    return new Promise(resolve => {
      Vue.nextTick(() => {
        resolve()
      })
    })
  }

  disable() {
    this.instance.enable = false

    return new Promise(resolve => {
      Vue.nextTick(() => {
        resolve()
      })
    })
  }

  toggle() {
    return this.instance.enable ? this.disable() : this.enable()
  }

  destroy() {
    if (this.$instance) {
      const el = this.$instance.$el
      /* istanbul ignore else */
      if (el.parentNode) {
        el.parentNode.removeChild(el)
      }
      this.$instance.$destroy()
      this.$instance = null
    }
  }

  get instance() {
    if (!this.$instance) {
      const el = document.createElement('div')
      this.wrapperEl.appendChild(el)
      this.Compo.el = el

      this.$instance = new Vue(this.Compo)
      this.$instance.enable = false

      this.$instance.$watch('enable', (val) => {
        if (!this.hideEl) return

        if (val) {
          utils.hideEl(this.hideEl)
        } else {
          utils.showEl(this.hideEl)
        }
      })
    }

    return this.$instance
  }
}
