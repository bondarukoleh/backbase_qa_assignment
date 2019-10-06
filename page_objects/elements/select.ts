import {by, element, ElementArrayFinder, ElementFinder, protractor} from 'protractor'

import {waitForVisible} from '../../helpers'

interface ISelect {
  sendKeys: (option: string) => Promise<void>
  getData: () => Promise<string>
}

class Select {
  private options: ElementArrayFinder

  constructor(private root: ElementFinder) {
    this.options = this.root.$$('option')
  }

  public async sendKeys(option: string): Promise<void> {
    await waitForVisible(this.root)
    await this.root.click()
    // await waitForVisible(this.liElements.get(0)) TODO: delete if not needed
    const neededOption = element(by.js((elements, optionName) => {
      /* faster way to click on element. Since Selenium elements collection - is array-like
       we cannot use find on it. That's why I need to Array.prototype.find.call */
      return Array.prototype.find.call(elements, (foundOption) => foundOption.innerText.trim() === optionName)
    }, this.options.getWebElements(), option))
    await neededOption.click()
  }

  public async getData(): Promise<string> {
    await waitForVisible(this.root)
    return this.root.$('option:checked').getText()
  }
}

export {Select, ISelect}
