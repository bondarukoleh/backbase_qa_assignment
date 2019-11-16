import {Table, ITable, Text, IText} from '../elements'
import {IComputerData} from './shared.form.fragment'
import {ElementFinder} from 'protractor'
import {$} from 'protractor'

interface IComputersTable {
  /* Here should be navigation also */
  getComputersData: () => Promise<IComputerData[]>
  clickOnComputer: (computerName: string) => Promise<void>
  getNoDataText: () => Promise<string>
}

class ComputersTable implements IComputersTable {
  private table: ITable
  private noData: IText

  constructor(private tableRoot: ElementFinder) {
    this.table = new Table(this.tableRoot)
    this.noData = new Text($('div.well'))
  }

  public async clickOnComputer(computerName: string): Promise<void> {
    return this.table.click(computerName)
  }

  public async getComputersData(): Promise<IComputerData[]> {
    return await this.table.getData() as IComputerData[]
  }

  public async getNoDataText(): Promise<string> {
    return this.noData.getData()
  }
}

export {IComputersTable, ComputersTable}
