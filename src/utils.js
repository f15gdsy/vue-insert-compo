export default {
  hideEl(el) {
    el.style.visibility = 'hidden'
    el.style.height = '0'
    el.style.overflow = 'hidden'
  },

  showEl(el) {
    el.style.visibility = ''
    el.style.height = ''
    el.style.overflow = ''
  },

  checkCompo(Compo) {
    const defaultData = typeof Compo.data !== 'function' ? Compo.data : /* istanbul ignore next */ Compo.data()

    if (defaultData.enable === undefined) {
      throw new TypeError('Vue Insert Compo: { Boolean } enable - is required in data()')
    }
    return true
  }
}
