import {SharedForm, ISharedForm} from '../fragments'
import {Button, IButton} from '../elements'
import {$} from 'protractor'

interface IEditComputerPage {
  editComputerForm: ISharedForm
  clickSaveButton(): Promise<void>
  getSaveButton(): Promise<string>
  clickDeleteButton(): Promise<void>
  getDeleteButton(): Promise<string>
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

  public clickSaveButton(): Promise<void> {
    return this.saveComputer.click()
  }

  public getSaveButton(): Promise<string> {
    return this.saveComputer.getData()
  }
  public clickDeleteButton(): Promise<void> {
    return this.deleteComputer.click()
  }

  public getDeleteButton(): Promise<string> {
    return this.deleteComputer.getData()
  }
}

export {EditComputerPage, IEditComputerPage}
