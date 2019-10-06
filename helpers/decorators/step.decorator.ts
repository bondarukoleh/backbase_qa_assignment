/* To make page functions like steps during execution, with screenshots and logging */
import { ElementFinder } from 'protractor'
import {takeScreenshot} from '../allure.screenshot'

const ENV_ARGS = process.argv.slice(2);
const SPEC_REPORTER = ENV_ARGS.includes('--debugging')

declare const allure: any

function stepAllure(title: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const reporter = allure._allure
    const originalFunction = descriptor.value

    descriptor.value = async function (...args) {
      const originalArgs = args
      reporter.startStep(title, Date.now())

      try {
        const result = await originalFunction.apply(this, originalArgs)
        reporter.endStep('passed', Date.now())
        return result
      } catch (e) {
        allure.createAttachment('ERROR', e.toString(), 'text/plain')
        await takeScreenshot('Failed step')
        if (e.toString().includes('AssertionError')) {
          reporter.endStep('failed', Date.now())
        } else {
          reporter.endStep('broken', Date.now())
        }
        throw e
      }
    }
    return descriptor
  }
}

function stepStub(title: string) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalFunction = descriptor.value

    descriptor.value = async function (...args) {
      const originalArgs = args
      const argsWithoutElementFinder = args.filter((el) => !(el instanceof ElementFinder))
      console.log(`Step: ${title}`)
      argsWithoutElementFinder.length && console.log('Method args: ', JSON.stringify(argsWithoutElementFinder))

      try {
        return originalFunction.apply(this, originalArgs)
      } catch (e) {
        throw e
      }
    }
    return descriptor
  }
}

export const step = SPEC_REPORTER ? stepStub : stepAllure
