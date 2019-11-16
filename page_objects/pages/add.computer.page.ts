import {SharedForm, ISharedForm, IComputerData, IGetForm} from '../fragments'
import {Button, IButton} from '../elements'
import {$} from 'protractor'
import {step} from '../../helpers/decorators'

interface IAddComputerPage {
  clickCreateButton(): Promise<void>
  getCreateButton(): Promise<string>
  fillComputerForm(data: IComputerData): Promise<void>
  getComputerForm(): Promise<IGetForm>
  clickCancelButton(): Promise<void>
  getCancelButton(): Promise<string>
}

class AddComputerPage implements IAddComputerPage {
  private addComputerForm: ISharedForm
  private createComputer: IButton

  constructor() {
    this.addComputerForm = new SharedForm()
    this.createComputer = new Button($('*[value="Create this computer"]'))
  }

  @step('Fill computer Form')
  public fillComputerForm(data: IComputerData): Promise<void> {
    return this.addComputerForm.fillForm(data)
  }

  @step('Get computer Form')
  public getComputerForm(): Promise<IGetForm> {
    return this.addComputerForm.getFormData()
  }

  @step(`Click Create Button`)
  public clickCreateButton(): Promise<void> {
    return this.createComputer.click()
  }

  @step(`Get Create Button`)
  public getCreateButton(): Promise<string> {
    return this.createComputer.getData()
  }

  @step(`Click Cancel button in computer form`)
  public clickCancelButton(): Promise<void> {
    return this.addComputerForm.clickCancel()
  }

  @step(`Get Cancel button in computer form`)
  public getCancelButton(): Promise<string> {
    return this.addComputerForm.getCancel()
  }
}

export {AddComputerPage, IAddComputerPage}
