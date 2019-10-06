import {Table, ITable} from '../elements'
import {IComputerData} from './shared.form.fragment'
import {ElementFinder} from 'protractor'

interface IComputersTable {
  /* Here should be navigation also */
  getComputersData: () => Promise<IComputerData[]>
}

class ComputersTable implements IComputersTable {
  private table: ITable

  constructor(private tableRoot: ElementFinder) {
    this.table = new Table(this.tableRoot)
  }

  public async getComputersData(): Promise<IComputerData[]> {
    return await this.table.getData() as IComputerData[]
  }
}

export {IComputersTable, ComputersTable}
