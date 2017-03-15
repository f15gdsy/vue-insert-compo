module.exports = {
  'src_folders': ['../test/e2e'],
  'output_folder': '../test/e2e/reports',

  'test_settings': {
    'default': {
      "launch_url": "",
      "selenium_port": 4445,
      "selenium_host": "localhost",
      "silent": true,
      "screenshots": {
        "enabled": true, // save screenshots to this directory (excluded by .gitignore)
        "path": './screenshots'
      },
      username: process.env.SAUCE_USERNAME,
      access_key: process.env.SAUCE_ACCESS_KEY,
      "globals": {
        "waitForConditionTimeout": 10000    // wait for content on the page before continuing
      },
      desiredCapabilities: {
        build: `build-${process.env.TRAVIS_JOB_NUMBER}`,
        public: 'public',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
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
