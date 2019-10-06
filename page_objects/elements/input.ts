import {waitForVisible} from '../../helpers'
import {browser} from 'protractor'

interface IInput {
  click: () => Promise<void>
  sendKeys: (data: string) => Promise<void>
  getData: () => Promise<string>
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

  public async getData(): Promise<string> {
    await waitForVisible(this.root)
    return await browser.executeScript((elem) => elem.value, this.root.getWebElement()) as string
  }
}

export {Input, IInput}
