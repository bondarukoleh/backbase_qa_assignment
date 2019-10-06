import {ElementFinder, ElementArrayFinder} from 'protractor'

import {waitForVisible} from '../../helpers'

interface ITable {
  getData: () => Promise<object[]>
}

class Table {
  private headers: ElementArrayFinder
  private rows: ElementArrayFinder

  constructor(private root: ElementFinder) {
    this.headers = this.root.$$('th')
    this.rows = this.root.$$('tbody tr')
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
