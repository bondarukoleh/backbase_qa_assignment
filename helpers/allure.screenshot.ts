import {browser} from 'protractor'

const ENV_ARGS = process.argv.slice(2)
declare const allure: any

async function allureScreenShot(title: string = 'Screenshoot'): Promise<void> {
  try {
    const png = await browser.takeScreenshot()
    return allure.createAttachment(title, Buffer.from(png, 'base64'), 'image/png')
  } catch (e) {
    if (e.toString().includes('window was already closed')) {
      console.log(`Window was already closed, couldn't make screenshot`)
    }
  }
}

const stubScreenshot = (title: string = 'Stub') => {
}

export const takeScreenshot = ENV_ARGS.includes('--debugging') ? stubScreenshot : allureScreenShot
