import Vue from 'vue';

const elBody = document.querySelector('body');

const DEFAULT_OPTS = {
  appEl: '#app',
  hideApp: false,
  wrapperTag: 'div',
  beforeEnable: () => {},
  afterEnable: () => {},
  beforeDisable: () => {},
  afterDisable: () => {}
};

function hideAppEl(appEl) {
  appEl.style.visibility = 'hidden';
  appEl.style.height = '0';
  appEl.style.overflow = 'hidden';
}

function showAppEl(appEl) {
  appEl.style.visibility = 'visible';
  appEl.style.height = 'auto';
  appEl.style.overflow = 'inherit';
}


class InsertCompo {
  constructor(Compo, userOpts) {
    this.Compo = Compo;
    this.update(userOpts);
  }

  update(val) {
    this.opts = Object.assign({}, DEFAULT_OPTS, val);

    const appEl = this.opts.appEl;

    this.appEl = typeof appEl === 'string' ? document.querySelector(appEl) : appEl;
  }

  enable() {
    this.opts.beforeEnable();
    this.instance.enable = true;
    setTimeout(() => {
      this.opts.afterEnable();
    });
  }

  disable() {
    this.opts.beforeDisable();
    this.instance.enable = false;
    setTimeout(() => {
      this.opts.afterDisable();
    });
  }

  toggle() {
    this.instance.enable = !this.instance.enable;
  }

  destroy() {
    if (this.$instance) {
      this.$instance.$destroy();
    }
  }

  setCompoProp(key, val) {
    this.instance[key] = val;
  }

  get instance() {
    if (!this.$instance) {
      const el = document.createElement(this.opts.wrapperTag);
      elBody.appendChild(el);

      this.$instance = new Vue(Object.assign({}, { el }, this.Compo));

      this.$instance.$watch('enable', (val) => {
        if (!this.opts.hideApp) return;

        if (val) {
          hideAppEl(this.appEl);
        } else {
          showAppEl(this.appEl);
        }
      });
    }

    return this.$instance;
  }
}


export default InsertCompo;
