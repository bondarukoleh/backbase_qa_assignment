import {browser, Config} from 'protractor'
import {urls} from '../data'

const ENV_ARGS = process.argv.slice(2)

const config: Config = {
  // seleniumAddress: 'http://localhost:4444/wd/hub', /*You can run selenium standalone by yourself.*/
  directConnect: ENV_ARGS.includes('--directConnect'),
  framework: 'mocha',
  mochaOpts: {
    timeout: 350 * 1000,
    fullTrace: true,
    reporter: ENV_ARGS.includes('--debugging') ? 'spec' : 'mocha-allure-reporter'
  },
  specs: ['./specs/*.spec.*'],
  baseUrl: urls.main,
  allScriptsTimeout: 30 * 1000,
  capabilities: {
    browserName: 'chrome',
    unexpectedAlertBehaviour: 'accept',
    maxInstances: 2,
    shardTestFiles: true,
    version: '70',
    chromeOptions: {
      args: [
        '--no-sandbox',
        '--ignore-certificate-errors',
        '--disable-gpu',
        '--disable-gpu-program-cache',
        '--disable-gpu-shader-disk-cache',
        '--process-per-tab',
        '--process-per-site'
      ]
    },
    logLevel: 'ERROR',
    SELENIUM_PROMISE_MANAGER: false
  },
  onPrepare: async () => {
    await browser.waitForAngularEnabled(false)
    await browser.manage().window().maximize()
    browser.ignoreSynchronization = true
  }
}

export {config}
