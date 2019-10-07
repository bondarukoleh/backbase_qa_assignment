import {ExpectedConditions, ElementFinder, browser} from 'protractor'

async function waitForVisible(element: ElementFinder, timeToWait: number = 3000) {
  await browser.wait(ExpectedConditions.visibilityOf(element), timeToWait,
      `Element ${element.locator()} should be visible.`)
}

async function sleep(time: number = 2000) {
  await new Promise((r) => setTimeout(r, time))
}

export {waitForVisible, sleep}
