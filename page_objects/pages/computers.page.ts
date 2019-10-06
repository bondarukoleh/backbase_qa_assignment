import {$, by, element} from 'protractor'
import {Button, IButton, IInput, Input} from '../elements'
import {ComputersTable, IComputersTable} from '../fragments'
import {sleep, step} from '../../helpers'

interface IComputersPage {
  computersTable: IComputersTable
  filterBy: (computerName: string) => Promise<void>
  clickAddNewComputer: () => Promise<void>
}

class ComputersPage implements IComputersPage {
  public computersTable: IComputersTable
  private filterButton: IButton
  private filterInput: IInput
  private addComputerButton: IButton

  constructor() {
    this.computersTable = new ComputersTable($('table.computers'))
    this.filterButton = new Button(element(by.id('searchsubmit')))
    this.filterInput = new Input(element(by.id('searchbox')))
    this.addComputerButton = new Button(element(by.id('add')))
  }

  public async filterBy(computerName: string) {
    await this.filterInput.sendKeys(computerName)
    await this.filterButton.click()
    await sleep()
  }

  @step('Click Add New Computer')
  public async clickAddNewComputer(): Promise<void> {
    return this.addComputerButton.click()
  }
}

export {ComputersPage, IComputersPage}
