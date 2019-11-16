import {$, by, element, ElementFinder} from 'protractor'
import {Button, IButton, IInput, Input} from '../elements'
import {ComputersTable, IComputerData, IComputersTable} from '../fragments'
import {sleep, step} from '../../helpers'

interface IComputersPage {
  filterBy(computerName: string): Promise<void>
  clickAddNewComputer(): Promise<void>
  getBannerText(): Promise<string>
  clickTableComputer(computerName: string): Promise<void>
  getComputersTable(): Promise<IComputerData[]>
  getNoDataText(): Promise<string>
}

class ComputersPage implements IComputersPage {
  private computersTable: IComputersTable
  private filterButton: IButton
  private filterInput: IInput
  private addComputerButton: IButton
  private banner: ElementFinder

  constructor() {
    this.computersTable = new ComputersTable($('table.computers'))
    this.filterButton = new Button(element(by.id('searchsubmit')))
    this.filterInput = new Input(element(by.id('searchbox')))
    this.addComputerButton = new Button(element(by.id('add')))
    this.banner = $('div.alert-message.warning')
  }

  @step('Filtering by Computer')
  public async filterBy(computerName: string) {
    await this.filterInput.sendKeys(computerName)
    await this.filterButton.click()
    await sleep()
  }

  @step('Click Add New Computer')
  public async clickAddNewComputer(): Promise<void> {
    return this.addComputerButton.click()
  }

  @step(`Getting banner text`)
  public async getBannerText(): Promise<string> {
    return await this.banner.getText()
  }

  @step('Clicking on computer from computer table')
  public async clickTableComputer(computerName: string): Promise<void> {
    return this.computersTable.clickOnComputer(computerName)
  }

  @step('Getting data from computer table')
  public async getComputersTable(): Promise<IComputerData[]> {
    return await this.computersTable.getComputersData() as IComputerData[]
  }

  @step('Getting no data text')
  public async getNoDataText(): Promise<string> {
    return this.computersTable.getNoDataText()
  }
}

export {ComputersPage, IComputersPage}
