import Vue from 'vue'
import utils from './utils'

const elBody = document.querySelector('body')

const DEFAULT_OPTS = {
  hideEl: null
}

export default class InsertCompo {
  constructor(Compo, userOpts) {
    utils.checkCompo(Compo)

    this.Compo = Compo
    this.$instance = null
    this.$update(userOpts)
  }

  $update(val) {
    this.opts = Object.assign({}, DEFAULT_OPTS, val)

    const elToHide = this.opts.hideEl

    if (!elToHide) return

    if (typeof elToHide === 'string') {
      this.hideEl = document.querySelector(elToHide)
    } else if (elToHide.tagName) {
      this.hideEl = elToHide
    } else {
      throw new TypeError('Vue Insert Compo: invalid hideEl')
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
      elBody.appendChild(el)

      this.$instance = new Vue(Object.assign({}, { el }, this.Compo))
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
