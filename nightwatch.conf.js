require('env2')('.env')

module.exports = {
  'src_folders': ['test/e2e'],
  'output_folder': 'test/e2e/reports',

  'selenium': {
    'start_process': true,
    'server_path': require('selenium-server').path,
    'host': '127.0.0.1',
    'port': 4444,
    'cli_args': {
      'webdriver.chrome.driver': require('chromedriver').path
      , 'webdriver.gecko.driver': 'node_modules/geckodriver/geckodriver'
    }
  },

  'test_settings': {
    'default': {
      "launch_url": "http://localhost", // we're testing a Public or "staging" site on Saucelabs
      "selenium_port": 80,
      "selenium_host": "ondemand.saucelabs.com",
      "silent": true,
      "screenshots": {
        "enabled": true, // save screenshots to this directory (excluded by .gitignore)
        "path": './screenshots'
      },
      "username" : "${SAUCE_USERNAME}",     // if you want to use Saucelabs remember to
      "access_key" : "${SAUCE_ACCESS_KEY}", // export your environment variables (see readme)
      "globals": {
        "waitForConditionTimeout": 10000    // wait for content on the page before continuing
      }
    },

    'local': {
      'selenium_port': 4444,
      'selenium_host': 'localhost',
      'silent': true,
      'screenshots': {
        'enabled': true,
        'on_failure': true,
        'on_error': false,
        'path': 'test/e2e/screenshots'
      }
    },

    'chrome': {
      'desiredCapabilities': {
        'browserName': 'chrome',
        'javascriptEnabled': true,
        'acceptSslCerts': true
      }
    }

  //   'firefox': {
  //     'desiredCapabilities': {
  //       'browserName': 'firefox',
  //       'javascriptEnabled': true,
  //       'acceptSslCerts': true,
  //       'marionette': true
  //     }
  //   },

  //   'phantomjs': {
  //     'desiredCapabilities': {
  //       'browserName': 'phantomjs',
  //       'javascriptEnabled': true,
  //       'acceptSslCerts': true
  //     }
  //   }
  }
}
