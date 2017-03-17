module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  custom_commands_path: ["node_modules/nightwatch-helpers/commands", "test/e2e/helpers"],
  custom_assertions_path: ["node_modules/nightwatch-helpers/assertions"],

  test_settings: {
    default: {
      selenium_port: 4445,
      selenium_host: "localhost",
      silent: true,
      request_timeout_options: {
        timeout: 180000,
        retry_attempts: 5
      },
      screenshots: {
        enabled: true, // save screenshots to this directory (excluded by .gitignore)
        path: './screenshots'
      },
      username: process.env.SAUCE_USERNAME,
      access_key: process.env.SAUCE_ACCESS_KEY,
      globals: {
        waitForConditionTimeout: 10000    // wait for content on the page before continuing
      },
      desiredCapabilities: {
        build: `build-${process.env.TRAVIS_JOB_NUMBER}`,
        public: 'public',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    internet_explorer_9: {
			desiredCapabilities: {
				browserName: 'internet explorer',
				version: '9',
        javascriptEnabled: true,
        acceptSslCerts: true
			}
		},

    internet_explorer_10: {
			desiredCapabilities: {
				browserName: 'internet explorer',
				version: '10',
        javascriptEnabled: true,
        acceptSslCerts: true
			}
		},

		internet_explorer_11: {
			desiredCapabilities: {
				browserName: 'internet explorer',
				version: '11',
        javascriptEnabled: true,
        acceptSslCerts: true
			}
		},

    edge: {
			desiredCapabilities: {
				browserName: 'MicrosoftEdge',
        javascriptEnabled: true,
        acceptSslCerts: true
			}
		},

    safari: {
      desiredCapabilities: {
        browserName: "safari",
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    android: {
      desiredCapabilities: {
        browserName: "android",
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    ios: {
      desiredCapabilities: {
        browserName: "iPhone",
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }

  //   'phantomjs: {
  //     'desiredCapabilities: {
  //       'browserName: 'phantomjs',
  //       'javascriptEnabled: true,
  //       'acceptSslCerts: true
  //     }
  //   }
  }
}
