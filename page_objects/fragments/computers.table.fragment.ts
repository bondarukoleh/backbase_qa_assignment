import {Table, ITable} from '../elements'
import {IComputerData} from './shared.form.fragment'
import {ElementFinder} from 'protractor'
import {step} from '../../helpers';
import {$} from 'protractor'

interface IComputersTable {
  /* Here should be navigation also */
  getComputersData: () => Promise<IComputerData[]>
  clickOnComputer: (computerName: string) => Promise<void>
  getNoData: () => Promise<string>
}

class ComputersTable implements IComputersTable {
  private table: ITable
  private noData: ElementFinder

  constructor(private tableRoot: ElementFinder) {
    this.table = new Table(this.tableRoot)
    this.noData = $('div.well')
  }

  @step('Clicking on computer from computer table')
  public async clickOnComputer(computerName: string): Promise<void> {
    return await this.table.click(computerName)
  }

  @step('Getting data from computer table')
  public async getComputersData(): Promise<IComputerData[]> {
    return await this.table.getData() as IComputerData[]
  }

  @step(`Getting no data text`)
  public async getNoData(): Promise<string> {
    return this.noData.getText()
  }
}

export {IComputersTable, ComputersTable}
