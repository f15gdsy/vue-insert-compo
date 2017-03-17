/**
 * Modal
 */
const modalTpl = Vue.compile(`
  <transition name="fade" appear>
    <article v-if="enable" class="modal" @click="close">
      <h3 class="modal__title">Hello World!</h3>
    </article>
  </transition>`)

const Modal = {
  data: {
    enable: true
  },
  methods: {
    close() {
      this.enable = false;
    }
  },
  render: modalTpl.render,
  staticRenderFns: modalTpl.staticRenderFns
}

const modal = new window.VueInsertCompo(Modal)

const btnModal = document.querySelector('[data-btn-modal]')
btnModal.addEventListener('click', () => modal.toggle())


/**
 * Notification
 */
const notificationTpl = Vue.compile(`
  <transition name="snap" appear>
    <article v-if="enable" class="notification">
      <h3 class="notification__title">Hello World!</h3>
    </article>'
  </transition>`)

const Notification = {
  data: {
    enable: true
  },
  mounted() {
    if (this.enable) {
      this.autoClose()
    }
  },
  watch: {
    enable(val) {
      if (val) {
        this.autoClose()
      }
    }
  },
  methods: {
    autoClose() {
      setTimeout(() => this.enable = false, 3000)
    }
  },
  render: notificationTpl.render,
  staticRenderFns: notificationTpl.staticRenderFns
}

const notification = new window.VueInsertCompo(Notification)

const btnNotification = document.querySelector('[data-btn-notification]')
btnNotification.addEventListener('click', () => notification.toggle())



/**
 * Loading
 */
const loadingTpl = Vue.compile('<div v-if="enable" class="loading"></div>')

const Loading = {
  data: {
    enable: true
  },
  render: loadingTpl.render,
  staticRenderFns: loadingTpl.staticRenderFns
}

const loading = new window.VueInsertCompo(Loading)

const btnLoading = document.querySelector('[data-btn-loading]')
btnLoading.addEventListener('click', () => loading.toggle())


/**
 * Message
 */
const messageTpl = Vue.compile(`
  <article v-if="enable" class="message" :style="top" :id="\'message-\' + id">
    <h3 class="message__title">Hello World!</h3>
    <div class="message__close" @click="close">x</div>
  </article>`)

const Message = {
  data: function() {
    return {
      id: null,
      enable: true
    }
  },
  computed: {
    top() {
      return { top: `${ this.id * 40 }px` }
    }
  },
  methods: {
    close() {
      const message = messages.splice(this.id, 1)[0]
      message.destroy()
      updateMessages()
    }
  },
  render: messageTpl.render,
  staticRenderFns: messageTpl.staticRenderFns
}

const messages = []
let messageId = 0
const btnMessage = document.querySelector('[data-btn-message]')
btnMessage.addEventListener('click', () => {
  const message = new window.VueInsertCompo(Message, {
    wrapperEl: '.messages'
  })
  message.instance.id = messageId
  messageId++
  messages.push(message)
  message.enable()
})

function updateMessages() {
  messages.forEach((message, i) => message.instance.id = i)
  messageId = messages.length
}
