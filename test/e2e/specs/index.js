const txt = 'Hello World!'

module.exports = {
  'Docs Pages': browser => {
    browser
      .url('http://localhost:8080/docs')
      .waitForElementVisible('body', 10000)
      .waitForElementVisible('[data-btn-modal]', 10000)
      .click('[data-btn-modal]')
      .pause(300)
      .assert.containsText('.modal', txt)
      .click('.modal')
      .pause(300)
      .assert.elementNotPresent('.modal')

    browser
      .click('[data-btn-notification]')
      .pause(300)
      .assert.containsText('.notification', txt)
      .click('[data-btn-notification]')
      .pause(300)
      .assert.elementNotPresent('.notification')

    browser
      .click('[data-btn-loading]')
      .pause(100)
      .assert.elementPresent('.loading')
      .click('[data-btn-loading]')
      .pause(100)
      .assert.elementNotPresent('.loading')

    browser
      .click('[data-btn-message]')
      .pause(100)
      .assert.count('.message', 1)
      .click('[data-btn-message]')
      .pause(100)
      .assert.count('.message', 2)
      .click('[data-btn-message]')
      .pause(100)
      .assert.count('.message', 3)
      .click('#message-2 .message__close')
      .pause(100)
      .assert.count('.message', 2)
      .click('#message-1 .message__close')
      .pause(100)
      .assert.count('.message', 1)
      .click('#message-0 .message__close')
      .pause(100)
      .assert.count('.message', 0)
      .end()
  },

  afterEach: (browser, done) => {
    browser.updateResults()
    setTimeout(() => done(), 1000)
  }
}
