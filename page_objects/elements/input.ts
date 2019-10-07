import {waitForVisible} from '../../helpers'
import {browser} from 'protractor'

interface IGetInputData {
  value: string,
  error: boolean
}

interface IInput {
  click: () => Promise<void>
  sendKeys: (data: string) => Promise<void>
  getData: () => Promise<IGetInputData>
}

class Input implements IInput {
  constructor(private root) {
    this.root = root
  }

  public async click(): Promise<void> {
    await waitForVisible(this.root)
    await this.root.click()
  }

  public async sendKeys(data: string): Promise<void> {
    await waitForVisible(this.root)
    await this.root.clear()
    return this.root.sendKeys(data)
  }

  public async getData(): Promise<IGetInputData> {
    await waitForVisible(this.root)
    return await browser.executeScript((elem) => ({
      value: elem.value,
      error: elem.parentElement.parentElement.getAttribute('class').includes('error')
    }), this.root.getWebElement()) as IGetInputData
  }
}

export {Input, IInput, IGetInputData}
