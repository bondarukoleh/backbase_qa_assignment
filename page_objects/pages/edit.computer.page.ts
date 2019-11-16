import {SharedForm, ISharedForm, IComputerData, IGetForm} from '../fragments'
import {Button, IButton} from '../elements'
import {$} from 'protractor'
import {step} from '../../helpers'

interface IEditComputerPage {
  clickSaveButton(): Promise<void>
  getSaveButton(): Promise<string>
  clickDeleteButton(): Promise<void>
  getDeleteButton(): Promise<string>
  fillComputerForm(data: IComputerData): Promise<void>
  getComputerForm(): Promise<IGetForm>
  clickCancelButton(): Promise<void>
  getCancelButton(): Promise<string>
}

class EditComputerPage implements IEditComputerPage {
  public editComputerForm: ISharedForm
  protected saveComputer: IButton
  protected deleteComputer: IButton

  constructor() {
    this.editComputerForm = new SharedForm()
    this.saveComputer = new Button($('*[value="Save this computer"]'))
    this.deleteComputer = new Button($('*[value="Delete this computer"]'))
  }

  @step('Clicking Save Button')
  public clickSaveButton(): Promise<void> {
    return this.saveComputer.click()
  }

  @step('Getting Save Button')
  public getSaveButton(): Promise<string> {
    return this.saveComputer.getData()
  }

  @step('Clicking Delete Button')
  public clickDeleteButton(): Promise<void> {
    return this.deleteComputer.click()
  }

  @step('Getting Delete Button')
  public getDeleteButton(): Promise<string> {
    return this.deleteComputer.getData()
  }

  @step('Fill computer Form')
  public fillComputerForm(data: IComputerData): Promise<void> {
    return this.editComputerForm.fillForm(data)
  }

  @step('Get computer Form')
  public getComputerForm(): Promise<IGetForm> {
    return this.editComputerForm.getFormData()
  }

  @step(`Click Cancel button in computer form`)
  public clickCancelButton(): Promise<void> {
    return this.editComputerForm.clickCancel()
  }

  @step(`Get Cancel button in computer form`)
  public getCancelButton(): Promise<string> {
    return this.editComputerForm.getCancel()
  }
}

export {EditComputerPage, IEditComputerPage}
