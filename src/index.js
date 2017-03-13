import Vue from 'vue'

const elBody = document.querySelector('body')

const DEFAULT_OPTS = {
  hideEl: null
}

function hideEl(el) {
  el.style.visibility = 'hidden'
  el.style.height = '0'
  el.style.overflow = 'hidden'
}

function showEl(el) {
  el.style.visibility = 'visible'
  el.style.height = 'auto'
  el.style.overflow = 'inherit'
}

function checkCompo(Compo) {
  const defaultData = typeof Compo.data === 'function' ? Compo.data() : Compo.data
  if (defaultData.enable === undefined) {
    throw new TypeError('Vue Insert Compo: { Boolean } enable - is required in data()')
  }
}


export default class InsertCompo {
  constructor(Compo, userOpts) {
    checkCompo(Compo)

    this.Compo = Compo
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
          hideEl(this.hideEl)
        } else {
          showEl(this.hideEl)
        }
      })
    }

    return this.$instance
  }
}
