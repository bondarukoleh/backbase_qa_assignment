import {SharedForm, ISharedForm} from '../fragments'
import {Button, IButton} from '../elements'
import {$} from 'protractor'
import {step} from '../../helpers/decorators'

interface IAddComputerPage {
  addComputerForm: ISharedForm
  clickCreateButton(): Promise<void>
  getCreateButton(): Promise<string>
}

class AddComputerPage implements IAddComputerPage {
  public addComputerForm: ISharedForm
  private createComputer: IButton

  constructor() {
    this.addComputerForm = new SharedForm()
    this.createComputer = new Button($('*[value="Create this computer"]'))
  }

  @step(`Click Create Button`)
  public clickCreateButton(): Promise<void> {
    return this.createComputer.click()
  }

  @step(`Get Create Button`)
  public getCreateButton(): Promise<string> {
    return this.createComputer.getData()
  }
}

export {AddComputerPage, IAddComputerPage}
