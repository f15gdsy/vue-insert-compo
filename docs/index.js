/**
 * Modal
 */
var modalTpl = Vue.compile([
  '<transition name="fade" appear>',
  '  <article v-if="enable" class="modal" @click="close">',
  '    <h3 class="modal__title">Hello World!</h3>',
  '  </article>',
  '</transition>'
].join(''))

var Modal = {
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

var modal = new window.VueInsertCompo(Modal)

const btnModal = document.querySelector('[data-btn-modal]')
btnModal.addEventListener('click', function() {
  modal.toggle()
})



/**
 * Notification
 */
var notificationTpl = Vue.compile([
  '<transition name="snap" appear>',
  '  <article v-if="enable" class="notification">',
  '    <h3 class="notification__title">Hello World!</h3>',
  '  </article>',
  '</transition>',
].join(''))

var Notification = {
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
      var _this = this;
      setTimeout(function() {
        _this.enable = false
      }, 3000)
    }
  },
  render: notificationTpl.render,
  staticRenderFns: notificationTpl.staticRenderFns
}

var notification = new window.VueInsertCompo(Notification)

const btnNotification = document.querySelector('[data-btn-notification]')
btnNotification.addEventListener('click', function() {
  notification.toggle()
})



/**
 * Loading
 */
var loadingTpl = Vue.compile('<div v-if="enable" class="loading"></div>')

var Loading = {
  data: {
    enable: true
  },
  render: loadingTpl.render,
  staticRenderFns: loadingTpl.staticRenderFns
}

var loading = new window.VueInsertCompo(Loading)

const btnLoading = document.querySelector('[data-btn-loading]')
btnLoading.addEventListener('click', function() {
  loading.toggle()
})


/**
 * Message
 */
var messageTpl = Vue.compile([
  '<article v-if="enable" class="message" :style="top" :id="\'message-\' + id">',
  '  <h3 class="message__title">Hello World!</h3>',
  '  <div class="message__close" @click="close">x</div>',
  '</article>'
].join(''))

var Message = {
  data: function() {
    return {
      id: null,
      enable: true
    }
  },
  computed: {
    top() {
      return { top: this.id * 40 + 'px'}
    }
  },
  methods: {
    close() {
      var message = messages.splice(this.id, 1)[0]
      message.destroy()
      updateMessages()
    }
  },
  render: messageTpl.render,
  staticRenderFns: messageTpl.staticRenderFns
}

var messages = []
var messageId = 0
const btnMessage = document.querySelector('[data-btn-message]')
btnMessage.addEventListener('click', function() {
  var message = new window.VueInsertCompo(Message, {
    wrapperEl: '.messages'
  })
  message.instance.id = messageId
  messageId++
  messages.push(message)
  message.enable()
})

function updateMessages() {
  messages.forEach(function(message, i) {
    message.instance.id = i
  })
  messageId = messages.length
}
