const config = require('../../nightwatch.conf')

module.exports = {
  'Demo test Baidu': browser => {
    browser
      .url('http://www.baidu.com')
      .waitForElementVisible('body', 1000)
      .setValue('input#kw', 'nightwatch')
      .waitForElementVisible('input#su', 1000)
      .click('input#su')
      .pause(1000)
      .assert.containsText('body', 'Nightwatch')
      .end()
  }
}
