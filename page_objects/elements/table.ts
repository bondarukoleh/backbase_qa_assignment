import {ElementFinder, ElementArrayFinder, browser, element, by} from 'protractor'
import {waitForVisible} from '../../helpers'

interface ITable {
  getData: () => Promise<object[]>
  click: (computersName: string) => Promise<void>
}

class Table {
  private headers: ElementArrayFinder
  private rows: ElementArrayFinder

  constructor(private root: ElementFinder) {
    this.headers = this.root.$$('th')
    this.rows = this.root.$$('tbody tr')
  }

  public async click(computerName: string): Promise<void> {
    await waitForVisible(this.root)
    const computerToClick = await element(by.js(function (rows, computer) {
      return Array.prototype.find.call(rows,
        (row) => row.querySelector('td').innerText === computer).querySelector('td a')
    }, this.rows.getWebElements(), computerName))
    return computerToClick.click()
  }

  public async getData(): Promise<object[]> {
    await waitForVisible(this.root)
    const headersData = await this.headers.map(async (header) => await header.getText()) as string[]
    return await this.rows.map(async (row) => {
      const rowData = await row.$$('td').map(async (data) => await data.getText()) as string[]
      const rowToReturn = {}
      for (const [i, headerData] of headersData.entries()) {
        rowToReturn[headerData] = rowData[i]
      }
      return rowToReturn
    }) as object[]
  }
}

export {Table, ITable}
